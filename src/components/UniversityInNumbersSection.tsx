import type { TFunction } from "i18next";
import { useTranslation } from "react-i18next";
import { ArrowRight, Presentation } from "lucide-react";
import { DownloadCard } from "@/components/DownloadCard";
import { ChampionsAmbitionBanner } from "@/components/ChampionsAmbitionBanner";
import { UNI_IN_NUMBERS_DECKS } from "@/config/universityInNumbersData";
import {
  UNIVERSITY_IN_NUMBERS_REPORT,
  type UniNumbersContentBlock,
  type UniNumbersStatBlock,
} from "@/config/universityInNumbersContent";
import {
  UNIVERSITY_IN_NUMBERS_I18N_DEFAULTS,
  type UniNumbersI18nKey,
} from "@/locales/universityInNumbersDefaults";
import { cn } from "@/lib/utils";

function tr(t: TFunction, key: UniNumbersI18nKey) {
  return t(key, { defaultValue: UNIVERSITY_IN_NUMBERS_I18N_DEFAULTS[key] });
}

function fileNameFromHref(href: string): string {
  const last = href.split("/").pop();
  return last ?? href;
}

const tableWrapClass =
  "overflow-x-auto rounded-xl border border-border bg-card shadow-sm";
const tableClass = "w-full min-w-[320px] border-collapse text-left text-sm";
const thClass = "px-4 py-3 font-semibold text-foreground";
const tdClass = "px-4 py-3 align-top";

