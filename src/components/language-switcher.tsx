"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter, routing } from "@/i18n/routing";
import { Globe, Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const FLAGS: Record<string, string> = {
  es: "🇪🇸",
  en: "🇬🇧",
  it: "🇮🇹",
  pt: "🇵🇹",
  fr: "🇫🇷",
};

export function LanguageSwitcher({ light = false }: { light?: boolean }) {
  const t = useTranslations("language");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  function change(next: string) {
    setOpen(false);
    router.replace(pathname, { locale: next });
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={t("label")}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
          light
            ? "border-white/30 text-white hover:bg-white/10"
            : "border-pizarra/15 text-pizarra hover:border-terracota/50 hover:text-terracota"
        )}
      >
        <Globe className="h-4 w-4" />
        <span className="uppercase">{locale}</span>
        <ChevronDown
          className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-180")}
        />
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-44 overflow-hidden rounded-2xl border border-piedra bg-white shadow-xl">
          {routing.locales.map((l) => (
            <button
              key={l}
              onClick={() => change(l)}
              className={cn(
                "flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors hover:bg-crema",
                l === locale ? "font-semibold text-terracota" : "text-pizarra"
              )}
            >
              <span className="text-base">{FLAGS[l]}</span>
              <span className="flex-1">{t(l)}</span>
              {l === locale && <Check className="h-4 w-4" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
