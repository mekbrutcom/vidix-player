/**
 * Native event wiring for `<VidixPlayer>`.
 *
 * Handlers live in a ref so the listeners are bound once per element instead of
 * being re-bound on every render.
 */

import { useEffect, useLayoutEffect, useRef } from "react";
import type { ForwardedRef } from "react";

import type {
  VidixPlayerElement,
  VidixServerDataEventDetail,
  VidixServerSelectEventDetail,
} from "@mekbrut-com/vidix-player";

/** Event-prop handlers, called with the event `detail` (not the `CustomEvent`). */
export interface PlayerEventHandlers {
  /** Called when the server list resolves (see `vidix:server-data`). */
  onServerData?: (detail: VidixServerDataEventDetail) => void;
  /** Called when the user picks a server in the selector (see `vidix:server-select`). */
  onServerSelect?: (detail: VidixServerSelectEventDetail) => void;
}

// `useLayoutEffect` warns during SSR; this is a client component, but it is
// server-rendered by consumer frameworks (and by the parity app), so the
// isomorphic variant keeps the server output clean without changing client
// behavior: the listeners still land before paint in the browser.
const useIsomorphicLayoutEffect = typeof document !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Attaches `vidix:server-data` / `vidix:server-select` listeners to `ref.current`.
 * No-op when the ref is not an object or holds no element.
 */
export function usePlayerEvents(
  ref: ForwardedRef<VidixPlayerElement>,
  handlers: PlayerEventHandlers,
): void {
  const handlersRef = useRef<PlayerEventHandlers>(handlers);
  handlersRef.current = handlers;

  useIsomorphicLayoutEffect(() => {
    const element = ref && typeof ref === "object" ? ref.current : null;
    if (!element) return;

    // `VidixPlayerElement.addEventListener` narrows the event type, but the host
    // element is an intersection with `HTMLElement`, whose DOM overload wins
    // resolution. Typing the parameter as `Event` (what the DOM actually hands
    // us) keeps the call assignable; the cast below is safe because the listener
    // is registered for this element's own event name.
    const onServerData = (event: Event): void => {
      handlersRef.current.onServerData?.((event as CustomEvent<VidixServerDataEventDetail>).detail);
    };
    const onServerSelect = (event: Event): void => {
      handlersRef.current.onServerSelect?.(
        (event as CustomEvent<VidixServerSelectEventDetail>).detail,
      );
    };

    element.addEventListener("vidix:server-data", onServerData);
    element.addEventListener("vidix:server-select", onServerSelect);

    return () => {
      element.removeEventListener("vidix:server-data", onServerData);
      element.removeEventListener("vidix:server-select", onServerSelect);
    };
  }, [ref]);
}
