/**
 * QA parity page — mirrors `scaffold-design/index.html` (the labs baseline) and
 * the Astro page, so reviewers can eyeball the React wrapper against the
 * vanilla player and the Astro wrapper side by side.
 *
 * Two players with differing accent/position/language, exactly like the oracle:
 * green/red at the bottom (`lang="id"`) and yellow/blue at the top (`lang="es"`).
 *
 * React cannot hydrate Declarative Shadow DOM, so — unlike the Astro page — the
 * SSR markup is an empty `<vidix-player>` with attributes only. The 16:9 box
 * appears when the element upgrades on the client. Run with:
 * `pnpm --filter vidix-player-react-e2e run preview`.
 */

import { VidixPlayer } from "@mekbrut-com/vidix-player-react";

const THUMBNAIL = "https://files.vidstack.io/sprite-fight/poster.webp";

/** Exposed for the parity spec only: it cannot read the event prop directly. */
declare global {
  interface Window {
    __vidixServerData?: number;
  }
}

export function App({ path }: { path: string }) {
  if (path.startsWith("/silent")) return <SilentPage />;

  return <MainPage />;
}

function MainPage() {
  return (
    <main>
      <section className="qa-note">
        <strong>QA page — React vs vanilla/Astro parity.</strong>
        Two players with different accent/position/language (same as
        <code>scaffold-design/index.html</code> and the Astro page): green/red at the bottom (
        <code>lang="id"</code>) and yellow/blue at the top (<code>lang="es"</code>). React cannot
        hydrate Declarative Shadow DOM, so SSR only emits the <code>&lt;vidix-player&gt;</code>{" "}
        element with attributes — the 16:9 box appears when the element upgrades on the client (not
        before first paint).
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
  );
}

/**
 * Single player with diagnostics off. Used by the parity spec to prove
 * `consoleLog={false}` really is silent — on the two-player page the log lines
 * are not attributable to a specific player. The `onServerData` event prop is
 * exercised here too: the spec reads it back off `window`.
 */
function SilentPage() {
  return (
    <main>
      <VidixPlayer
        playbackId="vod-1_parameter_server"
        metadata={{ videoTitle: "Test VOD", thumbnailUrl: THUMBNAIL }}
        control={{ share: true, serverCount: 3, download: true }}
        consoleLog={false}
        onServerData={(detail) => {
          window.__vidixServerData = detail.serverCount;
        }}
      />
    </main>
  );
}
