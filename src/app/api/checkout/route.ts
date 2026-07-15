import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { sql, ensureSchema } from "@/lib/db";
import { isAvailable } from "@/lib/availability";
import { computeQuote, type RoomKey } from "@/lib/pricing";

export const runtime = "nodejs";

const ROOM_NAMES: Record<RoomKey, string> = {
  serrana: "La Serrana",
  mirador: "El Mirador",
  alcoba: "La Alcoba del Fuego",
  casa: "Casa completa",
};

const VALID: RoomKey[] = ["serrana", "mirador", "alcoba", "casa"];

export async function POST(req: NextRequest) {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    return NextResponse.json({ error: "stripe_not_configured" }, { status: 503 });
  }
  if (!sql) {
    return NextResponse.json({ error: "db_not_configured" }, { status: 503 });
  }

  let body: {
    room?: RoomKey;
    checkIn?: string;
    checkOut?: string;
    name?: string;
    email?: string;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  const { room, checkIn, checkOut, name, email } = body;
  if (!room || !VALID.includes(room) || !checkIn || !checkOut) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }

  // El precio SIEMPRE se recalcula en el servidor (no se confía en el cliente).
  const quote = computeQuote(room, checkIn, checkOut);
  if (!quote) {
    return NextResponse.json({ error: "invalid_dates" }, { status: 400 });
  }

  try {
    await ensureSchema();

    // Revalidar disponibilidad justo antes de cobrar.
    if (!(await isAvailable(room, checkIn, checkOut))) {
      return NextResponse.json({ error: "not_available" }, { status: 409 });
    }

    const stripe = new Stripe(key);
    const id = crypto.randomUUID();
    const totalCents = quote.total * 100;

    // Reserva provisional (pending) para bloquear las fechas mientras paga.
    await sql`
      INSERT INTO bookings
        (id, room, check_in, check_out, guest_name, guest_email, nights, total_cents, status)
      VALUES
        (${id}, ${room}, ${checkIn}, ${checkOut}, ${name || null}, ${email || null},
         ${quote.nights}, ${totalCents}, 'pending')
    `;

    const origin = req.headers.get("origin") || new URL(req.url).origin;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: email || undefined,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "eur",
            unit_amount: totalCents,
            product_data: {
              name: `El Rincón de Gredos — ${ROOM_NAMES[room]}`,
              description: `${checkIn} → ${checkOut} · ${quote.nights} noches`,
            },
          },
        },
      ],
      metadata: { bookingId: id, room, checkIn, checkOut },
      success_url: `${origin}/reserva/confirmada?b=${id}`,
      cancel_url: `${origin}/#reservas`,
    });

    await sql`UPDATE bookings SET stripe_session_id = ${session.id} WHERE id = ${id}`;

    return NextResponse.json({ url: session.url });
  } catch (e) {
    console.error("checkout error", e);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
