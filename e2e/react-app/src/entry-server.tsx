/**
 * SSR entry: renders the app markup for a request path. The server reads the
 * built client `index.html` and swaps in this markup (see `server.mjs`), so the
 * hashed client asset URLs stay correct without a manifest.
 */

import { renderToString } from "react-dom/server";

import { App } from "./App";

export function render(path: string): string {
  return renderToString(<App path={path} />);
}
