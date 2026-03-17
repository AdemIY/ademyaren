import { siteConfig } from "../src/data/site.js";

function escapeHtml(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function escapeAttribute(value) {
  return escapeHtml(value).replaceAll('"', "&quot;").replaceAll("'", "&#39;");
}

function trimTrailingSlashes(value) {
  return value.replace(/\/+$/, "");
}

function getSiteUrl() {
  const rawUrl = siteConfig.siteUrl.trim();
  return rawUrl ? trimTrailingSlashes(rawUrl) : "";
}

export function getCustomDomain() {
  const siteUrl = getSiteUrl();

  if (!siteUrl) {
    return "";
  }

  return new URL(siteUrl).hostname;
}

function toAbsoluteUrl(pathname) {
  const siteUrl = getSiteUrl();

  if (!siteUrl) {
    return "";
  }

  const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${siteUrl}${normalizedPath}`;
}

function buildOptionalTag(markup) {
  return markup ? `${markup}` : "";
}

export function renderHtmlTemplate(template) {
  const canonicalUrl = toAbsoluteUrl("/");
  const ogImageUrl = siteConfig.ogImagePath ? toAbsoluteUrl(siteConfig.ogImagePath) : "";
  const goatcounterUrl = siteConfig.goatcounterUrl?.trim() ?? "";
  const replacements = {
    LANGUAGE: escapeAttribute(siteConfig.language),
    SITE_NAME: escapeHtml(siteConfig.siteName),
    PAGE_TITLE: escapeHtml(siteConfig.pageTitle),
    META_DESCRIPTION: escapeAttribute(siteConfig.metaDescription),
    THEME_COLOR: escapeAttribute(siteConfig.themeColor),
    OG_LOCALE: escapeAttribute(siteConfig.locale),
    OG_TITLE: escapeAttribute(siteConfig.pageTitle),
    OG_DESCRIPTION: escapeAttribute(siteConfig.ogDescription),
    CANONICAL_TAG: buildOptionalTag(
      canonicalUrl ? `<link rel="canonical" href="${escapeAttribute(canonicalUrl)}" />` : "",
    ),
    OG_URL_TAG: buildOptionalTag(
      canonicalUrl ? `<meta property="og:url" content="${escapeAttribute(canonicalUrl)}" />` : "",
    ),
    OG_IMAGE_TAG: buildOptionalTag(
      ogImageUrl ? `<meta property="og:image" content="${escapeAttribute(ogImageUrl)}" />` : "",
    ),
    ANALYTICS_TAG: buildOptionalTag(
      goatcounterUrl
        ? `<script data-goatcounter="${escapeAttribute(goatcounterUrl)}" async src="//gc.zgo.at/count.js"></script>`
        : "",
    ),
    EMAIL: escapeHtml(siteConfig.email),
    MAILTO_EMAIL: escapeAttribute(`mailto:${siteConfig.email}`),
    CURRENT_YEAR: String(new Date().getFullYear()),
  };

  return Object.entries(replacements).reduce(
    (output, [key, value]) => output.replaceAll(`{{${key}}}`, value),
    template,
  );
}

export function buildRobotsTxt() {
  const siteUrl = getSiteUrl();
  const sitemapLine = siteUrl ? `\nSitemap: ${siteUrl}/sitemap.xml` : "";

  return `User-agent: *\nAllow: /\n${sitemapLine}\n`;
}

export function buildSitemapXml() {
  const siteUrl = getSiteUrl();

  if (!siteUrl) {
    return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n</urlset>\n`;
  }

  const lastmod = new Date().toISOString().slice(0, 10);
  const entries = ["/", "/impressum.html", "/datenschutz.html"]
    .map(
      (pathname) => `  <url>
    <loc>${escapeHtml(toAbsoluteUrl(pathname))}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${pathname === "/" ? "1.0" : "0.3"}</priority>
  </url>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`;
}

export function buildManifestJson() {
  return `${JSON.stringify(
    {
      name: siteConfig.siteName,
      short_name: siteConfig.shortName,
      lang: siteConfig.language,
      start_url: "./",
      display: "standalone",
      background_color: siteConfig.themeColor,
      theme_color: siteConfig.themeColor,
      icons: [
        {
          src: "./assets/icons/ui/favicon.svg",
          sizes: "any",
          type: "image/svg+xml",
        },
      ],
    },
    null,
    2,
  )}\n`;
}

export function buildCname() {
  const customDomain = getCustomDomain();
  return customDomain ? `${customDomain}\n` : "";
}
