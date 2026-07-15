"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  Mountain, Waves, Landmark, UtensilsCrossed, Bike, Sparkles, type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { ENVIRONMENT } from "@/lib/data";

const ICONS: Record<string, LucideIcon> = {
  hiking: Mountain,
  pools: Waves,
  villages: Landmark,
  food: UtensilsCrossed,
  bikes: Bike,
  stars: Sparkles,
};

export function Environment() {
  const t = useTranslations("environment");

  return (
    <section id="entorno" className="scroll-mt-20 bg-crema-light py-14 md:py-20">
      <div className="container-x">
        {/* Banner con imagen */}
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl shadow-lg">
            <div className="relative aspect-[21/9] w-full">
              <Image
                src="/images/entorno.webp"
                alt="Sierra de Gredos"
                fill
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-pizarra/80 via-pizarra/25 to-transparent" />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-7 md:p-12">
              <span className="kicker text-ocre">{t("kicker")}</span>
              <h2 className="mt-2 max-w-2xl font-serif text-3xl font-semibold text-white drop-shadow sm:text-4xl md:text-5xl">
                {t("title")}
              </h2>
              <p className="mt-3 max-w-xl text-white/90 drop-shadow">{t("subtitle")}</p>
            </div>
          </div>
        </Reveal>

        {/* Tarjetas */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ENVIRONMENT.map((key, i) => {
            const Icon = ICONS[key];
            return (
              <Reveal key={key} delay={i % 3}>
                <div className="group h-full rounded-3xl border border-piedra/70 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-terracota/40 hover:shadow-lg">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-bosque/10 text-bosque transition-colors group-hover:bg-terracota/15 group-hover:text-terracota">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 font-serif text-xl font-semibold text-pizarra">
                    {t(`items.${key}.title`)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-tinta/70">
                    {t(`items.${key}.desc`)}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
