export const siteConfig = {
  siteName: "Adem Yaren",
  shortName: "Adem",
  siteUrl: "https://ademyaren.de",
  email: "ademyrn1@gmail.com",
  language: "de",
  locale: "de_DE",
  themeColor: "#f7f1e8",
  pageTitle: "Adem Yaren | Weblösungen & SparenMitAdem",
  metaDescription:
    "Hi, ich bin Adem. Ich entwickle Weblösungen und begleite dich mit SparenMitAdem persönlich zu mehr Überblick über Geld, Ausgaben und Konsum.",
  ogDescription:
    "Entwickler, Problemlöser und persönliche Begleitung rund um Geld und Konsum. Entdecke Weblösungen und SparenMitAdem.",
  ogImagePath: "/assets/images/og/og-cover.png",
  goatcounterUrl: "https://ademy.goatcounter.com/count",
};

// Eine Route pro HTML-Datei. Die Navigation wird daraus abgeleitet.
export const pages = [
  { id: "home", file: "index.html", path: "/", label: "Start", title: siteConfig.pageTitle, description: siteConfig.metaDescription },
  { id: "webloesungen", file: "webloesungen.html", path: "/webloesungen/", label: "Weblösungen", title: "Weblösungen & individuelle Software | Adem Yaren", description: "Webseiten, Individualsoftware, APIs, Middleware und Beratung. Gemeinsam finden wir die passende Weblösung für dein Problem oder deine Idee." },
  { id: "sparemitadem", file: "sparemitadem.html", path: "/sparemitadem/", label: "SparenMitAdem", title: "SparenMitAdem – Geld & Konsum bewusst gestalten | Adem Yaren", description: "Verstehe deine Ausgaben mit persönlicher 1:1-Begleitung, Workbook und wöchentlichem Call. Erfahre mehr über Kosten, Ablauf und dein kostenloses Erstgespräch." },
  { id: "ueber-mich", file: "ueber-mich.html", path: "/ueber-mich/", label: "Über mich", title: "Über mich – Entwickler & Problemlöser | Adem Yaren", description: "Ich bin Adem Yaren. Ich entwickle Software, baue eigene Ideen auf und beschäftige mich mit Geld und Konsum. Lerne mich und meine Arbeitsweise kennen." },
  { id: "kontakt", file: "kontakt.html", path: "/kontakt/", label: "Kontakt", title: "Kontakt – Lass uns sprechen | Adem Yaren", description: "Du hast ein Webprojekt, interessierst dich für SparenMitAdem oder möchtest dich austauschen? Schreib Adem Yaren direkt per E-Mail." },
  { id: "impressum", file: "impressum.html", path: "/impressum/", title: "Impressum | Adem Yaren", description: "Impressumsseite und Kontaktangaben von Adem Yaren. Die vollständigen Pflichtangaben stehen noch aus." },
  { id: "datenschutz", file: "datenschutz.html", path: "/datenschutz/", title: "Datenschutz | Adem Yaren", description: "Datenschutzseite von Adem Yaren. Die vollständigen Angaben zu den eingesetzten Diensten stehen noch aus." },
];

export const navigation = pages.filter((page) => page.label).map(({ id, path, label }) => ({ id, href: path, label }));
