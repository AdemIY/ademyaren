import { siteConfig } from "./site.js";

export const contactTopics = [
  { id: "webloesungen", label: "Weblösung", description: "Eine Webseite, Software, Schnittstelle oder eine erste Idee.", subject: "Anfrage zu einer Weblösung", body: "Hi Adem,\n\nich möchte mit dir über eine Weblösung sprechen.\n\nMeine Idee oder mein Problem:\n" },
  { id: "sparemitadem", label: "SparenMitAdem", description: "Kostenloses Erstgespräch anfragen und deine Situation gemeinsam besprechen.", subject: "Kostenloses Erstgespräch zu SparenMitAdem", body: "Hi Adem,\n\nich möchte ein kostenloses Erstgespräch zu SparenMitAdem vereinbaren.\n\nDas beschäftigt mich gerade:\n" },
  { id: "sonstiges", label: "Sonstiges", description: "Eine Frage, Zusammenarbeit oder einfach ein guter Austausch.", subject: "Kontakt über ademyaren.de", body: "Hi Adem,\n\n" },
];

export function contactHref(topic) {
  return `mailto:${siteConfig.email}?subject=${encodeURIComponent(topic.subject)}&body=${encodeURIComponent(topic.body)}`;
}
