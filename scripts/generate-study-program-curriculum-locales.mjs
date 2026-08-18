/**
 * Generate studyProgramCurriculum.json for en/uz/ru/zh from CMS English curriculum.
 * Usage: node scripts/generate-study-program-curriculum-locales.mjs [--lang zh]
 */
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const cachePath = path.join(root, "scripts/.cache/zh-translations.json");
const cache = fs.existsSync(cachePath) ? JSON.parse(fs.readFileSync(cachePath, "utf8")) : {};

const onlyLang = process.argv.includes("--lang")
  ? process.argv[process.argv.indexOf("--lang") + 1]
  : null;

const TARGETS = {
  en: null,
  uz: "uz",
  ru: "ru",
  zh: "zh-CN",
};

function studyProgramI18nKey(text) {
  return text
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[''""]/g, "")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function translateText(text, tl, attempt = 0) {
  const key = `${tl}::${text}`;
  if (cache[key]) return cache[key];
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${tl}&dt=t&q=${encodeURIComponent(text)}`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Translate ${res.status}: ${text.slice(0, 60)}`);
    const data = await res.json();
    const out = data[0].map((p) => p[0]).join("");
    cache[key] = out;
    return out;
  } catch (err) {
    if (attempt < 4) {
      await sleep(500 * (attempt + 1));
      return translateText(text, tl, attempt + 1);
    }
    throw err;
  }
}

async function translateMap(entries, tl, existing = {}) {
  /** @type {Record<string, string>} */
  const out = { ...existing };
  let i = 0;
  for (const [key, text] of entries) {
    i += 1;
    if (out[key]) continue;
    if (i % 25 === 0) console.log(`  ${i}/${entries.length}…`);
    if (!tl) {
      out[key] = text;
    } else {
      await sleep(120);
      out[key] = await translateText(text, tl);
    }
  }
  return out;
}

function saveCache() {
  fs.mkdirSync(path.dirname(cachePath), { recursive: true });
  fs.writeFileSync(cachePath, `${JSON.stringify(cache, null, 2)}\n`, "utf8");
}

function loadPartial(outPath) {
  if (!fs.existsSync(outPath)) {
    return { groupTitles: {}, courses: {}, metaValues: {} };
  }
  return JSON.parse(fs.readFileSync(outPath, "utf8"));
}

async function main() {
  const res = await fetch("https://tues.kubeletto.app/api/v1/content/study-programs?locale=en");
  const json = await res.json();
  const faculties = json.data?.faculties ?? [];

  /** @type {Map<string, string>} */
  const courseMap = new Map();
  /** @type {Map<string, string>} */
  const groupMap = new Map();
  /** @type {Map<string, string>} */
  const metaMap = new Map();

  for (const faculty of faculties) {
    for (const program of faculty.programs ?? []) {
      for (const field of [program.degreeLevel, program.duration, program.qualification, program.tuitionFee]) {
        if (field) metaMap.set(studyProgramI18nKey(field), field);
      }
      for (const group of program.courseGroups ?? []) {
        groupMap.set(studyProgramI18nKey(group.title), group.title);
        for (const course of group.courses ?? []) {
          courseMap.set(studyProgramI18nKey(course.name), course.name);
        }
      }
    }
  }

  const courseEntries = [...courseMap.entries()].sort(([a], [b]) => a.localeCompare(b));
  const groupEntries = [...groupMap.entries()].sort(([a], [b]) => a.localeCompare(b));
  const metaEntries = [...metaMap.entries()].sort(([a], [b]) => a.localeCompare(b));

  console.log(`Source: ${courseEntries.length} courses, ${groupEntries.length} groups, ${metaEntries.length} meta values`);

  const langs = onlyLang ? [onlyLang] : Object.keys(TARGETS);

  for (const lang of langs) {
    const tl = TARGETS[lang];
    const outPath = path.join(root, "public/locales", lang, "studyProgramCurriculum.json");
    const partial = loadPartial(outPath);
    console.log(`Generating ${lang}…`);
    partial.groupTitles = await translateMap(groupEntries, tl, partial.groupTitles);
    fs.writeFileSync(outPath, `${JSON.stringify(partial, null, 2)}\n`, "utf8");
    saveCache();
    partial.courses = await translateMap(courseEntries, tl, partial.courses);
    fs.writeFileSync(outPath, `${JSON.stringify(partial, null, 2)}\n`, "utf8");
    saveCache();
    partial.metaValues = await translateMap(metaEntries, tl, partial.metaValues);
    fs.writeFileSync(outPath, `${JSON.stringify(partial, null, 2)}\n`, "utf8");
    saveCache();
    console.log(`Wrote ${outPath}`);
  }

  saveCache();
}

main().catch((err) => {
  console.error(err);
  saveCache();
  process.exit(1);
});
