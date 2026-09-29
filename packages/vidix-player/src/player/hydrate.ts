/**
 * Hydration: replace the shell skeleton with the full player.
 *
 * Ported from scaffold-design/vidix-player-full.js:3303-3333 (hydrate) and
 * 2730-2769 (server fetch wiring). The shell has already reserved the 16:9 box
 * and control bar, so this only fills in content and wires interaction without
 * touching the outer size (CLS stays ≈ 0).
 */

import { ACCENT_COLORS } from "../constants.js";
import { FULL_I18N } from "../i18n/full.js";
import { FULL_STYLE } from "../styles/full.js";
import type { VidixPlayerElement, VidixServerSelectEventDetail } from "../types.js";
import { getPlayerRoot, parseServerCount, readAttr } from "../utils/element.js";
import { I18N } from "../utils/locale.js";
import { log } from "../utils/log.js";
import { renderWithStyles } from "../utils/stylesheets.js";
import { trustedHTML } from "../utils/trusted-types.js";
import { fetchServerData } from "./api.js";
import { showPlayerError } from "./errors.js";
import { initBlurUp } from "./loading.js";
import { applyServerData, clearSkeleton, renderActiveServer } from "./server-data.js";
import { VidixServerSelect } from "./server-select.js";
import { buildPlayerTemplate } from "./template.js";

// The full dictionary supersedes the shell's mini table. translate() reads the
// map per call, so labels are correct immediately after this swap.
Object.assign(I18N, FULL_I18N);

/**
 * Fetches server data for the player and reflects the result: the active server
 * URL on success, a translated error state on failure.
 */
async function initPlayer(player: VidixPlayerElement): Promise<void> {
  const playbackId = (player.getAttribute("playback-id") || "").trim();
  if (!playbackId) return;

  // Server switches rebuild the iframe and download link.
  player.addEventListener("vidix:server-select", (event) => {
    const detail = (event as CustomEvent<VidixServerSelectEventDetail>).detail;
    const match = /Server (\d+)/.exec(detail?.value || "");
    if (match) {
      renderActiveServer(player, Number.parseInt(match[1], 10) - 1);
    }
  });

  // User parameters carried to the backend: theme-accent + server-count.
  const userQuery = new URLSearchParams();
  const accent = readAttr(player, "accent-color");
  if (ACCENT_COLORS.includes(accent as never)) {
    userQuery.set("theme-accent", accent);
  }

  const serverCount = parseServerCount(player);
  userQuery.set("server-count", String(serverCount));

  const { data, error } = await fetchServerData(player, playbackId, userQuery);
  if (!data) {
    // vod_not_found / server down: show the error in the player area.
    showPlayerError(player, error ?? "unknown");
    // Only the share button survives (when enabled).
    clearSkeleton(player);
    getPlayerRoot(player).querySelector(".vidix-select-wrapper")?.remove();
    getPlayerRoot(player).querySelector(".vidix-control-server")?.remove();
    getPlayerRoot(player).querySelector(".vidix-control-download")?.remove();
    log(player, `no server data for ${playbackId} (${error ?? "unknown"})`);
    return;
  }

  applyServerData(player, data);
}

/**
 * Hydrates a player element with the full render. Idempotent; no-op for elements
 * without a playback id (the shell keeps its skeleton).
 */
export function hydratePlayer(player: VidixPlayerElement | null | undefined): void {
  if (!player || player._vidixHydrated) return;
  player._vidixHydrated = true;

  const playbackId = (player.getAttribute("playback-id") || "").trim();
  if (!playbackId) {
    log(player, "playback-id is empty. playback-id is required.");
    return;
  }

  if (!player.shadowRoot) {
    player.attachShadow({ mode: "open" });
  }

  const template = buildPlayerTemplate(player);
  if (!template) return;

  const root = player.shadowRoot;
  if (!root) return;
  root.innerHTML = trustedHTML(renderWithStyles(root, FULL_STYLE, template));

  void initBlurUp(player);
  void initPlayer(player);

  // Imperative server select: one instance per player.
  if (getPlayerRoot(player).querySelector(".vidix-control-server")) {
    player._vidixServerSelect = new VidixServerSelect(player);
  }
}
