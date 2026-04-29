import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ExternalLink, Home } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { RecommendedNewsSidebar } from "@/components/RecommendedNewsSidebar";
import { SCIENTIFIC_ARTICLES } from "@/data/scientificArticles";
import { cn } from "@/lib/utils";

function quartileClass(q: string): string {
  const n = q.trim().toUpperCase();
  if (n === "Q1") return "bg-emerald-500/15 text-emerald-800 dark:text-emerald-200";
  if (n === "Q2") return "bg-sky-500/15 text-sky-800 dark:text-sky-200";
  if (n === "Q3") return "bg-amber-500/15 text-amber-900 dark:text-amber-100";
  if (n === "Q4") return "bg-muted text-muted-foreground";
  return "bg-muted text-foreground";
}

export default function ScientificArticlesPage() {
  const { t } = useTranslation("header");
  const { t: tCommon } = useTranslation("common");
  const title = t("secondNavScience.scientificArticles");
  const intro = t("scientificArticlesPageIntro", {
    defaultValue:
      "Publications by TUES faculty and collaborators indexed in Scopus, with journal quartile and record links. Open the Scopus page in a new tab to view the full record.",
  });

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
                    {t("secondNav.science")}
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
                {intro ? (
                  <p className="mt-3 text-justify text-body-article text-muted-foreground">
                    {intro}
                  </p>
                ) : null}

                <div className="mt-8 overflow-x-auto rounded-xl border border-border bg-card shadow-sm">
                  <table className="w-full min-w-[56rem] border-collapse text-left text-sm">
                    <thead>
                      <tr className="border-b border-border bg-muted/50">
                        <th className="whitespace-nowrap px-3 py-3 text-center text-xs font-semibold uppercase tracking-wide text-muted-foreground sm:px-4">
                          {t("scientificArticlesColNo", { defaultValue: "№" })}
                        </th>
                        <th className="min-w-[10rem] px-3 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground sm:px-4">
                          {t("scientificArticlesColAuthor", {
                            defaultValue: "Published Professor full name",
                          })}
                        </th>
                        <th className="min-w-[14rem] px-3 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground sm:px-4">
                          {t("scientificArticlesColTitle", { defaultValue: "Article title" })}
                        </th>
                        <th className="whitespace-nowrap px-3 py-3 text-center text-xs font-semibold uppercase tracking-wide text-muted-foreground sm:px-4">
                          {t("scientificArticlesColQuartile", { defaultValue: "Quartile" })}
                        </th>
                        <th className="whitespace-nowrap px-3 py-3 text-center text-xs font-semibold uppercase tracking-wide text-muted-foreground sm:px-4">
                          {t("scientificArticlesColLink", { defaultValue: "Related link" })}
                        </th>
                        <th className="min-w-[12rem] px-3 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground sm:px-4">
                          {t("scientificArticlesColCoAuthors", { defaultValue: "Co-authors" })}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {SCIENTIFIC_ARTICLES.map((row) => (
                        <tr
                          key={row.no}
                          className="border-b border-border/80 last:border-b-0 odd:bg-background even:bg-muted/20"
                        >
                          <td className="align-top px-3 py-3 text-center tabular-nums text-muted-foreground sm:px-4">
                            {row.no}
                          </td>
                          <td className="align-top px-3 py-3 text-foreground sm:px-4">{row.author}</td>
                          <td className="align-top px-3 py-3 text-justify text-foreground sm:px-4">{row.title}</td>
                          <td className="align-top px-3 py-3 text-center sm:px-4">
                            <span
                              className={cn(
                                "inline-flex min-w-[2.5rem] justify-center rounded-md px-2 py-0.5 text-xs font-medium tabular-nums",
                                quartileClass(row.quartile),
                              )}
                            >
                              {row.quartile}
                            </span>
                          </td>
                          <td className="align-top px-3 py-3 text-center sm:px-4">
                            <a
                              href={row.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-primary underline-offset-2 hover:underline"
                            >
                              {t("scientificArticlesScopusLabel", { defaultValue: "Scopus" })}
                              <ExternalLink className="h-3.5 w-3.5 shrink-0 opacity-80" aria-hidden />
                            </a>
                          </td>
                          <td className="align-top px-3 py-3 text-justify text-sm text-muted-foreground sm:px-4 sm:text-[0.9375rem]">
                            {row.coAuthors}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
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
