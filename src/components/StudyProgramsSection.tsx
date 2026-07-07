import type { TFunction } from "i18next";
import { useTranslation } from "react-i18next";
import { STUDY_PROGRAMS_CURRICULUM } from "@/data/studyProgramsCurriculum";
import { STUDY_PROGRAMS_I18N_DEFAULTS } from "@/locales/studyProgramsDefaults";
import { StudyProgramCard } from "@/components/StudyProgramCard";

function trStudyPrograms(t: TFunction, key: keyof typeof STUDY_PROGRAMS_I18N_DEFAULTS) {
  return t(key, { defaultValue: STUDY_PROGRAMS_I18N_DEFAULTS[key] });
}

export function StudyProgramsSection() {
  const { t } = useTranslation("topNav");

  return (
    <div className="mt-4 max-w-none">
      <p className="text-justify text-body-article text-muted-foreground">
        {trStudyPrograms(t, "studyProgramsIntro")}
      </p>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        {trStudyPrograms(t, "studyProgramsCardsHint")}
      </p>

      <div className="mt-10 space-y-10">
        {STUDY_PROGRAMS_CURRICULUM.map((direction) => (
          <section key={direction.id} aria-labelledby={`study-direction-${direction.id}`}>
            <h2
              id={`study-direction-${direction.id}`}
              className="text-balance text-lg font-semibold tracking-tight text-foreground md:text-xl"
            >
              {direction.title}
            </h2>
            <ul
              className="mt-5 grid list-none grid-cols-1 gap-[16px] p-0 md:grid-cols-2 lg:grid-cols-3"
              role="list"
            >
              {direction.programs.map((program) => (
                <StudyProgramCard key={program.id} program={program} directionId={direction.id} />
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
