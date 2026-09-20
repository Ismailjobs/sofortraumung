export interface RatgeberFaqItem {
  question: string;
  answer: string;
}

export interface RatgeberTable {
  title: string;
  caption?: string;
  headers: string[];
  rows: string[][];
}

export interface RatgeberCaseStudy {
  title: string;
  location: string;
  situation: string;
  approach: string;
  result: string;
}

export interface RatgeberChecklist {
  title: string;
  items: string[];
}

export interface RatgeberCta {
  title: string;
  description: string;
  buttonLabel: string;
  href: string;
}

export interface RatgeberSteps {
  title: string;
  steps: string[];
}

export interface RatgeberInternalLink {
  href: string;
  label: string;
}

export type RatgeberBlock =
  | { type: "section"; heading: string; paragraphs: string[] }
  | { type: "table"; data: RatgeberTable }
  | { type: "checklist"; data: RatgeberChecklist }
  | { type: "caseStudy"; data: RatgeberCaseStudy }
  | { type: "cta"; data: RatgeberCta }
  | { type: "steps"; data: RatgeberSteps }
  | { type: "hint"; title: string; text: string }
  | { type: "links"; title: string; links: RatgeberInternalLink[] };

export interface RatgeberArticle {
  slug: string;
  title: string;
  h1: string;
  subtitle: string;
  excerpt: string;
  metaTitle: string;
  metaDescription: string;
  datePublished: string;
  dateModified: string;
  category: string;
  readingMinutes: number;
  districts?: string[];
  relatedServicePaths: string[];
  relatedArticleSlugs: string[];
  intro: string[];
  blocks: RatgeberBlock[];
  faq: RatgeberFaqItem[];
}
