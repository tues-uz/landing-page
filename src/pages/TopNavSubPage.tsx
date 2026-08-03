import { useLayoutEffect, useRef } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Home } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SubPageHeroBanner } from "@/components/SubPageHeroBanner";
import { VideoGalleryCards } from "@/components/VideoGalleryCards";
import { PhotoGalleryCards } from "@/components/PhotoGalleryCards";
import { AcademicCouncilDetailSection } from "@/components/AcademicCouncilDetailSection";
import { AcademicCouncilSection } from "@/components/AcademicCouncilSection";
import { ResearchPublicationsSection } from "@/components/ResearchPublicationsSection";
import { OrganizationalStructureSection } from "@/components/OrganizationalStructureSection";
import { UniversityInNumbersSection } from "@/components/UniversityInNumbersSection";
import { WorkersUnionCommitteeSection } from "@/components/WorkersUnionCommitteeSection";
import { WhoWeAreSection } from "@/components/WhoWeAreSection";
import { RegulationDocumentsSection } from "@/components/RegulationDocumentsSection";
import { AccreditationLicenseSection } from "@/components/AccreditationLicenseSection";
import { LeadershipCouncilsSection } from "@/components/LeadershipCouncilsSection";
import { WhyTuesSection } from "@/components/WhyTuesSection";
import { EntrepreneurialClubsSection } from "@/components/EntrepreneurialClubsSection";
import { SecondaryEducationRequirementsSection } from "@/components/SecondaryEducationRequirementsSection";
import { RegulationsAndRequirementsSection } from "@/components/RegulationsAndRequirementsSection";
import { SeminarsConferencesSection } from "@/components/SeminarsConferencesSection";
import { PublicationContactSection } from "@/components/PublicationContactSection";
import {
  ACADEMIC_COUNCIL_CARD_IMAGE,
  ACADEMIC_COUNCIL_I18N,
  isAcademicCouncilCardId,
} from "@/config/academicCouncilHub";
import {
  getTopNavSubPageMeta,
  getSectionsForGroup,
  subPagePath,
  type TopNavGroup,
} from "@/config/topNavHubData";
import { cn } from "@/lib/utils";

const PARENT_NAV_KEY: Record<Exclude<TopNavGroup, "media">, string> = {
  about: "nav.about",
  research: "nav.research",
  admissions: "nav.admissions",
};

function isCharterDocumentPage(group: TopNavGroup, slug: string | undefined): boolean {
  return group === "about" && slug === "regulation";
}

function isWorkersUnionCommitteePage(group: TopNavGroup, slug: string | undefined): boolean {
  return group === "about" && slug === "workers-union-committee";
}

function isWhoWeArePage(group: TopNavGroup, slug: string | undefined): boolean {
  return group === "about" && slug === "who-we-are";
}

function isUniversityInNumbersPage(group: TopNavGroup, slug: string | undefined): boolean {
  return group === "about" && slug === "university-in-numbers";
}

function isOrganizationalStructurePage(group: TopNavGroup, slug: string | undefined): boolean {
  return group === "about" && slug === "organizational-structure";
}

function isAccreditationLicensePage(group: TopNavGroup, slug: string | undefined): boolean {
  return group === "about" && slug === "accreditation-and-license";
}

function isLeadershipAndCouncilsPage(group: TopNavGroup, slug: string | undefined): boolean {
  return group === "about" && slug === "leadership-and-councils";
}

function isWhyTuesPage(group: TopNavGroup, slug: string | undefined): boolean {
  return group === "about" && slug === "why-tues";
}

function isEntrepreneurialClubsPage(group: TopNavGroup, slug: string | undefined): boolean {
  return group === "research" && slug === "entrepreneurial-and-innovation-clubs";
}

function isSecondaryEducationRequirementsPage(group: TopNavGroup, slug: string | undefined): boolean {
  return group === "admissions" && slug === "secondary-education-requirements";
}

function isRegulationsAndRequirementsPage(group: TopNavGroup, slug: string | undefined): boolean {
  return group === "admissions" && slug === "regulations-and-requirements";
}

function isVideoGalleryPage(group: TopNavGroup, slug: string | undefined): boolean {
  return group === "media" && slug === "video-gallery";
}

