/**
 * Resize gallery WebPs for faster loads. Source: public/tuesw/*.webp
 * Outputs: public/tuesw-gallery/480/, public/tuesw-gallery/800/
 *
 * Run: npm run optimize:tuesw-gallery
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const srcDir = path.join(root, "public", "tuesw");
const out480 = path.join(root, "public", "tuesw-gallery", "480");
const out800 = path.join(root, "public", "tuesw-gallery", "800");

const VARIANTS = [
  { dir: out480, width: 480 },
  { dir: out800, width: 800 },
];

async function main() {
  await fs.mkdir(out480, { recursive: true });
  await fs.mkdir(out800, { recursive: true });

  const files = (await fs.readdir(srcDir)).filter((f) => f.endsWith(".webp")).sort((a, b) => {
    const na = parseInt(path.basename(a, ".webp"), 10);
    const nb = parseInt(path.basename(b, ".webp"), 10);
    return na - nb;
  });

  if (files.length === 0) {
    console.warn("No .webp files in", srcDir);
    process.exit(1);
  }

  for (const file of files) {
    const input = path.join(srcDir, file);
    const buf = await fs.readFile(input);
    for (const { dir, width } of VARIANTS) {
      const outPath = path.join(dir, file);
      await sharp(buf)
        .rotate()
        .resize({
          width,
          withoutEnlargement: true,
          fit: "inside",
        })
        .webp({ quality: 78, effort: 4, smartSubsample: true })
        .toFile(outPath);
    }
    process.stdout.write(`\r${file}   `);
  }
  console.log(`\nDone: ${files.length} images × ${VARIANTS.length} sizes → public/tuesw-gallery/`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
