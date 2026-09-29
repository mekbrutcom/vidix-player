<!--
  `<VidixPlayer>` — Svelte wrapper around the `<vidix-player>` web component.

  Not `<svelte:options customElement>`: that compiles a Svelte component *into*
  a new custom element (and its docs warn it is "generally not suitable for
  server-side rendering"). This component wraps an element that already exists.

  The core has no `observedAttributes`: attributes are read once in
  `connectedCallback`, so props are mount-time configuration. Changing them
  later will not update the running player — remount (`#key`) instead.
-->
<script module lang="ts">
  // Statically registers the full player's hydrate function, so the shell never
  // fetches the runtime bundle at runtime. Both entries are SSR-guarded
  // (`typeof customElements === "undefined"`), so importing this module on a
  // server is a no-op — proven by the React wrapper's SSR path.
  import "@mekbrut-com/vidix-player/full";
  import { defineVidixPlayer } from "@mekbrut-com/vidix-player";

  // Registers `<vidix-player>` in the browser; idempotent, no-op on a server.
  defineVidixPlayer();
</script>

<script lang="ts">
  import { buildAttributes, resolveBlurUpSource } from "@mekbrut-com/vidix-player-shared";
  // `untrack` opts the attribute computation out of reactivity on purpose: the
  // core reads attributes once in `connectedCallback`, so props are mount-time
  // configuration and later changes must not re-render (use `{#key}` to
  // remount). Reading `rest` without it would warn `state_referenced_locally`.
  import { untrack } from "svelte";

  import type {
    VidixServerDataEventDetail,
    VidixServerSelectEventDetail,
  } from "@mekbrut-com/vidix-player";
  import type { VidixPlayerSvelteProps } from "./types";

  // Event props are wired to the element by the `$effect` below; they must not
  // reach `buildAttributes` (they are functions, not attributes).
  let { onServerData, onServerSelect, ...rest }: VidixPlayerSvelteProps =
    $props();

  // SSR and the client build the identical attribute map (deterministic
  // helper), so hydration is a no-op for this element's attributes.
  const attributes = untrack(() => buildAttributes(rest));

  // The blur-up source is the poster itself, passed through raw. The core's
  // blur-up <img> and the share-dialog thumbnail validate it themselves, so the
  // attribute must stay a plain image URL.
  const blurUpSource = untrack(() => resolveBlurUpSource(rest));
  if (blurUpSource !== undefined) {
    attributes["metadata-thumbnail-url"] = blurUpSource;
  }

  // `$state` so the `$effect` re-runs when the element mounts; a plain variable
  // would not be reactive. `bind:this` is not set during SSR, and `$effect` does
  // not run during SSR, so the listeners only attach in the browser.
  let element: HTMLElement | undefined = $state();

  $effect(() => {
    const host = element;
    if (!host) return;

    // The element dispatches its events on itself, so the wrapper attaches raw
    // `event.detail` is unwrapped before the callback, so consumers receive the payload.
    const handleServerData = (event: Event): void => {
      onServerData?.((event as CustomEvent<VidixServerDataEventDetail>).detail);
    };
    const handleServerSelect = (event: Event): void => {
      onServerSelect?.(
        (event as CustomEvent<VidixServerSelectEventDetail>).detail,
      );
    };

    host.addEventListener("vidix:server-data", handleServerData);
    host.addEventListener("vidix:server-select", handleServerSelect);

    return () => {
      host.removeEventListener("vidix:server-data", handleServerData);
      host.removeEventListener("vidix:server-select", handleServerSelect);
    };
  });
</script>

<vidix-player bind:this={element} {...attributes}></vidix-player>
