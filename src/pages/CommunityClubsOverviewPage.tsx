import type { TFunction } from "i18next";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Home } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { RecommendedNewsSidebar } from "@/components/RecommendedNewsSidebar";
import { COMMUNITY_CLUBS_OVERVIEW_DEFAULTS } from "@/locales/communityClubsOverviewDefaults";

function trOverview(t: TFunction, key: keyof typeof COMMUNITY_CLUBS_OVERVIEW_DEFAULTS) {
  return t(key, { defaultValue: COMMUNITY_CLUBS_OVERVIEW_DEFAULTS[key] });
}

const bodyClass = "text-body-article text-muted-foreground";

const COMMUNITY_CLUBS_PATH = "/student-life/community-clubs";

function splitLines(raw: string): string[] {
  return raw
    .split(/\n+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

export default function CommunityClubsOverviewPage() {
  const { t } = useTranslation("topNav");
  const { t: tCommon } = useTranslation("common");
  const { t: th } = useTranslation("header");

  const leafTitle = trOverview(t, "communityClubsOverviewPageTitle");
  const studentLifeLabel = th("secondNav.studentLife");
  const communityClubsLabel = th("secondNavStudentLife.communityClubs");

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
                  <span className="font-medium text-muted-foreground line-clamp-2 sm:line-clamp-none">{studentLifeLabel}</span>
                </li>
                <li aria-hidden className="flex items-center text-muted-foreground/70">
                  <span className="leading-none">/</span>
                </li>
                <li className="flex min-w-0 items-center">
                  <Link
                    to={COMMUNITY_CLUBS_PATH}
                    className="font-medium leading-none transition-colors hover:text-foreground line-clamp-2 sm:line-clamp-none"
                  >
                    {communityClubsLabel}
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
              <CommunityClubsOverviewArticle t={t} />
            </div>
            <RecommendedNewsSidebar className="order-2 lg:order-none lg:col-span-3" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function CommunityClubsOverviewArticle({ t }: { t: TFunction }) {
  const title = trOverview(t, "communityClubsOverviewPageTitle");
  const introRaw = trOverview(t, "communityClubsOverviewPageIntro");
  const heroSrc = trOverview(t, "communityClubsOverviewHeroSrc");
  const socialHeading = trOverview(t, "communityClubsOverviewSocialHeading");
  const sportsHeading = trOverview(t, "communityClubsOverviewSportsHeading");
  const socialItems = splitLines(trOverview(t, "communityClubsOverviewSocialList"));
  const sportsItems = splitLines(trOverview(t, "communityClubsOverviewSportsList"));

  const introParagraphs = introRaw
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  const listClass = `mt-2 list-disc space-y-1.5 pl-6 ${bodyClass}`;

  return (
    <article className="max-w-none">
      <figure className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-border bg-muted shadow-sm">
        <img
          src={heroSrc}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          decoding="async"
          loading="eager"
        />
      </figure>
      <h1 className="mt-6 text-balance text-3xl font-semibold tracking-tight text-foreground md:text-[2rem] md:leading-tight">
        {title}
      </h1>
      <div className={`mt-3 space-y-4 text-justify ${bodyClass}`}>
        {introParagraphs.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      <h2 className="mt-8 text-xl font-semibold tracking-tight text-foreground">{socialHeading}</h2>
      <ul className={listClass}>
        {socialItems.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>

      <h2 className="mt-8 text-xl font-semibold tracking-tight text-foreground">{sportsHeading}</h2>
      <ul className={listClass}>
        {sportsItems.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </article>
  );
}
