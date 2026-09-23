import {
  Building2,
  Clock,
  Eye,
  Facebook,
  FileText,
  Home,
  Instagram,
  Leaf,
  ListChecks,
  Lock,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  Tag,
  Truck,
  Users,
  Warehouse,
  Youtube,
} from "lucide-react";
import type {
  BenefitItem,
  ContactInfoItem,
  FaqItem,
  FooterLink,
  NavLink,
  ProcessStep,
  RegionFeature,
  ServiceItem,
  ServiceOption,
  SocialLink,
  TrustItem,
} from "@/types";

export const NAV_LINKS: NavLink[] = [
  { label: "Leistungen", href: "/leistungen", hasDropdown: true },
  { label: "Preise", href: "/preise" },
  { label: "So funktioniert's", href: "/#prozess" },
  { label: "Referenzen", href: "/referenzen" },
  { label: "Ratgeber", href: "/ratgeber" },
  { label: "FAQ", href: "/#faq" },
  { label: "Kontakt", href: "/#kontakt" },
];

export const TRUST_ITEMS: TrustItem[] = [
  {
    id: "google",
    title: "5,0 aus 150+ Bewertungen",
    subtitle: "Google",
    icon: ShieldCheck,
  },
  {
    id: "247",
    title: "24/7 erreichbar",
    subtitle: "Auch kurzfristig",
    icon: Clock,
  },
  {
    id: "besichtigung",
    title: "Besichtigung",
    subtitle: "Kostenlos & unverbindlich",
    icon: Eye,
  },
  {
    id: "fixpreis",
    title: "Fixpreis-Garantie",
    subtitle: "Keine versteckten Kosten",
    icon: ShieldCheck,
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    id: 1,
    title: "Chaos erkennen",
    description:
      "Kostenlose Besichtigung vor Ort – wir erfassen den Umfang diskret und klar.",
    icon: Eye,
  },
  {
    id: 2,
    title: "Plan erstellen",
    description:
      "Transparenter Fixpreis, Termin und Ablauf – alles schriftlich und verbindlich.",
    icon: ListChecks,
  },
  {
    id: 3,
    title: "Wir räumen",
    description:
      "Professionelles Team, passende Fahrzeuge und zügige Durchführung.",
    icon: Truck,
  },
  {
    id: 4,
    title: "Besenrein übergeben",
    description:
      "Saubere Übergabe, Entsorgung & Dokumentation – fertig für den nächsten Schritt.",
    icon: Sparkles,
  },
];

export const SERVICES: ServiceItem[] = [
  {
    id: "wohnung",
    title: "Wohnungsauflösung Wien",
    description:
      "Komplette Wohnungsräumung inkl. Möbel, Inventar und besenreiner Übergabe.",
    imageSrc: "/images/Wohnungsauflösung.webp",
    imageAlt: "Wohnungsauflösung Wien – SofortRäumung",
    href: "/wohnungsaufloesung-wien",
    icon: Home,
  },
  {
    id: "verlassenschaft",
    title: "Verlassenschaft Wien",
    description:
      "Einfühlsame Räumung nach Todesfall – diskret, respektvoll und zuverlässig.",
    imageSrc: "/images/Verlassenschaft.webp",
    imageAlt: "Verlassenschaftsräumung Wien – SofortRäumung",
    href: "/verlassenschaften-nachlassraeumung",
    icon: Users,
  },
  {
    id: "geschaeft",
    title: "Firmen- & Büroauflösung",
    description:
      "Büro-, Laden- und Betriebsauflösungen inkl. fachgerechter Entsorgung.",
    imageSrc: "/images/Büroauflösung-Wien.webp",
    imageAlt: "Büroauflösung Wien – SofortRäumung",
    href: "/firmen-bueroaufloesung-wien",
    icon: Building2,
  },
  {
    id: "keller",
    title: "Kellerräumung Wien",
    description:
      "Entrümpelung von Keller, Dachboden und Garage – schnell und gründlich.",
    imageSrc: "/images/kellerraumung.webp",
    imageAlt: "Kellerräumung Wien – SofortRäumung",
    href: "/kellerraeumung-wien",
    icon: Warehouse,
  },
  {
    id: "messie",
    title: "Messie-Entrümpelung Wien",
    description:
      "Spezialisierte Räumung bei starker Verwahrlosung – diskret und professionell.",
    imageSrc: "/images/Messie-Entrümpelung.webp",
    imageAlt: "Messie-Entrümpelung Wien – SofortRäumung",
    href: "/messie-entruempelung-wien",
    icon: FileText,
  },
];

export const BENEFITS: BenefitItem[] = [
  {
    id: "diskret",
    title: "Diskret & vertraulich",
    description: "Absolute Diskretion bei jedem Auftrag.",
    icon: Lock,
  },
  {
    id: "schnell",
    title: "Schneller Service",
    description: "Auch kurzfristige Termine möglich.",
    icon: Clock,
  },
  {
    id: "preis",
    title: "Transparente Preise",
    description: "Fixpreis-Garantie ohne Überraschungen.",
    icon: Tag,
  },
  {
    id: "umwelt",
    title: "Umweltgerecht",
    description: "Fachgerechte Entsorgung & Recycling.",
    icon: Leaf,
  },
  {
    id: "komplett",
    title: "Alles aus einer Hand",
    description: "Von Besichtigung bis besenreiner Übergabe.",
    icon: ShieldCheck,
  },
];

export const REGION_FEATURES: RegionFeature[] = [
  { id: "wien", text: "Wien & alle Bezirke" },
  { id: "noe", text: "Niederösterreich flächendeckend" },
  { id: "umgebung", text: "Umgebung & kurzfristig erreichbar" },
];

