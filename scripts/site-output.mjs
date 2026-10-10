import { siteConfig, pages } from "../src/data/site.js";
import { renderHeader, renderFooter } from "../src/assets/js/modules/render-layout.js";
import { renderContentTokens } from "../src/assets/js/modules/render-sections.js";
import { renderPageContentTokens } from "../src/assets/js/modules/render-page-sections.js";
import { escapeHtml } from "../src/assets/js/modules/html.js";

function getSiteUrl() {
  return siteConfig.siteUrl.trim().replace(/\/+$/, "");
}

export function getCustomDomain() {
  return getSiteUrl() ? new URL(getSiteUrl()).hostname : "";
}

function toAbsoluteUrl(pathname) {
  return getSiteUrl() ? new URL(pathname, getSiteUrl()).href : "";
}

function pageHead(page) {
  const canonicalUrl = toAbsoluteUrl(page.path);
  const ogImageUrl = siteConfig.ogImagePath ? toAbsoluteUrl(siteConfig.ogImagePath) : "";
  return `<meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(page.title)}</title>
    <meta name="description" content="${escapeHtml(page.description)}" />
    <meta name="theme-color" content="${escapeHtml(siteConfig.themeColor)}" />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="${escapeHtml(siteConfig.locale)}" />
    <meta property="og:site_name" content="${escapeHtml(siteConfig.siteName)}" />
    <meta property="og:title" content="${escapeHtml(page.title)}" />
    <meta property="og:description" content="${escapeHtml(page.description)}" />
    ${canonicalUrl ? `<link rel="canonical" href="${escapeHtml(canonicalUrl)}" /><meta property="og:url" content="${escapeHtml(canonicalUrl)}" />` : ""}
    ${ogImageUrl ? `<meta property="og:image" content="${escapeHtml(ogImageUrl)}" /><meta property="og:image:alt" content="Adem Yaren" />` : ""}
    <script src="/assets/js/theme-init.js"></script>
    ${analyticsTag()}
    <link rel="icon" href="/assets/icons/ui/favicon.svg" type="image/svg+xml" />
    <link rel="manifest" href="/site.webmanifest" />
    <link rel="stylesheet" href="/assets/css/styles.css" />`;
}

function analyticsTag() {
  const endpoint = siteConfig.goatcounterUrl?.trim();
  return endpoint ? `<script data-goatcounter="${escapeHtml(endpoint)}" async src="https://gc.zgo.at/count.js"></script>` : "";
}

export function renderHtmlTemplate(template, pageId = "home") {
  const page = pages.find((entry) => entry.id === pageId || entry.file === pageId);
  if (!page) throw new Error(`Unbekannte Seite: ${pageId}`);
  const canonicalUrl = toAbsoluteUrl(page.path);
  const replacements = {
    LANGUAGE: () => escapeHtml(siteConfig.language),
    SITE_NAME: () => escapeHtml(siteConfig.siteName),
    PAGE_HEAD: () => pageHead(page),
    SITE_HEADER: () => renderHeader(page.id),
    SITE_FOOTER: renderFooter,
    PAGE_TITLE: () => escapeHtml(page.title),
    META_DESCRIPTION: () => escapeHtml(page.description),
    THEME_COLOR: () => escapeHtml(siteConfig.themeColor),
    OG_LOCALE: () => escapeHtml(siteConfig.locale),
    OG_TITLE: () => escapeHtml(page.title),
    OG_DESCRIPTION: () => escapeHtml(page.description),
    CANONICAL_TAG: () => canonicalUrl ? `<link rel="canonical" href="${escapeHtml(canonicalUrl)}" />` : "",
    ANALYTICS_TAG: analyticsTag,
    EMAIL: () => escapeHtml(siteConfig.email),
    MAILTO_EMAIL: () => escapeHtml(`mailto:${siteConfig.email}`),
    CURRENT_YEAR: () => String(new Date().getFullYear()),
    ...renderContentTokens(),
    ...renderPageContentTokens(),
  };
  return template.replace(/\{\{([A-Z_]+)\}\}/g, (token, key) => {
    if (!replacements[key]) throw new Error(`Unbekannter Template-Platzhalter: ${token}`);
    return replacements[key]();
  }).replace(/[ \t]+$/gm, "");
}

export function buildRobotsTxt() {
  return `User-agent: *\nAllow: /\n\n${getSiteUrl() ? `Sitemap: ${getSiteUrl()}/sitemap.xml\n` : ""}`;
}

export function buildSitemapXml() {
  const entries = getSiteUrl() ? pages.map((page) => `  <url>
    <loc>${escapeHtml(toAbsoluteUrl(page.path))}</loc>
    <changefreq>monthly</changefreq>
    <priority>${page.id === "home" ? "1.0" : page.label ? "0.7" : "0.3"}</priority>
  </url>`).join("\n") : "";
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`;
}

export function buildManifestJson() {
  return `${JSON.stringify({
    name: siteConfig.siteName,
    short_name: siteConfig.shortName,
    lang: siteConfig.language,
    start_url: "/",
    display: "standalone",
    background_color: siteConfig.themeColor,
    theme_color: siteConfig.themeColor,
    icons: [{ src: "/assets/icons/ui/favicon.svg", sizes: "any", type: "image/svg+xml" }],
  }, null, 2)}\n`;
}

export function buildCname() {
  return getCustomDomain() ? `${getCustomDomain()}\n` : "";
}

// GitHub Pages hat keine konfigurierbaren HTTP-Weiterleitungen.
// Statische Kompatibilitätsseiten erhalten Suchparameter und Abschnittsanker per JS.
export function renderLegacyRedirect(page) {
  const destination = escapeHtml(page.path);
  return `<!doctype html>
<html lang="de"><head><meta charset="utf-8" />
<title>Weiterleitung | Adem Yaren</title>
<link rel="canonical" href="${escapeHtml(toAbsoluteUrl(page.path))}" />
<meta name="robots" content="noindex" />
<script>window.location.replace(${JSON.stringify(page.path)} + window.location.search + window.location.hash);</script>
<noscript><meta http-equiv="refresh" content="0;url=${destination}" /></noscript>
</head><body><p><a href="${destination}">Zur neuen Seite</a></p></body></html>
`;
}
