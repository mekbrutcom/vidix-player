/**
 * Image URL validation for blur-up placeholders and share-dialog thumbnails.
 *
 * Ported from scaffold-design/vidix-player-full.js:2628-2641.
 */

import { IMAGE_EXTENSIONS } from "../constants.js";

/** Control characters never appear in a legitimate URL we interpolate. */
function hasControlChar(value: string): boolean {
  for (let i = 0; i < value.length; i++) {
    const code = value.charCodeAt(i);
    if (code <= 0x1f || code === 0x7f) return true;
  }
  return false;
}

/**
 * True only for http(s) URLs ending in a known image extension. The extension
 * is checked on the parsed pathname (query/hash excluded), and the raw string
 * must not contain markup-relevant characters: callers interpolate this exact
 * value into HTML attribute context (`src="…"` / `alt="…"`), so a quote or
 * angle bracket could break out of the attribute.
 */
export function isValidImageUrl(url: string | null | undefined): boolean {
  if (!url) return false;

  // Reject quotes, angle brackets, backticks, whitespace anywhere in the
  // string — including after "?" or "#" — plus control characters.
  if (/[\s"'`<>]/.test(url)) return false;
  if (hasControlChar(url)) return false;

  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return false;
  }
  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return false;

  const path = parsed.pathname.toLowerCase();
  return IMAGE_EXTENSIONS.some((ext) => path.endsWith(`.${ext}`));
}
