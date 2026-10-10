import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { pages, siteConfig, navigation } from "../src/data/site.js";
import { offers } from "../src/data/offers.js";
import { webServices } from "../src/data/services.js";
import { socialLinks } from "../src/data/social-links.js";
import { renderHtmlTemplate, renderLegacyRedirect } from "./site-output.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const docs = resolve(root, "docs");
const documents = new Map();
const titles = new Set();
const descriptions = new Set();
const decode = (text) => text.replaceAll("&amp;", "&").replaceAll("&quot;", '"').replaceAll("&#39;", "'").replaceAll("&lt;", "<").replaceAll("&gt;", ">");

for (const page of pages) {
  const html = await readFile(resolve(docs, page.path === "/" ? "index.html" : `${page.path.slice(1)}index.html`), "utf8");
  const source = await readFile(resolve(root, "src", page.file), "utf8");
  assert.equal(html, renderHtmlTemplate(source, page.id), `${page.file}: Build veraltet; npm run build ausführen`);
  documents.set(page.path, html);
  if (page.path !== "/") assert.equal(await readFile(resolve(docs, page.file), "utf8"), renderLegacyRedirect(page));
  assert(!html.includes("{{"), `${page.file}: unaufgelöste Platzhalter`);
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `${page.file}: genau eine H1`);
  const title = html.match(/<title>(.*?)<\/title>/s)?.[1];
  const description = html.match(/<meta name="description" content="([^"]+)"/)?.[1];
  assert(title && description, `${page.file}: Titel und Beschreibung fehlen`);
  assert(!titles.has(title), `${page.file}: doppelter Seitentitel`);
  assert(!descriptions.has(description), `${page.file}: doppelte Beschreibung`);
  titles.add(title);
  descriptions.add(description);
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  assert.equal(decode(canonical ?? ""), new URL(page.path, siteConfig.siteUrl).href, `${page.file}: Canonical`);
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
  assert.equal(new Set(ids).size, ids.length, `${page.file}: doppelte IDs`);
  assert.equal((html.match(/aria-current="page"/g) || []).length, page.label ? 3 : 0, `${page.file}: aktive Navigation`);
  for (const link of navigation) assert(html.includes(`href="${link.href}"`), `${page.file}: Navigation ${link.label}`);
  for (const image of html.matchAll(/<img\b[^>]*>/g)) assert(/\balt="[^"]*"/.test(image[0]), `${page.file}: Bild ohne Alt-Text`);
}

let checkedLinks = 0;
for (const [name, html] of documents) {
  for (const match of html.matchAll(/<(?:a|link|script)\b[^>]*\b(?:href|src)="([^"]+)"/g)) {
    const href = decode(match[1]);
    if (/^(?:https?:|mailto:)/.test(href)) {
      if (href.startsWith("mailto:")) assert(href.includes(siteConfig.email), `${name}: Kontaktadresse`);
      continue;
    }
    const url = new URL(href, `https://local.test${name}`);
    const route = decodeURIComponent(url.pathname);
    const path = route.endsWith("/") ? `${route.slice(1)}index.html` : route.slice(1);
    assert(existsSync(resolve(docs, path)), `${name}: fehlendes Ziel ${href}`);
    if (url.hash && documents.has(route)) {
      const id = decodeURIComponent(url.hash.slice(1));
      assert(documents.get(route).includes(`id="${id}"`), `${name}: fehlender Anker ${href}`);
    }
    checkedLinks++;
  }
}

const sitemap = await readFile(resolve(docs, "sitemap.xml"), "utf8");
for (const page of pages) assert(sitemap.includes(new URL(page.path, siteConfig.siteUrl).href), `Sitemap: ${page.file}`);
assert.equal((await readFile(resolve(docs, "CNAME"), "utf8")).trim(), new URL(siteConfig.siteUrl).hostname);
assert.equal(JSON.parse(await readFile(resolve(docs, "site.webmanifest"), "utf8")).name, siteConfig.siteName);
for (const link of socialLinks.filter((link) => link.url)) assert.equal(new URL(link.url).protocol, "https:", `Social-Profil: ${link.label}`);

// Regression für den Pflege-Workflow: neue Datensätze müssen ohne Template-Änderung erscheinen.
const home = await readFile(resolve(root, "src/index.html"), "utf8");
const homeOutput = renderHtmlTemplate(home);
const homeSectionIds = [...homeOutput.matchAll(/<section id="([^"]+)"/g)].map((match) => match[1]);
assert.deepEqual(homeSectionIds, ["start", "links", ...offers.map((offer) => offer.id), "ueber-mich", "kontakt"], "Links müssen vor den Angeboten stehen");
assert.equal((homeOutput.match(/<details class="section-accordion">/g) ?? []).length, offers.length + 3, "Alle nummerierten Bereiche müssen auf jedem Breakpoint zunächst geschlossen sein");
assert(homeOutput.includes('href="#angebote"'), "Hero muss zur Accordion-Übersicht führen");
const webPage = await readFile(resolve(root, "src/webloesungen.html"), "utf8");
const contactNumber = (html) => Number(html.match(/<span class="section-number">(\d+)<\/span><span>Kontakt<\/span>/)?.[1]);
const initialContactNumber = contactNumber(renderHtmlTemplate(home));
try {
  offers.push({ id: "testangebot", label: "Testangebot", title: "Eine weitere Idee", description: "Testbeschreibung", href: "./kontakt.html", cta: "Mehr erfahren" });
  webServices.push({ id: "testleistung", title: "Testleistung", description: "Testbeschreibung" });
  socialLinks.push({ id: "testprofil", label: "Testprofil", url: "https://example.com/profile", context: "Test" });
  const output = renderHtmlTemplate(home);
  assert(output.includes('id="testangebot"'));
  assert(output.includes('href="https://example.com/profile"'));
  assert.equal(contactNumber(output), initialContactNumber + 1, "Nummerierung passt sich einem neuen Angebot an");
  assert(renderHtmlTemplate(webPage, "webloesungen").includes('id="testleistung"'));
} finally {
  offers.pop();
  webServices.pop();
  socialLinks.pop();
}

console.log(`${pages.length} Seiten geprüft: H1, Metadaten, Canonicals, Navigation, ${checkedLinks} interne Links/Assets, Sitemap und datengetriebene Erweiterungen.`);
