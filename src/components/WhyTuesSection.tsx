import type { TFunction } from "i18next";
import { useTranslation } from "react-i18next";
import { WHY_TUES_I18N_DEFAULTS } from "@/locales/whyTuesDefaults";
import { cn } from "@/lib/utils";

function trWhyTues(t: TFunction, key: keyof typeof WHY_TUES_I18N_DEFAULTS) {
  return t(key, { defaultValue: WHY_TUES_I18N_DEFAULTS[key] });
}

function renderBodyBlock(block: string, i: number) {
  const trimmed = block.trim();
  if (trimmed.startsWith("## ")) {
    return (
      <h2 key={i} className="text-balance text-xl font-semibold tracking-tight text-foreground">
        {trimmed.slice(3).trim()}
      </h2>
    );
  }
  const lines = trimmed.split("\n").map((line) => line.trim()).filter(Boolean);
  if (lines.length > 0 && lines.every((line) => line.startsWith("- "))) {
    return (
      <ul key={i} className="list-disc space-y-2 pl-5">
        {lines.map((line, j) => (
          <li key={j}>{line.slice(2).trim()}</li>
        ))}
      </ul>
    );
  }
  return (
    <p key={i} className={cn("whitespace-pre-line text-justify")}>
      {trimmed}
    </p>
  );
}

export function WhyTuesSection() {
  const { t } = useTranslation("topNav");

  const bodyBlocks = trWhyTues(t, "whyTuesBody")
    .split(/\n\n+/)
    .map((block) => block.trim())
    .filter(Boolean);

  return (
    <div className="mt-4 max-w-none">
      <div className="flex flex-col gap-5 text-body-article text-muted-foreground">
        {bodyBlocks.map((block, i) => renderBodyBlock(block, i))}
      </div>
    </div>
  );
}
