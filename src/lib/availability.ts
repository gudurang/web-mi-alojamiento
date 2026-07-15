import { sql, ensureSchema } from "./db";
import type { RoomKey } from "./pricing";

export interface DateRangeStr {
  from: string; // check_in  (YYYY-MM-DD) — inclusive
  to: string; //   check_out (YYYY-MM-DD) — exclusivo (día de salida libre)
}

// Reglas de bloqueo cruzado:
// - Reservar la casa completa bloquea las 3 habitaciones.
// - Reservar cualquier habitación bloquea la casa completa.
// "Activa" = pagada, o pendiente creada en los últimos 30 min (mientras paga).

// Rangos ocupados que afectan a la disponibilidad de `room`.
export async function getBookedRanges(room: RoomKey): Promise<DateRangeStr[]> {
  if (!sql) return [];
  await ensureSchema();

  const rows =
    room === "casa"
      ? ((await sql`
          SELECT check_in::text AS check_in, check_out::text AS check_out FROM bookings
          WHERE (status = 'paid' OR (status = 'pending' AND created_at > now() - interval '30 minutes'))
            AND check_out > CURRENT_DATE
        `) as { check_in: string; check_out: string }[])
      : ((await sql`
          SELECT check_in::text AS check_in, check_out::text AS check_out FROM bookings
          WHERE (room = ${room} OR room = 'casa')
            AND (status = 'paid' OR (status = 'pending' AND created_at > now() - interval '30 minutes'))
            AND check_out > CURRENT_DATE
        `) as { check_in: string; check_out: string }[]);

  return rows.map((r) => ({ from: String(r.check_in).slice(0, 10), to: String(r.check_out).slice(0, 10) }));
}

// ¿Está libre el rango [checkIn, checkOut) para `room`?
export async function isAvailable(
  room: RoomKey,
  checkIn: string,
  checkOut: string
): Promise<boolean> {
  if (!sql) return true; // Sin BD configurada aún, no se bloquea.
  await ensureSchema();

  const rows =
    room === "casa"
      ? ((await sql`
          SELECT 1 FROM bookings
          WHERE (status = 'paid' OR (status = 'pending' AND created_at > now() - interval '30 minutes'))
            AND ${checkIn}::date < check_out
            AND check_in < ${checkOut}::date
          LIMIT 1
        `) as unknown[])
      : ((await sql`
          SELECT 1 FROM bookings
          WHERE (room = ${room} OR room = 'casa')
            AND (status = 'paid' OR (status = 'pending' AND created_at > now() - interval '30 minutes'))
            AND ${checkIn}::date < check_out
            AND check_in < ${checkOut}::date
          LIMIT 1
        `) as unknown[]);

  return rows.length === 0;
}
