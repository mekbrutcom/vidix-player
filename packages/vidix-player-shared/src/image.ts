/**
 * Blur-up placeholder resolution.
 *
 * The placeholder is the poster itself, passed through **raw** — no image-CDN
 * transformation is applied here. The core's blur-up `<img>` and the share
 * dialog's thumbnail read `metadata-thumbnail-url` and validate it themselves
 * (see the core's `utils/image.ts`), so the attribute must stay a plain image
 * URL. Transforming it upstream (e.g. into a proxy URL that no longer ends in
 * an image extension) makes the core reject it and the placeholder disappears.
 *
 * Cross-framework by design: the same helper feeds every wrapper.
 */

import type { VidixPlayerProps } from "./types.js";

/**
 * Resolves the `metadata-thumbnail-url` value to render: an explicit
 * `thumbnailLqip` wins, otherwise the raw `thumbnailUrl` is used as-is.
 * Returns `undefined` when there is no thumbnail at all, which omits the
 * attribute (the core then shows its activity indicator).
 */
export function resolveBlurUpSource(props: VidixPlayerProps): string | undefined {
  const { thumbnailLqip, thumbnailUrl } = props.metadata ?? {};
  if (thumbnailLqip) return thumbnailLqip;

  return thumbnailUrl;
}
