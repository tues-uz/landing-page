import { useEffect, useRef } from "react";
import { ArrowRight, TrendingUp, Building2, Calculator, Globe, Briefcase, BarChart3, DollarSign, ShoppingCart, GraduationCap, Landmark, Plane, Package, BookOpen, Target, Scale, Store, LineChart, Wallet, UtensilsCrossed, Network, FileText, Shield, Sparkles, Handshake } from "lucide-react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const programs = [
  { id: 1, slug: "economics", icon: TrendingUp, title: "Economics", count: "25+ Programs", description: "Microeconomics, Macroeconomics, Economic Theory, and Policy Analysis", longDescription: "Our Economics programs prepare students to understand and analyze economic systems, policy, and behavior.", highlights: ["Microeconomics", "Macroeconomics", "Economic Theory", "Policy Analysis", "Econometrics", "Development Economics"] },
  { id: 2, slug: "business-administration", icon: Building2, title: "Business Administration", count: "30+ Programs", description: "Management, Organizational Behavior, Strategic Planning, and Leadership", longDescription: "Business Administration at TUES combines rigorous academic training with practical skills.", highlights: ["Management", "Organizational Behavior", "Strategic Planning", "Leadership", "Operations", "Human Resources"] },
  { id: 3, slug: "finance-accounting", icon: Calculator, title: "Finance & Accounting", count: "20+ Programs", description: "Financial Management, Investment Analysis, Auditing, and Tax Planning", longDescription: "Finance and Accounting programs provide a strong foundation in financial management.", highlights: ["Financial Management", "Investment Analysis", "Auditing", "Tax Planning", "Corporate Finance", "Financial Reporting"] },
  { id: 4, slug: "international-economics", icon: Globe, title: "International Economics", count: "15+ Programs", description: "Global Trade, International Finance, Economic Development, and Policy", longDescription: "International Economics focuses on global trade, international finance, economic development.", highlights: ["Global Trade", "International Finance", "Economic Development", "Policy", "Exchange Rates", "Trade Agreements"] },
  { id: 5, slug: "marketing-commerce", icon: ShoppingCart, title: "Marketing & Commerce", count: "18+ Programs", description: "Digital Marketing, Consumer Behavior, E-commerce, and Brand Management", longDescription: "Marketing and Commerce programs cover digital marketing, consumer behavior, e-commerce.", highlights: ["Digital Marketing", "Consumer Behavior", "E-commerce", "Brand Management", "Market Research", "Advertising"] },
  { id: 6, slug: "entrepreneurship", icon: Briefcase, title: "Entrepreneurship", count: "12+ Programs", description: "Startup Management, Innovation, Business Planning, and Venture Capital", longDescription: "Entrepreneurship programs equip students with the skills to launch and grow ventures.", highlights: ["Startup Management", "Innovation", "Business Planning", "Venture Capital", "Pitching", "Growth Strategy"] },
  { id: 7, slug: "data-analytics", icon: BarChart3, title: "Data Analytics", count: "22+ Programs", description: "Business Intelligence, Statistical Analysis, Data Mining, and Forecasting", longDescription: "Data Analytics programs focus on business intelligence, statistical analysis, data mining.", highlights: ["Business Intelligence", "Statistical Analysis", "Data Mining", "Forecasting", "Visualization", "Machine Learning"] },
  { id: 8, slug: "banking-finance", icon: DollarSign, title: "Banking & Finance", count: "16+ Programs", description: "Banking Operations, Risk Management, Financial Markets, and Investment Banking", longDescription: "Banking and Finance programs cover banking operations, risk management, financial markets.", highlights: ["Banking Operations", "Risk Management", "Financial Markets", "Investment Banking", "Regulation", "Portfolio Management"] },
  { id: 9, slug: "hospitality-tourism", icon: Plane, title: "Hospitality & Tourism", count: "14+ Programs", description: "Hotel Management, Tourism Development, Event Management, and Service Excellence", longDescription: "Hospitality and Tourism programs prepare students for leadership in the service and travel industries.", highlights: ["Hotel Management", "Tourism Development", "Event Management", "Service Excellence", "Destination Marketing", "Sustainable Tourism"] },
  { id: 10, slug: "supply-chain-logistics", icon: Package, title: "Supply Chain & Logistics", count: "12+ Programs", description: "Procurement, Inventory Management, Distribution, and Global Logistics", longDescription: "Supply Chain and Logistics programs build expertise in moving goods and managing operations.", highlights: ["Procurement", "Inventory Management", "Distribution", "Global Logistics", "Operations", "Supply Strategy"] },
  { id: 11, slug: "public-administration", icon: Landmark, title: "Public Administration", count: "10+ Programs", description: "Government Policy, Public Finance, Governance, and Civic Leadership", longDescription: "Public Administration programs train leaders for government and non-profit sectors.", highlights: ["Government Policy", "Public Finance", "Governance", "Civic Leadership", "Policy Analysis", "Public Sector Management"] },
  { id: 12, slug: "insurance-risk", icon: BookOpen, title: "Insurance & Risk Management", count: "8+ Programs", description: "Actuarial Science, Underwriting, Risk Assessment, and Claims Management", longDescription: "Insurance and Risk Management programs cover actuarial science, underwriting, and risk assessment.", highlights: ["Actuarial Science", "Underwriting", "Risk Assessment", "Claims Management", "Compliance", "Enterprise Risk"] },
  { id: 13, slug: "real-estate", icon: Building2, title: "Real Estate", count: "9+ Programs", description: "Property Valuation, Real Estate Finance, Development, and Asset Management", longDescription: "Real Estate programs combine finance, law, and market analysis for property and development.", highlights: ["Property Valuation", "Real Estate Finance", "Development", "Asset Management", "Market Analysis", "Investment"] },
  { id: 14, slug: "human-resources", icon: GraduationCap, title: "Human Resources", count: "11+ Programs", description: "Talent Management, Organizational Development, Compensation, and Labor Relations", longDescription: "Human Resources programs develop specialists in talent, culture, and organizational performance.", highlights: ["Talent Management", "Organizational Development", "Compensation", "Labor Relations", "Recruitment", "Training & Development"] },
  { id: 15, slug: "taxation", icon: Calculator, title: "Taxation", count: "7+ Programs", description: "Tax Law, Corporate Tax, International Tax, and Tax Planning", longDescription: "Taxation programs prepare professionals for careers in tax advisory and compliance.", highlights: ["Tax Law", "Corporate Tax", "International Tax", "Tax Planning", "Compliance", "Tax Policy"] },
  { id: 16, slug: "retail-management", icon: Store, title: "Retail Management", count: "10+ Programs", description: "Merchandising, Store Operations, Customer Experience, and Retail Strategy", longDescription: "Retail Management programs combine commerce and operations for the retail sector.", highlights: ["Merchandising", "Store Operations", "Customer Experience", "Retail Strategy", "Inventory", "Omnichannel"] },
  { id: 17, slug: "law-commerce", icon: Scale, title: "Law & Commerce", count: "9+ Programs", description: "Commercial Law, Contract Law, Corporate Governance, and Business Ethics", longDescription: "Law and Commerce programs bridge legal expertise and business practice.", highlights: ["Commercial Law", "Contract Law", "Corporate Governance", "Business Ethics", "Compliance", "Dispute Resolution"] },
  { id: 18, slug: "investment-management", icon: LineChart, title: "Investment Management", count: "8+ Programs", description: "Portfolio Theory, Asset Allocation, Equity Research, and Wealth Management", longDescription: "Investment Management programs train professionals for asset management and advisory.", highlights: ["Portfolio Theory", "Asset Allocation", "Equity Research", "Wealth Management", "Derivatives", "Alternative Investments"] },
  { id: 19, slug: "audit-internal-control", icon: BookOpen, title: "Audit & Internal Control", count: "6+ Programs", description: "Internal Auditing, Compliance, Fraud Examination, and Control Frameworks", longDescription: "Audit and Internal Control programs build skills in assurance and governance.", highlights: ["Internal Auditing", "Compliance", "Fraud Examination", "Control Frameworks", "Risk Assurance", "Regulatory Reporting"] },
  { id: 20, slug: "food-service-management", icon: UtensilsCrossed, title: "Food & Service Management", count: "8+ Programs", description: "Restaurant Operations, Culinary Business, Food Safety, and Service Design", longDescription: "Food and Service Management programs prepare leaders for the food and beverage industry.", highlights: ["Restaurant Operations", "Culinary Business", "Food Safety", "Service Design", "Menu Engineering", "Hospitality Operations"] },
  { id: 21, slug: "fintech", icon: Wallet, title: "Fintech & Digital Finance", count: "10+ Programs", description: "Digital Banking, Payments, Blockchain, and Financial Technology Innovation", longDescription: "Fintech programs combine finance and technology for the digital economy.", highlights: ["Digital Banking", "Payments", "Blockchain", "Financial Technology", "Regtech", "Innovation"] },
  { id: 22, slug: "strategic-management", icon: Target, title: "Strategic Management", count: "11+ Programs", description: "Corporate Strategy, Competitive Analysis, Mergers & Acquisitions, and Growth", longDescription: "Strategic Management programs develop leaders who shape organizational direction.", highlights: ["Corporate Strategy", "Competitive Analysis", "M&A", "Growth Strategy", "Strategic Planning", "Change Management"] },
  { id: 23, slug: "international-business", icon: Globe, title: "International Business", count: "12+ Programs", description: "Cross-Cultural Management, Global Strategy, Export-Import, and Multinational Operations", longDescription: "International Business programs prepare leaders for global markets and cross-border operations.", highlights: ["Cross-Cultural Management", "Global Strategy", "Export-Import", "Multinational Operations", "International Marketing", "Global Sourcing"] },
  { id: 24, slug: "project-management", icon: Target, title: "Project Management", count: "9+ Programs", description: "Agile, PMP, Scrum, Resource Planning, and Delivery Excellence", longDescription: "Project Management programs build skills to lead complex projects and deliver results.", highlights: ["Agile", "PMP", "Scrum", "Resource Planning", "Delivery Excellence", "Stakeholder Management"] },
  { id: 25, slug: "business-law", icon: Scale, title: "Business Law", count: "7+ Programs", description: "Corporate Law, Commercial Contracts, Intellectual Property, and Regulatory Compliance", longDescription: "Business Law programs combine legal knowledge with business applications.", highlights: ["Corporate Law", "Commercial Contracts", "Intellectual Property", "Regulatory Compliance", "Employment Law", "Negotiation"] },
  { id: 26, slug: "cost-accounting", icon: Calculator, title: "Cost & Management Accounting", count: "8+ Programs", description: "Cost Systems, Budgeting, Performance Measurement, and Decision Support", longDescription: "Cost and Management Accounting programs focus on internal reporting and decision support.", highlights: ["Cost Systems", "Budgeting", "Performance Measurement", "Decision Support", "Variance Analysis", "Activity-Based Costing"] },
  { id: 27, slug: "sustainability-business", icon: Sparkles, title: "Sustainability & Business", count: "7+ Programs", description: "ESG, Green Business, Circular Economy, and Sustainable Strategy", longDescription: "Sustainability and Business programs prepare leaders for responsible and green business.", highlights: ["ESG", "Green Business", "Circular Economy", "Sustainable Strategy", "Carbon Accounting", "Responsible Sourcing"] },
  { id: 28, slug: "cybersecurity-business", icon: Shield, title: "Cybersecurity & Business", count: "6+ Programs", description: "Information Security, Risk Management, Compliance, and Cyber Governance", longDescription: "Cybersecurity and Business programs bridge technology security and organizational risk.", highlights: ["Information Security", "Risk Management", "Compliance", "Cyber Governance", "Incident Response", "Privacy"] },
  { id: 29, slug: "partnerships-alliances", icon: Handshake, title: "Partnerships & Strategic Alliances", count: "5+ Programs", description: "Joint Ventures, Alliances, Channel Partnerships, and Business Development", longDescription: "Partnerships and Strategic Alliances programs focus on growth through collaboration.", highlights: ["Joint Ventures", "Alliances", "Channel Partnerships", "Business Development", "Negotiation", "Alliance Management"] },
  { id: 30, slug: "economic-policy", icon: TrendingUp, title: "Economic Policy", count: "8+ Programs", description: "Fiscal Policy, Monetary Policy, Regulation, and Policy Analysis", longDescription: "Economic Policy programs train analysts and advisors for policy and regulation.", highlights: ["Fiscal Policy", "Monetary Policy", "Regulation", "Policy Analysis", "Economic Modeling", "Public Economics"] },
  { id: 31, slug: "business-research", icon: FileText, title: "Business Research", count: "6+ Programs", description: "Research Methods, Data Collection, Thesis, and Academic Writing", longDescription: "Business Research programs develop research skills for academia and industry.", highlights: ["Research Methods", "Data Collection", "Thesis", "Academic Writing", "Quantitative Methods", "Literature Review"] },
  { id: 32, slug: "network-economics", icon: Network, title: "Network & Platform Economics", count: "5+ Programs", description: "Platforms, Two-Sided Markets, Network Effects, and Digital Ecosystems", longDescription: "Network and Platform Economics programs address digital and platform business models.", highlights: ["Platforms", "Two-Sided Markets", "Network Effects", "Digital Ecosystems", "Platform Strategy", "Market Design"] },
  { id: 33, slug: "health-economics", icon: TrendingUp, title: "Health Economics", count: "6+ Programs", description: "Healthcare Markets, Health Policy, Cost-Benefit Analysis, and Outcomes Research", longDescription: "Health Economics programs apply economic tools to healthcare delivery and policy.", highlights: ["Healthcare Markets", "Health Policy", "Cost-Benefit Analysis", "Outcomes Research", "Insurance Markets", "Public Health"] },
  { id: 34, slug: "behavioral-economics", icon: BarChart3, title: "Behavioral Economics", count: "5+ Programs", description: "Decision Making, Nudge Theory, Consumer Behavior, and Experimental Economics", longDescription: "Behavioral Economics programs blend psychology and economics to understand real-world choices.", highlights: ["Decision Making", "Nudge Theory", "Consumer Behavior", "Experimental Economics", "Bounded Rationality", "Behavioral Finance"] },
  { id: 35, slug: "digital-marketing", icon: ShoppingCart, title: "Digital Marketing", count: "12+ Programs", description: "SEO, Social Media, Content Marketing, Analytics, and Conversion Optimization", longDescription: "Digital Marketing programs train specialists in online channels and data-driven campaigns.", highlights: ["SEO", "Social Media", "Content Marketing", "Analytics", "Conversion Optimization", "Paid Media"] },
  { id: 36, slug: "nonprofit-management", icon: Landmark, title: "Nonprofit & NGO Management", count: "7+ Programs", description: "Fundraising, Grant Writing, Program Evaluation, and Mission-Driven Leadership", longDescription: "Nonprofit Management programs prepare leaders for the social and NGO sector.", highlights: ["Fundraising", "Grant Writing", "Program Evaluation", "Mission-Driven Leadership", "Governance", "Impact Measurement"] },
  { id: 37, slug: "sports-business", icon: Target, title: "Sports Business & Management", count: "6+ Programs", description: "Sports Marketing, Event Management, Sponsorship, and Athletic Administration", longDescription: "Sports Business programs combine commerce and the sports industry.", highlights: ["Sports Marketing", "Event Management", "Sponsorship", "Athletic Administration", "Media Rights", "Facility Management"] },
  { id: 38, slug: "media-entertainment", icon: Globe, title: "Media & Entertainment Management", count: "8+ Programs", description: "Content Strategy, Distribution, Rights Management, and Digital Media", longDescription: "Media and Entertainment Management programs cover content, distribution, and rights.", highlights: ["Content Strategy", "Distribution", "Rights Management", "Digital Media", "Streaming", "Publishing"] },
  { id: 39, slug: "innovation-management", icon: Sparkles, title: "Innovation & R&D Management", count: "7+ Programs", description: "Product Development, R&D Strategy, Open Innovation, and Technology Commercialization", longDescription: "Innovation Management programs focus on R&D, new products, and commercialization.", highlights: ["Product Development", "R&D Strategy", "Open Innovation", "Technology Commercialization", "Design Thinking", "IP Strategy"] },
  { id: 40, slug: "quality-operations", icon: Package, title: "Quality & Operations Excellence", count: "6+ Programs", description: "Lean, Six Sigma, Process Improvement, and Operational Excellence", longDescription: "Quality and Operations Excellence programs build skills in continuous improvement.", highlights: ["Lean", "Six Sigma", "Process Improvement", "Operational Excellence", "Quality Systems", "Benchmarking"] },
  { id: 41, slug: "corporate-finance", icon: DollarSign, title: "Corporate Finance", count: "9+ Programs", description: "Capital Structure, M&A, Valuation, Treasury, and Financial Strategy", longDescription: "Corporate Finance programs train professionals in funding and strategic finance.", highlights: ["Capital Structure", "M&A", "Valuation", "Treasury", "Financial Strategy", "Dividend Policy"] },
  { id: 42, slug: "consumer-behavior", icon: ShoppingCart, title: "Consumer Behavior & Insights", count: "6+ Programs", description: "Market Research, Segmentation, Brand Loyalty, and Customer Analytics", longDescription: "Consumer Behavior programs focus on understanding and influencing buyer decisions.", highlights: ["Market Research", "Segmentation", "Brand Loyalty", "Customer Analytics", "Journey Mapping", "Behavioral Insights"] },
  { id: 43, slug: "agribusiness", icon: Building2, title: "Agribusiness & Food Economics", count: "5+ Programs", description: "Agricultural Markets, Food Supply Chains, Rural Development, and Policy", longDescription: "Agribusiness programs combine agriculture, economics, and supply chain.", highlights: ["Agricultural Markets", "Food Supply Chains", "Rural Development", "Policy", "Commodity Markets", "Sustainability"] },
  { id: 44, slug: "pharma-healthcare-management", icon: Briefcase, title: "Pharma & Healthcare Management", count: "6+ Programs", description: "Healthcare Operations, Pharma Markets, Regulatory Affairs, and Health Systems", longDescription: "Pharma and Healthcare Management programs address industry-specific leadership.", highlights: ["Healthcare Operations", "Pharma Markets", "Regulatory Affairs", "Health Systems", "Market Access", "Clinical Trials"] },
  { id: 45, slug: "education-management", icon: GraduationCap, title: "Education Management", count: "5+ Programs", description: "Higher Ed Administration, Curriculum Design, EdTech, and Institutional Strategy", longDescription: "Education Management programs prepare leaders for educational institutions.", highlights: ["Higher Ed Administration", "Curriculum Design", "EdTech", "Institutional Strategy", "Accreditation", "Student Success"] },
];

