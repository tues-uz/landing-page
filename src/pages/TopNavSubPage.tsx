import { Link, Navigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight, Download, Home } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SubPageHeroBanner } from "@/components/SubPageHeroBanner";
import { VideoGalleryCards } from "@/components/VideoGalleryCards";
import { PhotoGalleryCards } from "@/components/PhotoGalleryCards";
import {
  getTopNavSubPageMeta,
  getSectionsForGroup,
  subPagePath,
  type TopNavGroup,
} from "@/config/topNavHubData";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const PARENT_NAV_KEY: Record<Exclude<TopNavGroup, "media">, string> = {
  about: "nav.about",
  research: "nav.research",
  admissions: "nav.admissions",
};

function isCharterDocumentPage(group: TopNavGroup, slug: string | undefined): boolean {
  return group === "about" && slug === "regulation";
}

function isVideoGalleryPage(group: TopNavGroup, slug: string | undefined): boolean {
  return group === "media" && slug === "video-gallery";
}

function isPhotoGalleryPage(group: TopNavGroup, slug: string | undefined): boolean {
  return group === "media" && slug === "photo-gallery";
}

/** Video + photo gallery: skip the tall hero — breadcrumbs sit directly under the header. */
function shouldShowSubPageHeroBanner(group: TopNavGroup, slug: string | undefined): boolean {
  if (group !== "media" || !slug) return true;
  return slug !== "video-gallery" && slug !== "photo-gallery";
}

const CHARTER_ACCORDION_KEYS = ["section1", "section2", "section3", "section4"] as const;

export function TopNavSubPage({ group }: { group: TopNavGroup }) {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation("topNav");
  const { t: tCommon } = useTranslation("common");
  const { t: th } = useTranslation("header");

  const meta = getTopNavSubPageMeta(group, slug);
  if (!meta) {
    return <Navigate to={`/${group}`} replace />;
  }

  const hubPath = `/${group}`;
  const parentLabel =
    group === "media" ? t("mediaPageTitle") : th(PARENT_NAV_KEY[group]);
  const sections = getSectionsForGroup(group);
  const charterLayout = isCharterDocumentPage(group, slug);
  const videoGalleryLayout = isVideoGalleryPage(group, slug);
  const photoGalleryLayout = isPhotoGalleryPage(group, slug);
  const showHeroBanner = shouldShowSubPageHeroBanner(group, slug);
  const pageTitle = charterLayout ? t("charter.documentTitle") : th(meta.labelKey);
  const pdfUrl = (t("charter.pdfUrl", { defaultValue: "" }) || "").trim();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="below-header">
        {showHeroBanner ? <SubPageHeroBanner /> : null}
        {/* Breadcrumbs — reference-style strip */}
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
                <li className="flex items-center font-medium text-foreground">{pageTitle}</li>
              </ol>
            </nav>
          </div>
        </div>

        <div className="container mx-auto max-w-[1348px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
            {/* Main column */}
            <div className="order-1 lg:order-none lg:col-span-9">
              <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-[2rem] md:leading-tight">
                {pageTitle}
              </h1>

              {charterLayout ? (
                <>
                  <div className="charter-download mt-8 rounded-xl border border-border bg-card p-6 shadow-sm">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                      <div className="min-w-0 flex-1 space-y-2">
                        <h3 className="text-lg font-semibold text-foreground md:text-xl">
                          {t("charter.institution")}
                        </h3>
                        <p className="max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
                          {t("charter.downloadLead")}
                        </p>
                      </div>
                      <div className="flex shrink-0 flex-col items-center gap-3 sm:flex-row sm:justify-end">
                        <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-sky-500/10 text-sky-600">
                          <Download className="h-12 w-12" strokeWidth={1.25} aria-hidden />
                        </div>
                        <div className="text-center sm:text-left">
                          {pdfUrl ? (
                            <a
                              href={pdfUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              download
                              className="group inline-flex flex-col items-center gap-1 sm:items-start"
                            >
                              <span className="text-base font-semibold text-sky-500 transition-colors group-hover:text-sky-600">
                                {t("charter.download")}
                              </span>
                              <ArrowRight
                                className="h-3.5 w-14 text-sky-500 transition-transform group-hover:translate-x-0.5"
                                strokeWidth={2}
                                aria-hidden
                              />
                            </a>
                          ) : (
                            <p className="text-sm text-muted-foreground">{t("charter.pdfSoon")}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <Accordion type="single" collapsible className="mt-10 w-full">
                    {CHARTER_ACCORDION_KEYS.map((key) => {
                      const titleKey = `charter.${key}Title` as const;
                      const bodyKey = `charter.${key}Body` as const;
                      const body = t(bodyKey);
                      return (
                        <AccordionItem
                          key={key}
                          value={key}
                          className="mb-3 overflow-hidden rounded-lg border border-border border-none bg-card px-4 last:mb-0 data-[state=open]:shadow-sm"
                        >
                          <AccordionTrigger className="py-4 text-left hover:no-underline [&[data-state=open]>svg]:rotate-180">
                            <span className="pr-4 text-sm font-semibold text-foreground md:text-base">
                              {t(titleKey)}
                            </span>
                          </AccordionTrigger>
                          <AccordionContent className="pb-4 pt-0">
                            <div className="border-t border-border/80 pt-4 text-sm leading-relaxed text-muted-foreground">
                              {body.trim() ? (
                                <p className="text-justify">{body}</p>
                              ) : (
                                <p className="text-justify italic opacity-70">{t("charter.emptySection")}</p>
                              )}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      );
                    })}
                  </Accordion>
                </>
              ) : videoGalleryLayout ? (
                <>
                  <p className="mt-6 text-base leading-relaxed text-muted-foreground">{t("videoGallery.gridIntro")}</p>
                  <VideoGalleryCards />
                </>
              ) : photoGalleryLayout ? (
                <>
                  <p className="mt-6 text-base leading-relaxed text-muted-foreground">{t("photoGallery.gridIntro")}</p>
                  <PhotoGalleryCards />
                </>
              ) : (
                <>
                  <p className="mt-6 text-base leading-relaxed text-muted-foreground">{t("subPageIntro")}</p>
                  <p className="mt-6 border-t border-border pt-6 text-sm leading-relaxed text-muted-foreground md:text-base">
                    {t("sectionPlaceholder")}
                  </p>
                </>
              )}

              <p className="mt-10">
                <Link
                  to={hubPath}
                  className="text-sm font-medium text-primary underline-offset-4 hover:underline"
                >
                  {t("backToSection", { section: parentLabel })}
                </Link>
              </p>
            </div>

            {/* Sidebar — sibling pages */}
            <aside className="order-2 lg:order-none lg:col-span-3">
              <div className="rounded-xl border border-border bg-card p-4 shadow-sm lg:sticky lg:top-28">
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
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
