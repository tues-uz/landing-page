import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Home } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { RecommendedNewsSidebar } from "@/components/RecommendedNewsSidebar";
import {
  ENTREPRENEURIAL_CLUB_META,
  ENTREPRENEURIAL_CLUBS_HUB_PATH,
  ENTREPRENEURIAL_CLUBS_SCIENCE_PATH,
  INNOVATION_CLUB_PAGE_SECTIONS,
  isEntrepreneurialClubId,
} from "@/config/entrepreneurialClubsImages";

const bodyClass = "text-justify text-body-article text-muted-foreground";

function splitParagraphs(raw: string): string[] {
  return raw
    .split(/\n\n+/)
    .map((block) => block.trim())
    .filter(Boolean);
}

function SectionImage({
  src,
  alt,
  priority = false,
}: {
  src: string;
  alt: string;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <figure className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-muted">
      {failed ? (
        <div className="absolute inset-0 bg-gradient-to-br from-muted via-muted to-muted-foreground/10" aria-hidden />
      ) : (
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 h-full w-full object-contain object-center bg-white p-4 sm:p-6"
          decoding="async"
          loading={priority ? "eager" : "lazy"}
          onError={() => setFailed(true)}
        />
      )}
    </figure>
  );
}

function InnovationClubArticle() {
  const { t } = useTranslation("header");

  return (
    <article className="max-w-none">
      <h1 className="text-balance text-3xl font-semibold tracking-tight text-foreground md:text-[2rem] md:leading-tight">
        {t("entrepreneurialClubsS1Title")}
      </h1>

      {INNOVATION_CLUB_PAGE_SECTIONS.map((section, index) => (
        <div key={section.titleKey} className={index === 0 ? "mt-6" : "mt-10"}>
          <SectionImage
            src={section.imageSrc}
            alt={t(section.imageAltKey)}
            priority={index === 0}
          />
          <section className="mt-6">
            {index === 0 ? null : (
              <h2 className="text-xl font-semibold tracking-tight text-foreground">
                {t(section.titleKey)}
              </h2>
            )}
            <div className={`${index === 0 ? "" : "mt-3 "}space-y-4 ${bodyClass}`}>
              {splitParagraphs(t(section.bodyKey)).map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </section>
        </div>
      ))}
    </article>
  );
}

function QuantumClubArticle() {
  const { t } = useTranslation("header");
  const meta = ENTREPRENEURIAL_CLUB_META["quantum-club"];
  const modelLines = t("entrepreneurialClubsS4ModelBody")
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);

  return (
    <article className="max-w-none">
      <SectionImage src={meta.imageSrc} alt={t(meta.imageAltKey)} priority />
      <h1 className="mt-6 text-balance text-3xl font-semibold tracking-tight text-foreground md:text-[2rem] md:leading-tight">
        {t(meta.titleKey)}
      </h1>

      <div className={`mt-3 space-y-4 ${bodyClass}`}>
        {splitParagraphs(t("entrepreneurialClubsS4Intro")).map((para, i) => (
          <p key={`intro-${i}`}>{para}</p>
        ))}
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          {t("entrepreneurialClubsS4WhoTitle")}
        </h2>
        <div className={`mt-3 space-y-4 ${bodyClass}`}>
          {splitParagraphs(t("entrepreneurialClubsS4WhoBody")).map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          {t("entrepreneurialClubsS4ModelTitle")}
        </h2>
        <ol className={`mt-3 list-decimal space-y-1.5 pl-5 ${bodyClass}`}>
          {modelLines.map((line, i) => (
            <li key={i}>{line.replace(/^\d+[.\uFE0F\u20E3]*\s*/, "")}</li>
          ))}
        </ol>
        <p className={`mt-3 ${bodyClass}`}>{t("entrepreneurialClubsS4ModelNote")}</p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          {t("entrepreneurialClubsS4CultureTitle")}
        </h2>
        <div className={`mt-3 space-y-4 ${bodyClass}`}>
          {splitParagraphs(t("entrepreneurialClubsS4CultureBody")).map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </section>

      <div className="mt-10">
        <p className="text-base font-semibold tracking-tight text-foreground">
          {t("entrepreneurialClubsS4Tagline")}
        </p>
        <p className={`mt-2 ${bodyClass}`}>{t("entrepreneurialClubsS4Closing")}</p>
      </div>
    </article>
  );
}

export default function EntrepreneurialClubDetailPage({
  pathBase = "research",
}: {
  pathBase?: "research" | "science";
}) {
  const { clubId } = useParams<{ clubId: string }>();
  const { t } = useTranslation("header");
  const { t: tCommon } = useTranslation("common");

  const hubPath = pathBase === "science" ? ENTREPRENEURIAL_CLUBS_SCIENCE_PATH : ENTREPRENEURIAL_CLUBS_HUB_PATH;
  const hubLabel =
    pathBase === "science"
      ? t("secondNavScience.entrepreneurialClubs")
      : t("nav.researchMenu.entrepreneurialInnovationClubs");
  const parentLabel = pathBase === "science" ? t("secondNav.science") : t("nav.research");
  const parentPath = pathBase === "science" ? undefined : "/research";

  // Former hub cards now live on the Innovation Club detail page.
  if (clubId === "young-leaders" || clubId === "startup-community") {
    return <Navigate to={`${hubPath}/tues-innovation-club`} replace />;
  }

  if (!clubId || !isEntrepreneurialClubId(clubId)) {
    return <Navigate to={hubPath} replace />;
  }

  const title = t(ENTREPRENEURIAL_CLUB_META[clubId].titleKey);

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
                  {parentPath ? (
                    <Link
                      to={parentPath}
                      className="font-medium leading-none transition-colors hover:text-foreground line-clamp-2 sm:line-clamp-none"
                    >
                      {parentLabel}
                    </Link>
                  ) : (
                    <span className="font-medium text-muted-foreground line-clamp-2 sm:line-clamp-none">
                      {parentLabel}
                    </span>
                  )}
                </li>
                <li aria-hidden className="flex items-center text-muted-foreground/70">
                  <span className="leading-none">/</span>
                </li>
                <li className="flex min-w-0 items-center">
                  <Link
                    to={hubPath}
                    className="font-medium leading-none transition-colors hover:text-foreground line-clamp-2 sm:line-clamp-none"
                  >
                    {hubLabel}
                  </Link>
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
              {clubId === "quantum-club" ? <QuantumClubArticle /> : <InnovationClubArticle />}
            </div>
            <RecommendedNewsSidebar className="order-2 lg:order-none lg:col-span-3" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
