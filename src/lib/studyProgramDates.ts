import { format, isValid, parseISO } from "date-fns";
import { STUDY_PROGRAMS_I18N_DEFAULTS } from "@/locales/studyProgramsDefaults";

const REQUEST_INFO = STUDY_PROGRAMS_I18N_DEFAULTS.studyProgramsRequestInfo;

export function toStudyProgramDateInputValue(value?: string): string {
  const trimmed = value?.trim();
  if (!trimmed || trimmed === REQUEST_INFO) return "";
  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) return trimmed;
  const parsed = new Date(trimmed);
  if (isValid(parsed)) return format(parsed, "yyyy-MM-dd");
  return "";
}

export function formatStudyProgramDateDisplay(value: string | undefined, fallback: string): string {
  const trimmed = value?.trim();
  if (!trimmed || trimmed === REQUEST_INFO) return fallback;
  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
    const parsed = parseISO(trimmed);
    if (isValid(parsed)) return format(parsed, "MMMM d, yyyy");
  }
  return trimmed;
}
