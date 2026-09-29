/**
 * Public entry of `vidix-player-svelte`.
 *
 * The package ships uncompiled (`.svelte` + `.ts`), exactly like
 * `@mekbrut-com/vidix-player-astro`: the consumer's Vite/vite-plugin-svelte
 * compiles the component, which preserves tree-shaking and the JSDoc hover text
 * on the props. The `svelte` export condition is what makes vite-plugin-svelte
 * recognize this as a framework package and process the `.svelte` source in
 * `node_modules`.
 *
 * The public surface mirrors `vidix-player-react/src/index.ts` one for one.
 */

export { default as VidixPlayer } from "./VidixPlayer.svelte";

export type { VidixPlayerSvelteProps } from "./types";

export type {
  VidixPlayerControlProps,
  VidixPlayerLayoutProps,
  VidixPlayerMetadataProps,
  VidixPlayerProps,
} from "@mekbrut-com/vidix-player-shared";

// Re-exported so consumers can type the element and its events, the same way
// `@mekbrut-com/vidix-player-react` exposes the underlying element type.
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
