/**
 * Stylesheet installation via `adoptedStyleSheets`.
 *
 * Ported from scaffold-design/vidix-player.js:360-394 (the CSP fix session).
 *
 * Why not a `<style>` element: a strict CSP `style-src` without `'unsafe-inline'`
 * blocks an injected `<style>`, so the player would render unstyled. A
 * `CSSStyleSheet` installed through `adoptedStyleSheets` is not inline style and
 * survives that policy.
 *
 * Browsers without `CSSStyleSheet` / `adoptedStyleSheets` support fall back to a
 * `<style>` element — behavior identical to before the fix. The cache is keyed by
 * CSS text so the shell and full render share one sheet per style.
 */

type StyleRoot = ShadowRoot;
type OwnableSheet = CSSStyleSheet & { _vidixOwned?: boolean };

const sheetCache = new Map<string, OwnableSheet>();

/**
 * Adopts `css` onto `root`. Returns `true` on the adopted path, `false` when the
 * caller must fall back to an inline `<style>` element.
 */
export function adoptStyles(root: StyleRoot, css: string): boolean {
  if (typeof CSSStyleSheet !== "function" || !("adoptedStyleSheets" in root)) {
    return false;
  }

  try {
    let sheet = sheetCache.get(css);
    if (!sheet) {
      sheet = new CSSStyleSheet() as OwnableSheet;
      sheet.replaceSync(css);
      sheet._vidixOwned = true;
      sheetCache.set(css, sheet);
    }
    // Replace our own previously-adopted sheet (shell -> full hydration) while
    // keeping any sheet the consumer adopted themselves.
    root.adoptedStyleSheets = root.adoptedStyleSheets
      .filter((s) => !(s as OwnableSheet)._vidixOwned)
      .concat(sheet);
    return true;
  } catch {
    return false;
  }
}

/**
 * Renders markup with styles: the adopted path when available, otherwise an
 * inline `<style>` element prepended to the markup (the pre-fix behavior).
 */
export function renderWithStyles(root: StyleRoot, css: string, markup: string): string {
  return adoptStyles(root, css) ? markup : `<style>${css}</style>${markup}`;
}
