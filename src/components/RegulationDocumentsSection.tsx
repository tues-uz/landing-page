import type { TFunction } from "i18next";
import { useTranslation } from "react-i18next";
import { FileText } from "lucide-react";
import { DownloadCard } from "@/components/DownloadCard";
import { REGULATION_DOCUMENTS } from "@/config/regulationDocumentsData";
import { REGULATION_DOCUMENTS_I18N_DEFAULTS } from "@/locales/regulationDocumentsDefaults";
import { UNIVERSITY_IN_NUMBERS_I18N_DEFAULTS } from "@/locales/universityInNumbersDefaults";
import { cn } from "@/lib/utils";

function trReg(t: TFunction, key: keyof typeof REGULATION_DOCUMENTS_I18N_DEFAULTS) {
  return t(key, { defaultValue: REGULATION_DOCUMENTS_I18N_DEFAULTS[key] });
}

function fileNameFromHref(href: string): string {
  const last = href.split("/").pop();
  return last ?? href;
}

function renderCharterBlock(block: string, i: number) {
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

export function RegulationDocumentsSection() {
  const { t } = useTranslation("topNav");

  const introBlocks = trReg(t, "regulationDocsIntro")
    .split(/\n\n+/)
    .map((block) => block.trim())
    .filter(Boolean);

  const downloadLabel = trReg(t, "regulationDocsDownloadCta");
  const formatLabel = trReg(t, "regulationDocsDocxBadge");

  return (
    <div className="mt-4 max-w-none">
      <div className="flex flex-col gap-5 text-body-article text-muted-foreground">
        {introBlocks.map((block, i) => renderCharterBlock(block, i))}
      </div>

      <div className="mt-10">
        <h2 className="text-lg font-semibold tracking-tight text-foreground md:text-xl">
          {trReg(t, "regulationDocsDownloadTitle")}
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
          {trReg(t, "regulationDocsDownloadLead")}
        </p>
        <p className="mt-3 text-xs text-muted-foreground">{formatLabel}</p>

        <ul
          className="mt-8 grid grid-cols-1 gap-[16px] sm:grid-cols-2 xl:grid-cols-4"
          role="list"
        >
          {REGULATION_DOCUMENTS.map(({ href, code, langKey }) => {
            const file = fileNameFromHref(href);
            const title = t(langKey, { defaultValue: UNIVERSITY_IN_NUMBERS_I18N_DEFAULTS[langKey] });
            return (
              <li key={href} className="flex min-h-0">
                <DownloadCard
                  title={title}
                  description={file}
                  cta={downloadLabel}
                  href={href}
                  PreviewIcon={FileText}
                  previewBadge={code}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
