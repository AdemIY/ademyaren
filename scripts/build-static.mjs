import { cp, mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { buildCname, buildManifestJson, buildRobotsTxt, buildSitemapXml, renderHtmlTemplate } from "./site-output.mjs";

const currentFile = fileURLToPath(import.meta.url);
const rootDir = resolve(dirname(currentFile), "..");
const srcDir = join(rootDir, "src");
const docsDir = join(rootDir, "docs");

async function ensureDirectory(path) {
  await mkdir(path, { recursive: true });
}

async function writeRenderedHtmlFile(sourceName, targetName = sourceName) {
  const sourcePath = join(srcDir, sourceName);
  const targetPath = join(docsDir, targetName);
  const template = await readFile(sourcePath, "utf8");
  await writeFile(targetPath, renderHtmlTemplate(template), "utf8");
}

async function build() {
  await ensureDirectory(docsDir);
  await cp(join(srcDir, "assets"), join(docsDir, "assets"), { recursive: true, force: true });
  await cp(join(srcDir, "data"), join(docsDir, "data"), { recursive: true, force: true });
  await writeRenderedHtmlFile("index.html");
  await writeRenderedHtmlFile("impressum.html");
  await writeRenderedHtmlFile("datenschutz.html");
  await writeFile(join(docsDir, "robots.txt"), buildRobotsTxt(), "utf8");
  await writeFile(join(docsDir, "sitemap.xml"), buildSitemapXml(), "utf8");
  await writeFile(join(docsDir, "site.webmanifest"), buildManifestJson(), "utf8");
  const cname = buildCname();

  if (cname) {
    await writeFile(join(docsDir, "CNAME"), cname, "utf8");
  }
}

build().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
