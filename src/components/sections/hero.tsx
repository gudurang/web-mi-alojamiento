"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { MapPin, ChevronDown } from "lucide-react";

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section id="inicio" className="relative h-[100svh] min-h-[600px] w-full overflow-hidden">
      {/* Fondo */}
      <div className="absolute inset-0">
        <Image
          src="/images/paisaje.webp"
          alt="Valle de la Sierra de Gredos al amanecer"
          fill
          priority
          sizes="100vw"
          className="animate-kenburns object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-pizarra/50 via-pizarra/20 to-pizarra/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-crema/20 to-transparent" />
      </div>

      {/* Contenido */}
      <div className="container-x relative z-10 flex h-full flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-sm"
        >
          <MapPin className="h-3.5 w-3.5" />
          {t("kicker")}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.12 }}
          className="mt-6 max-w-4xl font-serif text-5xl font-semibold leading-[1.05] text-white drop-shadow-lg sm:text-6xl md:text-7xl lg:text-8xl"
        >
          {t("title")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.28 }}
          className="mt-6 max-w-2xl text-lg font-light text-white/95 drop-shadow sm:text-xl md:text-2xl"
        >
          {t("subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.44 }}
          className="mt-9 flex flex-col items-center gap-3 sm:flex-row"
        >
          <a href="#reservas" className="btn-primary px-8 py-3.5 text-base">
            {t("cta")}
          </a>
          <a href="#habitaciones" className="btn-light px-8 py-3.5 text-base">
            {t("cta2")}
          </a>
        </motion.div>
      </div>

      {/* Indicador de scroll */}
      <motion.a
        href="#la-casa"
        aria-label={t("scroll")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2 text-white/80 hover:text-white"
      >
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="block"
        >
          <ChevronDown className="h-7 w-7" />
        </motion.span>
      </motion.a>
    </section>
  );
}