export const SERVICE_OPTIONS: ServiceOption[] = [
  { value: "", label: "Leistung auswählen*" },
  { value: "wohnungsraeumung", label: "Wohnungsräumung" },
  { value: "verlassenschaft", label: "Verlassenschaft" },
  { value: "geschaeftsaufloesung", label: "Geschäftsauflösung" },
  { value: "keller-garage", label: "Keller & Garage" },
  { value: "messie-raeumung", label: "Messie-Räumung" },
  { value: "sonstiges", label: "Sonstiges" },
];

export const FOOTER_SERVICES: FooterLink[] = [
  { label: "Räumung Wien", href: "/raeumung-wien" },
  { label: "Entrümpelung Wien", href: "/entruempelung-wien" },
  { label: "Haushaltsauflösung Wien", href: "/haushaltsaufloesung-wien" },
  { label: "Verlassenschaften", href: "/verlassenschaften-nachlassraeumung" },
  { label: "Messie-Entrümpelung", href: "/messie-entruempelung-wien" },
  { label: "Alle Leistungen", href: "/leistungen" },
];

export const FOOTER_INFO: FooterLink[] = [
  { label: "Preise & Rechner", href: "/preise" },
  { label: "So funktioniert's", href: "/#prozess" },
  { label: "Referenzen", href: "/referenzen" },
  { label: "Ratgeber", href: "/ratgeber" },
  { label: "FAQ", href: "/#faq" },
  { label: "Kontakt", href: "/#kontakt" },
];

export const FOOTER_CONTACT: ContactInfoItem[] = [
  {
    id: "phone",
    label: "+43 664 2147171",
    href: "tel:+436642147171",
    icon: Phone,
  },
  {
    id: "email",
    label: "office@sofortraumung.at",
    href: "mailto:office@sofortraumung.at",
    icon: Mail,
  },
  {
    id: "address",
    label: "Brunner Straße 75, 1230 Wien",
    icon: MapPin,
  },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { id: "facebook", label: "Facebook", href: "#", icon: Facebook },
  { id: "instagram", label: "Instagram", href: "#", icon: Instagram },
  { id: "youtube", label: "YouTube", href: "#", icon: Youtube },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "kosten-entruempelung",
    question: "Was kostet eine Entrümpelung in Wien und Umgebung?",
    answer:
      "Die Kosten für eine Entrümpelung in Wien und Umgebung richten sich nach Objektgröße, Füllgrad, Stockwerk, Liftzugang sowie Art und Menge des Entsorgungsguts. Nach einer kostenlosen Vor-Ort-Besichtigung erhalten Sie von uns einen verbindlichen Fixpreis – inklusive Demontage, Abtransport und fachgerechter Entsorgung, ohne versteckte Zusatzkosten.",
  },
  {
    id: "besichtigung-kostenlos",
    question:
      "Ist die Vor-Ort-Besichtigung in Wien und Niederösterreich wirklich 100% kostenlos und unverbindlich?",
    answer:
      "Ja. Die Vor-Ort-Besichtigung in Wien und Niederösterreich ist zu 100 % kostenlos und unverbindlich. Wir prüfen den Umfang vor Ort, beraten Sie transparent und erstellen ein Fixpreis-Angebot. Erst wenn Sie den Auftrag erteilen, entstehen Kosten – ohne Druck und ohne Verpflichtung.",
  },
  {
    id: "wertanrechnung",
    question:
      "Wie funktioniert die Wertanrechnung für verwertbare Möbel und Nachlässe?",
    answer:
      "Verwertbare Möbel, Hausrat und Nachlassgegenstände werden bei der Besichtigung bzw. während der Räumung fachkundig geprüft und sortiert. Der ermittelte Wert kann als Wertanrechnung auf den Räumungspreis angerechnet werden. Wertanrechnung erfolgt ausschließlich in Verbindung mit einer Entrümpelung oder Räumung – transparent, nachvollziehbar und vor Auftrag schriftlich kommuniziert.",
  },
  {
    id: "besenrein-wiener-wohnen",
    question:
      "Übergeben Sie die Wohnung garantiert besenrein nach Vorgaben von Wiener Wohnen?",
    answer:
      "Ja. Wir übergeben Wohnungen besenrein und orientieren uns an den üblichen Übergabeanforderungen, einschließlich Vorgaben von Wiener Wohnen. Auf Wunsch dokumentieren wir den Zustand und stellen ein Übergabeprotokoll bereit – damit die Wohnung termingerecht und abnahmefähig übergeben werden kann.",
  },
  {
    id: "express-einsatz",
    question:
      "Wie schnell ist ein Express-Einsatz bei kurzfristigen Räumungen möglich?",
    answer:
      "Bei kurzfristigen Räumungen sind Express-Einsätze oft noch am selben Tag oder innerhalb von 24–48 Stunden möglich – abhängig von Kapazität, Objektlage und Entsorgungsaufwand. Wir sind 24/7 erreichbar und priorisieren dringende Termine in Wien und Umgebung, z. B. bei Kündigungsfristen, Übergaben oder Notfällen.",
  },
  {
    id: "entsorgung-ma48",
    question:
      "Erfolgt die Entsorgung von Sperrmüll und Problemstoffen fachgerecht nach MA 48 Richtlinien?",
    answer:
      "Ja. Sperrmüll, Elektrogeräte, Problemstoffe und sonstige Abfälle werden getrennt erfasst und fachgerecht entsorgt – gemäß den geltenden Vorgaben und MA 48 Richtlinien der Stadt Wien. Wir achten auf nachhaltige Verwertung, korrektes Recycling und eine dokumentierte, umweltgerechte Entsorgung.",
  },
];

export const PHONE_DISPLAY = "+43 664 2147171";
export const PHONE_HREF = "tel:+436642147171";
