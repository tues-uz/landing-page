import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PHOTO_GALLERY_ITEMS, PHOTO_GALLERY_SIZES_ATTR } from "@/config/photoGalleryData";
import { cn } from "@/lib/utils";

const PRIORITY_COUNT = 6;
const items = PHOTO_GALLERY_ITEMS;
const LIGHTBOX_VIEWPORT_CLASS =
  "aspect-[4/3] w-[min(calc(100vw-6rem),1600px,calc(92vh*4/3))]";
const LIGHTBOX_SIZES_ATTR = "min(1600px, calc(100vw - 6rem))";
const LIGHTBOX_LOAD_RADIUS = 2;

function markNearbyIndices(set: Set<number>, active: number, total: number, radius = LIGHTBOX_LOAD_RADIUS) {
  for (let offset = -radius; offset <= radius; offset += 1) {
    set.add((active + offset + total) % total);
  }
}

export function PhotoGalleryCards() {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loadedIndices, setLoadedIndices] = useState<Set<number>>(() => new Set());
  const openedIndexRef = useRef(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, duration: 20, dragFree: false });

  const openAt = useCallback((index: number) => {
    openedIndexRef.current = index;
    setActiveIndex(index);
    setLoadedIndices(() => {
      const next = new Set<number>();
      markNearbyIndices(next, index, items.length);
      return next;
    });
    setOpen(true);
  }, []);

  const goPrev = useCallback(() => {
    if (!emblaApi) return;
    if (emblaApi.canScrollPrev()) {
      emblaApi.scrollPrev();
      return;
    }
    emblaApi.scrollTo(items.length - 1);
  }, [emblaApi]);

  const goNext = useCallback(() => {
    if (!emblaApi) return;
    if (emblaApi.canScrollNext()) {
      emblaApi.scrollNext();
      return;
    }
    emblaApi.scrollTo(0);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      const index = emblaApi.selectedScrollSnap();
      setActiveIndex(index);
      setLoadedIndices((prev) => {
        const next = new Set(prev);
        markNearbyIndices(next, index, items.length);
        return next;
      });
    };

    emblaApi.on("select", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  useEffect(() => {
    if (!open) {
      setLoadedIndices(new Set());
      return;
    }
    if (!emblaApi) return;
    emblaApi.scrollTo(openedIndexRef.current, true);
  }, [open, emblaApi]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, goPrev, goNext]);

  return (
    <>
      <div className="mt-8 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <Card key={item.id} className="overflow-hidden rounded-2xl p-0 shadow-sm">
            <button
              type="button"
              onClick={() => openAt(index)}
              className={cn(
                "group block w-full overflow-hidden rounded-2xl text-left outline-none",
                "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              )}
              aria-label={`Open image ${index + 1} of ${items.length} in viewer`}
            >
              <div className="aspect-[4/3] overflow-hidden bg-muted">
                <img
                  src={item.src}
                  srcSet={item.srcSet}
                  sizes={PHOTO_GALLERY_SIZES_ATTR}
                  width={800}
                  height={600}
                  alt=""
                  loading={index < PRIORITY_COUNT ? "eager" : "lazy"}
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.02] group-focus-visible:scale-[1.02]"
                />
              </div>
            </button>
          </Card>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className={cn(
            "left-1/2 top-1/2 w-auto max-w-[calc(100vw-1rem)] -translate-x-1/2 -translate-y-1/2 gap-0 border-0 bg-transparent p-0 shadow-none",
            "grid place-items-center",
            "[&>button]:right-2 [&>button]:top-2 [&>button]:text-white [&>button]:opacity-90 [&>button]:ring-offset-zinc-950 [&>button]:hover:bg-white/10 [&>button]:hover:opacity-100",
          )}
          aria-describedby={undefined}
        >
          <DialogTitle className="sr-only">
            Photo {activeIndex + 1} of {items.length}
          </DialogTitle>
          {open ? (
            <div className="flex items-center gap-2 sm:gap-3">
              <Button
                type="button"
                variant="secondary"
                size="icon"
                className="h-10 w-10 shrink-0 rounded-full bg-black/50 text-white hover:bg-black/70"
                onClick={(e) => {
                  e.stopPropagation();
                  goPrev();
                }}
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <div
                className={cn(
                  "relative isolate overflow-hidden rounded-2xl bg-muted shadow-2xl",
                  LIGHTBOX_VIEWPORT_CLASS,
                )}
              >
                <div ref={emblaRef} className="h-full overflow-hidden">
                  <div className="flex h-full touch-pan-y will-change-transform">
                    {items.map((item, index) => (
                      <div
                        key={item.id}
                        className="relative h-full min-w-0 shrink-0 grow-0 basis-full select-none"
                      >
                        {loadedIndices.has(index) ? (
                          <img
                            src={item.src}
                            srcSet={item.srcSet}
                            sizes={LIGHTBOX_SIZES_ATTR}
                            alt=""
                            width={800}
                            height={600}
                            draggable={false}
                            className="h-full w-full object-cover"
                            decoding="async"
                          />
                        ) : null}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <Button
                type="button"
                variant="secondary"
                size="icon"
                className="h-10 w-10 shrink-0 rounded-full bg-black/50 text-white hover:bg-black/70"
                onClick={(e) => {
                  e.stopPropagation();
                  goNext();
                }}
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
}
