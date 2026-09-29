/**
 * The `<vidix-player>` element: shell behavior.
 *
 * Ported from scaffold-design/vidix-player.js:609-655 (class + registration).
 *
 * `connectedCallback` renders the 16:9 skeleton synchronously — it does not wait
 * for the network — then schedules full-bundle hydration. That ordering is what
 * keeps CLS at ~0: the final box is reserved before the first frame commits.
 *
 * Registration is NOT a module side effect (tree-shaking / SSR requirement):
 * `defineVidixPlayer()` does it. The CDN entry calls it automatically when a
 * browser is present.
 */

import { getPlayers } from "../internal/registry.js";
import { CRITICAL_STYLE } from "../styles/critical.js";
import type { VidixPlayerElement } from "../types.js";
import { HTMLElementBase } from "../utils/element.js";
import { log } from "../utils/log.js";
import { renderWithStyles } from "../utils/stylesheets.js";
import { syncTheme, watchTheme } from "../utils/theme.js";
import { trustedHTML } from "../utils/trusted-types.js";
import { hydrateWhenReady } from "./loader.js";
import { buildShellTemplate } from "./template.js";

const ELEMENT_NAME = "vidix-player";

class VidixPlayer extends HTMLElementBase implements VidixPlayerElement {
  _vidixConnected = false;
  /** Optional: set by the full bundle's imperative server select (types.ts). */
  _vidixServerSelect?: VidixPlayerElement["_vidixServerSelect"];

  connectedCallback(): void {
    // Runs on EVERY connect: disconnect() removed this element from the
    // registry, so a reconnect must restore theme syncing, player discovery,
    // and the server-select's document/window listeners even when the shell
    // markup is already rendered.
    syncTheme(this as VidixPlayerElement);
    getPlayers().add(this as VidixPlayerElement);
    this._vidixServerSelect?.attachGlobalListeners();

    if (this._vidixConnected) return;
    this._vidixConnected = true;

    if (!this.shadowRoot) {
      this.attachShadow({ mode: "open" });
    }

    const playbackId = (this.getAttribute("playback-id") || "").trim();
    if (!playbackId) {
      log(this, "playback-id is empty. playback-id is required.");
      return;
    }

    // Geometry + skeleton land here, before the next frame commit. The full
    // bundle replaces this markup later without touching the outer box.
    const root = this.shadowRoot;
    if (!root) return;
    const markup = buildShellTemplate(this as VidixPlayerElement);
    root.innerHTML = trustedHTML(renderWithStyles(root, CRITICAL_STYLE, markup));

    // Elements that connect after the full bundle is ready hydrate through this
    // promise (already resolved); earlier ones are hydrated by the bundle itself.
    void hydrateWhenReady(this as VidixPlayerElement);
  }

  disconnectedCallback(): void {
    getPlayers().delete(this as VidixPlayerElement);
    // Document/window listeners are global: release them while disconnected so
    // players created and destroyed across SPA rerenders cannot accumulate.
    this._vidixServerSelect?.detachGlobalListeners();
  }
}

/**
 * Registers the `<vidix-player>` custom element. Safe to call more than once.
 *
 * Call this from client-side code (it touches `customElements`). Framework
 * wrappers import the core and call it in a browser context; the CDN entry calls
 * it automatically.
 */
export function defineVidixPlayer(): void {
  if (typeof customElements === "undefined") return;
  if (customElements.get(ELEMENT_NAME)) return;

  watchTheme(syncTheme);
  customElements.define(ELEMENT_NAME, VidixPlayer as unknown as CustomElementConstructor);
}

export { VidixPlayer };
