import type { ServiceSlug } from "@/config/services";
import type { ServiceExtendedContent } from "@/types/service-content";

const DEFAULT_DISCLAIMER =
  "Richtwerte ab — verbindlicher Festpreis nach kostenloser Besichtigung in Wien. Keine versteckten Nachschläge bei gleichbleibendem Umfang.";

const RATGEBER_BY_SERVICE: Partial<Record<ServiceSlug, string[]>> = {
  "raeumung-wien": ["entruempelung-kosten-wien", "checkliste-wohnungsaufloesung-wien"],
  "entruempelung-wien": ["entruempelung-kosten-wien", "entruempelung-neubau-1070"],
  "wohnungsaufloesung-wien": ["checkliste-wohnungsaufloesung-wien", "besenreine-uebergabe-wiener-wohnen"],
  "haushaltsaufloesung-wien": ["checkliste-wohnungsaufloesung-wien", "entruempelung-kosten-wien"],
  "verlassenschaften-nachlassraeumung": ["verlassenschaft-raeumen-wien", "besenreine-uebergabe-wiener-wohnen"],
  "messie-entruempelung-wien": ["gemeindebau-vollgestellte-wohnung-entruempeln-wien", "entruempelung-kosten-wien"],
  "kellerraeumung-wien": ["checkliste-wohnungsaufloesung-wien", "entruempelung-kosten-wien"],
};

function defaultInternalLinks(slug: ServiceSlug, label: string) {
  return {
    type: "links" as const,
    title: "Weitere Informationen & Leistungen",
    links: [
      { href: "/raeumung-wien", label: "Räumung Wien ab €150" },
      { href: "/entruempelung-wien", label: "Entrümpelung Wien" },
      { href: "/ratgeber/entruempelung-kosten-wien", label: "Was kostet Entrümpelung?" },
      ...(slug !== "wohnungsaufloesung-wien"
        ? [{ href: "/wohnungsaufloesung-wien", label: "Wohnungsauflösung Wien" }]
        : [{ href: "/haushaltsaufloesung-wien", label: "Haushaltsauflösung Wien" }]),
      { href: "/ratgeber", label: `Ratgeber: ${label}` },
    ],
  };
}

