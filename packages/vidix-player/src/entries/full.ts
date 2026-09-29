/**
 * Full entry — this file becomes `dist/vidix-player-full.js`.
 *
 * Ported from the top-level behavior of scaffold-design/vidix-player-full.js.
 *
 * Two ways to reach it:
 *  - Runtime (CDN): the shell resolves this file next to itself and
 *    dynamic-imports it. On load it registers its hydrate function, and the
 *    shell hydrates each connected element through it.
 *  - Static (bundler): `import … from "@mekbrut-com/vidix-player/full"` pulls
 *    this entry in; the registration happens the same way, so the shell never
 *    triggers the runtime fetch (see shell/loader.ts).
 *
 * Loading this module installs the full i18n table and the share dialog element;
 * hydrating players has no import-time side effects beyond that registration.
 */

import { getPlayers, registerHydrate } from "../internal/registry.js";
import { hydratePlayer } from "../player/hydrate.js";
import { defineVidixShareDialog } from "../share/dialog.js";

export { hydratePlayer };
export { defineVidixShareDialog };
export { VidixServerSelect } from "../player/server-select.js";
export { buildPlayerTemplate } from "../player/template.js";
export { fetchServerData } from "../player/api.js";
export type {
  VidixServerData,
  VidixServerEntry,
  VidixVod,
  VidixErrorCode,
} from "../types.js";

// Make the hydrate function visible to the shell across bundle boundaries.
registerHydrate(hydratePlayer);

// The dialog element is needed as soon as the full render lands — the skeleton
// may already contain a `<vidix-share-dialog>` node.
defineVidixShareDialog();

// Elements that connected before this module executed were registered by the
// shell; hydrate them now that the share dialog and server select are defined.
for (const player of getPlayers()) {
  hydratePlayer(player);
}
