/**
 * Export all English i18n strings to markdown (for knowledge AI / RAG).
 * Usage: node scripts/export-en-locales-md.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { createServer } from "vite";

const root = path.resolve(import.meta.dirname, "..");
const enDir = path.join(root, "public/locales/en");
const defaultsDir = path.join(root, "src/locales");
const outPath = path.join(root, "docs/en-locales-knowledge.md");

/** Flatten nested objects to dot-notation keys (leaf strings only). */
function flattenStrings(obj, prefix = "") {
  /** @type {Record<string, string>} */
  const out = {};
  if (obj == null) return out;

  if (Array.isArray(obj)) {
    if (prefix) {
      out[prefix] = obj.map((item) => (typeof item === "string" ? item : JSON.stringify(item))).join("\n");
    }
    return out;
  }

  if (typeof obj !== "object") {
    if (prefix) out[prefix] = String(obj);
    return out;
  }

  for (const [key, value] of Object.entries(obj)) {
    const next = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === "object") {
      Object.assign(out, flattenStrings(value, next));
    } else if (value != null) {
      out[next] = String(value);
    }
  }
  return out;
}

function escapeCell(text) {
  return String(text).replace(/\|/g, "\\|").replace(/\n/g, "<br>");
}

function entriesToTable(entries) {
  const sorted = Object.entries(entries).sort(([a], [b]) => a.localeCompare(b));
  if (sorted.length === 0) return "_No strings._\n";
  const lines = ["| Key | English |", "| --- | --- |"];
  for (const [key, value] of sorted) {
    lines.push(`| \`${escapeCell(key)}\` | ${escapeCell(value)} |`);
  }
  return `${lines.join("\n")}\n`;
}

function countEntries(entries) {
  return Object.keys(entries).length;
}

async function loadNamespaceJsonFiles() {
  /** @type {Record<string, unknown>} */
  const namespaces = {};
  for (const file of fs.readdirSync(enDir).filter((f) => f.endsWith(".json")).sort()) {
    const ns = path.basename(file, ".json");
    namespaces[ns] = JSON.parse(fs.readFileSync(path.join(enDir, file), "utf8"));
  }
  return namespaces;
}

async function loadDefaultsModules(server) {
  /** @type {{ file: string; exportName: string; data: unknown }[]} */
  const blocks = [];
  const files = fs.readdirSync(defaultsDir).filter((f) => f.endsWith("Defaults.ts")).sort();

  for (const file of files) {
    const mod = await server.ssrLoadModule(`/src/locales/${file}`);
    for (const [exportName, exportValue] of Object.entries(mod)) {
      if (exportName === "default") continue;
      if (exportValue == null) continue;
      if (typeof exportValue === "object") {
        blocks.push({ file, exportName, data: exportValue });
      }
    }
  }
  return blocks;
}

function defaultsBlockToMarkdown(block) {
  const lines = [`### \`${block.exportName}\``, "", `_Source: \`src/locales/${block.file}\`_`, ""];

  if (Array.isArray(block.data)) {
    lines.push("```json");
    lines.push(JSON.stringify(block.data, null, 2));
    lines.push("```");
    lines.push("");
    return lines.join("\n");
  }

  lines.push(entriesToTable(flattenStrings(block.data)));
  return lines.join("\n");
}

async function main() {
  const namespaces = await loadNamespaceJsonFiles();

  const server = await createServer({
    root,
    logLevel: "error",
    server: { middlewareMode: true },
  });

  let defaultsBlocks = [];
  try {
    defaultsBlocks = await loadDefaultsModules(server);
  } finally {
    await server.close();
  }

  const nsFlat = Object.fromEntries(
    Object.entries(namespaces).map(([ns, data]) => [ns, flattenStrings(data)]),
  );
  const defaultsFlat = defaultsBlocks.flatMap((b) => {
    if (Array.isArray(b.data)) return [];
    return Object.entries(flattenStrings(b.data)).map(([k, v]) => ({
      key: `${b.file}::${b.exportName}.${k}`,
      value: v,
    }));
  });

  const totalNsKeys = Object.values(nsFlat).reduce((n, e) => n + countEntries(e), 0);
  const totalDefaultKeys = defaultsFlat.length;
  const generatedAt = new Date().toISOString();

  const lines = [
    "# TUES English Locales — Knowledge Base",
    "",
    "Structured export of all English UI and page copy for the TUES landing page CMS.",
    "",
    `> Generated: ${generatedAt}  `,
    `> JSON namespaces: \`public/locales/en/*.json\` (${Object.keys(namespaces).length} files, ${totalNsKeys} keys)  `,
    `> Code defaults: \`src/locales/*Defaults.ts\` (${defaultsBlocks.length} exports, ${totalDefaultKeys} keys)  `,
    `> Languages on site: Uzbek (uz), English (en), Russian (ru) — **this file is English only**`,
    "",
    "---",
    "",
    "## Table of contents",
    "",
    "### JSON namespaces (i18next)",
    "",
  ];

  for (const ns of Object.keys(namespaces).sort()) {
    lines.push(`- [${ns}](#namespace-${ns}) (${countEntries(nsFlat[ns])} keys)`);
  }

  lines.push("");
  lines.push("### Code defaults (English fallbacks in `topNav` and pages)");
  lines.push("");

  const byFile = new Map();
  for (const block of defaultsBlocks) {
    if (!byFile.has(block.file)) byFile.set(block.file, []);
    byFile.get(block.file).push(block.exportName);
  }
  for (const [file, exports] of [...byFile.entries()].sort(([a], [b]) => a.localeCompare(b))) {
    lines.push(`- [\`${file}\`](#defaults-${file.replace(/\./g, "")}) (${exports.length} exports)`);
  }

  lines.push("");
  lines.push("---");
  lines.push("");
  lines.push("## JSON structure reference (i18next)");
  lines.push("");
  lines.push("Equivalent nested shape (single `translation` bundle): `en.translation.<namespace>.<key>`");
  lines.push("");
  lines.push("Example — `common` namespace:");
  lines.push("");
  lines.push("```json");
  lines.push(JSON.stringify({ en: { translation: { common: namespaces.common } } }, null, 2));
  lines.push("```");
  lines.push("");
  lines.push("Full keys for all namespaces are listed in the sections below.");
  lines.push("");
  lines.push("---");
  lines.push("");

  for (const ns of Object.keys(namespaces).sort()) {
    lines.push(`## Namespace: \`${ns}\` {#namespace-${ns}}`);
    lines.push("");
    lines.push(`_File: \`public/locales/en/${ns}.json\`_`);
    lines.push("");
    lines.push(entriesToTable(nsFlat[ns]));
    lines.push("---");
    lines.push("");
  }

  lines.push("# Code defaults (English)");
  lines.push("");
  lines.push(
    "These strings live in TypeScript and are used as `defaultValue` when a key is missing from `topNav.json` or other locale files.",
  );
  lines.push("");

  for (const [file, blocks] of [...byFile.entries()].sort(([a], [b]) => a.localeCompare(b))) {
    lines.push(`## \`${file}\` {#defaults-${file.replace(/\./g, "")}}`);
    lines.push("");
    for (const block of defaultsBlocks.filter((b) => b.file === file)) {
      lines.push(defaultsBlockToMarkdown(block));
    }
    lines.push("---");
    lines.push("");
  }

  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, lines.join("\n"), "utf8");

  console.log(`Wrote ${outPath}`);
  console.log(`${Object.keys(namespaces).length} namespaces, ${totalNsKeys} JSON keys, ${totalDefaultKeys} default keys`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
