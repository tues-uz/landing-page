import { GraduationCap, Award, Users, Globe, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

const alumniStats = [
  { icon: GraduationCap, number: "50,000+", labelKey: "home.alumni.stats.alumniWorldwide" },
  { icon: Award, number: "120+", labelKey: "home.alumni.stats.nobel" },
  { icon: Users, number: "150+", labelKey: "home.alumni.stats.countries" },
  { icon: Globe, number: "85%", labelKey: "home.alumni.stats.careerRate" },
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
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(1);
  const [slidePercent, setSlidePercent] = useState(50);
  const sliderRef = useRef<HTMLDivElement>(null);
  const infiniteTestimonials = [testimonials[testimonials.length - 1], ...testimonials, testimonials[0]];

  useEffect(() => {
    const updateSlidePercent = () => {
      setSlidePercent(window.innerWidth < 640 ? 100 : 50);
    };
    updateSlidePercent();
    window.addEventListener("resize", updateSlidePercent);
    return () => window.removeEventListener("resize", updateSlidePercent);
  }, []);

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
            {t("home.alumni.badge")}
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground tracking-tight mb-4">
            {t("home.alumni.title")}
          </h2>
          <p className="text-foreground/70 text-base leading-relaxed">
            {t("home.alumni.description")}
          </p>
        </div>

        {/* Stats — minimal editorial */}
        <div className="mb-16 flex flex-wrap justify-center gap-x-14 gap-y-12 sm:gap-x-20 lg:gap-x-24">
          {alumniStats.map((stat) => (
            <div key={stat.labelKey} className="flex flex-col items-center text-center">
              <span className="text-3xl font-bold tabular-nums tracking-tight text-foreground sm:text-4xl">
                {stat.number}
              </span>
              <span className="mt-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {t(stat.labelKey)}
              </span>
            </div>
          ))}
        </div>

        {/* More Alumni Stories — carousel */}
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-6">
            {t("home.alumni.moreStories")}
          </h3>
          <div className="relative">
            <div className="overflow-hidden">
              <div
                ref={sliderRef}
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(calc(-${currentIndex} * ${slidePercent}%))` }}
              >
                {infiniteTestimonials.map((t, i) => (
                  <div key={`${t.id}-${i}`} className="flex-shrink-0 w-full sm:w-1/2 px-0 sm:px-2">
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
                aria-label={t("common.previous")}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                className="w-10 h-10 rounded-full border border-foreground/15 flex items-center justify-center text-foreground/70 hover:bg-foreground/5 transition-colors"
                aria-label={t("common.next")}
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
