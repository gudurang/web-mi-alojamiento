"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { MessageCircle, Mail, MapPin, Send, Sparkles } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/site";

export function Contact() {
  const t = useTranslations("contact");
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    dates: "",
    guests: "",
    message: "",
  });

  function update(field: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const subject = `Consulta web · ${site.name}`;
    const body =
      `${t("form.name")}: ${form.name}\n` +
      `${t("form.email")}: ${form.email}\n` +
      `${t("form.dates")}: ${form.dates}\n` +
      `${t("form.guests")}: ${form.guests}\n\n` +
      `${form.message}`;
    window.location.href = `${site.mailto}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  const inputClass =
    "w-full rounded-xl border border-piedra bg-crema/40 px-4 py-3 text-tinta outline-none transition focus:border-terracota focus:ring-2 focus:ring-terracota/30";

  return (
    <section id="contacto" className="scroll-mt-20 bg-crema-light py-20 md:py-28">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Info */}
          <Reveal>
            <span className="kicker">{t("kicker")}</span>
            <h2 className="section-title">{t("title")}</h2>
            <p className="mt-4 max-w-md text-lg text-tinta/75">{t("subtitle")}</p>

            <div className="mt-8 space-y-4">
              <a
                href={site.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-2xl border border-piedra/70 bg-white p-4 transition-all hover:border-terracota/40 hover:shadow-md"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-bosque/10 text-bosque transition-colors group-hover:bg-terracota/15 group-hover:text-terracota">
                  <MessageCircle className="h-6 w-6" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-tinta/50">
                    {t("phoneLabel")}
                  </p>
                  <p className="font-medium text-pizarra">{site.whatsappDisplay}</p>
                </div>
              </a>

              <a
                href={site.mailto}
                className="group flex items-center gap-4 rounded-2xl border border-piedra/70 bg-white p-4 transition-all hover:border-terracota/40 hover:shadow-md"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-bosque/10 text-bosque transition-colors group-hover:bg-terracota/15 group-hover:text-terracota">
                  <Mail className="h-6 w-6" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-tinta/50">
                    {t("emailLabel")}
                  </p>
                  <p className="font-medium text-pizarra">{site.email}</p>
                </div>
              </a>

              <div className="flex items-center gap-4 rounded-2xl border border-piedra/70 bg-white p-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-bosque/10 text-bosque">
                  <MapPin className="h-6 w-6" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-tinta/50">
                    {t("locationLabel")}
                  </p>
                  <p className="font-medium text-pizarra">{t("locationValue")}</p>
                </div>
              </div>
            </div>

            {/* Mapa */}
            <div className="mt-6 overflow-hidden rounded-2xl ring-1 ring-piedra/60">
              <iframe
                src={site.mapEmbed}
                title="Mapa Navaluenga"
                className="h-56 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Teaser bot */}
            <div className="mt-6 flex items-center gap-2.5 rounded-2xl bg-bosque/5 px-4 py-3 text-sm text-bosque ring-1 ring-bosque/10">
              <Sparkles className="h-4 w-4 shrink-0" />
              <p>{t("botTeaser")}</p>
            </div>
          </Reveal>

          {/* Formulario */}
          <Reveal delay={1}>
            <form
              onSubmit={submit}
              className="rounded-3xl bg-white p-7 shadow-xl ring-1 ring-piedra/60 md:p-9"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-sm font-semibold text-pizarra">
                    {t("form.name")} *
                  </label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-sm font-semibold text-pizarra">
                    {t("form.email")} *
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-pizarra">
                    {t("form.dates")}
                  </label>
                  <input
                    value={form.dates}
                    onChange={(e) => update("dates", e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-pizarra">
                    {t("form.guests")}
                  </label>
                  <input
                    value={form.guests}
                    onChange={(e) => update("guests", e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-sm font-semibold text-pizarra">
                    {t("form.message")}
                  </label>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    className={inputClass + " resize-none"}
                  />
                </div>
              </div>

              <button type="submit" className="btn-primary mt-6 w-full">
                <Send className="h-4 w-4" />
                {t("form.send")}
              </button>

              {sent && (
                <p className="mt-4 rounded-xl bg-bosque/10 px-4 py-3 text-center text-sm font-medium text-bosque">
                  {t("form.success")}
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
