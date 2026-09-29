/**
 * Public types for the vidix-player core.
 *
 * These describe the HTML attribute API of the `<vidix-player>` element and the
 * shapes that framework wrappers (Astro/React/Svelte) re-expose as props. Every
 * exported symbol here carries JSDoc so IDEs can show prop descriptions on hover.
 */

/**
 * Accent colors accepted by `accent-color` / `layout-control-accent`.
 *
 * `"vidix"` and `"default"` both resolve to the brand link color; every other
 * value maps to its own color token. Any other string is ignored (no accent).
 */
export type AccentColor =
  | "vidix"
  | "default"
  | "red"
  | "orange"
  | "yellow"
  | "green"
  | "mint"
  | "teal"
  | "cyan"
  | "blue"
  | "indigo"
  | "purple"
  | "pink"
  | "brown";

/**
 * Where the control bar sits relative to the video area.
 *
 * - `"bottom"` (default): controls below the 16:9 area.
 * - `"top"`: controls above it.
 */
export type ControlPosition = "bottom" | "top";

/**
 * Iframe loading semantics, forwarded to the embedded player `<iframe>` and the
 * blur-up `<img>`. Any other value is ignored (browser default applies).
 */
export type LoadingMode = "eager" | "lazy";

/**
 * Theme resolved for the player. Follows the document theme: an explicit
 * `data-theme` (or `dark`/`light` class) on `<html>`, otherwise the OS
 * `prefers-color-scheme` preference.
 */
export type Theme = "light" | "dark";

/**
 * The full set of `<vidix-player>` attributes.
 *
 * Boolean attributes are `true` when present or empty, and only `"false"`
 * disables them — matching HTML boolean attribute conventions.
 */
export interface VidixPlayerProps {
  /**
   * The video ID to play (required). Without it the player renders nothing but
   * a console message, e.g. `"vod-1_parameter_server"`.
   */
  playbackId: string;
  /**
   * UI language. Resolves in this order: this attribute, then `<html lang>`,
   * then `"en"`. Accepts ~50 locales (`"id"`, `"en"`, `"en_gb"`, `"es_419"`,
   * `"zh_tw"`, …). Unknown values fall back to `<html lang>`.
   * @default "<html lang>" or "en"
   */
  lang?: string;
  /**
   * Accent color of the player UI. See {@link AccentColor}.
   */
  accentColor?: AccentColor;
  /**
   * Position of the control bar. See {@link ControlPosition}.
   * @default "bottom"
   */
  layoutControlPosition?: ControlPosition;
  /**
   * Separate accent color for control-bar icons. Independent of `accentColor`,
   * so they may differ. See {@link AccentColor}.
   */
  layoutControlAccent?: AccentColor;
  /**
   * Show the share button and its dialog.
   * @default true
   */
  controlShare?: boolean;
  /**
   * Number of servers in the server selector, clamped to `0`–`10`. The selector
   * only appears at `2` or more.
   * @default 3
   */
  controlServerCount?: number;
  /**
   * Show the download button. The server may still hide it (`downloadable: false`).
   * @default true
   */
  controlDownload?: boolean;
  /**
   * Video title used for the iframe `title`, download label, and share dialog.
   * When omitted, the server title is used (if `metadataServerTitle` is enabled),
   * otherwise a translated fallback.
   */
  metadataVideoTitle?: string;
  /**
   * Thumbnail/poster URL shown as a blur-up placeholder before the iframe loads.
   * Must be a plain http(s) URL to an image file.
   */
  metadataThumbnailUrl?: string;
  /**
   * Use the video title from the server response.
   * @default true
   */
  metadataServerTitle?: boolean;
  /**
   * Iframe/img loading behavior. See {@link LoadingMode}.
   */
  loading?: LoadingMode;
  /**
   * Emit `[vidix-player]` diagnostic lines to the browser console. Dev-only.
   * @default false
   */
  consoleLog?: boolean;
}

/**
 * `detail` of the `vidix:server-data` event dispatched on the player element
 * once the server list has been fetched.
 */
export interface VidixServerDataEventDetail {
  /** Number of servers reported by the API. */
  serverCount: number;
}

/**
 * `detail` of the `vidix:server-select` event dispatched when the user picks a
 * different server in the selector. `value` follows the `"Server <n>"` convention.
 */
export interface VidixServerSelectEventDetail {
  value: string;
}

/** Map of the custom events dispatched by the player element. */
export interface VidixPlayerEventMap {
  "vidix:server-data": CustomEvent<VidixServerDataEventDetail>;
  "vidix:server-select": CustomEvent<VidixServerSelectEventDetail>;
}

/** A `<vidix-player>` element. Narrowed for consumers and internal modules. */
export type VidixPlayerElement = HTMLElement & {
  /** Locale resolved at render time (e.g. `"en"`, `"id"`). */
  _vidixLocale?: string;
  /** True once the full bundle has hydrated this instance. */
  _vidixHydrated?: boolean;
  /** Servers returned by the API; `undefined` before the fetch resolves. */
  _vidixServers?: VidixServerEntry[];
  /** VOD id used to build the iframe/download URLs. */
  _vidixVodId?: string;
  /** Lowercased `accent-color`, cached for URL building. */
  _vidixAccent?: string;
  /** Thumbnail from the server response (share dialog only, not blur-up). */
  _vidixThumbnail?: string;
  /** Imperative server select (full bundle), used to manage its listeners. */
  _vidixServerSelect?: {
    attachGlobalListeners(): void;
    detachGlobalListeners(): void;
  };
  addEventListener<K extends keyof VidixPlayerEventMap>(
    type: K,
    listener: (this: VidixPlayerElement, ev: VidixPlayerEventMap[K]) => void,
    options?: boolean | AddEventListenerOptions,
  ): void;
};

/** One server entry from the API `data.server` array. */
export interface VidixServerEntry {
  /** Base URL of the server, e.g. `"https://embed1.com"`. */
  url: string;
  /** Path segment for the player iframe, e.g. `"e"`. */
  player_path?: string;
  /** Path segment for downloads, e.g. `"download"`. */
  download_path?: string;
}

/** `data.vod` block of the API response. */
export interface VidixVod {
  id?: string;
  title?: string;
  thumbnail?: string;
  server_count?: number;
  /** When `false`, the download control is removed regardless of the attribute. */
  downloadable?: boolean;
}

/** Successful API response. */
export interface VidixServerData {
  vod?: VidixVod;
  server?: VidixServerEntry[];
}

/** Error codes the API can surface, mapped to translated messages. */
export type VidixErrorCode = "vod_not_found" | "server_down" | "unknown";
