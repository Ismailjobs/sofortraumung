"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import LinkifiedText from "@/components/LinkifiedText";
import type { ServiceFaqItem } from "@/types/service-content";

interface ServiceFaqProps {
  items: ServiceFaqItem[];
  title?: string;
}

export default function ServiceFaq({
  items,
  title = "Häufige Fragen zu dieser Leistung",
}: ServiceFaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="mt-10 rounded-xl border border-white/15 bg-navy-light p-5 sm:p-6">
      <h2 className="text-xl font-extrabold uppercase tracking-tight text-white">
        {title}
      </h2>
      <div className="mt-5 space-y-2">
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
                    <LinkifiedText text={item.answer} />
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
