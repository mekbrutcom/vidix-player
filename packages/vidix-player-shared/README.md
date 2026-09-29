<p align="center">
  <img src="https://cdn.jsdelivr.net/gh/mekbrutcom/vidix-player@main/.github/assets/vidix-player-logo.png" width="160" alt="Vidix Player logo">
</p>

# @mekbrut-com/vidix-player-shared

Shared prop/attribute/image helpers for the [`@mekbrut-com/vidix-player`](https://www.npmjs.com/package/@mekbrut-com/vidix-player) framework wrappers.

You probably do not need to install this directly — it is a dependency of
[`@mekbrut-com/vidix-player-astro`](https://www.npmjs.com/package/@mekbrut-com/vidix-player-astro) and
`@mekbrut-com/vidix-player-react`, which re-export everything you need. It exists so the
prop-to-attribute translation, value serialization, and blur-up placeholder
generation stay in **one** implementation across wrappers.

## What it provides

| Export                     | Purpose                                                                 |
| -------------------------- | ----------------------------------------------------------------------- |
| `buildAttributes(props)`   | Flattens grouped props into the core's kebab-case attribute map.         |
| `serializeAttribute(value)`| Serializes a prop value to its attribute string (`null` = omit).         |
| `createShimElement(attrs)` | Map-backed stand-in element for SSR skeleton rendering.                  |
| `resolveBlurUpSource(props)` | Resolves the `metadata-thumbnail-url` value to render (raw passthrough).   |
| `VidixPlayerProps` + group types | The props interface shared by every wrapper, with JSDoc hover docs. |

Attribute semantics mirror the core: absent/`""`/`"true"` mean enabled, only
`"false"` disables; attributes the caller did not set are omitted so the core's
own defaults apply.

## License

Apache License 2.0 — see [LICENSE](./LICENSE).
