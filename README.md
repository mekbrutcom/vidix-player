<p align="center">
  <img src=".github/assets/vidix-player-logo.png" width="160" alt="Vidix Player logo">
</p>

# Vidix Player

Vidix Player is a ready-to-use component library for the video player of the Vidix platform. It supports many languages, a share button, automatic server selection with a configurable count, and a download button that appears automatically if your Vidix platform settings enable it.
Everything can be configured from HTML attributes or the available framework props.

Create a Vidix account and start uploading content: [Vidix platform](https://vidix.mekbrut.com)

## Languages

This documentation is available in the following languages:

- [English (EN)](./README.md)
- [Español (ES)](./i18n/README.es.md)
- [Français (FR)](./i18n/README.fr.md)
- [हिन्दी (HI)](./i18n/README.hi.md)
- [Indonesia (ID)](./i18n/README.id.md)
- [Português (PT)](./i18n/README.pt.md)
- [Русский (RU)](./i18n/README.ru.md)
- [ไทย (TH)](./i18n/README.th.md)
- [Tiếng Việt (VI)](./i18n/README.vi.md)
- [中文 (ZH)](./i18n/README.zh.md)

## Table of contents

- [For site owners (including developers)](#for-site-owners-including-developers)
  - [How to use it on your site](#how-to-use-it-on-your-site)
    - [Vanilla JS](#vanilla-js)
      - [Supported languages](#supported-languages)
    - [React](#react)
    - [Astro](#astro)
    - [Svelte / Kit](#svelte--kit)
    - [Manual iframe](#manual-iframe)
  - [Advanced](#advanced)
  - [Troubleshooting](#troubleshooting)
- [Transparency and tolerance](#transparency-and-tolerance)
- [Contributing to the repository](#contributing-to-the-repository)
- [Report bugs and security vulnerabilities](#report-bugs-and-security-vulnerabilities)

---

## For site owners (including developers)

Vidix Player integrates fully with many frameworks. Use the component that is
compatible with your site.

### How to use it on your site

### Vanilla JS

Suitable for native HTML, PHP, and other environments that do not run on
Node.js / a JavaScript bundler.

#### Hosted script

Place this script inside the `<head>...</head>` of the page where you want to
display `vidix-player`:

```html
<script src="https://cdn.jsdelivr.net/npm/@mekbrut-com/vidix-player"></script>
```

#### The vidix-player component

```html
<vidix-player
  playback-id="tUVARXFmPnT"
  lang=""
  accent-color=""
  layout-control-position=""
  layout-control-accent=""
  metadata-server-title="true"
  metadata-video-title=""
  metadata-thumbnail-url="https://....png"
  control-share="true"
  control-server-count="3"
  control-download="true"
  loading=""
  role=""
  aria-label="Video player"
></vidix-player>
```

#### Attributes

| Prop/attr                  | Required | Type        | Default             | Description                                                                                                       |
| -------------------------- | -------- | ----------- | ------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `playback-id`              | **Yes**  | string      | —                   | The video ID generated from your video upload on the Vidix platform, e.g. `tUVARXFmPnT`. Without this the player renders nothing. |
| `lang`                     | No       | string      | `<html lang>`, `en` | Interface language, e.g. `id`, `en`, `es_419`, `zh_tw`, `vi`. Full list: [Supported languages](#supported-languages). Unknown values fall back to `<html lang>`, then `en`. |
| `accent-color`             | No       | string      | (theme default)     | Accent color of the player. One of: `vidix`, `default`, `red`, `orange`, `yellow`, `green`, `mint`, `teal`, `cyan`, `blue`, `indigo`, `purple`, `pink`, `brown`. Other values are ignored. |
| `layout-control-position`  | No       | string      | `bottom`            | Control bar position: `bottom` or `top`.                                                                          |
| `layout-control-accent`    | No       | string      | (theme default)     | Accent color of the buttons in the control bar (share button, server selection, and download). Same list of values as `accent-color`. |
| `control-share`            | No       | boolean     | `true`              | Show the share button + its share dialog. The shared link is your site's link, not the direct video link or the embed link. |
| `control-server-count`     | No       | number      | `3`                 | Number of servers in the server selection menu. Range `0`–`10`; the menu appears at `≥ 2`.                        |
| `control-download`         | No       | boolean     | `true`              | Show the video download button. The button may automatically disappear if you disabled downloads in the Vidix platform settings, even if you set it to `true`. |
| `metadata-video-title`     | No       | string      | —                   | Video title for accessibility (`aria` label) and the download button.                                              |
| `metadata-thumbnail-url`   | No       | string (URL)| —                   | Thumbnail/poster image URL. Used as a blur-up placeholder before the video is ready.                               |
| `metadata-server-title`    | No       | boolean     | `true`              | Show the name/title provided by the server in the player. Set to `"false"` to hide it.                             |
| `loading`                  | No       | string      | (browser default)   | When to load the player iframe: `eager` (immediately) or `lazy` (when nearly visible). Other values are ignored.   |
| `console-log`              | No       | boolean     | `false`             | Set to `"true"` to log diagnostic messages to the DevTools console. Enable it if you have integration issues — they will show up clearly in the DevTools console. |
| `role`, `aria-label`       | No       | —           | —                   | Standard HTML accessibility attributes; passed through as-is.                                                     |

#### Supported languages

The player recognizes **71 locale codes** across 37 languages. Codes may be
written with hyphens or underscores (`en-GB` is treated the same as `en_gb`)
and are case-insensitive.

| Language                  | `lang` codes                                 |
| ------------------------- | -------------------------------------------- |
| Bulgarian                 | `bg`                                         |
| Catalan                   | `ca`                                         |
| Chinese                   | `zh`, `zh_cn`, `zh_hk`, `zh_tw`              |
| Czech                     | `cs`                                         |
| Danish                    | `da`                                         |
| Dutch                     | `nl`                                         |
| English                   | `en`, `en_au`, `en_ca`, `en_gb`, `en_ie`, `en_in`, `en_sg`, `en_za` |
| Estonian                  | `et`                                         |
| Filipino                  | `fil`                                        |
| Finnish                   | `fi`                                         |
| French                    | `fr`, `fr_ca`, `fr_ch`                       |
| German                    | `de`, `de_at`                                |
| Greek                     | `el`                                         |
| Hindi                     | `hi`                                         |
| Hungarian                 | `hu` _(English text for now)_                |
| Icelandic                 | `is`                                         |
| Indonesian                | `id`                                         |
| Italian                   | `it`                                         |
| Japanese                  | `ja`                                         |
| Korean                    | `ko`                                         |
| Latvian                   | `lv`                                         |
| Lithuanian                | `lt`                                         |
| Malay                     | `ms`                                         |
| Norwegian                 | `no`                                         |
| Polish                    | `pl`                                         |
| Portuguese                | `pt` _(English text for now)_, `pt_br`, `pt_pt` |
| Romanian                  | `ro`                                         |
| Russian                   | `ru`                                         |
| Serbian                   | `sr`                                         |
| Slovak                    | `sk`                                         |
| Slovenian                 | `sl`                                         |
| Spanish                   | `es`, `es_419`, `es_ar`, `es_cl`, `es_co`, `es_cr`, `es_do`, `es_ec`, `es_sv`, `es_gt`, `es_hn`, `es_mx`, `es_ni`, `es_pa`, `es_pe`, `es_pr`, `es_py`, `es_us`, `es_uy`, `es_ve` |
| Swedish                   | `sv`                                         |
| Thai                      | `th`                                         |
| Turkish                   | `tr`                                         |
| Ukrainian                 | `uk`                                         |
| Vietnamese                | `vi`                                         |

Notes:

- Regional variants without their own dictionary (e.g. `en_gb`, `es_mx`,
  `fr_ca`) automatically use the base language's dictionary.
- Codes that do not yet have their own dictionary (`hu`, `pt`) temporarily show
  English text. Use their regional variants (`pt_br`/`pt_pt`) to get text in
  that language.
- Codes outside the list above fall back to `<html lang>`, then `en`.

### React

#### Install

```bash
# npm
npm install @mekbrut-com/vidix-player-react
```
```bash
# pnpm
pnpm add @mekbrut-com/vidix-player-react
```
```bash
# yarn
yarn add @mekbrut-com/vidix-player-react
```
```bash
# bun
bun add @mekbrut-com/vidix-player-react
```

Requires React 18 or 19 as a peer dependency; the core (`@mekbrut-com/vidix-player`) and the
shared helpers come along as dependencies.

#### Mount the component

```tsx
import { VidixPlayer } from "@mekbrut-com/vidix-player-react";

export function Page() {
  return (
    <VidixPlayer
      playbackId="tUVARXFmPnT"
      lang="en"
      accentColor="green"
      layout={{
        controlPosition: "bottom",
        controlAccent: "red"
      }}
      metadata={{
        videoTitle: "My video",
        thumbnailUrl: "https://....png",
        serverTitle: true,
      }}
      control={{
        share: true,
        serverCount: 3,
        download: true
      }}
      loading="eager"
      consoleLog={true}
      role="region"
      ariaLabel="Video player"
    />
  );
}
```

#### Props

| Prop                       | Attribute                    | Type                  | Default             | Description                                                    |
| -------------------------- | ---------------------------- | --------------------- | ------------------- | -------------------------------------------------------------- |
| `playbackId`               | `playback-id`                | `string`              | —                   | Video ID. Required.                                            |
| `lang`                     | `lang`                       | `string`              | `<html lang>` / `en`| UI language; 71 locale codes supported — [full list](#supported-languages). |
| `accentColor`              | `accent-color`               | `AccentColor`         | —                   | UI accent color.                                               |
| `loading`                  | `loading`                    | `"eager"` \| `"lazy"` | —                   | iframe/blur-up loading behavior.                               |
| `consoleLog`               | `console-log`                | `boolean`             | `false`             | Log `[vidix-player]` diagnostics to the console. Dev-only.     |
| `lqip`                     | _wrapper-only_               | `boolean`             | `true`              | Show a blur-up placeholder (see [Advanced](#advanced)).        |
| **`metadata`**             |                              |                       |                     |                                                                |
| `metadata.videoTitle`      | `metadata-video-title`       | `string`              | —                   | iframe title, download label, share text.                      |
| `metadata.thumbnailUrl`    | `metadata-thumbnail-url`     | `string`              | —                   | Poster used as the blur-up placeholder. Absolute http(s) URL.   |
| `metadata.thumbnailLqip`   | _wrapper-only_               | `string`              | —                   | Explicit placeholder; overrides `thumbnailUrl` for the blur-up. |
| `metadata.serverTitle`     | `metadata-server-title`      | `boolean`             | `true`              | Use the title from the server response.                        |
| **`layout`**               |                              |                       |                     |                                                                |
| `layout.controlPosition`   | `layout-control-position`    | `"bottom"` \| `"top"` | `"bottom"`          | Control bar position.                                          |
| `layout.controlAccent`     | `layout-control-accent`      | `AccentColor`         | —                   | Control bar button accent color (independent of `accentColor`). |
| **`control`**              |                              |                       |                     |                                                                |
| `control.share`            | `control-share`              | `boolean`             | `true`              | Show the share button + dialog.                                |
| `control.serverCount`      | `control-server-count`       | `number`              | `3`                 | Servers in the selector, clamped `0`–`10`; shown at `2`+.      |
| `control.download`         | `control-download`           | `boolean`             | `true`              | Show the download button (the server may still hide it).       |
| **events**                 |                              |                       |                     |                                                                |
| `onServerData`             | `vidix:server-data`          | `(detail) => void`    | —                   | Fires with `{ serverCount }` when the server list resolves.    |
| `onServerSelect`           | `vidix:server-select`        | `(detail) => void`    | —                   | Fires with `{ value }` when the user picks a server.           |

### Astro

The Astro wrapper renders a Declarative Shadow DOM skeleton on the server: the
16:9 box + critical CSS are present **before any JavaScript loads**, so layout
shift (CLS) on hydration is ~0.

#### Install

```bash
# npm
npm install @mekbrut-com/vidix-player-astro
```
```bash
# pnpm
pnpm add @mekbrut-com/vidix-player-astro
```
```bash
# yarn
yarn add @mekbrut-com/vidix-player-astro
```
```bash
# bun
bun add @mekbrut-com/vidix-player-astro
```

Requires Astro 4+ as a peer dependency.

#### Mount the component

```astro
---
import { VidixPlayer } from "@mekbrut-com/vidix-player-astro";
---

<VidixPlayer
  playbackId="tUVARXFmPnT"
  lang="en"
  accentColor=""
  layout={{
    controlPosition: "bottom",
    controlAccent: "red"
  }}
  metadata={{
    videoTitle: "My videos",
    thumbnailUrl: "https://....jpg",
    serverTitle: true,
  }}
  control={{
    share: true,
    serverCount: 3,
    download: true
  }}
  loading="eager"
  consoleLog={true}
  role="region"
  ariaLabel="Video player"
/>
```

#### Props

The prop list is the same as [React](#props), except Astro has no
`onServerData` / `onServerSelect` event props. Attach your own listeners in a
client-side script if you need them:

```astro
<script>
  document.querySelector("vidix-player")?.addEventListener("vidix:server-data", (event) => {
    console.log("servers:", event.detail.serverCount);
  });
</script>
```

### Svelte / Kit

#### Install

```bash
# npm
npm install @mekbrut-com/vidix-player-svelte
```
```bash
# pnpm
pnpm add @mekbrut-com/vidix-player-svelte
```
```bash
# yarn
yarn add @mekbrut-com/vidix-player-svelte
```
```bash
# bun
bun add @mekbrut-com/vidix-player-svelte
```

Requires Svelte 5 as a peer dependency.

#### Mount the component

```svelte
<script lang="ts">
  import { VidixPlayer } from "@mekbrut-com/vidix-player-svelte";
</script>

<VidixPlayer
  playbackId="tUVARXFmPnT"
  lang="en"
  accentColor="green"
  layout={{
    controlPosition: "bottom",
    controlAccent: "red"
  }}
  metadata={{
    videoTitle: "My video",
    thumbnailUrl: "https://....png",
    serverTitle: true,
  }}
  control={{
    share: true,
    serverCount: 3,
    download: true
  }}
  loading="eager"
  onServerData={(detail) => console.log("servers:", detail.serverCount)}
/>
```

#### Props

The prop and event list is the same as [React](#props) (Svelte 5 uses the
`onServerData` / `onServerSelect` callback props, not the deprecated
`createEventDispatcher`).

### Manual iframe

A manual iframe is a regular semantic HTML iframe, so it has only one server: the server you chose on the Vidix platform.

This iframe tag is provided or generated by the Vidix platform from the video you uploaded — just copy it from the Vidix platform and embed it on your site:

```html
<iframe
  src="https://..."
  title="Example videos"
  allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
  allowfullscreen="true"
></iframe>
```

---

## Advanced

**Boolean rules in Vanilla JS:** boolean attributes are enabled just by writing
their name (or `="true"`), and disabled with `="false"`. Example:
`control-share="false"`.

**Props are mount-time configuration.** The core reads attributes once in
`connectedCallback` (there are no `observedAttributes`), so changing props after
mount does not update the running player. Provide a `key` (React/Svelte) or
remount the element when the configuration must change:

```svelte
{#key playbackId}
  <VidixPlayer {playbackId} />
{/key}
```

**Light/dark theme**

The player follows the page theme automatically, with no extra attributes:

- If `<html data-theme="dark">` (or the `dark` class) is present → dark mode.
- If `<html data-theme="light">` (or the `light` class) is present → light mode.
- If neither is present → it follows the user's system `prefers-color-scheme`.

**Security notes (CSP / Trusted Types)**

The player is designed to be strict-CSP friendly:

- **No `eval`, no inline event handlers** — safe under a strict `script-src`.
- **Styles are installed via `adoptedStyleSheets`**, not injected `<style>` tags —
  compatible with `style-src` without `'unsafe-inline'`.
- If your site applies `require-trusted-types-for 'script'`, add the policy name
  **`vidix-player`** to your `trusted-types` allowlist. Without that name, the
  player cannot render under that CSP.

## Troubleshooting

- **The player does not appear at all** — check `playback-id` (required) and
  enable `console-log="true"` to see messages in DevTools.
- **The control bar is missing** — the control bar appears only if at least one
  of `control-share`, `control-server-count` (≥ 2), or `control-download` is
  active.
- **The theme does not match** — make sure there is no conflicting `data-theme`
  on another tag; the player reads the theme from the `<html>` element.

---

## Transparency and tolerance

### Rate limit: 20 req/min per viewer IP

We limit each visitor of your site to seeing the video appear at most
20× per minute. 20 times per minute is already very large — 4 to 5 times
larger than typical usage. Usually, more than 20 times per minute is a bot or
automation attacking your site.

Counting is based on the viewer's IP. For example, viewer A (a human),
viewer B (an attacking bot), and C (a search engine crawler):

- Viewer B (the attacking bot) scrapes to grab videos en masse → the Vidix
  Player backend blocks it.
- Viewer A (a human) and C (a search engine crawler) can still access it
  without any disruption at all.

Indirectly, this protects your videos from bots (which usually means content
thieves), while keeping the Vidix Player backend running normally (so it does
not go down because of an attacker).

### Infrastructure, backend languages, and edge

**The infrastructure runs in the European Union.** All backend processing runs
entirely and is handled in the European Union region by load-balancing
requests. This is one reason Vidix is a safe and fast choice.

**Backend languages.** We are open about the fact that we use several backend
languages at once to keep this service optimal:

- **Rust** — about 60% for the API.
- **Go** — about 25%, helping Rust process data because it needs a garbage
  collector and its compiler speed.
- **Python** — about 10% for behind-the-scenes automation.
- **Shell** — the rest, to run infrastructure, cron, and other needs so that
  connections stay alive.

**Edge network.** We use edge services from several providers: one YCombinator
startup graduate that prefers not to be named, Cloudflare, AWS, Akamai, Oracle,
and IBM.

We do not use GCP for the time being because we do not want network management
touched by AI (Gemini). It could be configured, but we choose not to use it for
now, so Vidix's GDPR can always run without third-party interference.

---

## Contributing to the repository

We would greatly appreciate your help in developing Vidix Player. Please send a
pull request. Thank you for helping us develop this component library!

Not sure where to start contributing? Here is your map.

### Code map (code-tree)

```
vidix-player/
├── packages/
│   ├── vidix-player/          core library (source of truth; TypeScript)
│   ├── vidix-player-shared/   shared prop/attribute/image helpers for wrappers
│   ├── vidix-player-astro/    Astro wrapper (SSR skeleton, zero layout shift)
│   ├── vidix-player-react/    React wrapper (SSR-friendly, "use client")
│   └── vidix-player-svelte/   Svelte 5 wrapper (SSR-friendly, source-shipping)
├── e2e/                       Playwright tests + fixtures (not published)
│   ├── astro-app/             Astro parity pages
│   ├── react-app/             React parity pages (Vite SSR)
│   ├── svelte-app/            Svelte parity pages (Vite SSR)
│   ├── vanillajs-app/         vanilla JS parity page (manual QA)
│   └── tests/                 parity specs
├── biome.json                 lint + format config
├── tsconfig.base.json         base TypeScript config
└── pnpm-workspace.yaml        workspace definition
```

For the development environment you need Node.js 18+ and
[pnpm](https://pnpm.io):

```bash
pnpm install
pnpm build       # build all packages in packages/*
pnpm typecheck   # typecheck all packages
pnpm lint        # biome check
pnpm test:e2e    # Playwright parity tests (see ./e2e)
```

### Per-framework test pages (E2E)

Each wrapper has a parity page so QA and reviewers can compare it against the
vanilla core before release:

| Page                          | How to run                                                       |
| ----------------------------- | ---------------------------------------------------------------- |
| Vanilla (`e2e/vanillajs-app`) | `pnpm --filter vidix-player-vanillajs-e2e run preview` → `:3713` |
| Astro (`e2e/astro-app`)       | `pnpm --filter vidix-player-astro-e2e run preview` → `:3712`      |
| React (`e2e/react-app`)       | `pnpm --filter vidix-player-react-e2e run preview` → `:3714`      |
| Svelte (`e2e/svelte-app`)     | `pnpm --filter vidix-player-svelte-e2e run preview` → `:3715`      |

All four pages render the same two players (different accent, control
position, and language) so the vanilla core and each wrapper can be compared
side by side. The vanilla page uses the built core exactly like the CDN tag
(`/dist/vidix-player.js`); the React and Svelte pages test the SSR + hydration
path (attributes only in the server HTML — no Declarative Shadow DOM, which
neither React nor Svelte can hydrate). Automatic parity lives in `e2e/tests`:

- `pnpm test:e2e` runs all four Playwright projects (`chromium` for vanilla,
  `astro`, `react`, and `svelte` for the wrappers) and ensures: vanilla/Astro
  ship the skeleton before JavaScript (the Astro wrapper via Declarative
  Shadow DOM), the React and Svelte wrappers ship the bare element with
  attributes and no DSD, geometry maintains the 16:9 box + control bar
  invariants in every case, and the iframe, share dialog, and server select
  all work after hydration.

The vanilla `csp-tt.spec.ts` is the strict-CSP gate; the Astro wrapper inlines
critical CSS into its SSR skeleton, so it does not check strict CSP (see
`packages/vidix-player-astro/README.md`).

> You may use AI to understand the code and make fixes. Merging happens after your push is reviewed by the Vidix team or a trusted OSS collaborator.

---

## Report bugs and security vulnerabilities

Found a bug? Please [open an issue](https://github.com/mekbrutcom/vidix-player/issues).

Found a security vulnerability? [Report it privately](https://mekbrut.com/contact/bug-report).

For security vulnerabilities, **do not open a public issue**. Contact us via
the "Report it privately" link above or via the email listed on this GitHub
profile. We will forward it to the security team to fix it as soon as possible.

---

## License

Apache License 2.0 — see [LICENSE](./LICENSE).
