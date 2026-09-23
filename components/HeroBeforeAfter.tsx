"use client";

import {
  useCallback,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const DRAG_THRESHOLD_PX = 10;

type DragMode = "pending" | "horizontal" | "vertical";

interface DragState {
  pointerId: number;
  startX: number;
  startY: number;
  mode: DragMode;
}

export default function HeroBeforeAfter() {
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
        <Image
          src="/images/hero-before.webp"
          alt="Vorher: chaotischer Raum"
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
          fetchPriority="high"
        />
        <div className="pointer-events-none absolute left-3 top-3 rounded bg-black/50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-white/90">
          Vorher
        </div>
      </div>

      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 0 0 ${sliderPos}%)` }}
      >
        <Image
          src="/images/hero-after.webp"
          alt="Nachher: sauberer Raum"
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
          loading="lazy"
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
  );
}
