import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { VIDEO_GALLERY_ITEMS } from "@/config/videoGalleryData";
import { NEUTRAL_BORDER } from "@/lib/uiBorders";
import { cn } from "@/lib/utils";

const items = VIDEO_GALLERY_ITEMS;

function youtubeThumbnail(youtubeId: string) {
  return `https://i.ytimg.com/vi/${youtubeId}/hq720.jpg`;
}

export function VideoGalleryCards() {
  const { t } = useTranslation("topNav");
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
  const activeTitle = active ? t(`videoGallery.${active.titleKey}.title`) : "";
  const channelName = t("videoGallery.channelName");
  const videoLabel = t("videoGallery.videoLabel");
  const watchLabel = t("videoGallery.watchVideo");

  return (
    <>
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, index) => {
          const title = t(`videoGallery.${item.titleKey}.title`);
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => openAt(index)}
              className={cn(
                "group flex h-full w-full flex-col overflow-hidden rounded-xl border bg-background text-left shadow-sm outline-none transition-shadow hover:shadow-md",
                NEUTRAL_BORDER,
                "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              )}
              aria-label={title}
            >
              <div className="relative aspect-[3/2] w-full shrink-0 overflow-hidden bg-muted">
                <img
                  src={youtubeThumbnail(item.youtubeId)}
                  alt=""
                  loading={index < 6 ? "eager" : "lazy"}
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = `https://i.ytimg.com/vi/${item.youtubeId}/hqdefault.jpg`;
                  }}
                />
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white via-white/80 to-transparent"
                  aria-hidden
                />
              </div>

              <div className="relative flex flex-1 flex-col bg-background px-4 pb-4 pt-3">
                <span className="truncate text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                  {videoLabel}
                </span>
                <h3 className="mt-1.5 line-clamp-2 font-sans text-[18px] font-bold leading-snug text-foreground transition-colors group-hover:text-primary">
                  {title}
                </h3>
                <p className="mt-2 line-clamp-2 text-[14px] leading-[1.4] text-muted-foreground">{channelName}</p>
                <div className="mt-auto pt-3">
                  <span className="inline-flex w-full items-center justify-center rounded-full bg-primary px-4 py-2.5 text-xs font-bold uppercase tracking-wide text-primary-foreground transition-colors group-hover:bg-primary/90">
                    {watchLabel}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className={cn(
            "max-h-[95vh] w-[min(100vw-1rem,960px)] max-w-[calc(100vw-1rem)] gap-0 overflow-hidden border-0 bg-zinc-950 p-0 shadow-2xl sm:rounded-xl",
            "[&>button]:right-3 [&>button]:top-3 [&>button]:text-white [&>button]:opacity-90 [&>button]:hover:bg-white/10 [&>button]:hover:opacity-100",
          )}
          aria-describedby={undefined}
        >
          <DialogTitle className="sr-only">{activeTitle}</DialogTitle>
          {active ? (
            <div className="relative">
              <div className="aspect-video w-full bg-black">
                {open ? (
                  <iframe
                    key={active.youtubeId}
                    className="h-full w-full"
                    src={`https://www.youtube.com/embed/${active.youtubeId}?autoplay=1`}
                    title={activeTitle}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                ) : null}
              </div>
              <p className="border-t border-white/10 px-4 py-3 text-sm font-medium leading-snug text-white sm:px-5 sm:py-4 sm:text-base">
                {activeTitle}
              </p>
              <Button
                type="button"
                variant="secondary"
                size="icon"
                className="absolute left-2 top-1/2 z-10 h-10 w-10 -translate-y-1/2 rounded-full bg-black/60 text-white hover:bg-black/80 sm:left-3"
                onClick={(e) => {
                  e.stopPropagation();
                  goPrev();
                }}
                aria-label={t("videoGallery.previousVideo")}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="icon"
                className="absolute right-2 top-1/2 z-10 h-10 w-10 -translate-y-1/2 rounded-full bg-black/60 text-white hover:bg-black/80 sm:right-3"
                onClick={(e) => {
                  e.stopPropagation();
                  goNext();
                }}
                aria-label={t("videoGallery.nextVideo")}
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
