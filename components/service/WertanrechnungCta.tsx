import Link from "next/link";
import { ArrowRight, Coins } from "lucide-react";
import type { ServiceSlug } from "@/config/services";
import { getServicePath, SERVICES } from "@/config/services";

interface WertanrechnungCtaProps {
  links: ServiceSlug[];
}

export default function WertanrechnungCta({ links }: WertanrechnungCtaProps) {
  if (links.length === 0) {
    return null;
  }

  return (
    <aside className="min-w-0 rounded-xl border border-lime/40 bg-lime/10 p-4 sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-lime text-navy">
          <Coins className="h-5 w-5" aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="text-base font-extrabold uppercase leading-snug tracking-tight text-lime break-words sm:text-lg">
            Wertgegenstände vorhanden? Kosten senken durch Wertanrechnung
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-white/75 break-words">
            Verwertbare Möbel, Antiquitäten oder Nachlassstücke können in Wien
            auf Ihren Festpreis angerechnet werden – ausschließlich in
            Verbindung mit Entrümpelung oder Räumung.
          </p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-3">
            {links.map((slug) => (
              <Link
                key={slug}
                href={getServicePath(slug)}
                className="inline-flex w-full items-center justify-center gap-1.5 rounded-md bg-lime px-4 py-2.5 text-sm font-extrabold uppercase tracking-tight text-navy transition hover:bg-lime-dark sm:w-auto sm:justify-start"
              >
                <span className="min-w-0 break-words text-center sm:text-left">
                  {SERVICES[slug].title}
                </span>
                <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
