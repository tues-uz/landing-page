import { useQuery } from "@tanstack/react-query";
import { contentApi } from "@/api/client";
import { contentKeys } from "@/api/queryKeys";

/** Same fallback campus image as `Hero` when CMS has no image URL. */
const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=2072&q=80";

/**
 * Compact full-width hero band for inner pages (e.g. top-nav subpages).
 * Uses the same hero background from the CMS as the home hero when available.
 */
export function SubPageHeroBanner() {
  const { data: bg } = useQuery({
    queryKey: contentKeys.heroBackground(),
    queryFn: contentApi.heroBackground.get,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  const videoUrl =
    bg == null ? null : bg.mediaType === "video" ? (bg.videoUrl ?? "/tisu2.mp4") : null;
  const imageUrl =
    bg?.mediaType === "image" ? (bg.imageUrl ?? "").trim() : (bg?.imageUrl ?? "").trim();
  const effectiveImage = imageUrl || FALLBACK_IMAGE;

  return (
    <div
      className="relative h-[min(45vh,520px)] min-h-[240px] w-full overflow-hidden sm:min-h-[300px] md:min-h-[380px] lg:min-h-[420px]"
      aria-hidden
    >
      <div className="absolute inset-0">
        {videoUrl ? (
          <video
            key={videoUrl}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
        ) : (
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url('${effectiveImage}')` }}
          />
        )}
      </div>
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40"
        aria-hidden
      />
    </div>
  );
}
