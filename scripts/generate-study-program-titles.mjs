/**
 * Merge study program title translations into public/locales/{uz,ru,zh}/home.json
 * under studyProgramTitles.programs.{id}
 */
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const cachePath = path.join(root, "scripts/.cache/zh-translations.json");
const cache = fs.existsSync(cachePath) ? JSON.parse(fs.readFileSync(cachePath, "utf8")) : {};

const TARGETS = {
  uz: "uz",
  ru: "ru",
  zh: "zh-CN",
};

async function translateText(text, to) {
  if (to === "en") return text;
  const key = `${to}::${text}`;
  if (cache[key]) return cache[key];
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${to}&dt=t&q=${encodeURIComponent(text)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Translate failed ${res.status}`);
  const data = await res.json();
  const translated = data[0].map((part) => part[0]).join("");
  cache[key] = translated;
  return translated;
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  const res = await fetch("https://tues.kubeletto.app/api/v1/content/study-programs?locale=en");
  const json = await res.json();
  const faculties = json.data?.faculties ?? json.faculties ?? [];
  /** @type {Record<string, string>} */
  const programs = {};
  for (const faculty of faculties) {
    for (const program of faculty.programs ?? []) {
      programs[program.id] = program.title;
    }
  }

  for (const [lang, tl] of Object.entries(TARGETS)) {
    /** @type {Record<string, string>} */
    const translated = {};
    for (const [id, title] of Object.entries(programs)) {
      await sleep(100);
      translated[id] = await translateText(title, tl);
    }

    const homePath = path.join(root, "public/locales", lang, "home.json");
    const home = JSON.parse(fs.readFileSync(homePath, "utf8"));
    home.studyProgramTitles = { programs: translated };
    fs.writeFileSync(homePath, `${JSON.stringify(home, null, 2)}\n`, "utf8");
    console.log(`Updated ${homePath} (${Object.keys(translated).length} programs)`);
  }

  fs.mkdirSync(path.dirname(cachePath), { recursive: true });
  fs.writeFileSync(cachePath, `${JSON.stringify(cache, null, 2)}\n`, "utf8");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
