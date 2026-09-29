import { svelte } from "@sveltejs/vite-plugin-svelte";
import { defineConfig } from "vite";

// Two production builds share this config:
//   client: `vite build --outDir dist/client`        (entry: index.html)
//   server: `vite build --ssr src/entry-server.ts`   (node SSR bundle)
//
// `@sveltejs/vite-plugin-svelte` auto-detects the SSR build and switches the
// compiler to `generate: "server"` for it (and hydratable output for the client
// build), so no per-build config split is needed.
export default defineConfig({
  plugins: [svelte()],
  server: {
    host: "127.0.0.1",
    port: 3715,
    strictPort: true,
  },
  build: {
    target: "es2021",
  },
});
