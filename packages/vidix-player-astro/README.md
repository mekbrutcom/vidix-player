<p align="center">
  <img src="https://cdn.jsdelivr.net/gh/mekbrutcom/vidix-player@main/.github/assets/vidix-player-logo.png" width="160" alt="Vidix Player logo">
</p>

# @mekbrut-com/vidix-player-astro

Astro component for the Vidix Player web component. Everything is configured through typed, grouped props — `playbackId` is the only required one.
The core (`@mekbrut-com/vidix-player`) is installed automatically as a dependency, so installing this package is all you need.

The server renders a **Declarative Shadow DOM skeleton** — the critical CSS plus the 16:9 box and control bar — so the player reserves its exact final geometry *before any JavaScript runs* (**zero layout shift**, CLS ≈ 0). A hoisted client script then registers the core, and hydration swaps the shadow content in place: same box, richer content.

Create a Vidix account and start uploading content: [Vidix platform](https://vidix.mekbrut.com)

> Full documentation (guides, attribute reference, 10 languages): [github.com/mekbrutcom/vidix-player](https://github.com/mekbrutcom/vidix-player)

## Install

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

Astro 4+ is required as a peer dependency; the core and the shared helpers come
along as dependencies.

## Mount the component

```astro
---
import { VidixPlayer } from "@mekbrut-com/vidix-player-astro";
---

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
/>
```

Props are grouped for ergonomics and flattened to the core's kebab-case
attributes: `metadata.videoTitle` becomes `metadata-video-title`,
`layout.controlPosition` becomes `layout-control-position`.

Any prop outside the table below (for example `role`, `ariaLabel`, or `data-*`)
is kebab-cased and forwarded to the host element, so standard HTML attributes
keep working. Non-primitives are dropped rather than stringified into garbage
attributes.

Astro has no event props. To handle `vidix:server-data` /
`vidix:server-select`, attach your own listener in a client-side script:

```astro
<vidix-player playback-id="tUVARXFmPnT"></vidix-player>
<script>
  document.querySelector("vidix-player")?.addEventListener("vidix:server-data", (event) => {
    console.log("servers:", event.detail.serverCount);
  });
</script>
```

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

`AccentColor` is one of `vidix`, `default`, `red`, `orange`, `yellow`, `green`,
`mint`, `teal`, `cyan`, `blue`, `indigo`, `purple`, `pink`, `brown`.

### Booleans, defaults, and prop updates

Booleans follow HTML conventions extended by the core: absent, `""`, and `"true"`
all mean enabled; only `"false"` disables. Attributes you do not set are omitted
entirely so the **core's own defaults apply** — the wrapper never overrides them.

The core reads attributes once, in `connectedCallback` (it has no
`observedAttributes`). **Props are therefore mount-time configuration**: later
DOM changes are not picked up. Re-render the component with new prop values when
the configuration must change — a full server re-render naturally produces a
fresh mount.

### Blur-up placeholder

When `metadata.thumbnailUrl` is set and `lqip` is not `false` (the default), the
poster is used as the blur-up placeholder, passed through **raw** — no image-CDN
transformation is applied, so the URL must already be a reachable image file.
Set `metadata.thumbnailLqip` to supply a dedicated placeholder URL instead.

## Typing the element

The element and event types are re-exported from the core:

```astro
---
import type { VidixPlayerElement } from "@mekbrut-com/vidix-player-astro";
---

<vidix-player id="player" playback-id="tUVARXFmPnT"></vidix-player>
<script>
  const player = document.getElementById("player") as VidixPlayerElement;
  player.addEventListener("vidix:server-data", (event) => {
    console.log("servers:", event.detail.serverCount);
  });
</script>
```

## Zero layout shift (CLS ≈ 0)

The SSR output ships a Declarative Shadow DOM skeleton: the critical CSS and the
16:9 box + control bar are in the server HTML, styled and sized **before any
JavaScript loads**. When the core registers and hydration runs, the shadow
content is swapped in place — same box, richer content — so nothing moves on
first paint and nothing moves on hydration.

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

- **No `eval`, no inline event handlers** — safe under a strict `script-src`.
- The SSR skeleton inlines a `<style>` element inside the Declarative Shadow DOM
  template so first paint is styled without JavaScript. Inline `<style>` is
  subject to `style-src`, so a strict Content-Security-Policy without
  `'unsafe-inline'` will leave the skeleton unstyled (the player itself still
  works; styles are reinstalled through `adoptedStyleSheets` once it upgrades).
- If your site applies `require-trusted-types-for 'script'`, add the policy name
  **`vidix-player`** to your `trusted-types` allowlist. Without that name, the
  player cannot render under that CSP.

## Troubleshooting

- **The player does not appear at all** — check `playbackId` (required) and set
  `consoleLog={true}` to see messages in DevTools.
- **The skeleton is unstyled** — your CSP is blocking the inline `<style>` in
  the Declarative Shadow DOM; allow `'unsafe-inline'` for `style-src` (or a
  nonce/hash scheme).
- **The control bar is missing** — the control bar appears only if at least one
  of `control.share`, `control.serverCount` (≥ 2), or `control.download` is
  active.
- **The theme does not match** — make sure there is no conflicting `data-theme`
  on another tag; the player reads the theme from the `<html>` element.

## How it works

- Ships uncompiled `.astro` + `.ts` source; your project's Vite/Astro compiles
  it — tree-shaking and the JSDoc hover text on the props are preserved.
- The skeleton markup is not duplicated — it comes from the core's
  `buildShellTemplate()` and `CRITICAL_STYLE`, so pre-JS and post-hydration
  markup stay 1:1.
- The hoisted client script is bundled once per page and imports
  `@mekbrut-com/vidix-player/full`, which statically registers its hydrate
  function. The shell therefore never fetches the runtime bundle from a CDN: the
  full player is already in the page.
- Hydration swaps the Declarative Shadow DOM content in place — same box,
  richer content — which is what keeps the CLS at ≈ 0.

## License

Apache License 2.0 — see [LICENSE](./LICENSE).
