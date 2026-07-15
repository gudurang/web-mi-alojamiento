// Lógica de cálculo de precios — El Rincón de Gredos
// Fase 1: cálculo y muestra del total (sin cobro). Fase 2: Stripe.

export type RoomKey = "serrana" | "mirador" | "alcoba" | "casa";

export interface RoomRate {
  weekday: number; // €/noche entre semana
  weekend: number; // €/noche viernes y sábado
}

export const RATES: Record<RoomKey, RoomRate> = {
  serrana: { weekday: 60, weekend: 90 },
  mirador: { weekday: 70, weekend: 100 },
  alcoba: { weekday: 90, weekend: 120 },
  casa: { weekday: 200, weekend: 300 },
};

// Descuentos automáticos por duración
export const DISCOUNTS = {
  week: { minNights: 7, pct: 0.1 }, // 10% desde 1 semana
  month: { minNights: 28, pct: 0.3 }, // 30% desde 1 mes
};

export interface Quote {
  nights: number;
  weekdayNights: number;
  weekendNights: number;
  subtotal: number;
  discountPct: number;
  discountLabel: "none" | "week" | "month";
  discountAmount: number;
  total: number;
}

// Una noche es "fin de semana" si empieza en viernes (5) o sábado (6)
function isWeekendNight(date: Date): boolean {
  const day = date.getDay();
  return day === 5 || day === 6;
}

/**
 * Calcula el presupuesto de una estancia.
 * @param room habitación o casa completa
 * @param checkIn fecha de entrada (YYYY-MM-DD)
 * @param checkOut fecha de salida (YYYY-MM-DD)
 */
export function computeQuote(
  room: RoomKey,
  checkIn: string,
  checkOut: string
): Quote | null {
  if (!checkIn || !checkOut) return null;

  const start = new Date(checkIn + "T00:00:00");
  const end = new Date(checkOut + "T00:00:00");

  if (isNaN(start.getTime()) || isNaN(end.getTime())) return null;

  const msPerNight = 1000 * 60 * 60 * 24;
  const nights = Math.round((end.getTime() - start.getTime()) / msPerNight);

  if (nights <= 0) return null;

  const rate = RATES[room];

  let weekdayNights = 0;
  let weekendNights = 0;
  let subtotal = 0;

  const cursor = new Date(start);
  for (let i = 0; i < nights; i++) {
    if (isWeekendNight(cursor)) {
      weekendNights++;
      subtotal += rate.weekend;
    } else {
      weekdayNights++;
      subtotal += rate.weekday;
    }
    cursor.setDate(cursor.getDate() + 1);
  }

  // Descuento: se aplica el mayor tramo alcanzado
  let discountPct = 0;
  let discountLabel: Quote["discountLabel"] = "none";
  if (nights >= DISCOUNTS.month.minNights) {
    discountPct = DISCOUNTS.month.pct;
    discountLabel = "month";
  } else if (nights >= DISCOUNTS.week.minNights) {
    discountPct = DISCOUNTS.week.pct;
    discountLabel = "week";
  }

  const discountAmount = Math.round(subtotal * discountPct);
  const total = subtotal - discountAmount;

  return {
    nights,
    weekdayNights,
    weekendNights,
    subtotal,
    discountPct,
    discountLabel,
    discountAmount,
    total,
  };
}

export function formatEuro(amount: number): string {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(amount);
}
