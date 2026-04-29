import type { BachelorFullTimeProgram } from "@/types/bachelorFullTime";
import { bachelorProgramDetailPath } from "./bachelorProgramPaths";
import raw from "./bachelor-full-time-programs.json";

export const BACHELOR_FULL_TIME_PROGRAMS = raw as readonly BachelorFullTimeProgram[];

export function getBachelorFullTimeProgramByNo(no: number): BachelorFullTimeProgram | undefined {
  return BACHELOR_FULL_TIME_PROGRAMS.find((p) => p.no === no);
}

export function bachelorFullTimeProgramDetailPath(programNo: number): string {
  return bachelorProgramDetailPath("full-time", programNo);
}
