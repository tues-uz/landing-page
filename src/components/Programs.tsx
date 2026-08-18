import { useEffect, useRef, useMemo } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";
import {
  flattenStudyPrograms,
  studyProgramDetailPath,
  studyProgramsFacultyPath,
} from "@/data/studyProgramsCurriculum";
import { NEUTRAL_BORDER } from "@/lib/uiBorders";
import { useLocalizedStudyProgramsQuery } from "@/features/cms/hooks/useStudyProgramsQueries";

gsap.registerPlugin(ScrollTrigger);

const TITLE_COLOR = "rgb(30, 30, 30)";
const ICON_BG = "rgb(35, 47, 58)";

const PROGRAMS_BENTO_IMAGES = {
  hero: "/images/programs/university-building.png",
  seminar: "/images/programs/seminar-session.png",
  students: "/images/programs/students-collaboration.png",
  medicalLab: "/images/programs/medical-simulation-lab.png",
  certificates: "/images/programs/academic-certificates.png",
} as const;

const Programs = () => {
  const { t } = useTranslation("home");
  const bentoRef = useRef<HTMLDivElement>(null);
  const { data: faculties = [] } = useLocalizedStudyProgramsQuery();

  const previewPrograms = useMemo(() => flattenStudyPrograms(faculties).slice(0, 6), [faculties]);

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
        <div
          ref={bentoRef}
          className="bento-section grid grid-cols-2 md:grid-cols-4 grid-rows-[repeat(5,1fr)] gap-4 mb-10 md:mb-12 h-[320px] sm:h-[380px] md:h-[30rem]"
        >
          <div
            className="bento-card col-start-1 row-start-1 col-span-1 md:col-span-2 row-span-5 rounded-2xl bg-center bg-cover min-h-0 bg-muted"
            style={{ backgroundImage: `url('${PROGRAMS_BENTO_IMAGES.hero}')` }}
          />
          <div
            className="bento-card col-start-3 row-start-1 row-span-2 rounded-2xl bg-center bg-cover min-h-0 bg-muted hidden md:block"
            style={{ backgroundImage: `url('${PROGRAMS_BENTO_IMAGES.seminar}')` }}
          />
          <div
            className="bento-card col-start-3 row-start-3 row-span-3 rounded-2xl bg-center bg-cover min-h-0 bg-muted hidden md:block"
            style={{ backgroundImage: `url('${PROGRAMS_BENTO_IMAGES.students}')` }}
          />
          <div
            className="bento-card col-start-4 row-start-1 row-span-3 rounded-2xl bg-center bg-cover min-h-0 bg-muted hidden md:block"
            style={{ backgroundImage: `url('${PROGRAMS_BENTO_IMAGES.medicalLab}')` }}
          />
          <div
            className="bento-card col-start-4 row-start-4 row-span-2 rounded-2xl bg-center bg-cover min-h-0 bg-muted hidden md:block"
            style={{ backgroundImage: `url('${PROGRAMS_BENTO_IMAGES.certificates}')` }}
          />
          <div
            className="bento-card col-start-2 row-start-1 row-span-3 rounded-2xl bg-center bg-cover min-h-0 bg-muted md:hidden"
            style={{ backgroundImage: `url('${PROGRAMS_BENTO_IMAGES.seminar}')` }}
          />
          <div
            className="bento-card col-start-2 row-start-4 row-span-2 rounded-2xl bg-center bg-cover min-h-0 bg-muted md:hidden"
            style={{ backgroundImage: `url('${PROGRAMS_BENTO_IMAGES.students}')` }}
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-6 mb-10 md:mb-12 items-center sm:items-end">
          <div className="text-center sm:text-left">
            <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: TITLE_COLOR }}>
              {t("faculties.title")}
            </h2>
            <p className="text-base max-w-2xl sm:max-w-2xl mx-auto sm:mx-0" style={{ color: TITLE_COLOR }}>
              {t("faculties.description")}
            </p>
          </div>
          <Link
            to="/university-faculties"
            className="inline-flex items-center justify-center gap-2 font-medium transition-opacity hover:opacity-90 shrink-0 border border-current/10 rounded-lg px-4 py-2.5 self-center sm:self-auto sm:border-0 sm:rounded-none sm:px-0 sm:py-0"
            style={{ color: TITLE_COLOR }}
          >
            <span>{t("faculties.exploreAll")}</span>
            <span
              className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
              style={{ backgroundColor: ICON_BG }}
            >
              <ArrowRight className="h-4 w-4 text-white" />
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16 md:mb-20">
          {faculties.slice(0, 3).map((faculty) => (
            <Link
              key={faculty.id}
              to={studyProgramsFacultyPath(faculty.id)}
              className={`group flex min-h-[260px] flex-col border ${NEUTRAL_BORDER} bg-white p-6 transition-colors hover:bg-neutral-50/50`}
            >
              <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                {t("faculties.label")}
              </span>
              <h3
                className="mt-4 flex-1 text-2xl font-bold leading-tight md:text-[1.75rem]"
                style={{ color: TITLE_COLOR }}
              >
                {faculty.title}
              </h3>
              <div className="mt-6 flex items-center justify-between gap-4">
                <span className="text-sm text-muted-foreground">
                  {t("faculties.programs", { count: faculty.programs.length })}
                </span>
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-opacity group-hover:opacity-90"
                  style={{ backgroundColor: ICON_BG }}
                >
                  <ArrowRight className="h-5 w-5 text-white" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-6 mb-10 md:mb-12 items-center sm:items-end">
          <div className="text-center sm:text-left">
            <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: TITLE_COLOR }}>
              {t("programs.title")}
            </h2>
            <p className="text-base max-w-2xl sm:max-w-2xl mx-auto sm:mx-0" style={{ color: TITLE_COLOR }}>
              {t("programs.description")}
            </p>
          </div>
          <Link
            to="/programs"
            className="inline-flex items-center justify-center gap-2 font-medium transition-opacity hover:opacity-90 shrink-0 border border-current/10 rounded-lg px-4 py-2.5 self-center sm:self-auto sm:border-0 sm:rounded-none sm:px-0 sm:py-0"
            style={{ color: TITLE_COLOR }}
          >
            <span>{t("programs.exploreAll")}</span>
            <span
              className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
              style={{ backgroundColor: ICON_BG }}
            >
              <ArrowRight className="h-4 w-4 text-white" />
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {previewPrograms.map(({ program }) => (
            <Link
              key={program.id}
              to={studyProgramDetailPath(program.id)}
              className="flex items-center justify-between w-full py-4 px-4 group transition-colors hover:bg-neutral-50/50 rounded-none border-b border-border hover:border-primary"
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
