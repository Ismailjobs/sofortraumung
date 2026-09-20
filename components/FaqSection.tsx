"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FAQ_ITEMS } from "@/lib/data";

export default function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0]?.id ?? null);

  const toggle = (id: string): void => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="bg-navy-light py-16 lg:py-20">
      <div className="site-container">
        <div className="mx-auto max-w-4xl">
        <p className="text-center text-sm font-semibold uppercase tracking-tight text-lime">
          FAQ
        </p>
        <h2 className="mt-2 text-center text-2xl font-extrabold uppercase tracking-tight text-white sm:text-3xl">
          Häufig gestellte Fragen
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-sm leading-relaxed text-white/65">
          Antworten zu Entrümpelung, Fixpreis, Wertanrechnung, besenreiner
          Übergabe und Entsorgung in Wien & Niederösterreich.
        </p>

        <div className="mt-10 space-y-3">
          {FAQ_ITEMS.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className="overflow-hidden rounded-xl border border-white/15 bg-navy"
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={isOpen}
                  onClick={() => toggle(item.id)}
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
                  <div className="border-t border-white/10 px-5 pb-5 pt-3">
                    <p className="text-sm leading-relaxed text-white/70">
                      {item.answer}
                    </p>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
        </div>
      </div>
    </section>
  );
}
