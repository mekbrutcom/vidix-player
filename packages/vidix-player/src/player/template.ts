/**
 * Full player template: the 16:9 area with iframe + blur-up, plus the interactive
 * control bar.
 *
 * Ported from scaffold-design/vidix-player-full.js:2368-2492. Button visibility
 * mirrors shell/template.ts exactly so the control bar height cannot shift
 * during hydration (CLS ≈ 0).
 */

import { ACCENT_COLORS } from "../constants.js";
import type { VidixPlayerElement } from "../types.js";
import { isFlagEnabled, parseServerCount, readAttr } from "../utils/element.js";
import { escapeHtml } from "../utils/html.js";
import { resolveLocale, translate } from "../utils/locale.js";

/** Prefix/brand accents resolve to the link color; others to their own token. */
function accentVar(accent: string): string {
  if (!accent) return "";
  if (accent === "vidix" || accent === "default") return "--vidix-link";
  return `--vidix-${accent}`;
}

/**
 * Builds the full markup. Returns `""` when there is no playback id, so the
 * hydrator can leave the shell skeleton in place.
 */
export function buildPlayerTemplate(player: VidixPlayerElement): string {
  const playbackId = (player.getAttribute("playback-id") || "").trim();

  if (!playbackId) {
    // The shell already logs this; staying silent here avoids a duplicate line.
    return "";
  }

  const locale = resolveLocale(player);
  player._vidixLocale = locale;

  const accentColor = readAttr(player, "accent-color");
  const validAccent = ACCENT_COLORS.includes(accentColor as never) ? accentColor : "";

  const rawControlAccent = readAttr(player, "layout-control-accent");
  const controlAccent = ACCENT_COLORS.includes(rawControlAccent as never) ? rawControlAccent : "";
  const controlAccentVar = accentVar(controlAccent);
  // Control-bar SVGs follow layout-control-accent.
  const accentSvgStyle = controlAccentVar ? ` style="color: var(${controlAccentVar})"` : "";

  const videoTitleAttr = (player.getAttribute("metadata-video-title") || "").trim();

  // metadata-video-title wins. Without it, and with server titles disabled, use
  // the translated fallback so the iframe title is never empty (a11y).
  const videoTitle = videoTitleAttr || translate(locale, "titleFallback");
  const iframeTitle = videoTitle ? translate(locale, "iframeTitle", { title: videoTitle }) : "";

  // The dialog reads the final title from the element, so it stays consistent.
  player.setAttribute("data-video-title", videoTitle);
  // Accent also lives on the host so the dialog/drawer CSS can reach it.
  if (validAccent) {
    player.setAttribute("data-accent-vidix", validAccent);
  } else {
    player.removeAttribute("data-accent-vidix");
  }

  const controlShare = isFlagEnabled(player, "control-share");
  const controlDownload = isFlagEnabled(player, "control-download");
  const serverCount = parseServerCount(player);
  const showServerSelect = serverCount >= 2;
  // Stored for the backend request later (how many servers to ask for).
  player.setAttribute("data-server-count", String(serverCount));

  const showControlBar = controlShare || showServerSelect || controlDownload;

  const shareButton = `
            <button type="button" class="vidix-share-page" aria-label="${translate(locale, "sharePage")}">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22.4512 33.252" aria-hidden="true"
                    focusable="false"${accentSvgStyle}>
                    <path
                        d="M22.0898 13.6621L22.0898 26.1816C22.0898 28.6621 20.8203 29.9414 18.291 29.9414L3.79883 29.9414C1.2793 29.9414 0 28.6816 0 26.1816L0 13.6621C0 11.1621 1.2793 9.89258 3.79883 9.89258L7.98828 9.89258L7.98828 11.6309L3.83789 11.6309C2.4707 11.6309 1.72852 12.3535 1.72852 13.75L1.72852 26.084C1.72852 27.4902 2.4707 28.2129 3.83789 28.2129L18.252 28.2129C19.5898 28.2129 20.3613 27.4902 20.3613 26.084L20.3613 13.75C20.3613 12.3535 19.5898 11.6309 18.252 11.6309L14.1016 11.6309L14.1016 9.89258L18.291 9.89258C20.8203 9.89258 22.0898 11.1719 22.0898 13.6621Z"
                        fill="currentColor" />
                    <path
                        d="M11.0449 20.1855C11.5039 20.1855 11.9043 19.8047 11.9043 19.3457L11.9043 6.25L11.8359 4.4043L12.6074 5.20508L14.7266 7.43164C14.8828 7.60742 15.1074 7.69531 15.3125 7.69531C15.7617 7.69531 16.1035 7.37305 16.1035 6.93359C16.1035 6.70898 16.0059 6.5332 15.8496 6.36719L11.6699 2.30469C11.4551 2.08984 11.2598 2.02148 11.0449 2.02148C10.8301 2.02148 10.6348 2.08984 10.4199 2.30469L6.24023 6.36719C6.07422 6.5332 5.98633 6.70898 5.98633 6.93359C5.98633 7.37305 6.30859 7.69531 6.75781 7.69531C6.96289 7.69531 7.19727 7.60742 7.35352 7.43164L9.48242 5.20508L10.2539 4.39453L10.1855 6.25L10.1855 19.3457C10.1855 19.8047 10.5859 20.1855 11.0449 20.1855Z"
                        fill="currentColor" />
                </svg>
                <span>${translate(locale, "share")}</span>
            </button>`;

  const serverSelectButton = `
            <button type="button" class="vidix-control-server vidix-skeleton" aria-haspopup="listbox" aria-expanded="false" disabled>
                <span class="v-sr-only">${translate(locale, "serverSr")}</span>
                <div class="vidix-text-server">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 29.9512 22.959" aria-hidden="true"
                        focusable="false"${accentSvgStyle}>
                        <path
                            d="M23.3594 6.04492C24.1992 6.02539 24.9023 5.32227 24.9023 4.49219C24.9023 3.63281 24.1992 2.91992 23.3594 2.91992C22.5195 2.91992 21.7969 3.63281 21.7969 4.49219C21.7969 5.32227 22.5195 6.05469 23.3594 6.04492ZM23.3594 13.0273C24.1992 13.0078 24.9023 12.3047 24.9023 11.4648C24.9023 10.6152 24.1992 9.89258 23.3594 9.89258C22.5195 9.89258 21.7969 10.6152 21.7969 11.4648C21.7969 12.3047 22.5195 13.0371 23.3594 13.0273ZM23.3594 20C24.1992 19.9902 24.9023 19.2871 24.9023 18.4473C24.9023 17.5977 24.1992 16.875 23.3594 16.875C22.5195 16.875 21.7969 17.5977 21.7969 18.4473C21.7969 19.2871 22.5195 20.0195 23.3594 20ZM28.6621 8.78906L28.6621 7.1582L0.986328 7.1582L0.986328 8.78906ZM28.6621 15.8301L28.6621 14.1992L0.986328 14.1992L0.986328 15.8301ZM3.79883 22.959L25.7812 22.959C28.3105 22.959 29.5898 21.6797 29.5898 19.1992L29.5898 3.76953C29.5898 1.2793 28.3105 0 25.7812 0L3.79883 0C1.2793 0 0 1.26953 0 3.76953L0 19.1992C0 21.6992 1.2793 22.959 3.79883 22.959ZM3.83789 21.2305C2.4707 21.2305 1.72852 20.5078 1.72852 19.1016L1.72852 3.85742C1.72852 2.46094 2.4707 1.72852 3.83789 1.72852L25.752 1.72852C27.0898 1.72852 27.8516 2.46094 27.8516 3.85742L27.8516 19.1016C27.8516 20.5078 27.0898 21.2305 25.752 21.2305Z"
                            fill="currentColor" />
                    </svg>
                    <span>${translate(locale, "server", { n: 1 })}</span>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21.6895 12.959" aria-hidden="true"
                    focusable="false">
                    <path
                        d="M10.6641 12.959C10.9473 12.959 11.2109 12.832 11.4062 12.6172L21.0352 2.58789C21.2207 2.40234 21.3281 2.16797 21.3281 1.89453C21.3281 1.34766 20.9082 0.927734 20.3516 0.927734C20.0977 0.927734 19.8438 1.02539 19.6582 1.20117L10.0684 11.1816L11.2695 11.1816L1.66016 1.20117C1.48438 1.02539 1.24023 0.927734 0.976562 0.927734C0.419922 0.927734 0 1.34766 0 1.89453C0 2.16797 0.117188 2.40234 0.292969 2.59766L9.92188 12.627C10.1367 12.832 10.3809 12.959 10.6641 12.959Z"
                        fill="currentColor" />
                </svg>
            </button>`;

  const downloadAnchor = `
        <a href="#" target="_blank" rel="noopener noreferrer" tabindex="-1"
            class="vidix-control-download vidix-skeleton" aria-label="${escapeHtml(translate(locale, "downloadVideo", { title: videoTitle }))}" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.2676 25.6348" aria-hidden="true"
                focusable="false"${accentSvgStyle}>
                <path
                    d="M18.9062 14.2773C18.9062 13.75 18.5156 13.3496 17.9883 13.3496C17.7344 13.3496 17.4805 13.4375 17.3145 13.6035L13.8477 17.0312L9.72656 21.5137L10.293 21.7188L10.4004 18.1641L10.4004 0.976562C10.4004 0.429688 10.0098 0.0390625 9.45312 0.0390625C8.89648 0.0390625 8.50586 0.429688 8.50586 0.976562L8.50586 18.1641L8.61328 21.7188L9.18945 21.5137L5.05859 17.0312L1.5918 13.6035C1.42578 13.4375 1.17188 13.3496 0.917969 13.3496C0.390625 13.3496 0 13.75 0 14.2773C0 14.5312 0.0878906 14.7559 0.292969 14.9707L8.74023 23.418C8.94531 23.623 9.18945 23.7402 9.45312 23.7402C9.7168 23.7402 9.96094 23.623 10.166 23.418L18.6133 14.9707C18.8184 14.7559 18.9062 14.5312 18.9062 14.2773ZM18.9062 24.6777C18.9062 24.1309 18.5254 23.7207 17.9785 23.7207L0.947266 23.7207C0.390625 23.7207 0 24.1309 0 24.6777C0 25.2344 0.390625 25.6348 0.947266 25.6348L17.9785 25.6348C18.5254 25.6348 18.9062 25.2344 18.9062 24.6777Z"
                    fill="currentColor" />
            </svg>
            <span>${translate(locale, "download")}</span>
        </a>`;

  // Only semantic loading values are forwarded; anything else is dropped.
  const rawLoading = readAttr(player, "loading");
  const loadingAttr = ["eager", "lazy"].includes(rawLoading) ? ` loading="${rawLoading}"` : "";

  const controlBar = showControlBar
    ? `
    <div class="vidix-player-control" role="group" aria-label="${translate(locale, "controls")}"${controlAccent ? ` data-accent-vidix="${controlAccent}"` : ""}>
        <div class="vidix-control-start" role="group" aria-label="${translate(locale, "primaryActions")}">${controlShare ? shareButton : ""}${showServerSelect ? serverSelectButton : ""}
        </div>${controlDownload ? downloadAnchor : ""}
    </div>`
    : "";

  return `
    <div class="vidix-player-wrapper is-loading">
        <img class="vidix-blurup" alt="" aria-hidden="true" decoding="async"${loadingAttr} />
        <iframe title="${escapeHtml(iframeTitle)}" src=""${loadingAttr}
            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;" allowfullscreen="true"></iframe>
    </div>
${controlBar}
${controlShare ? "    <vidix-share-dialog></vidix-share-dialog>\n" : ""}`;
}
