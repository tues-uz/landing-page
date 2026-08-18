import { useState, useEffect, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { studyProgramDetailPath } from "@/data/studyProgramsCurriculum";
import { useLocalizedStudyProgramsQuery } from "@/features/cms/hooks/useStudyProgramsQueries";

const TITLE_COLOR = "rgb(30, 30, 30)";
const BORDER_COLOR = "rgb(227, 229, 229)";
const ICON_BG = "rgb(35, 47, 58)";

type DegreeFilter = "all" | "bachelor" | "master";

function matchesDegreeFilter(degreeLevel: string, filter: DegreeFilter): boolean {
  if (filter === "all") return true;
  const level = degreeLevel.toLowerCase();
  if (filter === "bachelor") return level.includes("bachelor");
  return level.includes("master");
}

const TESTIMONIAL_IDS = [1, 2, 3] as const;

const ProgramsPage = () => {
  const { t } = useTranslation(["programs", "common"]);
  const [searchQuery, setSearchQuery] = useState("");
  const [degreeFilter, setDegreeFilter] = useState<DegreeFilter>("all");
  const [searchParams] = useSearchParams();
  const [facultyFilter, setFacultyFilter] = useState<string>(() => searchParams.get("faculty") ?? "all");
  const { data: faculties = [] } = useLocalizedStudyProgramsQuery();

  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [slideTransition, setSlideTransition] = useState(true);
  const [twoCardsVisible, setTwoCardsVisible] = useState(
    typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches,
  );
  const N_T = TESTIMONIAL_IDS.length;
  const testimonials = useMemo(
    () =>
      TESTIMONIAL_IDS.map((id) => ({
        id,
        quote: t(`testimonial${id}Quote`),
        name: t(`testimonial${id}Name`),
        designation: t(`testimonial${id}Designation`),
        avatar: `https://picsum.photos/seed/tues${id}/128/128`,
      })),
    [t],
  );
  const testimonialTrack = [...testimonials, testimonials[0]];

  const filteredFaculties = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return faculties
      .filter((faculty) => facultyFilter === "all" || faculty.id === facultyFilter)
      .map((faculty) => ({
        ...faculty,
        programs: faculty.programs.filter((program) => {
          if (!matchesDegreeFilter(program.degreeLevel, degreeFilter)) return false;
          if (!q) return true;
          return (
            program.title.toLowerCase().includes(q) ||
            program.code.toLowerCase().includes(q) ||
            program.degreeLevel.toLowerCase().includes(q) ||
            program.qualification.toLowerCase().includes(q)
          );
        }),
      }))
      .filter((faculty) => faculty.programs.length > 0);
  }, [faculties, searchQuery, degreeFilter, facultyFilter]);

  const degreeFilters: { id: DegreeFilter; labelKey: string; fallback: string }[] = [
    { id: "all", labelKey: "filterAll", fallback: "All" },
    { id: "bachelor", labelKey: "filterBachelors", fallback: "Bachelor's" },
    { id: "master", labelKey: "filterMasters", fallback: "Master's" },
  ];

  const selectedDegreeFilter = degreeFilters.find((f) => f.id === degreeFilter) ?? degreeFilters[0];
  const selectedDegreeLabel = t(selectedDegreeFilter.labelKey, selectedDegreeFilter.fallback);

  useEffect(() => {
    const m = window.matchMedia("(min-width: 1024px)");
    const fn = () => setTwoCardsVisible(m.matches);
    m.addEventListener("change", fn);
    return () => m.removeEventListener("change", fn);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTestimonialIndex((i) => (i === N_T ? i : i === N_T - 1 ? N_T : (i + 1) % (N_T + 1)));
    }, 5000);
    return () => clearInterval(timer);
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

  return (
    <div className="min-h-screen">
      <Header />
      <main className="below-header">
        <section className="pt-0 pb-0 bg-background relative overflow-hidden">
          <div className="w-full aspect-[2112/1308] max-h-[420px] md:max-h-[520px] overflow-hidden mb-12 bg-muted">
            <img
              src="https://picsum.photos/seed/tues-programs/2112/1308"
              srcSet="https://picsum.photos/seed/tues-programs/512/308 512w, https://picsum.photos/seed/tues-programs/1024/615 1024w, https://picsum.photos/seed/tues-programs/2048/1231 2048w, https://picsum.photos/seed/tues-programs/2112/1308 2112w"
              sizes="(max-width: 512px) 512px, (max-width: 1024px) 1024px, (max-width: 2048px) 2048px, 2112px"
              alt={t("heroAlt")}
              width={2112}
              height={1308}
              decoding="async"
              className="w-full h-full object-cover object-center block"
            />
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1348px] relative">
            <div>
              <div className="text-center mb-10 md:mb-12">
                <h2 className="text-4xl md:text-5xl font-bold" style={{ color: TITLE_COLOR }}>
                  {t("title")}
                </h2>
                <p
                  className="mt-3 text-base md:text-lg text-foreground/80 max-w-2xl mx-auto"
                  style={{ color: TITLE_COLOR }}
                >
                  {t("subtitle")}
                </p>
              </div>

              <div
                className="flex flex-col gap-4 border-b-[1.5px] pb-4 mb-10"
                style={{ borderColor: BORDER_COLOR }}
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="relative shrink-0 sm:w-64">
                    <Search
                      className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none"
                      aria-hidden
                    />
                    <input
                      type="search"
                      placeholder={t("searchPlaceholder")}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 rounded-full border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      style={{ borderColor: BORDER_COLOR }}
                    />
                  </div>
                  <Select value={degreeFilter} onValueChange={(value) => setDegreeFilter(value as DegreeFilter)}>
                    <SelectTrigger
                      className="h-11 w-full min-w-[160px] sm:w-auto sm:min-w-[180px] rounded-full border bg-background text-sm font-medium"
                      style={{ borderColor: BORDER_COLOR, color: TITLE_COLOR }}
                      aria-label={t("filterDegreeLabel", "Filter by degree")}
                    >
                      <SelectValue asChild>
                        <span className="truncate">{selectedDegreeLabel}</span>
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {degreeFilters.map(({ id, labelKey, fallback }) => (
                        <SelectItem key={id} value={id}>
                          {t(labelKey, fallback)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-wrap items-center gap-2" role="group" aria-label={t("filterFacultyLabel", "Filter by faculty")}>
                  <span className="text-sm font-medium shrink-0" style={{ color: TITLE_COLOR }}>
                    {t("filterFacultyLabel", "Faculty")}:
                  </span>
                  <button
                    type="button"
                    onClick={() => setFacultyFilter("all")}
                    className="px-4 py-2 rounded-[76px] border-[1.5px] text-sm font-medium transition-colors"
                    style={{
                      backgroundColor: facultyFilter === "all" ? TITLE_COLOR : "transparent",
                      color: facultyFilter === "all" ? "rgb(255, 255, 255)" : TITLE_COLOR,
                      borderColor: facultyFilter === "all" ? "transparent" : BORDER_COLOR,
                    }}
                  >
                    {t("filterAllFaculties", "All faculties")}
                  </button>
                  {faculties.map((faculty) => {
                    const isSelected = facultyFilter === faculty.id;
                    const label = faculty.title;
                    return (
                      <button
                        key={faculty.id}
                        type="button"
                        onClick={() => setFacultyFilter(faculty.id)}
                        className="px-4 py-2 rounded-[76px] border-[1.5px] text-sm font-medium transition-colors"
                        style={{
                          backgroundColor: isSelected ? TITLE_COLOR : "transparent",
                          color: isSelected ? "rgb(255, 255, 255)" : TITLE_COLOR,
                          borderColor: isSelected ? "transparent" : BORDER_COLOR,
                        }}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {filteredFaculties.length === 0 ? (
                <p className="py-12 text-center text-muted-foreground">{t("noProgramsMatch", "No programs match your filters.")}</p>
              ) : (
              <div className="space-y-12">
                {filteredFaculties.map((faculty) => (
                  <section key={faculty.id} aria-labelledby={`programs-faculty-${faculty.id}`}>
                    <h3
                      id={`programs-faculty-${faculty.id}`}
                      className="text-xl md:text-2xl font-semibold mb-6"
                      style={{ color: TITLE_COLOR }}
                    >
                      {faculty.title}
                    </h3>
                    <div
                      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                      role="list"
                    >
                      {faculty.programs.map((program) => (
                        <Link
                          key={program.id}
                          to={studyProgramDetailPath(program.id)}
                          role="listitem"
                          className="flex items-center justify-between w-full py-4 px-4 group transition-colors hover:bg-neutral-50/50 rounded-none border-b border-border hover:border-primary"
                        >
                          <h4
                            className="text-lg md:text-xl font-semibold text-foreground"
                            style={{ color: TITLE_COLOR }}
                          >
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
                  </section>
                ))}
              </div>
              )}
            </div>
          </div>

          <section
            id="testimonial"
            className="w-full mt-16 pt-16 pb-16"
            style={{ backgroundColor: "rgb(252, 252, 252)" }}
          >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1348px]">
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-semibold text-center text-foreground mb-2">
                  {t("testimonialsTitleLine1")}
                  <br />
                  {t("testimonialsTitleLine2")}
                </h2>
                <p className="text-center text-muted-foreground max-w-xl mx-auto">
                  {t("testimonialsSubtitle")}
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
                  {testimonialTrack.map((item, i) => (
                    <li
                      key={`${item.id}-${i}`}
                      className="flex-shrink-0 w-[calc(50%-10px)] max-lg:w-full"
                      style={{ minWidth: "min(100%, calc(50% - 10px))" }}
                    >
                      <div className="bg-[rgb(249,250,251)] rounded-[12px] p-5 h-full flex flex-col">
                        <div className="mb-4">
                          <h6 className="text-base font-semibold text-foreground leading-snug">
                            {item.quote}
                          </h6>
                        </div>
                        <div className="flex items-center gap-3 mt-auto">
                          <img
                            src={item.avatar}
                            alt=""
                            className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                          />
                          <div>
                            <p className="font-medium text-foreground text-sm">{item.name}</p>
                            <p className="text-sm text-muted-foreground">{item.designation}</p>
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
                    aria-label={t("previous")}
                    className="w-7 h-7 rounded-full bg-white border border-border hover:bg-muted/50 transition-colors flex items-center justify-center"
                  >
                    <ChevronLeft className="w-4 h-4 text-foreground" />
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    aria-label={t("next")}
                    className="w-7 h-7 rounded-full bg-white border border-border hover:bg-muted/50 transition-colors flex items-center justify-center"
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
