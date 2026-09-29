/**
 * Prop -> attribute translation for `<VidixPlayer>`.
 *
 * Core reads flat kebab-case attributes off the `<vidix-player>` element
 * (`metadata-video-title`, `layout-control-position`, …). This module performs
 * that flattening, the value serialization, and provides a Map-backed stand-in
 * element so `buildShellTemplate()` from the core can render the SSR skeleton
 * without touching the DOM.
 */

import type { VidixPlayerProps } from "./types.js";
import { GROUP_KEYS, RESERVED_PROP_KEYS } from "./types.js";

/**
 * Explicit names for top-level props whose attribute name cannot be derived by
 * kebab-casing alone (`consoleLog` -> `console-log` works, but keep the table
 * explicit so renames are impossible to miss).
 */
const TOP_LEVEL_MAP: Record<string, string> = {
  playbackId: "playback-id",
  lang: "lang",
  accentColor: "accent-color",
  loading: "loading",
  consoleLog: "console-log",
};

/**
 * Props inside a group that are wrapper-only and must not reach the host
 * element (`thumbnailLqip` is consumed by `image.ts`, core has no such
 * attribute).
 */
const GROUP_RESERVED_KEYS: Record<string, readonly string[]> = {
  metadata: ["thumbnailLqip"],
};

/** camelCase -> kebab-case (`controlPosition` -> `control-position`). */
function camelToKebab(key: string): string {
  return key.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
}

/**
 * Shape check for forwarded attribute names: an ASCII letter followed by
 * letters/digits/hyphens only. Hostile keys (spaces, quotes, `>`, `on*` with
 * punctuation) are dropped instead of being handed to the framework's
 * attribute-name handling.
 */
const ATTR_NAME_RE = /^[a-zA-Z][a-zA-Z0-9-]*$/;

/**
 * Serializes a prop value into its attribute string. `null`/`undefined` means
 * "not set" and signals the caller to omit the attribute entirely, so the core
 * keeps its own defaults (booleans default to enabled, `control-server-count`
 * to 3, …).
 *
 * Booleans follow the core rule where absent/`""`/`"true"` are true and only
 * `"false"` is false, so an explicit value is always emitted as `"true"` or
 * `"false"`.
 */
export function serializeAttribute(value: unknown): string | null {
  if (value === null || value === undefined) return null;
  if (typeof value === "boolean") return value ? "true" : "false";
  if (typeof value === "number") return Number.isFinite(value) ? String(value) : null;
  return String(value);
}

/**
 * Flattens component props into the `<vidix-player>` attribute map. Attributes
 * the caller did not set are omitted so the core defaults apply, and any prop
 * outside the known set (e.g. `role`, `ariaLabel`, `data-*`) is kebab-cased and
 * forwarded to the host element.
 */
export function buildAttributes(props: VidixPlayerProps): Record<string, string> {
  const attrs: Record<string, string> = {};

  const handled = new Set<string>([...RESERVED_PROP_KEYS, ...Object.keys(TOP_LEVEL_MAP)]);

  for (const [prop, attr] of Object.entries(TOP_LEVEL_MAP)) {
    const value = serializeAttribute(props[prop as keyof VidixPlayerProps]);
    if (value !== null) attrs[attr] = value;
  }

  for (const group of GROUP_KEYS) {
    const members = props[group] as Record<string, unknown> | undefined;
    if (!members) continue;
    const reserved = GROUP_RESERVED_KEYS[group] ?? [];

    for (const [key, value] of Object.entries(members)) {
      if (reserved.includes(key)) continue;
      const serialized = serializeAttribute(value);
      if (serialized === null) continue;
      const name = `${group}-${camelToKebab(key)}`;
      if (!ATTR_NAME_RE.test(name)) continue;
      attrs[name] = serialized;
    }
  }

  // Unknown top-level props are forwarded verbatim (kebab-cased). Functions and
  // objects are not attributes — a wrapper with a permissive props type (the
  // React one) can let them through, so they are dropped instead of being
  // stringified into `"[object Object]"` / `"function () {}"` attributes.
  for (const [key, value] of Object.entries(props)) {
    if (handled.has(key)) continue;
    if (typeof value === "function") continue;
    if (value !== null && typeof value === "object") continue;
    const serialized = serializeAttribute(value);
    if (serialized === null) continue;
    const name = camelToKebab(key);
    if (!ATTR_NAME_RE.test(name)) continue;
    attrs[name] = serialized;
  }

  return attrs;
}

/**
 * Minimal stand-in element backed by a Map, so core's `buildShellTemplate()`
 * can be reused in SSR. It implements exactly the attribute API the template
 * builder touches (`getAttribute`/`setAttribute`/`removeAttribute`) plus the
 * `_vidixLocale` slot it writes.
 */
export interface ShimElement {
  getAttribute(name: string): string | null;
  setAttribute(name: string, value: string): void;
  removeAttribute(name: string): void;
  _vidixLocale?: string;
}

/**
 * Creates a shim element pre-seeded with `attrs`. The skeleton is derived from
 * the same attribute map rendered onto the host element, so pre-JS and
 * post-hydration markup stay in sync.
 */
export function createShimElement(attrs: Record<string, string>): ShimElement {
  const store = new Map<string, string>(Object.entries(attrs));

  return {
    getAttribute: (name: string) => (store.has(name) ? (store.get(name) ?? null) : null),
    setAttribute: (name: string, value: string) => {
      store.set(name, value);
    },
    removeAttribute: (name: string) => {
      store.delete(name);
    },
  };
}
