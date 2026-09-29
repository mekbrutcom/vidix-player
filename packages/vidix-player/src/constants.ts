/**
 * Shared constants for the vidix-player core.
 *
 * Ported from scaffold-design/vidix-player.js:278-281 (accent list) and
 * scaffold-design/vidix-player.js:422-430 (locale set); API endpoints from
 * scaffold-design/vidix-player-full.js:2497-2500.
 */

import type { AccentColor, VidixErrorCode } from "./types.js";

/** Accent color allow-list. Values map to CSS custom properties (`--vidix-*`). */
export const ACCENT_COLORS: readonly AccentColor[] = [
  "vidix",
  "default",
  "red",
  "orange",
  "yellow",
  "green",
  "mint",
  "teal",
  "cyan",
  "blue",
  "indigo",
  "purple",
  "pink",
  "brown",
] as const;

/**
 * Locales with a translated UI. The full dictionary lives in `i18n/full.ts`;
 * the shell ships only a mini subset (`i18n/mini.ts`) for first paint.
 *
 * Locale resolution: exact match wins, otherwise the language part before `_`.
 */
export const LOCALES: readonly string[] = [
  "bg",
  "ca",
  "cs",
  "da",
  "nl",
  "en",
  "en_au",
  "en_ca",
  "en_gb",
  "en_ie",
  "en_in",
  "en_sg",
  "en_za",
  "et",
  "fil",
  "fi",
  "fr",
  "fr_ca",
  "fr_ch",
  "de",
  "de_at",
  "el",
  "hi",
  "hu",
  "is",
  "id",
  "it",
  "ja",
  "ko",
  "lv",
  "lt",
  "ms",
  "no",
  "pl",
  "pt",
  "pt_br",
  "pt_pt",
  "ro",
  "ru",
  "sr",
  "sk",
  "sl",
  "es",
  "es_419",
  "es_ar",
  "es_cl",
  "es_co",
  "es_cr",
  "es_do",
  "es_ec",
  "es_sv",
  "es_gt",
  "es_hn",
  "es_mx",
  "es_ni",
  "es_pa",
  "es_pe",
  "es_pr",
  "es_py",
  "es_us",
  "es_uy",
  "es_ve",
  "sv",
  "th",
  "tr",
  "uk",
  "vi",
  "zh",
  "zh_cn",
  "zh_hk",
  "zh_tw",
] as const;

/** Filename of the shell bundle (this package's own CDN entry). */
export const SHELL_FILE = "vidix-player.js";
/** Filename of the classic-script (IIFE) shell served by the bare CDN URL. */
export const SHELL_IIFE_FILE = "vidix-player.iife.js";
/** Filename of the full bundle (sibling of the shell on the CDN). */
export const FULL_FILE = "vidix-player-full.js";

/** Backend API endpoints, tried in order (primary then fallback). */
export const BACKEND_API = {
  primary: "https://vidix.my.id",
  fallback: "https://vidix.us.ci",
} as const;

/** Error code -> i18n key mapping. */
export const ERROR_KEYS: Record<VidixErrorCode, string> = {
  vod_not_found: "errVodNotFound",
  server_down: "errServerDown",
  unknown: "errUnknown",
};

/** Server selector clamp bounds. */
export const SERVER_COUNT = {
  /** Value used when the attribute is missing or unparsable. */
  default: 3,
  min: 0,
  max: 10,
  /** Below this the selector trigger is not rendered at all. */
  minToShowSelect: 2,
  /** Hard cap for the dropdown list itself. */
  dropdownMax: 10,
} as const;

/** Image extensions accepted for thumbnails/blur-up placeholders. */
export const IMAGE_EXTENSIONS = ["png", "jpg", "jpeg", "webp", "avif", "gif"] as const;

/** Activity indicator geometry (Apple-style spinner). */
export const ACTIVITY = {
  spokes: 8,
  duration: 1000,
  spoke: { x: 10.5, y: 2, width: 3, height: 6, rx: 1.5 },
} as const;

/** Trusted Types policy name. Consumers with a `trusted-types` allowlist must include it. */
export const TRUSTED_TYPES_POLICY = "vidix-player";

/**
 * Global override hook for the full bundle URL (mirrors the labs
 * `window.VIDIX_FULL_SRC`). When set, the shell loads this URL instead of the
 * auto-detected sibling.
 */
export const FULL_SRC_OVERRIDE_KEY = "VIDIX_FULL_SRC";
