import { ArrowRight, TrendingUp, Building2, Calculator, Globe, Briefcase, Users, BarChart3, DollarSign, ShoppingCart, PieChart, Wallet } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

export const programs = [
  {
    id: 1,
    slug: "economics",
    icon: TrendingUp,
    title: "Economics",
    count: "25+ Programs",
    description: "Microeconomics, Macroeconomics, Economic Theory, and Policy Analysis",
    longDescription: "Our Economics programs prepare students to understand and analyze economic systems, policy, and behavior. You will study microeconomics, macroeconomics, economic theory, and policy analysis with faculty who are active researchers and advisors. Graduates pursue careers in government, central banks, international organizations, and the private sector.",
    highlights: ["Microeconomics", "Macroeconomics", "Economic Theory", "Policy Analysis", "Econometrics", "Development Economics"],
  },
  {
    id: 2,
    slug: "business-administration",
    icon: Building2,
    title: "Business Administration",
    count: "30+ Programs",
    description: "Management, Organizational Behavior, Strategic Planning, and Leadership",
    longDescription: "Business Administration at TUES combines rigorous academic training with practical skills. Students learn management, organizational behavior, strategic planning, and leadership from experienced practitioners and researchers. Our programs are designed to prepare the next generation of business leaders.",
    highlights: ["Management", "Organizational Behavior", "Strategic Planning", "Leadership", "Operations", "Human Resources"],
  },
  {
    id: 3,
    slug: "finance-accounting",
    icon: Calculator,
    title: "Finance & Accounting",
    count: "20+ Programs",
    description: "Financial Management, Investment Analysis, Auditing, and Tax Planning",
    longDescription: "Finance and Accounting programs provide a strong foundation in financial management, investment analysis, auditing, and tax planning. Students gain the analytical and technical skills required for careers in accounting firms, corporations, and financial institutions.",
    highlights: ["Financial Management", "Investment Analysis", "Auditing", "Tax Planning", "Corporate Finance", "Financial Reporting"],
  },
  {
    id: 4,
    slug: "international-economics",
    icon: Globe,
    title: "International Economics",
    count: "15+ Programs",
    description: "Global Trade, International Finance, Economic Development, and Policy",
    longDescription: "International Economics focuses on global trade, international finance, economic development, and policy. Students explore how economies interact across borders and how policies shape global outcomes. Ideal for careers in international organizations, trade, and development.",
    highlights: ["Global Trade", "International Finance", "Economic Development", "Policy", "Exchange Rates", "Trade Agreements"],
  },
  {
    id: 5,
    slug: "marketing-commerce",
    icon: ShoppingCart,
    title: "Marketing & Commerce",
    count: "18+ Programs",
    description: "Digital Marketing, Consumer Behavior, E-commerce, and Brand Management",
    longDescription: "Marketing and Commerce programs cover digital marketing, consumer behavior, e-commerce, and brand management. Students learn to design and implement strategies that connect products and services with customers in a dynamic marketplace.",
    highlights: ["Digital Marketing", "Consumer Behavior", "E-commerce", "Brand Management", "Market Research", "Advertising"],
  },
  {
    id: 6,
    slug: "entrepreneurship",
    icon: Briefcase,
    title: "Entrepreneurship",
    count: "12+ Programs",
    description: "Startup Management, Innovation, Business Planning, and Venture Capital",
    longDescription: "Entrepreneurship programs equip students with the skills to launch and grow ventures. Topics include startup management, innovation, business planning, and venture capital. Students work on real projects and connect with mentors and investors.",
    highlights: ["Startup Management", "Innovation", "Business Planning", "Venture Capital", "Pitching", "Growth Strategy"],
  },
  {
    id: 7,
    slug: "data-analytics",
    icon: BarChart3,
    title: "Data Analytics",
    count: "22+ Programs",
    description: "Business Intelligence, Statistical Analysis, Data Mining, and Forecasting",
    longDescription: "Data Analytics programs focus on business intelligence, statistical analysis, data mining, and forecasting. Students learn to turn data into decisions using modern tools and methods. Graduates are in high demand across industries.",
    highlights: ["Business Intelligence", "Statistical Analysis", "Data Mining", "Forecasting", "Visualization", "Machine Learning"],
  },
  {
    id: 8,
    slug: "banking-finance",
    icon: DollarSign,
    title: "Banking & Finance",
    count: "16+ Programs",
    description: "Banking Operations, Risk Management, Financial Markets, and Investment Banking",
    longDescription: "Banking and Finance programs cover banking operations, risk management, financial markets, and investment banking. Students gain a deep understanding of how financial institutions and markets work, preparing for careers in banking and asset management.",
    highlights: ["Banking Operations", "Risk Management", "Financial Markets", "Investment Banking", "Regulation", "Portfolio Management"],
  },
];

export const getProgramBySlug = (slug: string) => programs.find((p) => p.slug === slug);

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
    <section ref={sectionRef} className="py-24 bg-neutral-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-neutral-300/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-neutral-300/15 rounded-full blur-2xl pointer-events-none" />

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
          <h2 className="text-4xl lg:text-5xl font-serif font-semibold text-foreground mt-3 mb-4">
            Explore Our Programs
          </h2>
          <p className="text-muted-foreground text-lg">
            Discover world-renowned programs across disciplines, taught by leading
            academics and researchers.
          </p>
        </div>

        {/* Program blocks - divided layout (reference style) */}
        <div className="relative z-10 mb-12 rounded-xl">
          <div className="relative mx-auto max-w-[1264px] overflow-hidden">
            <div className="justify-center py-12 sm:grid sm:grid-cols-2 lg:grid-cols-3 lg:py-0">
              {programs.slice(0, 6).map((program, index) => (
                  <div
                    key={program.id}
                    className={`relative px-5 py-5 md:px-8 md:py-8 ${
                      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    }`}
                    style={{ transitionDelay: `${200 + index * 80}ms`, transition: "opacity 0.5s ease, transform 0.5s ease" }}
                  >
                    {index % 3 !== 0 && (
                      <div
                        role="presentation"
                        className="absolute inset-y-0 left-0 hidden h-full w-px border-l border-dashed border-neutral-300 md:block"
                      />
                    )}
                    {index >= 3 && (
                      <div
                        role="presentation"
                        className="absolute top-0 left-0 right-0 h-px border-t border-dashed border-neutral-300"
                      />
                    )}
                    <div className="mb-6 max-w-[400px] flex flex-col gap-1">
                      <h3 className="font-sans text-xl font-semibold text-foreground">
                        {program.title}
                      </h3>
                      <span className="text-muted-foreground font-sans text-base font-normal">
                        {program.description}
                      </span>
                      <span className="text-oxford-gold text-sm font-medium">
                        {program.count}
                      </span>
                    </div>
                    <div className="flex">
                      <Link
                        to={`/programs/${program.slug}`}
                        className="inline-flex h-10 shrink-0 cursor-pointer select-none items-center justify-center gap-1 rounded-xl border border-neutral-300 bg-transparent px-4 text-sm font-medium text-foreground transition-colors hover:border-neutral-400 hover:bg-neutral-200/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-100"
                      >
                        <span className="whitespace-nowrap">Explore</span>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            to="/programs"
            className="inline-flex h-11 shrink-0 cursor-pointer select-none items-center justify-center gap-2 rounded-xl border border-oxford-blue bg-oxford-blue px-8 text-sm font-medium text-white transition-colors hover:bg-oxford-blue/90 hover:border-oxford-blue/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oxford-blue focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-50"
          >
            <span className="whitespace-nowrap">View All Programs</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Programs;
