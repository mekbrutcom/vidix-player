/**
 * Theme resolution and synchronization.
 *
 * Ported from scaffold-design/vidix-player.js:294-307 and 396-413.
 *
 * SSR note: the labs version read `document.documentElement` and
 * `window.matchMedia` at import time (module top level). Those references are now
 * guarded and only reached from `defineVidixPlayer()` / `connectedCallback`, so
 * importing this module in Node (SSR) is side-effect free.
 */

import { getPlayers, isThemeWatchActive, markThemeWatchActive } from "../internal/registry.js";
import type { Theme, VidixPlayerElement } from "../types.js";

/** Fallback when neither matchMedia nor an explicit document theme is available. */
const DEFAULT_THEME: Theme = "light";

/**
 * Resolves the effective theme from the document: explicit `data-theme` on
 * `<html>` first, then a `dark`/`light` class, then the OS color scheme.
 * Returns `"light"` outside a browser environment.
 */
export function resolveTheme(): Theme {
  if (typeof document === "undefined") return DEFAULT_THEME;

  const docTheme = (document.documentElement.getAttribute("data-theme") || "").trim().toLowerCase();
  if (docTheme === "dark" || docTheme === "light") return docTheme;

  const { classList } = document.documentElement;
  if (classList.contains("dark")) return "dark";
  if (classList.contains("light")) return "light";

  if (typeof window !== "undefined" && typeof window.matchMedia === "function") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  return DEFAULT_THEME;
}

/** Syncs the resolved theme onto the element's own `data-theme` attribute. */
export function syncTheme(player: VidixPlayerElement): void {
  const theme = resolveTheme();
  if (player.getAttribute("data-theme") !== theme) {
    player.setAttribute("data-theme", theme);
  }
}

/**
 * Installs the document-level theme watcher (MutationObserver on `<html>` +
 * prefers-color-scheme media query). Idempotent: safe to call from every
 * `defineVidixPlayer()`.
 *
 * The broadcast re-syncs each connected player, mirroring the labs
 * `_vidixBroadcastTheme` loop.
 */
export function watchTheme(sync: (player: VidixPlayerElement) => void): void {
  if (isThemeWatchActive()) return;
  if (typeof document === "undefined" || typeof MutationObserver === "undefined") return;

  markThemeWatchActive();

  const broadcast = () => {
    for (const player of getPlayers()) sync(player);
  };

  const observer = new MutationObserver(broadcast);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class", "data-theme"],
  });

  if (typeof window !== "undefined" && typeof window.matchMedia === "function") {
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener?.("change", broadcast);
  }
}
