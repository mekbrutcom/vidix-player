/**
 * Shell template: the 16:9 box + skeleton control bar.
 *
 * Ported from scaffold-design/vidix-player.js:520-584. The decision of which
 * buttons appear MUST stay identical to player/template.ts (the full render), so
 * the control bar height is the same before and after hydration (CLS ≈ 0).
 */

import { ACCENT_COLORS } from "../constants.js";
import { MINI_I18N } from "../i18n/mini.js";
import type { VidixPlayerElement } from "../types.js";
import { isFlagEnabled, parseServerCount, readAttr } from "../utils/element.js";
import { I18N, resolveLocale, translate } from "../utils/locale.js";

// The shell ships only the mini dictionary; install it before first render.
Object.assign(I18N, MINI_I18N);

/** Applies the `accent-color` attribute to the host (CSS scopes off it). */
function applyAccent(player: VidixPlayerElement): void {
  const accentColor = readAttr(player, "accent-color");
  if (ACCENT_COLORS.includes(accentColor as never)) {
    player.setAttribute("data-accent-vidix", accentColor);
  } else {
    player.removeAttribute("data-accent-vidix");
  }
}

/**
 * Builds the skeleton markup for a player. Renders nothing when the control bar
 * is fully disabled (no share, no server select, no download).
 */
export function buildShellTemplate(player: VidixPlayerElement): string {
  const locale = resolveLocale(player);
  player._vidixLocale = locale;

  applyAccent(player);

  const controlShare = isFlagEnabled(player, "control-share");
  const controlDownload = isFlagEnabled(player, "control-download");
  const serverCount = parseServerCount(player);
  const showServerSelect = serverCount >= 2;

  const showControlBar = controlShare || showServerSelect || controlDownload;

  const wrapper = '<div class="vidix-player-wrapper is-loading"></div>';
  if (!showControlBar) return wrapper;

  const controlAccent = readAttr(player, "layout-control-accent");
  const accentAttr = ACCENT_COLORS.includes(controlAccent as never)
    ? ` data-accent-vidix="${controlAccent}"`
    : "";

  const shareButton = `
            <button type="button" class="vidix-share-page vidix-skeleton" disabled aria-label="${translate(locale, "sharePage")}">
                <span class="vidix-ico" aria-hidden="true"></span>
                <span class="vidix-share-label">${translate(locale, "share")}</span>
            </button>`;

  const serverSelectButton = `
            <button type="button" class="vidix-control-server vidix-skeleton" aria-haspopup="listbox" aria-expanded="false" disabled>
                <span class="v-sr-only">${translate(locale, "serverSr")}</span>
                <span class="vidix-text-server">
                    <span class="vidix-ico" aria-hidden="true"></span>
                    <span>${translate(locale, "server", { n: 1 })}</span>
                </span>
                <span class="vidix-ico" aria-hidden="true"></span>
            </button>`;

  const downloadAnchor = `
        <a href="#" target="_blank" rel="noopener noreferrer" tabindex="-1"
            class="vidix-control-download vidix-skeleton" aria-hidden="true">
            <span class="vidix-ico" aria-hidden="true"></span>
            <span>${translate(locale, "download")}</span>
        </a>`;

  return `
    <div class="vidix-player-wrapper is-loading"></div>
    <div class="vidix-player-control" role="group" aria-label="${translate(locale, "controls")}"${accentAttr}>
        <div class="vidix-control-start" role="group" aria-label="${translate(locale, "primaryActions")}">${controlShare ? shareButton : ""}${showServerSelect ? serverSelectButton : ""}
        </div>${controlDownload ? downloadAnchor : ""}
    </div>${controlShare ? "\n    <vidix-share-dialog></vidix-share-dialog>" : ""}`;
}
