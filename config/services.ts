import { SITE } from "@/config/site";

export const SERVICE_SLUGS = [
  "raeumung-wien",
  "entruempelung-wien",
  "entsorgung-wien",
  "haushaltsaufloesung-wien",
  "haushaltsaufloesung-ueberblick",
  "wohnungsaufloesung-wien",
  "zimmer-raeumung-wien",
  "kellerraeumung-wien",
  "garagenraeumung-wien",
  "dachbodenraeumung-wien",
  "firmen-bueroaufloesung-wien",
  "lager-gewerbeparkraeumung",
  "gastro-retail-raeumung",
  "verlassenschaften-nachlassraeumung",
  "messie-entruempelung-wien",
  "ankauf",
  "antiquitaeten-wertanrechnung",
  "moebel-wertanrechnung",
] as const;

export type ServiceSlug = (typeof SERVICE_SLUGS)[number];

export type ServiceHub =
  | "pillar"
  | "wohnraum"
  | "gewerbe"
  | "spezial"
  | "entsorgung"
  | "wert";

export interface ContentSegment {
  type: "text" | "internal";
  value: string;
  slug?: ServiceSlug;
}

export interface ServicePageConfig {
  slug: ServiceSlug;
  title: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  shortDescription: string;
  serviceType: string;
  category: string;
  hub: ServiceHub;
  isPillar: boolean;
  parentPillar: ServiceSlug | null;
  relatedSlugs: ServiceSlug[];
  wertanrechnungLinks: ServiceSlug[] | null;
  showWhatsAppCta: boolean;
  highlights: string[];
  /** First paragraphs – pillar link should appear within first two */
  intro: ContentSegment[][];
  body: ContentSegment[][];
}

const PILLAR: ServiceSlug = "raeumung-wien";

