import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { sql, ensureSchema } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Webhook de Stripe: confirma el pago y marca la reserva como pagada.
export async function POST(req: NextRequest) {
  const key = process.env.STRIPE_SECRET_KEY;
  const whSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!key || !whSecret) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  const stripe = new Stripe(key);
  const rawBody = await req.text();
  const signature = req.headers.get("stripe-signature") || "";

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, whSecret);
  } catch (e) {
    console.error("webhook signature error", e);
    return NextResponse.json({ error: "bad_signature" }, { status: 400 });
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const bookingId = session.metadata?.bookingId;
      if (bookingId && sql) {
        await ensureSchema();
        await sql`UPDATE bookings SET status = 'paid' WHERE id = ${bookingId}`;
      }
    } else if (
      event.type === "checkout.session.expired" ||
      event.type === "checkout.session.async_payment_failed"
    ) {
      const session = event.data.object as Stripe.Checkout.Session;
      const bookingId = session.metadata?.bookingId;
      if (bookingId && sql) {
        await ensureSchema();
        // Libera las fechas si el pago no se completó.
        await sql`DELETE FROM bookings WHERE id = ${bookingId} AND status = 'pending'`;
      }
    }
  } catch (e) {
    console.error("webhook handling error", e);
    return NextResponse.json({ error: "handler_error" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