const EXTENDED: Partial<Record<ServiceSlug, ServiceExtendedContent>> = {
  "raeumung-wien": {
    blocks: [
      {
        type: "section",
        heading: "Räumung Wien — Festpreis ab €150",
        paragraphs: [
          "Ob Ein-Zimmer-Wohnung in Favoriten, Altbau in Währing oder Gewerbe in Simmering: Jede Räumung in Wien beginnt mit einer kostenlosen Besichtigung. Erst wenn Volumen, Zugang und Endzustand klar sind, erhalten Sie unseren verbindlichen Festpreis — schriftlich, ohne versteckte Nachschläge.",
          "Als Mesut Duman e.U. mit Sitz in Liesing (1230) sind wir täglich in allen 23 Bezirken im Einsatz. Enge Stiegenhäuser, fehlende Ladezonen und kurzfristige Übergabefristen gehören zu unserem Alltag — nicht zu Ihrem Stress.",
        ],
      },
      {
        type: "pricing",
        data: {
          title: "Richtwerte Räumung Wien (ab, nach Besichtigung)",
          disclaimer: DEFAULT_DISCLAIMER,
          rows: [
            { label: "Einzelnes Zimmer / Abstellraum", abPrice: "ab €150", includes: "Sortierung, Abtransport, Entsorgung MA 48" },
            { label: "Garage / kleines Kellerabteil", abPrice: "ab €180", includes: "Demontage, Abtransport, Entsorgung" },
            { label: "1-Zimmer-Wohnung besenrein", abPrice: "ab €350", includes: "Komplett, Demontage, besenreine Übergabe" },
            { label: "2-Zimmer inkl. Keller", abPrice: "ab €550", includes: "Wohnung + Keller, Festpreis nach Besichtigung" },
            { label: "3-Zimmer Haushaltsauflösung", abPrice: "ab €750", includes: "Alle Räume, Nebenflächen optional" },
            { label: "Verlassenschaft / Nachlass", abPrice: "individuell", includes: "Diskret, Wertanrechnung, Protokoll" },
          ],
        },
      },
      {
        type: "steps",
        title: "So läuft Ihre Räumung in Wien ab",
        steps: [
          "Anfrage per Telefon, WhatsApp oder Formular — Fotos helfen",
          "Kostenlose Besichtigung vor Ort in Wien",
          "Schriftlicher Festpreis mit Leistungsumfang",
          "Terminvereinbarung — oft innerhalb weniger Tage",
          "Räumung, Entsorgung, optional besenreine Übergabe mit Protokoll",
        ],
      },
      {
        type: "caseStudy",
        data: {
          title: "Komplett-Räumung Meidling — ein Tag, ein Festpreis",
          location: "1120 Wien",
          text: "2-Zimmer-Wohnung plus Keller, dritter Stock ohne Lift: Besichtigung mit Trageweg-Planung, Wertanrechnung für zwei Schränke, Räumung an einem Tag, besenreine Übergabe an Hausverwaltung. Festpreis €680 — ohne Nachschlag.",
        },
      },
      {
        type: "hint",
        title: "Warum Festpreis statt Stundenlohn?",
        text: "Stundenlohn belohnt langsame Abläufe — Sie zahlen für Unsicherheit. Unser Festpreis nach Besichtigung bindet Umfang, Endzustand und Leistungen schriftlich. Mehr dazu im Ratgeber [Was kostet eine Entrümpelung in Wien?](/ratgeber/entruempelung-kosten-wien).",
      },
      defaultInternalLinks("raeumung-wien", "Räumung"),
    ],
    relatedRatgeberSlugs: ["entruempelung-kosten-wien", "checkliste-wohnungsaufloesung-wien"],
    faq: [
      {
        question: "Was kostet eine Räumung in Wien?",
        answer: "Einzelne Räume ab ca. €150, 1-Zimmer-Wohnungen ab ca. €350 — immer nach Besichtigung verbindlich als Festpreis. Größere Objekte und Sonderfälle individuell.",
      },
      {
        question: "Arbeiten Sie in allen Wiener Bezirken?",
        answer: "Ja — alle 23 Bezirke plus Niederösterreich (Mödling, Baden, Schwechat u. a.). Sitz in 1230 Wien (Liesing).",
      },
      {
        question: "Ist Entsorgung im Preis enthalten?",
        answer: "Ja. Demontage, Abtransport und fachgerechte Entsorgung über die MA 48 gehören zum Standard — Sie fahren nicht selbst zum Mistplatz.",
      },
      {
        question: "Wie schnell bekomme ich einen Termin?",
        answer: "Besichtigung oft innerhalb 24–48 Stunden. Räumung nach Absprache — Express-Einsätze bei Übergabefristen möglich.",
      },
    ],
  },
  "entruempelung-wien": {
    blocks: [
      {
        type: "section",
        heading: "Entrümpelung Wien — diskret & zum Festpreis",
        paragraphs: [
          "Entrümpelung in Wien bedeutet mehr als Kartons wegräumen: Sortieren, Demontieren, Schutz von Treppenhaus und Lift, fachgerechte Trennung für die MA 48 — und auf Wunsch [besenreine Übergabe](/ratgeber/besenreine-uebergabe-wiener-wohnen) an Vermieter oder Wiener Wohnen.",
          "Vom vollgestellten Keller in Donaustadt bis zur [Wohnungsauflösung](/wohnungsaufloesung-wien) im Altbau ohne Lift in [Neubau (1070)](/ratgeber/entruempelung-neubau-1070): Wir planen Teamgröße, Ladephasen und Halteverbote (MA 46) vor dem Einsatztag.",
        ],
      },
      {
        type: "pricing",
        data: {
          title: "Richtwerte Entrümpelung Wien",
          disclaimer: DEFAULT_DISCLAIMER,
          rows: [
            { label: "Keller / Abstellraum", abPrice: "ab €180", includes: "Sortierung, Abtransport, Entsorgung" },
            { label: "Dachboden", abPrice: "ab €220", includes: "Trageweg, Demontage, MA 48" },
            { label: "1-Zimmer entrümpeln", abPrice: "ab €350", includes: "Komplett, besenrein optional" },
            { label: "2-Zimmer + Keller", abPrice: "ab €550", includes: "Wohnung und Nebenflächen" },
            { label: "Messie / stark überfüllt", abPrice: "individuell", includes: "Sortierzeit, Hygieneplan, PPE" },
          ],
        },
      },
      {
        type: "caseStudy",
        data: {
          title: "Kellerentrümpelung Hernals — 40 m² Lagergut",
          location: "1170 Wien",
          text: "Vollgestellter Kellerraum in Gründerzeithaus: Zwei Personen, ein Tag, Trennung Holz/Metall/Elektro, Festpreis nach Besichtigung €420. Kein Lift — Trageweg über Innenhof geplant.",
        },
      },
      defaultInternalLinks("entruempelung-wien", "Entrümpelung"),
    ],
    relatedRatgeberSlugs: ["entruempelung-kosten-wien", "entruempelung-neubau-1070"],
    faq: [
      {
        question: "Was ist der Unterschied zwischen Räumung und Entrümpelung?",
        answer: "Umgangssprachlich oft gleichbedeutend. Bei uns umfasst Entrümpelung Sortierung, Demontage, Abtransport und Entsorgung — optional besenrein.",
      },
      {
        question: "Entrümpeln Sie auch Gemeindebauten?",
        answer: "Ja — diskret, mit Logistikplan für enge Stiegenhäuser und Wiener-Wohnen-Übergabe.",
      },
      {
        question: "Kann ich Wertanrechnung nutzen?",
        answer: "Ja — verwertbare Möbel und Geräte werden fair bewertet und vom Festpreis abgezogen.",
      },
    ],
  },
  "wohnungsaufloesung-wien": {
    blocks: [
      {
        type: "section",
        heading: "Wohnungsauflösung Wien — komplett & übergabefähig",
        paragraphs: [
          "Kündigung, Umzug ins Ausland oder Eigentümerwechsel: Eine Wohnungsauflösung in Wien erfordert Planung — Keller, Dachboden, [besenreine Übergabe](/ratgeber/besenreine-uebergabe-wiener-wohnen) und oft enge Fristen bei der Hausverwaltung.",
          "Unsere [Checkliste Wohnungsauflösung](/ratgeber/checkliste-wohnungsaufloesung-wien) hilft bei der Planung. Festpreis nach kostenloser Besichtigung — in allen Bezirken.",
        ],
      },
      {
        type: "pricing",
        data: {
          title: "Richtwerte Wohnungsauflösung Wien",
          disclaimer: DEFAULT_DISCLAIMER,
          rows: [
            { label: "1-Zimmer besenrein", abPrice: "ab €350", includes: "Leerung, Entsorgung, Grobreinigung" },
            { label: "2-Zimmer + Keller", abPrice: "ab €550", includes: "Wohnung + Keller, Festpreis" },
            { label: "3-Zimmer komplett", abPrice: "ab €750", includes: "Inkl. Nebenflächen nach Besichtigung" },
            { label: "Mit Dachboden/Garage", abPrice: "individuell", includes: "Gesamtumfang schriftlich fixiert" },
          ],
        },
      },
      {
        type: "steps",
        title: "Ablauf Wohnungsauflösung",
        steps: [
          "Anfrage mit Fotos, Stockwerk, Übergabetermin",
          "Besichtigung und Festpreis schriftlich",
          "Wertanrechnung für brauchbare Möbel prüfen",
          "Räumung und besenreine Übergabe",
          "Protokoll und Fotos auf Wunsch",
        ],
      },
      defaultInternalLinks("wohnungsaufloesung-wien", "Wohnungsauflösung"),
    ],
    relatedRatgeberSlugs: ["checkliste-wohnungsaufloesung-wien", "besenreine-uebergabe-wiener-wohnen"],
    faq: [
      {
        question: "Muss die Wohnung besenrein übergeben werden?",
        answer: "In den meisten Mietverträgen und bei Wiener Wohnen ja. Wir bieten besenreine Übergabe im Festpreis an.",
      },
      {
        question: "Was passiert mit dem Keller?",
        answer: "Kellerabteile räumen wir im selben Auftrag mit — wichtig für einen Festpreis, der hält.",
      },
    ],
  },
  "verlassenschaften-nachlassraeumung": {
    blocks: [
      {
        type: "section",
        heading: "Verlassenschaft & Nachlass — einfühlsam in Wien",
        paragraphs: [
          "Nachlassräumungen erfordern Diskretion, Geduld und klare Abstimmung mit Angehörigen. Mehr im Ratgeber [Verlassenschaft räumen in Wien](/ratgeber/verlassenschaft-raeumen-wien).",
          "Besichtigung vor Ort oder per Video — Festpreis schriftlich, [besenreine Übergabe](/ratgeber/besenreine-uebergabe-wiener-wohnen) mit Protokoll auf Wunsch.",
        ],
      },
      {
        type: "pricing",
        data: {
          title: "Richtwerte Nachlassräumung Wien",
          disclaimer: DEFAULT_DISCLAIMER,
          rows: [
            { label: "Einzelwohnung", abPrice: "ab €450", includes: "Diskret, Wertanrechnung möglich" },
            { label: "Wohnung + Keller", abPrice: "ab €650", includes: "Komplett, besenrein optional" },
            { label: "Einfamilienhaus", abPrice: "individuell", includes: "Garage, Dachboden, Garten" },
          ],
        },
      },
      {
        type: "caseStudy",
        data: {
          title: "Nachlass Währing — Erben im Ausland",
          location: "1180 Wien",
          text: "Video-Besichtigung, Wertanrechnung für Antiquitäten, diskrete Räumung an einem Tag, besenreine Übergabe an Verwaltung. Festpreis mit €400 Wertanrechnung.",
        },
      },
      defaultInternalLinks("verlassenschaften-nachlassraeumung", "Verlassenschaft"),
    ],
    relatedRatgeberSlugs: ["verlassenschaft-raeumen-wien", "besenreine-uebergabe-wiener-wohnen"],
    faq: [
      {
        question: "Wie diskret arbeiten Sie?",
        answer: "Neutrales Auftreten, getaktete Ladephasen, geschütztes Treppenhaus — Nachbarn erfahren nichts über die persönliche Situation.",
      },
      {
        question: "Müssen alle Erben anwesend sein?",
        answer: "Nein — eine bevollmächtigte Ansprechperson mit schriftlicher Freigabe reicht.",
      },
    ],
  },
  "messie-entruempelung-wien": {
    blocks: [
      {
        type: "section",
        heading: "Messie-Entrümpelung Wien — ohne Vorurteile",
        paragraphs: [
          "Stark überfüllte Wohnungen brauchen Sortierzeit, Hygieneplan und oft persönliche Schutzausrüstung. Siehe auch [Gemeindewohnung entrümpeln](/ratgeber/gemeindebau-vollgestellte-wohnung-entruempeln-wien).",
          "Sortierung, Dokumentensicherung und schrittweises Freiräumen gehören in den Festpreis — nicht als Überraschung am zweiten Tag.",
        ],
      },
      {
        type: "pricing",
        data: {
          title: "Richtwerte Messie-Entrümpelung",
          disclaimer: "Individuelle Kalkulation nach Besichtigung — Sortieraufwand und Hygiene sind Hauptfaktoren.",
          rows: [
            { label: "Moderate Überfüllung", abPrice: "ab €650", includes: "Sortierung, PPE, Entsorgung" },
            { label: "Starke Überfüllung", abPrice: "individuell", includes: "Mehrtägig möglich, Festpreis schriftlich" },
            { label: "Mit Wertanrechnung", abPrice: "nach Abschlag", includes: "Verwertbares mindert Endpreis" },
          ],
        },
      },
      defaultInternalLinks("messie-entruempelung-wien", "Messie-Entrümpelung"),
    ],
    relatedRatgeberSlugs: ["gemeindebau-vollgestellte-wohnung-entruempeln-wien", "entruempelung-kosten-wien"],
    faq: [
      {
        question: "Arbeiten Sie diskret?",
        answer: "Ja — neutrales Team, keine Labels, getaktete Ladephasen. Diskretion ist Standard.",
      },
      {
        question: "Brauchen Sie spezielle Ausrüstung?",
        answer: "Bei Bedarf ja — PPE, Sortierlogik und Hygieneplan werden bei der Besichtigung eingeplant.",
      },
    ],
  },
  "kellerraeumung-wien": {
    blocks: [
      {
        type: "section",
        heading: "Kellerräumung Wien — schnell & fachgerecht",
        paragraphs: [
          "Kellerabteile in Wien sind oft jahrzehntelang befüllt — Möbel, Farbeimer, alte Reifen, Elektrogeräte. Ideal kombiniert mit [Wohnungsauflösung](/wohnungsaufloesung-wien) oder [Haushaltsauflösung](/haushaltsaufloesung-wien) im selben Festpreis.",
        ],
      },
      {
        type: "pricing",
        data: {
          title: "Richtwerte Kellerräumung Wien",
          disclaimer: DEFAULT_DISCLAIMER,
          rows: [
            { label: "Kleines Kellerabteil", abPrice: "ab €180", includes: "Sortierung, Abtransport, Entsorgung" },
            { label: "Mittlerer Kellerraum", abPrice: "ab €280", includes: "Demontage, MA 48" },
            { label: "Großer / geteilter Keller", abPrice: "ab €450", includes: "Individuell nach Besichtigung" },
          ],
        },
      },
      defaultInternalLinks("kellerraeumung-wien", "Kellerräumung"),
    ],
    relatedRatgeberSlugs: ["checkliste-wohnungsaufloesung-wien", "entruempelung-kosten-wien"],
    faq: [
      {
        question: "Räumen Sie nur den Keller?",
        answer: "Ja — oder kombiniert mit Wohnungsauflösung im Festpreis.",
      },
    ],
  },
};

