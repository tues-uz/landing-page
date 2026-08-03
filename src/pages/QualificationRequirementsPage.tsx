import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Home } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { RecommendedNewsSidebar } from "@/components/RecommendedNewsSidebar";
import { QUALIFICATION_REQUIREMENT_AREAS } from "@/data/qualificationRequirementAreas";
import { bachelorFullTimeCardImageSrc } from "@/data/bachelorFullTimeCardImages";

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

                <ul
                  className="mt-8 grid list-none grid-cols-1 gap-[16px] p-0 md:grid-cols-3"
                  role="list"
                >
                  {QUALIFICATION_REQUIREMENT_AREAS.map((area, i) => {
                    const imgSrc = bachelorFullTimeCardImageSrc(i + 1);
                    const key = area.cipher ? `${area.cipher}-${i}` : `area-${i}`;
                    return (
                      <li key={key} className="flex min-w-0 flex-col">
                        <div className="group flex min-h-0 w-full flex-1 flex-col overflow-hidden rounded-2xl bg-muted/40">
                          <div className="relative aspect-[5/3] w-full shrink-0 overflow-hidden bg-muted">
                            <img
                              src={imgSrc}
                              alt=""
                              width={480}
                              height={288}
                              loading="lazy"
                              decoding="async"
                              className="h-full w-full object-cover"
                            />
                            {area.cipher ? (
                              <span className="pointer-events-none absolute bottom-3 left-3 rounded-md bg-background/90 px-2 py-0.5 font-mono text-[0.6875rem] font-medium tabular-nums text-foreground shadow-sm backdrop-blur-sm">
                                {area.cipher}
                              </span>
                            ) : null}
                          </div>
                          <div className="relative flex min-h-0 flex-1 flex-col p-4 sm:p-5">
                            <p className="line-clamp-5 text-base font-semibold leading-snug tracking-tight text-foreground sm:text-[1.0625rem]">
                              {area.title}
                            </p>
                            <div className="min-h-0 flex-1" aria-hidden />
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
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
