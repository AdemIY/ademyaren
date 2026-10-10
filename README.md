# Adem Yaren – Weblösungen & SparenMitAdem

Persönliche Website für ademyaren.de. Statisches HTML, Vanilla JavaScript als ES-Module und Tailwind CSS v4. Der bestehende Node-Build erzeugt das Publish-Verzeichnis für GitHub Pages. Kein Framework, CMS oder Backend.

## Lokal starten

Node.js 22 oder neuer:

```bash
npm ci
npm run dev
```

Preview: http://localhost:4173. Der Dev-Prozess beobachtet CSS, HTML und die importierten Daten-/Render-Module. Die Vorschau lädt nach Änderungen neu.

Ist Port 4173 bereits belegt, beendet sich `npm run dev` mit einer verständlichen Fehlermeldung, bevor die Watcher starten. Beende die frühere Vorschau in ihrem Terminal mit Strg+C und starte erneut. Alternativ lässt sich ein anderer Port wählen: `npm run dev -- 4175`. Nach Änderungen an den Startskripten einen bereits laufenden älteren Dev-Prozess neu starten.

Weitere Befehle:

- `npm run preview`: Quellvorschau ohne CSS-Watch.
- `npm run preview:docs`: fertige Ausgabe unter http://localhost:4174.
- `npm run build`: CSS kompilieren und alle Seiten/Assets nach `docs/` schreiben.
- `npm run check`: nach dem Build HTML, Metadaten, interne Links, Assets, Navigation, Sitemap und Erweiterbarkeit prüfen.
- `npm run check:dev`: echten Dev-Start, Template-Rendering, CSS-/JS-Auslieferung, Portkonflikte und Beenden der Watcher prüfen.
- `npm run check:timeline`: Jahresgruppen, Sortierung, zusätzliche Stationen, HTML-Escaping und die gemeinsamen Accordions prüfen.
- `npm run check:coaching`: Angebotsdaten, häufige Fragen, kostenloses Erstgespräch und E-Mail-Einstieg prüfen.
- `npm run check:accordions`: gemeinsame Accordions, Startzustände, Reihenfolge und erhaltene Anker auf allen Seiten prüfen.

## Aufbau

- `src/index.html`: Startseite mit Übersicht und nummerierten Bereichen.
- `src/webloesungen.html`: Leistungen, vorhandene Projekte und technischer Hintergrund.
- `src/sparemitadem.html`: persönliche Begleitung, Vorgehen und Grundgedanken.
- `src/ueber-mich.html`: Persönlichkeit, Arbeitsweise und bisherige Erfahrung.
- `src/kontakt.html`: drei Anliegen mit direkten E-Mail-Links.
- `src/impressum.html` und `src/datenschutz.html`: vorhandene Rechtstext-Platzhalter.
- `src/data/`: wiederkehrende Inhalte und Konfiguration.
- `src/assets/js/modules/render-layout.js`: gemeinsamer Header, Navigation, Theme-Schalter und Footer.
- `src/assets/js/modules/render-sections.js`: Angebotsbereiche, Leistungs-, Projekt-, Social- und Coaching-Listen.
- `src/assets/js/modules/render-page-sections.js`: Accordion-Bereiche für Weblösungen, SparenMitAdem, Kontakt, Impressum und Datenschutz. Die Nummerierung folgt automatisch der Reihenfolge der Bereiche; die Inhalte nutzen weiterhin die bestehenden Datenlisten.
- `src/assets/js/modules/html.js`: HTML-Escaping, Nummerierung und Pfeile.
- `src/assets/js/modules/navigation.js`: natives mobiles Dialogmenü, alte Abschnittslinks und Kontaktkontext.
- `src/assets/js/modules/theme.js`: bestehender Hell-/Dunkelmodus mit gespeichertem Zustand und Systempräferenz.
- `src/assets/css/input.css`: Tailwind-Quelle und Editorial-Komponenten.
- `scripts/site-output.mjs`: gemeinsame Metadaten sowie Sitemap, robots.txt, Manifest und CNAME.
- `docs/`: generierte GitHub-Pages-Ausgabe. Inhalte hier nicht direkt pflegen.

Header, Footer und wiederkehrende Inhalte werden beim Build und in der Preview gerendert. Die vollständigen Inhalte und Links stehen bereits im HTML und funktionieren ohne JavaScript. JavaScript ergänzt Theme-Wechsel, das mobile Menü und Kompatibilität mit alten Abschnittslinks.

## Social Links pflegen

In `src/data/social-links.js` stehen vorbereitete Einträge für Instagram, TikTok, LinkedIn und GitHub sowie eigene SparenMitAdem-Profile. Trage die vollständige Profil-URL in `url` ein. Einträge mit leerer URL werden ausgeblendet; es gibt keine erfundenen Handles oder Links zur allgemeinen Plattformstartseite.

Ein neuer Link benötigt nur einen weiteren Datensatz:

```js
{
  id: "neue-plattform",
  label: "Neue Plattform",
  url: "https://example.com/dein-profil",
  context: "Persönliches Profil",
  scope: "personal",
}
```

