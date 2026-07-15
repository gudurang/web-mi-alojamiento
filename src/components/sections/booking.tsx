"use client";

import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { CalendarDays, Tag, MessageCircle, BadgePercent, Info } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { ROOMS } from "@/lib/data";
import { computeQuote, formatEuro, type RoomKey } from "@/lib/pricing";
import { site } from "@/lib/site";

function todayStr() {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

export function Booking() {
  const t = useTranslations("booking");
  const tr = useTranslations("rooms");

  const [room, setRoom] = useState<RoomKey | "">("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  useEffect(() => {
    function onSelect(e: Event) {
      const key = (e as CustomEvent).detail as RoomKey;
      setRoom(key);
    }
    window.addEventListener("select-room", onSelect);
    return () => window.removeEventListener("select-room", onSelect);
  }, []);

  const quote = useMemo(() => {
    if (!room) return null;
    return computeQuote(room, checkIn, checkOut);
  }, [room, checkIn, checkOut]);

  const datesInvalid =
    checkIn && checkOut && new Date(checkOut) <= new Date(checkIn);

  function requestBooking() {
    if (!room) return;
    const name = tr(`items.${room}.name`);
    let msg = `Hola Laura, me gustaría reservar "${name}" en El Rincón de Gredos.`;
    if (checkIn && checkOut && quote) {
      msg += ` Fechas: ${checkIn} → ${checkOut} (${quote.nights} noches). Total estimado: ${formatEuro(quote.total)}.`;
    }
    window.open(
      `${site.whatsappUrl}?text=${encodeURIComponent(msg)}`,
      "_blank",
      "noopener"
    );
  }

  return (
    <section id="reservas" className="scroll-mt-20 bg-crema py-14 md:py-20">
      <div className="container-x">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="kicker">{t("kicker")}</span>
            <h2 className="section-title">{t("title")}</h2>
            <p className="mt-4 text-lg text-tinta/75">{t("subtitle")}</p>
          </div>
        </Reveal>

        <Reveal>
          <div className="mx-auto mt-12 max-w-4xl overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-piedra/60">
            <div className="grid md:grid-cols-5">
              {/* Formulario */}
              <div className="p-7 md:col-span-3 md:p-9">
                {/* Habitación */}
                <label className="block text-sm font-semibold text-pizarra">
                  {t("room")}
                </label>
                <select
                  value={room}
                  onChange={(e) => setRoom(e.target.value as RoomKey)}
                  className="mt-2 w-full rounded-xl border border-piedra bg-crema/40 px-4 py-3 text-tinta outline-none transition focus:border-terracota focus:ring-2 focus:ring-terracota/30"
                >
                  <option value="">{t("selectRoom")}</option>
                  {ROOMS.map((r) => (
                    <option key={r.key} value={r.key}>
                      {tr(`items.${r.key}.name`)}
                    </option>
                  ))}
                </select>

                {/* Fechas */}
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-semibold text-pizarra">
                      {t("checkIn")}
                    </label>
                    <input
                      type="date"
                      min={todayStr()}
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="mt-2 w-full rounded-xl border border-piedra bg-crema/40 px-4 py-3 text-tinta outline-none transition focus:border-terracota focus:ring-2 focus:ring-terracota/30"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-pizarra">
                      {t("checkOut")}
                    </label>
                    <input
                      type="date"
                      min={checkIn || todayStr()}
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="mt-2 w-full rounded-xl border border-piedra bg-crema/40 px-4 py-3 text-tinta outline-none transition focus:border-terracota focus:ring-2 focus:ring-terracota/30"
                    />
                  </div>
                </div>

                {datesInvalid && (
                  <p className="mt-3 text-sm font-medium text-terracota-dark">
                    {t("invalidDates")}
                  </p>
                )}
              </div>

              {/* Resumen */}
              <div className="flex flex-col justify-between bg-bosque p-7 text-crema md:col-span-2 md:p-9">
                <div>
                  <div className="flex items-center gap-2 text-ocre">
                    <Tag className="h-5 w-5" />
                    <span className="text-sm font-semibold uppercase tracking-wide">
                      {t("total")}
                    </span>
                  </div>

                  {!quote ? (
                    <p className="mt-6 text-sm text-crema/70">{t("empty")}</p>
                  ) : (
                    <div className="mt-5 space-y-3 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-crema/80">
                          <CalendarDays className="h-4 w-4" />
                          {t("nights", { count: quote.nights })}
                        </span>
                        <span>{formatEuro(quote.subtotal)}</span>
                      </div>

                      {quote.weekdayNights > 0 && (
                        <div className="flex justify-between text-xs text-crema/60">
                          <span>{t("weekdayNights", { count: quote.weekdayNights })}</span>
                        </div>
                      )}
                      {quote.weekendNights > 0 && (
                        <div className="flex justify-between text-xs text-crema/60">
                          <span>{t("weekendNights", { count: quote.weekendNights })}</span>
                        </div>
                      )}

                      {quote.discountLabel !== "none" && (
                        <div className="flex items-center justify-between text-ocre">
                          <span className="flex items-center gap-1.5">
                            <BadgePercent className="h-4 w-4" />
                            {quote.discountLabel === "month"
                              ? t("discountMonth")
                              : t("discountWeek")}
                          </span>
                          <span>−{formatEuro(quote.discountAmount)}</span>
                        </div>
                      )}

                      <div className="mt-2 flex items-end justify-between border-t border-crema/20 pt-3">
                        <span className="text-sm text-crema/80">{t("total")}</span>
                        <span className="font-serif text-3xl font-semibold">
                          {formatEuro(quote.total)}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <button
                  onClick={requestBooking}
                  disabled={!room || !!datesInvalid}
                  className="btn-light mt-7 w-full disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <MessageCircle className="h-4 w-4" />
                  {t("cta")}
                </button>
              </div>
            </div>

            {/* Nota Fase 2 */}
            <div className="flex items-start gap-2.5 border-t border-piedra/60 bg-crema-light px-7 py-4 text-sm text-tinta/70 md:px-9">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-terracota" />
              <p>{t("note")}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
