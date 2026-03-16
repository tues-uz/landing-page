import { Link } from "react-router-dom";
import { Clock, MapPin } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useQuery } from "@tanstack/react-query";
import { contentApi, getEventImageUrl, type EventItem } from "@/api/client";
import { contentKeys } from "@/api/queryKeys";
import { FALLBACK_EVENTS } from "@/data/fallbackContent";

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

  return (
    <Link
      to={`/events/${event.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-background shadow-sm transition-all hover:shadow-md hover:border-primary/20"
    >
      <div className="p-2 flex gap-3">
        <div className="flex shrink-0 flex-col items-center justify-center rounded-[8px] bg-primary py-2 px-3 min-w-[96px]">
          <span className="text-xl font-bold tabular-nums leading-none text-primary-foreground">{day}</span>
          <span className="mt-1 text-[11px] font-medium uppercase tracking-wider text-primary-foreground">{month}</span>
        </div>
        <div className="min-w-0 flex-1 flex flex-col justify-center gap-1.5">
          <h3 className="text-sm font-bold text-foreground line-clamp-2 leading-snug group-hover:text-primary transition-colors">
            {event.title}
          </h3>
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
      <div className="relative aspect-square w-full overflow-hidden bg-muted">
        <img
          src={imageUrl}
          alt={event.title}
          className="h-full w-full object-cover"
        />
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
