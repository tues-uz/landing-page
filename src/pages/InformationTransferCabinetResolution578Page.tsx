import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { TFunction } from "i18next";
import { Link, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight, Home } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { RecommendedNewsSidebar } from "@/components/RecommendedNewsSidebar";
import {
  CABINET_578_APPENDIX_SPLIT,
  INFORMATION_TRANSFER_EDUCATION_PAGE_DEFAULTS,
} from "@/locales/informationTransferEducationDefaults";
import { cn } from "@/lib/utils";

const BODY_SRC = "/content/cabinet-resolution-578-uz.txt";
const HERO_SRC = "/images/admission-2025/information-transfer-cabinet-578.png";

const CABINET_578_SECTION_NAV = [
  { labelKey: "informationTransferCabinet578TabResolution" },
  { labelKey: "informationTransferCabinet578TabApp1" },
  { labelKey: "informationTransferCabinet578TabApp2" },
  { labelKey: "informationTransferCabinet578TabApp3" },
  { labelKey: "informationTransferCabinet578TabApp4" },
  { labelKey: "informationTransferCabinet578TabApp5" },
  { labelKey: "informationTransferCabinet578TabApp6" },
] as const satisfies ReadonlyArray<{
  labelKey: keyof typeof INFORMATION_TRANSFER_EDUCATION_PAGE_DEFAULTS;
}>;

const TOTAL_SECTION_PAGES = CABINET_578_SECTION_NAV.length;

function trCabinet578(t: TFunction, key: keyof typeof INFORMATION_TRANSFER_EDUCATION_PAGE_DEFAULTS) {
  return t(key, { defaultValue: INFORMATION_TRANSFER_EDUCATION_PAGE_DEFAULTS[key] });
}

function splitCabinet578Sections(raw: string): string[] {
  const parts = raw.split(CABINET_578_APPENDIX_SPLIT);
  return parts.length >= 2 ? parts : [raw];
}

function toParagraphs(section: string) {
  return section
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);
}

function clampPage(n: number, total: number): number {
  if (Number.isNaN(n) || n < 1) return 1;
  if (n > total) return total;
  return n;
}

