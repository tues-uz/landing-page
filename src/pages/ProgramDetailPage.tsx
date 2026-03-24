import { useLayoutEffect, useMemo, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ArrowLeft,
  ArrowDownToLine,
  BookOpen,
  Calendar,
  ClipboardList,
  Clock,
  FileText,
  Globe,
  GraduationCap,
  Loader2,
  Zap,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getProgramBySlug } from "@/components/Programs";
import { contentApi } from "@/api/client";
import { contentKeys } from "@/api/queryKeys";
import { getUiLang } from "@/lib/localeContent";
import { getProgramDetailViewModelFromItem } from "@/lib/programDetailDisplay";

const ProgramDetailPage = () => {
  const { t, i18n } = useTranslation();
  const { slug } = useParams<{ slug: string }>();

  const { data: programItem, isLoading } = useQuery({
    queryKey: contentKeys.programs.detail(slug!),
    queryFn: () => contentApi.programs.getBySlug(slug!),
    enabled: !!slug,
  });

  const view = useMemo(() => {
    if (!programItem) return null;
    const fromApi = getProgramDetailViewModelFromItem(programItem);
    if (getUiLang(i18n) !== "en") return fromApi;
    const st = getProgramBySlug(programItem.slug);
    if (!st) return fromApi;
    return getProgramDetailViewModelFromItem({
      ...programItem,
      title: st.title,
      description: st.description,
      longDescription: st.longDescription || programItem.longDescription,
      highlights: st.highlights?.length ? st.highlights : programItem.highlights,
      count: st.count,
    });
  }, [programItem, i18n]);

  /** Force sidebar pin on large screens — CSS sticky is unreliable with some overflow/scroll roots. */
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
      return (Number.isFinite(n) ? n : 64) + 16;
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

      // Not enough room below header to pin full card — dock to bottom of column
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
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="below-header flex items-center justify-center py-24">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!view) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="below-header container mx-auto px-6 py-24 text-center">
          <h1 className="text-2xl font-semibold text-foreground mb-4">{t("programDetail.notFound")}</h1>
          <Link
            to="/programs"
            className="inline-flex items-center gap-2 text-primary hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("common.backToPrograms")}
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const {
    title,
    count,
    longDescription,
    highlights,
    introduction,
    careerOutcomes,
    degreeType,
    duration,
    languages,
    pace,
    studyFormat,
    applicationDeadline,
    startDate,
    tuition,
    heroImage,
    slug: programSlug,
    brochurePdfHref,
    admissionsPdfHref,
    curriculumPdfHref,
  } = view;

  const keyFacts = [
    { label: t("programDetail.degreeType"), value: degreeType, icon: GraduationCap },
    { label: t("programDetail.duration"), value: duration, icon: Clock },
    { label: t("programDetail.languages"), value: languages, icon: Globe },
    { label: t("programDetail.pace"), value: pace, icon: Zap },
    { label: t("programDetail.studyFormat"), value: studyFormat, icon: BookOpen },
    { label: t("programDetail.applicationDeadline"), value: applicationDeadline, icon: Calendar },
    { label: t("programDetail.earliestStart"), value: startDate, icon: Calendar },
    { label: t("programDetail.tuition"), value: tuition, icon: GraduationCap },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="below-header">
        {/* Hero with image */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src={heroImage}
              alt=""
              className="w-full h-full object-cover min-h-[640px] md:min-h-[800px]"
            />
            <div className="absolute inset-0 bg-foreground/60" />
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1348px] relative z-10 pt-24 pb-32 md:pt-32 md:pb-48" />
        </section>

        {/* Content — modern single-column with sidebar */}
        <section className="overflow-x-visible py-12 md:py-20 bg-background">
          <div className="container mx-auto overflow-x-visible px-4 sm:px-6 lg:px-8 max-w-[1348px]">
            <div ref={layoutRowRef} className="lg:flex lg:gap-16 lg:items-stretch lg:overflow-visible">
              {/* Main column */}
              <div className="lg:flex-1 min-w-0">
                {/* Program title block */}
                <div className="mb-12 md:mb-16">
                  <span className="text-muted-foreground font-medium text-sm tracking-wider uppercase">
                    {count}
                  </span>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mt-1 mb-1">
                    {title}
                  </h1>
                  <p className="text-muted-foreground text-base">{t("programDetail.tagline")}</p>
                </div>

                {/* About */}
                <div className="mb-12 md:mb-16">
                  <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-3">{t("programDetail.about")}</h2>
                  <p className="text-foreground/90 leading-relaxed text-lg">{longDescription}</p>
                </div>

                {/* Introduction */}
                <div className="mb-12 md:mb-16">
                  <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-3">{t("programDetail.introduction")}</h2>
                  <p className="text-foreground/90 leading-relaxed max-w-2xl">
                    {introduction}
                  </p>
                </div>

                {/* Program PDF downloads — 3 cards */}
                <div className="mb-12 md:mb-16">
                  <div className="mb-5 max-w-xl">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">{t("programDetail.downloads")}</h2>
                    <p className="mt-2 text-base font-medium text-foreground sm:text-lg">{t("programDetail.downloadsLead")}</p>
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                      {t("programDetail.downloadsHint")}
                    </p>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {(
                      [
                        {
                          key: "brochure",
                          Icon: FileText,
                          eyebrow: t("programDetail.brochureEyebrow"),
                          title: t("programDetail.brochureTitle"),
                          description: t("programDetail.brochureDesc", { title }),
                          href: brochurePdfHref,
                          downloadName: `${programSlug}-tues-brochure.pdf`,
                        },
                        {
                          key: "admissions",
                          Icon: ClipboardList,
                          eyebrow: t("programDetail.admissionsEyebrow"),
                          title: t("programDetail.admissionsTitle"),
                          description: t("programDetail.admissionsDesc"),
                          href: admissionsPdfHref,
                          downloadName: `${programSlug}-tues-admissions.pdf`,
                        },
                        {
                          key: "curriculum",
                          Icon: BookOpen,
                          eyebrow: t("programDetail.curriculumEyebrow"),
                          title: t("programDetail.curriculumTitle"),
                          description: t("programDetail.curriculumDesc"),
                          href: curriculumPdfHref,
                          downloadName: `${programSlug}-tues-curriculum.pdf`,
                        },
                      ] as const
                    ).map(({ key, Icon, eyebrow, title, description, href, downloadName }) => (
                      <a
                        key={key}
                        href={href}
                        {...(href.startsWith("/")
                          ? { download: downloadName }
                          : { target: "_blank", rel: "noopener noreferrer" })}
                        className="group relative flex h-full min-h-0 flex-col overflow-hidden rounded-xl border border-border/70 bg-card/80 p-4 shadow-none outline-none ring-offset-background transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/25 hover:bg-card hover:shadow-md hover:shadow-foreground/5 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        <div
                          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/35 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                          aria-hidden
                        />
                        <div className="flex items-start gap-3">
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted/80 text-primary shadow-sm ring-1 ring-border/50 transition-colors group-hover:bg-primary/10 group-hover:ring-primary/15">
                            <Icon className="h-[18px] w-[18px]" aria-hidden />
                          </span>
                          <div className="min-w-0 flex-1 pt-0.5">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                              {eyebrow}
                            </p>
                            <p className="mt-0.5 text-sm font-semibold leading-snug text-foreground">{title}</p>
                          </div>
                        </div>
                        <p className="mt-3 flex-1 text-xs leading-relaxed text-muted-foreground line-clamp-4 sm:line-clamp-3">
                          {description}
                        </p>
                        <span className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-border/80 bg-background/80 py-2.5 text-xs font-semibold text-foreground transition-colors group-hover:border-primary/20 group-hover:bg-primary group-hover:text-primary-foreground">
                          <ArrowDownToLine className="h-3.5 w-3.5 shrink-0 opacity-80" aria-hidden />
                          {t("programDetail.downloadPdf")}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Career outcomes */}
                <div className="mb-12 md:mb-16">
                  <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-3">{t("programDetail.careerOutcomes")}</h2>
                  <p className="text-foreground/90 leading-relaxed">{careerOutcomes}</p>
                </div>

                {/* Key areas */}
                {highlights.length > 0 && (
                  <div className="mb-12 md:mb-16">
                    <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-4">{t("programDetail.keyAreas")}</h2>
                    <ul className="grid sm:grid-cols-2 gap-2">
                      {highlights.map((item) => (
                        <li key={item} className="flex items-center gap-2.5 text-foreground/80">
                          <span className="w-1 h-1 rounded-full bg-muted-foreground shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* About the school */}
                <div className="mb-12 md:mb-16 pl-4 border-l-2 border-border">
                  <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-3">{t("programDetail.aboutSchool")}</h2>
                  <p className="text-foreground/80 leading-relaxed">{t("programDetail.aboutSchoolBody")}</p>
                </div>
              </div>

              {/* Aside stretches to row height; pin uses fixed/absolute via useLayoutEffect on lg */}
              <aside
                ref={asideRef}
                className="relative lg:w-80 shrink-0 mt-10 lg:mt-0 lg:flex lg:flex-col lg:min-h-0"
              >
                <div ref={sidebarWrapRef} className="w-full">
                  <div
                    ref={sidebarCardRef}
                    className="w-full rounded-2xl bg-card border border-border p-6 lg:z-10 lg:max-h-[calc(100dvh-var(--header-height)-2rem)] lg:overflow-y-auto"
                    style={{ scrollbarGutter: "stable" }}
                  >
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4">{t("programDetail.atAGlance")}</h3>
                    <dl className="space-y-4">
                      {keyFacts.map(({ label, value, icon: FactIcon }) => (
                        <div key={label} className="flex gap-3">
                          <FactIcon className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                          <div className="min-w-0">
                            <dt className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</dt>
                            <dd className="text-sm font-medium text-foreground mt-0.5 break-words">{value}</dd>
                          </div>
                        </div>
                      ))}
                    </dl>
                    <div className="mt-6 pt-6 border-t border-border">
                      <a
                        href="#"
                        className="inline-flex w-full items-center justify-center gap-2 rounded-lg text-sm font-medium h-11 px-5 bg-oxford-blue hover:bg-oxford-blue/90 text-white transition-colors"
                      >
                        {t("programDetail.applyInquire")}
                      </a>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ProgramDetailPage;
