import type { RatgeberArticle, RatgeberFaqItem } from "@/types/ratgeber";
import { SITE } from "@/config/site";
import { buildBreadcrumbSchema, buildFaqPageSchema } from "@/lib/schemas";

export function buildRatgeberArticleSchema(
  article: RatgeberArticle,
  canonical: string
): object {
  const breadcrumb = buildBreadcrumbSchema([
    { name: "Startseite", path: "/" },
    { name: "Ratgeber", path: "/ratgeber" },
    { name: article.title, path: `/ratgeber/${article.slug}` },
  ]);

  const faqSchema =
    article.faq.length > 0
      ? buildFaqPageSchema(
          article.faq.map((item, i) => ({
            id: `${article.slug}-faq-${i}`,
            question: item.question,
            answer: item.answer,
          }))
        )
      : null;

  const graph: object[] = [
    breadcrumb,
    {
      "@type": "BlogPosting",
      "@id": `${canonical}#article`,
      headline: article.h1,
      description: article.excerpt,
      datePublished: article.datePublished,
      dateModified: article.dateModified,
      inLanguage: SITE.language,
      wordCount: article.readingMinutes * 200,
      articleSection: article.category,
      mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
      author: {
        "@type": "Organization",
        "@id": `${SITE.domain}/#organization`,
        name: SITE.name,
      },
      publisher: { "@id": `${SITE.domain}/#organization` },
      image: SITE.logoUrl,
      about: { "@id": `${SITE.domain}/#localbusiness` },
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
  ];

  if (faqSchema) {
    graph.push(faqSchema);
  }

  return { "@context": "https://schema.org", "@graph": graph };
}

export function buildServiceFaqSchema(
  faq: RatgeberFaqItem[],
  pageName: string
): object | null {
  if (faq.length === 0) return null;
  return buildFaqPageSchema(
    faq.map((item, i) => ({
      id: `${pageName}-faq-${i}`,
      question: item.question,
      answer: item.answer,
    }))
  );
}
