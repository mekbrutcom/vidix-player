/**
 * SSR entry: renders the app markup for a request path. The server reads the
 * built client `index.html` and swaps in this markup (see `server.mjs`), so the
 * hashed client asset URLs stay correct without a manifest.
 *
 * Svelte's `render` is aliased because this module's own export is also named
 * `render` (the contract `server.mjs` imports).
 */

import { render as renderSvelte } from "svelte/server";

import App from "./App.svelte";

export function render(path: string): string {
  return renderSvelte(App, { props: { path } }).body;
}
