import type { LucideIcon } from "lucide-react";
import { Building2, GraduationCap, Stethoscope } from "lucide-react";

export type StudyProgramFacultyId =
  | "faculty-medicine"
  | "faculty-pedagogy-social-humanities"
  | "faculty-economics-information-technologies";

type StudyProgramCardTheme = {
  Icon: LucideIcon;
  gradient: string;
  iconClass: string;
};

export const STUDY_PROGRAM_CARD_THEMES: Record<StudyProgramFacultyId, StudyProgramCardTheme> = {
  "faculty-medicine": {
    Icon: Stethoscope,
    gradient: "from-rose-100 via-rose-50 to-white dark:from-rose-950/40 dark:via-primary/10 dark:to-card",
    iconClass: "text-rose-600/70 dark:text-rose-400/80",
  },
  "faculty-pedagogy-social-humanities": {
    Icon: GraduationCap,
    gradient: "from-sky-100 via-sky-50 to-white dark:from-sky-950/50 dark:via-primary/10 dark:to-card",
    iconClass: "text-sky-600/70 dark:text-sky-400/80",
  },
  "faculty-economics-information-technologies": {
    Icon: Building2,
    gradient: "from-emerald-100 via-emerald-50 to-white dark:from-emerald-950/40 dark:via-primary/10 dark:to-card",
    iconClass: "text-emerald-700/70 dark:text-emerald-400/80",
  },
};

export function getStudyProgramCardTheme(facultyId: string): StudyProgramCardTheme {
  return (
    STUDY_PROGRAM_CARD_THEMES[facultyId as StudyProgramFacultyId] ??
    STUDY_PROGRAM_CARD_THEMES["faculty-pedagogy-social-humanities"]
  );
}
