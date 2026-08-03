import type { ReactNode } from "react";
import type { TFunction } from "i18next";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowUpRight, Home } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { RecommendedNewsSidebar } from "@/components/RecommendedNewsSidebar";
import {
  FINANCIAL_STATEMENTS_DEFAULTS,
  type FinancialStatementsI18nKey,
} from "@/locales/financialStatementsDefaults";
import { cn } from "@/lib/utils";

const bodyClass = "text-body-article leading-relaxed text-muted-foreground";
const h2Class = "text-xl font-semibold tracking-tight text-foreground md:text-2xl";
const h3Class = "text-lg font-semibold tracking-tight text-foreground";

const tableWrapClass = "overflow-x-auto rounded-xl border border-border bg-card shadow-sm";
const tableClass = "w-full min-w-[480px] border-collapse text-left text-sm";
const thClass = "px-4 py-3 font-semibold text-foreground whitespace-nowrap";
const tdClass = "px-4 py-3 align-top";

function trFs(t: TFunction, key: FinancialStatementsI18nKey) {
  return t(key, { defaultValue: FINANCIAL_STATEMENTS_DEFAULTS[key] });
}

function SectionBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className={h2Class}>{title}</h2>
      {children}
    </section>
  );
}

type MetricItem = {
  label: string;
  value: string;
  note: string;
};

function isGrowthNote(note: string) {
  return /^\+\d/.test(note.trim());
}

function MetricStrip({ items }: { items: MetricItem[] }) {
  return (
    <dl
      className={cn(
        "grid grid-cols-1 gap-6 border-y border-border py-6 sm:gap-0 sm:divide-x sm:divide-border",
        items.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-3",
      )}
    >
      {items.map((item, index) => {
        const growth = isGrowthNote(item.note);
        return (
          <div
            key={item.label}
            className={cn("min-w-0", index > 0 && "sm:pl-6", index < items.length - 1 && "sm:pr-6")}
          >
            <dt className="text-sm text-muted-foreground">{item.label}</dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight tabular-nums text-foreground md:text-[2rem] md:leading-none">
              {item.value}
            </dd>
            <dd
              className={cn(
                "mt-2 inline-flex items-center gap-1 text-sm",
                growth ? "font-medium text-emerald-700 dark:text-emerald-400" : "text-muted-foreground",
              )}
            >
              {growth ? (
                <ArrowUpRight className="h-3.5 w-3.5 shrink-0" strokeWidth={2.25} aria-hidden />
              ) : null}
              <span>{item.note}</span>
            </dd>
          </div>
        );
      })}
    </dl>
  );
}

