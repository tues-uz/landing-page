import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MapPin, Calendar, Clock } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useQuery } from "@tanstack/react-query";
import { contentApi, getEventImageUrl, type EventItem } from "@/api/client";
import { contentKeys } from "@/api/queryKeys";
import { FALLBACK_EVENTS } from "@/data/fallbackContent";
import { useTranslation } from "react-i18next";

const PLACEHOLDER_IMAGE =
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1600&q=80";

const MONTH_ABBREV = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

function formatEventDate(dateStr: string): { day: string; month: string } {
  const trimmed = dateStr.trim();
  const isoMatch = trimmed.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (isoMatch) {
    const [, , monthNum, dayNum] = isoMatch;
    const monthIndex = parseInt(monthNum ?? "1", 10) - 1;
    return {
      day: dayNum ?? "",
      month: MONTH_ABBREV[monthIndex] ?? "",
    };
  }
  const parts = trimmed.split(/\s+/);
  const month = (parts[0] ?? "").toUpperCase().slice(0, 3);
  const day = parts[1] ?? "";
  return { day, month };
}

function formatEventDateDisplay(dateStr: string): string {
  const trimmed = dateStr.trim();
  if (trimmed.match(/^\d{4}-\d{2}-\d{2}/)) {
    const d = new Date(trimmed);
    if (!isNaN(d.getTime())) {
      return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" });
    }
  }
  return trimmed;
}

function EventListCard({ event }: { event: EventItem }) {
  const { day, month } = formatEventDate(event.date);
  const imageUrl = getEventImageUrl(event, PLACEHOLDER_IMAGE);

  return (
    <Link
      to={`/events/${event.id}`}
      className="group block overflow-hidden rounded-xl border border-border bg-background shadow-sm transition-all hover:shadow-md hover:border-primary/20"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
        <img
          src={imageUrl}
          alt={event.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 rounded-md bg-white px-2 py-1 text-xs font-semibold text-foreground shadow-sm">
          FREE
        </div>
        <div className="absolute right-3 top-3 flex flex-col items-end rounded-md bg-white/95 px-2 py-1.5 text-right shadow-sm">
          <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
            {month}
          </span>
          <span className="text-lg font-bold leading-none text-foreground">{day}</span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
          {event.title}
        </h3>
        <p className="mt-1.5 flex items-center gap-1.5 text-sm text-muted-foreground line-clamp-2">
          <MapPin className="h-3.5 w-3.5 shrink-0" />
          {event.location}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">{event.time}</p>
      </div>
    </Link>
  );
}

const EventDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { i18n } = useTranslation();

  const { data: eventData, isLoading } = useQuery({
    queryKey: [...contentKeys.events.list(), i18n.language],
    queryFn: () => contentApi.events.list(i18n.language),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  const events = eventData && eventData.length > 0 ? eventData : FALLBACK_EVENTS;
  const event = id ? events.find((e) => e.id === id) : null;
  const otherEvents = event ? events.filter((e) => e.id !== id).slice(0, 6) : [];

  if (!id || (!isLoading && !event)) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="below-header flex flex-col items-center justify-center py-24">
          <p className="text-muted-foreground mb-4">Event not found.</p>
          <Link to="/events" className="text-primary font-medium hover:underline">
            Back to Events
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  if (isLoading || !event) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="below-header">
          <div className="container mx-auto px-6 py-12">
            <div className="h-8 w-48 rounded bg-muted animate-pulse mb-8" />
            <div className="aspect-[21/9] rounded-xl bg-muted animate-pulse" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="below-header">
        {/* Hero */}
        <section className="relative w-full overflow-hidden">
          <div
            className="relative aspect-[21/9] min-h-[280px] w-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url('${getEventImageUrl(event, PLACEHOLDER_IMAGE)}')` }}
          >
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 lg:px-16">
              <Link
                to="/events"
                className="absolute left-6 top-6 inline-flex items-center gap-1.5 rounded-lg bg-black/40 px-3 py-2 text-sm font-medium text-white backdrop-blur-sm hover:bg-black/60"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Link>
              <h1 className="text-3xl font-bold tracking-tight text-white drop-shadow-sm md:text-4xl lg:text-5xl">
                {event.title}
              </h1>
              <p className="mt-2 flex items-center gap-1.5 text-white/90">
                <MapPin className="h-4 w-4 shrink-0" />
                {event.location}
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 pb-24 bg-background">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-12 gap-8">
              {/* Main content */}
              <div className="lg:col-span-8 space-y-8">
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-3">Description</h2>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Join us for this event at TUES. For more details and registration, please contact
                    the organizer or visit the campus events office.
                  </p>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-3">
                    How can I contact the organizer?
                  </h2>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Please visit the TUES website or contact the events office for any questions.
                  </p>
                </div>
              </div>

              {/* Date & Time card */}
              <div className="lg:col-span-4">
                <div className="rounded-xl border border-border bg-background p-6 shadow-sm sticky top-24">
                  <h2 className="text-lg font-semibold text-foreground mb-4">Date & Time</h2>
                  <div className="flex items-center gap-2 text-foreground">
                    <Calendar className="h-4 w-4 shrink-0 text-muted-foreground" />
                    <span>{formatEventDateDisplay(event.date)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-foreground mt-2">
                    <Clock className="h-4 w-4 shrink-0 text-muted-foreground" />
                    <span>{event.time}</span>
                  </div>
                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="text-sm font-medium text-foreground">{event.title}</p>
                    <p className="text-sm text-muted-foreground mt-1">{event.location}</p>
                  </div>
                  <p className="mt-4 text-xs text-muted-foreground">Free event — no registration required.</p>
                </div>
              </div>
            </div>

            {/* Other events */}
            {otherEvents.length > 0 && (
              <div className="mt-16">
                <h2 className="text-xl font-semibold text-foreground mb-6">
                  Other Events You May Like
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {otherEvents.map((e) => (
                    <EventListCard key={e.id} event={e} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default EventDetailPage;
