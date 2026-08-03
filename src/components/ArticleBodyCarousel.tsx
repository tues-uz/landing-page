import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

type ArticleBodyCarouselProps = {
  images: string[];
  title: string;
  className?: string;
  /** Smaller variant for the admin editor preview */
  compact?: boolean;
};

const navButtonClass =
  "top-1/2 -translate-y-1/2 h-9 w-9 rounded-full border-0 bg-black/40 text-white hover:bg-black/60 hover:text-white";

/** Embla carousel for in-article gallery blocks (matches hero gallery on news detail). */
export function ArticleBodyCarousel({ images, title, className, compact }: ArticleBodyCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => setCurrent(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  if (images.length === 0) return null;

  const frameClass = compact
    ? "relative aspect-[16/9] max-h-48 w-full overflow-hidden rounded-lg bg-muted"
    : "relative aspect-[4/3] max-h-[420px] w-full overflow-hidden rounded-xl bg-muted";

  if (images.length === 1) {
    return (
      <div className={cn(compact ? "w-full" : "my-6 w-full", className)}>
        <div className={frameClass}>
          <img
            src={images[0]}
            alt={`${title} — gallery image 1 of 1`}
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
    );
  }

  return (
    <div className={cn(compact ? "w-full" : "my-6 w-full", className)}>
      <Carousel opts={{ loop: true, align: "start" }} setApi={setApi} className="w-full">
        <CarouselContent className="-ml-0">
          {images.map((src, index) => (
            <CarouselItem key={`${src}-${index}`} className="basis-full pl-0">
              <div className={frameClass}>
                <img
                  src={src}
                  alt={`${title} — gallery image ${index + 1} of ${images.length}`}
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className={cn("left-2", navButtonClass)} />
        <CarouselNext className={cn("right-2", navButtonClass)} />
      </Carousel>
      <div
        className={cn("flex justify-center gap-1.5", compact ? "mt-2" : "mt-3 px-5")}
        role="tablist"
        aria-label="Gallery images"
      >
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            role="tab"
            aria-selected={index === current}
            aria-label={`Go to image ${index + 1}`}
            onClick={() => api?.scrollTo(index)}
            className={cn(
              "h-1.5 rounded-full transition-all",
              index === current
                ? "w-6 bg-primary"
                : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/50",
            )}
          />
        ))}
      </div>
    </div>
  );
}
