<p align="center">
  <img src="https://cdn.jsdelivr.net/gh/mekbrutcom/vidix-player@main/.github/assets/vidix-player-logo.png" width="160" alt="Vidix Player logo">
</p>

# @mekbrut-com/vidix-player-react

React component for the Vidix Player web component. Everything is configured through typed, grouped props — `playbackId` is the only required one.
The core (`@mekbrut-com/vidix-player`) is installed automatically as a dependency, so installing this package is all you need.

SSR-friendly (Next.js, Remix, Vite SSR, TanStack Start): the server renders the bare `<vidix-player>` element with its attributes, and the element upgrades on the client.

Create a Vidix account and start uploading content: [Vidix platform](https://vidix.mekbrut.com)

> Full documentation (guides, attribute reference, 10 languages): [github.com/mekbrutcom/vidix-player](https://github.com/mekbrutcom/vidix-player)

**Read the [CLS trade-off](#cls-read-this-before-shipping) before shipping.**

## Install

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

React 18 or 19 is required as a peer dependency; the core and the shared helpers
come along as dependencies.

## Mount the component

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
      role="region"
      ariaLabel="Video player"
      onServerData={(detail) => console.log("servers:", detail.serverCount)}
    />
  );
}
```

Props are grouped for ergonomics and flattened to the core's kebab-case
attributes: `metadata.videoTitle` becomes `metadata-video-title`,
`layout.controlPosition` becomes `layout-control-position`.

Any prop outside the table below (for example `role`, `ariaLabel`, or `data-*`)
is kebab-cased and forwarded to the host element, so standard HTML attributes
keep working. Non-primitives are dropped rather than stringified into garbage
attributes.

Event props (`onServerData` / `onServerSelect`) are React props called with the
event's `detail` (not the `CustomEvent`). The wrapper attaches native listeners
to the element, so the events fire even though the underlying element is a web
component — no `onServerData` DOM attribute ever reaches the element.

## Props

| Prop                       | Attribute                    | Type                  | Default             | Description                                                     |
| -------------------------- | ---------------------------- | --------------------- | ------------------- | --------------------------------------------------------------- |
| `playbackId`               | `playback-id`                | `string`              | —                   | Video ID. Required.                                             |
| `lang`                     | `lang`                       | `string`              | `<html lang>` / `en`| UI language; 71 locale codes supported. Unknown values fall back to `<html lang>`, then `en`. |
| `accentColor`              | `accent-color`               | `AccentColor`         | —                   | Accent color of the player UI.                                  |
| `loading`                  | `loading`                    | `"eager"` \| `"lazy"` | —                   | Iframe/blur-up loading behavior.                                |
| `consoleLog`               | `console-log`                | `boolean`             | `false`             | Emit `[vidix-player]` diagnostics to the console. Dev-only.     |
| `lqip`                     | _wrapper-only_               | `boolean`             | `true`              | Show a blur-up placeholder (see below).                         |
| **`metadata`**             |                              |                       |                     |                                                                 |
| `metadata.videoTitle`      | `metadata-video-title`       | `string`              | —                   | Iframe `title`, download label, share text.                     |
| `metadata.thumbnailUrl`    | `metadata-thumbnail-url`     | `string`              | —                   | Poster shown as the blur-up placeholder. Absolute http(s) URL.  |
| `metadata.thumbnailLqip`   | _wrapper-only_               | `string`              | —                   | Explicit placeholder URL; overrides `thumbnailUrl` for the blur-up. |
| `metadata.serverTitle`     | `metadata-server-title`      | `boolean`             | `true`              | Use the title from the server response.                         |
| **`layout`**               |                              |                       |                     |                                                                 |
| `layout.controlPosition`   | `layout-control-position`    | `"bottom"` \| `"top"` | `"bottom"`          | Control bar position.                                           |
| `layout.controlAccent`     | `layout-control-accent`      | `AccentColor`         | —                   | Accent color for control-bar icons (independent of `accentColor`). |
| **`control`**              |                              |                       |                     |                                                                 |
| `control.share`            | `control-share`              | `boolean`             | `true`              | Show the share button and dialog.                               |
| `control.serverCount`      | `control-server-count`       | `number`              | `3`                 | Servers in the selector, clamped `0`–`10`; shown at `2`+.       |
| `control.download`         | `control-download`           | `boolean`             | `true`              | Show the download button (the server may still hide it).        |
| **events**                 |                              |                       |                     |                                                                 |
| `onServerData`             | `vidix:server-data`          | `(detail) => void`    | —                   | Fires with `{ serverCount }` when the server list resolves.     |
| `onServerSelect`           | `vidix:server-select`        | `(detail) => void`    | —                   | Fires with `{ value }` when the user picks a server.            |

`AccentColor` is one of `vidix`, `default`, `red`, `orange`, `yellow`, `green`,
`mint`, `teal`, `cyan`, `blue`, `indigo`, `purple`, `pink`, `brown`.

### Booleans, defaults, and prop updates

Booleans follow HTML conventions extended by the core: absent, `""`, and `"true"`
all mean enabled; only `"false"` disables. Attributes you do not set are omitted
entirely so the **core's own defaults apply** — the wrapper never overrides them.

The core reads attributes once, in `connectedCallback` (it has no
`observedAttributes`). **Props are therefore mount-time configuration**: changing
them after mount does not update the running player. Give the component a `key`
to remount when the configuration must change:

```tsx
<VidixPlayer key={playbackId} playbackId={playbackId} />
```

### Blur-up placeholder

When `metadata.thumbnailUrl` is set and `lqip` is not `false` (the default), the
poster is used as the blur-up placeholder, passed through **raw** — no image-CDN
transformation is applied, so the URL must already be a reachable image file.
Set `metadata.thumbnailLqip` to supply a dedicated placeholder URL instead.

## Typing the element

The element and event types are re-exported from the core:

```tsx
import { useRef } from "react";
import type { VidixPlayerElement } from "@mekbrut-com/vidix-player-react";

const player = useRef<VidixPlayerElement>(null);

// The event props cover the common case; the ref is for everything else.
player.current?.addEventListener("vidix:server-data", (event) => {
  console.log("servers:", event.detail.serverCount);
});
```

## CLS: read this before shipping

**React SSR is not zero-CLS.** The 16:9 box does not exist in the SSR HTML —
React cannot emit a Declarative Shadow DOM skeleton, so the server output is an
empty `<vidix-player>` element with attributes only. The box appears when the
element upgrades on the client, and hydration then causes no *further* shift —
but first paint does not have the box reserved.

If first-paint layout shift matters on your page, reserve the box yourself in
your own markup — for example wrap the component in an element styled with
`aspect-ratio: 16 / 9` (plus the control-bar height) so the jump stays minimal
while JavaScript loads.

## Theme

The player follows the page theme automatically, with no extra props:

- If `<html data-theme="dark">` (or the `dark` class) is present → dark mode.
- If `<html data-theme="light">` (or the `light` class) is present → light mode.
- If neither is present → it follows the user's system `prefers-color-scheme`.


## Supported languages

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

## Security notes (CSP / Trusted Types)

The component is designed to be strict-CSP friendly — useful when your app ships
a strict Content-Security-Policy:

- **No `eval`, no inline event handlers** — safe under a strict `script-src`.
- **The SSR output has no inline `<style>`**, and the core installs its styles
  through `adoptedStyleSheets` — compatible with `style-src` without
  `'unsafe-inline'`.
- If your site applies `require-trusted-types-for 'script'`, add the policy name
  **`vidix-player`** to your `trusted-types` allowlist. Without that name, the
  player cannot render under that CSP.

## Troubleshooting

- **The player does not appear at all** — check `playbackId` (required) and set
  `consoleLog={true}` to see messages in DevTools.
- **Changing a prop has no effect** — props are mount-time configuration; give
  the component a `key` to remount it (see
  [Booleans, defaults, and prop updates](#booleans-defaults-and-prop-updates)).
- **The control bar is missing** — the control bar appears only if at least one
  of `control.share`, `control.serverCount` (≥ 2), or `control.download` is
  active.
- **The theme does not match** — make sure there is no conflicting `data-theme`
  on another tag; the player reads the theme from the `<html>` element.

## How it works

- Compiled `dist/` (ESM + CJS + types) with a `"use client"` banner, so React
  Server Component frameworks treat the component as client-only and you never
  have to compile TSX out of `node_modules`.
- Renders the bare `<vidix-player>` custom element with
  `suppressHydrationWarning`; the element's `connectedCallback` builds the
  shadow root on the client.
- `import "@mekbrut-com/vidix-player/full"` is preserved through bundling (the
  package intentionally does **not** set `sideEffects: false`), so the full
  player is in the client bundle and the shell never fetches the runtime bundle
  from a CDN.
- Event props are attached with native listeners on the element. The wrapper
  keeps its own internal ref so the listeners bind even when the caller passes
  no `ref`; the latest handler is held in a ref so listeners are not re-bound on
  every render.

## License

Apache License 2.0 — see [LICENSE](./LICENSE).
