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

      <main className="overflow-x-hidden bg-navy">
        <section className="border-b border-white/10 bg-navy-light py-8 sm:py-12 lg:py-16">
          <div className="site-container">
            <div className="mx-auto min-w-0 max-w-4xl">
            <ServiceBreadcrumb title={service.title} slug={service.slug} />
            <h1 className="mt-4 text-2xl font-extrabold uppercase leading-tight tracking-tight text-white break-words hyphens-auto sm:mt-5 sm:text-3xl sm:leading-snug md:text-4xl lg:text-5xl">
              {service.h1}
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/75 break-words sm:mt-5 sm:text-base md:text-lg">
              {service.shortDescription}
            </p>
            <div className="mt-6 flex flex-col gap-2.5 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-3">
              {service.showWhatsAppCta ? (
                <a
                  href={SITE.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-lime px-4 py-3 text-sm font-extrabold uppercase tracking-tight text-navy transition hover:bg-lime-dark sm:w-auto sm:px-5"
                >
                  <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span className="text-center">Jetzt per WhatsApp anfragen</span>
                </a>
              ) : (
                <Link
                  href="/#kontakt"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-lime px-4 py-3 text-sm font-extrabold uppercase tracking-tight text-navy transition hover:bg-lime-dark sm:w-auto sm:px-5"
                >
                  <span className="text-center">Kostenlos besichtigen lassen</span>
                  <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                </Link>
              )}
              <a
                href={`tel:${SITE.telephone}`}
                className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-white/40 px-4 py-3 text-sm font-bold uppercase tracking-tight text-white transition hover:border-lime hover:text-lime sm:w-auto sm:px-5"
              >
                {SITE.telephoneDisplay}
              </a>
            </div>
            </div>
          </div>
        </section>

        <section className="py-8 sm:py-12 lg:py-16">
          <div className="site-container mx-auto grid min-w-0 max-w-5xl gap-8 lg:grid-cols-[1.4fr_0.8fr] lg:gap-10">
            <article className="min-w-0 space-y-4 sm:space-y-5">
              {service.intro.map((segments, index) => (
                <RichText
                  key={`intro-${index}`}
                  segments={segments}
                  className="text-sm leading-relaxed text-white/80 sm:text-base"
                />
              ))}
              {service.body.map((segments, index) => (
                <RichText
                  key={`body-${index}`}
                  segments={segments}
                  className="text-sm leading-relaxed text-white/80 sm:text-base"
                />
              ))}

              {service.wertanrechnungLinks ? (
                <div className="pt-4">
                  <WertanrechnungCta links={service.wertanrechnungLinks} />
                </div>
              ) : null}

              {service.showWhatsAppCta ? (
                <aside className="min-w-0 rounded-xl border border-lime/40 bg-navy-light p-4 sm:p-6">
                  <h2 className="text-base font-extrabold uppercase leading-snug tracking-tight text-lime break-words sm:text-lg">
                    Ankauf nur per WhatsApp
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-white/70 break-words">
                    Fotos und Kurzbeschreibung senden – wir melden uns rasch
                    mit einer Einschätzung für Wien.
                  </p>
                  <a
                    href={SITE.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-md bg-lime px-4 py-3 text-sm font-extrabold uppercase tracking-tight text-navy sm:inline-flex sm:w-auto sm:px-5"
                  >
                    <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                    WhatsApp öffnen
                  </a>
                </aside>
              ) : null}

              <ServiceContentBlocks blocks={extended.blocks} />
              <ServiceRatgeberLinks slugs={extended.relatedRatgeberSlugs} />
              <ServiceFaq items={extended.faq} />
            </article>

            <aside className="h-fit min-w-0 rounded-xl border border-white/15 bg-navy-light p-4 sm:p-6">
              <h2 className="text-sm font-extrabold uppercase tracking-tight text-white sm:text-base">
                Ihre Vorteile in Wien
              </h2>
              <ul className="mt-3 space-y-2.5 sm:mt-4 sm:space-y-3">
                {service.highlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm text-white/80"
                  >
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-lime"
                      aria-hidden="true"
                    />
                    <span className="min-w-0 flex-1 leading-relaxed break-words">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
              <Link
                href="/#kontakt"
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-md bg-lime px-4 py-3 text-sm font-extrabold uppercase tracking-tight text-navy transition hover:bg-lime-dark sm:mt-6"
              >
                Unverbindlich anfragen
                <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
              </Link>
            </aside>
          </div>
        </section>

        <RelatedServices services={related} />
      </main>
    </>
  );
}
