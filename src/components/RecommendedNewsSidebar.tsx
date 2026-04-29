import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { contentApi, getEventImageUrl, type EventItem, type NewsItem } from "@/api/client";
import { contentKeys } from "@/api/queryKeys";
import { FALLBACK_EVENTS, FALLBACK_NEWS } from "@/data/fallbackContent";
import { cn } from "@/lib/utils";

const MAX_SIDEBAR_CARDS = 3;

const EVENT_IMAGE_PLACEHOLDER =
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=600&fit=crop";

function sortByDateDesc(items: NewsItem[]): NewsItem[] {
  return [...items].sort((a, b) => {
    const ta = Date.parse(a.date);
    const tb = Date.parse(b.date);
    if (Number.isNaN(ta) && Number.isNaN(tb)) return 0;
    if (Number.isNaN(ta)) return 1;
    if (Number.isNaN(tb)) return -1;
    return tb - ta;
  });
}

/** Best-effort sort: soonest event date first for sidebar preview. */
function parseEventSortMs(dateStr: string): number {
  const trimmed = String(dateStr ?? "").trim();
  const isoMatch = trimmed.match(/(\d{4})[-/](\d{2})[-/](\d{2})/);
  if (isoMatch) {
    const t = Date.parse(`${isoMatch[1]}-${isoMatch[2]}-${isoMatch[3]}`);
    if (!Number.isNaN(t)) return t;
  }
  const t = Date.parse(trimmed);
  if (!Number.isNaN(t)) return t;
  return Number.MAX_SAFE_INTEGER;
}

function sortEventsSoonestFirst(items: EventItem[]): EventItem[] {
  return [...items].sort((a, b) => parseEventSortMs(a.date) - parseEventSortMs(b.date));
}

function RecommendedNewsCard({ item }: { item: NewsItem }) {
  return (
    <Link
      to={`/news/${item.slug}`}
      className={cn(
        "group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all",
        "hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-md",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      )}
    >
      <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-muted">
        <img
          src={item.imageUrl}
          alt={item.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="flex flex-col gap-1.5 p-3">
        <span className="inline-flex w-fit rounded-full border border-border px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
          {item.category}
        </span>
        <p className="text-[14px] font-semibold leading-snug text-foreground line-clamp-2 transition-colors group-hover:text-primary">
          {item.title}
        </p>
        <time className="text-xs text-muted-foreground" dateTime={item.date}>
          {item.date}
        </time>
      </div>
    </Link>
  );
}

function RecommendedSidebarEventCard({ item }: { item: EventItem }) {
  const imageUrl = getEventImageUrl(item, EVENT_IMAGE_PLACEHOLDER);
  const meta = [item.date, item.time, item.location].filter(Boolean).join(" · ");

  return (
    <Link
      to={`/events/${item.id}`}
      className={cn(
        "group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all",
        "hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-md",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      )}
    >
      <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-muted">
        <img
          src={imageUrl}
          alt={item.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="flex flex-col gap-1.5 p-3">
        <p className="text-[14px] font-semibold leading-snug text-foreground line-clamp-2 transition-colors group-hover:text-primary">
          {item.title}
        </p>
        <p className="text-[14px] text-muted-foreground line-clamp-2">{meta}</p>
      </div>
    </Link>
  );
}

function NewsCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      <div className="aspect-[16/10] w-full animate-pulse bg-muted" />
      <div className="space-y-2 p-3">
        <div className="h-4 w-16 animate-pulse rounded-full bg-muted" />
        <div className="h-3.5 w-full animate-pulse rounded bg-muted" />
        <div className="h-3.5 w-[80%] animate-pulse rounded bg-muted" />
        <div className="h-3 w-20 animate-pulse rounded bg-muted" />
      </div>
    </div>
  );
}

function EventCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      <div className="aspect-[16/10] w-full animate-pulse bg-muted" />
      <div className="space-y-2 p-3">
        <div className="h-3.5 w-full animate-pulse rounded bg-muted" />
        <div className="h-3.5 w-[85%] animate-pulse rounded bg-muted" />
        <div className="h-3 w-28 animate-pulse rounded bg-muted" />
      </div>
    </div>
  );
}

/**
 * Right column: News block + Events block (same pattern: title, cards, view-all link).
 */
export function RecommendedNewsSidebar({ className }: { className?: string }) {
  const { t: tNews } = useTranslation("home", { keyPrefix: "news" });
  const { t: tEvents } = useTranslation("home", { keyPrefix: "events" });
  const { i18n } = useTranslation();

  const { data: newsData, isPending: newsPending } = useQuery({
    queryKey: [...contentKeys.news.list(), i18n.language],
    queryFn: () => contentApi.news.list(i18n.language),
    staleTime: 5 * 60 * 1000,
  });

  const { data: eventData, isPending: eventsPending } = useQuery({
    queryKey: [...contentKeys.events.list(), i18n.language],
    queryFn: () => contentApi.events.list(i18n.language),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  const newsRaw = newsData && newsData.length > 0 ? newsData : FALLBACK_NEWS;
  const newsItems = sortByDateDesc(newsRaw).slice(0, MAX_SIDEBAR_CARDS);

  const eventsRaw = eventData && eventData.length > 0 ? eventData : FALLBACK_EVENTS;
  const eventItems = sortEventsSoonestFirst(eventsRaw).slice(0, MAX_SIDEBAR_CARDS);

  return (
    <aside className={cn("relative flex flex-col gap-10", className)}>
      <div className="flex flex-col gap-4">
        <h2 className="shrink-0 text-xl font-semibold tracking-tight text-foreground">
          {tNews("recommendedSidebarTitle", { defaultValue: "News" })}
        </h2>

        {newsPending ? (
          <div className="flex flex-col gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <NewsCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <ul className="m-0 flex list-none flex-col gap-4 p-0">
            {newsItems.map((item) => (
              <li key={item.id}>
                <RecommendedNewsCard item={item} />
              </li>
            ))}
          </ul>
        )}

        <Link
          to="/news"
          className="shrink-0 rounded-xl border border-border bg-card py-3 text-center text-sm font-semibold text-primary shadow-sm transition-colors hover:bg-muted/50 hover:text-primary/90"
        >
          {tNews("viewAll")}
        </Link>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="shrink-0 text-xl font-semibold tracking-tight text-foreground">
          {tEvents("recommendedSidebarTitle", { defaultValue: "Events" })}
        </h2>

        {eventsPending ? (
          <div className="flex flex-col gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <EventCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <ul className="m-0 flex list-none flex-col gap-4 p-0">
            {eventItems.map((item) => (
              <li key={item.id}>
                <RecommendedSidebarEventCard item={item} />
              </li>
            ))}
          </ul>
        )}

        <Link
          to="/events"
          className="shrink-0 rounded-xl border border-border bg-card py-3 text-center text-sm font-semibold text-primary shadow-sm transition-colors hover:bg-muted/50 hover:text-primary/90"
        >
          {tEvents("viewAll")}
        </Link>
      </div>
    </aside>
  );
}
