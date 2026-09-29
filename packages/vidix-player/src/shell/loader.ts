/**
 * Auto-load of the full bundle.
 *
 * Ported from scaffold-design/vidix-player.js:586-643. Two delivery paths:
 *
 * - CDN: this module is `dist/vidix-player.js` (ESM) or
 *   `dist/vidix-player.iife.js` (classic script); the full bundle is the
 *   sibling `dist/vidix-player-full.js`. Resolved from `import.meta.url` or,
 *   for the IIFE build, from the classic script's own `src`, and loaded with a
 *   *runtime* dynamic `import()` (non-literal argument, so bundlers leave it
 *   alone — the same behavior as the labs `<script>` injection).
 *
 *   A bare CDN URL (`https://cdn.jsdelivr.net/npm/@mekbrut-com/vidix-player`)
 *   serves the package's default file with **no redirect**, so the script's
 *   own URL stays the package root instead of a file path. The package-root
 *   rule below rewrites that to `<root>/dist/vidix-player-full.js`.
 * - Bundler: consumers import `@mekbrut-com/vidix-player/full` statically. The
 *   full bundle then registers its hydrate function, and this loader detects
 *   that and skips the runtime fetch entirely.
 *
 * `window.VIDIX_FULL_SRC` overrides the resolved URL (same escape hatch as the
 * labs) for cases where the shell file was renamed or the auto-detection
 * misfires.
 */

import { FULL_FILE, FULL_SRC_OVERRIDE_KEY, SHELL_FILE, SHELL_IIFE_FILE } from "../constants.js";
import { getRegisteredHydrate } from "../internal/registry.js";
import type { VidixPlayerElement } from "../types.js";
import { log } from "../utils/log.js";

type GlobalWithOverride = typeof globalThis & {
  [FULL_SRC_OVERRIDE_KEY]?: string;
};

/**
 * `document.currentScript` is only non-null while a classic `<script>` is
 * executing, so the src must be captured here at module evaluation time — by
 * the time `connectedCallback` runs it is null again. Module scripts always
 * see null and resolve their URL from `import.meta.url` instead.
 */
const CLASSIC_SCRIPT_SRC =
  typeof document !== "undefined" && document.currentScript instanceof HTMLScriptElement
    ? document.currentScript.src
    : "";

/** Escapes a literal filename for interpolation into a RegExp. */
const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/**
 * Suffix form: the shell served as an explicit file — `…/vidix-player.js`
 * (ESM module script) or `…/vidix-player.iife.js` (classic script). The full
 * bundle is a sibling file.
 */
const SHELL_SUFFIX_RE = new RegExp(
  `(?:${escapeRegExp(SHELL_FILE)}|${escapeRegExp(SHELL_IIFE_FILE)})$`,
);
/**
 * Package-root form: a bare CDN URL ending in the package name, optionally
 * with a version (`…/vidix-player@0.1.0`) and a trailing slash. Strict on
 * purpose — only the *end* of the path may be the package name — so pages
 * whose path merely contains `vidix-player` do not match. If it ever
 * misfires, `window.VIDIX_FULL_SRC` is the escape hatch.
 */
const PACKAGE_ROOT_RE = /vidix-player(@[^/]*)?\/?$/;

/** Resolves the full bundle URL for the CDN path. */
export function resolveFullBundleSrc(): string {
  const override = (globalThis as GlobalWithOverride)[FULL_SRC_OVERRIDE_KEY];
  // DOM clobbering can turn the global into an element; only a non-empty
  // string may override the derived sibling URL.
  if (typeof override === "string" && override !== "") return override;

  // import.meta.url covers the ESM build (module script). CLASSIC_SCRIPT_SRC
  // covers the IIFE build: esbuild rewrites `import.meta.url` in non-ESM
  // formats — older versions to `undefined`, newer ones to a
  // `document.currentScript`-based expression — so the explicit capture here is
  // the reliable path either way. In CJS or bundler contexts both may be
  // empty, and callers fall back to the bare filename.
  try {
    const ownUrl = import.meta.url || CLASSIC_SCRIPT_SRC;
    if (ownUrl) {
      const url = new URL(ownUrl);

      // Suffix form: the full bundle is a sibling of the shell file.
      if (SHELL_SUFFIX_RE.test(url.pathname)) {
        url.pathname = url.pathname.replace(SHELL_SUFFIX_RE, FULL_FILE);
        url.search = "";
        url.hash = "";
        return url.href;
      }

      // Package-root form: the full bundle lives under the package's dist/
      // on the same CDN root. Trim any trailing slash so the join is clean.
      if (PACKAGE_ROOT_RE.test(url.pathname)) {
        url.pathname = `${url.pathname.replace(/\/+$/, "")}/dist/${FULL_FILE}`;
        url.search = "";
        url.hash = "";
        return url.href;
      }
    }
  } catch {
    // Not a URL context; use the relative fallback below.
  }

  return FULL_FILE;
}

let fullBundlePromise: Promise<boolean> | null = null;

/**
 * Ensures the full bundle is loaded. Resolves `true` when a hydrate function is
 * available (either already registered by a static import, or installed by the
 * runtime dynamic import). Idempotent for the page lifetime.
 */
export function loadFullBundle(): Promise<boolean> {
  // Statically imported by the consumer: nothing to fetch.
  if (getRegisteredHydrate()) return Promise.resolve(true);
  if (fullBundlePromise) return fullBundlePromise;

  fullBundlePromise = (async () => {
    const url = resolveFullBundleSrc();
    try {
      // Non-literal argument on purpose: bundlers must not rewrite this into a
      // build-time chunk. The URL is only known at runtime on the CDN.
      await import(url as string);
      return !!getRegisteredHydrate();
    } catch (err) {
      log(null, "failed to load", FULL_FILE, err);
      return false;
    }
  })();

  return fullBundlePromise;
}

/** Hydrates a player once the full bundle is ready. */
export async function hydrateWhenReady(player: VidixPlayerElement): Promise<void> {
  const ok = await loadFullBundle();
  const hydrate = getRegisteredHydrate();
  if (ok && hydrate) {
    hydrate(player);
  } else if (!ok) {
    log(player, `failed to load ${FULL_FILE}`);
  }
}
