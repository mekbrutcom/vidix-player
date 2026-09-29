/**
 * Dev-only console logging.
 *
 * Ported from scaffold-design/vidix-player.js:286-292. The attribute was renamed
 * from `logging` to `console-log` because the output is the browser devtools
 * console, not analytics.
 */

/** True when `console-log="true"` is set on the element. */
export function isConsoleLogEnabled(player: HTMLElement): boolean {
  return (player.getAttribute("console-log") || "").trim().toLowerCase() === "true";
}

/** Logs `[vidix-player] ...` to the console when the element opts in. */
export function log(player: HTMLElement | null | undefined, ...args: unknown[]): void {
  if (player && isConsoleLogEnabled(player)) {
    // eslint-disable-next-line no-console
    console.log("[vidix-player]", ...args);
  }
}
