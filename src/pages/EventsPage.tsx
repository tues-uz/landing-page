import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useQuery } from "@tanstack/react-query";
import { contentApi, getEventImageUrl, type EventItem } from "@/api/client";
import { contentKeys } from "@/api/queryKeys";
import { FALLBACK_EVENTS } from "@/data/fallbackContent";
import { Share2, Check } from "lucide-react";

const PLACEHOLDER_IMAGE =
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=600&fit=crop";

const MONTH_ABBREV = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

function formatEventDate(dateStr: string): { day: string; month: string } {
  const trimmed = String(dateStr ?? "").trim();
  if (!trimmed) return { day: "", month: "" };
  const isoMatch = trimmed.match(/(\d{4})[-/](\d{2})[-/](\d{2})/);
  if (isoMatch) {
    const monthNum = isoMatch[2];
    const dayNum = isoMatch[3];
    const monthIndex = parseInt(monthNum ?? "1", 10) - 1;
    return {
      day: dayNum ?? "",
      month: MONTH_ABBREV[Math.max(0, monthIndex)] ?? "",
    };
  }
  const d = new Date(trimmed);
  if (!isNaN(d.getTime())) {
    return {
      day: String(d.getDate()),
      month: MONTH_ABBREV[d.getMonth()] ?? "",
    };
  }
  const parts = trimmed.split(/\s+/);
  const second = parts[1] ?? "";
  const looksLikeIso = /^\d{4}[-/]\d{2}[-/]\d{2}/.test(second);
  if (looksLikeIso) {
    const isoMatch2 = second.match(/(\d{4})[-/](\d{2})[-/](\d{2})/);
    if (isoMatch2) {
      const monthIndex = parseInt(isoMatch2[2], 10) - 1;
      return {
        day: isoMatch2[3] ?? "",
        month: MONTH_ABBREV[Math.max(0, monthIndex)] ?? "",
      };
    }
  }
  const month = (parts[0] ?? "").toUpperCase().slice(0, 3);
  const day = second;
  return { day, month };
}

function EventSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-background shadow-sm animate-pulse">
      <div className="p-4 space-y-2">
        <div className="h-4 w-3/4 rounded bg-muted" />
        <div className="h-10 w-12 rounded bg-muted" />
      </div>
      <div className="aspect-square w-full bg-muted" />
      <div className="p-4 space-y-2">
        <div className="h-3 w-1/2 rounded bg-muted" />
        <div className="h-3 w-2/3 rounded bg-muted" />
      </div>
    </div>
  );
}

function EventCard({ event }: { event: EventItem }) {
  const { day, month } = formatEventDate(event.date);
  const imageUrl = getEventImageUrl(event, PLACEHOLDER_IMAGE);
  const [copied, setCopied] = useState(false);

  const eventUrl = typeof window !== "undefined" ? `${window.location.origin}/events/${event.id}` : `/events/${event.id}`;

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: `${event.title} · ${event.time} · ${event.location}`,
        url: eventUrl,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(eventUrl).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  return (
    <Link
      to={`/events/${event.id}`}
      className="group block overflow-hidden rounded-lg bg-card shadow-sm transition-all duration-200 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
    >
      <div className="relative aspect-[1/1] w-full overflow-hidden bg-muted">
        <img
          src={imageUrl}
          alt=""
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        />
        <div className="absolute bottom-3 left-3 rounded-lg bg-black/60 px-2.5 py-1.5 backdrop-blur-sm">
          <span className="text-xs font-semibold uppercase tracking-wider text-white tabular-nums">
            {day} {month}
          </span>
        </div>
        <button
          type="button"
          onClick={handleShare}
          className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
          aria-label={copied ? "Link copied" : "Share event"}
        >
          {copied ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
        </button>
      </div>
      <div className="p-4">
        <h3 className="text-base font-semibold text-foreground line-clamp-2 leading-snug group-hover:text-primary transition-colors">
          {event.title}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          {event.time} · {event.location}
        </p>
      </div>
    </Link>
  );
}

const EventsPage = () => {
  const { data: eventData, isLoading: eventsLoading } = useQuery({
    queryKey: contentKeys.events.list(),
    queryFn: contentApi.events.list,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  const upcomingEvents = eventData && eventData.length > 0 ? eventData : FALLBACK_EVENTS;
  const pastEvents: EventItem[] = []; // No past events from API; extend later if needed

  return (
    <div className="min-h-screen">
      <Header />
      <main className="below-header bg-background">
        <section className="pt-8 pb-16 md:pt-12 md:pb-24">
          <div className="container mx-auto px-6">
            {/* Breadcrumb */}
            <nav className="text-sm text-muted-foreground mb-4">
              <Link to="/" className="hover:text-foreground">
                Main page
              </Link>
              <span className="mx-2">/</span>
              <span className="text-foreground">Events</span>
            </nav>

            {/* Large title + description */}
            <div className="relative mb-12">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground">
                Events
              </h1>
              <p className="mt-4 max-w-2xl text-muted-foreground">
                University events take place throughout the year, from educational showcases to
                public lectures, national tours and one-off exhibitions.
              </p>
            </div>

            {/* Upcoming events */}
            <h2 className="text-xl font-semibold text-foreground mb-6">Upcoming events</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {eventsLoading ? (
                Array.from({ length: 8 }).map((_, i) => <EventSkeleton key={i} />)
              ) : upcomingEvents.length > 0 ? (
                upcomingEvents.map((event) => <EventCard key={event.id} event={event} />)
              ) : (
                <p className="col-span-full text-muted-foreground py-8">
                  No upcoming events at the moment.
                </p>
              )}
            </div>

            {/* Past events */}
            <h2 className="text-xl font-semibold text-foreground mt-14 mb-6">Past events</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {pastEvents.length > 0 ? (
                pastEvents.map((event) => <EventCard key={event.id} event={event} />)
              ) : (
                <p className="col-span-full text-muted-foreground py-8">
                  No past events to display.
                </p>
              )}
            </div>

            {/* See more events */}
            <div className="mt-14 text-center">
              <Link
                to="/events"
                className="inline-flex rounded-md border border-border bg-background px-8 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                See more events
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default EventsPage;
