#!/usr/bin/env node
/**
 * Merges generated page translation bundles into public/locales/{lang}/topNav.json.
 * Run after updating src/locales/generated/missingPageKeys.*.json
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const langs = ["en", "uz", "ru"];

for (const lang of langs) {
  const bundlePath = path.join(root, "src/locales/generated", `missingPageKeys.${lang}.json`);
  const topNavPath = path.join(root, "public/locales", lang, "topNav.json");

  const bundle = JSON.parse(fs.readFileSync(bundlePath, "utf8"));
  const topNav = JSON.parse(fs.readFileSync(topNavPath, "utf8"));

  const merged = { ...topNav, ...bundle };
  const sorted = Object.fromEntries(
    Object.entries(merged).sort(([a], [b]) => a.localeCompare(b)),
  );

  fs.writeFileSync(topNavPath, JSON.stringify(sorted, null, 2) + "\n");
  console.log(`${lang}/topNav.json: merged ${Object.keys(bundle).length} keys → ${Object.keys(sorted).length} total`);
}
