import type { TFunction } from "i18next";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Home } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { RecommendedNewsSidebar } from "@/components/RecommendedNewsSidebar";
import { HEALTH_SUPPORT_PAGE_DEFAULTS } from "@/locales/healthSupportDefaults";

function trHealthSupport(t: TFunction, key: keyof typeof HEALTH_SUPPORT_PAGE_DEFAULTS) {
  return t(key, { defaultValue: HEALTH_SUPPORT_PAGE_DEFAULTS[key] });
}

const bodyClass = "text-body-article text-muted-foreground";
const h2Class = "text-xl font-semibold tracking-tight text-foreground md:text-2xl";

const SECTIONS: { heading: keyof typeof HEALTH_SUPPORT_PAGE_DEFAULTS; body: keyof typeof HEALTH_SUPPORT_PAGE_DEFAULTS }[] = [
  { heading: "healthSupportPhysicalHeading", body: "healthSupportPhysicalBody" },
  { heading: "healthSupportReproductiveHeading", body: "healthSupportReproductiveBody" },
  { heading: "healthSupportMentalHeading", body: "healthSupportMentalBody" },
  { heading: "healthSupportInclusiveHeading", body: "healthSupportInclusiveBody" },
  { heading: "healthSupportCapacityHeading", body: "healthSupportCapacityBody" },
  { heading: "healthSupportCoreHeading", body: "healthSupportCoreBody" },
  { heading: "healthSupportSignificanceHeading", body: "healthSupportSignificanceBody" },
];

export default function HealthSupportPage() {
  const { t } = useTranslation("topNav");
  const { t: tCommon } = useTranslation("common");
  const { t: th } = useTranslation("header");

  const studentLifeLabel = th("secondNav.studentLife");
  const navLeafLabel = th("secondNavStudentLife.healthSupportService");

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
                  <span className="font-medium text-muted-foreground line-clamp-2 sm:line-clamp-none">{studentLifeLabel}</span>
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
              <HealthSupportArticle t={t} />
            </div>
            <RecommendedNewsSidebar className="order-2 lg:order-none lg:col-span-3" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function HealthSupportArticle({ t }: { t: TFunction }) {
  const title = trHealthSupport(t, "healthSupportPageTitle");
  const intro = trHealthSupport(t, "healthSupportPageIntro");

  return (
    <article className="max-w-none">
      <h1 className="text-balance text-3xl font-semibold tracking-tight text-foreground md:text-[2rem] md:leading-tight">
        {title}
      </h1>
      <p className={`mt-3 text-justify ${bodyClass}`}>{intro}</p>

      {SECTIONS.map(({ heading, body }) => (
        <section key={String(heading)} className="mt-10">
          <h2 className={h2Class}>{trHealthSupport(t, heading)}</h2>
          <p className={`mt-4 text-justify ${bodyClass}`}>{trHealthSupport(t, body)}</p>
        </section>
      ))}
    </article>
  );
}
