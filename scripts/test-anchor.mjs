import { chromium } from "playwright-core";
const OUT = process.env.SHOT_DIR || ".";
const b = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium", args: ["--no-sandbox"] });

// Carga de cero para CADA sección (reproduce el caso real: clic desde arriba)
for (const id of ["habitaciones", "reservas", "entorno", "galeria", "contacto"]) {
  const p = await b.newPage({ viewport: { width: 1440, height: 900 }, locale: "es-ES", extraHTTPHeaders: { "Accept-Language": "es-ES,es;q=0.9" } });
  await p.goto("http://127.0.0.1:3000/", { waitUntil: "domcontentloaded", timeout: 40000 });
  await p.waitForTimeout(400); // clic pronto, como un usuario real
  await p.locator(`header a[href="#${id}"]`).first().click();
  await p.waitForTimeout(2000); // esperar scroll + recorrecciones
  await p.screenshot({ path: `${OUT}/anc-${id}.png` });
  console.log(`✓ anc-${id}.png`);
  await p.close();
}
await b.close();
console.log("ok");
