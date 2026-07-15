import { neon } from "@neondatabase/serverless";

// Conexión a Postgres (Neon). Se configura con DATABASE_URL en Vercel.
const url = process.env.DATABASE_URL || process.env.POSTGRES_URL;

export const dbConfigured = Boolean(url);
export const sql = url ? neon(url) : null;

let schemaReady = false;

// Crea la tabla de reservas si no existe (idempotente).
export async function ensureSchema(): Promise<void> {
  if (!sql || schemaReady) return;
  await sql`
    CREATE TABLE IF NOT EXISTS bookings (
      id TEXT PRIMARY KEY,
      room TEXT NOT NULL,
      check_in DATE NOT NULL,
      check_out DATE NOT NULL,
      guest_name TEXT,
      guest_email TEXT,
      nights INT NOT NULL,
      total_cents INT NOT NULL,
      currency TEXT NOT NULL DEFAULT 'eur',
      status TEXT NOT NULL DEFAULT 'pending',
      stripe_session_id TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
  schemaReady = true;
}
