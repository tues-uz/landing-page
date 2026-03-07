import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArticleCard } from "@/components/NewsEvents";
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
import { FALLBACK_NEWS } from "@/data/fallbackContent";

function NewsCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-border bg-background animate-pulse">
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="h-4 w-16 rounded-full bg-muted" />
        <div className="h-4 w-full rounded bg-muted" />
        <div className="h-4 w-3/4 rounded bg-muted" />
        <div className="mt-auto h-3 w-1/2 rounded bg-muted" />
      </div>
      <div className="w-full px-2 pb-2">
        <div className="aspect-[334/188] w-full rounded-lg bg-muted" />
      </div>
    </div>
  );
}

function FeaturedSkeleton() {
  return (
    <div className="flex flex-col h-full rounded-xl border border-border bg-background animate-pulse">
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
        <div className="absolute inset-0 flex flex-col justify-end gap-[48px] p-4 md:p-6 lg:px-10">
          <span className="inline-flex w-fit rounded-full border border-white/30 bg-white/10 px-2 py-0.5 text-xs font-medium text-white backdrop-blur-sm">
            {item.category}
          </span>
          <h2 className="text-2xl font-bold leading-tight text-white drop-shadow-sm md:text-3xl lg:text-4xl line-clamp-2">
            {item.title}
          </h2>
          <p className="max-w-2xl text-sm text-white/90 line-clamp-2 md:text-base">
            {item.excerpt}
          </p>
          <span className="text-xs text-white/80">
            {item.author} · {item.date}
          </span>
        </div>
      </div>
    </Link>
  );
}

function filterNews(items: NewsItem[], search: string, category: string): NewsItem[] {
  let result = items;
  const q = search.trim().toLowerCase();
  if (q) {
    result = result.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.excerpt.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.author.toLowerCase().includes(q)
    );
  }
  if (category && category !== "all") {
    result = result.filter((item) => item.category === category);
  }
  return result;
}

const NewsEventsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const { data: newsData, isLoading: newsLoading } = useQuery({
    queryKey: contentKeys.news.list(),
    queryFn: contentApi.news.list,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  const newsItems = newsData && newsData.length > 0 ? newsData : FALLBACK_NEWS;
  const heroSlides = newsItems.slice(0, 5);
  const categories = useMemo(
    () => Array.from(new Set(newsItems.map((item) => item.category))).sort(),
    [newsItems]
  );
  const filteredItems = useMemo(
    () => filterNews(newsItems, searchQuery, categoryFilter),
    [newsItems, searchQuery, categoryFilter]
  );

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
              <div className="w-full aspect-[21/9] min-h-[280px] flex items-center justify-center text-muted-foreground text-sm border-b border-border">
                No articles yet.
              </div>
            )}
          </div>
        </section>

        <section className="pt-[48px] pb-24 bg-background relative overflow-hidden">
          <div className="container mx-auto px-6 relative z-10">
            <h2 className="text-3xl text-foreground mb-2">News</h2>
            <p className="text-muted-foreground mb-8">
              Stay up to date with the latest from TUES—research highlights and campus updates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                <input
                  type="search"
                  placeholder="Search news by title, excerpt, category, or author…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-11 pl-10 pr-4 rounded-lg border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  aria-label="Search news"
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger
                  className="h-11 rounded-lg w-32 sm:w-36"
                  aria-label="Filter by category"
                >
                  <SelectValue placeholder="All categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All categories</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {newsLoading ? (
                Array.from({ length: 6 }).map((_, i) => <NewsCardSkeleton key={i} />)
              ) : filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <ArticleCard key={item.id} item={item} featured={false} />
                ))
              ) : (
                <p className="text-muted-foreground col-span-full text-center py-12">
                  {newsItems.length === 0
                    ? "No articles yet."
                    : "No news match your search or filter. Try different keywords or category."}
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
