import { ArrowRight, TrendingUp, Building2, Calculator, Globe, Briefcase, Users, BarChart3, DollarSign, ShoppingCart, PieChart, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";

const programs = [
  {
    id: 1,
    icon: TrendingUp,
    title: "Economics",
    count: "25+ Programs",
    description: "Microeconomics, Macroeconomics, Economic Theory, and Policy Analysis",
  },
  {
    id: 2,
    icon: Building2,
    title: "Business Administration",
    count: "30+ Programs",
    description: "Management, Organizational Behavior, Strategic Planning, and Leadership",
  },
  {
    id: 3,
    icon: Calculator,
    title: "Finance & Accounting",
    count: "20+ Programs",
    description: "Financial Management, Investment Analysis, Auditing, and Tax Planning",
  },
  {
    id: 4,
    icon: Globe,
    title: "International Economics",
    count: "15+ Programs",
    description: "Global Trade, International Finance, Economic Development, and Policy",
  },
  {
    id: 5,
    icon: ShoppingCart,
    title: "Marketing & Commerce",
    count: "18+ Programs",
    description: "Digital Marketing, Consumer Behavior, E-commerce, and Brand Management",
  },
  {
    id: 6,
    icon: Briefcase,
    title: "Entrepreneurship",
    count: "12+ Programs",
    description: "Startup Management, Innovation, Business Planning, and Venture Capital",
  },
  {
    id: 7,
    icon: BarChart3,
    title: "Data Analytics",
    count: "22+ Programs",
    description: "Business Intelligence, Statistical Analysis, Data Mining, and Forecasting",
  },
  {
    id: 8,
    icon: DollarSign,
    title: "Banking & Finance",
    count: "16+ Programs",
    description: "Banking Operations, Risk Management, Financial Markets, and Investment Banking",
  },
];

const Programs = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Disconnect after first trigger to prevent re-triggering
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 oxford-gradient relative overflow-hidden">
      {/* Gridline overlay */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-oxford-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-foreground/5 rounded-full blur-2xl pointer-events-none" />

      <div className="container mx-auto px-6 relative">
        {/* Section Header */}
        <div
          className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <span className="text-oxford-gold font-medium text-sm tracking-wider uppercase">
            Academic Excellence
          </span>
          <h2 className="text-4xl lg:text-5xl font-serif font-semibold text-primary-foreground mt-3 mb-4">
            Explore Our Programs
          </h2>
          <p className="text-primary-foreground/70 text-lg">
            Discover world-renowned programs across disciplines, taught by leading
            academics and researchers.
          </p>
        </div>

        {/* Program Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {programs.map((program, index) => {
            const Icon = program.icon;
            return (
              <div
                key={program.id}
                className={`group bg-white backdrop-blur-sm border border-primary-foreground/10 rounded p-6 hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-pointer ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${200 + index * 100}ms` }}
              >
                <div className="w-10 h-10 rounded bg-oxford-gold/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="h-5 w-5 text-oxford-gold" />
                </div>
                <h3 className="text-xl font-serif font-semibold text-foreground mb-1">
                  {program.title}
                </h3>
                <span className="text-oxford-gold text-sm font-medium">
                  {program.count}
                </span>
                <p className="text-foreground/70 text-sm mt-3">
                  {program.description}
                </p>
                <div className="mt-4 flex items-center text-foreground/80 text-sm group-hover:translate-x-1 transition-transform duration-300">
                  Explore
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button
            size="lg"
            className="bg-oxford-gold hover:bg-oxford-gold/90 text-foreground font-medium"
          >
            View All Programs
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Programs;
