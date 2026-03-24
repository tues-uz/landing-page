import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Share2, ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { contentApi } from "@/api/client";
import { contentKeys } from "@/api/queryKeys";
import { FALLBACK_NEWS } from "@/data/fallbackContent";
import { getUiLang, mergeNewsArticleForEnglish, mergeNewsForEnglish } from "@/lib/localeContent";

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function ArticleSkeleton() {
  return (
    <div className="animate-pulse space-y-6 px-5 py-8 xl:px-8 xl:py-14 max-w-3xl mx-auto">
      <div className="h-6 w-24 rounded-full bg-muted" />
      <div className="space-y-3">
        <div className="h-8 w-full rounded bg-muted" />
        <div className="h-8 w-3/4 rounded bg-muted" />
      </div>
      <div className="h-4 w-48 rounded bg-muted" />
      <div className="aspect-[374/182] w-full rounded-xl bg-muted" />
      <div className="space-y-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className={`h-4 rounded bg-muted ${i % 3 === 2 ? "w-2/3" : "w-full"}`} />
        ))}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const NewsDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation();

  const { data: remoteArticle, isLoading, error } = useQuery({
    queryKey: contentKeys.news.detail(slug ?? ""),
    queryFn: () => contentApi.news.getBySlug(slug!),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  // Fetch all news for related articles
  const { data: remoteAllNews } = useQuery({
    queryKey: contentKeys.news.list(),
    queryFn: contentApi.news.list,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  const fallbackArticle = FALLBACK_NEWS.find((n) => n.slug === slug);
  const rawArticle = (error || !remoteArticle) && fallbackArticle ? fallbackArticle : remoteArticle;

  const article = useMemo(() => {
    if (!rawArticle) return null;
    if (getUiLang(i18n) !== "en") return rawArticle;
    return mergeNewsArticleForEnglish(rawArticle, slug);
  }, [rawArticle, slug, i18n.resolvedLanguage, i18n.language]);

  const allNews = remoteAllNews && remoteAllNews.length > 0 ? remoteAllNews : FALLBACK_NEWS;

  const relatedArticles = useMemo(() => {
    if (!article) return [];
    const others = allNews.filter((n) => n.slug !== slug);
    const list = getUiLang(i18n) === "en" ? mergeNewsForEnglish(others) : others;
    return list.slice(0, 4);
  }, [article, allNews, slug, i18n.resolvedLanguage, i18n.language]);

  const formatDateLong = (dateStr: string) => {
    const lng = (i18n.resolvedLanguage ?? i18n.language ?? "en").slice(0, 2);
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    const locale = lng === "uz" ? "uz-UZ" : lng === "ru" ? "ru-RU" : "en-US";
    return d.toLocaleDateString(locale, { month: "short", day: "numeric", year: "numeric" });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="below-header relative z-0 flex-1 overflow-x-clip bg-muted/30">
          <div className="relative z-10 mx-auto w-full min-h-[calc(100dvh-var(--header-height))] max-w-[1504px] overflow-hidden rounded-2xl bg-background shadow-sm xl:mx-4 xl:mb-4">
            <ArticleSkeleton />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="below-header container mx-auto px-6 py-24 text-center">
          <h1 className="text-2xl font-semibold text-foreground mb-4">{t("newsDetail.notFound")}</h1>
          <Link to="/" className="inline-flex items-center gap-2 text-primary hover:underline">
            <ArrowLeft className="h-4 w-4" />
            {t("common.backHome")}
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const body = Array.isArray(article.body) ? article.body : [];
  const firstParagraph =
    body.length > 0 && body[0].paragraphs.length > 0 ? body[0].paragraphs[0] : article.excerpt;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="below-header relative z-0 flex-1 overflow-x-clip bg-muted/30 flex justify-center">
        <div className="relative z-10 w-full min-h-[calc(100dvh-var(--header-height))] overflow-hidden rounded-none bg-background shadow-sm">
          {/* Breadcrumb */}
          <div className="flex flex-col-reverse border-b border-border pb-3 pt-5 lg:h-12 lg:flex-row lg:items-center lg:gap-2 lg:py-0 lg:px-6">
            <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap px-5 scrollbar-hide lg:px-0">
              <Link to="/news" className="font-medium text-foreground text-sm hover:text-primary">
                {t("newsDetail.breadcrumbNews")}
              </Link>
              <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
              {article.category && (
                <>
                  <Link to="/news" className="font-medium text-foreground text-sm hover:text-primary">
                    {article.category}
                  </Link>
                  <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
                </>
              )}
              <span className="select-none font-medium text-muted-foreground text-sm line-clamp-1">
                {article.title}
              </span>
            </div>
          </div>

          {/* Article header */}
          <div className="mx-auto max-w-3xl gap-3 px-5 pb-6 pt-8 xl:px-8 xl:pt-14">
            {article.category && (
              <div className="flex mb-4">
                <span className="inline-flex h-8 shrink-0 items-center rounded-full border border-border px-3 text-sm font-medium text-foreground">
                  {article.category}
                </span>
              </div>
            )}
            <h1 className="text-3xl font-bold leading-tight text-foreground xl:text-5xl">
              {article.title}
            </h1>
            <div className="mt-4 flex h-5 items-center gap-2">
              <div className="flex items-center justify-center overflow-hidden rounded-full bg-primary/10 size-8 text-xs font-semibold text-primary">
                {article.author.charAt(0)}
              </div>
              <span className="font-semibold text-foreground text-sm">{article.author}</span>
              <span className="text-muted-foreground text-sm">
                {getUiLang(i18n) === "en" ? `on ${formatDateLong(article.date)}` : formatDateLong(article.date)}
              </span>
              {article.readTime && (
                <span className="text-muted-foreground text-sm">· {article.readTime}</span>
              )}
            </div>
          </div>

          {/* Hero image */}
          {article.imageUrl && (
            <div className="mx-auto w-full max-w-[1504px] px-2 py-6 xl:px-6 xl:py-10">
              <img
                src={article.imageUrl}
                alt={article.title}
                className="aspect-[374/182] w-full rounded-xl object-contain bg-muted xl:aspect-[1456/470]"
              />
            </div>
          )}

          {/* Body */}
          <div className="mx-auto max-w-3xl px-5 py-6 xl:px-8">
            <div className="prose prose-neutral max-w-none">
              <p className="drop-cap text-lg leading-relaxed text-foreground/90">{firstParagraph}</p>
              {body.map((section, index) => (
                <div key={index} className="mt-8">
                  <h2 className="mb-3 scroll-mt-24 text-lg font-semibold text-foreground">
                    {section.heading}
                  </h2>
                  {section.paragraphs.map((para, p) => {
                    if (index === 0 && p === 0) return null;
                    return (
                      <p key={p} className="mb-4 leading-relaxed text-foreground/90">
                        {para}
                      </p>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Author + Share */}
            <div className="mt-10 flex flex-col gap-6 border-t border-border py-8 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center overflow-hidden rounded-full bg-primary/10 text-sm font-semibold text-primary">
                  {article.author.charAt(0)}
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-foreground">{article.author}</span>
                  <span className="text-muted-foreground text-sm">{formatDateLong(article.date)}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-muted-foreground">{t("common.shareArticle")}:</span>
                <button
                  type="button"
                  onClick={() => navigator.share?.({ title: article.title, url: window.location.href })}
                  className="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                  aria-label={t("common.shareArticle")}
                >
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Related articles */}
            {relatedArticles.length > 0 && (
              <div className="border-t border-border bg-muted/20 pb-12 pt-10">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-foreground">{t("common.relatedArticles")}</h2>
                </div>
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-2">
                  {relatedArticles.map((item) => (
                    <Link
                      key={item.slug}
                      to={`/news/${item.slug}`}
                      className="flex flex-col overflow-hidden rounded-xl border border-border bg-background shadow-sm transition-all hover:scale-[1.01] hover:shadow-md"
                    >
                      <div className="flex flex-1 flex-col gap-2 p-4">
                        <span className="inline-flex w-fit rounded-full border border-border px-2 py-0.5 text-xs font-medium text-foreground">
                          {item.category}
                        </span>
                        <h3 className="font-semibold text-foreground line-clamp-2 hover:text-primary">
                          {item.title}
                        </h3>
                        <div className="mt-auto flex items-center gap-2 text-sm">
                          <span className="font-medium text-foreground">{item.author}</span>
                          <span className="text-muted-foreground">
                            {getUiLang(i18n) === "en" ? `on ${formatDateLong(item.date)}` : formatDateLong(item.date)}
                          </span>
                        </div>
                      </div>
                      {item.imageUrl && (
                        <div className="w-full px-2 pb-2">
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="aspect-[334/188] w-full rounded-lg object-cover object-center bg-muted"
                            loading="lazy"
                          />
                        </div>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NewsDetailPage;
