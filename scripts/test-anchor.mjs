import { chromium } from "playwright-core";
const OUT = process.env.SHOT_DIR || ".";
const b = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium", args: ["--no-sandbox"] });
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, locale: "es-ES", extraHTTPHeaders: { "Accept-Language": "es-ES,es;q=0.9" } });
await p.goto("http://127.0.0.1:3000/", { waitUntil: "networkidle", timeout: 40000 });
await p.waitForTimeout(800);
for (const id of ["la-casa", "reservas", "contacto"]) {
  await p.locator(`header a[href="#${id}"]`).first().click();
  await p.waitForTimeout(1300);
  await p.screenshot({ path: `${OUT}/anchor-${id}.png` });
  console.log(`✓ anchor-${id}.png`);
}
await b.close();
console.log("ok");
