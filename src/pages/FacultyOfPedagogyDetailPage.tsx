import type { TFunction } from "i18next";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Home } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { RecommendedNewsSidebar } from "@/components/RecommendedNewsSidebar";
import {
  FACULTY_PEDAGOGY_CONFERENCE_TYPES,
  FACULTY_PEDAGOGY_DEPARTMENTS,
  FACULTY_PEDAGOGY_HERO_SRC,
  FACULTY_PEDAGOGY_SCALE_STATS,
  FACULTY_PEDAGOGY_SCIENTIFIC_OUTPUT,
  FACULTY_PEDAGOGY_STUDENT_HIGHLIGHTS,
} from "@/data/facultyPedagogyDetail";
import { FACULTY_PEDAGOGY_DEFAULTS } from "@/locales/facultyOfPedagogyDefaults";
import { FACULTIES_PAGE_DEFAULTS } from "@/locales/facultiesPageDefaults";

function trPed(t: TFunction, key: keyof typeof FACULTY_PEDAGOGY_DEFAULTS) {
  return t(key, { defaultValue: FACULTY_PEDAGOGY_DEFAULTS[key] });
}

export default function FacultyOfPedagogyDetailPage() {
  const { t } = useTranslation("topNav");
  const { t: tCommon } = useTranslation("common");
  const { t: th } = useTranslation("header");

  const sectionLabel = th("secondNav.university");
  const listTitle = t("facultiesPageTitle", { defaultValue: FACULTIES_PAGE_DEFAULTS.facultiesPageTitle });
  const pageTitle = t("universityFacultyPedagogyTitle", {
    defaultValue: FACULTIES_PAGE_DEFAULTS.universityFacultyPedagogyTitle,
  });

  const introRaw = trPed(t, "facultyPedagogyIntroBody");
  const introParagraphs = introRaw
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  const olympiadsRaw = trPed(t, "facultyPedagogyOlympiadsBody");
  const olympiadParagraphs = olympiadsRaw
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  const closingRaw = trPed(t, "facultyPedagogyClosingBody");
  const closingParagraphs = closingRaw
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

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
                      src={FACULTY_PEDAGOGY_HERO_SRC}
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

                <div className="mt-8 max-w-3xl">
                  <p className="text-base font-medium leading-relaxed text-foreground">
                    {trPed(t, "facultyPedagogyScaleIntro")}
                  </p>
                  <ul className="mt-3 list-disc space-y-1.5 pl-5 text-base leading-relaxed text-muted-foreground">
                    {FACULTY_PEDAGOGY_SCALE_STATS.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 max-w-3xl space-y-4">
                  {olympiadParagraphs.map((para, i) => (
                    <p key={i} className="text-base leading-relaxed text-muted-foreground">
                      {para}
                    </p>
                  ))}
                </div>

                <div className="mt-8 max-w-3xl">
                  <p className="text-base font-semibold text-foreground">
                    {trPed(t, "facultyPedagogyAmongStudentsHeading")}
                  </p>
                  <ul className="mt-3 list-disc space-y-1.5 pl-5 text-base leading-relaxed text-muted-foreground">
                    {FACULTY_PEDAGOGY_STUDENT_HIGHLIGHTS.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                    {trPed(t, "facultyPedagogyRectorsScholarship")}
                  </p>
                </div>

                <section className="mt-10 max-w-3xl" aria-labelledby="faculty-pedagogy-scientific-heading">
                  <h2
                    id="faculty-pedagogy-scientific-heading"
                    className="text-xl font-semibold tracking-tight text-foreground"
                  >
                    {trPed(t, "facultyPedagogySectionScientificTitle")}
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                    {trPed(t, "facultyPedagogyScientificIntro")}
                  </p>
                  <ul className="mt-3 list-disc space-y-1.5 pl-5 text-base leading-relaxed text-muted-foreground">
                    {FACULTY_PEDAGOGY_SCIENTIFIC_OUTPUT.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <p className="mt-6 text-base font-medium leading-relaxed text-foreground">
                    {trPed(t, "facultyPedagogyScientificOrganizerIntro")}
                  </p>
                  <ul className="mt-3 list-disc space-y-1.5 pl-5 text-base leading-relaxed text-muted-foreground">
                    {FACULTY_PEDAGOGY_CONFERENCE_TYPES.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                    {trPed(t, "facultyPedagogyScientificOrganizerClosing")}
                  </p>
                </section>

                <section className="mt-10 max-w-3xl" aria-labelledby="faculty-pedagogy-spiritual-heading">
                  <h2
                    id="faculty-pedagogy-spiritual-heading"
                    className="text-xl font-semibold tracking-tight text-foreground"
                  >
                    {trPed(t, "facultyPedagogySectionSpiritualTitle")}
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                    {trPed(t, "facultyPedagogySpiritualBody")}
                  </p>
                </section>

                <div className="mt-10 max-w-3xl space-y-4">
                  {closingParagraphs.map((para, i) => (
                    <p key={i} className="text-base leading-relaxed text-muted-foreground">
                      {para}
                    </p>
                  ))}
                </div>

                <section className="mt-10 max-w-3xl" aria-labelledby="faculty-pedagogy-departments-heading">
                  <h2
                    id="faculty-pedagogy-departments-heading"
                    className="text-xl font-semibold tracking-tight text-foreground"
                  >
                    {trPed(t, "facultyPedagogyDepartmentsHeading")}
                  </h2>
                  <ul className="mt-4 list-disc space-y-1.5 pl-5 text-base leading-relaxed text-muted-foreground">
                    {FACULTY_PEDAGOGY_DEPARTMENTS.map((item) => (
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
