import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { existsSync, watch } from "node:fs";
import { extname, join, normalize, resolve } from "node:path";
import { buildManifestJson, buildRobotsTxt, buildSitemapXml, renderHtmlTemplate } from "./site-output.mjs";

const [, , rootArg = "src", portArg = "4173"] = process.argv;
const rootDir = resolve(rootArg);
const port = Number(portArg);
const clients = new Set();

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
};

const liveReloadSnippet = `
<script>
  (() => {
    const events = new EventSource("/__live-reload");
    events.onmessage = (event) => {
      if (event.data === "reload") {
        window.location.reload();
      }
    };
  })();
</script>
`;

function getMimeType(pathname) {
  return mimeTypes[extname(pathname).toLowerCase()] ?? "application/octet-stream";
}

function resolvePath(urlPathname) {
  const cleanPath = urlPathname === "/" ? "/index.html" : urlPathname;
  const relativePath = normalize(cleanPath).replace(/^(\.\.(\/|\\|$))+/, "");
  return join(rootDir, relativePath);
}

function broadcastReload() {
  for (const response of clients) {
    response.write("data: reload\n\n");
  }
}

watch(rootDir, { recursive: true }, () => {
  broadcastReload();
});

const server = createServer(async (request, response) => {
  const url = new URL(request.url, `http://${request.headers.host}`);

  if (url.pathname === "/__live-reload") {
    response.writeHead(200, {
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
      "Content-Type": "text/event-stream",
    });
    response.write("\n");
    clients.add(response);

    request.on("close", () => {
      clients.delete(response);
    });

    return;
  }

  if (url.pathname === "/robots.txt") {
    response.writeHead(200, { "Content-Type": mimeTypes[".txt"] });
    response.end(buildRobotsTxt());
    return;
  }

  if (url.pathname === "/sitemap.xml") {
    response.writeHead(200, { "Content-Type": mimeTypes[".xml"] });
    response.end(buildSitemapXml());
    return;
  }

  if (url.pathname === "/site.webmanifest") {
    response.writeHead(200, { "Content-Type": mimeTypes[".webmanifest"] });
    response.end(buildManifestJson());
    return;
  }

  const filePath = resolvePath(url.pathname);

  if (!existsSync(filePath)) {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("404 - Datei nicht gefunden");
    return;
  }

  try {
    const fileBuffer = await readFile(filePath);
    const mimeType = getMimeType(filePath);

    if (mimeType.startsWith("text/html")) {
      const html = renderHtmlTemplate(fileBuffer.toString("utf8")).replace("</body>", `${liveReloadSnippet}</body>`);
      response.writeHead(200, { "Content-Type": mimeType });
      response.end(html);
      return;
    }

    response.writeHead(200, { "Content-Type": mimeType });
    response.end(fileBuffer);
  } catch (error) {
    response.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    response.end(`500 - ${error.message}`);
  }
});

server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.error(`Port ${port} ist bereits belegt. Beende den laufenden Preview-Server oder nutze einen anderen Port.`);
    process.exit(1);
  }

  console.error(error);
  process.exit(1);
});

server.listen(port, () => {
  console.log(`Preview aktiv: http://localhost:${port} (${rootArg})`);
});
