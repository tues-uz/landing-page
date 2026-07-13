import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSiteSearchContent } from "@/hooks/useSiteSearchContent";
import {
  buildSiteSearchHits,
  getStaticSearchRoutes,
  type SiteSearchHitKind,
} from "@/lib/siteSearch";
import { cn } from "@/lib/utils";

const SECTION_ORDER: SiteSearchHitKind[] = ["page", "program", "event", "news"];

export default function SiteSearchPage() {
  const [params] = useSearchParams();
  const q = params.get("q")?.trim() ?? "";
  const { t } = useTranslation("header");

  const { isPending, newsItems, eventItems, studyProgramItems } = useSiteSearchContent(true);

  const staticRoutes = useMemo(() => getStaticSearchRoutes((key) => t(key)), [t]);

  const kindLabels = useMemo(
    () => ({
      page: t("searchKind.page"),
      program: t("searchKind.program"),
      event: t("searchKind.event"),
      news: t("searchKind.news"),
    }),
    [t],
  );

  const hits = useMemo(
    () =>
      buildSiteSearchHits({
        query: q,
        news: newsItems,
        events: eventItems,
        studyPrograms: studyProgramItems,
        staticRoutes,
        kindLabels,
      }),
    [q, newsItems, eventItems, studyProgramItems, staticRoutes, kindLabels],
  );

  const grouped = useMemo(() => {
    const map = new Map<SiteSearchHitKind, typeof hits>();
    for (const k of SECTION_ORDER) map.set(k, []);
    for (const h of hits) map.get(h.kind)!.push(h);
    return SECTION_ORDER.map((kind) => ({ kind, items: map.get(kind)! }));
  }, [hits]);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="below-header">
        <div className="container mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">{t("searchPageTitle")}</h1>
          <p className="mt-2 text-muted-foreground">{t("searchPageSubtitle")}</p>

          {!q ? (
            <p className="mt-10 text-sm text-muted-foreground">{t("searchPageEmpty")}</p>
          ) : isPending ? (
            <p className="mt-10 flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="h-5 w-5 shrink-0 animate-spin" aria-hidden />
              {t("searchLoading")}
            </p>
          ) : hits.length === 0 ? (
            <p className="mt-10 text-sm text-muted-foreground">{t("searchNoResults")}</p>
          ) : (
            <div className="mt-10 space-y-10">
              {grouped.map(
                ({ kind, items }) =>
                  items.length > 0 && (
                    <section key={kind} aria-labelledby={`search-section-${kind}`}>
                      <h2 id={`search-section-${kind}`} className="text-lg font-medium text-foreground">
                        {kindLabels[kind]}
                      </h2>
                      <ul className="mt-3 divide-y divide-border rounded-lg border border-border bg-card">
                        {items.map((item) => (
                          <li key={item.id}>
                            <Link
                              to={item.to}
                              className={cn(
                                "block px-4 py-3 transition-colors hover:bg-accent/60",
                                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
                              )}
                            >
                              <span className="font-medium text-foreground">{item.title}</span>
                              {item.subtitle ? (
                                <span className="mt-1 block text-sm text-muted-foreground line-clamp-2">
                                  {item.subtitle}
                                </span>
                              ) : null}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </section>
                  ),
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
