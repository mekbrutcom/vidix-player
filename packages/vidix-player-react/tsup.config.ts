import { defineConfig } from "tsup";

// Compiled ESM + CJS + types: consumers
// (Next.js / TanStack / Remix / Vite) should not have to compile TSX out of
// node_modules.
//
// The `"use client"` banner must survive bundling — esbuild can drop a bare
// string directive. It is injected as a file banner, and `treeshake` is
// deliberately OFF: esbuild's tree-shaking pass treats the banner as a
// module-level directive and silently discards it (verified). Nothing here is
// worth shaking anyway — the whole wrapper is ~1.7 KB and its side-effect
// imports (`@mekbrut-com/vidix-player/full`) are the point.
// Verify after every build: `head -n1 dist/index.js` must print `"use client"`.
//
// `react` / `react-dom` stay external (peer deps); so do the core and the
// shared helpers — `import "@mekbrut-com/vidix-player/full"` must reach the
// consumer's bundler as a real runtime import, otherwise the hydration
// registration would be silently tree-shaken away.
export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  splitting: false,
  clean: true,
  target: "es2021",
  outDir: "dist",
  banner: {
    js: '"use client"',
  },
});
