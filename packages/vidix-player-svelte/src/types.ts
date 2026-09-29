/**
 * Props and event types for `<VidixPlayer>`.
 *
 * Mirrors `@mekbrut-com/vidix-player-react`'s public types: the documented prop
 * groups come from `@mekbrut-com/vidix-player-shared`, the event props are
 * callback functions (Svelte 5 convention — `createEventDispatcher` is
 * deprecated), and the index signature is the passthrough channel for
 * undocumented attributes (`role`, `ariaLabel`, `data-*`, …).
 */

import type {
  VidixServerDataEventDetail,
  VidixServerSelectEventDetail,
} from "@mekbrut-com/vidix-player";
import type { VidixPlayerProps } from "@mekbrut-com/vidix-player-shared";

/**
 * Event-prop handlers, called with the event `detail` (not the `CustomEvent`).
 */
export interface PlayerEventHandlers {
  /** Called when the server list resolves (see `vidix:server-data`). */
  onServerData?: (detail: VidixServerDataEventDetail) => void;
  /** Called when the user picks a server in the selector (see `vidix:server-select`). */
  onServerSelect?: (detail: VidixServerSelectEventDetail) => void;
}

/**
 * Props for `<VidixPlayer>`. Same shape and call convention as the Astro and
 * React components: the `metadata` / `layout` / `control` groups flatten to the
 * core's kebab-case attributes (`metadata.videoTitle` ->
 * `metadata-video-title`).
 *
 * The index signature is the passthrough channel: any undocumented prop
 * (`role`, `ariaLabel`, `data-*`, …) is kebab-cased and forwarded to the host
 * element. Non-primitives are dropped by `buildAttributes` rather than
 * stringified into garbage attributes, and the event props are destructured out
 * first, so only the documented surface reaches the element.
 */
export interface VidixPlayerSvelteProps extends VidixPlayerProps, PlayerEventHandlers {
  [attribute: string]: unknown;
}
