import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  DEFAULT_KUULA_TOUR_ID,
  KUULA_VIRTUAL_TOURS,
} from "@/config/virtualTourContent";

const VirtualTour = () => {
  const { t } = useTranslation("home");
  const [activeTourId, setActiveTourId] = useState<string>(DEFAULT_KUULA_TOUR_ID);
  const [visitedTourIds, setVisitedTourIds] = useState<Set<string>>(
    () => new Set([DEFAULT_KUULA_TOUR_ID]),
  );

  const activeIndex = Math.max(
    0,
    KUULA_VIRTUAL_TOURS.findIndex((tour) => tour.id === activeTourId),
  );

  useEffect(() => {
    setVisitedTourIds((prev) => {
      if (prev.has(activeTourId)) return prev;
      const next = new Set(prev);
      next.add(activeTourId);
      return next;
    });
  }, [activeTourId]);

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1348px]">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <span className="text-oxford-gold font-medium text-sm tracking-wider uppercase">
            {t("virtualTour.kicker")}
          </span>
          <h2 className="text-4xl lg:text-5xl text-foreground mt-3 mb-6">
            {t("virtualTour.title")}
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            {t("virtualTour.description")}
          </p>
        </div>

        {/* Kuula embed */}
        <Tabs
          value={activeTourId}
          onValueChange={setActiveTourId}
          className="mb-12"
        >
          <div className="flex justify-center">
            <TabsList className="relative inline-grid h-auto auto-cols-fr grid-flow-col rounded-full p-1">
              <span
                aria-hidden
                className="pointer-events-none absolute inset-y-1 rounded-full bg-background shadow-sm transition-[left,width] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
                style={{
                  width: `calc((100% - 0.5rem) / ${KUULA_VIRTUAL_TOURS.length})`,
                  left: `calc(0.25rem + ${activeIndex} * ((100% - 0.5rem) / ${KUULA_VIRTUAL_TOURS.length}))`,
                }}
              />
              {KUULA_VIRTUAL_TOURS.map((tour) => (
                <TabsTrigger
                  key={tour.id}
                  value={tour.id}
                  className="relative z-10 rounded-full bg-transparent px-4 py-2 shadow-none transition-colors duration-300 data-[state=active]:bg-transparent data-[state=active]:shadow-none sm:px-6"
                >
                  {t(`virtualTour.tours.${tour.id}`)}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <div className="relative mt-4 aspect-[21/9] w-full overflow-hidden rounded-xl shadow-2xl bg-black">
            {KUULA_VIRTUAL_TOURS.map((tour) => (
              <div
                key={tour.id}
                aria-hidden={activeTourId !== tour.id}
                className={cn(
                  "absolute inset-0 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
                  activeTourId === tour.id
                    ? "z-10 scale-100 opacity-100"
                    : "pointer-events-none z-0 scale-[0.985] opacity-0",
                )}
              >
                {visitedTourIds.has(tour.id) ? (
                  <iframe
                    className="absolute inset-0 h-full w-full border-0"
                    src={tour.embedUrl}
                    title={t(`virtualTour.tours.${tour.id}`)}
                    allow="xr-spatial-tracking; gyroscope; accelerometer"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                  />
                ) : null}
              </div>
            ))}
          </div>
        </Tabs>
      </div>
    </section>
  );
};

export default VirtualTour;
