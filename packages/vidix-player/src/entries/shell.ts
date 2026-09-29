/**
 * Shell entry — this file becomes `dist/vidix-player.js` (the CDN tag).
 *
 * Ported from the top-level behavior of scaffold-design/vidix-player.js.
 *
 * Deliberately small: it renders the 16:9 skeleton synchronously and schedules
 * hydration through the *full bundle* (loaded at runtime — see shell/loader.ts).
 * Nothing from `player/` or `share/` is imported here, so this entry stays
 * lightweight and the two-bundle split is preserved.
 *
 * This module has no import side effects: it exports `defineVidixPlayer()` and
 * only auto-registers when a browser is present, so importing it in an
 * SSR/Node context is safe.
 */

import { defineVidixPlayer } from "../shell/element.js";

export { defineVidixPlayer } from "../shell/element.js";
export { buildShellTemplate } from "../shell/template.js";
export { CRITICAL_STYLE } from "../styles/critical.js";
export { hydrateWhenReady, loadFullBundle, resolveFullBundleSrc } from "../shell/loader.js";
export { trustedHTML, trustedScriptURL } from "../utils/trusted-types.js";
export { resolveTheme, syncTheme, watchTheme } from "../utils/theme.js";
export { adoptStyles, renderWithStyles } from "../utils/stylesheets.js";
export { I18N, resolveLocale, translate } from "../utils/locale.js";

export { VidixPlayer } from "../shell/element.js";
export type {
  AccentColor,
  ControlPosition,
  LoadingMode,
  Theme,
  VidixPlayerElement,
  VidixPlayerEventMap,
  VidixPlayerProps,
  VidixServerDataEventDetail,
  VidixServerSelectEventDetail,
} from "../types.js";

// CDN auto-registration: the `<script type="module" src="…vidix-player.js">`
// consumer gets a working element without calling anything themselves.
if (typeof customElements !== "undefined") {
  defineVidixPlayer();
}
