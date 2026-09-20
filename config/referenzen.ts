export interface ReferenzItem {
  id: string;
  name: string;
  location: string;
  rating: number;
  date: string;
  service: string;
  text: string;
}

export const REFERENZEN: ReferenzItem[] = [
  {
    id: "ref-1",
    name: "Mag. Anna K.",
    location: "Wien 3., Landstraße",
    rating: 5,
    date: "2026-07-12",
    service: "Wohnungsauflösung Wien",
    text:
      "Sehr professionelle und diskrete Wohnungsauflösung nach dem Todesfall meiner Mutter. Das Team war pünktlich, einfühlsam und hat die Wohnung in Wien besenrein übergeben. Klare Empfehlung.",
  },
  {
    id: "ref-2",
    name: "Thomas M.",
    location: "Wien 10., Favoriten",
    rating: 5,
    date: "2026-06-03",
    service: "Entrümpelung Wien",
    text:
      "Keller und Dachboden waren jahrelang voll. SofortRäumung hat alles an einem Tag geräumt – Festpreis nach Besichtigung, keine Überraschungen. Sehr freundliches Team.",
  },
  {
    id: "ref-3",
    name: "Sabine R.",
    location: "Mödling",
    rating: 5,
    date: "2026-05-18",
    service: "Haushaltsauflösung Wien",
    text:
      "Haushaltsauflösung in unserer Wohnung in Wien und im Keller. Wertanrechnung für Möbel hat die Kosten spürbar gesenkt. Organisation top, Übergabeprotokoll inklusive.",
  },
  {
    id: "ref-4",
    name: "Ing. Markus W.",
    location: "Wien 22., Donaustadt",
    rating: 5,
    date: "2026-04-22",
    service: "Büroauflösung Wien",
    text:
      "Büroauflösung nach Firmenumzug. Abends geräumt, damit der Betrieb nicht gestört wurde. Sauber, schnell und absolut zuverlässig.",
  },
  {
    id: "ref-5",
    name: "Elena P.",
    location: "Wien 16., Ottakring",
    rating: 5,
    date: "2026-03-09",
    service: "Kellerräumung Wien",
    text:
      "Enges Stiegenhaus, kein Lift – trotzdem alles problemlos. Kellerräumung in Wien zu einem fairen Festpreis. Gerne wieder.",
  },
  {
    id: "ref-6",
    name: "Familie H.",
    location: "Schwechat",
    rating: 5,
    date: "2026-02-14",
    service: "Verlassenschaftsräumung",
    text:
      "Diskrete Nachlassräumung, Abstimmung mit dem Notariat hat gut funktioniert. Wir fühlten uns gut betreut und ernst genommen.",
  },
];

export const REFERENZEN_SUMMARY = {
  ratingValue: 5,
  reviewCount: 150,
  bestRating: 5,
  worstRating: 1,
} as const;
