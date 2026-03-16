# Persoenliche Onepage-Website

Dieses Projekt ist als statische persoenliche Onepage-Website mit Tailwind CSS v4, Vanilla JavaScript und GitHub Pages vorbereitet.

## Struktur

- `src/` enthaelt Quellstruktur, Datenmodule und SEO-Dateien.
- `src/assets/css/input.css` ist die Tailwind-v4-Quelle mit `@theme`-Tokens.
- `src/assets/js/modules/` kapselt Navigation und Rendering.
- `src/data/` enthaelt Inhalte fuer wiederholte Bereiche wie Leistungen, Projekte und aktuelle Themen.
- `src/data/site.js` ist die zentrale Konfiguration fuer Seitentitel, E-Mail, Theme-Farbe und spaetere Live-URL.
- `src/seo/` enthaelt robots.txt, sitemap.xml und site.webmanifest.
- `scripts/dev.mjs` startet CSS-Watch und lokalen Preview-Server.
- `scripts/preview-server.mjs` liefert einen lokalen Live-Preview-Server mit Auto-Reload.
- `scripts/build-static.mjs` rendert HTML-/SEO-Ausgaben und schreibt den finalen Stand nach `docs/`.
- `docs/` ist als Publish-Verzeichnis fuer GitHub Pages vorgesehen.

## Development

- `npm.cmd run dev` startet Tailwind-Watch und die Preview auf `http://localhost:4173`.
- `npm.cmd run dev:css` startet nur den Tailwind-Watch.
- `npm.cmd run preview` startet nur die Preview fuer `src/`.
- `npm.cmd run preview:docs` startet eine Preview fuer den finalen Build in `docs/`.

## Build

- `npm.cmd run build:css` erzeugt die produktive CSS-Datei in `src/assets/css/styles.css`.
- `npm.cmd run build` baut zuerst CSS und kopiert danach alles nach `docs/`.

## Naechste sinnvolle Schritte

1. Platzhalter in `src/data/` mit finalen Inhalten ersetzen.
2. Platzhalterseiten fuer `impressum.html` und `datenschutz.html` vor dem Livegang mit finalen Rechtstexten ersetzen.
3. Finale Assets fuer Profil, Projekte, OG-Image und Favicons hinzufuegen.
4. `siteUrl` und oeffentliche Social-Profile in `src/data/site.js` bzw. `src/data/social-links.js` eintragen.
5. Optional Fonts lokal einbinden oder ueber einen externen Anbieter laden.
