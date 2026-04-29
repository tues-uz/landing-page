import type { TFunction } from "i18next";
import { Link, Navigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Home } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { RecommendedNewsSidebar } from "@/components/RecommendedNewsSidebar";
import { BACHELOR_TRACK_DEFAULTS } from "@/locales/bachelorHubDefaults";
import { BACHELOR_FULL_TIME_PROGRAMS } from "@/data/bachelorFullTimePrograms";
import { BACHELOR_CORRESPONDENCE_PROGRAMS } from "@/data/bachelorCorrespondencePrograms";
import { BachelorFullTimeProgramCard } from "@/components/BachelorFullTimeProgramCard";

type TrackSlug = "full-time" | "correspondence";

function trTrack(t: TFunction, key: string, fallback: string) {
  return t(key, { defaultValue: fallback });
}

export default function BachelorTrackPage() {
  const { track } = useParams<{ track: string }>();
  const slug = track as TrackSlug | undefined;

  if (slug !== "full-time" && slug !== "correspondence") {
    return <Navigate to="/education/bachelor" replace />;
  }

  const { t } = useTranslation("topNav");
  const { t: tCommon } = useTranslation("common");
  const { t: th } = useTranslation("header");

  const educationLabel = th("secondNav.education");
  const bachelorLabel = th("secondNavEducation.bachelor");

  const meta =
    slug === "full-time"
      ? {
          titleKey: "bachelorTrackFullTimeTitle" as const,
          titleFallback: BACHELOR_TRACK_DEFAULTS.fullTime.bachelorTrackFullTimeTitle,
          bodyKey: "bachelorTrackFullTimeBody" as const,
          bodyFallback: BACHELOR_TRACK_DEFAULTS.fullTime.bachelorTrackFullTimeBody,
        }
      : {
          titleKey: "bachelorTrackCorrespondenceTitle" as const,
          titleFallback: BACHELOR_TRACK_DEFAULTS.correspondence.bachelorTrackCorrespondenceTitle,
          bodyKey: "bachelorTrackCorrespondenceBody" as const,
          bodyFallback: BACHELOR_TRACK_DEFAULTS.correspondence.bachelorTrackCorrespondenceBody,
        };

  const leafTitle = trTrack(t, meta.titleKey, meta.titleFallback);
  const body = trTrack(t, meta.bodyKey, meta.bodyFallback);
  const cardsHint =
    slug === "full-time"
      ? trTrack(
          t,
          "bachelorFullTimeCardsHint",
          BACHELOR_TRACK_DEFAULTS.fullTime.bachelorFullTimeCardsHint,
        )
      : trTrack(
          t,
          "bachelorCorrespondenceCardsHint",
          BACHELOR_TRACK_DEFAULTS.correspondence.bachelorCorrespondenceCardsHint,
        );

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
                  <span className="font-medium text-muted-foreground line-clamp-2 sm:line-clamp-none">{educationLabel}</span>
                </li>
                <li aria-hidden className="flex items-center text-muted-foreground/70">
                  <span className="leading-none">/</span>
                </li>
                <li className="flex min-w-0 items-center">
                  <Link
                    to="/education/bachelor"
                    className="font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline line-clamp-2 sm:line-clamp-none"
                  >
                    {bachelorLabel}
                  </Link>
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
              <article className="max-w-none">
                <h1 className="text-balance text-3xl font-semibold tracking-tight text-foreground md:text-[2rem] md:leading-tight">
                  {leafTitle}
                </h1>
                <p className="mt-3 text-justify text-body-article text-muted-foreground">
                  {body}
                </p>
                {(slug === "full-time" || slug === "correspondence") && (
                  <>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{cardsHint}</p>
                    <ul
                      className="mt-8 grid list-none grid-cols-1 gap-[16px] p-0 md:grid-cols-3"
                      role="list"
                    >
                      {(slug === "full-time" ? BACHELOR_FULL_TIME_PROGRAMS : BACHELOR_CORRESPONDENCE_PROGRAMS).map(
                        (program) => (
                          <li key={program.no} className="flex min-w-0 flex-col">
                            <BachelorFullTimeProgramCard program={program} track={slug} />
                          </li>
                        ),
                      )}
                    </ul>
                  </>
                )}
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
