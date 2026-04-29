import type { BachelorFullTimeProgram } from "@/types/bachelorFullTime";
import { bachelorProgramDetailPath } from "./bachelorProgramPaths";
import raw from "./bachelor-correspondence-programs.json";

export const BACHELOR_CORRESPONDENCE_PROGRAMS = raw as readonly BachelorFullTimeProgram[];

export function getBachelorCorrespondenceProgramByNo(no: number): BachelorFullTimeProgram | undefined {
  return BACHELOR_CORRESPONDENCE_PROGRAMS.find((p) => p.no === no);
}

export function bachelorCorrespondenceProgramDetailPath(programNo: number): string {
  return bachelorProgramDetailPath("correspondence", programNo);
}
