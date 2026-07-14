/** Footer column config — labels resolved via i18n `footerMenu.*` keys */
export type FooterLinkConfig = { labelKey: string; href: string };
export type FooterSectionConfig = { titleKey: string; links: FooterLinkConfig[] };

export const footerNavSections: FooterSectionConfig[] = [
  {
    titleKey: "footerMenu.university.title",
    links: [
      { labelKey: "footerMenu.university.overview", href: "#" },
      { labelKey: "footerMenu.university.history", href: "#" },
      { labelKey: "footerMenu.university.leadership", href: "#" },
      { labelKey: "footerMenu.university.governance", href: "#" },
      { labelKey: "footerMenu.university.strategicPlan", href: "#" },
    ],
  },
  {
    titleKey: "footerMenu.education.title",
    links: [
      { labelKey: "footerMenu.education.academicPrograms", href: "/programs" },
      { labelKey: "footerMenu.education.courses", href: "#" },
      { labelKey: "footerMenu.education.calendar", href: "#" },
      { labelKey: "footerMenu.education.faculty", href: "#" },
      { labelKey: "footerMenu.education.departments", href: "#" },
    ],
  },
  {
    titleKey: "footerMenu.science.title",
    links: [
      { labelKey: "footerMenu.science.researchAreas", href: "#" },
      { labelKey: "footerMenu.science.laboratories", href: "#" },
      { labelKey: "footerMenu.science.publications", href: "#" },
      { labelKey: "footerMenu.science.innovation", href: "#" },
      { labelKey: "footerMenu.science.collaborations", href: "#" },
    ],
  },
  {
    titleKey: "footerMenu.international.title",
    links: [
      { labelKey: "footerMenu.international.exchange", href: "#" },
      { labelKey: "footerMenu.international.partnerships", href: "#" },
      { labelKey: "footerMenu.international.intlStudents", href: "#" },
      { labelKey: "footerMenu.international.studyAbroad", href: "#" },
      { labelKey: "footerMenu.international.global", href: "#" },
    ],
  },
  {
    titleKey: "footerMenu.studentLife.title",
    links: [
      { labelKey: "footerMenu.studentLife.campus", href: "#" },
      { labelKey: "footerMenu.studentLife.clubs", href: "#" },
      { labelKey: "footerMenu.studentLife.housing", href: "#" },
      { labelKey: "footerMenu.studentLife.dining", href: "#" },
      { labelKey: "footerMenu.studentLife.wellness", href: "#" },
    ],
  },
  {
    titleKey: "footerMenu.admission.title",
    links: [
      { labelKey: "footerMenu.admission.requirements", href: "#" },
      { labelKey: "footerMenu.admission.application", href: "#" },
      { labelKey: "footerMenu.admission.deadlines", href: "#" },
      { labelKey: "footerMenu.admission.scholarships", href: "#" },
      { labelKey: "footerMenu.admission.faqs", href: "/admission-2025/faq" },
    ],
  },
  {
    titleKey: "footerMenu.infoServices.title",
    links: [
      { labelKey: "footerMenu.infoServices.library", href: "#" },
      { labelKey: "footerMenu.infoServices.it", href: "#" },
      { labelKey: "footerMenu.infoServices.online", href: "#" },
      { labelKey: "footerMenu.infoServices.support", href: "#" },
      { labelKey: "footerMenu.infoServices.helpDesk", href: "#" },
    ],
  },
  {
    titleKey: "footerMenu.vacancies.title",
    links: [
      { labelKey: "footerMenu.vacancies.academic", href: "/vacancies/academic-positions" },
      { labelKey: "footerMenu.vacancies.admin", href: "/vacancies/administrative-positions" },
      { labelKey: "footerMenu.vacancies.research", href: "/vacancies/research-positions" },
      { labelKey: "footerMenu.vacancies.howToApply", href: "/vacancies/how-to-apply" },
      { labelKey: "footerMenu.vacancies.benefits", href: "/vacancies/benefits" },
    ],
  },
];
