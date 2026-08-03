#!/usr/bin/env node
/**
 * Verify and merge topNav locale parity (en → ru/uz).
 *
 * Usage:
 *   node scripts/sync-topNav-locales.mjs          # report only
 *   node scripts/sync-topNav-locales.mjs --merge  # merge missing keys from patch files
 *
 * Patch files (optional): scripts/locale-patches/{ru,uz}-topNav-patch.json
 * Keys must match public/locales/en/topNav.json exactly.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const merge = process.argv.includes("--merge");

function readJson(relPath) {
  return JSON.parse(fs.readFileSync(path.join(root, relPath), "utf8"));
}

function writeJson(relPath, data) {
  fs.writeFileSync(path.join(root, relPath), `${JSON.stringify(data, null, 2)}\n`);
}

const en = readJson("public/locales/en/topNav.json");
const ru = readJson("public/locales/ru/topNav.json");
const uz = readJson("public/locales/uz/topNav.json");

const enKeys = Object.keys(en);
const missingRu = enKeys.filter((k) => !(k in ru));
const missingUz = enKeys.filter((k) => !(k in uz));
const extraRu = Object.keys(ru).filter((k) => !(k in en));
const extraUz = Object.keys(uz).filter((k) => !(k in en));

console.log(`EN keys: ${enKeys.length}`);
console.log(`RU keys: ${Object.keys(ru).length} (missing ${missingRu.length}, extra ${extraRu.length})`);
console.log(`UZ keys: ${Object.keys(uz).length} (missing ${missingUz.length}, extra ${extraUz.length})`);

if (missingRu.length) console.log("Missing in RU:", missingRu.slice(0, 10).join(", "), missingRu.length > 10 ? "..." : "");
if (missingUz.length) console.log("Missing in UZ:", missingUz.slice(0, 10).join(", "), missingUz.length > 10 ? "..." : "");
if (extraRu.length) console.log("Extra in RU (not in EN):", extraRu.join(", "));
if (extraUz.length) console.log("Extra in UZ (not in EN):", extraUz.join(", "));

if (!merge) {
  if (missingRu.length === 0 && missingUz.length === 0) {
    console.log("All locales in sync.");
  } else {
    console.log("Run with --merge to apply scripts/locale-patches/*-topNav-patch.json");
  }

  // Warn when *Defaults.ts keys exist but are absent from en/topNav.json (falls back to English).
  const defaultsMissing = findDefaultsKeysMissingFromEn(en);
  if (defaultsMissing.length) {
    console.warn(`\nWarning: ${defaultsMissing.length} key(s) from src/locales/*Defaults.ts are not in en/topNav.json.`);
    console.warn("Pages using t(key, { defaultValue }) will show English until these are added.");
    for (const { file, key } of defaultsMissing.slice(0, 8)) {
      console.warn(`  - ${key} (${path.basename(file)})`);
    }
    if (defaultsMissing.length > 8) console.warn(`  ... and ${defaultsMissing.length - 8} more`);
  }

  process.exit(missingRu.length || missingUz.length ? 1 : 0);
}

function findDefaultsKeysMissingFromEn(enJson) {
  const localesDir = path.join(root, "src/locales");
  const missing = [];
  for (const file of fs.readdirSync(localesDir)) {
    if (!file.endsWith("Defaults.ts")) continue;
    const full = path.join(localesDir, file);
    const content = fs.readFileSync(full, "utf8");
    for (const [, constName] of content.matchAll(/export const (\w+(?:_I18N)?_DEFAULTS|\w+_DEFAULTS) = \{/g)) {
      const blockMatch = content.match(
        new RegExp(`export const ${constName.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\\\$&")} = \\{([\\s\\S]*?)\\} as const`),
      );
      if (!blockMatch) continue;
      for (const [, key] of blockMatch[1].matchAll(/^  (\w+):/gm)) {
        if (!(key in enJson)) missing.push({ file: full, key });
      }
    }
  }
  return missing;
}

for (const lang of ["ru", "uz"]) {
  const patchPath = `scripts/locale-patches/${lang}-topNav-patch.json`;
  if (!fs.existsSync(path.join(root, patchPath))) {
    console.warn(`No patch file: ${patchPath}`);
    continue;
  }
  const patch = readJson(patchPath);
  const target = lang === "ru" ? ru : uz;
  const missing = enKeys.filter((k) => !(k in target));
  let merged = 0;
  for (const key of missing) {
    if (key in patch) {
      target[key] = patch[key];
      merged++;
    }
  }
  writeJson(`public/locales/${lang}/topNav.json`, target);
  console.log(`Merged ${merged} keys into ${lang}/topNav.json`);
}
