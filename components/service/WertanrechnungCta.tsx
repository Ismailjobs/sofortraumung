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
    <aside className="rounded-xl border border-lime/40 bg-lime/10 p-6">
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-lime text-navy">
          <Coins className="h-5 w-5" aria-hidden="true" />
        </span>
        <div>
          <h2 className="text-lg font-extrabold uppercase tracking-tight text-lime">
            Wertgegenstände vorhanden? Kosten senken durch Wertanrechnung
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-white/75">
            Verwertbare Möbel, Antiquitäten oder Nachlassstücke können in Wien
            auf Ihren Festpreis angerechnet werden – ausschließlich in
            Verbindung mit Entrümpelung oder Räumung.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            {links.map((slug) => (
              <Link
                key={slug}
                href={getServicePath(slug)}
                className="inline-flex items-center gap-1.5 rounded-md bg-lime px-4 py-2.5 text-sm font-extrabold uppercase tracking-tight text-navy transition hover:bg-lime-dark"
              >
                {SERVICES[slug].title}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
