"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "./language-switcher";
import { site } from "@/lib/site";

const LINKS = [
  { id: "la-casa", key: "house" },
  { id: "habitaciones", key: "rooms" },
  { id: "reservas", key: "booking" },
  { id: "entorno", key: "environment" },
  { id: "galeria", key: "gallery" },
  { id: "contacto", key: "contact" },
] as const;

export function Navbar() {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  const solid = scrolled || menuOpen;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        solid
          ? "bg-crema/95 shadow-sm backdrop-blur-md"
          : "bg-gradient-to-b from-black/40 to-transparent"
      )}
    >
      <nav className="container-x flex h-16 items-center justify-between md:h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setMenuOpen(false)}>
          <Image
            src="/images/logo-seal.png"
            alt={site.name}
            width={44}
            height={44}
            className="h-10 w-10 rounded-full md:h-11 md:w-11"
            priority
          />
          <span
            className={cn(
              "font-serif text-lg font-semibold leading-tight transition-colors",
              solid ? "text-pizarra" : "text-white drop-shadow"
            )}
          >
            El Rincón<span className="hidden sm:inline"> de Gredos</span>
          </span>
        </Link>

        {/* Enlaces desktop */}
        <div className="hidden items-center gap-7 lg:flex">
          {LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className={cn(
                "text-sm font-medium transition-colors hover:text-terracota",
                solid ? "text-pizarra/80" : "text-white/90 drop-shadow"
              )}
            >
              {t(l.key)}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <div className="hidden sm:block">
            <LanguageSwitcher light={!solid} />
          </div>
          <a href="#reservas" className="hidden btn-primary md:inline-flex">
            {t("book")}
          </a>
          {/* Botón menú móvil */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Menu"
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors lg:hidden",
              solid ? "text-pizarra hover:bg-piedra/40" : "text-white hover:bg-white/10"
            )}
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Menú móvil */}
      <div
        className={cn(
          "overflow-hidden border-t border-piedra/60 bg-crema transition-all duration-300 lg:hidden",
          menuOpen ? "max-h-[80vh]" : "max-h-0 border-transparent"
        )}
      >
        <div className="container-x flex flex-col gap-1 py-4">
          {LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-3 py-3 text-base font-medium text-pizarra hover:bg-crema-light"
            >
              {t(l.key)}
            </a>
          ))}
          <a
            href="#reservas"
            onClick={() => setMenuOpen(false)}
            className="btn-primary mt-2 w-full"
          >
            {t("book")}
          </a>
          <div className="mt-3 sm:hidden">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
}
