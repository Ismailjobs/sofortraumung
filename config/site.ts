export const SITE = {
  name: "SofortRäumung",
  brandAlt: "Sofort Entrümpelung",
  legalName: "Mesut Duman e.U.",
  legalNameDisplay: "SofortRäumung Wien",
  domain: "https://sofortraumung.at",
  domainHost: "sofortraumung.at",
  locale: "de_AT",
  language: "de-AT",
  telephone: "+436642147171",
  telephoneDisplay: "+43 664 2147171",
  email: "office@sofortraumung.at",
  whatsappUrl: "https://wa.me/436642147171",
  gisaNumber: "39404220",
  founder: "Mesut Duman",
  openingHoursText: "Mo – So: 06:00 – 22:00",
  opens: "06:00",
  closes: "22:00",
  logoPath: "/logo.webp",
  logoUrl: "https://sofortraumung.at/logo.webp",
  address: {
    streetAddress: "Brunner Straße 75, Objekt D/Büro 3",
    postalCode: "1230",
    addressLocality: "Wien",
    addressRegion: "Wien",
    addressCountry: "AT",
  },
  geo: {
    latitude: 48.134914,
    longitude: 16.298116,
  },
  companyPurpose:
    "Professionelle Entrümpelung, Haushaltsauflösungen, Räumungen und zugehörige Entsorgungsleistungen in Wien und Umgebung — inklusive Festpreisangeboten nach Besichtigung vor Ort.",
} as const;

export type SiteConfig = typeof SITE;
