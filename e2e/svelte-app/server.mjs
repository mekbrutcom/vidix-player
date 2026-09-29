import { createReadStream, readFileSync, statSync } from "node:fs";
// Zero-dep SSR + static server for the Svelte parity page, mirroring
// e2e/react-app/server.mjs:
//   /              -> SSR HTML (rendered per request from the server bundle)
//   /assets/**     -> ./dist/client   (built client bundle + styles)
//
// Deterministic foreground process on purpose: a daemonizing dev server made
// Playwright's webServer lifecycle racy for the Astro app. This stays in the
// foreground, so `reuseExistingServer` works cleanly.
//
// NOTE: run `pnpm run build` first (the `preview` script does).
import { createServer } from "node:http";
import { extname, normalize } from "node:path";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { render } from "./dist/server/entry-server.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const CLIENT_ROOT = resolve(__dirname, "dist/client");
const TEMPLATE = resolve(CLIENT_ROOT, "index.html");
const PORT = Number(process.env.PORT || 3715);
const APP_HTML_MARKER = "<!--app-html-->";

const template = readFileSync(TEMPLATE, "utf8");

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".cjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".ico": "image/x-icon",
};

function send(res, status, filePath, headers = {}) {
  const size = statSync(filePath).size;
  res.writeHead(status, {
    "Content-Type": MIME[extname(filePath)] || "application/octet-stream",
    "Content-Length": size,
    "Cache-Control": "no-store",
    ...headers,
  });
  createReadStream(filePath).pipe(res);
}

const server = createServer((req, res) => {
  try {
    const url = new URL(req.url || "/", `http://localhost:${PORT}`);
    const pathname = decodeURIComponent(normalize(url.pathname));
    if (pathname.includes("..")) {
      res.writeHead(403).end("forbidden");
      return;
    }

    // Client assets (hashed bundles, styles) are served straight from disk.
    const fsPath = join(CLIENT_ROOT, pathname);
    if (pathname !== "/" && statSync(fsPath, { throwIfNoEntry: false })?.isFile()) {
      send(res, 200, fsPath);
      return;
    }

    // Everything else is an app route: render it and swap the markup into the
    // built client shell. A function replacer keeps `$`-sequences in the
    // rendered markup from being interpreted by `String.replace`.
    const html = template.replace(APP_HTML_MARKER, () => render(pathname));

    res.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
    });
    res.end(html);
  } catch (err) {
    res.writeHead(500).end("internal error");
  }
});

server.listen(PORT, "127.0.0.1", () => {
  // eslint-disable-next-line no-console
  console.log(`vidix-player svelte QA page: http://127.0.0.1:${PORT}`);
});
