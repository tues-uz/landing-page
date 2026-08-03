import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { studyProgramApplyPath } from "@/data/studyProgramsCurriculum";
import { formatStudyProgramDateDisplay } from "@/lib/studyProgramDates";
import { STUDY_PROGRAMS_I18N_DEFAULTS } from "@/locales/studyProgramsDefaults";
import type { StudyProgram, StudyProgramFaculty } from "@/types/studyPrograms";

function CourseRows({
  courses,
  creditsLabel,
}: {
  courses: StudyProgram["courseGroups"][number]["courses"];
  creditsLabel: string;
}) {
  return (
    <div className="space-y-0">
      {courses.map((course) => (
        <div
          key={course.name}
          className="flex items-start justify-between gap-6 border-t border-border/50 py-3.5 first:border-t-0 first:pt-0"
        >
          <span className="min-w-0 text-[15px] leading-relaxed text-foreground">{course.name}</span>
          {course.credits ? (
            <span className="shrink-0 text-sm tabular-nums text-muted-foreground">
              <span className="sr-only">{creditsLabel}: </span>
              {course.credits}
            </span>
          ) : null}
        </div>
      ))}
    </div>
  );
}

export function StudyProgramDetailView({
  faculty,
  program,
}: {
  faculty: StudyProgramFaculty;
  program: StudyProgram;
}) {
  const { t } = useTranslation("topNav");

  const layoutRowRef = useRef<HTMLDivElement>(null);
  const asideRef = useRef<HTMLElement>(null);
  const sidebarWrapRef = useRef<HTMLDivElement>(null);
  const sidebarCardRef = useRef<HTMLDivElement>(null);

  const durationLabel = t("studyProgramsDurationLabel", {
    defaultValue: STUDY_PROGRAMS_I18N_DEFAULTS.studyProgramsDurationLabel,
  });
  const qualificationLabel = t("studyProgramsQualificationLabel", {
    defaultValue: STUDY_PROGRAMS_I18N_DEFAULTS.studyProgramsQualificationLabel,
  });
  const tuitionLabel = t("studyProgramsTuitionLabel", {
    defaultValue: STUDY_PROGRAMS_I18N_DEFAULTS.studyProgramsTuitionLabel,
  });
  const degreeLevelLabel = t("studyProgramsDegreeLevelLabel", {
    defaultValue: STUDY_PROGRAMS_I18N_DEFAULTS.studyProgramsDegreeLevelLabel,
  });
  const coursesTitle = t("studyProgramsCoursesTitle", {
    defaultValue: STUDY_PROGRAMS_I18N_DEFAULTS.studyProgramsCoursesTitle,
  });
  const creditsLabel = t("studyProgramsCreditsLabel", {
    defaultValue: STUDY_PROGRAMS_I18N_DEFAULTS.studyProgramsCreditsLabel,
  });
  const applyLabel = t("studyProgramsApplyCta", {
    defaultValue: STUDY_PROGRAMS_I18N_DEFAULTS.studyProgramsApplyCta,
  });
  const applicationDeadlineLabel = t("studyProgramsApplicationDeadlineLabel", {
    defaultValue: STUDY_PROGRAMS_I18N_DEFAULTS.studyProgramsApplicationDeadlineLabel,
  });
  const earliestStartDateLabel = t("studyProgramsEarliestStartDateLabel", {
    defaultValue: STUDY_PROGRAMS_I18N_DEFAULTS.studyProgramsEarliestStartDateLabel,
  });
  const requestInfoLabel = t("studyProgramsRequestInfo", {
    defaultValue: STUDY_PROGRAMS_I18N_DEFAULTS.studyProgramsRequestInfo,
  });
  const codeLabel = t("studyProgramsCodeLabel", {
    defaultValue: STUDY_PROGRAMS_I18N_DEFAULTS.studyProgramsCodeLabel,
  });

  const displayDate = (value?: string) => formatStudyProgramDateDisplay(value, requestInfoLabel);

  const totalCourses = program.courseGroups.reduce((n, g) => n + g.courses.length, 0);
  const sectionsCoursesLabel = t("studyProgramsSectionsCourses", {
    sections: program.courseGroups.length,
    courses: totalCourses,
    defaultValue: STUDY_PROGRAMS_I18N_DEFAULTS.studyProgramsSectionsCourses,
  });
  const multiGroup = program.courseGroups.length > 1;

  useLayoutEffect(() => {
    const LG = "(min-width: 1024px)";
    const mq = window.matchMedia(LG);

    const headerOffsetPx = () => {
      const raw = getComputedStyle(document.documentElement).getPropertyValue("--header-height").trim();
      const n = parseFloat(raw);
      return (Number.isFinite(n) ? n : 64) + 16;
    };

    const clearCardPinStyles = () => {
      const card = sidebarCardRef.current;
      const wrap = sidebarWrapRef.current;
      if (card) {
        card.style.removeProperty("position");
        card.style.removeProperty("top");
        card.style.removeProperty("left");
        card.style.removeProperty("right");
        card.style.removeProperty("width");
        card.style.removeProperty("bottom");
        card.style.removeProperty("z-index");
        card.style.removeProperty("max-height");
      }
      if (wrap) wrap.style.removeProperty("min-height");
    };

    const update = () => {
      const row = layoutRowRef.current;
      const aside = asideRef.current;
      const wrap = sidebarWrapRef.current;
      const card = sidebarCardRef.current;
      if (!mq.matches || !row || !aside || !wrap || !card) {
        clearCardPinStyles();
        return;
      }

      const topPx = headerOffsetPx();
      const rowRect = row.getBoundingClientRect();
      const wrapRect = wrap.getBoundingClientRect();
      const cardH = card.offsetHeight;

      const useBottom = rowRect.bottom <= topPx + cardH + 2;
      const useFixed = !useBottom && wrapRect.top < topPx;

      if (useFixed) {
        const wr = wrap.getBoundingClientRect();
        wrap.style.minHeight = `${Math.ceil(cardH)}px`;
        card.style.position = "fixed";
        card.style.top = `${topPx}px`;
        card.style.left = `${wr.left}px`;
        card.style.width = `${wr.width}px`;
        card.style.right = "auto";
        card.style.bottom = "auto";
        card.style.zIndex = "10";
        card.style.maxHeight = "100dvh";
      } else if (useBottom) {
        wrap.style.removeProperty("min-height");
        card.style.position = "absolute";
        card.style.top = "auto";
        card.style.left = "0";
        card.style.right = "0";
        card.style.width = "auto";
        card.style.bottom = "0";
        card.style.zIndex = "10";
        card.style.maxHeight = "100dvh";
      } else {
        clearCardPinStyles();
      }
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    mq.addEventListener("change", update);
    const ro = new ResizeObserver(update);
    if (sidebarCardRef.current) ro.observe(sidebarCardRef.current);
    if (layoutRowRef.current) ro.observe(layoutRowRef.current);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      mq.removeEventListener("change", update);
      ro.disconnect();
      clearCardPinStyles();
    };
  }, [program.id]);

  return (
    <div className="mx-auto w-full max-w-6xl">
      <div
        ref={layoutRowRef}
        className="lg:grid lg:min-h-[calc(100dvh-var(--header-height)-2rem)] lg:grid-cols-[minmax(260px,300px)_1fr] lg:divide-x lg:divide-border"
      >
        <aside ref={asideRef} className="relative lg:min-h-0">
          <div ref={sidebarWrapRef} className="w-full">
            <div
              ref={sidebarCardRef}
              className="px-5 py-8 sm:px-8 lg:z-10 lg:h-[100dvh] lg:overflow-y-auto lg:px-8 lg:py-10"
              style={{ scrollbarGutter: "stable" }}
            >
              <dl className="space-y-4 text-sm">
                <div>
                  <dt className="text-muted-foreground">{degreeLevelLabel}</dt>
                  <dd className="mt-1 font-medium text-foreground">{program.degreeLevel}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">{durationLabel}</dt>
                  <dd className="mt-1 font-medium text-foreground">{program.duration}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">{codeLabel}</dt>
                  <dd className="mt-1 font-mono font-medium tabular-nums text-foreground">{program.code}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">{qualificationLabel}</dt>
                  <dd className="mt-1 leading-relaxed text-foreground">{program.qualification}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">{tuitionLabel}</dt>
                  <dd className="mt-1 font-medium text-foreground">{program.tuitionFee}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">{applicationDeadlineLabel}</dt>
                  <dd className="mt-1 font-medium text-foreground">
                    {displayDate(program.applicationDeadline)}
                  </dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">{earliestStartDateLabel}</dt>
                  <dd className="mt-1 font-medium text-foreground">
                    {displayDate(program.earliestStartDate)}
                  </dd>
                </div>
              </dl>

              <Button asChild className="mt-8 w-full" size="lg">
                <Link to={studyProgramApplyPath(program.id)}>{applyLabel}</Link>
              </Button>
            </div>
          </div>
        </aside>

        <div className="border-t border-border px-5 py-8 sm:px-8 lg:border-t-0 lg:px-10 lg:py-10">
          <p className="text-sm text-muted-foreground">{faculty.title}</p>
          <h1 className="mt-2 text-2xl font-bold leading-tight tracking-tight text-foreground sm:text-3xl">
            {program.title}
          </h1>
          <p className="mt-2 text-xs text-muted-foreground">{sectionsCoursesLabel}</p>
          <h2 className="mt-6 text-sm font-medium text-muted-foreground">{coursesTitle}</h2>

          {multiGroup ? (
            <Accordion type="single" collapsible defaultValue="group-0" className="mt-4">
              {program.courseGroups.map((group, index) => (
                <AccordionItem key={group.title} value={`group-${index}`} className="border-border/60">
                  <AccordionTrigger className="py-4 text-[15px] font-medium hover:no-underline [&[data-state=open]]:text-foreground">
                    <span className="flex min-w-0 flex-1 items-baseline justify-between gap-4 pr-2 text-left">
                      <span>{group.title}</span>
                      <span className="shrink-0 text-xs font-normal text-muted-foreground">
                        {group.courses.length}
                      </span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-2">
                    <CourseRows courses={group.courses} creditsLabel={creditsLabel} />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : program.courseGroups[0] ? (
            <div className="mt-4">
              <p className="mb-4 text-[15px] font-medium text-foreground">{program.courseGroups[0].title}</p>
              <CourseRows courses={program.courseGroups[0].courses} creditsLabel={creditsLabel} />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
