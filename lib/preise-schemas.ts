import { PREISE_FAQ } from "@/config/preise";
import { SITE } from "@/config/site";
import { buildBreadcrumbSchema, buildFaqPageSchema } from "@/lib/schemas";

const PREISE_URL = `${SITE.domain}/preise`;

export function buildPreisePageSchema(): object {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE.domain}/#organization`,
        name: SITE.name,
        legalName: SITE.legalName,
        url: SITE.domain,
        logo: SITE.logoUrl,
        telephone: SITE.telephone,
        email: SITE.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: SITE.address.streetAddress,
          postalCode: SITE.address.postalCode,
          addressLocality: SITE.address.addressLocality,
          addressCountry: SITE.address.addressCountry,
        },
        identifier: {
          "@type": "PropertyValue",
          name: "GISA",
          value: SITE.gisaNumber,
        },
      },
      buildBreadcrumbSchema([
        { name: "Startseite", path: "/" },
        { name: "Preise & Kostenrechner", path: "/preise" },
      ]),
      {
        "@type": "WebPage",
        "@id": `${PREISE_URL}#webpage`,
        url: PREISE_URL,
        name: "Entrümpelung Kosten Wien – Preise & Online-Rechner",
        description:
          "Was kostet Entrümpelung in Wien? Richtpreise, Preisfaktoren und interaktiver Kostenrechner von SofortRäumung — unverbindlich, mit Festpreis nach kostenloser Besichtigung.",
        inLanguage: SITE.language,
        isPartOf: { "@id": `${SITE.domain}/#website` },
        about: { "@id": `${PREISE_URL}#kostenrechner` },
        publisher: { "@id": `${SITE.domain}/#organization` },
        mainEntity: { "@id": `${PREISE_URL}#kostenrechner` },
      },
      {
        "@type": "WebApplication",
        "@id": `${PREISE_URL}#kostenrechner`,
        name: "Entrümpelung Kostenrechner Wien",
        alternateName: "SofortRäumung Preisrechner",
        url: `${PREISE_URL}#kostenrechner`,
        description:
          "Kostenloser, interaktiver Online-Rechner zur Schätzung von Entrümpelungs- und Räumungskosten in Wien und Niederösterreich. Der Rechner berücksichtigt Objektart (Wohnung, Keller, Verlassenschaft, Gewerbe), Fläche in m², Stockwerk, Aufzugverfügbarkeit und Beladungszustand. Er liefert einen unverbindlichen EUR-Richtwert als Preisspanne und ersetzt keine Vor-Ort-Besichtigung. Entwickelt und betrieben von SofortRäumung (Mesut Duman e.U.), GISA 39404220, für transparente Preisorientierung vor der Festpreis-Anfrage.",
        applicationCategory: "BusinessApplication",
        applicationSubCategory: "CostEstimator",
        operatingSystem: "Web Browser",
        browserRequirements: "Requires JavaScript. Keine Registrierung erforderlich.",
        softwareHelp: {
          "@type": "CreativeWork",
          url: `${SITE.domain}/ratgeber/entruempelung-kosten-wien`,
          name: "Ratgeber: Entrümpelung Kosten Wien",
        },
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "EUR",
          description: "Kostenlose unverbindliche Online-Kostenschätzung",
          availability: "https://schema.org/InStock",
        },
        provider: { "@id": `${SITE.domain}/#organization` },
        creator: { "@id": `${SITE.domain}/#organization` },
        maintainer: { "@id": `${SITE.domain}/#organization` },
        inLanguage: SITE.language,
        featureList: [
          "Objektart: Wohnung, Keller/Dachboden, Verlassenschaft, Büro/Gewerbe",
          "Flächenauswahl von 20 m² bis 150+ m²",
          "Stockwerks-Zuschlag mit Aufzug-Reduktion",
          "Zustandsstufen: leicht, normal, stark beladen, Messie",
          "Sofortige EUR-Richtpreis-Spanne",
          "Direkte Kontakt-CTAs für Festpreis-Besichtigung",
        ],
        audience: {
          "@type": "PeopleAudience",
          audienceType:
            "Wohnungseigentümer, Erben, Hausverwaltungen und Gewerbekunden in Wien",
          geographicArea: {
            "@type": "AdministrativeArea",
            name: "Wien",
          },
        },
        areaServed: [
          { "@type": "City", name: "Wien" },
          { "@type": "AdministrativeArea", name: "Niederösterreich" },
        ],
      },
      buildFaqPageSchema(PREISE_FAQ),
    ],
  };
}
