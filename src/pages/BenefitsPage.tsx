import type { TFunction } from "i18next";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Home } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { RecommendedNewsSidebar } from "@/components/RecommendedNewsSidebar";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BENEFITS_CARD_KEYS,
  BENEFITS_PAGE_DEFAULTS,
} from "@/locales/benefitsDefaults";

function trBenefits(t: TFunction, key: keyof typeof BENEFITS_PAGE_DEFAULTS) {
  return t(key, { defaultValue: BENEFITS_PAGE_DEFAULTS[key] });
}

export default function BenefitsPage() {
  const { t } = useTranslation("topNav");
  const { t: tCommon } = useTranslation("common");
  const { t: th } = useTranslation("header");

  const pageTitle = trBenefits(t, "benefitsPageTitle");
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

        <div className="container mx-auto max-w-[1348px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
            <div className="order-1 lg:order-none lg:col-span-9">
              <BenefitsArticle t={t} />
            </div>
            <RecommendedNewsSidebar className="order-2 lg:order-none lg:col-span-3" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function BenefitsArticle({ t }: { t: TFunction }) {
  const title = trBenefits(t, "benefitsPageTitle");
  const intro = trBenefits(t, "benefitsPageIntro");

  return (
    <article className="max-w-none">
      <header className="max-w-2xl">
        <h1 className="text-balance text-3xl font-semibold tracking-tight text-foreground md:text-[2rem] md:leading-tight">
          {title}
        </h1>
        <p className="mt-3 text-body-article text-muted-foreground">{intro}</p>
      </header>

      <div className="mt-10 max-w-3xl overflow-hidden rounded-xl border border-border">
        <ul className="m-0 grid list-none grid-cols-1 divide-y divide-border p-0 md:grid-cols-3 md:divide-x md:divide-y-0" role="list">
          {BENEFITS_CARD_KEYS.map((cardKey, index) => {
            const cardTitle = trBenefits(t, cardKey);

            return (
              <li key={cardKey} className="min-w-0">
                <Card className="h-full rounded-none border-0 bg-card shadow-none">
                  <CardHeader className="flex h-full flex-col gap-4 p-6">
                    <span
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm bg-primary text-[13px] font-bold tabular-nums leading-none text-primary-foreground"
                      aria-hidden
                    >
                      {index + 1}
                    </span>
                    <CardTitle className="text-base font-semibold leading-snug tracking-tight text-foreground sm:text-lg">
                      {cardTitle}
                    </CardTitle>
                  </CardHeader>
                </Card>
              </li>
            );
          })}
        </ul>
      </div>
    </article>
  );
}
