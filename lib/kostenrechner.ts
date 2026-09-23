export type Objektart = "wohnung" | "keller" | "verlassenschaft" | "gewerbe";
export type Stockwerk = "eg" | "1" | "2" | "3plus";
export type Zustand = "leicht" | "normal" | "stark" | "messie";

export interface PriceRange {
  min: number;
  max: number;
}

export const OBJEKTART_OPTIONS: { id: Objektart; label: string }[] = [
  { id: "wohnung", label: "Wohnung" },
  { id: "keller", label: "Keller / Dachboden" },
  { id: "verlassenschaft", label: "Verlassenschaft" },
  { id: "gewerbe", label: "Büro / Gewerbe" },
];

export const AREA_PRESETS = [30, 50, 75, 100, 150] as const;

export const STOCKWERK_OPTIONS: { id: Stockwerk; label: string }[] = [
  { id: "eg", label: "EG" },
  { id: "1", label: "1. Stock" },
  { id: "2", label: "2. Stock" },
  { id: "3plus", label: "3.+ Stock" },
];

export const ZUSTAND_OPTIONS: { id: Zustand; label: string; sub: string }[] = [
  { id: "leicht", label: "Leicht", sub: "Wenig Inventar" },
  { id: "normal", label: "Normal", sub: "Standard" },
  { id: "stark", label: "Stark beladen", sub: "Voll" },
  { id: "messie", label: "Extrem / Messie", sub: "Spezial" },
];

const BASE_EUR: Record<Objektart, number> = {
  wohnung: 180,
  keller: 120,
  verlassenschaft: 220,
  gewerbe: 260,
};

const EUR_PER_SQM: Record<Objektart, number> = {
  wohnung: 8,
  keller: 5,
  verlassenschaft: 9,
  gewerbe: 7,
};

const FLOOR_SURCHARGE: Record<Stockwerk, number> = {
  eg: 0,
  "1": 40,
  "2": 75,
  "3plus": 115,
};

const ZUSTAND_FACTOR: Record<Zustand, number> = {
  leicht: 0.88,
  normal: 1,
  stark: 1.28,
  messie: 1.65,
};

export function computeEstimate(
  objektart: Objektart,
  flaeche: number,
  stockwerk: Stockwerk,
  aufzug: boolean,
  zustand: Zustand,
): PriceRange {
  const effectiveArea = Math.max(20, flaeche);
  const floorExtra = FLOOR_SURCHARGE[stockwerk] * (aufzug ? 0.2 : 1);

  const subtotal =
    BASE_EUR[objektart] +
    effectiveArea * EUR_PER_SQM[objektart] +
    floorExtra;

  const estimate = subtotal * ZUSTAND_FACTOR[zustand];

  const min = Math.max(150, Math.round((estimate * 0.88) / 10) * 10);
  const max = Math.max(min + 80, Math.round((estimate * 1.14) / 10) * 10);

  return { min, max };
}

export function formatEuro(value: number): string {
  return new Intl.NumberFormat("de-AT", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function getObjektartLabel(id: Objektart): string {
  return OBJEKTART_OPTIONS.find((o) => o.id === id)?.label ?? id;
}

export function getStockwerkLabel(id: Stockwerk): string {
  return STOCKWERK_OPTIONS.find((o) => o.id === id)?.label ?? id;
}

export function getZustandLabel(id: Zustand): string {
  return ZUSTAND_OPTIONS.find((o) => o.id === id)?.label ?? id;
}

export function formatFlaeche(flaeche: number): string {
  return flaeche >= 150 ? "150+ m²" : `${flaeche} m²`;
}
