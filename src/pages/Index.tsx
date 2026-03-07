import { useState, useEffect, useRef } from "react";
import { ChevronUp } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AboutStats from "@/components/AboutStats";
import NewsEvents from "@/components/NewsEvents";
import Programs from "@/components/Programs";
import VirtualTour from "@/components/VirtualTour";
import Alumni from "@/components/Alumni";
import StudentActivities from "@/components/StudentActivities";
import EduHubSection from "@/components/EduHubSection";
import ResearchJournalSection from "@/components/ResearchJournalSection";
import NewSection from "@/components/NewSection";
import Footer from "@/components/Footer";

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const mainRef = useRef<HTMLElement>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 200);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // GSAP ScrollTrigger: reveal sections one by one on scroll
  useEffect(() => {
    const main = mainRef.current;
    if (!main) return;

    const sections = Array.from(main.children).filter((el): el is HTMLElement => el instanceof HTMLElement);
    const triggers: ScrollTrigger[] = [];

    sections.forEach((el) => {
      gsap.set(el, { opacity: 0, y: 48 });
      const st = ScrollTrigger.create({
        trigger: el,
        start: "top 88%",
        end: "bottom 12%",
        onEnter: () => {
          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            overwrite: true,
          });
        },
      });
      triggers.push(st);
    });

    return () => {
      triggers.forEach((t) => t.kill());
      sections.forEach((el) => gsap.set(el, { clearProps: "opacity,y" }));
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <main ref={mainRef}>
        <AboutStats />
        <Programs />
        <NewsEvents />
        <NewSection />
        <VirtualTour />
        <Alumni />
        <StudentActivities />
        <EduHubSection />
        <ResearchJournalSection />
        <Footer />
      </main>

      {/* Floating Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-[100] w-14 h-14 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shadow-2xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center hover:scale-110 border-2 border-white ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <ChevronUp className="h-7 w-7" />
      </button>
    </div>
  );
};

export default Index;
