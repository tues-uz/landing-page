import type { TFunction } from "i18next";
import { useTranslation } from "react-i18next";
import { ArrowRight, Presentation } from "lucide-react";
import { DownloadCard } from "@/components/DownloadCard";
import { ChampionsAmbitionBanner } from "@/components/ChampionsAmbitionBanner";
import { UNI_IN_NUMBERS_DECKS } from "@/config/universityInNumbersData";
import {
  UNIVERSITY_IN_NUMBERS_REPORT,
  UNIVERSITY_IN_NUMBERS_TABLE_COL_FIGURE,
  type UniNumbersContentBlock,
  type UniNumbersStatBlock,
} from "@/config/universityInNumbersContent";
import { UNIVERSITY_IN_NUMBERS_I18N_DEFAULTS } from "@/locales/universityInNumbersDefaults";
import { cn } from "@/lib/utils";

function tr(t: TFunction, key: keyof typeof UNIVERSITY_IN_NUMBERS_I18N_DEFAULTS) {
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

function StatTable({ block }: { block: UniNumbersStatBlock }) {
  return (
    <div className="space-y-3">
      <h3 className="text-base font-semibold text-foreground md:text-lg">{block.heading}</h3>
      <div className={tableWrapClass}>
        <table className={tableClass}>
          <thead>
            <tr className="border-b border-border bg-muted/80">
              <th scope="col" className={thClass}>
                {UNIVERSITY_IN_NUMBERS_TABLE_COL_FIGURE}
              </th>
              <th scope="col" className={cn(thClass, "text-right")}>
                <span className="sr-only">Value</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {block.rows.map((row) => (
              <tr key={row.label} className="border-b border-border last:border-b-0">
                <td className={cn(tdClass, "font-medium text-foreground")}>{row.label}</td>
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

function ContentBlock({ block }: { block: UniNumbersContentBlock }) {
  switch (block.type) {
    case "paragraph":
      return <p className="text-justify leading-relaxed">{block.text}</p>;

    case "subheading":
      return (
        <h3 className="text-base font-semibold text-foreground md:text-lg">{block.text}</h3>
      );

    case "statBlock":
      return <StatTable block={block.block} />;

    case "progress":
      return (
        <div className="rounded-xl border border-border bg-muted/40 px-5 py-4">
          <div className="flex flex-wrap items-center gap-3 text-lg font-semibold tabular-nums text-foreground md:text-xl">
            <span>{block.progress.current}</span>
            <ArrowRight className="h-5 w-5 shrink-0 text-primary" aria-hidden />
            <span className="text-primary">{block.progress.target}</span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">
            {block.progress.caption}
          </p>
        </div>
      );

    case "bulletGroup":
      return (
        <div className="space-y-2">
          <h3 className="text-base font-semibold text-foreground md:text-lg">{block.group.heading}</h3>
          <ul className="list-disc space-y-2 pl-5">
            {block.group.items.map((item) => (
              <li key={item} className="leading-relaxed">
                {item}
              </li>
            ))}
          </ul>
        </div>
      );

    case "table":
      return (
        <div className="space-y-3">
          {block.table.heading ? (
            <h3 className="text-base font-semibold text-foreground md:text-lg">{block.table.heading}</h3>
          ) : null}
          <div className={tableWrapClass}>
            <table className={tableClass}>
              <thead>
                <tr className="border-b border-border bg-muted/80">
                  <th scope="col" className={thClass}>
                    {block.table.col1}
                  </th>
                  <th scope="col" className={cn(thClass, "whitespace-nowrap text-right")}>
                    {block.table.col2}
                  </th>
                </tr>
              </thead>
              <tbody>
                {block.table.rows.map((row) => (
                  <tr key={row.col1} className="border-b border-border last:border-b-0">
                    <td className={cn(tdClass, "font-medium text-foreground")}>{row.col1}</td>
                    <td className={cn(tdClass, "text-right tabular-nums text-muted-foreground")}>
                      {row.col2}
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
          {block.table.heading ? (
            <h3 className="text-base font-semibold text-foreground md:text-lg">{block.table.heading}</h3>
          ) : null}
          <div className={tableWrapClass}>
            <table className={tableClass}>
              <thead>
                <tr className="border-b border-border bg-muted/80">
                  <th scope="col" className={cn(thClass, "w-16")}>
                    Rank
                  </th>
                  <th scope="col" className={thClass}>
                    Region
                  </th>
                </tr>
              </thead>
              <tbody>
                {block.table.rows.map((row) => (
                  <tr key={row.rank} className="border-b border-border last:border-b-0">
                    <td className={cn(tdClass, "tabular-nums font-medium text-foreground")}>
                      {row.rank}
                    </td>
                    <td className={cn(tdClass, "text-muted-foreground")}>{row.region}</td>
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
          {block.text}
        </p>
      );

    case "highlight":
      return <ChampionsAmbitionBanner label={block.label} caption={block.caption} />;

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
          {report.institution}
        </p>
        <p className="text-xl font-semibold tracking-tight text-foreground md:text-2xl">{report.headline}</p>
        <p className="text-base font-medium text-muted-foreground md:text-lg">{report.tagline}</p>
      </div>

      <p className="mt-6 text-justify text-body-article leading-relaxed text-muted-foreground">
        {report.intro}
      </p>

      <div className="mt-10 flex flex-col gap-10">
        {report.sections.map((section) => (
          <section key={section.title} className="space-y-5">
            <h2 className="text-balance text-xl font-semibold tracking-tight text-foreground md:text-2xl">
              {section.title}
            </h2>
            <div className="flex flex-col gap-5">
              {section.blocks.map((block, i) => (
                <div
                  key={`${section.title}-${i}`}
                  className={
                    block.type === "highlight"
                      ? undefined
                      : "text-body-article text-muted-foreground"
                  }
                >
                  <ContentBlock block={block} />
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
