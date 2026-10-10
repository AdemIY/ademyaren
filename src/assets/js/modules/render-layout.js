import { siteConfig, navigation } from "../../../data/site.js";
import { escapeHtml as e } from "./html.js";
import { renderSocialLinks } from "./render-sections.js";

function themeToggle() {
  return `<button type="button" class="theme-toggle" data-theme-toggle role="switch" aria-checked="false" aria-label="Dunkle Darstellung"><span class="theme-symbol" aria-hidden="true">◐</span><span data-theme-toggle-state>Hell</span></button>`;
}

function navLinks(pageId, mobile = false) {
  return navigation.map((link) => `<li><a href="${e(link.href)}" class="${mobile ? "mobile-nav-link" : "nav-link"}"${mobile ? " data-mobile-nav-link" : ""}${link.id === pageId ? ' aria-current="page"' : ""}>${e(link.label)}</a></li>`).join("");
}

export function renderHeader(pageId) {
  return `<a href="#main-content" class="skip-link">Zum Inhalt springen</a>
    <header class="site-header" data-site-header><div class="container-shell header-inner">
      <a href="/" class="site-mark" aria-label="${e(siteConfig.siteName)} – Startseite">ADEM YAREN<span class="brand-dot" aria-hidden="true">.</span></a>
      <nav class="desktop-nav" aria-label="Hauptnavigation"><ul>${navLinks(pageId)}</ul></nav>
      <div class="header-actions">${themeToggle()}<button type="button" class="menu-button" aria-expanded="false" aria-controls="mobile-menu" aria-label="Menü öffnen" data-menu-button><span>Menü</span><span class="menu-lines" aria-hidden="true"></span></button></div>
    </div></header>
    <dialog id="mobile-menu" class="mobile-menu" aria-label="Hauptnavigation" data-mobile-menu>
      <div class="menu-top"><span class="site-mark">ADEM YAREN.</span><button type="button" class="menu-close" aria-label="Menü schließen" data-menu-close>Schließen <span aria-hidden="true">×</span></button></div>
      <nav aria-label="Mobile Hauptnavigation"><ul>${navLinks(pageId, true)}</ul></nav>
      <div class="menu-bottom"><p class="eyebrow">Eine Idee? Schreib mir.</p><a class="text-link" href="mailto:${e(siteConfig.email)}">${e(siteConfig.email)}</a></div>
    </dialog>
    <noscript><nav class="noscript-nav container-shell" aria-label="Hauptnavigation ohne JavaScript"><ul>${navLinks(pageId)}</ul></nav></noscript>`;
}

export function renderFooter() {
  return `<footer class="site-footer"><div class="container-shell">
    <div class="footer-top"><a class="site-mark" href="/">ADEM YAREN.</a><p>Ideen entwickeln. Probleme lösen. Bewusster leben.</p><a class="footer-link" href="mailto:${e(siteConfig.email)}">${e(siteConfig.email)}</a></div>
    <div class="footer-bottom"><p>© ${new Date().getFullYear()} ${e(siteConfig.siteName)}</p><ul class="footer-social" aria-label="Social Media">${renderSocialLinks({ compact: true })}</ul><nav aria-label="Rechtliche Informationen"><a class="footer-link" href="/impressum/">Impressum</a><a class="footer-link" href="/datenschutz/">Datenschutz</a></nav></div>
  </div></footer>`;
}
