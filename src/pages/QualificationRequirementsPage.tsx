import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight, Home } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { RecommendedNewsSidebar } from "@/components/RecommendedNewsSidebar";
import { QUALIFICATION_REQUIREMENT_AREAS } from "@/data/qualificationRequirementAreas";

export default function QualificationRequirementsPage() {
  const { t } = useTranslation("header");
  const { t: tCommon } = useTranslation("common");
  const title = t("secondNavEducation.qualificationRequirements");
  const intro = t("qualificationRequirementsPageIntro", {
    defaultValue:
      "The following education areas, listed with specialist ciphers, fall under the current qualification requirements framework.",
  });

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
                    {t("secondNav.education")}
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

                <div
                  className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
                  role="list"
                >
                  {QUALIFICATION_REQUIREMENT_AREAS.map((area, i) => {
                    const key = area.cipher ? `${area.cipher}-${i}` : `area-${i}`;
                    return (
                      <div
                        key={key}
                        role="listitem"
                        className="group flex w-full items-center justify-between rounded-none border-b border-border px-4 py-4 transition-colors hover:border-primary hover:bg-neutral-50/50"
                      >
                        <p className="min-w-0 flex-1 pr-3 text-lg font-semibold leading-tight text-foreground md:text-xl md:leading-tight">
                          {area.title}
                        </p>
                        <span
                          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[rgb(35,47,58)] transition-opacity group-hover:opacity-90"
                          aria-hidden
                        >
                          <ArrowRight className="h-5 w-5 text-white" strokeWidth={2} />
                        </span>
                      </div>
                    );
                  })}
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
