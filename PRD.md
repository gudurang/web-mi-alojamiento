# 📄 PRD — Web de El Rincón de Gredos

**Documento de Requisitos del Producto (PRD)**
Alojamiento rural · Navaluenga · Ávila · Sierra de Gredos
Identidad visual: ver [`Brand_Book.md`](./Brand_Book.md)

---

## 1. Resumen del proyecto

Web del alojamiento rural **El Rincón de Gredos**: una casa de piedra en Navaluenga
(Ávila), en plena Sierra de Gredos. El objetivo es transmitir la esencia de la
marca —*un refugio de piedra donde el tiempo va más despacio*— y **captar reservas
directas** (sin comisiones de intermediarios), con atención al huésped mediante un
asistente inteligente.

### Objetivos
- Mostrar el alojamiento con una web bonita, cálida y profesional.
- Permitir **reservar y pagar directamente** (Stripe) → adiós comisiones.
- **Atender dudas 24/7** con un bot que deriva a WhatsApp cuando haga falta.
- Estar disponible en **5 idiomas** para atraer huéspedes internacionales.

### Público objetivo
Todos por igual: parejas (escapada romántica), familias, senderistas y amantes de
la naturaleza, y quien busque paz y desconexión.

---

## 2. Stack tecnológico

| Capa | Tecnología |
|------|-----------|
| Framework | **Next.js** (App Router) — SEO + i18n nativo + despliegue en Vercel |
| Estilos | **Tailwind CSS** |
| Componentes UI | **shadcn/ui** (base) + **Aceternity UI** + **Magic UI** (animaciones y efectos) |
| Internacionalización | i18n con enrutado por idioma (`next-intl` o equivalente) |
| Pagos (Fase 2) | **Stripe** (Checkout / Payment Intents) |
| Asistente (Fase 2) | Bot con IA + derivación a WhatsApp |
| Despliegue | **Vercel** |
| Repositorio | GitHub — `gudurang/web-mi-alojamiento` |

---

## 3. Idiomas

Español (por defecto), **Inglés, Italiano, Portugués, Francés**.
- Selector de idioma visible en la cabecera.
- Rutas por idioma (`/es`, `/en`, `/it`, `/pt`, `/fr`).
- Todo el contenido (textos, botones, metadatos SEO) traducido.

---

## 4. Estructura de la web (one-page con navegación)

1. **Inicio (Hero):** panorámica del valle de Gredos + logo + titular de marca +
   botón **"Reservar"**. Efecto visual de entrada (Aceternity/Magic UI).
2. **La casa:** qué es El Rincón de Gredos, la bienvenida de Laura (anfitriona),
   y la lista de **servicios**.
3. **Habitaciones:** las 3 habitaciones con foto, descripción, capacidad y precio.
   Modalidad **casa completa** o **por habitación**.
4. **Reservas:** selector de fechas + **calculador de precio total** (Fase 1) →
   **pago con Stripe** (Fase 2).
5. **El entorno:** Sierra de Gredos — rutas de senderismo, gargantas y piscinas
   naturales, pueblos con encanto, gastronomía. Alquiler de bicicletas.
6. **Galería:** fotos del alojamiento y el entorno.
7. **Contacto:** WhatsApp, email, formulario, mapa de Navaluenga + **bot** (Fase 2).

---

## 5. Habitaciones

| Habitación | Capacidad | Descripción | € entre semana | € finde |
|-----------|:---:|-------------|:---:|:---:|
| **La Serrana** | 2 | Camas gemelas, pared de piedra, mantas artesanales, mucha luz | 60 € | 90 € |
| **El Mirador** | 2 | Cama de matrimonio, **balcón con vistas a la montaña** | 70 € | 100 € |
| **La Alcoba del Fuego** | 2 | Suite romántica con **chimenea y jacuzzi** | 90 € | 120 € |
| **Casa completa** | ~6 | Las 3 habitaciones + zonas comunes | 200 € | 300 € |

