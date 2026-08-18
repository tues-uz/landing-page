import type { TFunction } from "i18next";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Home } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { RecommendedNewsSidebar } from "@/components/RecommendedNewsSidebar";
import { BACHELOR_HUB_CARDS, BACHELOR_HUB_PAGE_DEFAULTS } from "@/locales/bachelorHubDefaults";
import { cn } from "@/lib/utils";

function trBachelorHub(t: TFunction, key: keyof typeof BACHELOR_HUB_PAGE_DEFAULTS) {
  return t(key, { defaultValue: BACHELOR_HUB_PAGE_DEFAULTS[key] });
}

const cardClass = cn(
  "group flex w-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm",
  "transition-colors hover:border-primary/25 hover:shadow-md",
);

export default function BachelorHubPage() {
  const { t } = useTranslation("topNav");
  const { t: tCommon } = useTranslation("common");
  const { t: th } = useTranslation("header");

  const educationLabel = th("secondNav.education");
  const pageTitle = th("secondNavEducation.courseCatalogue");

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
                  <span className="font-medium text-muted-foreground line-clamp-2 sm:line-clamp-none">{educationLabel}</span>
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
              <BachelorHubContent t={t} pageTitle={pageTitle} />
            </div>
            <RecommendedNewsSidebar className="order-2 lg:order-none lg:col-span-3" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function BachelorHubContent({ t, pageTitle }: { t: TFunction; pageTitle: string }) {
  const intro = trBachelorHub(t, "bachelorHubPageIntro");

  return (
    <div className="mt-0 max-w-none">
      <h1 className="text-balance text-3xl font-semibold tracking-tight text-foreground md:text-[2rem] md:leading-tight">
        {pageTitle}
      </h1>
      <div className="mt-3 space-y-4 text-body-article text-muted-foreground">
        <p>{intro}</p>
      </div>

      <ul
        className="mt-10 grid grid-cols-1 gap-x-[16px] gap-y-[16px] md:grid-cols-3"
        role="list"
      >
        {BACHELOR_HUB_CARDS.map((card, index) => {
          const title = trBachelorHub(t, card.titleKey);
          return (
          <li key={card.to} className="flex min-h-0">
            <Link
              to={card.to}
              className={cn(
                cardClass,
                "cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              )}
              aria-label={title}
            >
              <div
                className={cn(
                  "relative aspect-[3/2] w-full shrink-0 overflow-hidden",
                  card.imageFit === "contain" ? "bg-white p-6" : "bg-muted",
                )}
              >
                <img
                  src={card.imageSrc}
                  alt=""
                  className={cn(
                    "h-full w-full transition-transform duration-300 group-hover:scale-[1.02]",
                    card.imageFit === "contain" ? "object-contain" : "object-cover",
                  )}
                  loading={index === 0 ? "eager" : "lazy"}
                  decoding="async"
                />
              </div>
              <div className="flex min-h-0 flex-1 flex-col p-5">
                <h2 className="text-lg font-semibold leading-snug tracking-tight text-foreground md:text-xl">
                  {title}
                </h2>
              </div>
            </Link>
          </li>
          );
        })}
      </ul>
    </div>
  );
}
