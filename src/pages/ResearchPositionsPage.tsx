import type { TFunction } from "i18next";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Home } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { RESEARCH_POSITIONS_PAGE_DEFAULTS } from "@/locales/researchPositionsDefaults";

function trResearchPositions(
  t: TFunction,
  key: keyof typeof RESEARCH_POSITIONS_PAGE_DEFAULTS,
) {
  return t(key, { defaultValue: RESEARCH_POSITIONS_PAGE_DEFAULTS[key] });
}

export default function ResearchPositionsPage() {
  const { t } = useTranslation("topNav");
  const { t: tCommon } = useTranslation("common");
  const { t: th } = useTranslation("header");

  const pageTitle = trResearchPositions(t, "researchPositionsPageTitle");
  const vacanciesLabel = th("secondNav.vacancies");

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
                    {vacanciesLabel}
                  </span>
                </li>
                <li aria-hidden className="flex items-center text-muted-foreground/70">
                  <span className="leading-none">/</span>
                </li>
                <li className="min-w-0 flex-1 font-medium text-foreground">
                  <span className="line-clamp-2 sm:line-clamp-none">{pageTitle}</span>
                </li>
              </ol>
            </nav>
          </div>
        </div>

        <div className="container mx-auto flex min-h-[60vh] max-w-[1348px] items-center px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <article className="mx-auto flex max-w-xl flex-col items-center text-center">
            <img
              src={trResearchPositions(t, "researchPositionsEmptyImageSrc")}
              alt={trResearchPositions(t, "researchPositionsEmptyImageAlt")}
              className="h-auto w-full max-w-[280px] object-contain"
              decoding="async"
              loading="eager"
            />
            <h1 className="mt-8 text-balance text-3xl font-semibold tracking-tight text-foreground md:text-[2rem] md:leading-tight">
              {pageTitle}
            </h1>
            <p className="mt-3 text-body-article text-muted-foreground">
              {trResearchPositions(t, "researchPositionsEmptyMessage")}
            </p>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
