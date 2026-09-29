/**
 * Public entry of `@mekbrut-com/vidix-player-react`.
 *
 * Compiled (`dist/`) so framework bundlers never have to compile TSX out of
 * `node_modules`.
 */

// Side-effect import: declares `<vidix-player>` as a JSX intrinsic element for
// consumers of this package (kept out of the component module on purpose).
import "./jsx.js";

export { VidixPlayer } from "./VidixPlayer";
export type { VidixPlayerReactProps } from "./VidixPlayer";

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
