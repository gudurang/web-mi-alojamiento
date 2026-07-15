import { chromium } from "playwright-core";

const OUT = process.env.SHOT_DIR || ".";
const browser = await chromium.launch({
  executablePath: "/opt/pw-browsers/chromium",
  args: ["--no-sandbox"],
});

async function fullScroll(page) {
  // Desactiva el scroll suave y recorre toda la página paso a paso
  await page.evaluate(async () => {
    document.documentElement.style.scrollBehavior = "auto";
    const vh = window.innerHeight;
    let y = 0;
    const max = document.body.scrollHeight;
    while (y < max) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 220));
      y += Math.round(vh * 0.7);
    }
    window.scrollTo(0, document.body.scrollHeight);
    await new Promise((r) => setTimeout(r, 500));
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 400));
  });
}

const page = await browser.newPage({
  viewport: { width: 1440, height: 900 },
  locale: "es-ES",
  extraHTTPHeaders: { "Accept-Language": "es-ES,es;q=0.9" },
});
await page.goto("http://localhost:3000/es", { waitUntil: "networkidle", timeout: 30000 });
await fullScroll(page);

// Capturas por sección (ya animadas)
const sections = ["habitaciones", "reservas", "entorno", "galeria", "contacto"];
for (const id of sections) {
  await page.evaluate((sel) => {
    document.getElementById(sel)?.scrollIntoView({ behavior: "auto", block: "start" });
  }, id);
  await page.waitForTimeout(700);
  await page.screenshot({ path: `${OUT}/sec-${id}.png` });
  console.log(`✓ sec-${id}.png`);
}

await browser.close();
console.log("Listo.");
