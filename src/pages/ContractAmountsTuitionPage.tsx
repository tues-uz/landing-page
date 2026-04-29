import type { TFunction } from "i18next";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Home } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { RecommendedNewsSidebar } from "@/components/RecommendedNewsSidebar";
import { CONTRACT_AMOUNTS_TUITION_PAGE_DEFAULTS } from "@/locales/contractAmountsTuitionDefaults";
import { CONTRACT_AMOUNTS_TUITION_2024_2025 } from "@/data/contractAmountsTuition2024Rows";
function trContract(t: TFunction, key: keyof typeof CONTRACT_AMOUNTS_TUITION_PAGE_DEFAULTS) {
  return t(key, { defaultValue: CONTRACT_AMOUNTS_TUITION_PAGE_DEFAULTS[key] });
}

export default function ContractAmountsTuitionPage() {
  const { t } = useTranslation("topNav");
  const { t: tCommon } = useTranslation("common");
  const { t: th } = useTranslation("header");

  const admissionLabel = th("secondNav.admission2025");
  const title = trContract(t, "contractAmountsTuitionPageTitle");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="below-header">
        <div className="border-b border-border bg-muted/50">
          <div className="container mx-auto flex max-w-[1348px] items-center px-4 py-3 sm:px-6 lg:px-8">
            <nav aria-label="Breadcrumb" className="min-w-0 flex-1">
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
                    {admissionLabel}
                  </span>
                </li>
                <li aria-hidden className="flex items-center text-muted-foreground/70">
                  <span className="leading-none">/</span>
                </li>
                <li className="min-w-0 flex-1 font-medium text-foreground">
                  <span className="line-clamp-2 sm:line-clamp-none">{title}</span>
                </li>
              </ol>
            </nav>
          </div>
        </div>

        <div className="container mx-auto max-w-[1348px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
            <div className="order-1 lg:order-none lg:col-span-9">
              <article className="max-w-none">
                <h1 className="text-balance text-3xl font-semibold tracking-tight text-foreground md:text-[2rem] md:leading-tight">
                  {title}
                </h1>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  {trContract(t, "contractAmountsTuitionPageIntro")}
                </p>
                <ContractAmountsTable t={t} />
              </article>
            </div>
            <RecommendedNewsSidebar className="order-2 lg:order-none lg:col-span-3" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function ContractAmountsTable({ t }: { t: TFunction }) {
  const colNo = trContract(t, "contractAmountsTuitionColNo");
  const colCode = trContract(t, "contractAmountsTuitionColCode");
  const colName = trContract(t, "contractAmountsTuitionColName");
  const colDuration = trContract(t, "contractAmountsTuitionColDuration");
  const colForm = trContract(t, "contractAmountsTuitionColForm");
  const colAmount = trContract(t, "contractAmountsTuitionColAmount");

  return (
    <div className="mt-8 overflow-x-auto rounded-xl border border-border bg-card shadow-sm">
      <table className="w-full min-w-[720px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/80">
            <th scope="col" className="whitespace-nowrap px-3 py-3 font-semibold text-foreground sm:px-4">
              {colNo}
            </th>
            <th scope="col" className="whitespace-nowrap px-3 py-3 font-semibold text-foreground sm:px-4">
              {colCode}
            </th>
            <th scope="col" className="min-w-[12rem] px-3 py-3 font-semibold text-foreground sm:px-4">
              {colName}
            </th>
            <th scope="col" className="whitespace-nowrap px-3 py-3 font-semibold text-foreground sm:px-4">
              {colDuration}
            </th>
            <th scope="col" className="whitespace-nowrap px-3 py-3 font-semibold text-foreground sm:px-4">
              {colForm}
            </th>
            <th scope="col" className="whitespace-nowrap px-3 py-3 font-semibold text-foreground sm:px-4">
              {colAmount}
            </th>
          </tr>
        </thead>
        <tbody>
          {CONTRACT_AMOUNTS_TUITION_2024_2025.map((line, i) => {
            if (line.kind === "section") {
              return (
                <tr key={`s-${i}`} className="border-b border-border bg-primary/10">
                  <td
                    colSpan={6}
                    className="px-3 py-3 text-center text-sm font-semibold text-foreground sm:px-4"
                  >
                    {line.title}
                  </td>
                </tr>
              );
            }
            return (
              <tr
                key={`r-${i}-${line.code}-${line.duration}-${line.form}`}
                className="border-b border-border transition-colors last:border-b-0 hover:bg-muted/25"
              >
                <td className="whitespace-nowrap px-3 py-2.5 align-top text-muted-foreground sm:px-4">
                  {line.index}
                </td>
                <td className="whitespace-nowrap px-3 py-2.5 align-top font-mono text-[13px] text-foreground sm:px-4">
                  {line.code}
                </td>
                <td className="px-3 py-2.5 align-top text-foreground sm:px-4">{line.name}</td>
                <td className="whitespace-nowrap px-3 py-2.5 align-top text-muted-foreground sm:px-4">
                  {line.duration}
                </td>
                <td className="whitespace-nowrap px-3 py-2.5 align-top text-muted-foreground sm:px-4">
                  {line.form}
                </td>
                <td className="whitespace-nowrap px-3 py-2.5 align-top font-medium tabular-nums text-foreground sm:px-4">
                  {line.amount}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
