import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { staticPrograms } from "@/components/Programs";
import { contentApi } from "@/api/client";
import { contentKeys } from "@/api/queryKeys";

const TITLE_COLOR = "rgb(30, 30, 30)";
const BORDER_COLOR = "rgb(227, 229, 229)";
const ICON_BG = "rgb(35, 47, 58)";

const CATEGORIES = [
  "Graduate programs",
  "Undergraduate",
  "Certificate / Diploma",
  "Harbor online programs",
] as const;

const TESTIMONIALS = [
  {
    id: 1,
    quote:
      "TUES transformed my academic journey. The staff are incredibly supportive, and the campus atmosphere fosters a true sense of community. The skills I've gained have not only prepared me for my career but also given me confidence in myself. Choosing TUES was the best decision I've made. The education I received was top-notch.",
    name: "Darlene Robertson",
    designation: "Economics Student, TUES",
    avatar: "https://picsum.photos/seed/tues1/128/128",
  },
  {
    id: 2,
    quote:
      "Attending TUES was a life-changing experience. The professors go above and beyond to support students, helping us reach our fullest potential. The welcoming campus environment promotes inclusivity and a strong sense of belonging. The skills I acquired here have given me confidence and clarity in my career path. TUES was absolutely the right choice for me.",
    name: "Diana Robinson",
    designation: "Business Administration",
    avatar: "https://picsum.photos/seed/tues2/128/128",
  },
  {
    id: 3,
    quote:
      "My time at TUES has been extraordinary. The faculty here genuinely cares about each student's success and development. The campus atmosphere is warm and supportive, creating a space where I felt empowered to grow. The practical skills and knowledge I gained prepared me for the workforce and instilled a lasting self-confidence.",
    name: "Darcy Robins",
    designation: "Finance & Accounting",
    avatar: "https://picsum.photos/seed/tues3/128/128",
  },
];

