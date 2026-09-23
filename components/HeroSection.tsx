import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Play, Star } from "lucide-react";
import { TRUST_ITEMS } from "@/lib/data";

const HeroBeforeAfter = dynamic(() => import("@/components/HeroBeforeAfter"), {
  loading: () => (
    <div
      className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-slate-800 lg:aspect-[5/4]"
      aria-hidden="true"
    />
  ),
});

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-navy">
      <div className="site-container grid gap-8 pb-0 pt-10 lg:grid-cols-2 lg:items-center lg:gap-10 lg:pt-14">
        <div className="relative z-10 max-w-xl">
          <h1 className="text-3xl font-extrabold uppercase leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-5xl">
            Räumung in Wien{" "}
            <span className="text-lime">ab €150</span> – Festpreis &amp; besenrein
          </h1>
          <p className="mt-5 max-w-lg text-sm leading-relaxed text-white/75 sm:text-base">
            Wohnungsauflösung, Verlassenschaft, Keller, Messie-Räumung und
            Gewerbeauflösung in allen Wiener Bezirken — kostenlose Besichtigung,
            verbindlicher Festpreis, MA-48-Entsorgung und besenreine Übergabe.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link
              href="#kontakt"
              className="inline-flex items-center gap-2 rounded-md bg-lime px-5 py-3 text-sm font-extrabold uppercase tracking-tight text-navy transition hover:bg-lime-dark"
            >
              Kostenlos anfragen
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="#prozess"
              className="inline-flex items-center gap-2 rounded-md border border-white/40 bg-transparent px-5 py-3 text-sm font-bold uppercase tracking-tight text-white transition hover:border-lime hover:text-lime"
            >
              <Play className="h-4 w-4 fill-current" aria-hidden="true" />
              Mehr erfahren
            </Link>
          </div>
        </div>

        <HeroBeforeAfter />
      </div>

      <div className="mt-10 border-t border-white/10 bg-navy-light/80">
        <div className="site-container grid grid-cols-2 gap-4 py-5 sm:grid-cols-4">
          {TRUST_ITEMS.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className={`flex items-center gap-3 ${
                  index < TRUST_ITEMS.length - 1
                    ? "sm:border-r sm:border-white/10 sm:pr-4"
                    : ""
                }`}
              >
                {item.id === "google" ? (
                  <div className="relative h-9 w-9 shrink-0 overflow-hidden">
                    <Image
                      src="/images/google-logo.svg.webp"
                      alt="Google"
                      fill
                      className="object-contain"
                      sizes="36px"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-lime/15 text-lime">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                )}
                <div className="min-w-0">
                  {item.id === "google" ? (
                    <>
                      <div className="flex items-center gap-0.5 text-lime">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className="h-3.5 w-3.5 fill-current"
                            aria-hidden="true"
                          />
                        ))}
                      </div>
                      <p className="mt-0.5 truncate text-sm font-bold text-white">
                        {item.title}
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="truncate text-sm font-bold text-white">
                        {item.title}
                      </p>
                      <p className="truncate text-xs text-white/60">{item.subtitle}</p>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
