import { GraduationCap, Award, Users, Globe, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const alumniStats = [
  { icon: GraduationCap, number: "50,000+", label: "Alumni Worldwide" },
  { icon: Award, number: "120+", label: "Nobel Laureates" },
  { icon: Users, number: "150+", label: "Countries Represented" },
  { icon: Globe, number: "85%", label: "Career Success Rate" },
];

const testimonials = [
  { id: 1, name: "Dr. Sarah Johnson", role: "CEO, Global Finance Corp", year: "Class of 2010", quote: "The Termez University of Economics and Service provided me with the knowledge and network that shaped my career.", image: "https://picsum.photos/seed/alumni-1/96/96" },
  { id: 2, name: "Ahmed Al-Mansoori", role: "Senior Economist, World Bank", year: "Class of 2015", quote: "The international perspective and diverse learning environment at TUES prepared me for a global career.", image: "https://picsum.photos/seed/alumni-2/96/96" },
  { id: 3, name: "Maria Rodriguez", role: "Investment Director, Tech Ventures", year: "Class of 2018", quote: "The entrepreneurial spirit and innovation focus at TUES inspired me to start my own venture.", image: "https://picsum.photos/seed/alumni-3/96/96" },
  { id: 4, name: "Dr. James Chen", role: "Chief Financial Officer, Tech Innovations", year: "Class of 2012", quote: "The rigorous curriculum and real-world applications at TUES gave me the foundation to excel in the finance industry.", image: "https://picsum.photos/seed/alumni-4/96/96" },
  { id: 5, name: "Fatima Al-Zahra", role: "Economic Policy Advisor, Government", year: "Class of 2016", quote: "TUES taught me to think critically and approach economic challenges with innovative solutions.", image: "https://picsum.photos/seed/alumni-5/96/96" },
  { id: 6, name: "Robert Thompson", role: "Managing Director, Investment Bank", year: "Class of 2013", quote: "The alumni network and career support from TUES have been instrumental in my professional growth.", image: "https://picsum.photos/seed/alumni-6/96/96" },
];

const Alumni = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const sliderRef = useRef<HTMLDivElement>(null);
  const infiniteTestimonials = [testimonials[testimonials.length - 1], ...testimonials, testimonials[0]];

  useEffect(() => {
    const timer = setInterval(() => {
      if (document.hidden) return;
      setCurrentIndex((prev) => {
        const next = prev + 1;
        if (next >= infiniteTestimonials.length - 1) {
          setTimeout(() => {
            if (sliderRef.current) {
              sliderRef.current.style.transition = "none";
              setCurrentIndex(1);
              requestAnimationFrame(() => {
                if (sliderRef.current) sliderRef.current.style.transition = "";
              });
            }
          }, 500);
          return next;
        }
        return next;
      });
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const go = (delta: number) => {
    setCurrentIndex((prev) => {
      const next = prev + delta;
      if (next >= infiniteTestimonials.length - 1) {
        setTimeout(() => {
          if (sliderRef.current) {
            sliderRef.current.style.transition = "none";
            setCurrentIndex(1);
            requestAnimationFrame(() => {
              if (sliderRef.current) sliderRef.current.style.transition = "";
            });
          }
        }, 500);
        return next;
      }
      if (next <= 0) {
        setTimeout(() => {
          if (sliderRef.current) {
            sliderRef.current.style.transition = "none";
            setCurrentIndex(infiniteTestimonials.length - 2);
            requestAnimationFrame(() => {
              if (sliderRef.current) sliderRef.current.style.transition = "";
            });
          }
        }, 500);
        return next;
      }
      return next;
    });
  };

  return (
    <section className="py-20 md:py-28 bg-[#fafafa] relative overflow-hidden" id="alumni">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1200px]">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-foreground/50 mb-3">
            Our Community
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground tracking-tight mb-4">
            Alumni Network
          </h2>
          <p className="text-foreground/70 text-lg leading-relaxed">
            Join a global network of accomplished professionals, leaders, and innovators who are making a difference around the world. Connect with fellow alumni and stay engaged with your alma mater.
          </p>
        </div>

        {/* Stats — minimal row */}
        <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 mb-16">
          {alumniStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-foreground/5 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-foreground/60" />
                </div>
                <div>
                  <p className="text-xl md:text-2xl font-semibold text-foreground tabular-nums">
                    {stat.number}
                  </p>
                  <p className="text-sm text-foreground/55">{stat.label}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* More Alumni Stories — carousel */}
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-6">
            More Alumni Stories
          </h3>
          <div className="relative">
            <div className="overflow-hidden">
              <div
                ref={sliderRef}
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(calc(-${currentIndex} * 50%))` }}
              >
                {infiniteTestimonials.map((t, i) => (
                  <div key={`${t.id}-${i}`} className="flex-shrink-0 w-1/2 px-2">
                    <div className="bg-white rounded-xl p-5 border border-black/[0.06] shadow-sm h-full">
                      <p className="text-foreground/75 text-sm leading-relaxed mb-4 line-clamp-3">
                        {t.quote}
                      </p>
                      <div className="flex items-center gap-3">
                        <img
                          src={t.image}
                          alt=""
                          className="w-10 h-10 rounded-full object-cover bg-muted"
                        />
                        <div>
                          <p className="font-medium text-foreground text-sm">{t.name}</p>
                          <p className="text-xs text-foreground/55">{t.role} · {t.year}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center gap-2 mt-6">
              <button
                type="button"
                onClick={() => go(-1)}
                className="w-10 h-10 rounded-full border border-foreground/15 flex items-center justify-center text-foreground/70 hover:bg-foreground/5 transition-colors"
                aria-label="Previous"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                className="w-10 h-10 rounded-full border border-foreground/15 flex items-center justify-center text-foreground/70 hover:bg-foreground/5 transition-colors"
                aria-label="Next"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Alumni;
