import { chromium } from "playwright-core";
const OUT = process.env.SHOT_DIR || ".";
const b = await chromium.launch({
  executablePath: "/opt/pw-browsers/chromium",
  args: ["--no-sandbox"],
});
const p = await b.newPage({
  viewport: { width: 390, height: 844 },
  locale: "es-ES",
  extraHTTPHeaders: { "Accept-Language": "es-ES,es;q=0.9" },
});
await p.goto("http://localhost:3000/es", { waitUntil: "networkidle" });
await p.evaluate(async () => {
  document.documentElement.style.scrollBehavior = "auto";
  const vh = innerHeight;
  for (let y = 0; y < document.body.scrollHeight; y += Math.round(vh * 0.6)) {
    scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 220));
  }
  scrollTo(0, 0);
  await new Promise((r) => setTimeout(r, 300));
});
await p.evaluate(async () => {
  const i = [...document.querySelectorAll("img")];
  await Promise.all(i.map((x) => (x.complete ? 1 : new Promise((r) => { x.onload = x.onerror = r; }))));
});
await p.screenshot({ path: `${OUT}/mob-hero.png` });
await p.evaluate((s) => document.getElementById(s)?.scrollIntoView(), "habitaciones");
await p.waitForTimeout(800);
await p.screenshot({ path: `${OUT}/mob-rooms.png` });
await b.close();
console.log("ok");
