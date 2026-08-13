#!/usr/bin/env node
/**
 * Report i18n keys from src/locales/*Defaults.ts that are missing from
 * public/locales/{lang} JSON (those strings fall back to English at runtime).
 *
 * Usage:
 *   node scripts/report-locale-defaults-gaps.mjs [uz|en|ru]
 *   node scripts/report-locale-defaults-gaps.mjs uz --json
 */
import fs from "node:fs";
import path from "node:path";
import { createServer } from "vite";

const supported = ["en", "uz", "ru"];
const args = process.argv.slice(2);
const jsonOut = args.includes("--json");
const lang = (args.find((a) => !a.startsWith("--")) || "uz").toLowerCase();

if (!supported.includes(lang)) {
  console.error(`Unsupported language "${lang}". Use: ${supported.join(", ")}`);
  process.exit(1);
}

const root = path.resolve(import.meta.dirname, "..");
const localeDir = path.join(root, "public/locales", lang);
const defaultsDir = path.join(root, "src/locales");

function loadLocaleKeys() {
  /** @type {Set<string>} */
  const keys = new Set();
  for (const file of fs.readdirSync(localeDir).filter((f) => f.endsWith(".json"))) {
    const data = JSON.parse(fs.readFileSync(path.join(localeDir, file), "utf8"));
    walk(data, "", keys);
  }
  return keys;
}

function walk(obj, prefix, keys) {
  if (obj == null) return;
  if (typeof obj === "string") {
    if (prefix) keys.add(prefix);
    return;
  }
  if (Array.isArray(obj)) {
    obj.forEach((item, i) => walk(item, `${prefix}[${i}]`, keys));
    return;
  }
  if (typeof obj === "object") {
    for (const [k, v] of Object.entries(obj)) {
      walk(v, prefix ? `${prefix}.${k}` : k, keys);
    }
  }
}

async function loadDefaultsModules(server) {
  /** @type {Record<string, Record<string, unknown>>} */
  const defaults = {};
  for (const file of fs.readdirSync(defaultsDir).filter((f) => f.endsWith("Defaults.ts")).sort()) {
    const mod = await server.ssrLoadModule(`/src/locales/${file}`);
    for (const [exportName, exportValue] of Object.entries(mod)) {
      if (exportName === "default" || exportValue == null || typeof exportValue !== "object") continue;
      defaults[`${file}::${exportName}`] = exportValue;
    }
  }
  return defaults;
}

function collectDefaultKeys(defaults) {
  /** @type {Array<{ key: string; source: string; value: string }>} */
  const rows = [];
  for (const [source, obj] of Object.entries(defaults)) {
    collectLeaves(obj, "", source, rows);
  }
  return rows;
}

function collectLeaves(obj, prefix, source, rows) {
  if (typeof obj === "string") {
    if (prefix) rows.push({ key: prefix, source, value: obj });
    return;
  }
  if (obj == null || typeof obj !== "object") return;
  for (const [k, v] of Object.entries(obj)) {
    collectLeaves(v, prefix ? `${prefix}.${k}` : k, source, rows);
  }
}

async function main() {
  const localeKeys = loadLocaleKeys();

  const server = await createServer({
    root,
    logLevel: "error",
    server: { middlewareMode: true },
  });

  let defaults;
  try {
    defaults = await loadDefaultsModules(server);
  } finally {
    await server.close();
  }

  const rows = collectDefaultKeys(defaults);
  const missing = rows.filter(({ key }) => !localeKeys.has(key));

  const payload = {
    language: lang,
    localeKeyCount: localeKeys.size,
    defaultsKeyCount: rows.length,
    missingFromLocaleJson: missing.length,
    missing,
  };

  if (jsonOut) {
    console.log(JSON.stringify(payload, null, 2));
    return;
  }

  console.log(`Language: ${lang}`);
  console.log(`Locale JSON keys: ${localeKeys.size}`);
  console.log(`Defaults.ts keys: ${rows.length}`);
  console.log(`Missing from ${lang} locale JSON (English fallback at runtime): ${missing.length}`);

  if (missing.length === 0) {
    console.log("All defaults keys are covered by locale JSON.");
    return;
  }

  const bySource = new Map();
  for (const row of missing) {
    const list = bySource.get(row.source) ?? [];
    list.push(row);
    bySource.set(row.source, list);
  }

  for (const [source, list] of [...bySource.entries()].sort()) {
    console.log(`\n${source} (${list.length})`);
    for (const row of list.slice(0, 5)) {
      console.log(`  ${row.key}`);
    }
    if (list.length > 5) console.log(`  ... and ${list.length - 5} more`);
  }

  console.log(
    `\nTip: add Uzbek translations for these keys to public/locales/${lang}/topNav.json (or the relevant namespace), then re-export with:\n  node scripts/export-locales-json.mjs ${lang}`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
