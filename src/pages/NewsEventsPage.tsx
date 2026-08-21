import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import { useTranslation } from "react-i18next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArticleCard, NEWS_CARD_BORDER } from "@/components/NewsEvents";
import { NEUTRAL_BORDER } from "@/lib/uiBorders";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { contentApi, type NewsItem } from "@/api/client";
import { contentKeys } from "@/api/queryKeys";
import { filterNewsByQuery } from "@/lib/newsSearch";
import { getNewsPreviewText } from "@/lib/newsContent";
import { getNewsCategoryLabel } from "@/lib/newsCategories";
import { getUiLang } from "@/lib/localeContent";
import { sortNewsByDate, type NewsDateSortOrder } from "@/lib/newsDateUtils";

function NewsCardSkeleton() {
  return (
    <div className={`flex h-full flex-col overflow-hidden rounded-xl border ${NEWS_CARD_BORDER} bg-background animate-pulse`}>
      <div className="aspect-[3/2] w-full bg-muted" />
      <div className="flex flex-1 flex-col px-4 pb-4 pt-3">
        <div className="flex justify-between gap-3">
          <div className="h-3 w-16 rounded bg-muted" />
          <div className="h-3 w-20 rounded bg-muted" />
        </div>
        <div className="mt-2 h-4 w-full rounded bg-muted" />
        <div className="mt-1 h-4 w-4/5 rounded bg-muted" />
        <div className="mt-2 h-8 w-full rounded bg-muted" />
        <div className="mt-auto mt-3 h-10 w-full rounded-full bg-muted" />
      </div>
    </div>
  );
}

function FeaturedSkeleton() {
  return (
    <div className={`flex flex-col h-full rounded-xl border ${NEWS_CARD_BORDER} bg-background animate-pulse`}>
      <div className="flex-1 m-2 rounded-lg bg-muted min-h-48" />
      <div className="p-6 space-y-3">
        <div className="h-4 w-20 rounded-full bg-muted" />
        <div className="h-6 w-full rounded bg-muted" />
        <div className="h-4 w-full rounded bg-muted" />
        <div className="h-4 w-1/2 rounded bg-muted" />
      </div>
    </div>
  );
}

