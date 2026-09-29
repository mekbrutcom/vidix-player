import { defineConfig } from "vite";

// Two production builds share this config:
//   client: `vite build --outDir dist/client`        (entry: index.html)
//   server: `vite build --ssr src/entry-server.tsx`  (node SSR bundle)
//
// JSX goes through esbuild's automatic runtime so no `@vitejs/plugin-react`
// dependency is needed — this app only ever runs production builds (no HMR),
// and the wrapper itself is a prebuilt dependency anyway.
export default defineConfig({
  esbuild: {
    jsx: "automatic",
    jsxImportSource: "react",
  },
  server: {
    host: "127.0.0.1",
    port: 3714,
    strictPort: true,
  },
  build: {
    target: "es2021",
  },
});