const ProgramsPage = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<(typeof CATEGORIES)[number]>(CATEGORIES[0]);
  const [searchQuery, setSearchQuery] = useState("");

  const { data: programs = staticPrograms } = useQuery({
    queryKey: contentKeys.programs.list(),
    queryFn: contentApi.programs.list,
    initialData: staticPrograms,
  });
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [slideTransition, setSlideTransition] = useState(true);
  const [twoCardsVisible, setTwoCardsVisible] = useState(
    typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches
  );
  const N_T = TESTIMONIALS.length;
  const testimonialTrack = [...TESTIMONIALS, TESTIMONIALS[0]];

  useEffect(() => {
    const m = window.matchMedia("(min-width: 1024px)");
    const fn = () => setTwoCardsVisible(m.matches);
    m.addEventListener("change", fn);
    return () => m.removeEventListener("change", fn);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setTestimonialIndex((i) => (i === N_T ? i : i === N_T - 1 ? N_T : (i + 1) % (N_T + 1)));
    }, 5000);
    return () => clearInterval(t);
  }, [N_T]);

  useEffect(() => {
    if (testimonialIndex === N_T) {
      const id = setTimeout(() => {
        setSlideTransition(false);
        setTestimonialIndex(0);
        requestAnimationFrame(() => requestAnimationFrame(() => setSlideTransition(true)));
      }, 500);
      return () => clearTimeout(id);
    }
  }, [testimonialIndex, N_T]);

  const goPrev = () => {
    if (testimonialIndex === 0) {
      setSlideTransition(false);
      setTestimonialIndex(N_T);
      requestAnimationFrame(() => requestAnimationFrame(() => setSlideTransition(true)));
    } else {
      setTestimonialIndex((i) => i - 1);
    }
  };
  const goNext = () => {
    if (testimonialIndex === N_T - 1) {
      setTestimonialIndex(N_T);
    } else {
      setTestimonialIndex((i) => Math.min(i + 1, N_T));
    }
  };

  const sectionTitle =
    selectedCategory.replace(/\b\w/g, (c) => c.toUpperCase()) +
    (selectedCategory.endsWith(".") ? "" : ".");

  const filteredPrograms = programs.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.trim().toLowerCase())
  );

  return (
    <div className="min-h-screen">
      <Header />
      <main className="below-header">
        <section className="pt-0 pb-0 bg-background relative overflow-hidden">
          {/* Hero image — programs page (picsum.photos, reliable) */}
          <div className="w-full aspect-[2112/1308] max-h-[420px] md:max-h-[520px] overflow-hidden mb-12 bg-muted">
            <img
              src="https://picsum.photos/seed/tues-programs/2112/1308"
              srcSet="https://picsum.photos/seed/tues-programs/512/308 512w, https://picsum.photos/seed/tues-programs/1024/615 1024w, https://picsum.photos/seed/tues-programs/2048/1231 2048w, https://picsum.photos/seed/tues-programs/2112/1308 2112w"
              sizes="(max-width: 512px) 512px, (max-width: 1024px) 1024px, (max-width: 2048px) 2048px, 2112px"
              alt="University campus and academic programs"
              width={2112}
              height={1308}
              decoding="async"
              className="w-full h-full object-cover object-center block"
            />
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1348px] relative">
            {/* Content */}
            <div>
              {/* Title — centered */}
              <div className="text-center mb-10 md:mb-12">
                <h2
                  className="text-4xl md:text-5xl font-bold"
                  style={{ color: TITLE_COLOR }}
                >
                  {t("programs.title")}
                </h2>
                <p
                  className="mt-3 text-base md:text-lg text-foreground/80 max-w-2xl mx-auto"
                  style={{ color: TITLE_COLOR }}
                >
                  {t("programs.subtitle")}
                </p>
              </div>

              {/* Search (left) + Category pills — border-bottom */}
              <div
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b-[1.5px] pb-4 mb-10"
                style={{ borderColor: BORDER_COLOR }}
              >
                <div className="relative shrink-0 sm:w-64">
                  <Search
                    className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none"
                    aria-hidden
                  />
                  <input
                    type="search"
                    placeholder={t("programs.searchPlaceholder")}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    style={{ borderColor: BORDER_COLOR }}
                  />
                </div>
                <div className="flex flex-wrap gap-3">
                {CATEGORIES.map((cat) => {
                  const isSelected = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      className="px-5 py-2.5 rounded-[76px] border-[1.5px] text-sm font-medium transition-colors"
                      style={{
                        backgroundColor: isSelected ? TITLE_COLOR : "transparent",
                        color: isSelected ? "rgb(255, 255, 255)" : TITLE_COLOR,
                        borderColor: isSelected ? "transparent" : BORDER_COLOR,
                      }}
                    >
                      {cat}
                    </button>
                  );
                })}
                </div>
              </div>

              {/* Content Wrapper: section title + programs list */}
              <div>
                <div className="mb-6">
                  <h3
                    className="text-xl md:text-2xl font-semibold"
                    style={{ color: TITLE_COLOR }}
                  >
                    {sectionTitle}
                  </h3>
                </div>

                {/* Programs list — 3 columns, title left, arrow circle right */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPrograms.map((program) => (
                    <Link
                      key={program.id}
                      to={`/programs/${program.slug}`}
                      className="flex items-center justify-between w-full py-4 group transition-colors hover:bg-neutral-50/50 border-b-[1.5px] border-b-[rgb(227,229,229)] hover:border-b-[rgb(35,47,58)]"
                    >
                      <h4
                        className="text-lg md:text-xl font-bold text-foreground"
                        style={{ color: TITLE_COLOR }}
                      >
                        {program.title}
                      </h4>
                      <span
                        className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 group-hover:opacity-90"
                        style={{ backgroundColor: ICON_BG }}
                      >
                        <ArrowRight className="h-5 w-5 text-white transition-transform duration-200 ease-out group-hover:translate-x-1" />
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Testimonials — Framer-style */}
          <section
            id="testimonial"
            className="w-full mt-16 pt-16 pb-16"
            style={{ backgroundColor: "rgb(252, 252, 252)" }}
          >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1348px]">
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-semibold text-center text-foreground mb-2">
                  {t("programs.testimonialsTitleLine1")}<br />{t("programs.testimonialsTitleLine2")}
                </h2>
                <p className="text-center text-muted-foreground max-w-xl mx-auto">
                  {t("programs.testimonialsSubtitle")}
                </p>
              </div>
              <div className="relative overflow-hidden">
                <ul
                  className="flex flex-row gap-5 list-none m-0 p-0"
                  style={{
                    transform: twoCardsVisible
                      ? `translateX(calc(-${testimonialIndex} * (50% + 10px)))`
                      : `translateX(calc(-${testimonialIndex} * (100% + 20px)))`,
                    transition: slideTransition
                      ? "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
                      : "none",
                  }}
                >
                  {testimonialTrack.map((t, i) => (
                    <li
                      key={`${t.id}-${i}`}
                      className="flex-shrink-0 w-[calc(50%-10px)] max-lg:w-full"
                      style={{ minWidth: "min(100%, calc(50% - 10px))" }}
                    >
                      <div className="bg-[rgb(249,250,251)] rounded-[12px] p-5 h-full flex flex-col">
                        <div className="mb-4">
                          <h6 className="text-base font-semibold text-foreground leading-snug">
                            {t.quote}
                          </h6>
                        </div>
                        <div className="flex items-center gap-3 mt-auto">
                          <img
                            src={t.avatar}
                            alt=""
                            className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                          />
                          <div>
                            <p className="font-medium text-foreground text-sm">
                              {t.name}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {t.designation}
                            </p>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="flex justify-center gap-2.5 mt-6">
                  <button
                    type="button"
                    onClick={goPrev}
                    aria-label={t("common.previous")}
                    className="w-7 h-7 rounded-full bg-white border border-[rgb(227,229,229)] hover:bg-muted/50 transition-colors flex items-center justify-center"
                  >
                    <ChevronLeft className="w-4 h-4 text-foreground" />
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    aria-label={t("common.next")}
                    className="w-7 h-7 rounded-full bg-white border border-[rgb(227,229,229)] hover:bg-muted/50 transition-colors flex items-center justify-center"
                  >
                    <ChevronRight className="w-4 h-4 text-foreground" />
                  </button>
                </div>
              </div>
            </div>
          </section>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ProgramsPage;
