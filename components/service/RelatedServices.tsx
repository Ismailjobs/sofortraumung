import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ServicePageConfig } from "@/config/services";
import { getServicePath } from "@/config/services";

interface RelatedServicesProps {
  services: ServicePageConfig[];
}

export default function RelatedServices({ services }: RelatedServicesProps) {
  if (services.length === 0) {
    return null;
  }

  return (
    <section className="border-t border-white/10 bg-navy-light py-14 lg:py-16">
      <div className="site-container">
        <h2 className="text-xl font-extrabold uppercase tracking-tight text-white sm:text-2xl">
          Verwandte Dienstleistungen in Wien
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-white/65">
          Passende Leistungen aus derselben Kategorie – für einen klaren
          Überblick und die richtige Lösung in Wien.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={getServicePath(service.slug)}
              className="group flex flex-col rounded-xl border border-white/15 bg-navy p-5 transition hover:border-lime/50"
            >
              <h3 className="text-sm font-extrabold uppercase tracking-tight text-white group-hover:text-lime">
                {service.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-white/60">
                {service.shortDescription}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-lime">
                Mehr erfahren
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
