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

function buildLocale(map) {
  const result = {};
  for (const key of Object.keys(en)) {
    if (PATH_SUFFIX.test(key)) result[key] = en[key];
    else if (key in map) result[key] = map[key];
    else throw new Error(`Missing translation for key: ${key}`);
  }
  return result;
}

const uzMap = JSON.parse(
  fs.readFileSync(path.join(__dirname, "data/missingPageKeys.uz.json"), "utf8"),
);
const uz = buildLocale(uzMap);
fs.writeFileSync(
  path.join(generatedDir, "missingPageKeys.uz.json"),
  JSON.stringify(uz, null, 2) + "\n",
);
console.log("Wrote missingPageKeys.uz.json with", Object.keys(uz).length, "keys");
