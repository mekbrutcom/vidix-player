/**
 * Minimal HTML escaping for values interpolated into markup strings.
 *
 * The templates in this package build strings that are assigned through
 * innerHTML/insertAdjacentHTML, so text-context and attribute-context values
 * must be escaped at the sink before interpolation.
 */

const HTML_ESCAPES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
  "`": "&#96;",
};

/**
 * Escapes `& < > " ' \` so a value cannot break out of a quoted attribute or
 * inject markup into a text node. Safe to apply to already-constant strings.
 */
export function escapeHtml(value: string): string {
  return value.replace(/[&<>"'`]/g, (char) => HTML_ESCAPES[char]);
}
