/**
 * Generate Simplified Chinese locale JSON from English sources.
 *
 * Usage:
 *   node scripts/generate-zh-locales.mjs
 *   node scripts/generate-zh-locales.mjs --namespace header
 *   node scripts/generate-zh-locales.mjs --force   # ignore translation cache
 */
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const enDir = path.join(root, "public/locales/en");
const zhDir = path.join(root, "public/locales/zh");
const cachePath = path.join(root, "scripts/.cache/zh-translations.json");

const args = new Set(process.argv.slice(2));
const onlyNamespace = args.has("--namespace")
  ? process.argv[process.argv.indexOf("--namespace") + 1]
  : null;
const force = args.has("--force");

/** @type {Record<string, string>} */
let cache = {};
if (!force && fs.existsSync(cachePath)) {
  cache = JSON.parse(fs.readFileSync(cachePath, "utf8"));
}

const PLACEHOLDER_RE = /\{\{[^}]+\}\}/g;
const SKIP_RE =
  /^(\/|https?:\/\/|mailto:|tel:|[+]?[\d\s().-]{7,}|[^@\s]+@[^@\s]+\.[^@\s]+|[\d./:%\s-]+)$/;

function shouldSkip(text) {
  if (!text.trim()) return true;
  if (SKIP_RE.test(text.trim())) return true;
  if (text.startsWith("/images/") || text.startsWith("/documents/")) return true;
  return false;
}

function protectPlaceholders(text) {
  /** @type {string[]} */
  const placeholders = [];
  const protectedText = text.replace(PLACEHOLDER_RE, (match) => {
    const token = `__PH${placeholders.length}__`;
    placeholders.push(match);
    return token;
  });
  return { protectedText, placeholders };
}

function restorePlaceholders(text, placeholders) {
  let out = text;
  placeholders.forEach((ph, i) => {
    out = out.replaceAll(`__PH${i}__`, ph);
  });
  return out;
}

async function translateText(text) {
  if (cache[text]) return cache[text];

  const { protectedText, placeholders } = protectPlaceholders(text);
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=zh-CN&dt=t&q=${encodeURIComponent(protectedText)}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Translate failed (${res.status}) for: ${text.slice(0, 80)}…`);
  }
  const data = await res.json();
  const translated = data[0].map((part) => part[0]).join("");
  const restored = restorePlaceholders(translated, placeholders);
  cache[text] = restored;
  return restored;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function translateNode(node) {
  if (typeof node === "string") {
    if (shouldSkip(node)) return node;
    await sleep(120);
    return translateText(node);
  }
  if (Array.isArray(node)) {
    const out = [];
    for (const item of node) {
      out.push(await translateNode(item));
    }
    return out;
  }
  if (node && typeof node === "object") {
    /** @type {Record<string, unknown>} */
    const out = {};
    for (const [key, value] of Object.entries(node)) {
      out[key] = await translateNode(value);
    }
    return out;
  }
  return node;
}

function saveCache() {
  fs.mkdirSync(path.dirname(cachePath), { recursive: true });
  fs.writeFileSync(cachePath, `${JSON.stringify(cache, null, 2)}\n`, "utf8");
}

async function main() {
  const files = fs
    .readdirSync(enDir)
    .filter((f) => f.endsWith(".json"))
    .filter((f) => !onlyNamespace || f === `${onlyNamespace}.json`)
    .sort();

  if (files.length === 0) {
    console.error("No locale files matched.");
    process.exit(1);
  }

  fs.mkdirSync(zhDir, { recursive: true });

  let translatedCount = 0;
  for (const file of files) {
    const enJson = JSON.parse(fs.readFileSync(path.join(enDir, file), "utf8"));
    console.log(`Translating ${file}…`);
    const zhJson = await translateNode(enJson);
    fs.writeFileSync(path.join(zhDir, file), `${JSON.stringify(zhJson, null, 2)}\n`, "utf8");
    translatedCount += 1;
    saveCache();
    console.log(`  wrote public/locales/zh/${file}`);
  }

  console.log(`Done — ${translatedCount} namespace(s), ${Object.keys(cache).length} cached strings.`);
}

main().catch((err) => {
  saveCache();
  console.error(err);
  process.exit(1);
});
