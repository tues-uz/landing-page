import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { contentApi, type HeroSlide } from "@/api/client";
import { contentKeys } from "@/api/queryKeys";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const { t, i18n } = useTranslation("hero");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isCardVisible, setIsCardVisible] = useState(true);

  // Fetch slides from API
  const { data: slidesData, isLoading: slidesLoading } = useQuery({
    queryKey: [...contentKeys.heroSlides(), i18n.language],
    queryFn: () => contentApi.heroSlides.list(i18n.language),
    staleTime: 5 * 60 * 1000, // 5 min
    retry: 1,
  });

  // Fetch background media from API
  const { data: bg } = useQuery({
    queryKey: contentKeys.heroBackground(),
    queryFn: contentApi.heroBackground.get,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  const defaultSlide: HeroSlide = {
    id: "default-tues-slide",
    title: t("title", "Termez University of Economics and Service"),
    subtitle: t("subtitle", "Empowerment, Innovation, Academic Excellence"),
    year: new Date().getFullYear().toString(),
  };

  const slides = slidesData && slidesData.length > 0 ? slidesData : [defaultSlide];

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  // Reset index if slide list shrinks
  useEffect(() => {
    setCurrentSlide((prev) => Math.min(prev, Math.max(0, slides.length - 1)));
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  const current = slides[currentSlide];

  // Determine background source:
  // • API up & returns data → use what CMS configured
  // • API down / data undefined → fall back to local video ("/tisu2.mp4")
  const videoUrl = bg == null
    ? "/tisu2.mp4"                                          // fallback: API unreachable
    : bg.mediaType === "video"
      ? (bg.videoUrl ?? "/tisu2.mp4")                       // CMS: video mode
      : null;                                               // CMS: image mode

  const imageUrl = bg?.mediaType === "image" ? (bg.imageUrl ?? "") : (bg?.imageUrl ?? "");

  return (
    <section
      className="relative overflow-hidden"
      style={{
        marginTop: "var(--header-height)",
        height: "calc(100dvh - var(--header-height))",
        minHeight: "calc(100dvh - var(--header-height))",
      }}
    >
      {/* ── Background media ──────────────────────────────────────────────── */}
      <div className="absolute inset-0 overflow-hidden">
        {videoUrl ? (
          <video
            key={videoUrl}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ willChange: "auto" }}
          >
            <source src={videoUrl} type="video/mp4" />
            {/* Fallback image if video fails */}
            {imageUrl && (
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url('${imageUrl}')` }}
              />
            )}
          </video>
        ) : (
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: imageUrl
                ? `url('${imageUrl}')`
                : "url('https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=2072&q=80')",
            }}
          />
        )}
      </div>

      {/* ── Slide content ─────────────────────────────────────────────────── */}
      <div className="relative container mx-auto px-4 lg:px-6 h-full flex items-end pb-24 pt-0">
        {isCardVisible && current && (
          <div className="w-full max-w-xl">
            <div
              key={current.id}
              className="w-full bg-card/80 backdrop-blur-sm p-8 rounded shadow-2xl animate-fade-in"
              style={{ willChange: "opacity, transform" }}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-oxford-gold" />
                <span className="text-muted-foreground text-sm uppercase tracking-wider">
                  {t("announcement")}
                </span>
              </div>
              <h2 className="text-2xl lg:text-3xl text-foreground mb-3 leading-tight">
                {current.title}
              </h2>
              <p className="text-muted-foreground mb-6">{current.subtitle}</p>
              <Button
                asChild={!!current.linkUrl}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {current.linkUrl ? (
                  <a href={current.linkUrl} target="_blank" rel="noopener noreferrer">
                    {t("learnMore")}
                  </a>
                ) : (
                  <span>{t("learnMore")}</span>
                )}
              </Button>
            </div>
          </div>
        )}

        {/* ── Navigation controls ───────────────────────────────────────── */}
        <div className="absolute bottom-8 left-6 right-6 flex items-center justify-between flex-wrap gap-4 max-w-xl">
          {/* Slide indicators */}
          <div className="flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                aria-label={t("slideAriaLabel", { number: index + 1 })}
                className={`h-2 rounded-full transition-all ${index === currentSlide
                  ? "bg-primary-foreground w-8"
                  : "bg-primary-foreground/40 hover:bg-primary-foreground/60 w-2"
                  }`}
              />
            ))}
          </div>

          {/* Arrows + toggle */}
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="rounded-full border-white/30 text-white hover:bg-white/80 hover:text-foreground bg-white/10 backdrop-blur-sm"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="rounded-full border-white/30 text-white hover:bg-white/80 hover:text-foreground bg-white/10 backdrop-blur-sm"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsCardVisible(!isCardVisible)}
              className="rounded-full border-white/30 text-white hover:bg-white/80 hover:text-foreground bg-white/10 backdrop-blur-sm"
              aria-label={isCardVisible ? t("hideAnnouncement") : t("showAnnouncement")}
            >
              {isCardVisible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
