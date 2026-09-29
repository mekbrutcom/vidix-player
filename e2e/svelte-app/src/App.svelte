<!--
  QA parity page — mirrors `scaffold-design/index.html` (the labs baseline) and
  the Astro/React pages, so reviewers can eyeball the Svelte wrapper against the
  vanilla player side by side.

  Two players with differing accent/position/language, exactly like the oracle:
  green/red at the bottom (`lang="id"`) and yellow/blue at the top (`lang="es"`).

  Svelte cannot emit Declarative Shadow DOM (sveltejs/svelte#13271 /
  sveltejs/kit#9903), so — unlike the Astro page — the SSR markup is an empty
  `<vidix-player>` with attributes only. The 16:9 box appears when the element
  upgrades on the client (not before first paint). Run with:
  `pnpm --filter vidix-player-svelte-e2e run preview`.
-->
<script lang="ts">
  import { VidixPlayer } from "@mekbrut-com/vidix-player-svelte";

  const THUMBNAIL =
    "https://files.vidstack.io/sprite-fight/poster.webp";

  let { path }: { path: string } = $props();
</script>

{#if path.startsWith("/silent")}
  <!--
    Single player with diagnostics off. Used by the parity spec to prove
    `consoleLog={false}` really is silent — on the two-player page the log lines
    are not attributable to a specific player. The `onServerData` event prop is
    exercised here too: the spec reads it back off `window`.
  -->
  <main>
    <VidixPlayer
      playbackId="vod-1_parameter_server"
      metadata={{ videoTitle: "Test VOD", thumbnailUrl: THUMBNAIL }}
      control={{ share: true, serverCount: 3, download: true }}
      consoleLog={false}
      onServerData={(detail) => {
        (window as Window & { __vidixServerData?: number }).__vidixServerData =
          detail.serverCount;
      }}
    />
  </main>
{:else}
  <main>
    <section class="qa-note">
      <strong>QA page — Svelte vs vanilla/Astro/React parity.</strong>
      Two players with different accent/position/language (same as
      <code>scaffold-design/index.html</code> and the Astro/React pages): green/red
      at the bottom (<code>lang="id"</code>) and yellow/blue at the top
      (<code>lang="es"</code>). Svelte cannot emit Declarative Shadow DOM, so SSR
      only emits the <code>&lt;vidix-player&gt;</code> element with attributes —
      the 16:9 box appears when the element upgrades on the client (not before
      first paint).
    </section>

    <VidixPlayer
      playbackId="vod-1_parameter_server"
      lang="id"
      accentColor="green"
      layout={{ controlPosition: "bottom", controlAccent: "red" }}
      metadata={{
        videoTitle: "Test VOD",
        thumbnailUrl: THUMBNAIL,
        serverTitle: true,
      }}
      control={{ share: true, serverCount: 3, download: true }}
      loading="eager"
      consoleLog={true}
      role="region"
      ariaLabel="Video player"
    />

    <VidixPlayer
      playbackId="vod-1_thumbnail"
      lang="es"
      accentColor="yellow"
      layout={{ controlPosition: "top", controlAccent: "blue" }}
      metadata={{
        videoTitle: "Test VOD",
        thumbnailUrl: THUMBNAIL,
        serverTitle: true,
      }}
      control={{ share: true, serverCount: 3, download: true }}
      loading="eager"
      consoleLog={false}
      role="region"
      ariaLabel="Video player"
    />
  </main>
{/if}
