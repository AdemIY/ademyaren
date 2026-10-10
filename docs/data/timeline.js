// Deine Geschichte. Ein Objekt = eine Station; gleiche Jahre werden gruppiert.
// Die Ausgabe sortiert numerisch aufsteigend; die Reihenfolge hier ist frei.
// Optional: link: { href, label } und image: { src, alt, width, height, caption }.
export const timelineEntries = [
  {
    year: 2002,
    title: "Der Anfang.",
    description: "Ich wurde geboren.",
  },
  {
    year: 2009,
    title: "Mein erstes selbst verdientes Geld.",
    description: "Mit 7 Jahren, in der 2. Klasse der Grundschule, habe ich mein erstes Geld verdient, indem ich Fußballkarten gehandelt habe. Ich war unglaublich glücklich über mein selbst verdientes Geld.",
  },
  {
    year: 2010,
    title: "Chef und Mitarbeiter.",
    description: "2010 – Als Kind habe ich mit meinem kleinen Bruder oft „Chef und Mitarbeiter“ gespielt. Bezahlt wurde natürlich mit Monopoly-Geld. Meine Begeisterung für Monopoly und Strategiespiele begleitet mich übrigens bis heute.",
  },
  {
    year: 2014,
    title: "Das erste regelmäßige Gehalt.",
    description: "Mit 12 Jahren habe ich gemeinsam mit meinem Bruder angefangen, Zeitungen auszutragen. So bekam ich zum ersten Mal ein regelmäßiges Gehalt. Zusätzlich sammelte ich Pfandflaschen, die ich auf der Straße fand.",
  },
  {
    year: 2015,
    title: "Ein Geschäft auf dem Pausenhof.",
    description: "Ich habe Bonbontüten und Kaugummipackungen gekauft und die Süßigkeiten einzeln auf dem Pausenhof weiterverkauft – bis mich jemand verpetzt hat und ich es nicht mehr durfte.",
  },
  {
    year: 2016,
    title: "Erste digitale Geschäfte.",
    description: "Über Facebook, insbesondere in Modding-Gruppen, habe ich Multimedia-Accounts verkauft. Dafür hatte ich sogar eine eigene Webseite, die jemand anderes für mich erstellt hatte.",
  },
  {
    year: 2017,
    title: "Neben der Schule in die Werkstatt.",
    description: "Ich habe einen Nebenjob in einer Kfz-Werkstatt angefangen, um neben der Schule mein eigenes Geld zu verdienen.",
  },
  {
    year: 2018,
    title: "Meine erste Ausbildung.",
    description: "Ich habe meine Ausbildung zum Kfz-Mechatroniker begonnen.",
  },
  {
    year: 2019,
    title: "Eigene Musik produzieren.",
    description: "Während meiner Ausbildung habe ich angefangen, mit Fruity Loops (FL Studio) eigene Musik zu produzieren.",
    link: {
      href: "https://www.youtube.com/@prodadam-nu1yu",
      label: "Meine Musik auf YouTube",
    },
  },
  {
    year: 2020,
    title: "Mein eigenes Kleingewerbe.",
    description: "Ich habe ein Kleingewerbe angemeldet und über Social Media und meinen eigenen Shopify-Shop selbst gestaltete, personalisierbare Perlenarmbänder verkauft.",
  },
  {
    year: 2021,
    title: "Mein erster finanzieller Meilenstein",
    description: "Während meiner Ausbildung habe ich es geschafft, insgesamt 10.000 € zur Seite zu legen."},
  {
    year: 2022,
    title: "Abschluss. Und weiter dranbleiben.",
    description: "Ich habe meine Ausbildung zum Kfz-Mechatroniker erfolgreich abgeschlossen, meinen Realschulabschluss nachgeholt und mich weiterhin um meinen Onlineshop gekümmert. Leider war der Online-Shop nicht Profitabel.",
  },
  {
    year: 2023,
    title: "Verstehen, wie die digitale Welt funktioniert.",
    description: "Ich habe meine zweite Ausbildung zum Fachinformatiker für Anwendungsentwicklung begonnen, weil ich schon immer verstehen wollte, wie die digitale Welt funktioniert.",
    image: {
      src: "/assets/images/og/og-cover.png",
      alt: "Website-Vorschaubild mit pastellfarbenen Flächen und dem Schriftzug Adem Yaren",
      width: 1200,
      height: 630,
      caption: "Beispielbild aus der Website – hier kannst du später ein eigenes Foto einsetzen.",
    },
  },
  {
    year: 2025,
    title: "Gesellschafter einer UG.",
    description: "Ich bin Gesellschafter einer UG geworden.",
  },
  {
    year: 2026,
    title: "Anwendungsentwickler. Ein neuer Anfang.",
    description: "Ich habe meine Ausbildung zum Anwendungsentwickler erfolgreich abgeschlossen und in einem neuen Unternehmen angefangen.",
  },
  {
    year: 2026,
    title: "Erfahrungen teilen. Menschen helfen.",
    description: "Ich habe angefangen, auf Social Media aktiv zu werden, um meine Erfahrungen zu teilen und Menschen wie dir zu helfen.",
  },
];

// Abschluss unter der Timeline. Social-Links kommen weiterhin aus social-links.js.
export const timelineConclusion = {
  title: "Warum ich das alles erzähle?",
  paragraphs: [
    "Schon als Kind hat mich fasziniert, wie man eigenes Geld verdienen kann. Über die Jahre habe ich vieles ausprobiert, Erfahrungen gesammelt und Fehler gemacht.",
    "Dabei habe ich gelernt, dass es nicht nur darum geht, wie viel Geld man verdient, sondern vor allem darum, wie man damit umgeht.",
    "Heute möchte ich diese Erfahrungen weitergeben: Gemeinsam schauen wir auf deine Ausgaben, deine Kaufentscheidungen und die Möglichkeiten, Rücklagen aufzubauen. Du bekommst persönliche Unterstützung dabei, einen bewussteren Umgang mit Geld in deinen Alltag zu bringen.",
  ],
};
