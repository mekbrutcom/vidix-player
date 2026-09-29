/**
 * `<VidixPlayer>` — React wrapper around the `<vidix-player>` web component.
 *
 * The core has no `observedAttributes`: attributes are read once in
 * `connectedCallback`, so props are mount-time configuration. Changing them
 * later will not update the running player — remount (`key`) instead.
 */

import { forwardRef, useRef } from "react";
import type {
  ForwardRefExoticComponent,
  ForwardedRef,
  MutableRefObject,
  RefAttributes,
  RefCallback,
} from "react";

import { defineVidixPlayer } from "@mekbrut-com/vidix-player";
// Statically registers the full player's hydrate function, so the shell never
// fetches the runtime bundle at runtime. Every entry point is SSR-guarded, so
// importing this module on a server is a no-op.
import "@mekbrut-com/vidix-player/full";

import type { VidixPlayerElement } from "@mekbrut-com/vidix-player";
import { buildAttributes, resolveBlurUpSource } from "@mekbrut-com/vidix-player-shared";
import type { VidixPlayerProps } from "@mekbrut-com/vidix-player-shared";

import { usePlayerEvents } from "./usePlayerEvents";
import type { PlayerEventHandlers } from "./usePlayerEvents";

// Registers `<vidix-player>` in the browser; guarded, no-op on a server.
defineVidixPlayer();

/**
 * Props for `<VidixPlayer>`. Same shape and call convention as the Astro
 * component: the `metadata` / `layout` / `control` groups flatten to the core's
 * kebab-case attributes (`metadata.videoTitle` -> `metadata-video-title`).
 *
 * Adds the `onServerData` / `onServerSelect` event props (see
 * `PlayerEventHandlers`), which the wrapper wires to the element with native
 * listeners.
 *
 * The index signature is the passthrough channel: any undocumented prop
 * (`role`, `ariaLabel`, `data-*`, …) is kebab-cased and forwarded to the host
 * element. Non-primitives are dropped by `buildAttributes` rather than
 * stringified into garbage attributes, and the event props are handled above,
 * so only the documented surface reaches the element.
 */
export interface VidixPlayerReactProps extends VidixPlayerProps, PlayerEventHandlers {
  [attribute: string]: unknown;
}

/**
 * The component type, declared explicitly. `forwardRef`'s return type wraps the
 * props in React's `PropsWithoutRef<P>`, which collapses an index-signature
 * interface to `{ [x: string]: unknown }` — the event props would lose their
 * contextual typing for consumers. Declaring the type keeps every documented
 * prop typed on both sides of the package boundary.
 */
type VidixPlayerComponent = ForwardRefExoticComponent<
  VidixPlayerReactProps & RefAttributes<VidixPlayerElement>
>;

/**
 * Feeds one element instance to every ref in the list — object refs and callback
 * refs alike. Used so the wrapper's own ref (for the event listeners) and the
 * caller's `ref` both resolve to the same element.
 */
function mergeRefs<T>(refs: Array<ForwardedRef<T>>): RefCallback<T> {
  return (instance) => {
    for (const ref of refs) {
      if (!ref) continue;
      if (typeof ref === "function") {
        ref(instance);
      } else {
        (ref as MutableRefObject<T | null>).current = instance;
      }
    }
  };
}

export const VidixPlayer: VidixPlayerComponent = forwardRef<
  VidixPlayerElement,
  VidixPlayerReactProps
>(
  // The props parameter is annotated for the same reason: the render function's
  // parameter would otherwise inherit the collapsed `PropsWithoutRef` type.
  function VidixPlayer(props: VidixPlayerReactProps, ref) {
    // Event props are wired to the element by `usePlayerEvents`; they must not
    // reach `buildAttributes` (they are functions, not attributes).
    const { onServerData, onServerSelect, ...rest } = props;

    // The wrapper keeps its own ref so the event listeners attach even when the
    // caller passes no `ref`. Both refs receive the same element.
    const innerRef = useRef<VidixPlayerElement>(null);

    const attributes = buildAttributes(rest);

    // The blur-up source is the poster itself, passed through raw. The core's
    // blur-up <img> and the share-dialog thumbnail validate it themselves, so
    // the attribute must stay a plain image URL.
    const blurUpSource = resolveBlurUpSource(rest);
    if (blurUpSource !== undefined) {
      attributes["metadata-thumbnail-url"] = blurUpSource;
    }

    usePlayerEvents(innerRef, { onServerData, onServerSelect });

    // `suppressHydrationWarning`: SSR and the client render the identical
    // attribute set, so hydration is a no-op for this element, but the flag
    // keeps any client-only attribute difference from throwing.
    return (
      <vidix-player suppressHydrationWarning {...attributes} ref={mergeRefs([ref, innerRef])} />
    );
  },
);
