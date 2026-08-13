/**
 * Export English i18n strings to JSON.
 * Usage: node scripts/export-en-locales-json.mjs
 */
import { spawnSync } from "node:child_process";
import path from "node:path";

const result = spawnSync(process.execPath, [path.join(import.meta.dirname, "export-locales-json.mjs"), "en"], {
  stdio: "inherit",
});
process.exit(result.status ?? 1);
