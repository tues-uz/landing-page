import { lazy, Suspense, useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";

// Lazy load components below the fold
const AboutStats = lazy(() => import("@/components/AboutStats"));
const NewsEvents = lazy(() => import("@/components/NewsEvents"));
const Programs = lazy(() => import("@/components/Programs"));
const VirtualTour = lazy(() => import("@/components/VirtualTour"));
const Alumni = lazy(() => import("@/components/Alumni"));
const StudentActivities = lazy(() => import("@/components/StudentActivities"));
const EduHubSection = lazy(() => import("@/components/EduHubSection"));
const Footer = lazy(() => import("@/components/Footer"));

const LoadingPlaceholder = () => (
  <div className="min-h-[400px] flex items-center justify-center">
    <div className="animate-pulse text-muted-foreground">Loading...</div>
  </div>
);

const Index = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 200);
    };

    // Check on mount
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <main>
        <Suspense fallback={<LoadingPlaceholder />}>
          <AboutStats />
        </Suspense>
        <Suspense fallback={<LoadingPlaceholder />}>
          <Programs />
        </Suspense>
        <Suspense fallback={<LoadingPlaceholder />}>
          <NewsEvents />
        </Suspense>
        <Suspense fallback={<LoadingPlaceholder />}>
          <VirtualTour />
        </Suspense>
        <Suspense fallback={<LoadingPlaceholder />}>
          <Alumni />
        </Suspense>
        <Suspense fallback={<LoadingPlaceholder />}>
          <StudentActivities />
        </Suspense>
        <Suspense fallback={<LoadingPlaceholder />}>
          <EduHubSection />
        </Suspense>
        <Suspense fallback={<LoadingPlaceholder />}>
          <Footer />
        </Suspense>
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
