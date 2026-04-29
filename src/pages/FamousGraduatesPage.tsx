import type { TFunction } from "i18next";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Home } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { RecommendedNewsSidebar } from "@/components/RecommendedNewsSidebar";
import { FAMOUS_GRADUATES } from "@/data/famousGraduates";
import {
  FAMOUS_GRADUATE_DETAIL_BIO_KEY_BY_ID,
  FAMOUS_GRADUATES_PAGE_DEFAULTS,
} from "@/locales/famousGraduatesDefaults";
import { cn } from "@/lib/utils";

function trFg(t: TFunction, key: keyof typeof FAMOUS_GRADUATES_PAGE_DEFAULTS) {
  return t(key, { defaultValue: FAMOUS_GRADUATES_PAGE_DEFAULTS[key] });
}

export default function FamousGraduatesPage() {
  const { t } = useTranslation("topNav");
  const { t: tCommon } = useTranslation("common");
  const { t: th } = useTranslation("header");

  const sectionLabel = th("secondNav.university");
  const title = trFg(t, "famousGraduatesPageTitle");
  const intro = trFg(t, "famousGraduatesPageIntro");
  const readMore = trFg(t, "famousGraduatesReadMore");

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
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">{intro}</p>

                <ul
                  className="mt-10 grid list-none grid-cols-1 gap-[16px] p-0 sm:grid-cols-2 lg:grid-cols-3"
                  role="list"
                >
                  {FAMOUS_GRADUATES.map(({ id, fullName, portraitSrc }, index) => {
                    const hasDetail = Boolean(FAMOUS_GRADUATE_DETAIL_BIO_KEY_BY_ID[id]);
                    const cardClass = cn(
                      "group flex h-full w-full min-h-0 flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm",
                      "transition-colors hover:border-primary/25 hover:shadow-md",
                      hasDetail &&
                        "cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    );
                    const inner = (
                      <>
                        <div className="relative aspect-[3/2] w-full shrink-0 overflow-hidden bg-muted">
                          <img
                            src={portraitSrc}
                            alt={fullName}
                            className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                            loading={index < 3 ? "eager" : "lazy"}
                            decoding="async"
                          />
                        </div>
                        <div className="flex min-h-0 flex-1 flex-col p-5">
                          <h2 className="text-lg font-semibold leading-snug tracking-tight text-foreground md:text-xl">
                            {fullName}
                          </h2>
                          {hasDetail ? (
                            <span className="mt-2 inline-block text-sm font-medium text-primary">
                              {readMore}
                            </span>
                          ) : null}
                        </div>
                      </>
                    );
                    return (
                      <li key={id} className="flex min-h-0">
                        {hasDetail ? (
                          <Link
                            to={`/university-famous-graduates/${id}`}
                            className={cardClass}
                            aria-label={`${fullName} — ${readMore}`}
                          >
                            {inner}
                          </Link>
                        ) : (
                          <div className={cardClass}>{inner}</div>
                        )}
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
