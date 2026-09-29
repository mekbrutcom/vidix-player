/**
 * Props for the `<VidixPlayer>` Astro component.
 *
 * The component flattens these into the kebab-case attributes of the
 * `<vidix-player>` web component (see `attrs.ts`). Prop names mirror the core
 * types; grouped props (`metadata`, `layout`, `control`) become prefixed
 * attributes: `metadata.videoTitle` -> `metadata-video-title`.
 *
 * JSDoc on every prop is what drives the IDE hover text.
 */

import type { AccentColor, ControlPosition, LoadingMode } from "@mekbrut-com/vidix-player";

/**
 * Metadata about the video. Maps to the `metadata-*` attributes.
 */
export interface VidixPlayerMetadataProps {
  /**
   * Video title used for the iframe `title`, the download label, and the share
   * dialog. Falls back to the server title (when `serverTitle` is enabled) or a
   * translated generic label.
   */
  videoTitle?: string;
  /**
   * Poster/thumbnail URL shown as a blur-up placeholder before the iframe
   * loads. Must be an absolute `http(s)` URL to an image file. Passed through
   * raw — no CDN transformation is applied.
   */
  thumbnailUrl?: string;
  /**
   * Explicit placeholder URL. Overrides `thumbnailUrl` as the blur-up source so
   * you can ship your own pre-optimized placeholder. Only used as the blur-up
   * source; the share dialog still prefers the thumbnail returned by the server.
   */
  thumbnailLqip?: string;
  /**
   * Use the video title from the server response when available.
   * @default true
   */
  serverTitle?: boolean;
}

/**
 * Layout options. Maps to the `layout-*` attributes.
 */
export interface VidixPlayerLayoutProps {
  /**
   * Position of the control bar relative to the 16:9 video area.
   * @default "bottom"
   */
  controlPosition?: ControlPosition;
  /**
   * Accent color for control-bar icons, independent of the player accent so
   * they may differ. See {@link AccentColor}.
   */
  controlAccent?: AccentColor;
}

/**
 * Control-bar options. Maps to the `control-*` attributes.
 */
export interface VidixPlayerControlProps {
  /**
   * Show the share button and its dialog.
   * @default true
   */
  share?: boolean;
  /**
   * Number of servers offered in the server selector, clamped to `0`-`10` by
   * the core. The selector only renders at `2` or more.
   * @default 3
   */
  serverCount?: number;
  /**
   * Show the download button. The server may still hide it when the VOD is not
   * downloadable.
   * @default true
   */
  download?: boolean;
}

/**
 * Props accepted by `<VidixPlayer>`.
 *
 * Anything not listed here (for example `role`, `ariaLabel`, or `data-*`) is
 * forwarded to the host element as an attribute, so standard HTML attributes
 * keep working.
 */
export interface VidixPlayerProps {
  /**
   * The video ID to play, e.g. `"vod-1_parameter_server"`. Required — without
   * it the player renders nothing but a console diagnostic.
   */
  playbackId?: string;
  /**
   * UI language: this attribute, then `<html lang>`, then `"en"`. Accepts ~50
   * locales (`"id"`, `"en"`, `"es_419"`, `"zh_tw"`, …). Unknown values fall
   * back to `<html lang>`.
   * @default "<html lang>" or "en"
   */
  lang?: string;
  /**
   * Accent color of the player UI. See {@link AccentColor}.
   */
  accentColor?: AccentColor;
  /** Video metadata (`metadata-*` attributes). See {@link VidixPlayerMetadataProps}. */
  metadata?: VidixPlayerMetadataProps;
  /** Layout options (`layout-*` attributes). See {@link VidixPlayerLayoutProps}. */
  layout?: VidixPlayerLayoutProps;
  /** Control-bar options (`control-*` attributes). See {@link VidixPlayerControlProps}. */
  control?: VidixPlayerControlProps;
  /**
   * Iframe/img loading behavior. See {@link LoadingMode}.
   */
  loading?: LoadingMode;
  /**
   * Emit `[vidix-player]` diagnostic lines to the browser console. Dev-only.
   * @default false
   */
  consoleLog?: boolean;
  /**
   * Show a blur-up placeholder generated from `metadata.thumbnailUrl`. The
   * poster is used as-is (raw URL); set `metadata.thumbnailLqip` to supply a
   * dedicated placeholder instead.
   * @default true
   */
  lqip?: boolean;
}

/** Names of the grouped props (objects, not scalar attributes). */
export const GROUP_KEYS = ["metadata", "layout", "control"] as const;

/** Wrapper-only props that never become host attributes. */
export const RESERVED_PROP_KEYS = ["lqip", ...GROUP_KEYS] as const;

export type { AccentColor, ControlPosition, LoadingMode };
