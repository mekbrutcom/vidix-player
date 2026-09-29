/**
 * Server data application: builds the active server URL, clears skeletons, and
 * reflects server-driven metadata onto the element.
 *
 * Ported from scaffold-design/vidix-player-full.js:2565-2623 (applyVidixServerData
 * + clearSkeleton) and 2705-2728 (renderActiveServer).
 */

import { ACCENT_COLORS } from "../constants.js";
import type { VidixPlayerElement, VidixServerData, VidixServerEntry } from "../types.js";
import { getPlayerRoot } from "../utils/element.js";
import { translate } from "../utils/locale.js";
import { showPlayerError } from "./errors.js";

/**
 * True only for absolute http(s) bases. Fail closed: anything else
 * (`javascript:`, `data:`, protocol-relative `//host`, malformed, non-string)
 * must never become a navigation target.
 */
function isSafeHttpBase(value: unknown): value is string {
  if (typeof value !== "string" || value === "") return false;
  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

/**
 * Points the iframe and download link at `servers[index]`. Reused by the initial
 * render and by every server switch (see the server select controller).
 */
export function renderActiveServer(player: VidixPlayerElement, index: number): void {
  const servers: VidixServerEntry[] = player._vidixServers || [];
  const server = servers[index];
  if (!server) return;

  // A payload url outside http(s) cannot be sanitized into a safe navigation
  // target, so refuse to move either navigation sink and surface an error.
  if (!isSafeHttpBase(server.url)) {
    showPlayerError(player, "server_down");
    return;
  }

  const playerPath = server.player_path || "e";
  const downloadPath = server.download_path || "download";
  const vodId = player._vidixVodId || player.getAttribute("playback-id");

  // The iframe only carries the theme-accent parameter, when one is set.
  const accent = player._vidixAccent || "";
  const iframeSuffix = accent ? `?theme-accent=${accent}` : "";

  const iframe = getPlayerRoot(player).querySelector<HTMLIFrameElement>(
    ".vidix-player-wrapper iframe",
  );
  if (iframe) {
    iframe.src = `${server.url}/${playerPath}/${vodId}${iframeSuffix}`;
  }

  // Downloads carry no parameters.
  const download =
    getPlayerRoot(player).querySelector<HTMLAnchorElement>(".vidix-control-download");
  if (download) {
    download.href = `${server.url}/${downloadPath}/${vodId}`;
  }
}

/**
 * Applies fetched server data: stores servers, renders the active one, clears
 * skeletons so controls become interactive, and reflects server metadata
 * (title, downloadable flag) onto the element.
 */
export function applyServerData(player: VidixPlayerElement, data: VidixServerData): void {
  const vod = data.vod || {};
  // Only entries with a string url can ever be navigated to (isSafeHttpBase
  // re-checks the scheme at render time); drop malformed entries up front.
  const servers = (Array.isArray(data.server) ? data.server : []).filter(
    (entry): entry is VidixServerEntry => Boolean(entry) && typeof entry.url === "string",
  );
  player._vidixServers = servers;
  player._vidixVodId = vod.id || player.getAttribute("playback-id") || "";
  // Same allowlist the template uses: a raw accent must not reach the iframe
  // query suffix either.
  const accentRaw = (player.getAttribute("accent-color") || "").trim().toLowerCase();
  player._vidixAccent = ACCENT_COLORS.includes(accentRaw as never) ? accentRaw : "";
  // Server thumbnail is for the share dialog only, never the blur-up.
  player._vidixThumbnail = typeof vod.thumbnail === "string" ? vod.thumbnail : "";

  renderActiveServer(player, 0);

  // Data is in: drop skeletons so controls can be interacted with.
  clearSkeleton(player);

  // Server title only when the user did not set one and did not opt out.
  const userTitle = (player.getAttribute("metadata-video-title") || "").trim();
  const serverTitleEnabled =
    (player.getAttribute("metadata-server-title") || "true").toLowerCase() !== "false";
  const serverTitle = typeof vod.title === "string" ? vod.title : "";
  if (!userTitle && serverTitleEnabled && serverTitle) {
    player.setAttribute("data-video-title", serverTitle);
    const locale = player._vidixLocale || "en";
    const iframe = getPlayerRoot(player).querySelector<HTMLIFrameElement>(
      ".vidix-player-wrapper iframe",
    );
    if (iframe) iframe.title = translate(locale, "iframeTitle", { title: serverTitle });
    const download =
      getPlayerRoot(player).querySelector<HTMLAnchorElement>(".vidix-control-download");
    if (download) {
      download.setAttribute(
        "aria-label",
        translate(locale, "downloadVideo", { title: serverTitle }),
      );
    }
  }

  // Server says the video is not downloadable: remove the download control.
  if (vod.downloadable === false) {
    getPlayerRoot(player).querySelector(".vidix-control-download")?.remove();
  }

  const serverCount = Number.isFinite(vod.server_count) ? vod.server_count : servers.length;
  player.setAttribute("data-server-count", String(serverCount));
  player.dispatchEvent(new CustomEvent("vidix:server-data", { detail: { serverCount } }));
}

/** Removes skeleton/loading placeholders and enables the skeleton controls. */
export function clearSkeleton(player: VidixPlayerElement): void {
  const wrapper = getPlayerRoot(player).querySelector(".vidix-player-wrapper");
  wrapper?.classList.remove("is-loading");
  wrapper?.querySelector(".vidix-blurup")?.remove();
  wrapper?.querySelector(".vidix-loading")?.remove();

  const skeletons = getPlayerRoot(player).querySelectorAll(".vidix-skeleton");
  for (const el of skeletons) {
    el.classList.remove("vidix-skeleton");
    el.removeAttribute("aria-hidden");
    if (el.hasAttribute("disabled")) {
      el.removeAttribute("disabled");
    }
    if (el.getAttribute("tabindex") === "-1") {
      el.removeAttribute("tabindex");
    }
  }
}
