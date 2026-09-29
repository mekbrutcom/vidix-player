/**
 * `<vidix-player>` as a JSX intrinsic element.
 *
 * React 19 types resolve `JSX` from the `react` module (`React.JSX`); React 18
 * resolves it from the global namespace. Both are declared so consumers on
 * either version get a typed `<vidix-player>` element. Inline `import()` types
 * keep the augmentation free of unexported private names (TS4033).
 */

import type { DetailedHTMLProps, HTMLAttributes } from "react";

import type { VidixPlayerElement } from "@mekbrut-com/vidix-player";

type VidixPlayerIntrinsicProps = DetailedHTMLProps<
  HTMLAttributes<VidixPlayerElement>,
  VidixPlayerElement
>;

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "vidix-player": VidixPlayerIntrinsicProps;
    }
  }
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "vidix-player": import("react").DetailedHTMLProps<
        import("react").HTMLAttributes<import("@mekbrut-com/vidix-player").VidixPlayerElement>,
        import("@mekbrut-com/vidix-player").VidixPlayerElement
      >;
    }
  }
}