**Imágenes:** `habitacion_01.png` (La Serrana), `habitacion_02.png` (El Mirador),
`habitacion_03.png` (La Alcoba del Fuego), `hotel.png` (la casa),
`avatar_laura.png` (anfitriona), `paisaje.png` / `entorno.png` (entorno).

---

## 6. Precios y lógica de reserva

- **Tarifas** diferenciadas: entre semana vs. fin de semana (ver tabla).
- **Modalidades:** por habitación (B&B) o casa completa.
- **Descuentos automáticos:**
  - **10%** en reservas de **1 semana** completa.
  - **30%** en reservas de **1 mes** completo.
- **Calculador (Fase 1):** el huésped elige entrada/salida y personas → la web
  calcula y muestra el **total** (aplicando tarifa correcta y descuentos), sin
  cobrar todavía.
- **Pago (Fase 2):** el total se cobra con **Stripe**; gestión de disponibilidad
  para evitar solapamientos.

---

## 7. Servicios y comodidades

Desayuno incluido ☕ · WiFi 📶 · Parking 🚗 · Calefacción y chimenea 🔥 ·
Jardín / zona exterior 🌳 · Se admiten mascotas 🐕 · Cocina disponible 🍳 ·
Barbacoa · Aire acondicionado · Plancha · Secador · Toallas y ropa de cama
incluidas · **Bicicletas de alquiler** 🚲.

---

## 8. Reservas y contacto

- **WhatsApp:** +1 754 299 8204 (canal principal y destino del bot).
- **Email:** reservas@elrincondegredos.com
- **Formulario de contacto:** nombre, fechas, nº de personas, mensaje → llega por
  email.
- **Botones Booking / Airbnb:** preparados (pendiente de enlaces si los hubiera).

---

## 9. Funciones avanzadas (Fase 2)

### 9.1 Módulo de reservas con Stripe
- Cobro directo online de la estancia calculada.
- Confirmación por email al huésped y a Laura.
- Control de disponibilidad / calendario.

### 9.2 Asistente inteligente (bot)
- Responde preguntas frecuentes de huéspedes (servicios, cómo llegar, normas,
  disponibilidad, entorno…), alimentado por la info de este PRD.
- Si **no sabe responder** o el huésped lo pide, **deriva a una conversación por
  WhatsApp** (+1 754 299 8204).
- Disponible en los 5 idiomas.

---

## 10. Plan por fases

### 🟢 Fase 1 — Web publicada (ahora)
- Web completa en Next.js + Tailwind + shadcn/Aceternity/Magic UI.
- 5 idiomas.
- Todas las secciones (Inicio, La casa, Habitaciones, El entorno, Galería,
  Contacto).
- **Calculador de precios** con fechas y descuentos (sin cobro).
- Contacto por WhatsApp, email y formulario.
- Optimización de imágenes y SEO básico.
- Publicación en Vercel con URL propia.

### 🔵 Fase 2 — Reservas + Bot (después / S4)
- Pago real con **Stripe**.
- Gestión de disponibilidad.
- **Bot con IA** y derivación a WhatsApp.

---

## 11. SEO y rendimiento
- Metadatos y textos traducidos por idioma.
- Imágenes optimizadas (las PNG actuales ~8-10 MB se comprimen a formato web).
- Buen rendimiento móvil (la mayoría de reservas se hacen desde el móvil).

---

## 12. Puntos por confirmar (no bloquean el arranque)
- Dominio definitivo (previsto: **elrincondegredos.com**, según el email).
- Redes sociales (Instagram, etc.), si las hay.
- Horarios de check-in / check-out, normas de la casa y política de cancelación
  (útiles para el bot en Fase 2).
- Enlaces a Booking / Airbnb, si existen.

---

*Documento vivo. Base para construir la web. Identidad visual en `Brand_Book.md`.*
