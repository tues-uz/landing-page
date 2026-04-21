/** Conference list for Research → Seminars & Conferences (English source titles). */

export type SeminarConferenceLevel = "Traditional" | "International" | "Republican";

export type SeminarConferenceRow = {
  readonly no: number;
  readonly title: string;
  readonly level: SeminarConferenceLevel;
  readonly date: string;
};

export const SEMINARS_CONFERENCES_ROWS: readonly SeminarConferenceRow[] = [
  {
    no: 1,
    title: "Traditional First Scientific and Practical Conference of Students",
    level: "Traditional",
    date: "May/June 2023",
  },
  {
    no: 2,
    title: "Traditional First Scientific and Practical Conference of Faculty Members",
    level: "Traditional",
    date: "June 2023",
  },
  {
    no: 3,
    title:
      "International Scientific and Practical Conference “Current Problems of Innovative Technologies and Higher Education in the Context of Globalization”",
    level: "International",
    date: "May 2023",
  },
  {
    no: 4,
    title: "Traditional Second Scientific and Practical Conference of Students",
    level: "Traditional",
    date: "April 2024",
  },
  {
    no: 5,
    title: "Traditional Second Scientific and Practical Conference of Faculty Members",
    level: "Traditional",
    date: "May 2024",
  },
  {
    no: 6,
    title:
      "Republican Scientific and Practical Conference “The Role of Abdunazar Poyonov in the Art of Bakhshi”",
    level: "Republican",
    date: "October 2024",
  },
  {
    no: 7,
    title:
      "Republican Scientific and Practical Conference “Current Problems of Preventive Medicine: From Disease Prevention to High-Tech Treatment”",
    level: "Republican",
    date: "18–19 April 2025",
  },
  {
    no: 8,
    title:
      "International Scientific and Practical Conference “Current Issues of Education and Upbringing in the Context of Digital Transformation”",
    level: "International",
    date: "25–26 April 2025",
  },
  {
    no: 9,
    title:
      "International Scientific and Practical Conference “International Experience: Prospects for Developing the Tourism Sector in the Context of Educational Modernization”",
    level: "International",
    date: "16–17 May 2025",
  },
  {
    no: 10,
    title:
      "Republican Scientific and Practical Conference “Current Issues of Science, Education and Innovation: Modern Aspects of Historical Sciences”",
    level: "Republican",
    date: "23–24 May 2025",
  },
  {
    no: 11,
    title:
      "International Scientific and Practical Conference “Current Issues of Ensuring Sustainable Economic Growth in Conditions of Economic Transformation”",
    level: "International",
    date: "7–8 November 2025",
  },
  {
    no: 12,
    title:
      "Republican Scientific and Practical Conference “Problems and Solutions of Interactive Teaching of Natural Sciences in Medical Universities”",
    level: "Republican",
    date: "20–21 June 2025",
  },
  {
    no: 13,
    title:
      "International Scientific and Practical Conference “Current Issues of Linguistics and Literary Studies”",
    level: "International",
    date: "10–11 October 2025",
  },
] as const;
