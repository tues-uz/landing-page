export type BachelorProgramTrack = "full-time" | "correspondence";

export function bachelorProgramDetailPath(track: BachelorProgramTrack, programNo: number): string {
  return `/education/bachelor/${track}/programs/${programNo}`;
}
