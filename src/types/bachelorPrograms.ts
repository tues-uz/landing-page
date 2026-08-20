export type BachelorProgramTrack = "full-time" | "correspondence";

export type BachelorProgramItem = {
  id: string;
  track: BachelorProgramTrack;
  programNo: number;
  cipher: string;
  specialtyName: string;
  duration: string;
  qualification: string;
  totalCredits: string;
  descriptionParagraphs: string[];
  typeOfEducation: string;
  instructionLanguages: string;
  formOfEducation: string;
  pdfUrl: string;
  sortOrder: number;
  updatedAt?: string;
};
