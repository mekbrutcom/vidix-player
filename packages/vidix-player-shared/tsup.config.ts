import { defineConfig } from "tsup";

// Framework-agnostic helpers, compiled once for every wrapper. ESM + CJS + dts,
// no splitting: the whole surface is a handful of small modules, and wrappers
// tree-shake what they don't use.
export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  treeshake: true,
  splitting: false,
  clean: true,
  target: "es2021",
  outDir: "dist",
});
