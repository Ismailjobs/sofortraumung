export interface ServicePricingRow {
  label: string;
  abPrice: string;
  includes: string;
}

export interface ServicePricingTable {
  title: string;
  disclaimer: string;
  rows: ServicePricingRow[];
}

export interface ServiceFaqItem {
  question: string;
  answer: string;
}

export interface ServiceCaseStudy {
  title: string;
  location: string;
  text: string;
}

export interface ServiceInternalLink {
  href: string;
  label: string;
}

export type ServiceContentBlock =
  | { type: "section"; heading: string; paragraphs: string[] }
  | { type: "pricing"; data: ServicePricingTable }
  | { type: "steps"; title: string; steps: string[] }
  | { type: "caseStudy"; data: ServiceCaseStudy }
  | { type: "hint"; title: string; text: string }
  | { type: "links"; title: string; links: ServiceInternalLink[] };

export interface ServiceExtendedContent {
  blocks: ServiceContentBlock[];
  faq: ServiceFaqItem[];
  relatedRatgeberSlugs: string[];
}
