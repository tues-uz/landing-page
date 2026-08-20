import type { ReactNode } from "react";
import type { TFunction } from "i18next";
import { useTranslation } from "react-i18next";
import { FileText } from "lucide-react";
import { DownloadCard } from "@/components/DownloadCard";
import { REGULATION_DOCUMENTS } from "@/config/regulationDocumentsData";
import { REGULATION_DOCUMENTS_I18N_DEFAULTS } from "@/locales/regulationDocumentsDefaults";
import { UNIVERSITY_IN_NUMBERS_I18N_DEFAULTS } from "@/locales/universityInNumbersDefaults";
import { cn } from "@/lib/utils";

const bodyClass = "text-body-article leading-relaxed text-muted-foreground";
const MAX_KEY_LABEL_LEN = 50;

function trReg(t: TFunction, key: keyof typeof REGULATION_DOCUMENTS_I18N_DEFAULTS) {
  return t(key, { defaultValue: REGULATION_DOCUMENTS_I18N_DEFAULTS[key] });
}

function fileNameFromHref(href: string): string {
  const last = href.split("/").pop();
  return last ?? href;
}

function isKeyValueLine(line: string): { label: string; value: string } | null {
  const colonIdx = line.indexOf(":");
  if (colonIdx <= 0 || colonIdx > MAX_KEY_LABEL_LEN) return null;
  const label = line.slice(0, colonIdx).trim();
  if (!label) return null;
  return { label, value: line.slice(colonIdx + 1).trim() };
}

function parseKeyValueBlock(lines: string[]): Array<{ label: string; value: string }> | null {
  if (lines.length === 0) return null;

  const items: Array<{ label: string; value: string }> = [];
  let i = 0;

  while (i < lines.length) {
    const parsed = isKeyValueLine(lines[i]);
    if (!parsed) return null;

    const { label } = parsed;
    let { value } = parsed;
    i += 1;

    while (i < lines.length && !isKeyValueLine(lines[i])) {
      value = value ? `${value}\n${lines[i]}` : lines[i];
      i += 1;
    }

    items.push({ label, value });
  }

  return items.length > 0 ? items : null;
}

function CharterValue({ label, value }: { label: string; value: string }) {
  const labelLower = label.toLowerCase();
  const lines = value.split("\n").map((line) => line.trim()).filter(Boolean);

  if (lines.length > 1) {
    return (
      <div className="space-y-2">
        {lines.map((line, i) => (
          <p key={i} className="leading-relaxed">
            {line}
          </p>
        ))}
      </div>
    );
  }

  const single = lines[0] ?? value.trim();
  if (!single) return null;

  if (labelLower.includes("email") && single.includes("@")) {
    return (
      <a
        href={`mailto:${single}`}
        className="font-medium text-primary underline-offset-4 transition-colors hover:underline"
      >
        {single}
      </a>
    );
  }

  if (labelLower.includes("website") || /^[\w.-]+\.\w{2,}$/i.test(single)) {
    const href = single.startsWith("http") ? single : `https://${single}`;
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-primary underline-offset-4 transition-colors hover:underline"
      >
        {single}
      </a>
    );
  }

  if (labelLower.includes("capital") || labelLower.includes("account")) {
    return <span className="font-mono tabular-nums leading-relaxed">{single}</span>;
  }

  return <span className="leading-relaxed">{single}</span>;
}

function KeyValueGrid({ items }: { items: Array<{ label: string; value: string }> }) {
  const useCompactGrid = items.length >= 4;

  return (
    <dl
      className={cn(
        useCompactGrid
          ? "grid grid-cols-1 gap-3 sm:grid-cols-2"
          : "space-y-3",
      )}
    >
      {items.map(({ label, value }) => (
        <div
          key={label}
          className={cn(
            "rounded-xl border border-border bg-muted/40 px-4 py-4 md:px-5 md:py-5",
            !useCompactGrid && "sm:px-6",
          )}
        >
          <dt className="text-sm font-semibold text-foreground md:text-base">{label}</dt>
          <dd className={cn("mt-1.5 text-sm md:text-base", bodyClass)}>
            <CharterValue label={label} value={value} />
          </dd>
        </div>
      ))}
    </dl>
  );
}

function renderCharterBlock(block: string, i: number, headingIndex: number): ReactNode {
  const trimmed = block.trim();

  if (trimmed.startsWith("## ")) {
    const title = trimmed.slice(3).trim();
    const isDocumentTitle = headingIndex === 0;

    return (
      <h2
        key={i}
        className={cn(
          "text-balance font-semibold tracking-tight text-foreground",
          isDocumentTitle
            ? "text-2xl md:text-[1.75rem] md:leading-tight"
            : "border-t border-border pt-8 text-xl md:text-2xl",
        )}
      >
        {title}
      </h2>
    );
  }

  const lines = trimmed.split("\n").map((line) => line.trim()).filter(Boolean);

  if (lines.length > 0 && lines.every((line) => line.startsWith("- "))) {
    return (
      <ul key={i} className={cn("list-disc space-y-2.5 pl-5 marker:text-primary/70", bodyClass)}>
        {lines.map((line, j) => (
          <li key={j} className="pl-0.5">
            {line.slice(2).trim()}
          </li>
        ))}
      </ul>
    );
  }

  const keyValueItems = parseKeyValueBlock(lines);
  if (keyValueItems) {
    return <KeyValueGrid key={i} items={keyValueItems} />;
  }

  if (trimmed.startsWith("Note:")) {
    return (
      <aside
        key={i}
        className="rounded-xl border border-border bg-muted/40 px-4 py-4 sm:px-5 sm:py-5"
        role="note"
      >
        <p className={cn(bodyClass, "text-foreground/90")}>{trimmed}</p>
      </aside>
    );
  }

  return (
    <p key={i} className={cn(bodyClass, "max-w-3xl")}>
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

  let headingCount = 0;

  return (
    <div className="mt-4 max-w-none">
      <div className="flex flex-col gap-5">
        {introBlocks.map((block, i) => {
          const isHeading = block.startsWith("## ");
          const headingIndex = isHeading ? headingCount++ : -1;
          return renderCharterBlock(block, i, headingIndex);
        })}
      </div>

      <div className="mt-10 border-t border-border pt-10">
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