export const SERVICES: Record<ServiceSlug, ServicePageConfig> = {
  "raeumung-wien": {
    slug: "raeumung-wien",
    title: "Räumung Wien",
    h1: "Räumung Wien ab €150 – Festpreis, diskret & besenrein",
    metaTitle: "Räumung Wien ab €150 – Festpreis | SofortRäumung",
    metaDescription:
      "Räumung Wien ab €150: Festpreis nach Besichtigung, Demontage, MA-48-Entsorgung und besenreine Übergabe in allen Bezirken. Jetzt kostenlos anfragen.",
    shortDescription:
      "Komplettservice für Räumungen in Wien: Demontage, Container, Abtransport und Übergabeprotokoll.",
    serviceType: "Räumung Wien",
    category: "Räumungsservice",
    hub: "pillar",
    isPillar: true,
    parentPillar: null,
    relatedSlugs: [
      "entruempelung-wien",
      "haushaltsaufloesung-wien",
      "wohnungsaufloesung-wien",
      "entsorgung-wien",
      "verlassenschaften-nachlassraeumung",
    ],
    wertanrechnungLinks: ["moebel-wertanrechnung", "antiquitaeten-wertanrechnung"],
    showWhatsAppCta: false,
    highlights: [
      "Festpreis nach kostenloser Besichtigung in Wien",
      "Besenreine Übergabe inkl. Dokumentation",
      "Kurzfristige Termine in Wien & Niederösterreich",
      "Wertanrechnung für verwertbare Möbel & Nachlässe",
    ],
    intro: [
      [
        {
          type: "text",
          value:
            "Sie brauchen eine zuverlässige ",
        },
        { type: "internal", slug: "raeumung-wien", value: "Räumung in Wien" },
        {
          type: "text",
          value:
            "? SofortRäumung übernimmt Wohnungen, Häuser, Keller und Gewerbeobjekte in Wien und Umgebung – diskret, termintreu und mit klarem Festpreis nach Besichtigung.",
        },
      ],
      [
        {
          type: "text",
          value:
            "Ob Kündigung, Eigentümerwechsel oder Leerstand: Unser Team in Wien demontiert, sortiert, transportiert und entsorgt fachgerecht. Auf Wunsch erhalten Sie ein Übergabeprotokoll – ideal für Wiener Wohnen, Hausverwaltungen und Privatkunden.",
        },
      ],
    ],
    body: [
      [
        {
          type: "text",
          value:
            "Als zentrale Anlaufstelle für Räumung Wien koordinieren wir Entrümpelung, Entsorgung und Wertausgleich aus einer Hand. Enge Stiegenhäuser, Altbau ohne Lift oder kurzfristige Fristen – wir planen den Einsatz passend zum Objekt in Wien.",
        },
      ],
      [
        {
          type: "text",
          value:
            "Viele Kundinnen und Kunden kombinieren die Räumung mit einer ",
        },
        {
          type: "internal",
          slug: "entruempelung-wien",
          value: "Entrümpelung Wien",
        },
        {
          type: "text",
          value:
            " oder einer ",
        },
        {
          type: "internal",
          slug: "haushaltsaufloesung-wien",
          value: "Haushaltsauflösung Wien",
        },
        {
          type: "text",
          value:
            ". So bleibt der Ablauf klar, die Kosten planbar und die Übergabe in Wien besenrein.",
        },
      ],
    ],
  },

  "entruempelung-wien": {
    slug: "entruempelung-wien",
    title: "Entrümpelung Wien",
    h1: "Entrümpelung Wien – mit Wertausgleich & Festpreis",
    metaTitle: "Entrümpelung Wien mit Wertausgleich | SofortRäumung",
    metaDescription:
      "Entrümpelung Wien: Sortierung, Wertausgleich und nachhaltige Entsorgung. Kostenlose Besichtigung in Wien & Niederösterreich – Festpreis ohne Überraschungen.",
    shortDescription:
      "Wertausgleich, Sortierung und nachhaltige Entsorgung bei Entrümpelung in Wien.",
    serviceType: "Entrümpelung Wien",
    category: "Entrümpelungsservice",
    hub: "wohnraum",
    isPillar: false,
    parentPillar: PILLAR,
    relatedSlugs: [
      "raeumung-wien",
      "haushaltsaufloesung-wien",
      "entsorgung-wien",
      "messie-entruempelung-wien",
      "moebel-wertanrechnung",
    ],
    wertanrechnungLinks: ["moebel-wertanrechnung", "antiquitaeten-wertanrechnung"],
    showWhatsAppCta: false,
    highlights: [
      "Sortierung vor Ort in Wien",
      "Wertausgleich auf den Festpreis",
      "MA-48-orientierte Entsorgung",
      "Auch kurzfristig in Wien möglich",
    ],
    intro: [
      [
        {
          type: "text",
          value:
            "Bei einer Entrümpelung in Wien trennen wir Verwertbares von Entsorgungs­gut und schaffen schnell wieder Ordnung – in Wohnung, Keller oder Dachboden.",
        },
      ],
      [
        {
          type: "text",
          value:
            "Als Teil unserer umfassenden ",
        },
        { type: "internal", slug: "raeumung-wien", value: "Räumung Wien" },
        {
          type: "text",
          value:
            " erhalten Sie einen transparenten Festpreis, inklusive Abtransport und besenreiner Übergabe in Wien und Umgebung.",
        },
      ],
    ],
    body: [
      [
        {
          type: "text",
          value:
            "Typische Einsätze in Wien: volle Kellerabteile, Estrich, Dachboden, WG-Zimmer oder komplette Wohnungen vor der Rückgabe. Wir achten auf enge Stiegenhäuser und logistische Herausforderungen in Gründerzeithäusern.",
        },
      ],
      [
        {
          type: "text",
          value:
            "Verwertbare Möbel und Gegenstände können über die ",
        },
        {
          type: "internal",
          slug: "moebel-wertanrechnung",
          value: "Möbel Wertanrechnung",
        },
        {
          type: "text",
          value:
            " die Kosten der Entrümpelung in Wien senken.",
        },
      ],
    ],
  },

  "entsorgung-wien": {
    slug: "entsorgung-wien",
    title: "Entsorgung Wien",
    h1: "Entsorgung Wien – Sperrmüll, Elektro & Problemstoffe",
    metaTitle: "Entsorgung Wien fachgerecht nach MA 48 | SofortRäumung",
    metaDescription:
      "Entsorgung Wien: Sperrmüll, Möbel, Elektrogeräte und Problemstoffe fachgerecht und MA-48-konform. In Wien & Niederösterreich zum Festpreis.",
    shortDescription:
      "Fachgerechte Entsorgung von Sperrmüll, Möbeln und Elektrogeräten in Wien.",
    serviceType: "Entsorgung Wien",
    category: "Entsorgungsservice",
    hub: "entsorgung",
    isPillar: false,
    parentPillar: PILLAR,
    relatedSlugs: [
      "raeumung-wien",
      "entruempelung-wien",
      "haushaltsaufloesung-wien",
      "kellerraeumung-wien",
    ],
    wertanrechnungLinks: null,
    showWhatsAppCta: false,
    highlights: [
      "Getrennte Erfassung nach Stoffströmen",
      "Orientierung an MA 48 Richtlinien",
      "Sperrmüll, Elektro, Hausrat, Gewerbeabfall",
      "Kombi mit Räumung Wien möglich",
    ],
    intro: [
      [
        {
          type: "text",
          value:
            "Professionelle Entsorgung in Wien bedeutet mehr als Abholen: Wir trennen Sperrmüll, Elektrogeräte, Problemstoffe und Hausrat und entsorgen sie vorschriftsmäßig.",
        },
      ],
      [
        {
          type: "text",
          value:
            "Ob Solo-Auftrag oder im Rahmen einer ",
        },
        { type: "internal", slug: "raeumung-wien", value: "Räumung Wien" },
        {
          type: "text",
          value:
            " – Sie erhalten einen klaren Festpreis und eine dokumentierte, umweltgerechte Abwicklung in Wien.",
        },
      ],
    ],
    body: [
      [
        {
          type: "text",
          value:
            "Für Haushalte und Betriebe in Wien organisieren wir Container, Abholung und die fachgerechte Weitergabe an geeignete Stellen. Auch gewerbliche Abfälle und Kellerinhalte gehören zu unseren Leistungen.",
        },
      ],
    ],
  },

  "haushaltsaufloesung-wien": {
    slug: "haushaltsaufloesung-wien",
    title: "Haushaltsauflösung Wien",
    h1: "Haushaltsauflösung Wien – komplett & mit Wertanrechnung",
    metaTitle: "Haushaltsauflösung Wien Festpreis | SofortRäumung",
    metaDescription:
      "Haushaltsauflösung Wien: komplette Auflösung von Wohnungen und Häusern inkl. Verwertung, Entsorgung und besenreiner Übergabe. Kostenlose Besichtigung.",
    shortDescription:
      "Komplette Auflösung von Wohnungen und Häusern in Wien mit fairer Verwertung.",
    serviceType: "Haushaltsauflösung Wien",
    category: "Haushaltsauflösung",
    hub: "wohnraum",
    isPillar: false,
    parentPillar: PILLAR,
    relatedSlugs: [
      "wohnungsaufloesung-wien",
      "haushaltsaufloesung-ueberblick",
      "entruempelung-wien",
      "verlassenschaften-nachlassraeumung",
      "raeumung-wien",
    ],
    wertanrechnungLinks: ["antiquitaeten-wertanrechnung", "moebel-wertanrechnung"],
    showWhatsAppCta: false,
    highlights: [
      "Alles aus einer Hand in Wien",
      "Wertanrechnung für Nachlass & Möbel",
      "Besenreine Übergabe",
      "Abstimmung mit Verwaltung & Erben",
    ],
    intro: [
      [
        {
          type: "text",
          value:
            "Eine Haushaltsauflösung in Wien entlastet Familien, Erben und Eigentümer: Wir räumen, sortieren, verwerten und entsorgen – bis die Immobilie übergabefähig ist.",
        },
      ],
      [
        {
          type: "text",
          value:
            "Der Ablauf ist eng mit unserer ",
        },
        { type: "internal", slug: "raeumung-wien", value: "Räumung Wien" },
        {
          type: "text",
          value:
            " verzahnt: kostenlose Besichtigung, Festpreis, Durchführung und besenreine Übergabe in Wien & Umgebung.",
        },
      ],
    ],
    body: [
      [
        {
          type: "text",
          value:
            "Mehr zum Ablauf lesen Sie im ",
        },
        {
          type: "internal",
          slug: "haushaltsaufloesung-ueberblick",
          value: "Haushaltsauflösung Überblick",
        },
        {
          type: "text",
          value:
            ". Für Mietwohnungen empfehlen wir ergänzend die ",
        },
        {
          type: "internal",
          slug: "wohnungsaufloesung-wien",
          value: "Wohnungsauflösung Wien",
        },
        { type: "text", value: "." },
      ],
    ],
  },

  "haushaltsaufloesung-ueberblick": {
    slug: "haushaltsaufloesung-ueberblick",
    title: "Haushaltsauflösung Überblick",
    h1: "Haushaltsauflösung Überblick – Ablauf, Festpreis & Tipps Wien",
    metaTitle: "Haushaltsauflösung Überblick Wien | SofortRäumung",
    metaDescription:
      "Haushaltsauflösung Überblick: Ablauf, Festpreis, Wertausgleich und Checkliste für Wien. So gelingt die Auflösung stressfrei mit SofortRäumung.",
    shortDescription:
      "Ratgeber zu Ablauf, Festpreis und Wertausgleich bei Haushaltsauflösungen in Wien.",
    serviceType: "Haushaltsauflösung Beratung",
    category: "Ratgeber",
    hub: "wohnraum",
    isPillar: false,
    parentPillar: PILLAR,
    relatedSlugs: [
      "haushaltsaufloesung-wien",
      "wohnungsaufloesung-wien",
      "entruempelung-wien",
      "antiquitaeten-wertanrechnung",
    ],
    wertanrechnungLinks: ["antiquitaeten-wertanrechnung", "moebel-wertanrechnung"],
    showWhatsAppCta: false,
    highlights: [
      "Schritt-für-Schritt Ablauf",
      "Was den Preis in Wien beeinflusst",
      "Wertausgleich verständlich erklärt",
      "Checkliste vor der Übergabe",
    ],
    intro: [
      [
        {
          type: "text",
          value:
            "Dieser Überblick erklärt, wie eine Haushaltsauflösung in Wien abläuft – von der Besichtigung bis zur besenreinen Übergabe.",
        },
      ],
      [
        {
          type: "text",
          value:
            "Praktisch umgesetzt wird der Prozess über unsere ",
        },
        { type: "internal", slug: "raeumung-wien", value: "Räumung Wien" },
        {
          type: "text",
          value:
            " bzw. die konkrete Leistung ",
        },
        {
          type: "internal",
          slug: "haushaltsaufloesung-wien",
          value: "Haushaltsauflösung Wien",
        },
        { type: "text", value: "." },
      ],
    ],
    body: [
      [
        {
          type: "text",
          value:
            "Wichtige Kostenfaktoren in Wien: Objektgröße, Füllgrad, Stockwerk/Lift, Sperrmüllmenge und ob Wertgegenstände angerechnet werden können. Nach der Besichtigung erhalten Sie einen verbindlichen Festpreis.",
        },
      ],
    ],
  },

  "wohnungsaufloesung-wien": {
    slug: "wohnungsaufloesung-wien",
    title: "Wohnungsauflösung Wien",
    h1: "Wohnungsauflösung Wien – rasch, sauber, übergabefähig",
    metaTitle: "Wohnungsauflösung Wien besenrein | SofortRäumung",
    metaDescription:
      "Wohnungsauflösung Wien für Miet- und Eigentumswohnungen: Demontage, Entsorgung, Wertanrechnung und besenreine Übergabe – auch nach Wiener Wohnen Vorgaben.",
    shortDescription:
      "Schnelle und saubere Räumung von Miet- und Eigentumswohnungen in Wien.",
    serviceType: "Wohnungsauflösung Wien",
    category: "Wohnungsräumung",
    hub: "wohnraum",
    isPillar: false,
    parentPillar: PILLAR,
    relatedSlugs: [
      "haushaltsaufloesung-wien",
      "zimmer-raeumung-wien",
      "entruempelung-wien",
      "raeumung-wien",
      "moebel-wertanrechnung",
    ],
    wertanrechnungLinks: ["moebel-wertanrechnung", "antiquitaeten-wertanrechnung"],
    showWhatsAppCta: false,
    highlights: [
      "Ideal vor Rückgabe an Vermieter",
      "Übergabeprotokoll auf Wunsch",
      "Kurzfristige Termine in Wien",
      "Wertanrechnung möglich",
    ],
    intro: [
      [
        {
          type: "text",
          value:
            "Bei einer Wohnungsauflösung in Wien räumen wir Miet- und Eigentumswohnungen vollständig – inklusive Möbel, Hausrat und oft auch Kellerabteil.",
        },
      ],
      [
        {
          type: "text",
          value:
            "Der Service ist Teil unserer ",
        },
        { type: "internal", slug: "raeumung-wien", value: "Räumung Wien" },
        {
          type: "text",
          value:
            ": Festpreis nach Besichtigung, professionelle Durchführung und besenreine Übergabe in Wien.",
        },
      ],
    ],
    body: [
      [
        {
          type: "text",
          value:
            "Für einzelne Räume oder Studentenwohnungen reicht oft eine ",
        },
        {
          type: "internal",
          slug: "zimmer-raeumung-wien",
          value: "Zimmer Räumung Wien",
        },
        {
          type: "text",
          value:
            ". Bei kompletten Haushalten empfehlen wir die ",
        },
        {
          type: "internal",
          slug: "haushaltsaufloesung-wien",
          value: "Haushaltsauflösung Wien",
        },
        { type: "text", value: "." },
      ],
    ],
  },

  "zimmer-raeumung-wien": {
    slug: "zimmer-raeumung-wien",
    title: "Zimmer Räumung Wien",
    h1: "Zimmer Räumung Wien – WG, Studentenwohnung & Teilräumung",
    metaTitle: "Zimmer Räumung Wien schnell & günstig | SofortRäumung",
    metaDescription:
      "Zimmer Räumung Wien: einzelne Zimmer, WGs und Studentenwohnungen rasch räumen lassen. Fairer Festpreis und Abholung in Wien.",
    shortDescription:
      "Räumung einzelner Zimmer, Studentenwohnungen und möblierter Objekte in Wien.",
    serviceType: "Zimmer Räumung Wien",
    category: "Teilräumung",
    hub: "wohnraum",
    isPillar: false,
    parentPillar: PILLAR,
    relatedSlugs: [
      "wohnungsaufloesung-wien",
      "entruempelung-wien",
      "raeumung-wien",
      "moebel-wertanrechnung",
    ],
    wertanrechnungLinks: ["moebel-wertanrechnung"],
    showWhatsAppCta: false,
    highlights: [
      "Ideal für WG-Wechsel in Wien",
      "Kleine Einsätze, klare Preise",
      "Abholung auch aus höheren Stockwerken",
      "Optional mit Wertanrechnung",
    ],
    intro: [
      [
        {
          type: "text",
          value:
            "Eine Zimmer Räumung in Wien eignet sich für WG-Zimmer, Studentenwohnungen und möblierte Objekte – schnell, unkompliziert und ohne großen Organisationsaufwand.",
        },
      ],
      [
        {
          type: "text",
          value:
            "Bei Bedarf skalieren wir auf eine komplette ",
        },
        { type: "internal", slug: "raeumung-wien", value: "Räumung Wien" },
        {
          type: "text",
          value:
            " oder ",
        },
        {
          type: "internal",
          slug: "wohnungsaufloesung-wien",
          value: "Wohnungsauflösung Wien",
        },
        { type: "text", value: "." },
      ],
    ],
    body: [
      [
        {
          type: "text",
          value:
            "Wir holen Betten, Schränke, Kartons und Sperrmüll ab und hinterlassen das Zimmer besenrein – passend zu typischen Wiener Mietfristen.",
        },
      ],
    ],
  },

  "kellerraeumung-wien": {
    slug: "kellerraeumung-wien",
    title: "Kellerräumung Wien",
    h1: "Kellerräumung Wien – Abteile, Lager & Altbaukeller",
    metaTitle: "Kellerräumung Wien besenrein | SofortRäumung",
    metaDescription:
      "Kellerräumung Wien: Kellerabteile, Abstellräume und Lagerkeller entrümpeln lassen – auch in Gründerzeithäusern. Festpreis nach Besichtigung.",
    shortDescription:
      "Räumung von Kellerräumen und Lagerkellern in Wien – auch in Gründerzeithäusern.",
    serviceType: "Kellerräumung Wien",
    category: "Kellerräumung",
    hub: "wohnraum",
    isPillar: false,
    parentPillar: PILLAR,
    relatedSlugs: [
      "dachbodenraeumung-wien",
      "garagenraeumung-wien",
      "entruempelung-wien",
      "raeumung-wien",
    ],
    wertanrechnungLinks: null,
    showWhatsAppCta: false,
    highlights: [
      "Erfahrung mit engen Stiegenhäusern",
      "Kellerabteile in Wien flächendeckend",
      "Inklusive Entsorgung",
      "Kombinierbar mit Wohnungsräumung",
    ],
    intro: [
      [
        {
          type: "text",
          value:
            "Bei der Kellerräumung in Wien befreien wir Kellerabteile, Abstellräume und Lagerkeller von Altlasten, Sperrmüll und jahrelang Gelagertem.",
        },
      ],
      [
        {
          type: "text",
          value:
            "Der Einsatz folgt denselben Qualitätsstandards wie unsere ",
        },
        { type: "internal", slug: "raeumung-wien", value: "Räumung Wien" },
        {
          type: "text",
          value:
            ": Besichtigung, Festpreis, fachgerechte Entsorgung und besenreine Übergabe.",
        },
      ],
    ],
    body: [
      [
        {
          type: "text",
          value:
            "Oft kombiniert mit ",
        },
        {
          type: "internal",
          slug: "dachbodenraeumung-wien",
          value: "Dachbodenräumung Wien",
        },
        {
          type: "text",
          value:
            " oder ",
        },
        {
          type: "internal",
          slug: "garagenraeumung-wien",
          value: "Garagenräumung Wien",
        },
        {
          type: "text",
          value:
            " – besonders vor Verkauf oder Rückgabe der Wohnung in Wien.",
        },
      ],
    ],
  },

  "garagenraeumung-wien": {
    slug: "garagenraeumung-wien",
    title: "Garagenräumung Wien",
    h1: "Garagenräumung Wien – Stellplatz, Garage & Schuppen",
    metaTitle: "Garagenräumung Wien schnell & sauber | SofortRäumung",
    metaDescription:
      "Garagenräumung Wien: Garagen, Stellplätze und Abstellräume räumen lassen inkl. Entsorgung. Festpreis für Wien & Umgebung.",
    shortDescription:
      "Räumung von Garagen, Stellplätzen und Abstellräumen in Wien.",
    serviceType: "Garagenräumung Wien",
    category: "Garagenräumung",
    hub: "wohnraum",
    isPillar: false,
    parentPillar: PILLAR,
    relatedSlugs: [
      "kellerraeumung-wien",
      "entruempelung-wien",
      "entsorgung-wien",
      "raeumung-wien",
    ],
    wertanrechnungLinks: null,
    showWhatsAppCta: false,
    highlights: [
      "Private & Tiefgaragen in Wien",
      "Inklusive Sperrmüllentsorgung",
      "Kurzfristig verfügbar",
      "Klarer Festpreis",
    ],
    intro: [
      [
        {
          type: "text",
          value:
            "Mit einer Garagenräumung in Wien schaffen wir Platz in Garagen, Stellplätzen und Schuppen – von Reifen über Altgeräte bis zu gelagertem Hausrat.",
        },
      ],
      [
        {
          type: "text",
          value:
            "Wie bei jeder ",
        },
        { type: "internal", slug: "raeumung-wien", value: "Räumung Wien" },
        {
          type: "text",
          value:
            " starten wir mit einer unverbindlichen Einschätzung und einem verbindlichen Festpreis.",
        },
      ],
    ],
    body: [
      [
        {
          type: "text",
          value:
            "Die Entsorgung erfolgt fachgerecht; bei Bedarf kombinieren wir den Einsatz mit einer ",
        },
        {
          type: "internal",
          slug: "kellerraeumung-wien",
          value: "Kellerräumung Wien",
        },
        { type: "text", value: "." },
      ],
    ],
  },

  "dachbodenraeumung-wien": {
    slug: "dachbodenraeumung-wien",
    title: "Dachbodenräumung Wien",
    h1: "Dachbodenräumung Wien – Estrich & enge Stiegenhäuser",
    metaTitle: "Dachbodenräumung Wien auch ohne Lift | SofortRäumung",
    metaDescription:
      "Dachbodenräumung Wien: Estrich und Dachböden räumen – auch in engen Stiegenhäusern. Professionell, diskret und zum Festpreis in Wien.",
    shortDescription:
      "Räumung von Dachböden und Estrich in Wien – auch bei engen Stiegenhäusern.",
    serviceType: "Dachbodenräumung Wien",
    category: "Dachbodenräumung",
    hub: "wohnraum",
    isPillar: false,
    parentPillar: PILLAR,
    relatedSlugs: [
      "kellerraeumung-wien",
      "entruempelung-wien",
      "haushaltsaufloesung-wien",
      "raeumung-wien",
    ],
    wertanrechnungLinks: ["antiquitaeten-wertanrechnung"],
    showWhatsAppCta: false,
    highlights: [
      "Erfahrung mit Altbau in Wien",
      "Schwierige Zugänge kein Problem",
      "Sortierung & Entsorgung",
      "Optional Wertanrechnung für Fundstücke",
    ],
    intro: [
      [
        {
          type: "text",
          value:
            "Eine Dachbodenräumung in Wien erfordert Planung: enge Stiegen, schwere Lasten und oft Jahrzehnte altes Lagergut. Wir bringen Team und Equipment passend zum Objekt.",
        },
      ],
      [
        {
          type: "text",
          value:
            "Der Auftrag läuft über dieselben Standards wie unsere ",
        },
        { type: "internal", slug: "raeumung-wien", value: "Räumung Wien" },
        {
          type: "text",
          value:
            " – inklusive Festpreis und besenreiner Übergabe.",
        },
      ],
    ],
    body: [
      [
        {
          type: "text",
          value:
            "Wertvolle Fundstücke können über die ",
        },
        {
          type: "internal",
          slug: "antiquitaeten-wertanrechnung",
          value: "Antiquitäten Wertanrechnung",
        },
        {
          type: "text",
          value:
            " angerechnet werden.",
        },
      ],
    ],
  },

  "firmen-bueroaufloesung-wien": {
    slug: "firmen-bueroaufloesung-wien",
    title: "Firmen- & Büroauflösung Wien",
    h1: "Firmen- & Büroauflösung Wien – Büro, Kanzlei & Geschäft",
    metaTitle: "Büroauflösung Wien gewerblich | SofortRäumung",
    metaDescription:
      "Firmen- & Büroauflösung Wien: Räumung von Büros, Kanzleien und Geschäftsräumen inkl. Demontage und Entsorgung. Diskret und termintreu in Wien.",
    shortDescription:
      "Professionelle Räumung von Büros, Geschäften und Gewerbeimmobilien in Wien.",
    serviceType: "Büroauflösung Wien",
    category: "Gewerberäumung",
    hub: "gewerbe",
    isPillar: false,
    parentPillar: PILLAR,
    relatedSlugs: [
      "lager-gewerbeparkraeumung",
      "gastro-retail-raeumung",
      "entsorgung-wien",
      "raeumung-wien",
    ],
    wertanrechnungLinks: null,
    showWhatsAppCta: false,
    highlights: [
      "Abend- & Wochenendfenster möglich",
      "Demontage von Büromöbeln",
      "Akten- & Datenträgerhinweise",
      "Festpreis für Wien-Projekte",
    ],
    intro: [
      [
        {
          type: "text",
          value:
            "Bei Firmen- und Büroauflösungen in Wien räumen wir Büros, Kanzleien und Geschäftsräume – koordiniert mit Ihren Fristen und möglichst ohne Betriebsstörung.",
        },
      ],
      [
        {
          type: "text",
          value:
            "Gewerbliche Projekte führen wir im Rahmen unserer ",
        },
        { type: "internal", slug: "raeumung-wien", value: "Räumung Wien" },
        {
          type: "text",
          value:
            " durch: klare Angebote, erfahrene Teams und fachgerechte Entsorgung.",
        },
      ],
    ],
    body: [
      [
        {
          type: "text",
          value:
            "Für Hallen und Lagerflächen siehe ",
        },
        {
          type: "internal",
          slug: "lager-gewerbeparkraeumung",
          value: "Lager- & Gewerbeparkräumung",
        },
        {
          type: "text",
          value:
            ", für Gastronomie und Retail die ",
        },
        {
          type: "internal",
          slug: "gastro-retail-raeumung",
          value: "Gastro & Retail Räumung",
        },
        { type: "text", value: "." },
      ],
    ],
  },

  "lager-gewerbeparkraeumung": {
    slug: "lager-gewerbeparkraeumung",
    title: "Lager- & Gewerbeparkräumung",
    h1: "Lager- & Gewerbeparkräumung Wien & Niederösterreich",
    metaTitle: "Lagerräumung Wien & NÖ | SofortRäumung",
    metaDescription:
      "Lager- & Gewerbeparkräumung: Hallen, Lager und Gewerbeparks in Wien und Niederösterreich räumen lassen. Festpreis und termintreue Abwicklung.",
    shortDescription:
      "Räumung von Lagern, Gewerbehallen und Gewerbeparks in Wien & NÖ.",
    serviceType: "Lagerräumung Wien",
    category: "Gewerberäumung",
    hub: "gewerbe",
    isPillar: false,
    parentPillar: PILLAR,
    relatedSlugs: [
      "firmen-bueroaufloesung-wien",
      "gastro-retail-raeumung",
      "entsorgung-wien",
      "raeumung-wien",
    ],
    wertanrechnungLinks: null,
    showWhatsAppCta: false,
    highlights: [
      "Große Volumina & Staplerlogistik",
      "Wien und Niederösterreich",
      "Gewerbepark-Erfahrung",
      "Dokumentierte Entsorgung",
    ],
    intro: [
      [
        {
          type: "text",
          value:
            "Lager- und Gewerbeparkräumungen in Wien und Niederösterreich erfordern Kapazität: Wir planen Personal, Fahrzeuge und Entsorgung passend zur Hallengröße.",
        },
      ],
      [
        {
          type: "text",
          value:
            "Als Spezialleistung unserer ",
        },
        { type: "internal", slug: "raeumung-wien", value: "Räumung Wien" },
        {
          type: "text",
          value:
            " liefern wir Festpreisangebote und eine zügige Räumung bis zur Übergabe.",
        },
      ],
    ],
    body: [
      [
        {
          type: "text",
          value:
            "Typische Objekte: Produktionslager, Logistikflächen und Einheiten in Gewerbeparks rund um Wien, Mödling, Schwechat und Wiener Neustadt.",
        },
      ],
    ],
  },

  "gastro-retail-raeumung": {
    slug: "gastro-retail-raeumung",
    title: "Gastro & Retail Räumung",
    h1: "Gastro & Retail Räumung Wien – Lokal, Shop & Gastronomie",
    metaTitle: "Gastro Räumung Wien & Retail | SofortRäumung",
    metaDescription:
      "Gastro & Retail Räumung Wien: Rückbau und Räumung von Restaurants, Cafés und Ladenlokalen. Schnell, diskret und zum Festpreis.",
    shortDescription:
      "Räumung von Gastronomiebetrieben, Läden und Einzelhandelsflächen in Wien.",
    serviceType: "Gastro Räumung Wien",
    category: "Gewerberäumung",
    hub: "gewerbe",
    isPillar: false,
    parentPillar: PILLAR,
    relatedSlugs: [
      "firmen-bueroaufloesung-wien",
      "lager-gewerbeparkraeumung",
      "entsorgung-wien",
      "raeumung-wien",
    ],
    wertanrechnungLinks: null,
    showWhatsAppCta: false,
    highlights: [
      "Küchen- & Ladenrückbau",
      "Terminabstimmung mit Vermieter",
      "Entsorgung von Inventar",
      "Einsätze in ganz Wien",
    ],
    intro: [
      [
        {
          type: "text",
          value:
            "Gastro- und Retail-Räumungen in Wien umfassen Inventar, Einbauten und oft zeitkritische Rückgaben an Vermieter oder Nachmieter.",
        },
      ],
      [
        {
          type: "text",
          value:
            "Wir integrieren den Auftrag in unsere ",
        },
        { type: "internal", slug: "raeumung-wien", value: "Räumung Wien" },
        {
          type: "text",
          value:
            "-Prozesse: Besichtigung, Festpreis, Demontage und fachgerechte Entsorgung.",
        },
      ],
    ],
    body: [
      [
        {
          type: "text",
          value:
            "Ob Café in der Innenstadt oder Shop in einem Wiener Einkaufsstraßen-Umfeld – wir arbeiten diskret und termintreu.",
        },
      ],
    ],
  },

  "verlassenschaften-nachlassraeumung": {
    slug: "verlassenschaften-nachlassraeumung",
    title: "Verlassenschaften & Nachlassräumung",
    h1: "Verlassenschaften & Nachlassräumung Wien – diskret",
    metaTitle: "Verlassenschaftsräumung Wien diskret | SofortRäumung",
    metaDescription:
      "Verlassenschaften & Nachlassräumung Wien: einfühlsam, diskret und mit Wertanrechnung. Abstimmung mit Erben und Notariat möglich.",
    shortDescription:
      "Diskrete Abwicklung von Nachlassräumungen und Erbschaftsauflösungen in Wien.",
    serviceType: "Verlassenschaftsräumung Wien",
    category: "Nachlassräumung",
    hub: "spezial",
    isPillar: false,
    parentPillar: PILLAR,
    relatedSlugs: [
      "haushaltsaufloesung-wien",
      "wohnungsaufloesung-wien",
      "antiquitaeten-wertanrechnung",
      "raeumung-wien",
    ],
    wertanrechnungLinks: ["antiquitaeten-wertanrechnung", "moebel-wertanrechnung"],
    showWhatsAppCta: false,
    highlights: [
      "Maximale Diskretion in Wien",
      "Einfühlsamer Umgang mit Erben",
      "Wertanrechnung für Nachlass",
      "Dokumentation auf Wunsch",
    ],
    intro: [
      [
        {
          type: "text",
          value:
            "Verlassenschaften und Nachlassräumungen in Wien erfordern Feingefühl: Wir arbeiten diskret, respektvoll und zuverlässig – für Erben, Sachwalter und Hausverwaltungen.",
        },
      ],
      [
        {
          type: "text",
          value:
            "Organisatorisch läuft der Einsatz über unsere bewährte ",
        },
        { type: "internal", slug: "raeumung-wien", value: "Räumung Wien" },
        {
          type: "text",
          value:
            " mit Festpreis nach Besichtigung und klarer Kommunikation.",
        },
      ],
    ],
    body: [
      [
        {
          type: "text",
          value:
            "Wertgegenstände aus dem Nachlass können über die ",
        },
        {
          type: "internal",
          slug: "antiquitaeten-wertanrechnung",
          value: "Antiquitäten Wertanrechnung",
        },
        {
          type: "text",
          value:
            " fair berücksichtigt werden.",
        },
      ],
    ],
  },

  "messie-entruempelung-wien": {
    slug: "messie-entruempelung-wien",
    title: "Messie-Entrümpelung Wien",
    h1: "Messie-Entrümpelung Wien – diskret & professionell",
    metaTitle: "Messie-Entrümpelung Wien diskret | SofortRäumung",
    metaDescription:
      "Messie-Entrümpelung Wien mit geschulten Teams: diskret, respektvoll und gründlich. Sanierungsvorbereitung und Festpreis nach Besichtigung.",
    shortDescription:
      "Messie-Entrümpelungen in Wien mit diskreten Teams und vertraulichem Umgang.",
    serviceType: "Messie Räumung Wien",
    category: "Spezialräumung",
    hub: "spezial",
    isPillar: false,
    parentPillar: PILLAR,
    relatedSlugs: [
      "entruempelung-wien",
      "wohnungsaufloesung-wien",
      "entsorgung-wien",
      "raeumung-wien",
    ],
    wertanrechnungLinks: ["moebel-wertanrechnung"],
    showWhatsAppCta: false,
    highlights: [
      "100 % Diskretion",
      "Geschulte Spezialteams",
      "Schutzausrüstung & Hygiene",
      "Vorbereitung für Sanierung",
    ],
    intro: [
      [
        {
          type: "text",
          value:
            "Messie-Entrümpelung in Wien erfordert Erfahrung, Diskretion und die richtige Ausrüstung. Unsere Teams arbeiten respektvoll und ohne Aufsehen.",
        },
      ],
      [
        {
          type: "text",
          value:
            "Der Auftrag wird wie jede ",
        },
        { type: "internal", slug: "raeumung-wien", value: "Räumung Wien" },
        {
          type: "text",
          value:
            " transparent kalkuliert – mit Festpreis nach einer diskreten Vor-Ort-Besichtigung in Wien.",
        },
      ],
    ],
    body: [
      [
        {
          type: "text",
          value:
            "Anschließend können Reinigung und Sanierung vorbereitet werden. Ergänzend bieten wir die klassische ",
        },
        {
          type: "internal",
          slug: "entruempelung-wien",
          value: "Entrümpelung Wien",
        },
        { type: "text", value: " an." },
      ],
    ],
  },

  ankauf: {
    slug: "ankauf",
    title: "Ankauf",
    h1: "Ankauf Wien – Gold, Silber, Antiquitäten per WhatsApp",
    metaTitle: "Ankauf Wien Gold Silber Antiquitäten | SofortRäumung",
    metaDescription:
      "Ankauf Wien: wertvolle alte Gegenstände, Gold, Silber und Antiquitäten – Ankauf ausschließlich per WhatsApp. Schnell, diskret und unkompliziert.",
    shortDescription:
      "Ankauf von Wertgegenständen, Gold, Silber und Antiquitäten in Wien per WhatsApp.",
    serviceType: "Altwaren Ankauf Wien",
    category: "Ankauf",
    hub: "wert",
    isPillar: false,
    parentPillar: PILLAR,
    relatedSlugs: [
      "antiquitaeten-wertanrechnung",
      "moebel-wertanrechnung",
      "entruempelung-wien",
      "verlassenschaften-nachlassraeumung",
    ],
    wertanrechnungLinks: null,
    showWhatsAppCta: true,
    highlights: [
      "Ausschließlich per WhatsApp",
      "Gold, Silber, Schmuck, Antiquitäten",
      "Schnelle Rückmeldung",
      "Diskret in Wien",
    ],
    intro: [
      [
        {
          type: "text",
          value:
            "Beim Ankauf in Wien übernehmen wir wertvolle alte Gegenstände, Gold, Silber und Antiquitäten – unkompliziert und diskret.",
        },
      ],
      [
        {
          type: "text",
          value:
            "Wichtig: Der Ankauf läuft ausschließlich über WhatsApp. Für eine Räumung oder Entrümpelung nutzen Sie weiterhin unsere ",
        },
        { type: "internal", slug: "raeumung-wien", value: "Räumung Wien" },
        {
          type: "text",
          value:
            "; Wertausgleich im Räumungskontext finden Sie unter Wertanrechnung.",
        },
      ],
    ],
    body: [
      [
        {
          type: "text",
          value:
            "Senden Sie aussagekräftige Fotos und eine kurze Beschreibung an WhatsApp. Wir melden uns rasch mit einer Einschätzung für Wien und Umgebung.",
        },
      ],
      [
        {
          type: "text",
          value:
            "Wenn Gegenstände im Rahmen einer Entrümpelung angerechnet werden sollen, nutzen Sie die ",
        },
        {
          type: "internal",
          slug: "antiquitaeten-wertanrechnung",
          value: "Antiquitäten Wertanrechnung",
        },
        { type: "text", value: "." },
      ],
    ],
  },

  "antiquitaeten-wertanrechnung": {
    slug: "antiquitaeten-wertanrechnung",
    title: "Antiquitäten Wertanrechnung",
    h1: "Antiquitäten Wertanrechnung Wien – Kosten senken",
    metaTitle: "Antiquitäten Wertanrechnung Wien | SofortRäumung",
    metaDescription:
      "Antiquitäten Wertanrechnung Wien: faire Anrechnung von Altwaren, Sammlungen und Kuriosa auf Ihre Räumungs- oder Entrümpelungskosten.",
    shortDescription:
      "Wertanrechnung für Antiquitäten und Kuriosa in Verbindung mit Räumung in Wien.",
    serviceType: "Wertanrechnung Wien",
    category: "Wertausgleich",
    hub: "wert",
    isPillar: false,
    parentPillar: PILLAR,
    relatedSlugs: [
      "moebel-wertanrechnung",
      "ankauf",
      "entruempelung-wien",
      "verlassenschaften-nachlassraeumung",
      "raeumung-wien",
    ],
    wertanrechnungLinks: null,
    showWhatsAppCta: false,
    highlights: [
      "Nur in Verbindung mit Räumung/Entrümpelung",
      "Transparente Gegenrechnung",
      "Ideal bei Nachlass in Wien",
      "Festpreis wird entsprechend angepasst",
    ],
    intro: [
      [
        {
          type: "text",
          value:
            "Mit der Antiquitäten Wertanrechnung in Wien können Altwaren, Sammlungen und Kuriosa die Kosten Ihrer Entrümpelung oder Räumung reduzieren.",
        },
      ],
      [
        {
          type: "text",
          value:
            "Die Anrechnung erfolgt ausschließlich in Verbindung mit einer ",
        },
        { type: "internal", slug: "raeumung-wien", value: "Räumung Wien" },
        {
          type: "text",
          value:
            " bzw. Entrümpelung – nicht als isolierter Ankauf ohne Auftrag.",
        },
      ],
    ],
    body: [
      [
        {
          type: "text",
          value:
            "Für Möbelstücke nutzen Sie die ",
        },
        {
          type: "internal",
          slug: "moebel-wertanrechnung",
          value: "Möbel Wertanrechnung",
        },
        {
          type: "text",
          value:
            ". Für direkten Ankauf ohne Räumung siehe ",
        },
        { type: "internal", slug: "ankauf", value: "Ankauf" },
        { type: "text", value: " (WhatsApp)." },
      ],
    ],
  },

  "moebel-wertanrechnung": {
    slug: "moebel-wertanrechnung",
    title: "Möbel Wertanrechnung",
    h1: "Möbel Wertanrechnung Wien – Festpreis reduzieren",
    metaTitle: "Möbel Wertanrechnung Wien | SofortRäumung",
    metaDescription:
      "Möbel Wertanrechnung Wien: gut erhaltene Möbel auf Räumungs- oder Entrümpelungskosten anrechnen lassen. Fair, transparent und nur mit Auftrag.",
    shortDescription:
      "Wertanrechnung für Möbel in Verbindung mit Entrümpelung oder Räumung in Wien.",
    serviceType: "Möbel Wertanrechnung Wien",
    category: "Wertausgleich",
    hub: "wert",
    isPillar: false,
    parentPillar: PILLAR,
    relatedSlugs: [
      "antiquitaeten-wertanrechnung",
      "wohnungsaufloesung-wien",
      "entruempelung-wien",
      "haushaltsaufloesung-wien",
      "raeumung-wien",
    ],
    wertanrechnungLinks: null,
    showWhatsAppCta: false,
    highlights: [
      "Gegenrechnung auf den Festpreis",
      "Nur mit Räumungs-/Entrümpelungsauftrag",
      "Bewertung bei Besichtigung in Wien",
      "Ideal bei Wohnungsauflösung",
    ],
    intro: [
      [
        {
          type: "text",
          value:
            "Die Möbel Wertanrechnung in Wien ermöglicht es, gut erhaltene Möbelstücke bei Ihrer Entrümpelung oder Wohnungsauflösung fair gegenzurechnen.",
        },
      ],
      [
        {
          type: "text",
          value:
            "Voraussetzung ist immer ein Räumungs- oder Entrümpelungsauftrag – typischerweise im Rahmen unserer ",
        },
        { type: "internal", slug: "raeumung-wien", value: "Räumung Wien" },
        { type: "text", value: "." },
      ],
    ],
    body: [
      [
        {
          type: "text",
          value:
            "Antiquitäten und Kuriosa behandeln wir über die ",
        },
        {
          type: "internal",
          slug: "antiquitaeten-wertanrechnung",
          value: "Antiquitäten Wertanrechnung",
        },
        { type: "text", value: "." },
      ],
    ],
  },
};

export function getServiceBySlug(slug: string): ServicePageConfig | undefined {
  if (!SERVICE_SLUGS.includes(slug as ServiceSlug)) {
    return undefined;
  }
  return SERVICES[slug as ServiceSlug];
}

export function getAllServiceSlugs(): ServiceSlug[] {
  return [...SERVICE_SLUGS];
}

export function getRelatedServices(
  slug: ServiceSlug
): ServicePageConfig[] {
  return SERVICES[slug].relatedSlugs.map((related) => SERVICES[related]);
}

export function getServiceUrl(slug: ServiceSlug): string {
  return `${SITE.domain}/${slug}`;
}

export function getServicePath(slug: ServiceSlug): string {
  return `/${slug}`;
}

/** Flat list for nav / footer / listings */
export const SERVICE_LIST: ServicePageConfig[] = SERVICE_SLUGS.map(
  (slug) => SERVICES[slug]
);
