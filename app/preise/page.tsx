import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, ArrowRight, Calculator, Check } from "lucide-react";
import Kostenrechner from "@/components/Kostenrechner";
import JsonLd from "@/components/JsonLd";
import { PREISE_FAQ, PREISE_PRICE_TABLE } from "@/config/preise";
import { SITE } from "@/config/site";
import { buildPreisePageSchema } from "@/lib/preise-schemas";

export const metadata: Metadata = {
  title: "Entrümpelung Kosten Wien – Preise & Kostenrechner | SofortRäumung",
  description:
    "Was kostet Entrümpelung in Wien? Richtpreise, Preisfaktoren und kostenloser Online-Kostenrechner. Festpreis nach kostenloser Besichtigung — SofortRäumung Wien.",
  alternates: {
    canonical: `${SITE.domain}/preise`,
  },
  openGraph: {
    title: "Entrümpelung Kosten Wien – Preise & Kostenrechner",
    description:
      "Unverbindlicher Richtwert für Entrümpelung & Räumung in Wien. Interaktiver Rechner + transparente Preisinfos von SofortRäumung.",
    url: `${SITE.domain}/preise`,
    locale: SITE.locale,
    type: "website",
    siteName: SITE.name,
  },
};

export default function PreisePage() {
  const schema = buildPreisePageSchema();

  return (
    <>
      <JsonLd id="schema-preise" data={schema} />

      <main className="overflow-x-hidden bg-navy">
        {/* Hero & Intro */}
        <section className="border-b border-white/10 bg-navy-light py-12 lg:py-16">
          <div className="site-container">
            <nav aria-label="Brotkrumen" className="text-sm text-white/55">
              <Link href="/" className="transition hover:text-lime">
                Startseite
              </Link>
              <span className="mx-2">/</span>
              <span className="text-white/80">Preise</span>
            </nav>

            <div className="mx-auto mt-6 max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-tight text-lime">
                Preise &amp; Kostenrechner
              </p>
              <h1 className="mt-2 text-3xl font-extrabold uppercase leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                Entrümpelung Kosten in Wien — transparent schätzen
              </h1>
              <p className="mt-5 text-base leading-relaxed text-white/75 sm:text-lg">
                Sie planen eine Wohnungsauflösung, Kellerräumung oder
                Verlassenschaft in Wien? Auf dieser Seite erfahren Sie, welche
                Faktoren den Preis bestimmen, welche Richtwerte in der Praxis
                üblich sind — und können mit unserem{" "}
                <a href="#kostenrechner" className="font-semibold text-lime hover:underline">
                  kostenlosen Kostenrechner
                </a>{" "}
                in wenigen Sekunden eine erste Kostenspanne ermitteln.
              </p>
              <a
                href="#kostenrechner"
                className="mt-7 inline-flex items-center justify-center gap-2 rounded-2xl bg-lime px-6 py-4 text-sm font-extrabold uppercase tracking-tight text-navy transition hover:bg-lime-dark"
              >
                <Calculator className="h-4 w-4" aria-hidden="true" />
                Zum Kostenrechner
                <ArrowDown className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12 lg:py-16">
          <div className="site-container">
            <article className="mx-auto max-w-3xl space-y-10 text-sm leading-relaxed text-white/80 sm:text-base">
              <section>
                <h2 className="text-xl font-extrabold uppercase tracking-tight text-white sm:text-2xl">
                  Warum es bei Entrümpelung keinen Pauschalpreis „pro m²“ gibt
                </h2>
                <p className="mt-4">
                  Viele Kunden suchen online nach „Entrümpelung Kosten Wien“ und
                  stoßen auf pauschale Angaben, die selten zum eigenen Objekt
                  passen. In der Realität hängt der Aufwand nicht nur von
                  Quadratmetern ab: Ein 40&nbsp;m²-Altbau-Wohnung im 4. Stock
                  ohne Lift mit Einbauküche und vollgestelltem Keller unterscheidet
                  sich fundamental von einer leicht möblierten Neubauwohnung mit
                  Lift und Tiefgarage.
                </p>
                <p className="mt-4">
                  Bei{" "}
                  <strong className="text-white">SofortRäumung</strong> arbeiten
                  wir deshalb mit einem zweistufigen Modell: Zuerst erhalten Sie
                  einen <strong className="text-white">unverbindlichen Richtwert</strong>{" "}
                  (online oder telefonisch), danach — nach kostenloser
                  Besichtigung vor Ort — einen{" "}
                  <strong className="text-white">verbindlichen Festpreis</strong>.
                  So vermeiden Sie Überraschungen am Tag der Räumung.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-extrabold uppercase tracking-tight text-white sm:text-2xl">
                  Die wichtigsten Preisfaktoren in Wien
                </h2>
                <ul className="mt-4 space-y-3">
                  {[
                    "Objektart & Inventar: Wohnung, Keller, Verlassenschaft oder Gewerbe",
                    "Fläche und Füllgrad: leer, normal bewohnt oder extrem beladen / Messie",
                    "Stockwerk & Aufzug: ohne Lift steigt der Personal- und Zeitaufwand",
                    "Demontage: Küchen, Einbauten, Bodenbeläge, Lampen",
                    "Entsorgung: MA-48-konforme Trennung, Sondermüll, Container",
                    "Wertanrechnung: verwertbare Möbel, Antiquitäten, Geräte",
                    "Zufahrt & Parken: Halteverbotszone, Innenhof, Enge Stiegenhäuser",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-lime"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-extrabold uppercase tracking-tight text-white sm:text-2xl">
                  Richtpreise Entrümpelung Wien (Orientierung)
                </h2>
                <p className="mt-4">
                  Die folgende Tabelle dient der groben Einordnung. Ihr
                  individueller Festpreis kann je nach Besichtigung abweichen —
                  nach oben wie nach unten (z.&nbsp;B. durch Wertanrechnung).
                </p>
                <div className="mt-6 overflow-x-auto rounded-2xl border border-white/10">
                  <table className="w-full min-w-[480px] text-left text-sm">
                    <thead>
                      <tr className="border-b border-white/10 bg-navy-light">
                        <th className="px-4 py-3 font-extrabold uppercase tracking-tight text-lime sm:px-5">
                          Leistung
                        </th>
                        <th className="px-4 py-3 font-extrabold uppercase tracking-tight text-lime sm:px-5">
                          Richtwert
                        </th>
                        <th className="px-4 py-3 font-extrabold uppercase tracking-tight text-lime sm:px-5">
                          Hinweis
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {PREISE_PRICE_TABLE.map((row) => (
                        <tr
                          key={row.leistung}
                          className="border-b border-white/5 last:border-0"
                        >
                          <td className="px-4 py-3 font-semibold text-white sm:px-5">
                            {row.leistung}
                          </td>
                          <td className="px-4 py-3 text-white/90 sm:px-5">
                            {row.richtwert}
                          </td>
                          <td className="px-4 py-3 text-white/60 sm:px-5">
                            {row.hinweis}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="mt-4 text-xs text-white/50 sm:text-sm">
                  Mehr Details im Ratgeber:{" "}
                  <Link
                    href="/ratgeber/entruempelung-kosten-wien"
                    className="text-lime hover:underline"
                  >
                    Entrümpelung Kosten Wien — ausführlicher Leitfaden
                  </Link>
                </p>
              </section>

              <section>
                <h2 className="text-xl font-extrabold uppercase tracking-tight text-white sm:text-2xl">
                  So funktioniert unser Kostenrechner
                </h2>
                <p className="mt-4">
                  Der Rechner unten auf dieser Seite wurde von SofortRäumung
                  entwickelt, um Ihnen vor dem ersten Telefonat eine realistische
                  Kostenspanne zu geben. Er läuft vollständig in Ihrem Browser —
                  ohne Anmeldung, ohne Datenübertragung an Drittanbieter und ohne
                  Speicherung Ihrer Eingaben.
                </p>
                <ol className="mt-4 list-decimal space-y-2 pl-5 marker:font-bold marker:text-lime">
                  <li>Objektart wählen (Wohnung, Keller, Verlassenschaft, Gewerbe)</li>
                  <li>Fläche in m² angeben</li>
                  <li>Stockwerk und Aufzug angeben</li>
                  <li>Zustand einschätzen</li>
                  <li>
                    Auf „Berechnen“ klicken — Sie erhalten eine EUR-Richtspanne
                  </li>
                </ol>
                <p className="mt-4">
                  Der Richtwert ersetzt keine Besichtigung. Für einen garantierten
                  Festpreis vereinbaren Sie eine{" "}
                  <strong className="text-white">
                    kostenlose 15-Minuten-Begehung
                  </strong>{" "}
                  — persönlich, telefonisch oder per WhatsApp.
                </p>
              </section>
            </article>
          </div>
        </section>

        {/* Calculator */}
        <section
          id="kostenrechner"
          className="scroll-mt-24 border-y border-white/10 bg-navy-light py-12 lg:scroll-mt-28 lg:py-16"
        >
          <div className="site-container">
            <div className="mx-auto mb-8 max-w-3xl text-center">
              <h2 className="text-2xl font-extrabold uppercase tracking-tight text-white sm:text-3xl">
                Jetzt Kosten schätzen
              </h2>
              <p className="mt-3 text-sm text-white/65 sm:text-base">
                Interaktiver Richtwert-Rechner — Ergebnis in Sekunden
              </p>
            </div>
            <Kostenrechner embedded />
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12 lg:py-16">
          <div className="site-container">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-2xl font-extrabold uppercase tracking-tight text-white sm:text-3xl">
                Häufige Fragen zu Entrümpelungspreisen
              </h2>
              <div className="mt-8 divide-y divide-white/10 border-y border-white/10">
                {PREISE_FAQ.map((item) => (
                  <details key={item.id} className="group py-5">
                    <summary className="cursor-pointer list-none pr-6 text-base font-bold text-white marker:content-none [&::-webkit-details-marker]:hidden">
                      {item.question}
                    </summary>
                    <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-base">
                      {item.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-white/10 bg-navy-light py-12 lg:py-16">
          <div className="site-container">
            <div className="mx-auto max-w-2xl rounded-3xl border border-lime/30 bg-lime/10 p-8 text-center">
              <h2 className="text-xl font-extrabold uppercase tracking-tight text-white sm:text-2xl">
                Festpreis statt Schätzung?
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-white/75 sm:text-base">
                Kostenlose Besichtigung in Wien &amp; Niederösterreich — verbindliches
                Angebot, besenreine Übergabe, Wertanrechnung möglich.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Link
                  href="/#kontakt"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-lime px-6 py-4 text-sm font-extrabold uppercase tracking-tight text-navy transition hover:bg-lime-dark"
                >
                  Kostenlos anfragen
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <a
                  href={`tel:${SITE.telephone}`}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/30 px-6 py-4 text-sm font-bold uppercase tracking-tight text-white transition hover:border-lime hover:text-lime"
                >
                  {SITE.telephoneDisplay}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
