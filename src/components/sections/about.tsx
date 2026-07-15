"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  Coffee, Wifi, Car, Flame, Trees, Dog, ChefHat, Beef,
  Snowflake, Shirt, Wind, BedDouble, Bike, type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SERVICES } from "@/lib/data";

const ICONS: Record<string, LucideIcon> = {
  breakfast: Coffee,
  wifi: Wifi,
  parking: Car,
  heating: Flame,
  garden: Trees,
  pets: Dog,
  kitchen: ChefHat,
  bbq: Beef,
  ac: Snowflake,
  iron: Shirt,
  hairdryer: Wind,
  linen: BedDouble,
  bikes: Bike,
};

export function About() {
  const t = useTranslations("about");

  return (
    <section id="la-casa" className="scroll-mt-20 bg-crema py-14 md:py-20">
      <div className="container-x">
        {/* Intro: texto + imagen */}
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
          <Reveal>
            <span className="kicker">{t("kicker")}</span>
            <h2 className="section-title">{t("title")}</h2>
            <p className="mt-5 text-lg leading-relaxed text-tinta/80">{t("p1")}</p>
            <p className="mt-4 text-lg leading-relaxed text-tinta/80">{t("p2")}</p>
          </Reveal>

          <Reveal delay={1}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-xl ring-1 ring-piedra">
              <Image
                src="/images/hotel.webp"
                alt="La casa de piedra de El Rincón de Gredos"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>

        {/* Anfitriona */}
        <Reveal>
          <div className="mt-14 flex flex-col items-center gap-6 rounded-3xl bg-bosque/5 p-7 ring-1 ring-bosque/10 sm:flex-row sm:gap-8 md:mt-20 md:p-10">
            <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-full ring-4 ring-crema shadow-lg sm:h-32 sm:w-32">
              <Image
                src="/images/laura.webp"
                alt={t("hostName")}
                fill
                sizes="128px"
                className="object-cover"
              />
            </div>
            <div className="text-center sm:text-left">
              <p className="font-serif text-xl italic leading-relaxed text-pizarra sm:text-2xl">
                “{t("hostQuote")}”
              </p>
              <p className="mt-3 font-semibold text-terracota">
                {t("hostName")}
                <span className="ml-2 font-normal text-tinta/60">· {t("hostRole")}</span>
              </p>
            </div>
          </div>
        </Reveal>

        {/* Servicios */}
        <div className="mt-16 md:mt-24">
          <Reveal>
            <div className="text-center">
              <h3 className="font-serif text-2xl font-semibold text-pizarra sm:text-3xl">
                {t("servicesTitle")}
              </h3>
              <p className="mx-auto mt-3 max-w-xl text-tinta/70">{t("servicesSubtitle")}</p>
            </div>
          </Reveal>

          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {SERVICES.map((key, i) => {
              const Icon = ICONS[key];
              return (
                <Reveal key={key} delay={i % 4}>
                  <div className="group flex items-center gap-3 rounded-2xl border border-piedra/70 bg-white/60 px-4 py-3.5 transition-all hover:border-terracota/40 hover:bg-white hover:shadow-md">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-bosque/10 text-bosque transition-colors group-hover:bg-terracota/15 group-hover:text-terracota">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="text-sm font-medium text-tinta/85">
                      {t(`services.${key}`)}
                    </span>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
