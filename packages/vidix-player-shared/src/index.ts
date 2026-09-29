/**
 * Public entry of `@mekbrut-com/vidix-player-shared`.
 *
 * Published as compiled ESM + CJS + types (see `tsup.config.ts`).
 */

export { buildAttributes, createShimElement, serializeAttribute } from "./attrs";
export { resolveBlurUpSource } from "./image";
export type { ShimElement } from "./attrs";

export {
  GROUP_KEYS,
  RESERVED_PROP_KEYS,
} from "./types";
export type {
  VidixPlayerControlProps,
  VidixPlayerLayoutProps,
  VidixPlayerMetadataProps,
  VidixPlayerProps,
} from "./types";
