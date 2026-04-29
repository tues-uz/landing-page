import type { TFunction } from "i18next";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Home } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { RecommendedNewsSidebar } from "@/components/RecommendedNewsSidebar";
import { PresidentOrderStateOrderArticle } from "@/components/PresidentOrderStateOrderArticle";
import { PRESIDENT_ORDER_ADMISSION_PARAMS_DEFAULTS } from "@/locales/presidentOrderAdmissionParametersDefaults";

const HERO_SRC = "/images/admission-2025/president-order-examination-hall.jpg" as const;

function trPo(t: TFunction, key: keyof typeof PRESIDENT_ORDER_ADMISSION_PARAMS_DEFAULTS) {
  return t(key, { defaultValue: PRESIDENT_ORDER_ADMISSION_PARAMS_DEFAULTS[key] });
}

export default function PresidentOrderAdmissionParametersPage() {
  const { t, i18n } = useTranslation("topNav");
  const { t: tCommon } = useTranslation("common");
  const { t: th } = useTranslation("header");

  const admissionLabel = th("secondNav.admission2025");
  const title = trPo(t, "presidentOrderAdmissionParamsPageTitle");
  const heroAlt = trPo(t, "presidentOrderAdmissionParamsHeroAlt");
  const showLocaleNote = i18n.language !== "uz";

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
                <figure className="relative aspect-[21/9] w-full overflow-hidden rounded-xl border border-border bg-muted shadow-sm sm:aspect-[2/1]">
                  <img
                    src={HERO_SRC}
                    alt={heroAlt}
                    className="absolute inset-0 h-full w-full object-cover object-center"
                    decoding="async"
                    loading="eager"
                  />
                </figure>
                <h1 className="mt-6 text-balance text-3xl font-semibold tracking-tight text-foreground md:text-[2rem] md:leading-tight">
                  {title}
                </h1>
                {showLocaleNote ? (
                  <p className="mt-3 text-sm italic text-muted-foreground">
                    {trPo(t, "presidentOrderAdmissionParamsLocaleNote")}
                  </p>
                ) : null}
                <PresidentOrderStateOrderArticle />
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
