import { ArrowRight, Clock, MapPin, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { contentApi, type NewsItem, type EventItem } from "@/api/client";
import { contentKeys } from "@/api/queryKeys";
import { FALLBACK_NEWS, FALLBACK_EVENTS } from "@/data/fallbackContent";

// ─── Skeleton loaders ─────────────────────────────────────────────────────────

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

function EventSkeleton() {
  return (
    <div className="flex overflow-hidden rounded-xl border border-border bg-background animate-pulse">
      <div className="flex min-w-[56px] items-center justify-center bg-primary/5 py-3 px-2">
        <div className="h-8 w-8 rounded bg-muted" />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="h-4 w-full rounded bg-muted" />
        <div className="h-3 w-1/2 rounded bg-muted" />
      </div>
    </div>
  );
}

// ─── Article Card ─────────────────────────────────────────────────────────────

function ArticleCard({ item, featured = false }: { item: NewsItem; featured?: boolean }) {
  return (
    <Link
      to={`/news/${item.slug}`}
      className="flex flex-col overflow-hidden rounded-xl border border-border bg-background shadow-sm transition-all hover:scale-[1.01] hover:shadow-md group"
    >
      {featured && (
        <>
          <div className="relative min-h-0 flex-1 w-full overflow-hidden px-2 pt-2 xl:px-4 xl:pt-4">
            <img
              src={item.imageUrl}
              alt={item.title}
              className="h-full w-full rounded-lg object-cover"
              loading="lazy"
            />
          </div>
          <div className="flex flex-1 flex-col gap-2 p-5 xl:p-6">
            <span className="inline-flex w-fit rounded-full border border-border px-2 py-0.5 text-xs font-medium text-foreground">
              {item.category}
            </span>
            <h2 className="text-xl font-bold leading-tight text-foreground line-clamp-2 group-hover:text-primary transition-colors xl:text-2xl">
              {item.title}
            </h2>
            <p className="text-muted-foreground text-sm line-clamp-2">{item.excerpt}</p>
            <div className="mt-auto flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
              <span className="font-medium text-foreground">{item.author}</span>
              <span>on {item.date}</span>
              <span className="flex items-center gap-1">
                <MessageCircle className="h-3 w-3" />
                0 Comments
              </span>
            </div>
          </div>
        </>
      )}
      {!featured && (
        <>
          <div className="flex flex-1 flex-col gap-2 p-4">
            <span className="inline-flex w-fit rounded-full border border-border px-2 py-0.5 text-xs font-medium text-foreground">
              {item.category}
            </span>
            <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
              {item.title}
            </h3>
            <div className="mt-auto flex items-center gap-2 text-sm text-muted-foreground">
              <span className="font-medium text-foreground">{item.author}</span>
              <span>on {item.date}</span>
            </div>
          </div>
          <div className="w-full px-2 pb-2">
            <img
              src={item.imageUrl}
              alt={item.title}
              className="aspect-[334/188] w-full rounded-lg object-cover"
              loading="lazy"
            />
          </div>
        </>
      )}
    </Link>
  );
}

// ─── Event Card ───────────────────────────────────────────────────────────────

function EventCard({ event }: { event: EventItem }) {
  const [day, month] = event.date.split(" ");
  return (
    <div className="group overflow-hidden rounded-xl border border-border bg-background shadow-sm transition-all hover:scale-[1.01] hover:shadow-md hover:border-primary/20 cursor-pointer">
      <div className="flex">
        <div className="flex min-w-[56px] flex-col items-center justify-center rounded-l-xl bg-primary/5 py-3 px-2">
          <span className="text-xl font-serif font-bold leading-none text-primary">{day}</span>
          <span className="mt-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
            {month}
          </span>
        </div>
        <div className="flex flex-1 flex-col justify-center gap-1.5 p-4">
          <h4 className="font-semibold text-foreground text-sm leading-tight group-hover:text-primary transition-colors line-clamp-2">
            {event.title}
          </h4>
          <div className="flex flex-col gap-0.5 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 shrink-0" />
              {event.time}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 shrink-0" />
              <span className="line-clamp-1">{event.location}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

const NewsEvents = () => {
  const {
    data: newsData,
    isLoading: newsLoading,
  } = useQuery({
    queryKey: contentKeys.news.list(),
    queryFn: contentApi.news.list,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  const {
    data: eventData,
    isLoading: eventsLoading,
  } = useQuery({
    queryKey: contentKeys.events.list(),
    queryFn: contentApi.events.list,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  const newsItems = newsData && newsData.length > 0 ? newsData : FALLBACK_NEWS;
  const eventItems = eventData && eventData.length > 0 ? eventData : FALLBACK_EVENTS;

  const featuredArticle = newsItems[0];
  const sideArticle1 = newsItems[1];
  const sideArticle2 = newsItems[2];

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Subtle background texture */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2072&q=80')`,
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <h2 className="text-4xl font-serif font-semibold text-foreground mb-2">News and Events</h2>
        <p className="text-muted-foreground max-w-2xl mb-8">
          Stay up to date with the latest from TUES—research highlights, campus updates, and upcoming events.
        </p>

        <div className="grid lg:grid-cols-12 gap-6">
          {/* ── News section ───────────────────────────────────────────────── */}
          <div className="lg:col-span-9">
            <div className="flex items-center justify-between gap-4 mb-4">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Latest News
              </p>
              <Link
                to="/#news"
                className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
              >
                View all
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid lg:grid-cols-9 gap-6">
              {/* Left column — side articles */}
              <div className="lg:col-span-3 flex flex-col gap-6">
                {newsLoading ? (
                  <>
                    <NewsCardSkeleton />
                    <NewsCardSkeleton />
                  </>
                ) : (
                  <>
                    {sideArticle1 && <ArticleCard item={sideArticle1} />}
                    {sideArticle2 && <ArticleCard item={sideArticle2} />}
                  </>
                )}
              </div>

              {/* Center column — featured article */}
              <div className="lg:col-span-6 flex flex-col min-h-0">
                {newsLoading ? (
                  <div className="flex flex-col h-full rounded-xl border border-border bg-background animate-pulse">
                    <div className="flex-1 m-2 rounded-lg bg-muted min-h-48" />
                    <div className="p-6 space-y-3">
                      <div className="h-4 w-20 rounded-full bg-muted" />
                      <div className="h-6 w-full rounded bg-muted" />
                      <div className="h-4 w-full rounded bg-muted" />
                      <div className="h-4 w-1/2 rounded bg-muted" />
                    </div>
                  </div>
                ) : featuredArticle ? (
                  <ArticleCard item={featuredArticle} featured />
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground text-sm rounded-xl border border-dashed border-border">
                    No articles yet.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ── Events section ─────────────────────────────────────────────── */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between gap-4 mb-4">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Upcoming Events
              </p>
              <Link
                to="/#events"
                className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
              >
                View all
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="space-y-4">
              {eventsLoading ? (
                Array.from({ length: 4 }).map((_, i) => <EventSkeleton key={i} />)
              ) : eventItems.length > 0 ? (
                eventItems.slice(0, 5).map((event) => <EventCard key={event.id} event={event} />)
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">No upcoming events.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsEvents;