function buildDefaultExtended(slug: ServiceSlug, label: string): ServiceExtendedContent {
  return {
    blocks: [
      {
        type: "section",
        heading: `${label} in Wien — Festpreis nach Besichtigung`,
        paragraphs: [
          `${label} in Wien und Niederösterreich: kostenlose Besichtigung, schriftlicher Festpreis, Demontage, Abtransport und fachgerechte Entsorgung über die MA 48. Auf Wunsch [besenreine Übergabe](/ratgeber/besenreine-uebergabe-wiener-wohnen) mit Protokoll.`,
          `Mehr zu Kosten und Ablauf: [Was kostet eine Entrümpelung in Wien?](/ratgeber/entruempelung-kosten-wien) und [Räumung Wien ab €150](/raeumung-wien).`,
        ],
      },
      {
        type: "pricing",
        data: {
          title: `Richtwerte ${label} Wien`,
          disclaimer: DEFAULT_DISCLAIMER,
          rows: [
            { label: "Kleinauftrag / Einzelraum", abPrice: "ab €150", includes: "Sortierung, Abtransport, Entsorgung" },
            { label: "Standardauftrag", abPrice: "ab €350", includes: "Nach Besichtigung verbindlich" },
            { label: "Komplettauftrag", abPrice: "individuell", includes: "Festpreis schriftlich fixiert" },
          ],
        },
      },
      {
        type: "steps",
        title: "Ablauf",
        steps: [
          "Anfrage mit Fotos und Objektbeschreibung",
          "Kostenlose Besichtigung in Wien",
          "Festpreis schriftlich",
          "Termin und Durchführung",
          "Optional besenreine Übergabe",
        ],
      },
      defaultInternalLinks(slug, label),
    ],
    relatedRatgeberSlugs: RATGEBER_BY_SERVICE[slug] ?? [
      "entruempelung-kosten-wien",
      "checkliste-wohnungsaufloesung-wien",
    ],
    faq: [
      {
        question: `Was kostet ${label} in Wien?`,
        answer: "Ab ca. €150 für kleine Aufträge — verbindlich nach kostenloser Besichtigung als Festpreis.",
      },
      {
        question: "Ist Entsorgung enthalten?",
        answer: "Ja — fachgerechte Trennung und Abgabe über die MA 48 gehört zum Leistungsumfang.",
      },
      {
        question: "Wie schnell ist ein Termin möglich?",
        answer: "Besichtigung oft innerhalb 24–48 Stunden, Räumung nach Absprache — Express möglich.",
      },
    ],
  };
}

