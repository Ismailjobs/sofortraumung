import Link from "next/link";
import { ArrowRight, Calculator } from "lucide-react";

export default function PreiseTeaser() {
  return (
    <section className="border-b border-white/10 bg-navy-light py-12 lg:py-16">
      <div className="site-container">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 rounded-3xl border border-white/10 bg-navy p-6 text-center shadow-xl sm:p-10 lg:flex-row lg:text-left">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-lime/15 text-lime">
            <Calculator className="h-8 w-8" aria-hidden="true" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-extrabold uppercase tracking-tight text-white sm:text-2xl">
              Was kostet Ihre Entrümpelung in Wien?
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-white/70 sm:text-base">
              Nutzen Sie unseren kostenlosen Online-Kostenrechner — unverbindlicher
              Richtwert in Sekunden, Festpreis nach kostenloser Besichtigung.
            </p>
          </div>
          <Link
            href="/preise#kostenrechner"
            className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-2xl bg-lime px-6 py-4 text-sm font-extrabold uppercase tracking-tight text-navy transition hover:bg-lime-dark sm:w-auto"
          >
            Zum Preisrechner
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
