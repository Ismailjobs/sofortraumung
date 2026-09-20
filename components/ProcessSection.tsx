"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { PROCESS_STEPS } from "@/lib/data";

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="prozess"
      className={`process-section bg-navy py-16 lg:py-20 ${isVisible ? "process-section--visible" : ""}`}
    >
      <div className="site-container">
        <h2
          className={`process-heading text-center text-2xl font-extrabold uppercase tracking-tight text-lime sm:text-3xl ${isVisible ? "process-animate-in" : "process-animate-hidden"}`}
          style={{ animationDelay: "0ms" }}
        >
          Unser 4-Schritte Wow-Prozess
        </h2>

        {/* Mobile & tablet: vertical timeline */}
        <div className="relative mt-10 space-y-0 lg:hidden">
          {PROCESS_STEPS.map((step, index) => {
            const Icon = step.icon;
            const isLast = index === PROCESS_STEPS.length - 1;
            return (
              <div
                key={step.id}
                className={`process-step-mobile relative flex gap-4 sm:gap-5 ${isVisible ? "process-animate-in" : "process-animate-hidden"}`}
                style={{ animationDelay: `${120 + index * 120}ms` }}
              >
                <div className="flex w-10 shrink-0 flex-col items-center sm:w-12">
                  <span className="process-step-badge flex h-10 w-10 items-center justify-center rounded-full bg-lime text-sm font-extrabold text-navy shadow-[0_0_20px_rgba(200,240,38,0.35)] sm:h-12 sm:w-12 sm:text-base">
                    {step.id}
                  </span>
                  {!isLast ? (
                    <div className="process-connector relative my-2 flex flex-1 flex-col items-center">
                      <span className="h-full min-h-[2.5rem] w-0.5 bg-gradient-to-b from-lime/70 via-lime/30 to-lime/10 sm:min-h-[3rem]" />
                      <ChevronDown
                        className="process-connector-arrow -mt-1 h-4 w-4 text-lime/80"
                        aria-hidden="true"
                      />
                    </div>
                  ) : null}
                </div>

                <article className="process-card group mb-6 flex-1 rounded-xl border border-white/15 bg-navy-light/40 p-5 backdrop-blur-sm transition-[transform,box-shadow,border-color] duration-300 active:scale-[0.99] sm:p-6">
                  <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-lime/15 text-lime transition-transform duration-300 group-hover:scale-110 group-hover:bg-lime/25">
                    <Icon className="h-7 w-7" aria-hidden="true" />
                  </span>
                  <h3 className="text-base font-extrabold uppercase tracking-tight text-white sm:text-lg">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/65">
                    {step.description}
                  </p>
                </article>
              </div>
            );
          })}

          <div
            className={`flex justify-center pt-2 ${isVisible ? "process-animate-in" : "process-animate-hidden"}`}
            style={{ animationDelay: "680ms" }}
          >
            <div className="process-wow-badge flex h-40 w-40 rotate-12 flex-col items-center justify-center rounded-full border-4 border-double border-lime bg-navy-light p-4 text-center shadow-xl sm:h-44 sm:w-44 sm:p-5">
              <span className="text-xl font-extrabold uppercase leading-none tracking-tight text-lime sm:text-2xl">
                Wow!
              </span>
              <span className="mt-1.5 max-w-[8rem] text-xs font-bold uppercase leading-snug text-white sm:mt-2 sm:text-sm">
                Zusagen halten wir!
              </span>
            </div>
          </div>
        </div>

        {/* Desktop: horizontal flow */}
        <div className="relative mt-12 hidden items-center gap-3 lg:flex lg:pl-10">
          {PROCESS_STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.id}
                className={`process-step-desktop relative flex flex-1 items-stretch ${isVisible ? "process-animate-in" : "process-animate-hidden"}`}
                style={{ animationDelay: `${150 + index * 100}ms` }}
              >
                {index === 0 ? (
                  <div
                    className="absolute -left-5 top-1/2 z-10 flex -translate-y-1/2 items-center gap-0.5"
                    aria-hidden="true"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-lime text-sm font-extrabold text-navy transition-transform duration-300 hover:scale-110">
                      1
                    </span>
                    <span className="process-arrow text-2xl font-extrabold leading-none text-lime">
                      →
                    </span>
                  </div>
                ) : null}

                <article className="process-card group flex w-full flex-col rounded-xl border border-white/15 bg-navy-light/30 p-6 text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-lime/40 hover:bg-navy-light/60 hover:shadow-[0_12px_40px_rgba(200,240,38,0.08)]">
                  <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-lime/15 text-lime transition-all duration-300 group-hover:scale-110 group-hover:bg-lime/25 group-hover:shadow-[0_0_24px_rgba(200,240,38,0.2)]">
                    <Icon className="h-7 w-7 transition-transform duration-300 group-hover:scale-105" aria-hidden="true" />
                  </span>
                  <h3 className="text-base font-extrabold uppercase tracking-tight text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/65">
                    {step.description}
                  </p>
                </article>

                {index < PROCESS_STEPS.length - 1 ? (
                  <div
                    className="absolute -right-5 top-1/2 z-10 flex -translate-y-1/2 items-center gap-0.5"
                    aria-hidden="true"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-lime text-sm font-extrabold text-navy transition-transform duration-300 hover:scale-110">
                      {step.id + 1}
                    </span>
                    <span className="process-arrow text-2xl font-extrabold leading-none text-lime">
                      →
                    </span>
                  </div>
                ) : null}
              </div>
            );
          })}

          <div
            className={`ml-4 shrink-0 ${isVisible ? "process-animate-in" : "process-animate-hidden"}`}
            style={{ animationDelay: "550ms" }}
          >
            <div className="process-wow-badge flex h-36 w-36 rotate-12 flex-col items-center justify-center rounded-full border-4 border-double border-lime bg-navy-light p-4 text-center shadow-xl">
              <span className="text-xl font-extrabold uppercase leading-none tracking-tight text-lime">
                Wow!
              </span>
              <span className="mt-1 max-w-[6.5rem] text-xs font-bold uppercase leading-snug text-white">
                Zusagen halten wir!
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
