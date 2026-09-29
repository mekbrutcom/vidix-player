/**
 * Loading activity indicator (Apple-style spinner) and blur-up placeholder.
 *
 * Ported from scaffold-design/vidix-player-full.js:2646-2703.
 */

import { ACTIVITY } from "../constants.js";
import type { VidixPlayerElement } from "../types.js";
import { getPlayerRoot } from "../utils/element.js";
import { isValidImageUrl } from "../utils/image.js";
import { translate } from "../utils/locale.js";
import { trustedHTML } from "../utils/trusted-types.js";

/** Builds the spinner SVG: N spokes fading in turn, with negative delays so the
 * animation is already mid-cycle on the first frame. */
export function activityIndicatorSvg(
  spokes = ACTIVITY.spokes,
  duration = ACTIVITY.duration,
): string {
  const { x, y, width, height, rx } = ACTIVITY.spoke;
  const step = 360 / spokes;

  const rects = Array.from({ length: spokes }, (_, i) => {
    const angle = i * step;
    const delay = (-(spokes - 1 - i) * duration) / spokes;
    return `<rect x="${x}" y="${y}" width="${width}" height="${height}" rx="${rx}" fill="currentColor" transform="rotate(${angle} 12 12)" style="animation:vidixActivityIndicatorFade ${duration}ms linear infinite;animation-delay:${delay}ms"/>`;
  }).join("");

  return `<svg class="vidix-activity" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">${rects}</svg>`;
}

/** Inserts the activity indicator into the player area (idempotent). */
export function showLoadingActivity(player: VidixPlayerElement): void {
  const wrapper = getPlayerRoot(player).querySelector(".vidix-player-wrapper");
  if (!wrapper || wrapper.querySelector(".vidix-loading")) return;
  const locale = player._vidixLocale || "en";
  wrapper.insertAdjacentHTML(
    "beforeend",
    trustedHTML(
      `<div class="vidix-loading" role="status" aria-live="polite">${activityIndicatorSvg()}<span class="v-sr-only">${translate(locale, "loadingPlayer")}</span></div>`,
    ),
  );
}

/**
 * Wires the blur-up `<img>` to the thumbnail URL. Falls back to the activity
 * indicator when there is no usable image, or when the image fails to load.
 */
export function initBlurUp(player: VidixPlayerElement): void {
  const wrapper = getPlayerRoot(player).querySelector(".vidix-player-wrapper");
  if (!wrapper) return;

  const thumbnailUrl = (player.getAttribute("metadata-thumbnail-url") || "").trim();

  if (!isValidImageUrl(thumbnailUrl)) {
    wrapper.querySelector(".vidix-blurup")?.remove();
    showLoadingActivity(player);
    return;
  }

  const img = wrapper.querySelector<HTMLImageElement>(".vidix-blurup");
  if (!img) return;

  img.src = thumbnailUrl;
  img.setAttribute("draggable", "false");
  img.addEventListener("contextmenu", (e) => e.preventDefault());
  img.addEventListener("error", () => {
    img.remove();
    showLoadingActivity(player);
  });
  img.classList.add("is-ready");
}
