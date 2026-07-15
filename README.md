# El Rincón de Gredos

Web del alojamiento rural **El Rincón de Gredos** — Navaluenga, Ávila (Sierra de Gredos).

Un refugio de piedra donde el tiempo va más despacio.

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** + componentes estilo shadcn / Aceternity / Magic UI
- **next-intl** — 5 idiomas: 🇪🇸 Español · 🇬🇧 English · 🇮🇹 Italiano · 🇵🇹 Português · 🇫🇷 Français
- **framer-motion** — animaciones al hacer scroll
- **lucide-react** — iconos

## Estructura

- `src/app/[locale]/` — páginas por idioma
- `src/components/` — navbar, footer, secciones y utilidades
- `src/components/sections/` — Hero, La casa, Habitaciones, Reservas, El entorno, Galería, Contacto
- `src/messages/` — traducciones (es, en, it, pt, fr)
- `src/lib/` — datos, precios y utilidades
- `assets/img/` — imágenes originales
- `public/images/` — imágenes optimizadas para web
- `scripts/` — utilidades (optimización de imágenes, capturas)

## Documentos del proyecto

- [`Brand_Book.md`](./Brand_Book.md) — identidad visual (paleta, tipografía, tono).
- [`PRD.md`](./PRD.md) — requisitos del producto y plan por fases.

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de producción
npm run start    # servir el build
```

### Optimizar imágenes

```bash
node scripts/optimize-images.mjs   # assets/img -> public/images
```

## Despliegue

Preparada para **Vercel**: conecta el repositorio y despliega. No requiere configuración adicional.

## Estado

- ✅ **Fase 1** — Web completa, multi-idioma, con calculador de precios y contacto (WhatsApp, email, formulario).
- 🔜 **Fase 2** — Pago con Stripe y asistente (bot) con derivación a WhatsApp.