Alle befüllten Einträge erscheinen auf der Startseite und im Footer. Mit `scope: "sparemitadem"` erscheint das Profil zusätzlich auf der SparenMitAdem-Seite. `context` hilft, persönliche und Markenprofile derselben Plattform zu unterscheiden.

Der bereits vorhandene Instagram-Handle `ademyaren.de` wurde übernommen und die Plattformdomain auf `instagram.com` korrigiert. Bitte die tatsächliche Profiladresse bei der Pflege bestätigen.

## Webleistungen ergänzen

In `src/data/services.js` einen Datensatz zu `webServices` ergänzen:

```js
{
  id: "neue-leistung",
  title: "Neue Leistung",
  description: "Kurz erklären, bei welchem Problem die Leistung hilft.",
}
```

Die Leistung erscheint automatisch in der Startseitenübersicht und auf der Weblösungen-Seite. Die `id` ist zugleich der direkte Abschnittsanker. IDs müssen eindeutig sein.

## Angebote ergänzen

In `src/data/offers.js` einen Datensatz ergänzen:

```js
{
  id: "neues-angebot",
  label: "Neues Angebot",
  title: "Eine klare Hauptaussage.",
  description: "Eine kurze Erklärung.",
  href: "/kontakt/",
  cta: "Mehr erfahren",
}
```

Die Startseite erhält automatisch einen weiteren Angebotsbereich sowie einen Link im Hero. Links stehen als Bereich 01 vor den Angeboten; die folgenden Nummern für Angebote, Über mich und Kontakt passen sich automatisch an.

Optional: `note` für einen Zusatzsatz. `variant: "saving"` verwendet den grünen Editorial-Bereich. `variant: "web"` ergänzt die Webleistungsübersicht. Ohne Variante wird ein schlichter Angebotsbereich ausgegeben.

Eine eigene Unterseite ist optional: HTML-Datei in `src/` anlegen und in `pages` in `src/data/site.js` registrieren. Der Build und die Sitemap berücksichtigen sie automatisch. Ein `label` im Seitendatensatz nimmt sie auch in die Hauptnavigation auf.

## Weitere Inhalte und Funktionen

- `src/data/site.js`: Domain, E-Mail, Analytics-Endpunkt, Seitentitel, Beschreibungen und Routen.
- `src/data/contact.js`: Anliegen, Betreff und kurzer Nachrichteneinstieg. Alle Kontakte bleiben E-Mail-Links ohne Datenspeicherung auf der Website.
- `src/data/coaching.js`: `coachingOffer` enthält Preis, Kündbarkeit, wöchentlichen Zeitaufwand und Erstgespräch. Diese Werte erscheinen automatisch im sichtbaren Überblick und den Antworten. `coachingFaqs` enthält die häufigen Fragen; ein neuer Datensatz mit `question` und `paragraphs` ergänzt automatisch eine weitere Antwort. Optional sind `bullets` und `conclusion`. Außerdem stehen hier Schritte der Begleitung, Zielgruppensignale und Grundgedanken.
- `src/data/projects.js`, `tech-stack.js`, `topics.js`: aus dem bisherigen Projekt übernommene Inhalte.
- `/kontakt/?anliegen=webloesungen` bzw. `?anliegen=sparemitadem`: hebt den passenden E-Mail-Einstieg hervor. Die Links funktionieren auch ohne JavaScript.
- Alte Startseitenanker `#leistungen`, `#projekte`, `#tech-stack` und `#aktuelle-themen` führen mit JavaScript zum passenden neuen Abschnitt.

Nach jeder Änderung `npm run build` und `npm run check` ausführen. Für GitHub Pages bleibt `docs/` das Publish-Verzeichnis. Der Build veröffentlicht selbst nichts.

## Assets und Gestaltung

Das vorhandene SVG-Favicon und Open-Graph-Bild bleiben erhalten. Porträt- und Projektbilder sind im bisherigen Repository nicht vorhanden. Die Gestaltung nutzt Systemschriften und Georgia; es werden keine externen Webfonts oder neuen Laufzeitbibliotheken geladen.

Schriftgrößen skalieren mit `clamp()`; unter 1024 px übernimmt das mobile Menü, unter 768 px wechseln die Editorial-Raster auf eine Spalte. Der native Dialog unterstützt Escape, Fokusbegrenzung und inaktiven Hintergrund. Bei deaktiviertem JavaScript steht eine zusätzliche mobile Navigation bereit.

Die Inhaltsbereiche auf allen sieben Seiten sind auf allen Bildschirmgrößen native `details`/`summary`-Accordions, zunächst geschlossen. Einleitungen, die Eckdaten der Begleitung und wichtige Kontakt-Links bleiben sichtbar. Nummer, Thema und ein sich drehender Pfeil stehen in jeder Accordion-Kopfzeile. „Was ich mache“ springt zur Startseitenübersicht. Aufgeklappte Inhalte behalten auf Desktop das versetzte Editorial-Raster. Ein Wechsel der Bildschirmgröße verändert den offenen/geschlossenen Zustand nicht. Direkte Abschnittslinks öffnen mit JavaScript den betreffenden Bereich; auf der Kontaktseite öffnet eine gültige Vorauswahl per `?anliegen=…` die Anliegen-Auswahl. Die Accordions funktionieren auch ohne JavaScript. Der gemeinsame Baustein liegt in `src/assets/js/modules/render-accordion.js`, die Steuerung der Abschnittslinks in `src/assets/js/modules/accordions.js`.

