import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";

gsap.registerPlugin(ScrollTrigger);

const campusLifeCards = [
  { tagKey: "campus.tags.sports", image: "/images/student-life/sports.png", titleKey: "campus.tags.sports" },
  { tagKey: "campus.tags.libraries", image: "/images/student-life/libraries.png", titleKey: "campus.tags.libraries" },
  { tagKey: "campus.tags.careerSeminars", image: "/images/student-life/career-seminars.png", titleKey: "campus.tags.careerSeminars" },
  { tagKey: "campus.tags.research", image: "/images/student-life/research.png", titleKey: "campus.tags.research" },
  { tagKey: "campus.tags.business", image: "/images/student-life/business-enterprise.png", titleKey: "campus.tags.business" },
];

const StudentActivities = () => {
  const { t } = useTranslation("home");
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const cards = grid.querySelectorAll<HTMLElement>(".activity-card");
    gsap.set(cards, { opacity: 0 });

    const st = ScrollTrigger.create({
      trigger: grid,
      start: "top 82%",
      onEnter: () => {
        gsap.to(cards, {
          opacity: 1,
          duration: 0.5,
          stagger: 0.09,
          ease: "power2.out",
          overwrite: true,
        });
      },
    });

    return () => {
      st.kill();
      gsap.set(cards, { clearProps: "opacity" });
    };
  }, []);

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1320px]">
        {/* Section Title - centered */}
        <div className="flex justify-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[rgb(18,22,26)] tracking-tight">
            {t("campus.title")}
          </h2>
        </div>

        {/* Campus Life Cards - Framer-style grid: row1 = 2 small + 1 big, row2 = 2 small */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-fr"
        >
          {/* Row 1 - small */}
          <div className="activity-card group relative overflow-hidden rounded-2xl aspect-[4/3] md:aspect-auto md:min-h-[280px]">
            <img
              src={campusLifeCards[0].image}
              alt={t(campusLifeCards[0].titleKey)}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute top-3 left-3 bg-[rgb(207,16,45)] text-white text-sm font-medium rounded-full px-2.5 py-1">
              {t(campusLifeCards[0].tagKey)}
            </span>
          </div>
          <div className="activity-card group relative overflow-hidden rounded-2xl aspect-[4/3] md:aspect-auto md:min-h-[280px]">
            <img
              src={campusLifeCards[1].image}
              alt={t(campusLifeCards[1].titleKey)}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute top-3 left-3 bg-[rgb(207,16,45)] text-white text-sm font-medium rounded-full px-2.5 py-1">
              {t(campusLifeCards[1].tagKey)}
            </span>
          </div>
          {/* Big card - spans 2 rows on md+ */}
          <div className="activity-card group relative overflow-hidden rounded-2xl md:row-span-2 aspect-[4/3] md:aspect-auto md:min-h-0">
            <img
              src={campusLifeCards[2].image}
              alt={t(campusLifeCards[2].titleKey)}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute top-3 left-3 bg-[rgb(207,16,45)] text-white text-sm font-medium rounded-full px-2.5 py-1">
              {t(campusLifeCards[2].tagKey)}
            </span>
          </div>
          {/* Row 2 - small */}
          <div className="activity-card group relative overflow-hidden rounded-2xl aspect-[4/3] md:aspect-auto md:min-h-[280px]">
            <img
              src={campusLifeCards[3].image}
              alt={t(campusLifeCards[3].titleKey)}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute top-3 left-3 bg-[rgb(207,16,45)] text-white text-sm font-medium rounded-full px-2.5 py-1">
              {t(campusLifeCards[3].tagKey)}
            </span>
          </div>
          <div className="activity-card group relative overflow-hidden rounded-2xl aspect-[4/3] md:aspect-auto md:min-h-[280px]">
            <img
              src={campusLifeCards[4].image}
              alt={t(campusLifeCards[4].titleKey)}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute top-3 left-3 bg-[rgb(207,16,45)] text-white text-sm font-medium rounded-full px-2.5 py-1">
              {t(campusLifeCards[4].tagKey)}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudentActivities;
