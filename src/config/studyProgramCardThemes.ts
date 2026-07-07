import type { LucideIcon } from "lucide-react";
import {
  Award,
  BookOpen,
  FlaskConical,
  GraduationCap,
  Languages,
  Palette,
} from "lucide-react";

export type StudyProgramDirectionId =
  | "pedagogy-education"
  | "arts-creative"
  | "language-literature"
  | "social-natural-sciences"
  | "health-medicine-bachelor"
  | "masters-medicine";

type StudyProgramCardTheme = {
  Icon: LucideIcon;
  gradient: string;
  iconClass: string;
};

export const STUDY_PROGRAM_CARD_THEMES: Record<StudyProgramDirectionId, StudyProgramCardTheme> = {
  "pedagogy-education": {
    Icon: BookOpen,
    gradient: "from-sky-100 via-sky-50 to-white dark:from-sky-950/50 dark:via-primary/10 dark:to-card",
    iconClass: "text-sky-600/70 dark:text-sky-400/80",
  },
  "arts-creative": {
    Icon: Palette,
    gradient: "from-violet-100 via-violet-50 to-white dark:from-violet-950/50 dark:via-primary/10 dark:to-card",
    iconClass: "text-violet-600/70 dark:text-violet-400/80",
  },
  "language-literature": {
    Icon: Languages,
    gradient: "from-amber-100 via-amber-50 to-white dark:from-amber-950/40 dark:via-primary/10 dark:to-card",
    iconClass: "text-amber-700/70 dark:text-amber-400/80",
  },
  "social-natural-sciences": {
    Icon: FlaskConical,
    gradient: "from-emerald-100 via-emerald-50 to-white dark:from-emerald-950/40 dark:via-primary/10 dark:to-card",
    iconClass: "text-emerald-700/70 dark:text-emerald-400/80",
  },
  "health-medicine-bachelor": {
    Icon: GraduationCap,
    gradient: "from-rose-100 via-rose-50 to-white dark:from-rose-950/40 dark:via-primary/10 dark:to-card",
    iconClass: "text-rose-600/70 dark:text-rose-400/80",
  },
  "masters-medicine": {
    Icon: Award,
    gradient: "from-indigo-100 via-indigo-50 to-white dark:from-indigo-950/40 dark:via-primary/10 dark:to-card",
    iconClass: "text-indigo-600/70 dark:text-indigo-400/80",
  },
};

export function getStudyProgramCardTheme(directionId: string): StudyProgramCardTheme {
  return (
    STUDY_PROGRAM_CARD_THEMES[directionId as StudyProgramDirectionId] ??
    STUDY_PROGRAM_CARD_THEMES["pedagogy-education"]
  );
}
