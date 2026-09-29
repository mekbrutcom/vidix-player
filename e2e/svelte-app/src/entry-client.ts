/**
 * Client entry: hydrates the server-rendered markup. The path is read from
 * `window.location` — the server rendered the same path — so hydration sees
 * identical markup and emits no mismatch. Svelte 5 components are always
 * hydratable (the `hydratable` compiler option was removed).
 */

import { hydrate } from "svelte";

import App from "./App.svelte";

const root = document.getElementById("root");

if (root) {
  hydrate(App, { target: root, props: { path: window.location.pathname } });
}
