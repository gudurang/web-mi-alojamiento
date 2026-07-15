import { getTranslations, setRequestLocale } from "next-intl/server";
import { CheckCircle2 } from "lucide-react";
import { Link } from "@/i18n/routing";
import { sql } from "@/lib/db";
import { formatEuro, type RoomKey } from "@/lib/pricing";

// Se renderiza en cada visita para leer la reserva por su id (?b=...).
export const dynamic = "force-dynamic";

const ROOM_NAMES: Record<string, string> = {
  serrana: "La Serrana",
  mirador: "El Mirador",
  alcoba: "La Alcoba del Fuego",
  casa: "Casa completa",
};

interface BookingRow {
  id: string;
  room: RoomKey;
  check_in: string;
  check_out: string;
  nights: number;
  total_cents: number;
}

export default async function ReservaConfirmada({
  params: { locale },
  searchParams,
}: {
  params: { locale: string };
  searchParams: { b?: string };
}) {
  setRequestLocale(locale);
  const t = await getTranslations("confirmation");

  let booking: BookingRow | null = null;
  const id = searchParams?.b;
  if (id && sql) {
    try {
      const rows = (await sql`SELECT * FROM bookings WHERE id = ${id} LIMIT 1`) as BookingRow[];
      booking = rows[0] ?? null;
    } catch {
      booking = null;
    }
  }

  return (
    <section className="flex min-h-[80vh] items-center justify-center bg-crema px-5 py-28">
      <div className="w-full max-w-lg rounded-3xl bg-white p-8 text-center shadow-xl ring-1 ring-piedra/60 md:p-12">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-bosque/10 text-bosque">
          <CheckCircle2 className="h-11 w-11" />
        </div>
        <h1 className="mt-6 font-serif text-3xl font-semibold text-pizarra">{t("title")}</h1>
        <p className="mx-auto mt-3 max-w-sm text-tinta/75">{t("subtitle")}</p>

        {booking && (
          <div className="mt-7 space-y-2 rounded-2xl bg-crema-light p-5 text-left text-sm">
            <div className="flex justify-between">
              <span className="text-tinta/60">{t("room")}</span>
              <span className="font-medium text-pizarra">
                {ROOM_NAMES[booking.room] ?? booking.room}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-tinta/60">{t("dates")}</span>
              <span className="font-medium text-pizarra">
                {booking.check_in} → {booking.check_out}
              </span>
            </div>
            <div className="flex justify-between border-t border-piedra/60 pt-2">
              <span className="text-tinta/60">{t("total")}</span>
              <span className="font-semibold text-terracota-dark">
                {formatEuro(booking.total_cents / 100)}
              </span>
            </div>
            <div className="pt-1 text-center text-xs text-tinta/40">
              {t("ref")}: {booking.id.slice(0, 8).toUpperCase()}
            </div>
          </div>
        )}

        <Link href="/" className="btn-primary mt-8 w-full">
          {t("back")}
        </Link>
      </div>
    </section>
  );
}
