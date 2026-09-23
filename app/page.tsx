import type { Metadata } from "next";
import dynamic from "next/dynamic";
import HeroSection from "@/components/HeroSection";
import PreiseTeaser from "@/components/PreiseTeaser";
import ProcessSection from "@/components/ProcessSection";
import ServicesSection from "@/components/ServicesSection";
import RatgeberPreviewSection from "@/components/RatgeberPreviewSection";
import FaqSection from "@/components/FaqSection";

const ContactSection = dynamic(() => import("@/components/ContactSection"));
import JsonLd from "@/components/JsonLd";
import { FAQ_ITEMS } from "@/lib/data";
import { SITE } from "@/config/site";
import { buildFaqPageSchema, HOME_SCHEMA_GRAPH } from "@/lib/schemas";

export const metadata: Metadata = {
  title: "Räumung in Wien ab €150 – Festpreis | SofortRäumung",
  description:
    "Räumung in Wien ab €150 — Festpreis nach Besichtigung, besenreine Übergabe, Wertanrechnung. Wohnungsauflösung, Verlassenschaft & Entrümpelung in allen Bezirken.",
  alternates: {
    canonical: `${SITE.domain}/`,
    types: {
      "application/rss+xml": `${SITE.domain}/feed.xml`,
    },
  },
  openGraph: {
    title: "Räumung in Wien ab €150 – Festpreis | SofortRäumung",
    description:
      "Räumung Wien ab €150: kostenlose Besichtigung, verbindlicher Festpreis, MA-48-Entsorgung und besenreine Übergabe in allen Bezirken.",
    url: `${SITE.domain}/`,
    locale: SITE.locale,
    type: "website",
    siteName: SITE.name,
  },
};

export default function HomePage() {
  const faqSchema = buildFaqPageSchema(FAQ_ITEMS);

  return (
    <>
      <JsonLd id="schema-home-graph" data={HOME_SCHEMA_GRAPH} />
      <JsonLd id="schema-faq" data={faqSchema} />

      <main>
        <HeroSection />
        <PreiseTeaser />
        <ProcessSection />
        <ServicesSection />
        <RatgeberPreviewSection />
        <ContactSection />
        <FaqSection />
      </main>
    </>
  );
}
