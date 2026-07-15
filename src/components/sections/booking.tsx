"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { DayPicker, type DateRange, type Matcher } from "react-day-picker";
import { format, parseISO, subDays, startOfToday } from "date-fns";
import { es } from "date-fns/locale";
import "react-day-picker/style.css";
import {
  CalendarDays, Tag, MessageCircle, BadgePercent, CreditCard, Loader2, ShieldCheck,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { ROOMS } from "@/lib/data";
import { computeQuote, formatEuro, type RoomKey } from "@/lib/pricing";
import { site } from "@/lib/site";

function fmt(d: Date): string {
  return format(d, "yyyy-MM-dd");
}

export function Booking() {
  const t = useTranslations("booking");
  const tr = useTranslations("rooms");

  const [room, setRoom] = useState<RoomKey | "">("");
  const [range, setRange] = useState<DateRange | undefined>();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [booked, setBooked] = useState<{ from: string; to: string }[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [months, setMonths] = useState(1);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setMonths(mq.matches ? 2 : 1);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Preselección desde las tarjetas de habitación
  useEffect(() => {
    function onSelect(e: Event) {
      setRoom((e as CustomEvent).detail as RoomKey);
    }
    window.addEventListener("select-room", onSelect);
    return () => window.removeEventListener("select-room", onSelect);
  }, []);

  // Cargar disponibilidad al cambiar de alojamiento
  const loadAvailability = useCallback(async (r: RoomKey) => {
    try {
      const res = await fetch(`/api/availability?room=${r}`, { cache: "no-store" });
      const data = await res.json();
      setBooked(Array.isArray(data.ranges) ? data.ranges : []);
    } catch {
      setBooked([]);
    }
  }, []);

  useEffect(() => {
    setError(null);
    if (room) loadAvailability(room);
    else setBooked([]);
  }, [room, loadAvailability]);

  const checkIn = range?.from ? fmt(range.from) : "";
  const checkOut = range?.to ? fmt(range.to) : "";
  const quote = useMemo(() => {
    if (!room || !checkIn || !checkOut) return null;
    return computeQuote(room, checkIn, checkOut);
  }, [room, checkIn, checkOut]);

  // Fechas deshabilitadas: pasadas + noches ocupadas
  const disabled = useMemo(() => {
    const matchers: Matcher[] = [{ before: startOfToday() }];
    for (const b of booked) {
      matchers.push({ from: parseISO(b.from), to: subDays(parseISO(b.to), 1) });
    }
    return matchers;
  }, [booked]);

  async function pay() {
    setError(null);
    if (!room) return setError(t("selectRoom"));
    if (!quote) return setError(t("selectDates"));
    if (!name.trim() || !email.trim()) return setError(t("needInfo"));

    setSubmitting(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ room, checkIn, checkOut, name, email }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.url) {
          window.location.href = data.url;
          return;
        }
        setError(t("checkoutError"));
      } else if (res.status === 409) {
        setError(t("unavailable"));
        if (room) loadAvailability(room);
        setRange(undefined);
      } else if (res.status === 503) {
        setError(t("notConfigured"));
      } else {
        setError(t("checkoutError"));
      }
    } catch {
      setError(t("checkoutError"));
    } finally {
      setSubmitting(false);
    }
  }

  function whatsapp() {
    let msg = t("waHello");
    if (room) msg += ` "${tr(`items.${room}.name`)}"`;
    if (quote) {
      msg += ` (${checkIn} → ${checkOut}, ${formatEuro(quote.total)})`;
    }
    window.open(`${site.whatsappUrl}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
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
          <div className="mx-auto mt-10 max-w-5xl overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-piedra/60">
            <div className="grid lg:grid-cols-5">
              {/* Formulario + calendario */}
              <div className="p-6 md:p-8 lg:col-span-3">
                <label className="block text-sm font-semibold text-pizarra">{t("room")}</label>
                <select
                  value={room}
                  onChange={(e) => {
                    setRoom(e.target.value as RoomKey);
                    setRange(undefined);
                  }}
                  className="mt-2 w-full rounded-xl border border-piedra bg-crema/40 px-4 py-3 text-tinta outline-none transition focus:border-terracota focus:ring-2 focus:ring-terracota/30"
                >
                  <option value="">{t("selectRoom")}</option>
                  {ROOMS.map((r) => (
                    <option key={r.key} value={r.key}>
                      {tr(`items.${r.key}.name`)}
                    </option>
                  ))}
                </select>

                <p className="mb-2 mt-5 text-sm font-semibold text-pizarra">{t("selectDates")}</p>
                <div className="rdp-brand rounded-2xl border border-piedra bg-crema/30 p-2">
                  <DayPicker
                    mode="range"
                    selected={range}
                    onSelect={(r) => setRange(r)}
                    disabled={disabled}
                    excludeDisabled
                    numberOfMonths={months}
                    weekStartsOn={1}
                    locale={es}
                  />
                </div>

                <div className="mt-3 flex items-center gap-2 text-xs text-tinta/55">
                  <span className="inline-block h-3 w-3 rounded-sm bg-piedra" />
                  {t("legendUnavailable")}
                </div>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-semibold text-pizarra">{t("yourName")}</label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="mt-2 w-full rounded-xl border border-piedra bg-crema/40 px-4 py-3 text-tinta outline-none transition focus:border-terracota focus:ring-2 focus:ring-terracota/30"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-pizarra">{t("yourEmail")}</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-2 w-full rounded-xl border border-piedra bg-crema/40 px-4 py-3 text-tinta outline-none transition focus:border-terracota focus:ring-2 focus:ring-terracota/30"
                    />
                  </div>
                </div>
              </div>

              {/* Resumen + pago */}
              <div className="flex flex-col justify-between bg-bosque p-6 text-crema md:p-8 lg:col-span-2">
                <div>
                  <div className="flex items-center gap-2 text-ocre">
                    <Tag className="h-5 w-5" />
                    <span className="text-sm font-semibold uppercase tracking-wide">{t("total")}</span>
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
                      {quote.discountLabel !== "none" && (
                        <div className="flex items-center justify-between text-ocre">
                          <span className="flex items-center gap-1.5">
                            <BadgePercent className="h-4 w-4" />
                            {quote.discountLabel === "month" ? t("discountMonth") : t("discountWeek")}
                          </span>
                          <span>−{formatEuro(quote.discountAmount)}</span>
                        </div>
                      )}
                      <div className="mt-2 flex items-end justify-between border-t border-crema/20 pt-3">
                        <span className="text-sm text-crema/80">{t("total")}</span>
                        <span className="font-serif text-3xl font-semibold">{formatEuro(quote.total)}</span>
                      </div>
                    </div>
                  )}

                  {error && (
                    <p className="mt-4 rounded-xl bg-terracota/20 px-3 py-2 text-sm text-crema">{error}</p>
                  )}
                </div>

                <div className="mt-7 space-y-3">
                  <button
                    onClick={pay}
                    disabled={submitting}
                    className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        {t("processing")}
                      </>
                    ) : (
                      <>
                        <CreditCard className="h-4 w-4" />
                        {t("pay")}
                      </>
                    )}
                  </button>
                  <button onClick={whatsapp} className="btn-light w-full">
                    <MessageCircle className="h-4 w-4" />
                    {t("orWhatsapp")}
                  </button>
                  <p className="flex items-center justify-center gap-1.5 pt-1 text-center text-xs text-crema/60">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    {t("securePayment")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
