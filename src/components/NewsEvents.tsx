import { useEffect, useRef } from "react";
import { Clock, MapPin, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import { contentApi, type NewsItem, type EventItem } from "@/api/client";
import { contentKeys } from "@/api/queryKeys";
import { FALLBACK_NEWS } from "@/data/fallbackContent";

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

export function EventSkeleton() {
  return (
    <div className="flex overflow-hidden rounded-xl border border-border bg-background animate-pulse">
      <div className="flex min-w-[50px] items-center justify-center rounded-lg bg-primary/20 py-2 px-3">
        <div className="h-8 w-8 rounded bg-muted" />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="h-4 w-full rounded bg-muted" />
        <div className="h-3 w-1/2 rounded bg-muted" />
      </div>
    </div>
  );
}

// ─── Article Card (exported for NewsEventsPage) ──────────────────────────────────

export function ArticleCard({
  item,
  featured = false,
  stretch = false,
}: {
  item: NewsItem;
  featured?: boolean;
  stretch?: boolean;
}) {
  const sizeClass = featured ? "h-full min-h-0" : stretch ? "flex-1 min-h-0" : "";
  return (
    <Link
      to={`/news/${item.slug}`}
      className={`flex flex-col overflow-hidden rounded-xl border border-border bg-background shadow-sm transition-all hover:scale-[1.01] hover:shadow-md group ${sizeClass}`}
    >
      {featured && (
        <>
          <div className="relative min-h-0 flex-1 w-full overflow-hidden p-2">
            <img
              src={item.imageUrl}
              alt={item.title}
              className="h-full w-full rounded-[8px] object-cover"
              loading="lazy"
            />
          </div>
          <div className="flex flex-1 flex-col gap-2 p-3">
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
          <div className="flex flex-1 flex-col gap-2 p-2">
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
          <div className="w-full p-2">
            <img
              src={item.imageUrl}
              alt={item.title}
              className="aspect-[334/188] w-full rounded-[8px] object-cover"
              loading="lazy"
            />
          </div>
        </>
      )}
    </Link>
  );
}

// ─── Event date formatting (day + month only, no year) ──────────────────────────

const MONTH_ABBREV = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

function formatEventDate(dateStr: string): { day: string; month: string } {
  const trimmed = String(dateStr ?? "").trim();
  if (!trimmed) return { day: "", month: "" };
  const isoMatch = trimmed.match(/(\d{4})[-/](\d{2})[-/](\d{2})/);
  if (isoMatch) {
    const monthNum = isoMatch[2];
    const dayNum = isoMatch[3];
    const monthIndex = parseInt(monthNum ?? "1", 10) - 1;
    return { day: dayNum ?? "", month: MONTH_ABBREV[Math.max(0, monthIndex)] ?? "" };
  }
  const d = new Date(trimmed);
  if (!isNaN(d.getTime())) {
    return { day: String(d.getDate()), month: MONTH_ABBREV[d.getMonth()] ?? "" };
  }
  const parts = trimmed.split(/\s+/);
  const second = parts[1] ?? "";
  if (/^\d{4}[-/]\d{2}[-/]\d{2}/.test(second)) {
    const m = second.match(/(\d{4})[-/](\d{2})[-/](\d{2})/);
    if (m) {
      const monthIndex = parseInt(m[2], 10) - 1;
      return { day: m[3] ?? "", month: MONTH_ABBREV[Math.max(0, monthIndex)] ?? "" };
    }
  }
  return { day: second, month: (parts[0] ?? "").toUpperCase().slice(0, 3) };
}

// ─── Event Card (exported for NewsEventsPage) ───────────────────────────────────

export function EventCard({ event }: { event: EventItem }) {
  const { day, month } = formatEventDate(event.date);
  return (
    <div className="group overflow-hidden rounded-xl border border-border bg-background shadow-sm transition-all hover:scale-[1.01] hover:shadow-md hover:border-primary/20 cursor-pointer p-2">
      <div className="flex">
        <div className="flex h-16 shrink-0 flex-col items-center justify-center rounded-[8px] bg-primary py-2 px-3 min-w-[96px]">
          <span className="text-xl font-bold tabular-nums leading-none text-primary-foreground">{day}</span>
          <span className="mt-1 text-[11px] font-medium uppercase tracking-wider text-primary-foreground">
            {month}
          </span>
        </div>
        <div className="flex flex-1 flex-col justify-center gap-3 p-2">
          <h4 className="font-semibold text-foreground text-base leading-tight group-hover:text-primary transition-colors line-clamp-2">
            {event.title}
          </h4>
          <div className="flex flex-col gap-1 text-xs text-muted-foreground">
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

// ─── Framer-style news card (image + date, category, title) ───────────────────

const NEWS_CARD_COLOR = "rgb(22, 13, 3)";

function NewsFramerCard({
  item,
  big = false,
}: {
  item: NewsItem;
  big?: boolean;
}) {
  return (
    <Link
      to={`/news/${item.slug}`}
      className={`group flex flex-col h-full w-full opacity-100 transition-opacity hover:opacity-90 ${
        big ? "min-h-0" : ""
      }`}
    >
      <div
        className={`rounded overflow-hidden w-full bg-muted relative ${
          big ? "flex-1 min-h-0" : "flex-shrink-0"
        }`}
        style={{
          borderRadius: 4,
          ...(big ? {} : { aspectRatio: "681/492" }),
        }}
      >
        <img
          src={item.imageUrl}
          alt={item.title}
          className="absolute inset-0 w-full h-full object-cover block"
          style={{ borderRadius: 4 }}
          loading="lazy"
        />
      </div>
      <div className="flex flex-col pt-4 pb-2 flex-shrink-0">
        <div className="flex flex-row items-center justify-start gap-2 text-left flex-wrap">
          <p className="text-sm" style={{ color: NEWS_CARD_COLOR }}>
            {item.date}
          </p>
          <span className="text-sm opacity-60" style={{ color: NEWS_CARD_COLOR }} aria-hidden>·</span>
          <p className="text-sm" style={{ color: NEWS_CARD_COLOR }}>
            {item.category}
          </p>
        </div>
        <h4
          className="mt-2 text-lg font-semibold leading-tight text-left line-clamp-1 group-hover:text-primary transition-colors"
          style={{ color: NEWS_CARD_COLOR }}
        >
          {item.title}
        </h4>
      </div>
    </Link>
  );
}

function NewsFramerCardSkeleton({ big = false }: { big?: boolean }) {
  return (
    <div className="flex flex-col h-full animate-pulse">
      <div className="w-full rounded bg-muted" style={{ borderRadius: 4, aspectRatio: big ? "1182/605" : "681/492" }} />
      <div className="pt-4 space-y-2">
        <div className="h-3 w-20 mx-auto rounded bg-muted" />
        <div className="h-3 w-16 mx-auto rounded bg-muted" />
        <div className="h-4 w-full rounded bg-muted mt-2" />
      </div>
    </div>
  );
}

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

  const newsItems = newsData && newsData.length > 0 ? newsData : FALLBACK_NEWS;
  const featured = newsItems[0];
  const smallCards = newsItems.slice(1, 5);
  const newsGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = newsGridRef.current;
    if (!grid) return;

    const cards = grid.querySelectorAll<HTMLElement>(".news-grid-card");
    gsap.set(cards, { opacity: 0 });

    const st = ScrollTrigger.create({
      trigger: grid,
      start: "top 82%",
      onEnter: () => {
        gsap.to(cards, {
          opacity: 1,
          duration: 0.5,
          stagger: 0.09,
          ease: "power2.out",
          overwrite: true,
        });
      },
    });

    return () => {
      st.kill();
      gsap.set(cards, { clearProps: "opacity" });
    };
  }, [newsLoading]);

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-white" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1348px] relative z-10">
        {/* Section title — centered */}
        <h2 className="text-center text-3xl md:text-4xl font-bold mb-2" style={{ color: NEWS_CARD_COLOR }}>
          News &amp; Announcements
        </h2>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-10 md:mb-12" style={{ fontSize: '16px' }}>
          Stay up to date with the latest from TUES—research, campus updates, and stories.
        </p>

        {/* Card list: 1 big + 4 small (Framer layout) */}
        <div
          ref={newsGridRef}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-fr"
        >
          {/* Big card — 50% width (2 cols), spans 2 rows on md+ */}
          <div className="news-grid-card md:col-span-2 md:row-span-2 flex flex-col min-h-[280px] md:min-h-0">
            {newsLoading ? (
              <NewsFramerCardSkeleton big />
            ) : featured ? (
              <NewsFramerCard item={featured} big />
            ) : (
              <div className="flex items-center justify-center rounded border border-dashed border-border text-muted-foreground text-sm min-h-[200px]">
                No articles yet.
              </div>
            )}
          </div>

          {/* 4 small cards in 2x2 */}
          {newsLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="news-grid-card min-h-[200px]">
                  <NewsFramerCardSkeleton />
                </div>
              ))
            : smallCards.map((item) => (
                <div key={item.id} className="news-grid-card min-h-[200px] md:min-h-0 flex flex-col">
                  <NewsFramerCard item={item} />
                </div>
              ))}
        </div>

        {/* View All News — bordered pill */}
        <div className="flex justify-center mt-10 md:mt-12">
          <Link
            to="/news"
            className="inline-flex items-center justify-center rounded-full border px-6 py-3 text-sm font-medium transition-colors hover:bg-foreground/5"
            style={{ borderColor: NEWS_CARD_COLOR, color: NEWS_CARD_COLOR }}
          >
            View All News
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewsEvents;
