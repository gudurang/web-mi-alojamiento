import { chromium } from "playwright-core";
const OUT = process.env.SHOT_DIR || ".";
const browser = await chromium.launch({
  executablePath: "/opt/pw-browsers/chromium",
  args: ["--no-sandbox"],
});
const page = await browser.newPage({
  viewport: { width: 1440, height: 900 },
  locale: "es-ES",
  extraHTTPHeaders: { "Accept-Language": "es-ES,es;q=0.9" },
});
await page.goto("http://localhost:3000/es", { waitUntil: "networkidle" });
// recorrer para activar animaciones y cargar imágenes
await page.evaluate(async () => {
  document.documentElement.style.scrollBehavior = "auto";
  const vh = window.innerHeight;
  for (let y = 0; y < document.body.scrollHeight; y += Math.round(vh * 0.6)) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 250));
  }
  window.scrollTo(0, 0);
  await new Promise((r) => setTimeout(r, 300));
});
for (const id of ["habitaciones", "entorno"]) {
  await page.evaluate((s) => document.getElementById(s)?.scrollIntoView({ block: "start" }), id);
  // esperar a que las imágenes visibles terminen de cargar
  await page.evaluate(async () => {
    const imgs = Array.from(document.querySelectorAll("img"));
    await Promise.all(imgs.map((im) => im.complete ? 1 : new Promise((r) => { im.onload = im.onerror = r; })));
  });
  await page.waitForTimeout(900);
  await page.screenshot({ path: `${OUT}/v-${id}.png` });
  console.log(`✓ v-${id}.png`);
}
await browser.close();
console.log("Listo.");
