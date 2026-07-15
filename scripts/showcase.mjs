import { chromium } from "playwright-core";

const OUT = process.env.SHOT_DIR || ".";
const BASE = "http://127.0.0.1:3000";
const browser = await chromium.launch({
  executablePath: "/opt/pw-browsers/chromium",
  args: ["--no-sandbox"],
});

async function newCtx({ w = 1440, h = 900, locale = "es-ES", lang = "es-ES,es;q=0.9" } = {}) {
  return browser.newPage({
    viewport: { width: w, height: h },
    locale,
    extraHTTPHeaders: { "Accept-Language": lang },
  });
}

async function scrollAll(page) {
  await page.evaluate(async () => {
    document.documentElement.style.scrollBehavior = "auto";
    const vh = window.innerHeight;
    for (let y = 0; y < document.body.scrollHeight; y += Math.round(vh * 0.55)) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 230));
    }
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 300));
  });
  await page.evaluate(async () => {
    const imgs = [...document.querySelectorAll("img")];
    await Promise.all(imgs.map((i) => (i.complete ? 1 : new Promise((r) => { i.onload = i.onerror = r; }))));
  });
}

async function shotEl(page, sel, file) {
  const el = page.locator(sel).first();
  await el.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await el.screenshot({ path: `${OUT}/${file}` });
  console.log(`✓ ${file}`);
}

// ---- Desktop español ----
const es = await newCtx();
await es.goto(`${BASE}/`, { waitUntil: "networkidle", timeout: 40000 });
await scrollAll(es);
await shotEl(es, "#inicio", "sh-01-hero.png");
await shotEl(es, "#la-casa", "sh-02-casa.png");
await shotEl(es, "#habitaciones", "sh-03-habitaciones.png");

// Demo del calculador: El Mirador, 8 noches (incluye finde -> descuento semana)
await es.locator("#reservas select").selectOption("mirador");
await es.locator('#reservas input[type="date"]').nth(0).fill("2026-08-03");
await es.locator('#reservas input[type="date"]').nth(1).fill("2026-08-11");
await es.waitForTimeout(600);
await shotEl(es, "#reservas", "sh-04-reservas-demo.png");

await shotEl(es, "#entorno", "sh-05-entorno.png");
await shotEl(es, "#galeria", "sh-06-galeria.png");
await shotEl(es, "#contacto", "sh-07-contacto.png");
await es.close();

// ---- Inglés (mostrar multi-idioma) ----
const en = await newCtx({ locale: "en-US", lang: "en-US,en;q=0.9" });
await en.goto(`${BASE}/en`, { waitUntil: "networkidle", timeout: 40000 });
await scrollAll(en);
await shotEl(en, "#inicio", "sh-08-hero-en.png");
await shotEl(en, "#habitaciones", "sh-09-rooms-en.png");
await en.close();

// ---- Móvil ----
const mob = await newCtx({ w: 390, h: 844 });
await mob.goto(`${BASE}/`, { waitUntil: "networkidle", timeout: 40000 });
await scrollAll(mob);
await mob.screenshot({ path: `${OUT}/sh-10-mobile-hero.png` });
console.log("✓ sh-10-mobile-hero.png");
await shotEl(mob, "#reservas", "sh-11-mobile-reservas.png");
await mob.close();

await browser.close();
console.log("Listo.");
