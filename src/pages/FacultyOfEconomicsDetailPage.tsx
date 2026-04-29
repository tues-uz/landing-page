import type { TFunction } from "i18next";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Home } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { RecommendedNewsSidebar } from "@/components/RecommendedNewsSidebar";
import { FACULTY_ECONOMICS_DEPARTMENTS, FACULTY_ECONOMICS_HERO_SRC } from "@/data/facultyEconomicsDetail";
import { FACULTY_ECONOMICS_DEFAULTS } from "@/locales/facultyOfEconomicsDefaults";
import { FACULTIES_PAGE_DEFAULTS } from "@/locales/facultiesPageDefaults";

function trEcon(t: TFunction, key: keyof typeof FACULTY_ECONOMICS_DEFAULTS) {
  return t(key, { defaultValue: FACULTY_ECONOMICS_DEFAULTS[key] });
}

export default function FacultyOfEconomicsDetailPage() {
  const { t } = useTranslation("topNav");
  const { t: tCommon } = useTranslation("common");
  const { t: th } = useTranslation("header");

  const sectionLabel = th("secondNav.university");
  const listTitle = t("facultiesPageTitle", { defaultValue: FACULTIES_PAGE_DEFAULTS.facultiesPageTitle });
  const pageTitle = t("universityFacultyEconomicsTitle", {
    defaultValue: FACULTIES_PAGE_DEFAULTS.universityFacultyEconomicsTitle,
  });

  const introRaw = trEcon(t, "facultyEconomicsIntroBody");
  const introParagraphs = introRaw
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

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
                    {sectionLabel}
                  </span>
                </li>
                <li aria-hidden className="flex items-center text-muted-foreground/70">
                  <span className="leading-none">/</span>
                </li>
                <li className="flex min-w-0 items-center">
                  <Link
                    to="/university-faculties"
                    className="font-medium text-muted-foreground transition-colors hover:text-foreground line-clamp-2 sm:line-clamp-none"
                  >
                    {listTitle}
                  </Link>
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
              <article className="max-w-none">
                <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                  <div className="relative aspect-[4/3] w-full max-w-3xl bg-muted sm:mx-auto sm:max-w-none lg:aspect-[21/9]">
                    <img
                      src={FACULTY_ECONOMICS_HERO_SRC}
                      alt={pageTitle}
                      className="h-full w-full object-cover object-center"
                      loading="eager"
                      decoding="async"
                    />
                  </div>
                </div>

                <h1 className="mt-8 text-balance text-3xl font-semibold tracking-tight text-foreground md:text-[2rem] md:leading-tight">
                  {pageTitle}
                </h1>

                <div className="mt-6 max-w-3xl space-y-4">
                  {introParagraphs.map((para, i) => (
                    <p key={i} className="text-base leading-relaxed text-muted-foreground">
                      {para}
                    </p>
                  ))}
                </div>

                <section className="mt-10 max-w-3xl" aria-labelledby="faculty-economics-departments-heading">
                  <h2
                    id="faculty-economics-departments-heading"
                    className="text-xl font-semibold tracking-tight text-foreground"
                  >
                    {trEcon(t, "facultyEconomicsDepartmentsHeading")}
                  </h2>
                  <ul className="mt-4 list-disc space-y-1.5 pl-5 text-base leading-relaxed text-muted-foreground">
                    {FACULTY_ECONOMICS_DEPARTMENTS.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
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
