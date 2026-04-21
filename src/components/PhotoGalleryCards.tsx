import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PHOTO_GALLERY_ITEMS, PHOTO_GALLERY_SIZES_ATTR } from "@/config/photoGalleryData";
import { cn } from "@/lib/utils";

const PRIORITY_COUNT = 6;
const items = PHOTO_GALLERY_ITEMS;

export function PhotoGalleryCards() {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const openAt = useCallback((index: number) => {
    setActiveIndex(index);
    setOpen(true);
  }, []);

  const goPrev = useCallback(() => {
    setActiveIndex((i) => (i - 1 + items.length) % items.length);
  }, []);

  const goNext = useCallback(() => {
    setActiveIndex((i) => (i + 1) % items.length);
  }, []);

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

  const active = items[activeIndex];

  return (
    <>
      <div className="mt-8 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <Card key={item.id} className="overflow-hidden p-0 shadow-sm">
            <button
              type="button"
              onClick={() => openAt(index)}
              className={cn(
                "group block w-full text-left outline-none",
                "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              )}
              aria-label={`Open image ${index + 1} of ${items.length} in viewer`}
            >
              <div className="aspect-[4/3] bg-muted">
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
            "max-h-[95vh] w-[min(100vw-1rem,1200px)] max-w-[calc(100vw-1rem)] translate-x-[-50%] translate-y-[-50%] gap-0 border-0 bg-transparent p-2 shadow-none sm:p-4",
            "[&>button]:right-2 [&>button]:top-2 [&>button]:text-white [&>button]:opacity-90 [&>button]:ring-offset-zinc-950 [&>button]:hover:bg-white/10 [&>button]:hover:opacity-100",
          )}
          aria-describedby={undefined}
        >
          <DialogTitle className="sr-only">
            Photo {activeIndex + 1} of {items.length}
          </DialogTitle>
          {active ? (
            <div className="relative flex max-h-[90vh] items-center justify-center">
              <img
                key={active.id}
                src={active.src}
                alt=""
                className="max-h-[85vh] max-w-full rounded-md object-contain shadow-2xl"
                decoding="async"
              />
              <Button
                type="button"
                variant="secondary"
                size="icon"
                className="absolute left-0 top-1/2 z-10 h-10 w-10 -translate-y-1/2 rounded-full bg-black/50 text-white hover:bg-black/70 sm:left-2"
                onClick={(e) => {
                  e.stopPropagation();
                  goPrev();
                }}
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="icon"
                className="absolute right-0 top-1/2 z-10 h-10 w-10 -translate-y-1/2 rounded-full bg-black/50 text-white hover:bg-black/70 sm:right-2"
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
