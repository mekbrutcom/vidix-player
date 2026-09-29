/**
 * Cross-bundle singletons.
 *
 * The shell and the full bundle are two *independent* files: on the CDN the shell
 * dynamic-imports the full bundle at runtime, and bundler consumers may import
 * `@mekbrut-com/vidix-player/full` statically. Either way, both sides must see
 * the same shared state, so keys live on `globalThis` via `Symbol.for` (identical
 * across module instances and realms).
 *
 * Ported from the labs module-scope `_vidixPlayers` set
 * (scaffold-design/vidix-player.js:398) which relied on classic-script global
 * lexical binding — that does not exist for ES modules.
 */

import type { VidixPlayerElement } from "../types.js";

const PLAYERS_KEY = Symbol.for("vidix-player.players");
const HYDRATE_KEY = Symbol.for("vidix-player.hydrate");
const THEME_WATCH_KEY = Symbol.for("vidix-player.theme-watch");

type GlobalShape = typeof globalThis & {
  [PLAYERS_KEY]?: Set<VidixPlayerElement>;
  [HYDRATE_KEY]?: (player: VidixPlayerElement) => void;
  [THEME_WATCH_KEY]?: boolean;
};

const g = globalThis as GlobalShape;

/**
 * Set of currently-connected players. Used to broadcast document-level theme
 * changes to every instance.
 */
export function getPlayers(): Set<VidixPlayerElement> {
  if (!g[PLAYERS_KEY]) g[PLAYERS_KEY] = new Set();
  return g[PLAYERS_KEY];
}

/**
 * The full bundle registers its hydrate function here on load. The shell checks
 * this before attempting a runtime dynamic import, so consumers who import
 * `@mekbrut-com/vidix-player/full` statically never trigger the CDN auto-load
 * path.
 */
export function registerHydrate(fn: (player: VidixPlayerElement) => void): void {
  g[HYDRATE_KEY] = fn;
}

/** @returns the hydrate function registered by the full bundle, if any. */
export function getRegisteredHydrate(): ((player: VidixPlayerElement) => void) | undefined {
  return g[HYDRATE_KEY];
}

/** Idempotent guard for the document-level theme watcher (see utils/theme.ts). */
export function isThemeWatchActive(): boolean {
  return g[THEME_WATCH_KEY] === true;
}

export function markThemeWatchActive(): void {
  g[THEME_WATCH_KEY] = true;
}
