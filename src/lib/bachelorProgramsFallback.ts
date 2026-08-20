import type { BachelorProgramItem, BachelorProgramTrack } from "@/types/bachelorPrograms";
import type { BachelorFullTimeProgram } from "@/types/bachelorFullTime";
import { BACHELOR_FULL_TIME_PROGRAMS } from "@/data/bachelorFullTimePrograms";
import { BACHELOR_CORRESPONDENCE_PROGRAMS } from "@/data/bachelorCorrespondencePrograms";
import { bachelorProgramPdfHref } from "@/lib/educationProgramPdf";

/** Build-time fallback so the page renders immediately while the CMS-backed list loads. */
function toItem(track: BachelorProgramTrack, program: BachelorFullTimeProgram): BachelorProgramItem {
  return {
    id: `${track}-${program.no}`,
    track,
    programNo: program.no,
    cipher: program.cipher,
    specialtyName: program.specialtyName,
    duration: program.duration,
    qualification: program.qualification,
    totalCredits: program.totalCredits,
    descriptionParagraphs: program.descriptionParagraphs,
    typeOfEducation: program.typeOfEducation,
    instructionLanguages: program.instructionLanguages,
    formOfEducation: program.formOfEducation,
    pdfUrl: bachelorProgramPdfHref(track, program.cipher),
    sortOrder: program.no,
  };
}

export const BACHELOR_PROGRAMS_FALLBACK: Record<BachelorProgramTrack, BachelorProgramItem[]> = {
  "full-time": BACHELOR_FULL_TIME_PROGRAMS.map((p) => toItem("full-time", p)),
  correspondence: BACHELOR_CORRESPONDENCE_PROGRAMS.map((p) => toItem("correspondence", p)),
};

export function getBachelorProgramFallback(
  track: BachelorProgramTrack,
  programNo: number,
): BachelorProgramItem | undefined {
  return BACHELOR_PROGRAMS_FALLBACK[track].find((p) => p.programNo === programNo);
}
