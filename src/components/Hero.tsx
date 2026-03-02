import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";

const slides = [
  {
    id: 1,
    title: "Fully Funded Graduate Studentship For 2025-2026",
    subtitle: "Applications now open for exceptional candidates",
    year: "2025",
  },
  {
    id: 2,
    title: "World-Leading Research in Climate Science",
    subtitle: "The Termez University of Economics and Service researchers at the forefront of sustainability",
    year: "2025",
  },
  {
    id: 3,
    title: "New Collaborative Research Center Opens",
    subtitle: "State-of-the-art facilities for interdisciplinary studies",
    year: "2025",
  },
];


const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isCardVisible, setIsCardVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative mt-[178px] h-[calc(100dvh-178px)] min-h-[calc(100dvh-178px)] overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ willChange: 'auto' }}
        >
          <source src="/tisu2.mp4" type="video/mp4" />
          {/* Fallback image if video doesn't load */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80')`,
            }}
          />
        </video>
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-6 h-full flex items-end pb-24 pt-6">
        {/* Announcement Card */}
        {isCardVisible && (
          <div className="max-w-xl">
            <div className="w-full">
              <div className="w-full">
                <div
                  key={currentSlide}
                  className="bg-card/80 backdrop-blur-sm p-8 rounded shadow-2xl animate-fade-in"
                  style={{ willChange: 'opacity, transform' }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 rounded-full bg-oxford-gold" />
                    <span className="text-muted-foreground text-sm uppercase tracking-wider">
                      Announcement
                    </span>
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-serif font-semibold text-foreground mb-3 leading-tight">
                    {slides[currentSlide].title}
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    {slides[currentSlide].subtitle}
                  </p>
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Controls */}
        <div className="absolute bottom-8 left-6 right-6 flex items-center justify-between flex-wrap gap-4 max-w-xl">
          {/* Slide Indicators */}
          <div className="flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentSlide
                    ? "bg-primary-foreground w-8"
                    : "bg-primary-foreground/40 hover:bg-primary-foreground/60"
                }`}
              />
            ))}
          </div>
          
          {/* Navigation Arrows */}
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="border-white/30 text-white hover:bg-white/80 hover:text-foreground bg-white/10 backdrop-blur-sm"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="border-white/30 text-white hover:bg-white/80 hover:text-foreground bg-white/10 backdrop-blur-sm"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsCardVisible(!isCardVisible)}
              className="border-white/30 text-white hover:bg-white/80 hover:text-foreground bg-white/10 backdrop-blur-sm"
              aria-label={isCardVisible ? "Hide announcement" : "Show announcement"}
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
