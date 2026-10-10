export const socialLinks = [
  {
    id: "instagram",
    label: "Instagram",
    url: "https://www.instagram.com/ademyaren.de/",
    context: "Persönliches Profil",
    scope: "personal",
  },
  // Nur echte Profil-URLs eintragen. Einträge ohne URL werden nicht als Links ausgegeben.
  { id: "tiktok", label: "TikTok", url: "https://www.tiktok.com/@der.adem", context: "Persönliches TikTok Profil", scope: "personal" },
  { id: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/in/ademyaren-de", context: "Beruflicher Austausch", scope: "personal" },
  { id: "github", label: "GitHub", url: "", context: "Code & Projekte", scope: "personal" },
  // Diese Profile erscheinen zusätzlich auf der SparenMitAdem-Seite.
  { id: "sparemitadem-instagram", label: "Instagram", url: "", context: "SparenMitAdem", scope: "sparemitadem" },
  { id: "sparemitadem-tiktok", label: "TikTok", url: "", context: "SparenMitAdem", scope: "sparemitadem" },
];
