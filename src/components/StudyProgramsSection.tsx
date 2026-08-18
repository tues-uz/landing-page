import type { TFunction } from "i18next";
import { useTranslation } from "react-i18next";
import { STUDY_PROGRAMS_I18N_DEFAULTS } from "@/locales/studyProgramsDefaults";
import { StudyProgramCard } from "@/components/StudyProgramCard";
import { useLocalizedStudyProgramsQuery } from "@/features/cms/hooks/useStudyProgramsQueries";

function trStudyPrograms(t: TFunction, key: keyof typeof STUDY_PROGRAMS_I18N_DEFAULTS) {
  return t(key, { defaultValue: STUDY_PROGRAMS_I18N_DEFAULTS[key] });
}

export function StudyProgramsSection() {
  const { t } = useTranslation("topNav");
  const { data: faculties = [] } = useLocalizedStudyProgramsQuery();

  return (
    <div className="mt-4 max-w-none">
      <p className="text-sm leading-relaxed text-muted-foreground">
        {trStudyPrograms(t, "studyProgramsCardsHint")}
      </p>

      <div className="mt-10 space-y-12">
        {faculties.map((faculty) => (
          <section key={faculty.id} aria-labelledby={`study-faculty-${faculty.id}`}>
            <h2
              id={`study-faculty-${faculty.id}`}
              className="text-balance text-xl font-semibold tracking-tight text-foreground md:text-2xl"
            >
              {faculty.title}
            </h2>
            <ul
              className="mt-6 grid list-none grid-cols-1 gap-[16px] p-0 md:grid-cols-2 lg:grid-cols-3"
              role="list"
            >
              {faculty.programs.map((program) => (
                <StudyProgramCard key={program.id} program={program} facultyId={faculty.id} />
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
