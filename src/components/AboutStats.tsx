import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

const stats = [
  {
    value: "25,000+",
    labelKey: "about.stats.students.label",
    descriptionKey: "about.stats.students.description",
  },
  {
    value: "412",
    labelKey: "about.stats.professors.label",
    descriptionKey: "about.stats.professors.description",
  },
  {
    value: "3+",
    labelKey: "about.stats.faculties.label",
    descriptionKey: "about.stats.faculties.description",
  },
  {
    value: "27,447",
    labelKey: "about.stats.irc.label",
    descriptionKey: "about.stats.irc.description",
  },
];

const useCounter = (target: number, duration: number = 2000, isVisible: boolean) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) {
      setCount(0);
      return;
    }
    let startTime: number;
    let animationFrame: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * target));
      if (progress < 1) animationFrame = requestAnimationFrame(animate);
      else setCount(target);
    };
    animationFrame = requestAnimationFrame(animate);
    return () => animationFrame && cancelAnimationFrame(animationFrame);
  }, [target, duration, isVisible]);

  return count;
};

const AnimatedStatValue = ({
  value,
  isVisible,
}: {
  value: string;
  isVisible: boolean;
}) => {
  const hasPlus = value.includes("+");
  const numericValue = parseInt(value.replace(/[^0-9]/g, ""), 10) || 0;
  const count = useCounter(numericValue, 2000, isVisible);
  const formatNumber = (num: number) => num.toLocaleString("en-US");
  return (
    <>
      {formatNumber(count)}
      {hasPlus && "+"}
    </>
  );
};

const TICKER_IMAGES = [
  {
    src: "/images/about/ticker/auditorium-flags.png",
    alt: "Students cheering with university flags in the auditorium",
  },
  {
    src: "/images/about/ticker/traditional-dress-group.png",
    alt: "Award ceremony group photo in traditional dress",
  },
  {
    src: "/images/about/ticker/awards-ceremony.png",
    alt: "Faculty and students on stage at an awards ceremony",
  },
  {
    src: "/images/about/ticker/student-computer-lab.png",
    alt: "Student working in a computer lab",
  },
  {
    src: "/images/about/ticker/classroom-session.png",
    alt: "Instructor leading a classroom session",
  },
  {
    src: "/images/about/ticker/green-campus-banner.png",
    alt: "Students holding a Green Campus banner outside the university",
  },
] as const;

const AboutStats = () => {
  const { t } = useTranslation("home");
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "50px" }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="pt-[120px] pb-[100px] bg-white relative overflow-visible"
      id="about"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1348px]">
        {/* Intro */}
        <div className="mb-16">
          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <div className="inline-flex items-center rounded-2xl bg-[rgb(40,40,44)] px-4 py-2 mb-6">
              <h2 className="text-sm font-medium text-white">{t("about.badge")}</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              <h3 className="text-[40px] text-foreground tracking-tight leading-[120%] md:text-5xl lg:text-[56px]">
                {t("about.titleLine1")}
                <br />
                {t("about.titleLine2")}
              </h3>
              <p className="font-dm-sans text-[16px] text-[rgb(61,61,71)] leading-relaxed self-start">
                {t("about.description")}
              </p>
            </div>
          </div>
        </div>

        {/* Image ticker */}
        <div className="w-full overflow-hidden mb-16">
          <div className="flex gap-4 animate-ticker">
            {[...TICKER_IMAGES, ...TICKER_IMAGES].map((item, i) => (
              <div
                key={`${item.src}-${i}`}
                className="relative h-[280px] w-[400px] flex-shrink-0 rounded-xl overflow-hidden bg-neutral-100"
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  width={400}
                  height={280}
                  loading={i < 2 ? "eager" : "lazy"}
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          {stats.map((stat, index) => (
            <div
              key={stat.labelKey}
              className={`text-center transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: `${200 + index * 80}ms` }}
            >
              <div className="relative h-[72px] flex items-center justify-center">
                <p className="sr-only">{stat.value}</p>
                <div
                  className="font-forum text-5xl lg:text-[72px] font-bold tracking-tight text-foreground leading-none"
                  aria-hidden
                >
                  <AnimatedStatValue value={stat.value} isVisible={isVisible} />
                </div>
              </div>
              <div className="mt-4 font-dm-sans">
                <h4 className="text-lg font-semibold text-foreground">
                  {t(stat.labelKey)}
                </h4>
                <p className="text-sm text-[rgb(61,61,71)] mt-1 leading-relaxed line-clamp-2">
                  {String(t(stat.descriptionKey)).split("\n").map((line, i) => (
                    <span key={i}>
                      {i > 0 && <br />}
                      {line}
                    </span>
                  ))}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutStats;
