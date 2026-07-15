"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { MessageCircle, Mail, MapPin, Heart } from "lucide-react";
import { site } from "@/lib/site";

const LINKS = [
  { id: "la-casa", key: "house" },
  { id: "habitaciones", key: "rooms" },
  { id: "reservas", key: "booking" },
  { id: "entorno", key: "environment" },
  { id: "galeria", key: "gallery" },
  { id: "contacto", key: "contact" },
] as const;

export function Footer() {
  const t = useTranslations("footer");
  const tn = useTranslations("nav");
  const year = 2026;

  return (
    <footer className="bg-pizarra text-crema/80">
      <div className="container-x grid gap-10 py-14 md:grid-cols-3">
        {/* Marca */}
        <div>
          <div className="flex items-center gap-3">
            <Image
              src="/images/logo-seal.png"
              alt={site.name}
              width={52}
              height={52}
              className="h-12 w-12 rounded-full ring-2 ring-crema/20"
            />
            <span className="font-serif text-xl font-semibold text-crema">
              El Rincón de Gredos
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-crema/60">
            {t("tagline")}
          </p>
        </div>

        {/* Enlaces */}
        <div>
          <h4 className="font-serif text-lg font-semibold text-crema">{t("explore")}</h4>
          <ul className="mt-4 grid grid-cols-2 gap-2 text-sm">
            {LINKS.map((l) => (
              <li key={l.id}>
                <a href={`#${l.id}`} className="text-crema/70 transition-colors hover:text-terracota">
                  {tn(l.key)}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contacto */}
        <div>
          <h4 className="font-serif text-lg font-semibold text-crema">{t("contact")}</h4>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a
                href={site.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-crema/70 transition-colors hover:text-terracota"
              >
                <MessageCircle className="h-4 w-4" />
                {site.whatsappDisplay}
              </a>
            </li>
            <li>
              <a
                href={site.mailto}
                className="flex items-center gap-2.5 text-crema/70 transition-colors hover:text-terracota"
              >
                <Mail className="h-4 w-4" />
                {site.email}
              </a>
            </li>
            <li className="flex items-center gap-2.5 text-crema/70">
              <MapPin className="h-4 w-4" />
              {site.location}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-crema/10">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-5 text-xs text-crema/50 sm:flex-row">
          <p>© {year} El Rincón de Gredos. {t("rights")}</p>
          <p className="flex items-center gap-1.5">
            {t("madeWith")} <Heart className="h-3.5 w-3.5 text-terracota" />
          </p>
        </div>
      </div>
    </footer>
  );
}
