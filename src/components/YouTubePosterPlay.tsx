import { useState } from "react";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

type YouTubePosterPlayProps = {
  videoId: string;
  playLabel: string;
  startSeconds?: number;
};

export function YouTubePosterPlay({ videoId, playLabel, startSeconds = 0 }: YouTubePosterPlayProps) {
  const [active, setActive] = useState(false);
  const posterSrc = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
  const embedSrc = `https://www.youtube-nocookie.com/embed/${videoId}?start=${startSeconds}&autoplay=1&rel=0`;

  if (active) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border bg-black shadow-sm">
        <iframe
          className="absolute inset-0 h-full w-full"
          src={embedSrc}
          title={playLabel}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
    );
  }

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border bg-muted shadow-sm">
      <img
        src={posterSrc}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        width={480}
        height={360}
        loading="lazy"
        decoding="async"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/15 to-transparent" aria-hidden />
      <button
        type="button"
        onClick={() => setActive(true)}
        aria-label={playLabel}
        className={cn(
          "group absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full",
          "bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        )}
      >
        <Play className="ml-0.5 h-8 w-8" fill="currentColor" aria-hidden />
      </button>
    </div>
  );
}
