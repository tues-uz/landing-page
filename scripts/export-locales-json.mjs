/**
 * Export i18n strings to JSON (for knowledge AI / RAG / translator review).
 * Reverse: node scripts/import-locales-from-knowledge.mjs [en|uz|ru]
 *
 * Usage: node scripts/export-locales-json.mjs [en|uz|ru]
 */
import fs from "node:fs";
import path from "node:path";
import { createServer } from "vite";

const lang = (process.argv[2] || "en").toLowerCase();
const supported = ["en", "uz", "ru"];
if (!supported.includes(lang)) {
  console.error(`Unsupported language "${lang}". Use: ${supported.join(", ")}`);
  process.exit(1);
}

const root = path.resolve(import.meta.dirname, "..");
const localeDir = path.join(root, "public/locales", lang);
const defaultsDir = path.join(root, "src/locales");
const outPath = path.join(root, `docs/${lang}-locales-knowledge.json`);

const LANG_LABELS = {
  en: "English",
  uz: "Uzbek",
  ru: "Russian",
};

function loadNamespaceJsonFiles() {
  if (!fs.existsSync(localeDir)) {
    throw new Error(`Locale directory not found: ${localeDir}`);
  }
  /** @type {Record<string, unknown>} */
  const translation = {};
  for (const file of fs.readdirSync(localeDir).filter((f) => f.endsWith(".json")).sort()) {
    const ns = path.basename(file, ".json");
    translation[ns] = JSON.parse(fs.readFileSync(path.join(localeDir, file), "utf8"));
  }
  return translation;
}

async function loadDefaultsModules(server) {
  /** @type {Record<string, Record<string, unknown>>} */
  const defaults = {};
  const files = fs.readdirSync(defaultsDir).filter((f) => f.endsWith("Defaults.ts")).sort();

  for (const file of files) {
    const mod = await server.ssrLoadModule(`/src/locales/${file}`);
    /** @type {Record<string, unknown>} */
    const fileExports = {};
    for (const [exportName, exportValue] of Object.entries(mod)) {
      if (exportName === "default") continue;
      if (exportValue == null) continue;
      if (typeof exportValue === "object") {
        fileExports[exportName] = exportValue;
      }
    }
    if (Object.keys(fileExports).length > 0) {
      defaults[file] = fileExports;
    }
  }
  return defaults;
}

function countLeafStrings(obj) {
  if (obj == null) return 0;
  if (typeof obj === "string") return 1;
  if (Array.isArray(obj)) return obj.reduce((n, item) => n + countLeafStrings(item), 0);
  if (typeof obj === "object") {
    return Object.values(obj).reduce((n, v) => n + countLeafStrings(v), 0);
  }
  return 0;
}

async function main() {
  const translation = loadNamespaceJsonFiles();

  /** @type {Record<string, Record<string, unknown>>} */
  let defaults = {};
  if (lang === "en") {
    const server = await createServer({
      root,
      logLevel: "error",
      server: { middlewareMode: true },
    });
    try {
      defaults = await loadDefaultsModules(server);
    } finally {
      await server.close();
    }
  }

  /** @type {Record<string, unknown>} */
  const localePayload = { translation };
  if (lang === "en") {
    localePayload.defaults = defaults;
  }

  const payload = {
    meta: {
      language: lang,
      languageLabel: LANG_LABELS[lang],
      generatedAt: new Date().toISOString(),
      description: `${LANG_LABELS[lang]} UI and page copy for the TUES landing page`,
      sources: {
        jsonNamespaces: `public/locales/${lang}/*.json`,
        ...(lang === "en"
          ? { codeDefaults: "src/locales/*Defaults.ts (English fallbacks only)" }
          : {
              codeDefaultsNote:
                "Omitted — src/locales/*Defaults.ts contains English fallback strings used when a key is missing from locale JSON.",
            }),
      },
      stats: {
        namespaceCount: Object.keys(translation).length,
        translationKeyCount: countLeafStrings(translation),
        defaultsFileCount: lang === "en" ? Object.keys(defaults).length : 0,
        defaultsKeyCount: lang === "en" ? countLeafStrings(defaults) : 0,
      },
    },
    [lang]: localePayload,
  };

  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");

  console.log(`Wrote ${outPath}`);
  console.log(
    `${payload.meta.stats.namespaceCount} namespaces (${payload.meta.stats.translationKeyCount} keys)` +
      (lang === "en"
        ? `, ${payload.meta.stats.defaultsFileCount} default files (${payload.meta.stats.defaultsKeyCount} keys)`
        : ""),
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