## Persönliche Timeline pflegen

Der erste Bereich auf Über mich heißt „Wer bin ich?“ und enthält die Timeline. In `src/data/timeline.js` bedeutet jedes Objekt in `timelineEntries` eine Station:

```js
{
  year: 2023,
  title: "Dein persönlicher Meilenstein",
  description: "Was ist passiert und warum ist es für dich wichtig?",
}
```

`year` ist eine ganze Zahl. Die Ausgabe sortiert automatisch aufsteigend nach Jahren, ohne das Array zu verändern. Mehrere Stationen im selben Jahr erhalten einen gemeinsamen Jahresblock; innerhalb des Jahres gilt ihre Reihenfolge im Array. Ergänzen, bearbeiten oder entfernen benötigt keine Template-Änderung.

Die Timeline enthält die von Adem angegebenen Stationen von 2002 bis 2026. Bei 2019 ist der YouTube-Kanal verlinkt. Einträge lassen sich optional um Links und Bilder ergänzen:

```js
link: {
  href: "https://www.youtube.com/@prodadam-nu1yu",
  label: "Meine Musik auf YouTube",
},
image: {
  src: "./assets/images/profile/dein-foto.webp",
  alt: "Beschreibe, was auf dem Bild zu sehen ist",
  width: 1200,
  height: 800,
  caption: "Optionaler Bildtext",
},
```

Ein Bild erscheint nur, wenn `image.src` befüllt ist. Entferne `image` oder lasse `src` leer, um es auszublenden. `width` und `height` sind optional und sollten den tatsächlichen Bildmaßen entsprechen; sie verhindern Layoutsprünge. Bilder werden proportional angezeigt, nicht zugeschnitten, und verzögert geladen. `caption` ist optional. Lokale Bilder gehören nach `src/assets/images/`; der Build kopiert sie automatisch.

Für 2023 ist das vorhandene Open-Graph-Bild als ausdrücklich gekennzeichnetes Beispiel eingesetzt. Ersetze den Pfad und Alt-Text durch dein eigenes Bild und entferne den Beispiel-Bildtext. Leeres Timeline-Array ist ebenfalls möglich. Falls du später mit Beispielstationen arbeitest, blendet `isExample: true` einen entsprechenden Hinweis ein.

Direkt unter dem letzten Timeline-Eintrag folgt „Warum ich das alles erzähle?“. Titel und Absätze pflegst du über `timelineConclusion` ebenfalls in `src/data/timeline.js`. Darunter erscheinen automatisch die befüllten Social-Links aus `src/data/social-links.js` und ein Link zur bestehenden Kontaktseite. Es wird kein neues Formular oder Backend eingeführt.

Jahreszahlen bleiben innerhalb ihres Blocks beim Scrollen stehen. Einträge blenden sich ein; Linie und Punkte zeigen den Lesefortschritt. Die Effekte nutzen den vorhandenen IntersectionObserver sowie einen gebündelten Scroll-Handler ohne Bibliothek. Bei reduzierter Bewegung und ohne JavaScript bleibt die Timeline statisch lesbar. Layout und Typografie verwenden Tailwind-Utilities; zusätzliche CSS-Regeln betreffen die dekorativen Linien und Animationen.

Der vorhandene GoatCounter-Endpunkt bleibt in `siteConfig.goatcounterUrl` konfiguriert. Eine leere Zeichenfolge deaktiviert die Einbindung.

## Bestehende offene Inhalte

Impressum und Datenschutz enthalten weiterhin die bereits vorhandenen Platzhaltertexte. Fehlende Angaben wurden nicht erfunden. Die Social-Profil-URLs können in der vorbereiteten Liste selbst gepflegt werden.

## URLs ohne Dateiendung

Die öffentlichen Seiten verwenden `/webloesungen/`, `/sparemitadem/`, `/ueber-mich/`, `/kontakt/`, `/impressum/` und `/datenschutz/`. Die Quelldateien behalten ihre `.html`-Namen; `pages[].path` legt die öffentliche URL fest. Der Build erzeugt pro Route einen Ordner mit `index.html`. Interne Links, Assets, Canonicals und Sitemap verwenden die neuen URLs.

Die bisherigen `.html`-Adressen bleiben als statische Weiterleitungsseiten erhalten. Mit JavaScript bleiben Suchparameter und Abschnittsanker erhalten; ohne JavaScript führt eine Meta-Weiterleitung zur neuen Seite. GitHub Pages unterstützt hier keine frei konfigurierbaren HTTP-301-Regeln. Die lokale Vorschau verwendet HTTP-301-Weiterleitungen und unterstützt auch URLs ohne abschließenden Schrägstrich.
