import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { contentApi, getEventImageUrl } from "@/api/client";
import { contentKeys } from "@/api/queryKeys";
import { FALLBACK_EVENTS } from "@/data/fallbackContent";
import type { EventItem } from "@/api/client";

const EVENTS_TITLE_COLOR = "rgb(22, 13, 3)";
const EVENTS_DATE_COLOR = "rgb(74, 73, 73)";
const PLACEHOLDER_IMAGE = "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=900&fit=crop";

function EventFramerCard({ event }: { event: EventItem }) {
  const imageUrl = getEventImageUrl(event, PLACEHOLDER_IMAGE);
  return (
    <Link
      to={`/events/${event.id}`}
      className="group flex flex-col w-full opacity-100 transition-opacity hover:opacity-90"
    >
      <div className="relative w-full overflow-hidden rounded bg-muted" style={{ borderRadius: 4, aspectRatio: "1281/1413" }}>
        <img
          src={imageUrl}
          alt={event.title}
          className="absolute inset-0 w-full h-full object-cover block"
          style={{ borderRadius: 4 }}
          loading="lazy"
        />
      </div>
      <div className="flex flex-col pt-4">
        <p className="text-sm" style={{ color: EVENTS_DATE_COLOR }}>
          {event.date}
          {event.time ? `, ${event.time}` : ""}
        </p>
        <h4
          className="mt-1 font-semibold leading-tight text-left line-clamp-2 group-hover:text-primary transition-colors"
          style={{ color: EVENTS_TITLE_COLOR }}
        >
          {event.title}
        </h4>
      </div>
    </Link>
  );
}

function EventFramerSkeleton() {
  return (
    <div className="flex flex-col animate-pulse">
      <div className="w-full rounded bg-muted" style={{ borderRadius: 4, aspectRatio: "1281/1413" }} />
      <div className="pt-4 space-y-2">
        <div className="h-3 w-24 rounded bg-muted" />
        <div className="h-4 w-full rounded bg-muted" />
      </div>
    </div>
  );
}

const NewSection = () => {
  const {
    data: eventData,
    isLoading: eventsLoading,
  } = useQuery({
    queryKey: contentKeys.events.list(),
    queryFn: contentApi.events.list,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  const eventItems = eventData && eventData.length > 0 ? eventData : FALLBACK_EVENTS;
  const displayEvents = eventItems.slice(0, 3);

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1348px] relative z-10">
        {/* Title + View All Events button (Framer style) */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold" style={{ color: EVENTS_TITLE_COLOR }}>
            Upcoming Events
            <br />
            &amp; Activities
          </h2>
          <Link
            to="/events"
            className="inline-flex items-center justify-center rounded-full border px-6 py-3 text-sm font-medium transition-colors hover:bg-foreground/5 shrink-0"
            style={{ borderColor: EVENTS_TITLE_COLOR, color: EVENTS_TITLE_COLOR }}
          >
            View All Events
          </Link>
        </div>

        {/* Event cards — 3 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {eventsLoading ? (
            Array.from({ length: 3 }).map((_, i) => <EventFramerSkeleton key={i} />)
          ) : displayEvents.length > 0 ? (
            displayEvents.map((event) => (
              <EventFramerCard key={event.id} event={event} />
            ))
          ) : (
            <p className="text-sm col-span-full text-center py-8" style={{ color: EVENTS_DATE_COLOR }}>
              No upcoming events.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewSection;
