import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const generatedDir = path.join(root, "src/locales/generated");

const en = JSON.parse(
  fs.readFileSync(path.join(generatedDir, "missingPageKeys.en.json"), "utf8"),
);

const PATH_SUFFIX = /(Src|Alt|Href)$/;

function buildLocale(map, locale) {
  const result = {};
  for (const key of Object.keys(en)) {
    if (PATH_SUFFIX.test(key)) {
      result[key] = en[key];
    } else if (key in map) {
      result[key] = map[key];
    } else {
      throw new Error(`[${locale}] Missing translation for key: ${key}`);
    }
  }
  return result;
}

function writeLocale(filename, data) {
  const outPath = path.join(generatedDir, filename);
  fs.writeFileSync(outPath, JSON.stringify(data, null, 2) + "\n", "utf8");
}

const uzMap = JSON.parse(
  fs.readFileSync(path.join(__dirname, "data/missingPageKeys.uz.json"), "utf8"),
);

// Build ru from part1 script output + part2 data
import { spawnSync } from "child_process";
spawnSync("node", ["scripts/build-missing-page-keys-ru.mjs"], {
  cwd: root,
  stdio: "inherit",
});
const ruMap = JSON.parse(
  fs.readFileSync(path.join(generatedDir, "missingPageKeys.ru.json"), "utf8"),
);

const uz = buildLocale(uzMap, "uz");
const ru = buildLocale(ruMap, "ru");

writeLocale("missingPageKeys.uz.json", uz);
writeLocale("missingPageKeys.ru.json", ru);

console.log("Wrote missingPageKeys.uz.json and missingPageKeys.ru.json");
