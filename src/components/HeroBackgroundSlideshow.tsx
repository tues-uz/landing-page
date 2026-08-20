import { useEffect, useState } from "react";

export const HERO_BACKGROUND_FALLBACK =
  "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=2072&q=80";

type HeroBackgroundSlideshowProps = {
  images: string[];
  fallback?: string;
  /** Auto-advance interval; independent from text slide carousel. */
  intervalMs?: number;
  className?: string;
};

/** Full-bleed crossfade slideshow for hero background images. */
export function HeroBackgroundSlideshow({
  images,
  fallback = HERO_BACKGROUND_FALLBACK,
  intervalMs = 6000,
  className = "absolute inset-0 overflow-hidden",
}: HeroBackgroundSlideshowProps) {
  const slides = images.filter((src) => src && src.trim().length > 0);
  const effective = slides.length > 0 ? slides : [fallback];
  const [index, setIndex] = useState(0);

  // Preload all slideshow images into browser memory to eliminate flash
  useEffect(() => {
    effective.forEach((src) => {
      if (typeof window !== "undefined" && src) {
        const img = new window.Image();
        img.src = src;
      }
    });
  }, [effective.join("|")]);

  useEffect(() => {
    setIndex(0);
  }, [effective.join("|")]);

  useEffect(() => {
    if (effective.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % effective.length);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [effective.length, intervalMs]);

  return (
    <div className={className} aria-hidden>
      {effective.map((src, i) => (
        <div
          key={`${src}-${i}`}
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out ${
            i === index ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
          }`}
          style={{
            backgroundImage: `url('${src}')`,
            willChange: "opacity",
          }}
        />
      ))}
    </div>
  );
}
