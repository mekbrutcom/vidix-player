import { defineConfig } from "tsup";

// Classic-script (IIFE) build of the shell, mirroring the Mux delivery model:
// package.json's `jsdelivr`/`unpkg` fields point at `dist/vidix-player.iife.js`,
// so the bare CDN URL (`https://cdn.jsdelivr.net/npm/@mekbrut-com/vidix-player`)
// serves this file and a plain `<script src=…>` tag is enough — no
// `type="module"`, no build step. `browser` points back at the ESM shell so
// bundler consumers are unaffected.
//
// In this format esbuild replaces `import.meta` with an empty object, so the
// loader resolves its own URL from `document.currentScript.src` instead (see
// src/shell/loader.ts). The runtime dynamic `import()` of the full bundle is
// left as-is: it works from classic scripts in all modern browsers, and the
// full bundle itself stays ESM.
//
// `clean` must stay false: this config runs right after the main build (see
// the `build` script), which already cleans `dist/` — cleaning here would
// delete the main build's output.
//
// `outExtension` drops tsup's default `.global.js` suffix for IIFE so the file
// lands at exactly `dist/vidix-player.iife.js`, matching the `jsdelivr`/
// `unpkg` fields in package.json and SHELL_IIFE_FILE in src/constants.ts.
export default defineConfig({
  entry: { "vidix-player.iife": "src/entries/shell.ts" },
  format: ["iife"],
  globalName: "VidixPlayer",
  dts: false,
  clean: false,
  target: "es2021",
  splitting: false,
  treeshake: true,
  outDir: "dist",
  outExtension() {
    return { js: ".js" };
  },
});
