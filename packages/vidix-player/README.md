<p align="center">
  <img src="https://cdn.jsdelivr.net/gh/mekbrutcom/vidix-player@main/.github/assets/vidix-player-logo.png" width="160" alt="Vidix Player logo">
</p>

# @mekbrut-com/vidix-player

Framework-agnostic web component for the Vidix Player. One tag, no framework required — works on a plain HTML page via CDN or npm. `playbackId` is the only required attribute; everything else is optional.

- Zero layout shift: a tiny shell reserves the 16:9 box and control bar
  synchronously, before the full player finishes loading (CLS ≈ 0).
- CSP-friendly: no `eval`, no inline event handlers, and styles installed through
  `adoptedStyleSheets` (works under strict `style-src` without `'unsafe-inline'`).
- Trusted Types compliant under `require-trusted-types-for 'script'`.
- 71 UI locale codes, automatic light/dark theme, share dialog, server selector.

Framework components live in sibling packages under the same `@mekbrut-com`
scope.

Create a Vidix account and start uploading content: [Vidix platform](https://vidix.mekbrut.com)

> Full documentation (guides, attribute reference, 10 languages): [github.com/mekbrutcom/vidix-player](https://github.com/mekbrutcom/vidix-player)

## Install

```bash
# npm
npm install @mekbrut-com/vidix-player
```
```bash
# pnpm
pnpm add @mekbrut-com/vidix-player
```
```bash
# yarn
yarn add @mekbrut-com/vidix-player
```
```bash
# bun
bun add @mekbrut-com/vidix-player
```

Or load it from a CDN (classic script, no build step):

```html
<script src="https://cdn.jsdelivr.net/npm/@mekbrut-com/vidix-player"></script>
```

## Usage

```html
<script src="https://cdn.jsdelivr.net/npm/@mekbrut-com/vidix-player"></script>

<vidix-player
  playback-id="tUVARXFmPnT"
  lang="en"
  accent-color="green"
  layout-control-position="bottom"
  layout-control-accent="red"
  metadata-server-title="true"
  metadata-video-title="My video"
  metadata-thumbnail-url="https://....png"
  control-share="true"
  control-server-count="3"
  control-download="true"
  loading="eager"
  role="region"
  aria-label="Video player"
></vidix-player>
```

The element auto-registers from the CDN tag — no JavaScript call needed.

### Bundler usage

Import the shell and the full player statically, and registration stays under
your control (both entries are side-effect free at import time, so importing
them on a server is a no-op):

```js
import { defineVidixPlayer } from "@mekbrut-com/vidix-player";
import "@mekbrut-com/vidix-player/full";

defineVidixPlayer();
```

## Attributes

| Attribute | Required | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `playback-id` | **Yes** | string | — | Video ID, e.g. `tUVARXFmPnT`. Without it the player renders nothing. |
| `lang` | no | string | `<html lang>` or `en` | UI language; 71 locale codes supported. Unknown values fall back to `<html lang>`, then `en`. |
| `accent-color` | no | string | theme default | Player accent color: `vidix`, `default`, `red`, `orange`, `yellow`, `green`, `mint`, `teal`, `cyan`, `blue`, `indigo`, `purple`, `pink`, `brown`. Other values are ignored. |
| `layout-control-position` | no | string | `bottom` | Control bar position: `bottom` or `top`. |
| `layout-control-accent` | no | string | theme default | Accent color for control-bar icons (independent of `accent-color`). Same value list. |
| `control-share` | no | boolean | `true` | Show the share button and its dialog. |
| `control-server-count` | no | number | `3` | Number of servers in the selector, clamped to `0`–`10`. The selector appears only at `2`+. |
| `control-download` | no | boolean | `true` | Show the download button. The server can still hide it. |
| `metadata-video-title` | no | string | — | Video title for the iframe `title`, download label, and share dialog. |
| `metadata-thumbnail-url` | no | string | — | Poster URL shown as a blur-up placeholder before the iframe loads. |
| `metadata-server-title` | no | boolean | `true` | Use the video title from the server response. |
| `loading` | no | string | browser default | `eager` or `lazy`; forwarded to the iframe and placeholder image. Other values are ignored. |
| `console-log` | no | boolean | `false` | `true` prints `[vidix-player]` diagnostics to the browser console (dev only). |
| `role`, `aria-label` | no | — | — | Standard HTML accessibility attributes, passed through. |

**Boolean rule:** a boolean attribute is enabled just by writing its name (or
`="true"`), and only the literal `"false"` disables it — e.g.
`control-share="false"`.

**Attributes are mount-time configuration.** The core reads attributes once, in
`connectedCallback` (there are no `observedAttributes`), so changing them after
mount does not update the running player. Re-create the element when the
configuration must change.

## Events

The element dispatches `CustomEvent`s you can listen to:

| Event | `detail` | When |
| --- | --- | --- |
| `vidix:server-data` | `{ serverCount }` | Server data fetched successfully. |
| `vidix:server-select` | `{ value }` | The user picked a different server (`value` is `"Server <n>"`). |

```js
document.querySelector("vidix-player").addEventListener("vidix:server-select", (e) => {
  console.log("server selected:", e.detail.value);
});
```

## Theme

The player follows the page theme automatically, with no extra attributes:

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

The component is designed to be strict-CSP friendly:

- **No `eval`, no inline event handlers** — safe under a strict `script-src`.
- **Styles are installed via `adoptedStyleSheets`**, not injected `<style>`
  tags — compatible with `style-src` without `'unsafe-inline'`.
- If your site applies `require-trusted-types-for 'script'`, add the policy name
  **`vidix-player`** to your `trusted-types` allowlist. Without that name, the
  player cannot render under that CSP.

Known limitation: the loading spinner and control-bar accent SVGs use inline
`style=` attributes, which a strict `style-src` reports. The player still renders
correctly; only those two decorative touches are affected.

## Troubleshooting

- **The player does not appear at all** — check `playback-id` (required) and add
  `console-log="true"` to see messages in DevTools.
- **The control bar is missing** — the control bar appears only if at least one
  of `control-share`, `control-server-count` (≥ 2), or `control-download` is
  active.
- **The theme does not match** — make sure there is no conflicting `data-theme`
  on another tag; the player reads the theme from the `<html>` element.

## How it works

- The package ships two runtime bundles: the **shell** (`vidix-player.js`, ESM;
  `vidix-player.iife.js`, classic script) and the **full player**
  (`vidix-player-full.js`). The shell renders the 16:9 skeleton and control bar
  synchronously, then loads the full bundle next to itself at runtime. Because
  the skeleton already reserves the final geometry, hydration swaps content
  without shifting the page.
- The bare CDN URL (`https://cdn.jsdelivr.net/npm/@mekbrut-com/vidix-player`)
  serves the IIFE shell (see the package's `jsdelivr`/`unpkg` fields), so a
  plain `<script src>` tag is enough. The full bundle URL is resolved from the
  script's own URL at runtime.
- Bundler consumers can import `@mekbrut-com/vidix-player/full` statically
  instead, so the full player is in the bundle and the shell never fetches
  anything from a CDN.
- `window.VIDIX_FULL_SRC` overrides the auto-detected full bundle URL if the
  shell file was renamed or moved.

## License

Apache License 2.0 — see [LICENSE](./LICENSE).
