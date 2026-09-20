import type { FaqItem } from "@/types";
import { SITE } from "@/config/site";
import {
  getServicePath,
  getServiceUrl,
  type ServicePageConfig,
  type ServiceSlug,
  SERVICES,
  SERVICE_SLUGS,
} from "@/config/services";

export interface FaqPageSchema {
  "@context": "https://schema.org";
  "@type": "FAQPage";
  mainEntity: Array<{
    "@type": "Question";
    name: string;
    acceptedAnswer: {
      "@type": "Answer";
      text: string;
    };
  }>;
}

export interface BreadcrumbListSchema {
  "@context": "https://schema.org";
  "@type": "BreadcrumbList";
  itemListElement: Array<{
    "@type": "ListItem";
    position: number;
    name: string;
    item: string;
  }>;
}

export function buildFaqPageSchema(items: FaqItem[]): FaqPageSchema {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function buildBreadcrumbSchema(
  items: Array<{ name: string; path: string }>
): BreadcrumbListSchema {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE.domain}${item.path === "/" ? "" : item.path}`,
    })),
  };
}

export function buildServicePageSchema(
  service: ServicePageConfig,
  faqItems?: Array<{ question: string; answer: string }>
): object {
  const url = getServiceUrl(service.slug);
  const graph: object[] = [
    {
      "@type": "Service",
      "@id": `${url}#service`,
      name: service.title,
      description: service.metaDescription,
      url,
      serviceType: service.serviceType,
      category: service.category,
      areaServed: [
        { "@type": "City", name: "Wien" },
        { "@type": "AdministrativeArea", name: "Niederösterreich" },
      ],
      provider: {
        "@id": `${SITE.domain}/#localbusiness`,
      },
      offers: {
        "@type": "Offer",
        name: "Kostenlose Besichtigung & Festpreis-Angebot",
        url: `${SITE.domain}/#kontakt`,
        priceCurrency: "EUR",
        availability: "https://schema.org/InStock",
      },
    },
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
    },
    buildBreadcrumbSchema([
      { name: "Startseite", path: "/" },
      { name: service.title, path: getServicePath(service.slug) },
    ]),
  ];

  if (faqItems && faqItems.length > 0) {
    graph.push(buildFaqPageSchema(
      faqItems.map((item, i) => ({
        id: `${service.slug}-faq-${i}`,
        question: item.question,
        answer: item.answer,
      }))
    ));
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

/** Homepage Organization + LocalBusiness @graph (canonical schema) */
export const HOME_SCHEMA_GRAPH: object = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE.domain}/#organization`,
      name: SITE.name,
      alternateName: [SITE.brandAlt, SITE.legalName],
      legalName: SITE.legalName,
      url: SITE.domain,
      logo: {
        "@type": "ImageObject",
        "@id": `${SITE.domain}/#logo`,
        url: SITE.logoUrl,
        contentUrl: SITE.logoUrl,
        caption: "SofortRäumung Wien",
      },
      image: SITE.logoUrl,
      telephone: SITE.telephone,
      email: SITE.email,
      founder: {
        "@type": "Person",
        name: SITE.founder,
      },
      identifier: {
        "@type": "PropertyValue",
        name: "GISA",
        value: SITE.gisaNumber,
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: SITE.address.streetAddress,
        postalCode: SITE.address.postalCode,
        addressLocality: SITE.address.addressLocality,
        addressRegion: SITE.address.addressRegion,
        addressCountry: SITE.address.addressCountry,
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: SITE.telephone,
        contactType: "customer service",
        email: SITE.email,
        availableLanguage: ["German", "English"],
        areaServed: "AT",
      },
      knowsLanguage: SITE.language,
      memberOf: {
        "@type": "Organization",
        name: "Wirtschaftskammer Österreich – Landesstelle Wien",
      },
    },
    {
      "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
      "@id": `${SITE.domain}/#localbusiness`,
      parentOrganization: {
        "@id": `${SITE.domain}/#organization`,
      },
      name: SITE.legalNameDisplay,
      alternateName: SITE.brandAlt,
      legalName: SITE.legalName,
      description:
        "Professionelle Räumung und Entrümpelung in Wien & Niederösterreich zum garantierten Festpreis nach Besichtigung. Wohnungsauflösung, Verlassenschaften, Firmenräumung und besenreine Übergabe.",
      url: `${SITE.domain}/`,
      image: [SITE.logoUrl],
      logo: {
        "@id": `${SITE.domain}/#logo`,
      },
      telephone: SITE.telephone,
      email: SITE.email,
      founder: {
        "@type": "Person",
        name: SITE.founder,
      },
      identifier: {
        "@type": "PropertyValue",
        name: "GISA",
        value: SITE.gisaNumber,
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: SITE.telephone,
        contactType: "customer service",
        email: SITE.email,
        availableLanguage: ["German", "English"],
      },
      isAcceptingNewClients: true,
      makesOffer: {
        "@type": "Offer",
        name: "Kostenlose Besichtigung & Festpreis-Angebot",
        url: `${SITE.domain}/#kontakt`,
      },
      priceRange: "€€",
      currenciesAccepted: "EUR",
      paymentAccepted:
        "Barzahlung, Banküberweisung, Debitkarte, Kreditkarte",
      knowsLanguage: SITE.language,
      category: [
        "Räumungsservice",
        "Wohnungsräumung",
        "Haushaltsauflösung",
        "Entrümpelungsservice",
        "Entsorgungsservice",
        "Verlassenschaftsräumung",
        "Messie Räumung",
        "Kellerräumung",
        "Dachbodenräumung",
        "Garagenräumung",
        "Gewerberäumung",
        "Büroauflösung",
        "Wertanrechnung",
      ],
      address: {
        "@type": "PostalAddress",
        streetAddress: SITE.address.streetAddress,
        postalCode: SITE.address.postalCode,
        addressLocality: SITE.address.addressLocality,
        addressRegion: SITE.address.addressRegion,
        addressCountry: SITE.address.addressCountry,
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: SITE.geo.latitude,
        longitude: SITE.geo.longitude,
      },
      areaServed: [
        { "@id": `${SITE.domain}/#area-wien` },
        { "@type": "AdministrativeArea", name: "Niederösterreich" },
        {
          "@type": "City",
          name: "Mödling",
          containedInPlace: {
            "@type": "AdministrativeArea",
            name: "Niederösterreich",
          },
        },
        {
          "@type": "City",
          name: "Baden",
          containedInPlace: {
            "@type": "AdministrativeArea",
            name: "Niederösterreich",
          },
        },
        {
          "@type": "City",
          name: "Wiener Neustadt",
          containedInPlace: {
            "@type": "AdministrativeArea",
            name: "Niederösterreich",
          },
        },
        {
          "@type": "City",
          name: "Schwechat",
          containedInPlace: {
            "@type": "AdministrativeArea",
            name: "Niederösterreich",
          },
        },
        { "@type": "Country", name: "Österreich" },
      ],
      openingHours: SITE.openingHoursText,
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          opens: SITE.opens,
          closes: SITE.closes,
        },
      ],
      hasOfferCatalog: {
        "@id": `${SITE.domain}/#offer-catalog`,
      },
    },
    {
      "@type": "City",
      "@id": `${SITE.domain}/#area-wien`,
      name: "Wien",
      alternateName: "Vienna",
      postalCode: [
        "1010", "1020", "1030", "1040", "1050", "1060", "1070", "1080", "1090",
        "1100", "1110", "1120", "1130", "1140", "1150", "1160", "1170", "1180",
        "1190", "1200", "1210", "1220", "1230",
      ],
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Wien",
      },
    },
    {
      "@type": "OfferCatalog",
      "@id": `${SITE.domain}/#offer-catalog`,
      name: "Räumungs- und Entrümpelungsleistungen Wien",
      description:
        "Umfassender Service für Räumung, Entrümpelung und Wertausgleich in Wien und Umgebung.",
      itemListElement: SERVICE_SLUGS.map((slug, index) => {
        const service = SERVICES[slug];
        return {
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Service",
            "@id": `${getServiceUrl(slug)}#service`,
            name: service.title,
            description: service.shortDescription,
            url: getServiceUrl(slug),
            serviceType: service.serviceType,
            category: service.category,
            provider: { "@id": `${SITE.domain}/#localbusiness` },
          },
        };
      }),
    },
    {
      "@type": "WebSite",
      "@id": `${SITE.domain}/#website`,
      url: SITE.domain,
      name: SITE.name,
      inLanguage: SITE.language,
      publisher: {
        "@id": `${SITE.domain}/#organization`,
      },
      about: {
        "@id": `${SITE.domain}/#localbusiness`,
      },
    },
  ],
};

export function resolveServiceSlug(slug: string): ServiceSlug | null {
  return SERVICE_SLUGS.includes(slug as ServiceSlug)
    ? (slug as ServiceSlug)
    : null;
}
