// Zentrale Angebotsdaten: Änderungen erscheinen im Überblick und in den Antworten.
export const coachingOffer = {
  monthlyPrice: "20 €",
  cancellation: "monatlich kündbar",
  weeklyTime: "2–3 Stunden",
  firstMeeting: "kostenlos",
};

export const coachingFaqs = [
  {
    question: "Was kostet die Begleitung?",
    paragraphs: [
      `Für ${coachingOffer.monthlyPrice} im Monat bekommst du persönliche Unterstützung dabei, deine Ausgaben zu verstehen und bewusster mit deinem Geld umzugehen. Dein individuelles Workbook, die Analyse deiner Situation und ein Schritt-für-Schritt-Plan für den Aufbau von Rücklagen gehören dazu – ebenso unser wöchentlicher persönlicher Call.`,
    ],
  },
  {
    question: "Wie lange läuft die Begleitung?",
    paragraphs: [
      `Du entscheidest, wie lange du begleitet werden möchtest. Die Begleitung ist ${coachingOffer.cancellation} und läuft weiter, bis du sie beendest.`,
    ],
  },
  {
    question: "Wie viel Zeit sollte ich einplanen?",
    paragraphs: [
      `Plane etwa ${coachingOffer.weeklyTime} pro Woche ein. Diese Zeit nutzt du für das Erfassen deiner Ausgaben, das Nachdenken über Kaufentscheidungen, unseren persönlichen Call und die Umsetzung deiner nächsten Schritte. Der Call findet grundsätzlich am Wochenende statt.`,
    ],
  },
  {
    question: "Was passiert nach meiner ersten Nachricht?",
    paragraphs: [
      `Wir vereinbaren zunächst ein Erstgespräch. Es ist ${coachingOffer.firstMeeting}: Wir schauen auf deine Situation, deine Ziele und darauf, ob die Begleitung zu dir passt. Du musst dafür noch keinen fertigen Plan haben.`,
      "Wenn du dich für die Begleitung entscheidest, erstelle ich dein persönliches Workbook mit einer individuellen Ausgabenanalyse und konkreten Empfehlungen. Gemeinsam finden wir heraus:",
    ],
    bullets: [
      "Wohin der größte Teil deines Geldes fließt.",
      "Welche Ausgaben notwendig oder für dich sinnvoll sind.",
      "Welche Kosten du reduzieren und welche Verträge oder Abos du kündigen könntest.",
    ],
    conclusion: "Daraus entsteht ein realistischer Plan, mit dem du Schritt für Schritt Geld zur Seite legen kannst. Du bekommst klare nächste Schritte und persönliche Unterstützung bei der Umsetzung.",
  },
];

export const coachingSteps = [
  {
    title: "Erst beobachten.",
    description: "Mit deinem persönlichen Workbook erfassen wir Einnahmen, Fixkosten und variable Ausgaben. Wir schauen auf die Kategorien und darauf, wo dein Geld wirklich hingeht.",
    detail: "Dein Workbook schafft Überblick. Es ist unser Werkzeug innerhalb der Begleitung.",
  },
  {
    title: "Dann verstehen.",
    description: "Welche Ausgaben sind sinnvoll, welche unnötig? Wir reflektieren Kaufentscheidungen, erkennen Konsummuster und hinterfragen Impulse – ohne dir jeden kleinen Genuss auszureden.",
    detail: "Wir arbeiten auch am Mindset rund um Geld und Konsum.",
  },
  {
    title: "Gemeinsam verändern.",
    description: "Wir finden Sparpotenziale, entwickeln passende Routinen und arbeiten daran, Rücklagen aufzubauen. In einem wöchentlichen persönlichen Call besprechen wir deinen Fortschritt und die nächsten Schritte.",
    detail: "Der Call findet grundsätzlich am Wochenende statt.",
  },
];

export const savingPrinciples = [
  "Erst Sicherheit, dann Luxus.",
  "Bezahlbar bedeutet nicht automatisch sinnvoll.",
  "Nicht jede unnötige Ausgabe ist ein Kostenproblem. Manche sind ein Verhaltensproblem.",
  "Schöpfe ich die Dinge, die ich bereits besitze, wirklich aus?",
  "Erst beobachten. Dann optimieren.",
];

export const savingSignals = [
  "Du weißt nicht genau, wo dein Geld verschwindet.",
  "Du verdienst Geld, baust aber kaum Rücklagen auf.",
  "Du kaufst regelmäßig Dinge, die du eigentlich nicht brauchst.",
  "Du entscheidest spontan und ärgerst dich später über den Kauf.",
];
