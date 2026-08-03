/** Conference list for Research → Seminars & Conferences. */

export type SeminarConferenceRow = {
  readonly no: number;
  readonly titleKey: string;
  readonly levelKey: "seminarsLevelTraditional" | "seminarsLevelInternational" | "seminarsLevelRepublican";
  readonly dateKey: string;
};

export const SEMINARS_CONFERENCES_ROWS: readonly SeminarConferenceRow[] = [
  { no: 1, titleKey: "seminarsRow1Title", levelKey: "seminarsLevelTraditional", dateKey: "seminarsRow1Date" },
  { no: 2, titleKey: "seminarsRow2Title", levelKey: "seminarsLevelTraditional", dateKey: "seminarsRow2Date" },
  { no: 3, titleKey: "seminarsRow3Title", levelKey: "seminarsLevelInternational", dateKey: "seminarsRow3Date" },
  { no: 4, titleKey: "seminarsRow4Title", levelKey: "seminarsLevelTraditional", dateKey: "seminarsRow4Date" },
  { no: 5, titleKey: "seminarsRow5Title", levelKey: "seminarsLevelTraditional", dateKey: "seminarsRow5Date" },
  { no: 6, titleKey: "seminarsRow6Title", levelKey: "seminarsLevelRepublican", dateKey: "seminarsRow6Date" },
  { no: 7, titleKey: "seminarsRow7Title", levelKey: "seminarsLevelRepublican", dateKey: "seminarsRow7Date" },
  { no: 8, titleKey: "seminarsRow8Title", levelKey: "seminarsLevelInternational", dateKey: "seminarsRow8Date" },
  { no: 9, titleKey: "seminarsRow9Title", levelKey: "seminarsLevelInternational", dateKey: "seminarsRow9Date" },
  { no: 10, titleKey: "seminarsRow10Title", levelKey: "seminarsLevelRepublican", dateKey: "seminarsRow10Date" },
  { no: 11, titleKey: "seminarsRow11Title", levelKey: "seminarsLevelInternational", dateKey: "seminarsRow11Date" },
  { no: 12, titleKey: "seminarsRow12Title", levelKey: "seminarsLevelRepublican", dateKey: "seminarsRow12Date" },
  { no: 13, titleKey: "seminarsRow13Title", levelKey: "seminarsLevelInternational", dateKey: "seminarsRow13Date" },
] as const;

export const SEMINARS_CONFERENCES_DEFAULTS = {
  seminarsLevelTraditional: "Traditional",
  seminarsLevelInternational: "International",
  seminarsLevelRepublican: "Republican",
  seminarsRow1Title: "Traditional First Scientific and Practical Conference of Students",
  seminarsRow1Date: "May/June 2023",
  seminarsRow2Title: "Traditional First Scientific and Practical Conference of Faculty Members",
  seminarsRow2Date: "June 2023",
  seminarsRow3Title:
    "International Scientific and Practical Conference “Current Problems of Innovative Technologies and Higher Education in the Context of Globalization”",
  seminarsRow3Date: "May 2023",
  seminarsRow4Title: "Traditional Second Scientific and Practical Conference of Students",
  seminarsRow4Date: "April 2024",
  seminarsRow5Title: "Traditional Second Scientific and Practical Conference of Faculty Members",
  seminarsRow5Date: "May 2024",
  seminarsRow6Title:
    "Republican Scientific and Practical Conference “The Role of Abdunazar Poyonov in the Art of Bakhshi”",
  seminarsRow6Date: "October 2024",
  seminarsRow7Title:
    "Republican Scientific and Practical Conference “Current Problems of Preventive Medicine: From Disease Prevention to High-Tech Treatment”",
  seminarsRow7Date: "18–19 April 2025",
  seminarsRow8Title:
    "International Scientific and Practical Conference “Current Issues of Education and Upbringing in the Context of Digital Transformation”",
  seminarsRow8Date: "25–26 April 2025",
  seminarsRow9Title:
    "International Scientific and Practical Conference “International Experience: Prospects for Developing the Tourism Sector in the Context of Educational Modernization”",
  seminarsRow9Date: "16–17 May 2025",
  seminarsRow10Title:
    "Republican Scientific and Practical Conference “Current Issues of Science, Education and Innovation: Modern Aspects of Historical Sciences”",
  seminarsRow10Date: "23–24 May 2025",
  seminarsRow11Title:
    "International Scientific and Practical Conference “Current Issues of Ensuring Sustainable Economic Growth in Conditions of Economic Transformation”",
  seminarsRow11Date: "7–8 November 2025",
  seminarsRow12Title:
    "Republican Scientific and Practical Conference “Problems and Solutions of Interactive Teaching of Natural Sciences in Medical Universities”",
  seminarsRow12Date: "20–21 June 2025",
  seminarsRow13Title:
    "International Scientific and Practical Conference “Current Issues of Linguistics and Literary Studies”",
  seminarsRow13Date: "10–11 October 2025",
} as const;
