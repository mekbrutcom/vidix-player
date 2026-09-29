/**
 * Locale resolution and translation lookup.
 *
 * Ported from scaffold-design/vidix-player.js:432-518.
 *
 * Resolution order: the element's `lang` attribute, then `<html lang>`,
 * then `"en"`. Dictionaries are partial: missing keys fall back to the language
 * prefix (`es_419` -> `es`), then to English.
 */

import { LOCALES } from "../constants.js";

/** Normalizes a raw locale tag to the internal form (`en-GB` -> `en_gb`). */
export function normalizeLocale(raw: string | null | undefined): string {
  return (raw || "").trim().toLowerCase().replace(/-/g, "_");
}

/** True when the locale (or its language prefix) has a dictionary. */
export function isLocaleSupported(locale: string): boolean {
  return LOCALES.includes(locale) || LOCALES.includes(locale.split("_")[0]);
}

/**
 * Picks the dictionary locale for an element: `lang` attribute first, then
 * `<html lang>`, finally `"en"`.
 */
export function resolveLocale(player: HTMLElement): string {
  const fromProp = normalizeLocale(player.getAttribute("lang"));
  if (isLocaleSupported(fromProp)) {
    return LOCALES.includes(fromProp) ? fromProp : fromProp.split("_")[0];
  }

  const fromDoc = normalizeLocale(
    typeof document !== "undefined" ? document.documentElement.getAttribute("lang") : null,
  );
  if (isLocaleSupported(fromDoc)) {
    return LOCALES.includes(fromDoc) ? fromDoc : fromDoc.split("_")[0];
  }

  return "en";
}

/**
 * Looks up a translated string. `{placeholder}` segments in `vars` are replaced
 * inline (`server` uses `{n}`, `iframeTitle` uses `{title}`).
 */
export function translate(
  locale: string,
  key: string,
  vars?: Record<string, string | number>,
): string {
  const dict = I18N[locale] || I18N[locale.split("_")[0]] || I18N.en;
  let str = dict[key] || I18N.en[key] || "";
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      str = str.replaceAll(`{${k}}`, String(v));
    }
  }
  return str;
}

/**
 * The active dictionary table. The shell installs a mini dictionary for first
 * paint (see `i18n/mini.ts`); the full bundle replaces it with the complete
 * ~50-locale table on load. `translate()` reads this map per call, so strings
 * are correct right after the swap without a re-render.
 */
export const I18N: Record<string, Record<string, string>> = {};
