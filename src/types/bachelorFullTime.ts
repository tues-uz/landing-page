/** One full-time bachelor specialty block (mirrors legacy HTML table layout). */
export type BachelorFullTimeProgram = {
  no: number;
  cipher: string;
  specialtyName: string;
  duration: string;
  descriptionParagraphs: string[];
  typeOfEducation: string;
  qualification: string;
  totalCredits: string;
  instructionLanguages: string;
  formOfEducation: string;
};
