/**
 * Small DOM helpers shared by the shell and full render paths.
 *
 * Ported from scaffold-design/vidix-player.js:309-313 (root lookup) and the
 * attribute parsing rules duplicated at
 * scaffold-design/vidix-player.js:537-545 / vidix-player-full.js:2412-2422.
 */

import { SERVER_COUNT } from "../constants.js";
import type { VidixPlayerElement } from "../types.js";

/** The shadow root of the player (markup lives there), or the element itself. */
export function getPlayerRoot(player: VidixPlayerElement): ShadowRoot | VidixPlayerElement {
  return player.shadowRoot || player;
}

/**
 * Boolean attribute rule: absent or empty means `true`, only the literal
 * `"false"` disables. Matches HTML boolean attribute conventions.
 */
export function isFlagEnabled(player: HTMLElement, name: string): boolean {
  return (player.getAttribute(name) || "").trim().toLowerCase() !== "false";
}

/**
 * Parses `control-server-count`: default {@link SERVER_COUNT.default} when
 * missing/unparsable, clamped to `[0, 10]`.
 */
export function parseServerCount(player: HTMLElement): number {
  const raw = Number.parseInt((player.getAttribute("control-server-count") || "").trim(), 10);
  return Number.isNaN(raw)
    ? SERVER_COUNT.default
    : Math.min(Math.max(raw, SERVER_COUNT.min), SERVER_COUNT.max);
}

/** Lowercased + trimmed attribute, or `""`. */
export function readAttr(player: HTMLElement, name: string): string {
  return (player.getAttribute(name) || "").trim().toLowerCase();
}

/**
 * SSR-safe `HTMLElement` base. In a browser this is `HTMLElement` itself. In a
 * Node/SSR context `HTMLElement` is undefined, so a bare `extends HTMLElement`
 * would throw at *import* time and break server-side rendering. Extending this
 * base keeps element modules importable everywhere; the actual custom-element
 * registration stays browser-only (see `defineVidixPlayer` /
 * `defineVidixShareDialog`).
 */
export const HTMLElementBase: typeof HTMLElement =
  typeof HTMLElement !== "undefined" ? HTMLElement : (class {} as unknown as typeof HTMLElement);