function isPhotoGalleryPage(group: TopNavGroup, slug: string | undefined): boolean {
  return group === "media" && slug === "photo-gallery";
}

function isScientificPublicationsContactPage(group: TopNavGroup, slug: string | undefined): boolean {
  return group === "research" && slug === "scientific-publications-journals";
}

function isAcademicCouncilPage(group: TopNavGroup, slug: string | undefined): boolean {
  return group === "research" && slug === "academic-council";
}

function isSeminarsConferencesPage(group: TopNavGroup, slug: string | undefined): boolean {
  return group === "research" && slug === "seminars-and-conferences";
}

function isResearchPublicationsPage(group: TopNavGroup, slug: string | undefined): boolean {
  return group === "research" && slug === "research-papers-and-publications";
}

/** Video + photo gallery: skip the tall hero — breadcrumbs sit directly under the header. */
function shouldShowSubPageHeroBanner(group: TopNavGroup, slug: string | undefined): boolean {
  if (group !== "media" || !slug) return true;
  return slug !== "video-gallery" && slug !== "photo-gallery";
}

export function TopNavSubPage({ group }: { group: TopNavGroup }) {
  const { slug: slugParam, councilSlug } = useParams<{ slug?: string; councilSlug?: string }>();
  const slug = slugParam ?? (councilSlug ? "academic-council" : undefined);
  const { t } = useTranslation("topNav");
  const { t: tCommon } = useTranslation("common");
  const { t: th } = useTranslation("header");

  /** Pin section nav like a fixed panel on large screens (CSS sticky is unreliable with our scroll roots). */
  const layoutRowRef = useRef<HTMLDivElement>(null);
  const asideRef = useRef<HTMLElement>(null);
  const sidebarWrapRef = useRef<HTMLDivElement>(null);
  const sidebarCardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const LG = "(min-width: 1024px)";
    const mq = window.matchMedia(LG);

    const headerOffsetPx = () => {
      const raw = getComputedStyle(document.documentElement).getPropertyValue("--header-height").trim();
      const n = parseFloat(raw);
      return (Number.isFinite(n) ? n : 64) + 12;
    };

    const clearCardPinStyles = () => {
      const card = sidebarCardRef.current;
      const wrap = sidebarWrapRef.current;
      if (card) {
        card.style.removeProperty("position");
        card.style.removeProperty("top");
        card.style.removeProperty("left");
        card.style.removeProperty("right");
        card.style.removeProperty("width");
        card.style.removeProperty("bottom");
        card.style.removeProperty("z-index");
        card.style.removeProperty("max-height");
      }
      if (wrap) wrap.style.removeProperty("min-height");
    };

    const update = () => {
      const row = layoutRowRef.current;
      const aside = asideRef.current;
      const wrap = sidebarWrapRef.current;
      const card = sidebarCardRef.current;
      if (!mq.matches || !row || !aside || !wrap || !card) {
        clearCardPinStyles();
        return;
      }

      const topPx = headerOffsetPx();
      const rowRect = row.getBoundingClientRect();
      const wrapRect = wrap.getBoundingClientRect();
      const cardH = card.offsetHeight;

      const useBottom = rowRect.bottom <= topPx + cardH + 2;
      const useFixed = !useBottom && wrapRect.top < topPx;

      if (useFixed) {
        const wr = wrap.getBoundingClientRect();
        wrap.style.minHeight = `${Math.ceil(cardH)}px`;
        card.style.position = "fixed";
        card.style.top = `${topPx}px`;
        card.style.left = `${wr.left}px`;
        card.style.width = `${wr.width}px`;
        card.style.right = "auto";
        card.style.bottom = "auto";
        card.style.zIndex = "10";
        card.style.maxHeight = `calc(100dvh - ${topPx}px - 1rem)`;
      } else if (useBottom) {
        wrap.style.removeProperty("min-height");
        card.style.position = "absolute";
        card.style.top = "auto";
        card.style.left = "0";
        card.style.right = "0";
        card.style.width = "auto";
        card.style.bottom = "0";
        card.style.zIndex = "10";
        card.style.maxHeight = `calc(100dvh - ${topPx}px - 1rem)`;
      } else {
        clearCardPinStyles();
      }
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    mq.addEventListener("change", update);
    const ro = new ResizeObserver(update);
    if (sidebarCardRef.current) ro.observe(sidebarCardRef.current);
    if (layoutRowRef.current) ro.observe(layoutRowRef.current);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      mq.removeEventListener("change", update);
      ro.disconnect();
      clearCardPinStyles();
    };
  }, [group, slug, councilSlug]);

  if (group === "research" && councilSlug && !isAcademicCouncilCardId(councilSlug)) {
    return <Navigate to="/research/academic-council" replace />;
  }

  if (group === "admissions" && slug === "contract-amounts-tuition") {
    return <Navigate to="/admission-2025/contract-amounts" replace />;
  }

  const meta = getTopNavSubPageMeta(group, slug);
  if (!meta) {
    return <Navigate to={`/${group}`} replace />;
  }

  const hubPath = `/${group}`;
  const parentLabel =
    group === "media" ? t("mediaPageTitle") : th(PARENT_NAV_KEY[group]);
  const sections = getSectionsForGroup(group);
  const charterLayout = isCharterDocumentPage(group, slug);
  const workersUnionLayout = isWorkersUnionCommitteePage(group, slug);
  const whoWeAreLayout = isWhoWeArePage(group, slug);
  const universityInNumbersLayout = isUniversityInNumbersPage(group, slug);
  const organizationalStructureLayout = isOrganizationalStructurePage(group, slug);
  const accreditationLicenseLayout = isAccreditationLicensePage(group, slug);
  const leadershipAndCouncilsLayout = isLeadershipAndCouncilsPage(group, slug);
  const whyTuesLayout = isWhyTuesPage(group, slug);
  const entrepreneurialClubsLayout = isEntrepreneurialClubsPage(group, slug);
  const secondaryEducationRequirementsLayout = isSecondaryEducationRequirementsPage(group, slug);
  const regulationsAndRequirementsLayout = isRegulationsAndRequirementsPage(group, slug);
  const videoGalleryLayout = isVideoGalleryPage(group, slug);
  const photoGalleryLayout = isPhotoGalleryPage(group, slug);
  const publicationsContactLayout = isScientificPublicationsContactPage(group, slug);
  const seminarsConferencesLayout = isSeminarsConferencesPage(group, slug);
  const researchPublicationsLayout = isResearchPublicationsPage(group, slug);
  const academicCouncilLayout = isAcademicCouncilPage(group, slug);
  const academicCouncilDetail =
    academicCouncilLayout && councilSlug && isAcademicCouncilCardId(councilSlug);
  const showHeroBanner = shouldShowSubPageHeroBanner(group, slug);
  const hubSectionTitle = th(meta.labelKey);
  const councilDetailPageTitle =
    academicCouncilDetail && councilSlug ? t(ACADEMIC_COUNCIL_I18N[councilSlug].titleKey) : null;
  const pageTitle = charterLayout ? t("charter.documentTitle") : councilDetailPageTitle ?? hubSectionTitle;
  const academicCouncilHeroImage =
    academicCouncilDetail && councilSlug && isAcademicCouncilCardId(councilSlug)
      ? ACADEMIC_COUNCIL_CARD_IMAGE[councilSlug]
      : undefined;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="below-header">
        {showHeroBanner ? (
          <SubPageHeroBanner staticImageSrc={academicCouncilHeroImage} />
        ) : null}
        {/* Breadcrumbs — reference-style strip */}
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
                <li className="flex items-center">
                  <Link
                    to={hubPath}
                    className="inline-flex items-center font-medium leading-none transition-colors hover:text-foreground"
                  >
                    {parentLabel}
                  </Link>
                </li>
                <li aria-hidden className="flex items-center text-muted-foreground/70">
                  <span className="leading-none">/</span>
                </li>
                {academicCouncilDetail && councilDetailPageTitle ? (
                  <>
                    <li className="flex items-center">
                      <Link
                        to="/research/academic-council"
                        className="font-medium leading-none transition-colors hover:text-foreground"
                      >
                        {hubSectionTitle}
                      </Link>
                    </li>
                    <li aria-hidden className="flex items-center text-muted-foreground/70">
                      <span className="leading-none">/</span>
                    </li>
                    <li className="flex items-center font-medium text-foreground">{councilDetailPageTitle}</li>
                  </>
                ) : (
                  <li className="flex items-center font-medium text-foreground">{pageTitle}</li>
                )}
              </ol>
            </nav>
          </div>
        </div>

        <div className="container mx-auto max-w-[1348px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          <div ref={layoutRowRef} className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
            {/* Main column */}
            <div className="order-1 lg:order-none lg:col-span-9">
              <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-[2rem] md:leading-tight">
                {pageTitle}
              </h1>

              {charterLayout ? (
                <RegulationDocumentsSection />
              ) : workersUnionLayout ? (
                <WorkersUnionCommitteeSection />
              ) : whoWeAreLayout ? (
                <WhoWeAreSection />
              ) : universityInNumbersLayout ? (
                <UniversityInNumbersSection />
              ) : organizationalStructureLayout ? (
                <OrganizationalStructureSection />
              ) : accreditationLicenseLayout ? (
                <AccreditationLicenseSection />
              ) : leadershipAndCouncilsLayout ? (
                <LeadershipCouncilsSection />
              ) : whyTuesLayout ? (
                <WhyTuesSection />
              ) : entrepreneurialClubsLayout ? (
                <EntrepreneurialClubsSection />
              ) : regulationsAndRequirementsLayout ? (
                <RegulationsAndRequirementsSection />
              ) : secondaryEducationRequirementsLayout ? (
                <SecondaryEducationRequirementsSection />
              ) : videoGalleryLayout ? (
                <>
                  <p className="mt-3 text-base leading-relaxed text-muted-foreground">{t("videoGallery.gridIntro")}</p>
                  <VideoGalleryCards />
                </>
              ) : photoGalleryLayout ? (
                <>
                  <p className="mt-3 text-base leading-relaxed text-muted-foreground">{t("photoGallery.gridIntro")}</p>
                  <PhotoGalleryCards />
                </>
              ) : publicationsContactLayout ? (
                <PublicationContactSection />
              ) : seminarsConferencesLayout ? (
                <SeminarsConferencesSection />
              ) : researchPublicationsLayout ? (
                <ResearchPublicationsSection />
              ) : academicCouncilLayout ? (
                academicCouncilDetail && councilSlug ? (
                  <AcademicCouncilDetailSection cardId={councilSlug} />
                ) : (
                  <AcademicCouncilSection />
                )
              ) : (
                <>
                  <p className="mt-3 text-base leading-relaxed text-muted-foreground">{t("subPageIntro")}</p>
                  <p className="mt-6 border-t border-border pt-6 text-sm leading-relaxed text-muted-foreground md:text-base">
                    {t("sectionPlaceholder")}
                  </p>
                </>
              )}
            </div>

            {/* Sidebar — pinned under header on lg+ via layout effect (fixed coordinates from column width) */}
            <aside ref={asideRef} className="relative order-2 lg:order-none lg:col-span-3">
              <div ref={sidebarWrapRef} className="w-full">
                <div
                  ref={sidebarCardRef}
                  className={cn(
                    "rounded-xl border border-border bg-card p-4 shadow-sm",
                    "lg:max-h-[calc(100dvh-var(--header-height)-1.5rem)] lg:overflow-y-auto",
                  )}
                  style={{ scrollbarGutter: "stable" }}
                >
                <Link
                  to={hubPath}
                  className="mb-4 flex items-center gap-2 border-b border-border pb-4 font-semibold text-foreground transition-colors hover:text-primary"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary">
                    <img src="/logo_white.png" alt="" className="h-6 w-6 object-contain" />
                  </span>
                  <span className="text-sm uppercase tracking-wide">{parentLabel}</span>
                </Link>
                <ul className="space-y-0.5">
                  {sections.map((s) => {
                    const active = s.id === slug;
                    const to = subPagePath(group, s.id);
                    return (
                      <li key={s.id}>
                        <Link
                          to={to}
                          className={cn(
                            "flex items-start gap-2.5 rounded-md py-2.5 pl-1 text-sm transition-colors",
                            active
                              ? "font-semibold text-primary"
                              : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                          )}
                        >
                          <span
                            className={cn(
                              "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full",
                              active ? "bg-primary" : "bg-[#BDBFC1]",
                            )}
                            aria-hidden
                          />
                          <span>{th(s.labelKey)}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
