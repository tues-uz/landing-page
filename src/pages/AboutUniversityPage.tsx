import type { TFunction } from "i18next";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Home } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { RecommendedNewsSidebar } from "@/components/RecommendedNewsSidebar";
import { YouTubePosterPlay } from "@/components/YouTubePosterPlay";
import { ABOUT_UNIVERSITY_PAGE_DEFAULTS } from "@/locales/aboutUniversityPageDefaults";

const YOUTUBE_VIDEO_ID = "BZk8os75D24";
const YOUTUBE_START_SECONDS = 2;

function trAboutUniversity(t: TFunction, key: keyof typeof ABOUT_UNIVERSITY_PAGE_DEFAULTS) {
  return t(key, { defaultValue: ABOUT_UNIVERSITY_PAGE_DEFAULTS[key] });
}

export default function AboutUniversityPage() {
  const { t } = useTranslation("topNav");
  const { t: tCommon } = useTranslation("common");
  const { t: th } = useTranslation("header");

  const infoServicesLabel = th("secondNav.informationServices");
  const leafTitle = th("secondNavInformationServices.aboutUniversity");

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
                    {infoServicesLabel}
                  </span>
                </li>
                <li aria-hidden className="flex items-center text-muted-foreground/70">
                  <span className="leading-none">/</span>
                </li>
                <li className="min-w-0 flex-1 font-medium text-foreground">
                  <span className="line-clamp-2 sm:line-clamp-none">{leafTitle}</span>
                </li>
              </ol>
            </nav>
          </div>
        </div>

        <div className="container mx-auto max-w-[1348px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
            <div className="order-1 lg:order-none lg:col-span-9">
              <AboutUniversityArticle t={t} pageTitle={leafTitle} />
            </div>
            <RecommendedNewsSidebar className="order-2 lg:order-none lg:col-span-3" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function AboutUniversityArticle({ t, pageTitle }: { t: TFunction; pageTitle: string }) {
  const intro = trAboutUniversity(t, "aboutUniversityPageIntro");
  const playLabel = trAboutUniversity(t, "aboutUniversityVideoPlayLabel");

  return (
    <article className="max-w-none">
      <YouTubePosterPlay
        videoId={YOUTUBE_VIDEO_ID}
        startSeconds={YOUTUBE_START_SECONDS}
        playLabel={`${playLabel}: ${pageTitle}`}
      />
      <h1 className="mt-6 text-balance text-3xl font-semibold tracking-tight text-foreground md:text-[2rem] md:leading-tight">
        {pageTitle}
      </h1>
      <p className="mt-3 text-justify text-body-article text-muted-foreground">{intro}</p>
    </article>
  );
}
