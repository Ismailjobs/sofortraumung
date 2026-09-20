"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { RatgeberFaqItem } from "@/types/ratgeber";

interface ArticleFaqProps {
  items: RatgeberFaqItem[];
}

export default function ArticleFaq({ items }: ArticleFaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="rounded-xl border border-white/15 bg-navy-light p-5 sm:p-6">
      <p className="text-xs font-semibold uppercase tracking-tight text-lime">
        Fragen & Antworten
      </p>
      <h2 className="mt-1 text-xl font-extrabold uppercase tracking-tight text-white">
        Häufige Fragen
      </h2>
      <p className="mt-2 text-sm text-white/60">
        Kurz und klar — Details klären wir gern in der kostenlosen Besichtigung.
      </p>
      <div className="mt-6 space-y-2">
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={item.question}
              className="overflow-hidden rounded-lg border border-white/10 bg-navy"
            >
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 px-4 py-3.5 text-left"
                aria-expanded={isOpen}
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                <span className="text-sm font-bold text-white sm:text-base">
                  {item.question}
                </span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-lime transition ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>
              {isOpen ? (
                <div className="border-t border-white/10 px-4 pb-4 pt-3">
                  <p className="text-sm leading-relaxed text-white/72">
                    {item.answer}
                  </p>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}
