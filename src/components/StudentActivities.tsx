import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const campusLifeCards = [
  { tag: "Sports", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop", title: "Sports" },
  { tag: "Libraries", image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop", title: "Libraries" },
  { tag: "Career Development Seminars", image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=1000&fit=crop", title: "Career Development Seminars" },
  { tag: "Research", image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop", title: "Research" },
  { tag: "Business & Enterprise", image: "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=800&h=600&fit=crop", title: "Business & Enterprise" },
];

const StudentActivities = () => {
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
            Campus life
          </h2>
        </div>

        {/* Campus Life Cards - Framer-style grid: row1 = 2 small + 1 big, row2 = 2 small */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-fr"
        >
          {/* Row 1 - small */}
          <div className="activity-card group relative overflow-hidden rounded-lg aspect-[4/3] md:aspect-auto md:min-h-[280px]">
            <img
              src={campusLifeCards[0].image}
              alt={campusLifeCards[0].title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute top-3 left-3 bg-[rgb(207,16,45)] text-white text-sm font-medium rounded px-2.5 py-1">
              {campusLifeCards[0].tag}
            </span>
          </div>
          <div className="activity-card group relative overflow-hidden rounded-lg aspect-[4/3] md:aspect-auto md:min-h-[280px]">
            <img
              src={campusLifeCards[1].image}
              alt={campusLifeCards[1].title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute top-3 left-3 bg-[rgb(207,16,45)] text-white text-sm font-medium rounded px-2.5 py-1">
              {campusLifeCards[1].tag}
            </span>
          </div>
          {/* Big card - spans 2 rows on md+ */}
          <div className="activity-card group relative overflow-hidden rounded-lg md:row-span-2 aspect-[4/3] md:aspect-auto md:min-h-0">
            <img
              src={campusLifeCards[2].image}
              alt={campusLifeCards[2].title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute top-3 left-3 bg-[rgb(207,16,45)] text-white text-sm font-medium rounded px-2.5 py-1">
              {campusLifeCards[2].tag}
            </span>
          </div>
          {/* Row 2 - small */}
          <div className="activity-card group relative overflow-hidden rounded-lg aspect-[4/3] md:aspect-auto md:min-h-[280px]">
            <img
              src={campusLifeCards[3].image}
              alt={campusLifeCards[3].title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute top-3 left-3 bg-[rgb(207,16,45)] text-white text-sm font-medium rounded px-2.5 py-1">
              {campusLifeCards[3].tag}
            </span>
          </div>
          <div className="activity-card group relative overflow-hidden rounded-lg aspect-[4/3] md:aspect-auto md:min-h-[280px]">
            <img
              src={campusLifeCards[4].image}
              alt={campusLifeCards[4].title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute top-3 left-3 bg-[rgb(207,16,45)] text-white text-sm font-medium rounded px-2.5 py-1">
              {campusLifeCards[4].tag}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudentActivities;
