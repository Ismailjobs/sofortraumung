"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Building2,
  Home,
  Loader2,
  MessageCircle,
  Phone,
  Users,
  Warehouse,
} from "lucide-react";
import { SITE } from "@/config/site";
import {
  AREA_PRESETS,
  OBJEKTART_OPTIONS,
  STOCKWERK_OPTIONS,
  ZUSTAND_OPTIONS,
  computeEstimate,
  formatEuro,
  formatFlaeche,
  type Objektart,
  type PriceRange,
  type Stockwerk,
  type Zustand,
} from "@/lib/kostenrechner";

type CalculatorPhase = "idle" | "calculating" | "result";

const OBJEKTART_ICONS = {
  wohnung: Home,
  keller: Warehouse,
  verlassenschaft: Users,
  gewerbe: Building2,
} as const;

interface KostenrechnerProps {
  /** Auf /preise: kein eigener Section-Titel (H1 steht auf der Seite) */
  embedded?: boolean;
}

export default function Kostenrechner({ embedded = false }: KostenrechnerProps) {
  const [objektart, setObjektart] = useState<Objektart>("wohnung");
  const [flaeche, setFlaeche] = useState<number>(50);
  const [stockwerk, setStockwerk] = useState<Stockwerk>("eg");
  const [aufzug, setAufzug] = useState<boolean>(false);
  const [zustand, setZustand] = useState<Zustand>("normal");
  const [phase, setPhase] = useState<CalculatorPhase>("idle");
  const [result, setResult] = useState<PriceRange | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleCalculate = useCallback((): void => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setPhase("calculating");
    setResult(null);

    timeoutRef.current = setTimeout(() => {
      if (!isMountedRef.current) {
        return;
      }

      const range = computeEstimate(
        objektart,
        flaeche,
        stockwerk,
        aufzug,
        zustand,
      );
      setResult(range);
      setPhase("result");
      timeoutRef.current = null;

      requestAnimationFrame(() => {
        resultRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      });
    }, 700);
  }, [objektart, flaeche, stockwerk, aufzug, zustand]);

  const isCalculating = phase === "calculating";
  const flaecheLabel = formatFlaeche(flaeche);

  const wrapperClass = embedded
    ? ""
    : "border-b border-white/10 bg-navy py-14 lg:py-20";

  return (
    <section
      id={embedded ? undefined : "kostenrechner"}
      className={wrapperClass}
      aria-labelledby={embedded ? undefined : "kostenrechner-heading"}
    >
      <div className={embedded ? "" : "site-container"}>
        {!embedded ? (
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm font-semibold uppercase tracking-tight text-lime">
              Kostenrechner
            </p>
            <h2
              id="kostenrechner-heading"
              className="mt-2 text-2xl font-extrabold uppercase tracking-tight text-white sm:text-3xl"
            >
              Entrümpelung Kosten in Wien schätzen
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
              Unverbindlicher Online-Richtwert für Wien &amp; Umgebung — in
              Sekunden, ohne Anmeldung.
            </p>
          </div>
        ) : null}

        <div className={`mx-auto max-w-5xl ${embedded ? "" : "mt-10"}`}>
          <div className="rounded-3xl border border-white/10 bg-navy-light p-5 shadow-xl sm:p-8 lg:grid lg:grid-cols-2 lg:gap-8 lg:p-10">
            <div className="space-y-7">
              <fieldset>
                <legend className="mb-3 text-sm font-bold uppercase tracking-tight text-white">
                  Objektart
                </legend>
                <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                  {OBJEKTART_OPTIONS.map(({ id, label }) => {
                    const Icon = OBJEKTART_ICONS[id];
                    const selected = objektart === id;
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setObjektart(id)}
                        className={`flex min-h-[4.5rem] flex-col items-center justify-center gap-2 rounded-2xl border px-3 py-3.5 text-center transition sm:min-h-[5rem] ${
                          selected
                            ? "border-lime bg-lime/10 text-white shadow-md shadow-lime/10"
                            : "border-white/15 bg-white/5 text-white/75 hover:border-white/30 hover:bg-white/10"
                        }`}
                        aria-pressed={selected}
                      >
                        <Icon
                          className={`h-5 w-5 shrink-0 ${selected ? "text-lime" : "text-white/60"}`}
                          aria-hidden="true"
                        />
                        <span className="text-xs font-bold leading-tight sm:text-sm">
                          {label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <div>
                <div className="mb-3 flex items-end justify-between gap-3">
                  <label
                    htmlFor="flaeche-slider"
                    className="text-sm font-bold uppercase tracking-tight text-white"
                  >
                    Fläche
                  </label>
                  <span className="rounded-lg bg-lime/15 px-3 py-1 text-sm font-extrabold text-lime">
                    {flaecheLabel}
                  </span>
                </div>
                <input
                  id="flaeche-slider"
                  type="range"
                  min={20}
                  max={150}
                  step={5}
                  value={flaeche}
                  onChange={(e) => setFlaeche(Number(e.target.value))}
                  className="kostenrechner-range w-full"
                  aria-valuemin={20}
                  aria-valuemax={150}
                  aria-valuenow={flaeche}
                  aria-valuetext={flaecheLabel}
                />
                <div className="mt-3 flex flex-wrap gap-2">
                  {AREA_PRESETS.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setFlaeche(preset)}
                      className={`rounded-full px-3.5 py-2 text-xs font-bold transition sm:text-sm ${
                        flaeche === preset
                          ? "bg-lime text-navy"
                          : "border border-white/20 bg-white/5 text-white/75 hover:border-white/35"
                      }`}
                    >
                      {preset === 150 ? "150+ m²" : `${preset} m²`}
                    </button>
                  ))}
                </div>
              </div>

              <fieldset>
                <legend className="mb-3 text-sm font-bold uppercase tracking-tight text-white">
                  Stockwerk
                </legend>
                <div className="flex flex-wrap gap-2">
                  {STOCKWERK_OPTIONS.map(({ id, label }) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setStockwerk(id)}
                      className={`rounded-full px-4 py-2.5 text-xs font-bold transition sm:text-sm ${
                        stockwerk === id
                          ? "bg-lime text-navy"
                          : "border border-white/20 bg-white/5 text-white/75 hover:border-white/35"
                      }`}
                      aria-pressed={stockwerk === id}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </fieldset>

              <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
                <div>
                  <p className="text-sm font-bold text-white">Aufzug vorhanden</p>
                  <p className="mt-0.5 text-xs text-white/55">
                    Reduziert Stockwerks-Zuschlag
                  </p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={aufzug}
                  onClick={() => setAufzug((prev) => !prev)}
                  className={`relative h-8 w-14 shrink-0 rounded-full transition-colors ${
                    aufzug ? "bg-lime" : "bg-white/20"
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 h-6 w-6 rounded-full bg-white shadow transition-transform ${
                      aufzug ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                  <span className="sr-only">Aufzug vorhanden</span>
                </button>
              </div>

              <fieldset>
                <legend className="mb-3 text-sm font-bold uppercase tracking-tight text-white">
                  Zustand
                </legend>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {ZUSTAND_OPTIONS.map(({ id, label, sub }) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setZustand(id)}
                      className={`rounded-2xl border px-2 py-3 text-center transition ${
                        zustand === id
                          ? "border-lime bg-lime/10 text-white"
                          : "border-white/15 bg-white/5 text-white/75 hover:border-white/30"
                      }`}
                      aria-pressed={zustand === id}
                    >
                      <span className="block text-xs font-extrabold sm:text-sm">
                        {label}
                      </span>
                      <span className="mt-0.5 block text-[10px] text-white/50 sm:text-xs">
                        {sub}
                      </span>
                    </button>
                  ))}
                </div>
              </fieldset>

              <button
                type="button"
                onClick={handleCalculate}
                disabled={isCalculating}
                className="flex w-full items-center justify-center gap-2.5 rounded-2xl bg-lime px-6 py-4 text-sm font-extrabold uppercase tracking-tight text-navy shadow-lg shadow-lime/20 transition hover:bg-lime-dark disabled:cursor-not-allowed disabled:opacity-80 sm:text-base"
              >
                {isCalculating ? (
                  <>
                    <Loader2
                      className="h-5 w-5 animate-spin"
                      aria-hidden="true"
                    />
                    Wird berechnet…
                  </>
                ) : (
                  "Berechnen"
                )}
              </button>
            </div>

            <div ref={resultRef} className="mt-8 flex flex-col justify-center lg:mt-0">
              <div className="kostenrechner-result-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
                <div className="relative min-h-[280px]">
                  <div
                    className={`absolute inset-0 flex flex-col items-center justify-center text-center transition-opacity duration-200 ${
                      phase === "idle"
                        ? "pointer-events-auto opacity-100"
                        : "pointer-events-none opacity-0"
                    }`}
                    aria-hidden={phase !== "idle"}
                  >
                    <p className="text-4xl font-extrabold text-white/15">€</p>
                    <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/50">
                      Parameter wählen und auf{" "}
                      <strong className="text-white/70">Berechnen</strong>{" "}
                      klicken — Ihr unverbindlicher Richtwert erscheint hier.
                    </p>
                  </div>

                  <div
                    className={`absolute inset-0 flex flex-col items-center justify-center text-center transition-opacity duration-200 ${
                      phase === "calculating"
                        ? "pointer-events-auto opacity-100"
                        : "pointer-events-none opacity-0"
                    }`}
                    aria-hidden={phase !== "calculating"}
                    aria-busy={phase === "calculating"}
                  >
                    <div className="kostenrechner-pulse flex flex-col items-center gap-4">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-lime/40 bg-lime/10">
                        <Loader2
                          className="h-8 w-8 animate-spin text-lime"
                          aria-hidden="true"
                        />
                      </div>
                      <p className="text-sm font-semibold text-white/70">
                        Richtwert wird ermittelt…
                      </p>
                    </div>
                  </div>

                  <div
                    className={`transition-opacity duration-200 ${
                      phase === "result" && result
                        ? "kostenrechner-fade-in pointer-events-auto opacity-100"
                        : "pointer-events-none opacity-0"
                    }`}
                    aria-hidden={phase !== "result" || !result}
                    aria-live="polite"
                  >
                    {result ? (
                      <>
                        <p className="text-xs font-bold uppercase tracking-widest text-lime">
                          Ihr Richtwert
                        </p>
                        <p className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                          {formatEuro(result.min)}{" "}
                          <span className="text-white/40">–</span>{" "}
                          {formatEuro(result.max)}
                        </p>
                        <p className="mt-2 text-sm text-white/55">
                          Geschätzte Entrümpelung in Wien (netto, inkl.
                          Abtransport &amp; Entsorgung)
                        </p>

                        <p className="mt-6 rounded-2xl border border-white/10 bg-navy/60 p-4 text-xs leading-relaxed text-white/65 sm:text-sm">
                          <strong className="text-white/90">Hinweis:</strong>{" "}
                          Dies ist ein unverbindlicher Richtwert. Jedes Objekt
                          ist individuell (z.&nbsp;B. Wertanrechnung von
                          verwertbaren Gegenständen, Parkmöglichkeiten). Für
                          einen garantierten Festpreis kontaktieren Sie uns für
                          eine kostenlose 15-Minuten-Besichtigung vor Ort.
                        </p>

                        <div className="mt-6 flex flex-col gap-3">
                          <a
                            href={`tel:${SITE.telephone}`}
                            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-lime px-5 py-4 text-sm font-extrabold uppercase tracking-tight text-navy transition hover:bg-lime-dark"
                          >
                            <Phone
                              className="h-4 w-4 shrink-0"
                              aria-hidden="true"
                            />
                            Jetzt Festpreis anfragen
                          </a>
                          <a
                            href={SITE.whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/25 bg-white/5 px-5 py-4 text-sm font-bold uppercase tracking-tight text-white transition hover:border-lime/50 hover:text-lime"
                          >
                            <MessageCircle
                              className="h-4 w-4 shrink-0"
                              aria-hidden="true"
                            />
                            Per WhatsApp schätzen lassen
                          </a>
                        </div>
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

