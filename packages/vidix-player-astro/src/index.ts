/**
 * Public entry of `@mekbrut-com/vidix-player-astro`.
 *
 * The package ships uncompiled: Astro/Vite of the consuming project compiles
 * the `.astro` component, which preserves tree-shaking and the JSDoc hover text
 * on the props.
 *
 * The prop/attribute/image helpers come from `@mekbrut-com/vidix-player-shared`,
 * which the React/Svelte wrappers use too — the public surface below is
 * preserved verbatim, only the source of the symbols moved.
 */

export { default as VidixPlayer } from "./VidixPlayer.astro";

export {
  buildAttributes,
  createShimElement,
  serializeAttribute,
  resolveBlurUpSource,
} from "@mekbrut-com/vidix-player-shared";
export type { ShimElement } from "@mekbrut-com/vidix-player-shared";

export type {
  VidixPlayerControlProps,
  VidixPlayerLayoutProps,
  VidixPlayerMetadataProps,
  VidixPlayerProps,
} from "@mekbrut-com/vidix-player-shared";

// Re-exported so consumers can type the element and its events.
export type {
  AccentColor,
  ControlPosition,
  LoadingMode,
  Theme,
  VidixPlayerElement,
  VidixPlayerEventMap,
  VidixServerDataEventDetail,
  VidixServerSelectEventDetail,
} from "@mekbrut-com/vidix-player";