function DataTable({
  columns,
  rows,
  numeric = true,
}: {
  columns: string[];
  rows: string[][];
  /** Right-align & tabular-nums for columns after the first (financial figures). */
  numeric?: boolean;
}) {
  return (
    <div className={tableWrapClass}>
      <table className={tableClass}>
        <thead>
          <tr className="border-b border-border bg-muted/80">
            {columns.map((col, i) => (
              <th
                key={col}
                scope="col"
                className={cn(thClass, numeric && i > 0 && "text-right")}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row[0]} className="border-b border-border last:border-b-0">
              {row.map((cell, i) => (
                <td
                  key={`${row[0]}-${i}`}
                  className={cn(
                    tdClass,
                    i === 0
                      ? "font-medium text-foreground"
                      : numeric
                        ? "text-right tabular-nums text-muted-foreground"
                        : "text-muted-foreground",
                  )}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function FinancialStatementsPage() {
  const { t } = useTranslation("topNav");
  const { t: tCommon } = useTranslation("common");
  const { t: th } = useTranslation("header");

  const sectionLabel = th("secondNav.university");
  const navLeafLabel = th("secondNavUniversity.financialStatements");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="below-header">
        <div className="border-b border-border bg-muted/50">
          <div className="container mx-auto flex max-w-[1348px] items-center px-4 py-3 sm:px-6 lg:px-8">
            <nav aria-label={tCommon("breadcrumbNav")} className="min-w-0 flex-1">
              <ol className="m-0 flex list-none flex-wrap items-center gap-x-2 gap-y-1 p-0 text-sm text-[#5A626C]">
                <li className="flex items-center">
                  <Link
                    to="/"
                    className="inline-flex items-center gap-1.5 font-medium leading-none transition-colors hover:text-foreground"
                  >
                    <Home className="h-5 w-5 shrink-0" strokeWidth={1.5} aria-hidden />
                    <span className="leading-none">{tCommon("breadcrumbHome")}</span>
                  </Link>
                </li>
                <li aria-hidden className="flex items-center text-muted-foreground/70">
                  <span className="leading-none">/</span>
                </li>
                <li className="flex min-w-0 items-center">
                  <span className="font-medium text-muted-foreground line-clamp-2 sm:line-clamp-none">
                    {sectionLabel}
                  </span>
                </li>
                <li aria-hidden className="flex items-center text-muted-foreground/70">
                  <span className="leading-none">/</span>
                </li>
                <li className="min-w-0 flex-1 font-medium text-foreground">
                  <span className="line-clamp-2 sm:line-clamp-none">{navLeafLabel}</span>
                </li>
              </ol>
            </nav>
          </div>
        </div>

        <div className="container mx-auto max-w-[1348px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
            <div className="order-1 lg:order-none lg:col-span-9">
              <FinancialStatementsArticle t={t} />
            </div>
            <RecommendedNewsSidebar className="order-2 lg:order-none lg:col-span-3" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function FinancialStatementsArticle({ t }: { t: TFunction }) {
  const yearCols = [
    trFs(t, "financialStatementsTableColIndicator"),
    trFs(t, "financialStatementsTableCol2022"),
    trFs(t, "financialStatementsTableCol2023"),
    trFs(t, "financialStatementsTableCol2024"),
    trFs(t, "financialStatementsTableCol2025"),
  ];

  const usdPerformanceRows = [
    [trFs(t, "financialStatementsRowAnnualTurnover"), "$2,950,047", "$19,508,848", "$25,394,779", "$32,940,000"],
    [trFs(t, "financialStatementsRowNetProfit"), "$13,951", "$487,720", "$888,817", "$1,296,000"],
    [trFs(t, "financialStatementsRowTotalAssets"), "$222,305", "$2,104,039", "$3,217,250", "$4,266,000"],
    [trFs(t, "financialStatementsRowEquity"), "$102,295", "$630,475", "$1,488,172", "$2,754,000"],
  ];

  const turnoverGrowthRows = [
    [trFs(t, "financialStatementsRowAnnualTurnover"), "$3.0M", "$19.5M", "$25.4M", "$32.9M"],
  ];

  const eurTrajectoryCols = [
    trFs(t, "financialStatementsTableColIndicator"),
    trFs(t, "financialStatementsTableCol2022"),
    trFs(t, "financialStatementsTableCol2023"),
    trFs(t, "financialStatementsTableCol2024"),
    trFs(t, "financialStatementsTableCol2025F"),
  ];

  const eurTrajectoryRows = [
    [trFs(t, "financialStatementsRowTurnover"), "€2,731,525", "€18,063,748", "€23,513,684", "€29,400,000"],
    [trFs(t, "financialStatementsRowNetResult"), "€12,918", "€451,593", "€822,979", "€1,150,000"],
    [trFs(t, "financialStatementsRowEquity"), "€94,718", "€583,773", "€1,377,937", "—"],
    [trFs(t, "financialStatementsRowEmployees"), "62", "297", "404", "505"],
  ];

  const highlightKeys: FinancialStatementsI18nKey[] = [
    "financialStatementsKeyHighlight1",
    "financialStatementsKeyHighlight2",
    "financialStatementsKeyHighlight3",
    "financialStatementsKeyHighlight4",
  ];

  const noteKeys: FinancialStatementsI18nKey[] = [
    "financialStatementsNote1",
    "financialStatementsNote2",
    "financialStatementsNote3",
    "financialStatementsNote4",
  ];

  return (
    <article className="max-w-none">
      <p className="text-xs font-semibold uppercase tracking-wider text-primary md:text-sm">
        {trFs(t, "financialStatementsInstitution")}
      </p>
      <h1 className="mt-2 text-balance text-3xl font-semibold tracking-tight text-foreground md:text-[2rem] md:leading-tight">
        {trFs(t, "financialStatementsPageTitle")}
      </h1>
      <p className="mt-2 text-lg font-medium tracking-tight text-foreground/90 md:text-xl">
        {trFs(t, "financialStatementsTagline")}
      </p>

      <div className="mt-8">
        <MetricStrip
          items={[
            {
              label: trFs(t, "financialStatementsHeroTurnoverLabel"),
              value: trFs(t, "financialStatementsHeroTurnoverValue"),
              note: trFs(t, "financialStatementsHeroTurnoverNote"),
            },
            {
              label: trFs(t, "financialStatementsHeroProfitLabel"),
              value: trFs(t, "financialStatementsHeroProfitValue"),
              note: trFs(t, "financialStatementsHeroProfitNote"),
            },
            {
              label: trFs(t, "financialStatementsHeroAssetsLabel"),
              value: trFs(t, "financialStatementsHeroAssetsValue"),
              note: trFs(t, "financialStatementsHeroAssetsNote"),
            },
          ]}
        />
      </div>

      <p className={`mt-5 max-w-3xl text-sm ${bodyClass}`}>
        {trFs(t, "financialStatementsHeroDisclaimer")}
      </p>

      <SectionBlock title={trFs(t, "financialStatementsSection1Title")}>
        <div className={`mt-4 max-w-3xl space-y-4 ${bodyClass}`}>
          <p>{trFs(t, "financialStatementsSection1P1")}</p>
          <p>{trFs(t, "financialStatementsSection1P2")}</p>
        </div>
        <h3 className={`mt-6 ${h3Class}`}>{trFs(t, "financialStatementsKeyHighlightsTitle")}</h3>
        <ul className={`mt-3 max-w-3xl list-disc space-y-2 pl-5 ${bodyClass}`}>
          {highlightKeys.map((key) => (
            <li key={key}>{trFs(t, key)}</li>
          ))}
        </ul>
      </SectionBlock>

      <SectionBlock title={trFs(t, "financialStatementsSection2Title")}>
        <p className={`mt-4 max-w-3xl ${bodyClass}`}>{trFs(t, "financialStatementsSection2Intro")}</p>
        <div className="mt-5">
          <DataTable columns={yearCols} rows={usdPerformanceRows} />
        </div>
        <p className="mt-3 text-sm text-muted-foreground">{trFs(t, "financialStatementsUsdTableSource")}</p>

        <h3 className={`mt-8 ${h3Class}`}>{trFs(t, "financialStatementsTurnoverGrowthTitle")}</h3>
        <div className="mt-3">
          <DataTable
            columns={[trFs(t, "financialStatementsTableColYear"), ...yearCols.slice(1)]}
            rows={turnoverGrowthRows}
          />
        </div>

        <h3 className={`mt-8 ${h3Class}`}>{trFs(t, "financialStatementsStrategicSummaryTitle")}</h3>
        <p className={`mt-3 max-w-3xl ${bodyClass}`}>
          {trFs(t, "financialStatementsStrategicSummaryP1")}
        </p>
      </SectionBlock>

      <SectionBlock title={trFs(t, "financialStatementsSection3Title")}>
        <p className={`mt-4 max-w-3xl ${bodyClass}`}>{trFs(t, "financialStatementsSection3Intro")}</p>

        <h3 className={`mt-8 ${h3Class}`}>{trFs(t, "financialStatementsCorporateProfileTitle")}</h3>
        <div className="mt-3">
          <DataTable
            numeric={false}
            columns={[
              trFs(t, "financialStatementsTableColField"),
              trFs(t, "financialStatementsTableColDetail"),
            ]}
            rows={[
              [trFs(t, "financialStatementsProfileRector"), trFs(t, "financialStatementsProfileRectorValue")],
              [trFs(t, "financialStatementsProfileFounded"), trFs(t, "financialStatementsProfileFoundedValue")],
              [trFs(t, "financialStatementsProfileTaxId"), trFs(t, "financialStatementsProfileTaxIdValue")],
              [
                trFs(t, "financialStatementsProfileLocation"),
                trFs(t, "financialStatementsProfileLocationValue"),
              ],
            ]}
          />
        </div>

        <h3 className={`mt-8 ${h3Class}`}>{trFs(t, "financialStatementsActualVsTargetTitle")}</h3>
        <div className="mt-4">
          <MetricStrip
            items={[
              {
                label: trFs(t, "financialStatementsEurTurnoverLabel"),
                value: trFs(t, "financialStatementsEurTurnoverValue"),
                note: trFs(t, "financialStatementsEurTurnoverNote"),
              },
              {
                label: trFs(t, "financialStatementsEurNetLabel"),
                value: trFs(t, "financialStatementsEurNetValue"),
                note: trFs(t, "financialStatementsEurNetNote"),
              },
            ]}
          />
        </div>
        <div className="mt-4">
          <DataTable
            columns={[
              trFs(t, "financialStatementsTableColIndicator"),
              trFs(t, "financialStatementsTableCol2024Actual"),
            ]}
            rows={[
              [trFs(t, "financialStatementsRowTotalAssets"), "€2,978,935"],
              [trFs(t, "financialStatementsRowEquityCapital"), "€1,377,937"],
              [trFs(t, "financialStatementsRowStaffActual"), trFs(t, "financialStatementsStaffActualValue")],
            ]}
          />
        </div>

        <h3 className={`mt-8 ${h3Class}`}>{trFs(t, "financialStatementsEurTrajectoryTitle")}</h3>
        <div className="mt-3">
          <DataTable columns={eurTrajectoryCols} rows={eurTrajectoryRows} />
        </div>
        <p className="mt-3 text-sm text-muted-foreground">{trFs(t, "financialStatementsEurTableSource")}</p>

        <h3 className={`mt-8 ${h3Class}`}>{trFs(t, "financialStatementsHumanCapitalTitle")}</h3>
        <p className={`mt-3 max-w-3xl ${bodyClass}`}>{trFs(t, "financialStatementsHumanCapitalP1")}</p>
        <ul className={`mt-3 max-w-3xl list-disc space-y-2 pl-5 ${bodyClass}`}>
          <li>{trFs(t, "financialStatementsHumanCapitalTarget")}</li>
          <li>{trFs(t, "financialStatementsHumanCapitalJobs")}</li>
        </ul>
      </SectionBlock>

      <SectionBlock title={trFs(t, "financialStatementsSection4Title")}>
        <ul className={`mt-4 max-w-3xl list-disc space-y-2 pl-5 ${bodyClass}`}>
          {noteKeys.map((key) => (
            <li key={key}>{trFs(t, key)}</li>
          ))}
        </ul>
      </SectionBlock>
    </article>
  );
}
