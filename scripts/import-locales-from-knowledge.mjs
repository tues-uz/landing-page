#!/usr/bin/env node
/**
 * Import translated strings from docs/{lang}-locales-knowledge.json
 * into public/locales/{lang}/*.json (used at runtime by i18next).
 *
 * Merge policy (default — safe for dev + translators):
 *   - Add keys that exist in the knowledge file but not in locale JSON.
 *   - Keep existing locale values unless --overwrite is passed.
 *
 * With --overwrite:
 *   - Knowledge values replace matching keys in locale JSON (translator corrections).
 *   - Keys only in locale JSON (e.g. newly shipped UI) are still preserved.
 *
 * Usage:
 *   node scripts/import-locales-from-knowledge.mjs uz                  # add missing keys only
 *   node scripts/import-locales-from-knowledge.mjs uz --overwrite      # apply translator edits
 *   node scripts/import-locales-from-knowledge.mjs uz --dry-run
 *   node scripts/import-locales-from-knowledge.mjs uz --input path.json
 */
import fs from "node:fs";
import path from "node:path";

const supported = ["en", "uz", "ru"];
const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const overwrite = args.includes("--overwrite");
const langArg = args.find((a) => !a.startsWith("--") && !a.startsWith("-"));
const inputArgIndex = args.indexOf("--input");
const customInput = inputArgIndex >= 0 ? args[inputArgIndex + 1] : null;

const lang = (langArg || "uz").toLowerCase();
if (!supported.includes(lang)) {
  console.error(`Unsupported language "${lang}". Use: ${supported.join(", ")}`);
  process.exit(1);
}

const root = path.resolve(import.meta.dirname, "..");
const inputPath = customInput
  ? path.resolve(root, customInput)
  : path.join(root, `docs/${lang}-locales-knowledge.json`);
const localeDir = path.join(root, "public/locales", lang);

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

function isPlainObject(value) {
  return value != null && typeof value === "object" && !Array.isArray(value);
}

/**
 * Merge knowledge into locale JSON.
 * @param {Record<string, unknown>} target
 * @param {Record<string, unknown>} source
 * @param {boolean} replaceExisting
 */
function mergeTranslation(target, source, replaceExisting) {
  if (!isPlainObject(target) || !isPlainObject(source)) {
    return replaceExisting ? source : target ?? source;
  }

  /** @type {Record<string, unknown>} */
  const result = { ...target };
  for (const [key, sourceValue] of Object.entries(source)) {
    const targetValue = target[key];
    const targetHasKey = Object.prototype.hasOwnProperty.call(target, key);

    if (isPlainObject(targetValue) && isPlainObject(sourceValue)) {
      result[key] = mergeTranslation(targetValue, sourceValue, replaceExisting);
    } else if (!targetHasKey) {
      result[key] = sourceValue;
    } else if (replaceExisting) {
      result[key] = sourceValue;
    } else {
      result[key] = targetValue;
    }
  }
  return result;
}

/** Collect leaf paths where merged !== before. */
function collectChanges(before, after, prefix = "") {
  /** @type {Array<{ path: string; from: unknown; to: unknown }>} */
  const changes = [];

  if (typeof before === "string" && typeof after === "string" && before !== after) {
    changes.push({ path: prefix, from: before, to: after });
    return changes;
  }

  if (!isPlainObject(before) || !isPlainObject(after)) {
    if (JSON.stringify(before) !== JSON.stringify(after)) {
      changes.push({ path: prefix || "(root)", from: before, to: after });
    }
    return changes;
  }

  const keys = new Set([...Object.keys(before), ...Object.keys(after)]);
  for (const key of keys) {
    const nextPrefix = prefix ? `${prefix}.${key}` : key;
    const b = before[key];
    const a = after[key];

    if (isPlainObject(b) && isPlainObject(a)) {
      changes.push(...collectChanges(b, a, nextPrefix));
    } else if (JSON.stringify(b) !== JSON.stringify(a)) {
      changes.push({ path: nextPrefix, from: b, to: a });
    }
  }

  return changes;
}

function loadKnowledgeTranslation() {
  if (!fs.existsSync(inputPath)) {
    throw new Error(`Knowledge file not found: ${inputPath}`);
  }

  const payload = readJson(inputPath);
  const langBlock = payload[lang];
  if (!langBlock?.translation || typeof langBlock.translation !== "object") {
    throw new Error(`Invalid knowledge file: expected "${lang}.translation" object in ${inputPath}`);
  }

  return langBlock.translation;
}

function main() {
  if (!fs.existsSync(localeDir)) {
    throw new Error(`Locale directory not found: ${localeDir}`);
  }

  const translation = loadKnowledgeTranslation();
  const namespaces = Object.keys(translation).sort();
  const mode = overwrite ? "overwrite existing + add missing" : "add missing keys only";

  console.log(`${dryRun ? "Dry run" : "Importing"} ${lang} from ${path.relative(root, inputPath)}`);
  console.log(`Target: public/locales/${lang}/ (${mode})`);

  let totalChanges = 0;
  let filesWritten = 0;

  for (const ns of namespaces) {
    const targetPath = path.join(localeDir, `${ns}.json`);
    const incoming = translation[ns];
    if (!isPlainObject(incoming)) {
      console.warn(`Skipping namespace "${ns}": expected object`);
      continue;
    }

    const existing = fs.existsSync(targetPath) ? readJson(targetPath) : {};
    const merged = mergeTranslation(existing, incoming, overwrite);
    const changes = collectChanges(existing, merged);

    if (changes.length === 0) {
      console.log(`  ${ns}.json — no changes`);
      continue;
    }

    totalChanges += changes.length;
    console.log(`  ${ns}.json — ${changes.length} change(s)`);
    for (const change of changes.slice(0, 8)) {
      const from = change.from === undefined ? "(missing)" : JSON.stringify(change.from);
      const to = change.to === undefined ? "(removed)" : JSON.stringify(change.to);
      console.log(`    ${change.path}: ${from} → ${to}`);
    }
    if (changes.length > 8) {
      console.log(`    ... and ${changes.length - 8} more`);
    }

    if (!dryRun) {
      writeJson(targetPath, merged);
      filesWritten += 1;
    }
  }

  const liveFiles = fs
    .readdirSync(localeDir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => path.basename(f, ".json"));
  const missingInKnowledge = liveFiles.filter((ns) => !namespaces.includes(ns));
  if (missingInKnowledge.length) {
    console.warn(`\nLocale files not in knowledge export (unchanged): ${missingInKnowledge.join(", ")}`);
  }

  console.log(
    `\n${dryRun ? "Would apply" : "Applied"} ${totalChanges} change(s)` +
      (dryRun ? "" : ` across ${filesWritten} file(s)`),
  );

  if (!overwrite && !dryRun) {
    console.log("\nUse --overwrite when translators have updated docs/{lang}-locales-knowledge.json.");
  }
  if (dryRun && totalChanges > 0) {
    console.log("\nRun without --dry-run to write public/locales files.");
  }
}

main();
