import Link from "next/link";
import { ArrowRight } from "lucide-react";
import LocalImage from "@/components/LocalImage";
import { SERVICES } from "@/lib/data";

export default function ServicesSection() {
  return (
    <section id="leistungen" className="bg-navy-light py-16 lg:py-20">
      <div className="site-container">
        <h2 className="text-center text-2xl font-extrabold uppercase tracking-tight text-white sm:text-3xl">
          Unsere Leistungen
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <article
                key={service.id}
                className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-lg"
              >
                <div className="relative aspect-[4/3] bg-slate-200">
                  <LocalImage
                    src={service.imageSrc}
                    alt={service.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                    fallbackClassName="bg-slate-200"
                  />
                </div>

                <div className="relative flex flex-1 flex-col px-4 pb-5 pt-8">
                  <span className="absolute -top-6 left-4 flex h-12 w-12 items-center justify-center rounded-full bg-lime text-navy shadow-md">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="text-base font-extrabold uppercase tracking-tight text-navy">
                    {service.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                    {service.description}
                  </p>
                  <Link
                    href={service.href}
                    className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-[#8fb01a] transition group-hover:gap-2"
                  >
                    Mehr erfahren
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
