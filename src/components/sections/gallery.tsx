"use client";

import Image from "next/image";
import { useState, useCallback, useEffect } from "react";
import { useTranslations } from "next-intl";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { GALLERY } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Gallery() {
  const t = useTranslations("gallery");
  const [index, setIndex] = useState<number | null>(null);

  const close = useCallback(() => setIndex(null), []);
  const prev = useCallback(
    () => setIndex((i) => (i === null ? i : (i - 1 + GALLERY.length) % GALLERY.length)),
    []
  );
  const next = useCallback(
    () => setIndex((i) => (i === null ? i : (i + 1) % GALLERY.length)),
    []
  );

  useEffect(() => {
    if (index === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, close, prev, next]);

  return (
    <section id="galeria" className="scroll-mt-20 bg-crema py-14 md:py-20">
      <div className="container-x">
        <Reveal>
          <div className="max-w-2xl">
            <span className="kicker">{t("kicker")}</span>
            <h2 className="section-title">{t("title")}</h2>
            <p className="mt-4 text-lg text-tinta/75">{t("subtitle")}</p>
          </div>
        </Reveal>

        <div className="mt-12 grid auto-rows-[220px] grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 md:auto-rows-[260px]">
          {GALLERY.map((img, i) => (
            <Reveal
              key={img.src}
              delay={i % 3}
              className={cn(img.span && "col-span-2 row-span-1")}
            >
              <button
                onClick={() => setIndex(i)}
                className="group relative h-full w-full overflow-hidden rounded-2xl ring-1 ring-piedra/60"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-pizarra/0 transition-colors group-hover:bg-pizarra/20" />
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {index !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-pizarra/90 p-4 backdrop-blur-sm"
          onClick={close}
        >
          <button
            onClick={close}
            aria-label="Cerrar"
            className="absolute right-5 top-5 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
          >
            <X className="h-6 w-6" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Anterior"
            className="absolute left-3 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 sm:left-6"
          >
            <ChevronLeft className="h-7 w-7" />
          </button>
          <div
            className="relative h-[75vh] w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={GALLERY[index].src}
              alt={GALLERY[index].alt}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Siguiente"
            className="absolute right-3 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 sm:right-6"
          >
            <ChevronRight className="h-7 w-7" />
          </button>
        </div>
      )}
    </section>
  );
}
