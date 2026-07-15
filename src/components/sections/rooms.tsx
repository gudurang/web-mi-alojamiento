"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Users, Moon, Sun, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { ROOMS } from "@/lib/data";
import { formatEuro } from "@/lib/pricing";
import { scrollToId } from "@/lib/scroll";

function selectRoom(key: string) {
  window.dispatchEvent(new CustomEvent("select-room", { detail: key }));
  scrollToId("reservas", true);
  window.setTimeout(() => scrollToId("reservas", false), 700);
}

export function Rooms() {
  const t = useTranslations("rooms");
  const rooms = ROOMS.filter((r) => !r.whole);
  const casa = ROOMS.find((r) => r.whole)!;

  return (
    <section id="habitaciones" className="scroll-mt-20 bg-crema-light py-20 md:py-28">
      <div className="container-x">
        <Reveal>
          <div className="max-w-2xl">
            <span className="kicker">{t("kicker")}</span>
            <h2 className="section-title">{t("title")}</h2>
            <p className="mt-4 text-lg text-tinta/75">{t("subtitle")}</p>
          </div>
        </Reveal>

        {/* Tarjetas de habitación */}
        <div className="mt-12 grid gap-7 md:grid-cols-3">
          {rooms.map((room, i) => (
            <Reveal key={room.key} delay={i}>
              <article className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-piedra/60 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={room.image}
                    alt={t(`items.${room.key}.name`)}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-pizarra/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-crema/95 px-3 py-1 text-xs font-semibold text-pizarra shadow">
                    <Users className="h-3.5 w-3.5" />
                    {t("capacity", { count: room.capacity })}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-serif text-2xl font-semibold text-pizarra">
                    {t(`items.${room.key}.name`)}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-terracota">
                    {t(`items.${room.key}.tagline`)}
                  </p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-tinta/70">
                    {t(`items.${room.key}.description`)}
                  </p>

                  {/* Precios */}
                  <div className="mt-5 flex items-center gap-4 border-t border-piedra/60 pt-4">
                    <div className="flex items-center gap-1.5">
                      <Moon className="h-4 w-4 text-bosque" />
                      <span className="text-xs text-tinta/60">{t("weekday")}</span>
                      <span className="font-semibold text-pizarra">
                        {formatEuro(room.weekday)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Sun className="h-4 w-4 text-ocre" />
                      <span className="text-xs text-tinta/60">{t("weekend")}</span>
                      <span className="font-semibold text-pizarra">
                        {formatEuro(room.weekend)}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => selectRoom(room.key)}
                    className="btn-outline mt-5 w-full"
                  >
                    {t("bookRoom")}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Casa completa */}
        <Reveal>
          <div className="mt-8 grid overflow-hidden rounded-3xl bg-bosque text-crema shadow-lg md:grid-cols-2">
            <div className="relative min-h-[240px] overflow-hidden">
              <Image
                src={casa.image}
                alt={t("items.casa.name")}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              <span className="absolute left-4 top-4 rounded-full bg-terracota px-3 py-1 text-xs font-semibold text-crema shadow">
                {t("wholeHouseBadge")}
              </span>
            </div>
            <div className="flex flex-col justify-center p-8 md:p-10">
              <h3 className="font-serif text-3xl font-semibold">{t("items.casa.name")}</h3>
              <p className="mt-1 text-sm font-medium text-ocre">{t("items.casa.tagline")}</p>
              <p className="mt-4 text-crema/85">{t("items.casa.description")}</p>
              <div className="mt-6 flex flex-wrap items-center gap-5">
                <div className="flex items-center gap-1.5">
                  <Users className="h-4 w-4 text-ocre" />
                  <span className="text-sm text-crema/80">
                    {t("capacity", { count: casa.capacity })}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Moon className="h-4 w-4 text-ocre" />
                  <span className="text-sm text-crema/80">{t("weekday")}</span>
                  <span className="font-semibold">{formatEuro(casa.weekday)}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Sun className="h-4 w-4 text-ocre" />
                  <span className="text-sm text-crema/80">{t("weekend")}</span>
                  <span className="font-semibold">{formatEuro(casa.weekend)}</span>
                </div>
              </div>
              <button
                onClick={() => selectRoom(casa.key)}
                className="btn-light mt-7 w-full sm:w-auto sm:self-start sm:px-8"
              >
                {t("bookRoom")}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
