"use client";

import {
  useCallback,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Play, Star } from "lucide-react";
import LocalImage from "@/components/LocalImage";
import { TRUST_ITEMS } from "@/lib/data";

const DRAG_THRESHOLD_PX = 10;

type DragMode = "pending" | "horizontal" | "vertical";

interface DragState {
  pointerId: number;
  startX: number;
  startY: number;
  mode: DragMode;
}

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<DragState | null>(null);
  const [sliderPos, setSliderPos] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const updatePosition = useCallback((clientX: number): void => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setSliderPos(Math.min(95, Math.max(5, next)));
  }, []);

  const resetDrag = useCallback(
    (target: HTMLDivElement, pointerId: number, captured: boolean): void => {
      if (captured) {
        target.releasePointerCapture(pointerId);
      }
      dragRef.current = null;
      setIsDragging(false);
    },
    [],
  );

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>): void => {
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      mode: "pending",
    };
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>): void => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    const deltaX = event.clientX - drag.startX;
    const deltaY = event.clientY - drag.startY;

    if (drag.mode === "pending") {
      if (
        Math.abs(deltaX) < DRAG_THRESHOLD_PX &&
        Math.abs(deltaY) < DRAG_THRESHOLD_PX
      ) {
        return;
      }

      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        dragRef.current = null;
        return;
      }

      drag.mode = "horizontal";
      setIsDragging(true);
      event.currentTarget.setPointerCapture(event.pointerId);
      event.preventDefault();
      updatePosition(event.clientX);
      return;
    }

    if (drag.mode === "horizontal") {
      event.preventDefault();
      updatePosition(event.clientX);
    }
  };

  const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement>): void => {
    const drag = dragRef.current;
    const wasHorizontal = drag?.mode === "horizontal";
    resetDrag(event.currentTarget, event.pointerId, wasHorizontal);
  };

  const handlePointerCancel = (event: ReactPointerEvent<HTMLDivElement>): void => {
    const drag = dragRef.current;
    const wasHorizontal = drag?.mode === "horizontal";
    resetDrag(event.currentTarget, event.pointerId, wasHorizontal);
  };

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

        <div
          ref={containerRef}
          className={`relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-slate-800 select-none touch-pan-y lg:aspect-[5/4] ${
            isDragging ? "cursor-ew-resize touch-none" : "cursor-ew-resize"
          }`}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
          role="img"
          aria-label="Vorher-Nachher Vergleich: Chaos und saubere Wohnung"
        >
          <div className="absolute inset-0">
            <LocalImage
              src="/images/hero-before.webp"
              alt="Vorher: chaotischer Raum"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
              fallbackClassName="bg-slate-800"
            />
            <div className="pointer-events-none absolute left-3 top-3 rounded bg-black/50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-white/90">
              Vorher
            </div>
          </div>

          <div
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: `inset(0 0 0 ${sliderPos}%)` }}
          >
            <LocalImage
              src="/images/hero-after.webp"
              alt="Nachher: sauberer Raum"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
              fallbackClassName="bg-slate-200"
            />
            <div className="pointer-events-none absolute right-3 top-3 rounded bg-black/40 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
              Nachher
            </div>
          </div>

          <div
            className="absolute inset-y-0 z-20 w-0.5 bg-white shadow-lg"
            style={{ left: `${sliderPos}%`, transform: "translateX(-50%)" }}
          >
            <div className="absolute top-1/2 left-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-navy text-white shadow-xl">
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              <ChevronRight className="h-4 w-4 -ml-1" aria-hidden="true" />
            </div>
          </div>
        </div>
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
                    <LocalImage
                      src="/images/google-logo.svg.webp"
                      alt="Google"
                      fill
                      className="object-contain"
                      sizes="36px"
                      fallbackClassName="bg-slate-800"
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