const LABELS: Record<ServiceSlug, string> = {
  "raeumung-wien": "Räumung",
  "entruempelung-wien": "Entrümpelung",
  "entsorgung-wien": "Entsorgung",
  "haushaltsaufloesung-wien": "Haushaltsauflösung",
  "haushaltsaufloesung-ueberblick": "Haushaltsauflösung",
  "wohnungsaufloesung-wien": "Wohnungsauflösung",
  "zimmer-raeumung-wien": "Zimmer-Räumung",
  "kellerraeumung-wien": "Kellerräumung",
  "garagenraeumung-wien": "Garagenräumung",
  "dachbodenraeumung-wien": "Dachbodenräumung",
  "firmen-bueroaufloesung-wien": "Büroauflösung",
  "lager-gewerbeparkraeumung": "Lagerräumung",
  "gastro-retail-raeumung": "Gastro- & Retail-Räumung",
  "verlassenschaften-nachlassraeumung": "Verlassenschaftsräumung",
  "messie-entruempelung-wien": "Messie-Entrümpelung",
  ankauf: "Ankauf mit Räumung",
  "antiquitaeten-wertanrechnung": "Antiquitäten-Wertanrechnung",
  "moebel-wertanrechnung": "Möbel-Wertanrechnung",
};

export function getServiceExtendedContent(slug: ServiceSlug): ServiceExtendedContent {
  return EXTENDED[slug] ?? buildDefaultExtended(slug, LABELS[slug]);
}
