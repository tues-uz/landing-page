import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { getStudyProgramCardTheme } from "@/config/studyProgramCardThemes";
import { studyProgramDetailPath } from "@/data/studyProgramsCurriculum";
import { STUDY_PROGRAMS_I18N_DEFAULTS } from "@/locales/studyProgramsDefaults";
import type { StudyProgram } from "@/types/studyPrograms";
import { cn } from "@/lib/utils";

export function StudyProgramCard({
  program,
  facultyId,
}: {
  program: StudyProgram;
  facultyId: string;
}) {
  const { t } = useTranslation("topNav");
  const to = studyProgramDetailPath(program.id);
  const { Icon, gradient, iconClass } = getStudyProgramCardTheme(facultyId);
  const durationLabel = t("studyProgramsDurationLabel", {
    defaultValue: STUDY_PROGRAMS_I18N_DEFAULTS.studyProgramsDurationLabel,
  });
  const qualificationLabel = t("studyProgramsQualificationLabel", {
    defaultValue: STUDY_PROGRAMS_I18N_DEFAULTS.studyProgramsQualificationLabel,
  });
  const viewCoursesLabel = t("studyProgramsViewCoursesCta", {
    defaultValue: STUDY_PROGRAMS_I18N_DEFAULTS.studyProgramsViewCoursesCta,
  });
  const label = `${program.title}, ${program.duration}, ${program.qualification} — ${viewCoursesLabel}`;

  return (
    <li className="flex min-h-0">
      <Link
        to={to}
        className={cn(
          "group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm",
          "transition-all duration-300 hover:border-primary/25 hover:shadow-md",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        )}
        aria-label={label}
      >
        <div
          className={cn(
            "relative aspect-[3/2] w-full shrink-0 overflow-hidden bg-gradient-to-br",
            gradient,
          )}
        >
          <div
            className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full bg-white/40 blur-2xl dark:bg-white/5"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-8 -left-4 h-24 w-24 rounded-full bg-primary/10 blur-xl"
            aria-hidden
          />
          <Icon
            className={cn(
              "pointer-events-none absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2",
              iconClass,
            )}
            strokeWidth={1.25}
            aria-hidden
          />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 bg-gradient-to-t from-black/10 to-transparent p-4 pt-10 dark:from-black/35">
            <span className="rounded-md bg-background/95 px-2 py-1 font-mono text-[10px] font-semibold tabular-nums tracking-wide text-foreground shadow-sm backdrop-blur-sm">
              {program.code}
            </span>
            <span className="rounded-full bg-background/95 px-2.5 py-1 text-[10px] font-semibold text-foreground shadow-sm backdrop-blur-sm">
              {program.degreeLevel}
            </span>
          </div>
        </div>

        <div className="flex min-h-0 flex-1 flex-col p-5">
          <h3 className="text-lg font-semibold leading-snug tracking-tight text-foreground transition-colors group-hover:text-primary md:text-xl">
            {program.title}
          </h3>

          <p className="mt-2 line-clamp-2 text-base leading-relaxed text-muted-foreground">
            <span className="sr-only">{qualificationLabel}: </span>
            {program.qualification}
          </p>

          <div className="mt-auto pt-4">
            <span
              className={cn(
                "flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-colors duration-300",
                "bg-muted/60 text-foreground",
                "group-hover:bg-primary group-hover:text-primary-foreground",
              )}
            >
              {viewCoursesLabel}
              <ArrowRight className="h-4 w-4 opacity-90" strokeWidth={2} aria-hidden />
            </span>
            <span className="sr-only">
              {durationLabel}: {program.duration}
            </span>
          </div>
        </div>
      </Link>
    </li>
  );
}
