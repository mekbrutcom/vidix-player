import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright config for vidix-player parity tests.
 *
 * Four projects, four servers:
 *
 *  - `chromium` (vanilla): the static server exposes
 *      /dist/** -> packages/vidix-player/dist  (built output under test)
 *      /**      -> e2e/fixtures                (test pages)
 *    so a fixture can do `<script type="module" src="/dist/vidix-player.js">`
 *    which is exactly how the CDN is consumed.
 *
 *  - `astro`: builds `e2e/astro-app` and serves it on :3712, so the parity
 *    assertions run against the Astro wrapper's real SSR + hydration.
 *
 *  - `react`: builds `e2e/react-app` (Vite SSR) and serves it on :3714, so the
 *    parity assertions run against the React wrapper's SSR + hydration.
 *
 *  - `svelte`: builds `e2e/svelte-app` (Vite SSR) and serves it on :3715, so
 *    the parity assertions run against the Svelte wrapper's SSR + hydration.
 *
 * NOTE: each wrapper webServer builds its own dependency chain first (core ->
 * shared -> wrapper), so a single `pnpm test:e2e` is self-contained.
 */
export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  reporter: [["html", { open: "never" }], ["list"]],
  use: {
    baseURL: "http://127.0.0.1:3711",
    viewport: { width: 1024, height: 768 },
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "chromium",
      testMatch: /.*\.spec\.ts/,
      testIgnore: /(astro|react|svelte)\.spec\.ts/,
      use: { ...devices["Desktop Chrome"], channel: undefined },
    },
    {
      // Astro wrapper parity. Runs against its own preview server (see the
      // second webServer entry) via the per-project baseURL override.
      name: "astro",
      testMatch: /astro\.spec\.ts/,
      use: {
        ...devices["Desktop Chrome"],
        channel: undefined,
        baseURL: "http://127.0.0.1:3712",
      },
    },
    {
      // React wrapper parity. Runs against the Vite SSR app's own server (see
      // the third webServer entry) via the per-project baseURL override.
      name: "react",
      testMatch: /react\.spec\.ts/,
      use: {
        ...devices["Desktop Chrome"],
        channel: undefined,
        baseURL: "http://127.0.0.1:3714",
      },
    },
    {
      // Svelte wrapper parity. Runs against the Vite SSR app's own server (see
      // the fourth webServer entry) via the per-project baseURL override.
      name: "svelte",
      testMatch: /svelte\.spec\.ts/,
      use: {
        ...devices["Desktop Chrome"],
        channel: undefined,
        baseURL: "http://127.0.0.1:3715",
      },
    },
  ],
  webServer: [
    {
      command: "node ./server.mjs",
      url: "http://127.0.0.1:3711/fixtures/vanilla.html",
      reuseExistingServer: true,
      timeout: 30_000,
    },
    {
      // Build the wrapper's dependency chain first, then the app, then serve.
      // `astro preview` daemonizes, so a zero-dep static server is used instead
      // (see e2e/astro-app/server.mjs).
      command:
        "pnpm --filter @mekbrut-com/vidix-player build && pnpm --filter @mekbrut-com/vidix-player-shared build && " +
        "pnpm --filter vidix-player-astro-e2e run build && pnpm --filter vidix-player-astro-e2e run preview",
      url: "http://127.0.0.1:3712/",
      reuseExistingServer: true,
      timeout: 180_000,
    },
    {
      // Same chain for the React wrapper, then its own zero-dep SSR server.
      command:
        "pnpm --filter @mekbrut-com/vidix-player build && pnpm --filter @mekbrut-com/vidix-player-shared build && " +
        "pnpm --filter @mekbrut-com/vidix-player-react build && pnpm --filter vidix-player-react-e2e run build && " +
        "pnpm --filter vidix-player-react-e2e run preview",
      url: "http://127.0.0.1:3714/",
      reuseExistingServer: true,
      timeout: 180_000,
    },
    {
      // Same chain for the Svelte wrapper (source-shipping, so there is no
      // wrapper build step — the consumer app's Vite build compiles the
      // `.svelte` component), then its own zero-dep SSR server.
      command:
        "pnpm --filter @mekbrut-com/vidix-player build && pnpm --filter @mekbrut-com/vidix-player-shared build && " +
        "pnpm --filter vidix-player-svelte-e2e run build && pnpm --filter vidix-player-svelte-e2e run preview",
      url: "http://127.0.0.1:3715/",
      reuseExistingServer: true,
      timeout: 180_000,
    },
  ],
});
