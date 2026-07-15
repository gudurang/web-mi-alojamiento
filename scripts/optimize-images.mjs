// Optimiza las imágenes de assets/img -> public/images (formato web ligero).
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";

const SRC = "assets/img";
const OUT = "public/images";

await mkdir(OUT, { recursive: true });

// [origen, destino, ancho máx, tipo]
const jobs = [
  ["paisaje.png", "paisaje.webp", 2400, "webp"],
  ["entorno.png", "entorno.webp", 2000, "webp"],
  ["hotel.png", "hotel.webp", 1600, "webp"],
  ["habitacion_01.png", "mirador.webp", 1600, "webp"], // balcón con vistas -> El Mirador
  ["habitacion_02.png", "alcoba.webp", 1600, "webp"], // suite con jacuzzi -> La Alcoba del Fuego
  ["habitacion_03.png", "serrana.webp", 1600, "webp"], // camas gemelas -> La Serrana
  ["avatar_laura.png", "laura.webp", 1100, "webp"],
  ["logo_seal.png", "logo-seal.png", 600, "png"],
  ["logo.png", "logo-wide.webp", 1400, "webp"],
];

for (const [src, dest, width, type] of jobs) {
  const inPath = `${SRC}/${src}`;
  const outPath = `${OUT}/${dest}`;
  if (!existsSync(inPath)) {
    console.warn(`! No existe ${inPath}, salto`);
    continue;
  }
  let pipe = sharp(inPath).resize({ width, withoutEnlargement: true });
  if (type === "webp") {
    pipe = pipe.webp({ quality: 80 });
  } else {
    pipe = pipe.png({ quality: 80, compressionLevel: 9 });
  }
  const info = await pipe.toFile(outPath);
  const kb = (info.size / 1024).toFixed(0);
  console.log(`✓ ${dest.padEnd(18)} ${String(info.width).padStart(4)}px  ${kb} KB`);
}

console.log("Listo.");
