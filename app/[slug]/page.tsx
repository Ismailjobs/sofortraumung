import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, MessageCircle } from "lucide-react";
import {
  getAllServiceSlugs,
  getRelatedServices,
  getServiceBySlug,
  getServicePath,
} from "@/config/services";
import { SITE } from "@/config/site";
import { getServiceExtendedContent } from "@/config/service-extended";
import { buildServicePageSchema } from "@/lib/schemas";
import JsonLd from "@/components/JsonLd";
import RelatedServices from "@/components/service/RelatedServices";
import ServiceContentBlocks from "@/components/service/ServiceContentBlocks";
import ServiceFaq from "@/components/service/ServiceFaq";
import ServiceRatgeberLinks from "@/components/service/ServiceRatgeberLinks";
import WertanrechnungCta from "@/components/service/WertanrechnungCta";
import {
  RichText,
  ServiceBreadcrumb,
} from "@/components/service/ServiceRichText";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams(): { slug: string }[] {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return { title: "Seite nicht gefunden | SofortRäumung" };
  }

  const canonical = `${SITE.domain}${getServicePath(service.slug)}`;

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: {
      canonical,
    },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: canonical,
      locale: SITE.locale,
      type: "website",
      siteName: SITE.name,
    },
    twitter: {
      card: "summary_large_image",
      title: service.metaTitle,
      description: service.metaDescription,
    },
  };
}

export default async function ServiceSlugPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const related = getRelatedServices(service.slug);
  const extended = getServiceExtendedContent(service.slug);
  const schema = buildServicePageSchema(service, extended.faq);

  return (
    <>
      <JsonLd id={`schema-service-${service.slug}`} data={schema} />

      <main className="bg-navy">
        <section className="border-b border-white/10 bg-navy-light py-12 lg:py-16">
          <div className="site-container">
            <div className="mx-auto max-w-4xl">
            <ServiceBreadcrumb title={service.title} slug={service.slug} />
            <h1 className="mt-5 text-3xl font-extrabold uppercase tracking-tight text-white sm:text-4xl lg:text-5xl">
              {service.h1}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
              {service.shortDescription}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {service.showWhatsAppCta ? (
                <a
                  href={SITE.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md bg-lime px-5 py-3 text-sm font-extrabold uppercase tracking-tight text-navy transition hover:bg-lime-dark"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  Jetzt per WhatsApp anfragen
                </a>
              ) : (
                <Link
                  href="/#kontakt"
                  className="inline-flex items-center gap-2 rounded-md bg-lime px-5 py-3 text-sm font-extrabold uppercase tracking-tight text-navy transition hover:bg-lime-dark"
                >
                  Kostenlos besichtigen lassen
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              )}
              <a
                href={`tel:${SITE.telephone}`}
                className="inline-flex items-center gap-2 rounded-md border border-white/40 px-5 py-3 text-sm font-bold uppercase tracking-tight text-white transition hover:border-lime hover:text-lime"
              >
                {SITE.telephoneDisplay}
              </a>
            </div>
            </div>
          </div>
        </section>

        <section className="py-12 lg:py-16">
          <div className="site-container grid max-w-5xl gap-10 lg:grid-cols-[1.4fr_0.8fr]">
            <article className="space-y-5">
              {service.intro.map((segments, index) => (
                <RichText
                  key={`intro-${index}`}
                  segments={segments}
                  className="text-base leading-relaxed text-white/80"
                />
              ))}
              {service.body.map((segments, index) => (
                <RichText
                  key={`body-${index}`}
                  segments={segments}
                  className="text-base leading-relaxed text-white/80"
                />
              ))}

              {service.wertanrechnungLinks ? (
                <div className="pt-4">
                  <WertanrechnungCta links={service.wertanrechnungLinks} />
                </div>
              ) : null}

              {service.showWhatsAppCta ? (
                <aside className="rounded-xl border border-lime/40 bg-navy-light p-6">
                  <h2 className="text-lg font-extrabold uppercase tracking-tight text-lime">
                    Ankauf nur per WhatsApp
                  </h2>
                  <p className="mt-2 text-sm text-white/70">
                    Fotos und Kurzbeschreibung senden – wir melden uns rasch
                    mit einer Einschätzung für Wien.
                  </p>
                  <a
                    href={SITE.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 rounded-md bg-lime px-5 py-3 text-sm font-extrabold uppercase tracking-tight text-navy"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    WhatsApp öffnen
                  </a>
                </aside>
              ) : null}

              <ServiceContentBlocks blocks={extended.blocks} />
              <ServiceRatgeberLinks slugs={extended.relatedRatgeberSlugs} />
              <ServiceFaq items={extended.faq} />
            </article>

            <aside className="h-fit rounded-xl border border-white/15 bg-navy-light p-6">
              <h2 className="text-base font-extrabold uppercase tracking-tight text-white">
                Ihre Vorteile in Wien
              </h2>
              <ul className="mt-4 space-y-3">
                {service.highlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm text-white/80"
                  >
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-lime"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/#kontakt"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-md bg-lime px-4 py-3 text-sm font-extrabold uppercase tracking-tight text-navy transition hover:bg-lime-dark"
              >
                Unverbindlich anfragen
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </aside>
          </div>
        </section>

        <RelatedServices services={related} />
      </main>
    </>
  );
}
