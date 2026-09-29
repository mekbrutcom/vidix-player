import { defineConfig } from "astro/config";

// Static output: the parity assertions read the raw SSR HTML (the DSD template
// must be present before JavaScript runs), so no SSR adapter is wanted.
// `base` stays the default so assets resolve under the Playwright baseURL.
export default defineConfig({
  output: "static",
  site: "http://127.0.0.1:3712",
  server: {
    host: "127.0.0.1",
    port: 3712,
  },
  devToolbar: {
    // The toolbar injects client markup that would pollute SSR parity checks.
    enabled: false,
  },
});
