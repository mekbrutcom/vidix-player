/**
 * Client entry: hydrates the server-rendered markup. The path is read from
 * `window.location` — the server rendered the same path — so hydration sees
 * identical markup and emits no mismatch warnings.
 */

import { hydrateRoot } from "react-dom/client";

import { App } from "./App";

const root = document.getElementById("root");

if (root) {
  hydrateRoot(root, <App path={window.location.pathname} />);
}