export const getProgramBySlug = (slug: string) => programs.find((p) => p.slug === slug);

const TITLE_COLOR = "rgb(30, 30, 30)";
const ICON_BG = "rgb(35, 47, 58)";

const Programs = () => {
  const bentoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = bentoRef.current;
    if (!section) return;

    const cards = section.querySelectorAll<HTMLElement>(".bento-card");
    gsap.set(cards, { opacity: 0 });

    const st = ScrollTrigger.create({
      trigger: section,
      start: "top 82%",
      onEnter: () => {
        gsap.to(cards, {
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
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
    <section className="pt-[120px] pb-[100px] bg-white relative overflow-visible">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1348px] relative z-10">
        {/* Bento image grid — university vibe (loremflickr by keyword) */}
        <div
          ref={bentoRef}
          className="bento-section grid grid-cols-2 md:grid-cols-4 grid-rows-[repeat(5,1fr)] gap-4 md:gap-6 mb-10 md:mb-12 h-[320px] sm:h-[380px] md:h-[30rem]"
        >
          <div
            className="bento-card col-start-1 row-start-1 col-span-1 md:col-span-2 row-span-5 rounded-2xl bg-center bg-cover min-h-0 bg-muted"
            style={{ backgroundImage: "url('https://loremflickr.com/1200/800/university,campus')" }}
          />
          <div
            className="bento-card col-start-3 row-start-1 row-span-2 rounded-2xl bg-center bg-cover min-h-0 bg-muted hidden md:block"
            style={{ backgroundImage: "url('https://loremflickr.com/800/600/library,study')" }}
          />
          <div
            className="bento-card col-start-3 row-start-3 row-span-3 rounded-2xl bg-center bg-cover min-h-0 bg-muted hidden md:block"
            style={{ backgroundImage: "url('https://loremflickr.com/800/600/students,university')" }}
          />
          <div
            className="bento-card col-start-4 row-start-1 row-span-3 rounded-2xl bg-center bg-cover min-h-0 bg-muted hidden md:block"
            style={{ backgroundImage: "url('https://loremflickr.com/800/600/college,building')" }}
          />
          <div
            className="bento-card col-start-4 row-start-4 row-span-2 rounded-2xl bg-center bg-cover min-h-0 bg-muted hidden md:block"
            style={{ backgroundImage: "url('https://loremflickr.com/800/600/graduation,education')" }}
          />
          {/* Mobile: show 2nd and 3rd image in right column when only 2 cols */}
          <div
            className="bento-card col-start-2 row-start-1 row-span-3 rounded-2xl bg-center bg-cover min-h-0 bg-muted md:hidden"
            style={{ backgroundImage: "url('https://loremflickr.com/800/600/library,study')" }}
          />
          <div
            className="bento-card col-start-2 row-start-4 row-span-2 rounded-2xl bg-center bg-cover min-h-0 bg-muted md:hidden"
            style={{ backgroundImage: "url('https://loremflickr.com/800/600/students,university')" }}
          />
        </div>

        {/* Title Wrapper — Framer layout: title left, secondary button right */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-6 mb-10 md:mb-12 items-center sm:items-end">
          <div className="text-center sm:text-left">
            <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: TITLE_COLOR }}>
              Browse programs by.
            </h2>
            <p className="text-base max-w-2xl sm:max-w-2xl mx-auto sm:mx-0" style={{ color: TITLE_COLOR }}>
              This user-friendly tool offers options to filter programs by field of study, degree level, and even learning formats like online or on-campus.
            </p>
          </div>
          <Link
            to="/programs"
            className="inline-flex items-center justify-center gap-2 font-medium transition-opacity hover:opacity-90 shrink-0 border border-current/10 rounded-lg px-4 py-2.5 self-center sm:self-auto sm:border-0 sm:rounded-none sm:px-0 sm:py-0"
            style={{ color: TITLE_COLOR }}
          >
            <span>Explore All</span>
            <span
              className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
              style={{ backgroundColor: ICON_BG }}
            >
              <ArrowRight className="h-4 w-4 text-white" />
          </span>
          </Link>
        </div>

        {/* Programs grid — 3 columns, 2 rows, 6 programs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {programs.slice(0, 6).map((program) => (
              <Link
                key={program.id}
                to={`/programs/${program.slug}`}
              className="flex items-center justify-between w-full py-4 px-4 group transition-colors hover:bg-neutral-50/50 rounded-none border-b border-[rgb(227,229,229)] hover:border-primary"
            >
              <h4 className="text-lg md:text-xl font-semibold text-foreground" style={{ color: TITLE_COLOR }}>
                {program.title}
              </h4>
              <span
                className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-opacity group-hover:opacity-90"
                style={{ backgroundColor: ICON_BG }}
              >
                <ArrowRight className="h-5 w-5 text-white" />
                </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Programs;