function StatTable({ block, t }: { block: UniNumbersStatBlock; t: TFunction }) {
  return (
    <div className="space-y-3">
      <h3 className="text-base font-semibold text-foreground md:text-lg">
        {tr(t, block.headingKey)}
      </h3>
      <div className={tableWrapClass}>
        <table className={tableClass}>
          <thead>
            <tr className="border-b border-border bg-muted/80">
              <th scope="col" className={thClass}>
                {tr(t, "uniNumbersTableColFigure")}
              </th>
              <th scope="col" className={cn(thClass, "text-right")}>
                <span className="sr-only">{tr(t, "uniNumbersTableColValue")}</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {block.rows.map((row) => (
              <tr key={row.labelKey} className="border-b border-border last:border-b-0">
                <td className={cn(tdClass, "font-medium text-foreground")}>{tr(t, row.labelKey)}</td>
                <td className={cn(tdClass, "text-right tabular-nums text-muted-foreground")}>
                  {row.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ContentBlock({ block, t }: { block: UniNumbersContentBlock; t: TFunction }) {
  switch (block.type) {
    case "paragraph":
      return <p className="text-justify leading-relaxed">{tr(t, block.contentKey)}</p>;

    case "subheading":
      return (
        <h3 className="text-base font-semibold text-foreground md:text-lg">
          {tr(t, block.contentKey)}
        </h3>
      );

    case "statBlock":
      return <StatTable block={block.block} t={t} />;

    case "progress":
      return (
        <div className="rounded-xl border border-border bg-muted/40 px-5 py-4">
          <div className="flex flex-wrap items-center gap-3 text-lg font-semibold tabular-nums text-foreground md:text-xl">
            <span>{block.progress.current}</span>
            <ArrowRight className="h-5 w-5 shrink-0 text-primary" aria-hidden />
            <span className="text-primary">{block.progress.target}</span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">
            {tr(t, block.progress.captionKey)}
          </p>
        </div>
      );

    case "bulletGroup":
      return (
        <div className="space-y-2">
          <h3 className="text-base font-semibold text-foreground md:text-lg">
            {tr(t, block.group.headingKey)}
          </h3>
          <ul className="list-disc space-y-2 pl-5">
            {block.group.itemKeys.map((itemKey) => (
              <li key={itemKey} className="leading-relaxed">
                {tr(t, itemKey)}
              </li>
            ))}
          </ul>
        </div>
      );

    case "table":
      return (
        <div className="space-y-3">
          {block.table.headingKey ? (
            <h3 className="text-base font-semibold text-foreground md:text-lg">
              {tr(t, block.table.headingKey)}
            </h3>
          ) : null}
          <div className={tableWrapClass}>
            <table className={tableClass}>
              <thead>
                <tr className="border-b border-border bg-muted/80">
                  <th scope="col" className={thClass}>
                    {tr(t, block.table.col1Key)}
                  </th>
                  <th scope="col" className={cn(thClass, "whitespace-nowrap text-right")}>
                    {tr(t, block.table.col2Key)}
                  </th>
                </tr>
              </thead>
              <tbody>
                {block.table.rows.map((row) => (
                  <tr key={row.col1Key} className="border-b border-border last:border-b-0">
                    <td className={cn(tdClass, "font-medium text-foreground")}>
                      {tr(t, row.col1Key)}
                    </td>
                    <td className={cn(tdClass, "text-right tabular-nums text-muted-foreground")}>
                      {row.col2Key ? tr(t, row.col2Key) : row.col2}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );

    case "rankTable":
      return (
        <div className="space-y-3">
          {block.table.headingKey ? (
            <h3 className="text-base font-semibold text-foreground md:text-lg">
              {tr(t, block.table.headingKey)}
            </h3>
          ) : null}
          <div className={tableWrapClass}>
            <table className={tableClass}>
              <thead>
                <tr className="border-b border-border bg-muted/80">
                  <th scope="col" className={cn(thClass, "w-16")}>
                    {tr(t, "uniNumbersTableColRank")}
                  </th>
                  <th scope="col" className={thClass}>
                    {tr(t, "uniNumbersTableColRegion")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {block.table.rows.map((row) => (
                  <tr key={row.rank} className="border-b border-border last:border-b-0">
                    <td className={cn(tdClass, "tabular-nums font-medium text-foreground")}>
                      {row.rank}
                    </td>
                    <td className={cn(tdClass, "text-muted-foreground")}>
                      {tr(t, row.regionKey)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );

    case "callout":
      return (
        <p className="rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 text-sm font-medium leading-relaxed text-foreground md:text-base">
          {tr(t, block.contentKey)}
        </p>
      );

    case "highlight":
      return (
        <ChampionsAmbitionBanner
          label={tr(t, block.labelKey)}
          caption={tr(t, block.captionKey)}
        />
      );

    default:
      return null;
  }
}

export function UniversityInNumbersSection() {
  const { t } = useTranslation("topNav");
  const report = UNIVERSITY_IN_NUMBERS_REPORT;

  const downloadLabel = tr(t, "uniNumbersDownloadCta");
  const formatLabel = tr(t, "uniNumbersPptxBadge");

  return (
    <div className="mt-4 max-w-none">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-primary md:text-sm">
          {tr(t, report.institutionKey)}
        </p>
        <p className="text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          {tr(t, report.headlineKey)}
        </p>
        <p className="text-base font-medium text-muted-foreground md:text-lg">
          {tr(t, report.taglineKey)}
        </p>
      </div>

      <p className="mt-6 text-justify text-body-article leading-relaxed text-muted-foreground">
        {tr(t, report.introKey)}
      </p>

      <div className="mt-10 flex flex-col gap-10">
        {report.sections.map((section) => (
          <section key={section.titleKey} className="space-y-5">
            <h2 className="text-balance text-xl font-semibold tracking-tight text-foreground md:text-2xl">
              {tr(t, section.titleKey)}
            </h2>
            <div className="flex flex-col gap-5">
              {section.blocks.map((block, i) => (
                <div
                  key={`${section.titleKey}-${i}`}
                  className={
                    block.type === "highlight"
                      ? undefined
                      : "text-body-article text-muted-foreground"
                  }
                >
                  <ContentBlock block={block} t={t} />
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-12 border-t border-border pt-10">
        <h2 className="text-lg font-semibold tracking-tight text-foreground md:text-xl">
          {tr(t, "universityInNumbersDownloadTitle")}
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
          {tr(t, "universityInNumbersDownloadLead")}
        </p>
        <p className="mt-3 text-xs text-muted-foreground">{formatLabel}</p>

        <ul
          className="mt-8 grid grid-cols-1 gap-[16px] sm:grid-cols-2 xl:grid-cols-4"
          role="list"
        >
          {UNI_IN_NUMBERS_DECKS.map(({ href, code, langKey }) => {
            const file = fileNameFromHref(href);
            const title = tr(t, langKey);
            return (
              <li key={href} className="flex min-h-0">
                <DownloadCard
                  title={title}
                  description={file}
                  cta={downloadLabel}
                  href={href}
                  PreviewIcon={Presentation}
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