export default function InformationTransferCabinetResolution578Page() {
  const { t } = useTranslation("topNav");
  const { t: tCommon } = useTranslation("common");
  const { t: th } = useTranslation("header");

  const admissionLabel = th("secondNav.admission2025");
  const hubTitle = trCabinet578(t, "informationTransferEducationPageTitle");
  const leafTitle = trCabinet578(t, "informationTransferCabinet578PageTitle");

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
                    {admissionLabel}
                  </span>
                </li>
                <li aria-hidden className="flex items-center text-muted-foreground/70">
                  <span className="leading-none">/</span>
                </li>
                <li className="flex min-w-0 items-center">
                  <Link
                    to="/admission-2025/information-transfer-of-education"
                    className="font-medium text-muted-foreground transition-colors hover:text-foreground line-clamp-2 sm:line-clamp-none"
                  >
                    {hubTitle}
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
              <CabinetResolutionArticle t={t} />
            </div>
            <RecommendedNewsSidebar className="order-2 lg:order-none lg:col-span-3" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function CabinetResolutionArticle({ t }: { t: TFunction }) {
  const title = trCabinet578(t, "informationTransferCabinet578PageTitle");
  const alt = trCabinet578(t, "informationTransferCabinet578HeroAlt");
  const [searchParams, setSearchParams] = useSearchParams();
  const [bodyRaw, setBodyRaw] = useState<string | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const contentAnchorRef = useRef<HTMLDivElement>(null);
  const skipScrollIntoView = useRef(true);

  useEffect(() => {
    let cancelled = false;
    setLoadError(null);
    fetch(BODY_SRC)
      .then((r) => {
        if (!r.ok) throw new Error(String(r.status));
        return r.text();
      })
      .then((text) => {
        if (!cancelled) setBodyRaw(text);
      })
      .catch(() => {
        if (!cancelled) setLoadError("load_failed");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const rawSections = useMemo(() => (bodyRaw ? splitCabinet578Sections(bodyRaw) : []), [bodyRaw]);
  const usePagedSections = rawSections.length >= 2;
  const sectionBodies = useMemo(() => {
    if (!usePagedSections) return [];
    return CABINET_578_SECTION_NAV.map((_, i) => rawSections[i] ?? "");
  }, [rawSections, usePagedSections]);

  const currentPage = useMemo(() => {
    const raw = parseInt(searchParams.get("page") || "1", 10);
    return clampPage(raw, TOTAL_SECTION_PAGES);
  }, [searchParams]);

  const goToPage = useCallback(
    (n: number) => {
      const next = clampPage(n, TOTAL_SECTION_PAGES);
      setSearchParams(
        (prev) => {
          const p = new URLSearchParams(prev);
          if (next <= 1) {
            p.delete("page");
          } else {
            p.set("page", String(next));
          }
          return p;
        },
        { replace: false },
      );
    },
    [setSearchParams],
  );

  useEffect(() => {
    if (skipScrollIntoView.current) {
      skipScrollIntoView.current = false;
      return;
    }
    contentAnchorRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [currentPage]);

  const activeBody = usePagedSections ? (sectionBodies[currentPage - 1] ?? "") : "";
  const activeParagraphs = usePagedSections ? toParagraphs(activeBody) : [];

  return (
    <article className="max-w-none">
      <figure className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-border bg-muted shadow-sm sm:aspect-[16/9]">
        <img
          src={HERO_SRC}
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover object-center"
          decoding="async"
          loading="eager"
        />
      </figure>
      <h1 className="mt-6 text-balance text-3xl font-semibold tracking-tight text-foreground md:text-[2rem] md:leading-tight">
        {title}
      </h1>
      <div className="mt-6 text-body-article text-muted-foreground">
        {loadError ? (
          <p className="text-destructive">
            {trCabinet578(t, "informationTransferCabinet578LoadError")}
          </p>
        ) : bodyRaw === null ? (
          <p className="animate-pulse text-muted-foreground">{trCabinet578(t, "informationTransferCabinet578Loading")}</p>
        ) : usePagedSections ? (
          <>
            <div ref={contentAnchorRef} className="scroll-mt-28" />
            <Cabinet578GooglePagination
              currentPage={currentPage}
              totalPages={TOTAL_SECTION_PAGES}
              onPageChange={goToPage}
              t={t}
            />
            <h2 className="mb-4 mt-6 text-lg font-semibold tracking-tight text-foreground">
              {trCabinet578(t, CABINET_578_SECTION_NAV[currentPage - 1].labelKey)}
            </h2>
            <div className="flex flex-col gap-5">
              {activeParagraphs.map((p, j) => renderBlock(p, `p-${currentPage}-${j}`))}
            </div>
            <Cabinet578GooglePagination
              currentPage={currentPage}
              totalPages={TOTAL_SECTION_PAGES}
              onPageChange={goToPage}
              t={t}
              className="mt-10"
            />
          </>
        ) : (
          <div className="flex flex-col gap-5">
            {toParagraphs(bodyRaw).map((p, i) => renderBlock(p, `fallback-${i}`))}
          </div>
        )}
      </div>
    </article>
  );
}

/** Numbered pager — clean card layout, segmented page control */
function Cabinet578GooglePagination({
  currentPage,
  totalPages,
  onPageChange,
  t,
  className,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (n: number) => void;
  t: TFunction;
  className?: string;
}) {
  const pages = useMemo(() => Array.from({ length: totalPages }, (_, i) => i + 1), [totalPages]);
  const prevLabel = trCabinet578(t, "informationTransferCabinet578NavPrevious");
  const nextLabel = trCabinet578(t, "informationTransferCabinet578NavNext");
  const pageIndicator = t("informationTransferCabinet578PageIndicator", {
    current: currentPage,
    total: totalPages,
    defaultValue: INFORMATION_TRANSFER_EDUCATION_PAGE_DEFAULTS.informationTransferCabinet578PageIndicator as string,
  });

  return (
    <nav
      className={cn(
        "rounded-2xl border border-border bg-card/80 p-4 shadow-[0_1px_2px_rgba(0,0,0,0.04)] backdrop-blur-sm dark:border-border dark:bg-card/60 dark:shadow-[0_1px_2px_rgba(0,0,0,0.2)] sm:p-5",
        className,
      )}
      aria-label={trCabinet578(t, "informationTransferCabinet578PaginationAria")}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <p className="text-center text-[13px] font-medium tabular-nums tracking-tight text-muted-foreground sm:min-w-0 sm:shrink sm:text-left">
          {pageIndicator}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-end sm:gap-2.5">
          <button
            type="button"
            disabled={currentPage <= 1}
            onClick={() => onPageChange(currentPage - 1)}
            aria-label={prevLabel}
            className={cn(
              "inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-background text-foreground transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              currentPage <= 1
                ? "pointer-events-none opacity-30"
                : "hover:border-primary/30 hover:bg-muted/80 active:scale-[0.98]",
            )}
          >
            <ChevronLeft className="h-4 w-4" strokeWidth={2} aria-hidden />
          </button>

          <ul className="inline-flex list-none flex-wrap items-center justify-center gap-0.5 rounded-2xl bg-muted/60 p-1 ring-1 ring-inset ring-border dark:bg-muted/40">
            {pages.map((n) => (
              <li key={n} className="m-0 p-0">
                {n === currentPage ? (
                  <span
                    className="inline-flex min-h-9 min-w-9 cursor-default items-center justify-center rounded-xl bg-primary px-2.5 text-sm font-semibold tabular-nums text-primary-foreground shadow-sm"
                    aria-current="page"
                  >
                    {n}
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => onPageChange(n)}
                    className="inline-flex min-h-9 min-w-9 items-center justify-center rounded-xl px-2.5 text-sm font-medium tabular-nums text-muted-foreground transition hover:bg-background hover:text-foreground active:scale-[0.97] dark:hover:bg-background/80"
                  >
                    {n}
                  </button>
                )}
              </li>
            ))}
          </ul>

          <button
            type="button"
            disabled={currentPage >= totalPages}
            onClick={() => onPageChange(currentPage + 1)}
            aria-label={nextLabel}
            className={cn(
              "inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-background text-foreground transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              currentPage >= totalPages
                ? "pointer-events-none opacity-30"
                : "hover:border-primary/30 hover:bg-muted/80 active:scale-[0.98]",
            )}
          >
            <ChevronRight className="h-4 w-4" strokeWidth={2} aria-hidden />
          </button>
        </div>
      </div>
    </nav>
  );
}

function renderBlock(p: string, key: string | number) {
  const trimmed = p.trim();
  if (trimmed.startsWith("## ")) {
    return (
      <h2 key={key} className="text-balance text-xl font-semibold tracking-tight text-foreground">
        {trimmed.slice(3).trim()}
      </h2>
    );
  }
  if (trimmed.startsWith("### ")) {
    return (
      <h3 key={key} className="text-lg font-semibold tracking-tight text-foreground">
        {trimmed.slice(4).trim()}
      </h3>
    );
  }
  return (
    <p key={key} className={cn("whitespace-pre-line text-justify")}>
      {trimmed}
    </p>
  );
}
