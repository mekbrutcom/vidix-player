import { defineConfig } from "tsup";

// Two independent runtime bundles, mirroring the labs architecture:
//   - vidix-player:       the shell. Renders the 16:9 skeleton synchronously and
//                         auto-loads the full bundle (runtime dynamic import).
//   - vidix-player-full:  the full player (interactive controls, share dialog,
//                         server select, API client). Imported statically by
//                         bundler consumers via `@mekbrut-com/vidix-player/full`.
//
// `treeshake` + `sideEffects: false` in package.json keep unused code out of
// consumer bundles. `splitting` is off because the two entries are standalone by
// design: the shell reaches the full bundle at runtime, not via shared chunks.
export default defineConfig({
  entry: {
    "vidix-player": "src/entries/shell.ts",
    "vidix-player-full": "src/entries/full.ts",
  },
  format: ["esm", "cjs"],
  dts: true,
  treeshake: true,
  splitting: false,
  clean: true,
  target: "es2021",
  outDir: "dist",
});
