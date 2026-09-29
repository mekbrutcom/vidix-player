import { createReadStream, statSync } from "node:fs";
// Tiny static file server for e2e. Zero deps, so tests don't need a dependency
// on a file-server package. Serves the built core output under /dist and the
// fixtures under /.
import { createServer } from "node:http";
import { extname, normalize } from "node:path";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname);
const DIST = resolve(__dirname, "../packages/vidix-player/dist");
const PORT = Number(process.env.PORT || 3711);

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

    // /dist/** maps to the built package output.
    const isDist = pathname.startsWith("/dist/");
    const base = isDist ? DIST : ROOT;
    const fsPath = join(base, isDist ? pathname.slice("/dist".length) : pathname);

    if (fsPath.endsWith(".html") || /\/$/.test(pathname)) {
      const candidate = fsPath.endsWith(".html") ? fsPath : join(fsPath, "index.html");
      if (statSync(candidate, { throwIfNoEntry: false })) {
        send(res, 200, candidate);
        return;
      }
    }

    if (statSync(fsPath, { throwIfNoEntry: false })?.isFile()) {
      send(res, 200, fsPath);
      return;
    }

    res.writeHead(404).end("not found");
  } catch (err) {
    res.writeHead(500).end("internal error");
  }
});

server.listen(PORT, "127.0.0.1", () => {
  // eslint-disable-next-line no-console
  console.log(`vidix-player e2e server: http://127.0.0.1:${PORT}`);
});
