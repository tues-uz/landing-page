import type { BachelorProgramTrack } from "@/data/bachelorProgramPaths";

export function bachelorProgramPdfHref(track: BachelorProgramTrack, cipher: string): string {
  return `/documents/bachelor/${track}/${cipher}.pdf`;
}

export function mastersProgramPdfHref(specialtyCode: string): string {
  return `/documents/masters/${specialtyCode}.pdf`;
}
