import type { FaqItem } from "@/types";

export const PREISE_FAQ: FaqItem[] = [
  {
    id: "preise-1",
    question: "Was kostet eine Entrümpelung in Wien?",
    answer:
      "Eine Entrümpelung in Wien beginnt je nach Objektart und Umfang oft ab etwa €150 für kleine Keller oder Teilmengen. Wohnungsauflösungen liegen häufig im Bereich von €600 bis €2.500, Verlassenschaften und Gewerberäumungen können höher ausfallen. Entscheidend sind Fläche, Stockwerk, Zugang (Aufzug, Parkplatz), Beladungsgrad und Entsorgungsaufwand. Unser Kostenrechner liefert einen unverbindlichen Online-Richtwert; verbindlich wird erst nach kostenloser Besichtigung vor Ort.",
  },
  {
    id: "preise-2",
    question: "Ist der Online-Kostenrechner verbindlich?",
    answer:
      "Nein. Der Kostenrechner auf sofortraumung.at/preise dient ausschließlich als Orientierungshilfe. Er ersetzt keine Besichtigung. Nach der kostenlosen Vor-Ort-Begehung erhalten Sie von SofortRäumung einen schriftlichen Festpreis — ohne versteckte Nachforderungen.",
  },
  {
    id: "preise-3",
    question: "Welche Faktoren beeinflussen den Entrümpelungspreis am stärksten?",
    answer:
      "In Wien sind es vor allem: (1) Menge und Art des Inventars, (2) m² bzw. Raumvolumen, (3) Stockwerk ohne Aufzug, (4) Zustand (Messie/Extrembeladung), (5) Demontage (Einbauküche, Boden), (6) Wertanrechnung verwertbarer Gegenstände, (7) Park- und Zufahrtsmöglichkeiten für LKW/Container.",
  },
  {
    id: "preise-4",
    question: "Wird Wertanrechnung im Rechner berücksichtigt?",
    answer:
      "Der Rechner bildet Wertanrechnung nicht automatisch ab, da verwertbare Möbel, Antiquitäten oder Geräte erst bei der Besichtigung bewertet werden können. Bei der Festpreis-Erstellung ziehen wir anrechenbare Werte transparent ab — das senkt Ihre Endrechnung oft deutlich.",
  },
  {
    id: "preise-5",
    question: "Gibt es versteckte Kosten bei SofortRäumung?",
    answer:
      "Nein. Nach der Besichtigung erhalten Sie einen Festpreis, der Demontage, Abtransport, fachgerechte Entsorgung und besenreine Übergabe umfasst — sofern im Angebot vereinbart. Sonderwünsche (z. B. zusätzliche Reinigung) werden vorab besprochen.",
  },
];

export const PREISE_PRICE_TABLE: {
  leistung: string;
  richtwert: string;
  hinweis: string;
}[] = [
  {
    leistung: "Kellerräumung",
    richtwert: "ab €150 – €800",
    hinweis: "Je nach Volumen & Zugang",
  },
  {
    leistung: "Wohnungsauflösung (2–3 Zimmer)",
    richtwert: "€650 – €2.200",
    hinweis: "Inkl. Abtransport & Entsorgung",
  },
  {
    leistung: "Verlassenschaft",
    richtwert: "€800 – €3.500+",
    hinweis: "Diskret, oft mit Wertanrechnung",
  },
  {
    leistung: "Büro- / Gewerberäumung",
    richtwert: "€500 – €4.000+",
    hinweis: "Abhängig von Fläche & Inventar",
  },
  {
    leistung: "Messie-Entrümpelung",
    richtwert: "individuell",
    hinweis: "Besichtigung dringend empfohlen",
  },
];
