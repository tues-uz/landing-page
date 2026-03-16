import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, Globe, Zap, BookOpen, GraduationCap } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getProgramBySlug } from "@/components/Programs";

type ProgramWithOptional = ReturnType<typeof getProgramBySlug> extends infer P
  ? P & {
      duration?: string;
      degreeType?: string;
      studyFormat?: string;
      languages?: string;
      pace?: string;
      applicationDeadline?: string;
      startDate?: string;
      tuition?: string;
      careerOutcomes?: string;
      introduction?: string;
    }
  : never;

const DEFAULT_DURATION = "2–4 years (varies by program)";
const DEFAULT_DEGREE_TYPE = "Bachelor, Master, Certificate";
const DEFAULT_STUDY_FORMAT = "On campus, Blended, Online";
const DEFAULT_LANGUAGES = "English";
const DEFAULT_PACE = "Full time, Part time";
const REQUEST_INFO = "Request info";

/** Unsplash hero images by program slug — theme-related */
const HERO_IMAGES: Record<string, string> = {
  economics: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=2070&q=80",
  "business-administration": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2070&q=80",
  "finance-accounting": "https://images.unsplash.com/photo-1554224154-22dec7ec8818?auto=format&fit=crop&w=2070&q=80",
  "international-economics": "https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?auto=format&fit=crop&w=2070&q=80",
  "marketing-commerce": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=2070&q=80",
  entrepreneurship: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=2070&q=80",
  "data-analytics": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=2070&q=80",
  "banking-finance": "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=2070&q=80",
  "hospitality-tourism": "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=2070&q=80",
  "supply-chain-logistics": "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=2070&q=80",
  "public-administration": "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=2070&q=80",
  "insurance-risk": "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=2070&q=80",
  "real-estate": "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=2070&q=80",
  "human-resources": "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=2070&q=80",
  "international-business": "https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?auto=format&fit=crop&w=2070&q=80",
  fintech: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=2070&q=80",
  "strategic-management": "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=2070&q=80",
  "project-management": "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=2070&q=80",
  "business-law": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=2070&q=80",
  "sustainability-business": "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?auto=format&fit=crop&w=2070&q=80",
  "cybersecurity-business": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=2070&q=80",
  "economic-policy": "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=2070&q=80",
  "health-economics": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=2070&q=80",
};
const DEFAULT_HERO_IMAGE =
  "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=2070&q=80";

const ABOUT_SCHOOL =
  "TUES is a leading institution in economics and business education. We combine academic excellence with practical skills, preparing students for leadership roles in industry, government, and the nonprofit sector. Our faculty are experts in their fields, and our campus fosters a supportive, inclusive community.";

const ProgramDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const program = (slug ? getProgramBySlug(slug) : null) as ProgramWithOptional | null;

  if (!program) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="below-header container mx-auto px-6 py-24 text-center">
          <h1 className="text-2xl font-semibold text-foreground mb-4">Program not found</h1>
          <Link
            to="/programs"
            className="inline-flex items-center gap-2 text-primary hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to All Programs
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const longDescription =
    "longDescription" in program ? (program as { longDescription: string }).longDescription : "";
  const highlights = "highlights" in program ? program.highlights : [];
  const duration = program?.duration ?? DEFAULT_DURATION;
  const degreeType = program?.degreeType ?? DEFAULT_DEGREE_TYPE;
  const studyFormat = program?.studyFormat ?? DEFAULT_STUDY_FORMAT;
  const languages = program?.languages ?? DEFAULT_LANGUAGES;
  const pace = program?.pace ?? DEFAULT_PACE;
  const applicationDeadline = program?.applicationDeadline ?? REQUEST_INFO;
  const startDate = program?.startDate ?? REQUEST_INFO;
  const tuition = program?.tuition ?? REQUEST_INFO;
  const careerOutcomes =
    program?.careerOutcomes ??
    `Graduates of our ${program.title} programs pursue careers across industry, government, and academia. Typical roles include analysts, managers, consultants, and leadership positions.`;
  const introduction =
    program?.introduction ??
    `${longDescription} Our programs combine rigorous theory with real-world application, supported by experienced faculty and strong industry connections.`;

  const keyFacts = [
    { label: "Degree type", value: degreeType, icon: GraduationCap },
    { label: "Duration", value: duration, icon: Clock },
    { label: "Languages", value: languages, icon: Globe },
    { label: "Pace", value: pace, icon: Zap },
    { label: "Study format", value: studyFormat, icon: BookOpen },
    { label: "Application deadline", value: applicationDeadline, icon: Calendar },
    { label: "Earliest start date", value: startDate, icon: Calendar },
    { label: "Tuition fees", value: tuition, icon: GraduationCap },
  ];

  const heroImage = HERO_IMAGES[program.slug] ?? DEFAULT_HERO_IMAGE;

  return (
    <div className="min-h-screen">
      <Header />
      <main className="below-header">
        {/* Hero with image */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src={heroImage}
              alt=""
              className="w-full h-full object-cover min-h-[640px] md:min-h-[800px]"
            />
            <div className="absolute inset-0 bg-foreground/60" />
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1348px] relative z-10 pt-24 pb-32 md:pt-32 md:pb-48" />
        </section>

        {/* Content — modern single-column with sidebar */}
        <section className="py-12 md:py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1348px]">
            <div className="lg:flex lg:gap-16 lg:items-start">
              {/* Main column */}
              <div className="lg:flex-1 min-w-0">
                {/* Program title block */}
                <div className="mb-12 md:mb-16">
                  <span className="text-muted-foreground font-medium text-sm tracking-wider uppercase">
                    {program.count}
                  </span>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mt-1 mb-1">
                    {program.title}
                  </h1>
                  <p className="text-muted-foreground text-base">TUES · On campus & online</p>
                </div>

                {/* About */}
                <div className="mb-12 md:mb-16">
                  <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-3">About</h2>
                  <p className="text-foreground/90 leading-relaxed text-lg">{longDescription}</p>
                </div>

                {/* Introduction */}
                <div className="mb-12 md:mb-16">
                  <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-3">Introduction</h2>
                  <p className="text-foreground/90 leading-relaxed max-w-2xl">
                    {introduction}
                  </p>
                </div>

                {/* Career outcomes */}
                <div className="mb-12 md:mb-16">
                  <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-3">Career outcomes</h2>
                  <p className="text-foreground/90 leading-relaxed">{careerOutcomes}</p>
                </div>

                {/* Key areas */}
                {highlights.length > 0 && (
                  <div className="mb-12 md:mb-16">
                    <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-4">Key areas</h2>
                    <ul className="grid sm:grid-cols-2 gap-2">
                      {highlights.map((item) => (
                        <li key={item} className="flex items-center gap-2.5 text-foreground/80">
                          <span className="w-1 h-1 rounded-full bg-muted-foreground shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* About the school */}
                <div className="mb-12 md:mb-16 pl-4 border-l-2 border-border">
                  <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-3">About the school</h2>
                  <p className="text-foreground/80 leading-relaxed">{ABOUT_SCHOOL}</p>
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap gap-3">
                  <Link
                    to="/programs"
                    className="inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium h-11 px-5 border border-border bg-background hover:bg-muted/50 transition-colors text-foreground"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Programs
                  </Link>
                  <a
                    href="#"
                    className="inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium h-11 px-5 bg-oxford-blue hover:bg-oxford-blue/90 text-white transition-colors"
                  >
                    Apply or inquire
                  </a>
                </div>
              </div>

              {/* Sidebar — key facts */}
              <aside className="lg:w-80 shrink-0 mt-10 lg:mt-0 lg:sticky lg:top-24">
                <div className="rounded-2xl bg-card border border-border p-6">
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4">At a glance</h3>
                  <dl className="space-y-4">
                    {keyFacts.map(({ label, value, icon: FactIcon }) => (
                      <div key={label} className="flex gap-3">
                        <FactIcon className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                        <div className="min-w-0">
                          <dt className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</dt>
                          <dd className="text-sm font-medium text-foreground mt-0.5 break-words">{value}</dd>
                        </div>
                      </div>
                    ))}
                  </dl>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ProgramDetailPage;