function HeroSlide({ item }: { item: NewsItem }) {
  const { t: tNews } = useTranslation("news", { bindI18n: "languageChanged loaded" });
  const previewText = getNewsPreviewText(item);
  const categoryLabel = getNewsCategoryLabel(item.category, tNews);
  return (
    <Link
      to={`/news/${item.slug}`}
      className="block w-full"
    >
      <div className="relative w-full aspect-[21/9] min-h-[280px] overflow-hidden bg-muted">
        <img
          src={item.imageUrl}
          alt={item.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end gap-4 pt-4 px-4 pb-8 md:pt-6 md:px-6 md:pb-8 lg:px-10">
          <span className="inline-flex w-fit rounded-full border border-white/30 bg-white/10 px-2 py-0.5 text-xs font-medium text-white backdrop-blur-sm">
            {categoryLabel}
          </span>
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold leading-tight text-white drop-shadow-sm md:text-2xl lg:text-3xl line-clamp-2">
              {item.title}
            </h2>
            <p className="max-w-2xl text-sm text-white/90 line-clamp-2 md:text-base">
              {previewText}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

function filterNews(items: NewsItem[], search: string, category: string): NewsItem[] {
  let result = filterNewsByQuery(items, search);
  if (category && category !== "all") {
    result = result.filter((item) => item.category === category);
  }
  return result;
}

const NewsEventsPage = () => {
  const { t, i18n } = useTranslation("news", {
    bindI18n: "languageChanged loaded",
  });
  const locale = getUiLang(i18n);
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(() => searchParams.get("q") ?? "");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [dateSort, setDateSort] = useState<NewsDateSortOrder>("newest");

  useEffect(() => {
    setSearchQuery(searchParams.get("q") ?? "");
  }, [searchParams]);

  useEffect(() => {
    setCategoryFilter("all");
    setDateSort("newest");
  }, [locale]);

  const allCategoriesLabel = t("allCategories");
  const categoryFilterLabel =
    categoryFilter === "all"
      ? allCategoriesLabel
      : getNewsCategoryLabel(categoryFilter, t);

  const { data: newsData, isLoading: newsLoading } = useQuery({
    queryKey: [...contentKeys.news.list(), locale],
    queryFn: () => contentApi.news.list(locale),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  const newsItems = newsData ?? [];
  const highlightItems = useMemo(
    () => newsItems.filter((item) => (item.display || "").toLowerCase() === "highlight"),
    [newsItems]
  );
  const heroSlides = highlightItems.length > 0 ? highlightItems.slice(0, 5) : newsItems.slice(0, 5);
  const listItems = highlightItems.length > 0
    ? newsItems.filter((item) => (item.display || "").toLowerCase() !== "highlight")
    : newsItems;
  const categories = useMemo(
    () => Array.from(new Set(listItems.map((item) => item.category))).sort(),
    [listItems]
  );
  const filteredItems = useMemo(() => {
    const filtered = filterNews(listItems, searchQuery, categoryFilter);
    return sortNewsByDate(filtered, dateSort);
  }, [listItems, searchQuery, categoryFilter, dateSort]);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="below-header">
        {/* Full-width hero slider */}
        <section className="w-full bg-background relative overflow-hidden">
          <div className="w-full">
            {newsLoading ? (
              <div className="w-full aspect-[21/9] min-h-[280px] bg-muted animate-pulse" />
            ) : heroSlides.length > 0 ? (
              <Carousel
                opts={{ loop: true, align: "start" }}
                className="w-full"
              >
                <CarouselContent className="-ml-0">
                  {heroSlides.map((item) => (
                    <CarouselItem key={item.id} className="pl-0 basis-full">
                      <HeroSlide item={item} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-4 md:left-6 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/40 border-0 text-white hover:bg-black/60 hover:text-white" />
                <CarouselNext className="right-4 md:right-6 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/40 border-0 text-white hover:bg-black/60 hover:text-white" />
              </Carousel>
            ) : (
              <div className={`w-full aspect-[21/9] min-h-[280px] flex items-center justify-center text-muted-foreground text-sm border-b ${NEWS_CARD_BORDER}`}>
                {t("noArticlesYet")}
              </div>
            )}
          </div>
        </section>

        <section className="pt-[48px] pb-24 bg-background relative overflow-hidden">
          <div className="container mx-auto px-6 relative z-10">
            <h2 className="text-3xl text-foreground mb-2">{t("title")}</h2>
            <p className="text-muted-foreground mb-8">
              {t("subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                <input
                  type="search"
                  placeholder={t("searchPlaceholder")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full h-11 pl-10 pr-4 rounded-full border ${NEUTRAL_BORDER} bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`}
                  aria-label={t("searchAriaLabel")}
                />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full sm:w-auto">
                <Select key={`${locale}-date`} value={dateSort} onValueChange={(v) => setDateSort(v as NewsDateSortOrder)}>
                  <SelectTrigger
                    className={`h-11 rounded-full w-full sm:w-fit px-3 gap-1.5 justify-start [&>span]:flex-none ${NEUTRAL_BORDER}`}
                    aria-label={t("dateSortAriaLabel")}
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">{t("dateSortNewest")}</SelectItem>
                    <SelectItem value="oldest">{t("dateSortOldest")}</SelectItem>
                  </SelectContent>
                </Select>
                <Select key={locale} value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger
                    className={`h-11 rounded-full w-full sm:w-fit px-3 gap-1.5 justify-start [&>span]:flex-none ${NEUTRAL_BORDER}`}
                    aria-label={t("filterAriaLabel")}
                  >
                    <SelectValue asChild>
                      <span className="truncate">{categoryFilterLabel}</span>
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{allCategoriesLabel}</SelectItem>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {getNewsCategoryLabel(cat, t)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {newsLoading ? (
                Array.from({ length: 6 }).map((_, i) => <NewsCardSkeleton key={i} />)
              ) : filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <ArticleCard key={item.id} item={item} featured={false} />
                ))
              ) : (
                <p className="text-muted-foreground col-span-full text-center py-12">
                  {listItems.length === 0
                    ? t("noArticlesYet")
                    : t("noMatch")}
                </p>
              )}
            </div>

          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default NewsEventsPage;
