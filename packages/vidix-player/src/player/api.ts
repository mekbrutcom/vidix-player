/**
 * Backend API client (primary -> fallback).
 *
 * Ported from scaffold-design/vidix-player-full.js:2516-2540.
 */

import { BACKEND_API, ERROR_KEYS } from "../constants.js";
import type { VidixErrorCode, VidixPlayerElement, VidixServerData } from "../types.js";
import { log } from "../utils/log.js";

export type ServerFetchResult = {
  data: VidixServerData | null;
  /** Set when no server could be reached; the code maps to a translated message. */
  error: VidixErrorCode | null;
};

/**
 * Fetches server data for a playback id. Tries the primary endpoint, then the
 * fallback, keeping the last structured/network error to surface to the user.
 */
export async function fetchServerData(
  player: VidixPlayerElement,
  playbackId: string,
  searchParams: URLSearchParams,
): Promise<ServerFetchResult> {
  const query = searchParams.toString();
  const path = `/v1/server/${encodeURIComponent(playbackId)}${query ? `?${query}` : ""}`;

  let lastError: VidixErrorCode = "unknown";

  for (const base of [BACKEND_API.primary, BACKEND_API.fallback]) {
    try {
      const response = await fetch(base + path);
      if (!response.ok) {
        // Non-2xx (including non-JSON error pages): treat as unreachable.
        lastError = "server_down";
        log(player, `${base}${path} responded ${response.status}`, response.status);
        continue;
      }
      const json: unknown = await response.json();
      const payload = json as { data?: VidixServerData; error?: VidixErrorCode };
      if (payload?.data) {
        return { data: payload.data, error: null };
      }
      // Structured error (e.g. vod_not_found): allowlist it, try the fallback.
      const reported = payload?.error;
      lastError = reported && reported in ERROR_KEYS ? reported : "unknown";
      log(player, `${base}${path}`, json);
    } catch (error) {
      // Server down / network failure: log it, try the fallback.
      lastError = "server_down";
      log(player, `failed to connect ${base}${path}`, error);
    }
  }

  return { data: null, error: lastError };
}
