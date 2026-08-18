/** Sections for top-nav hub pages (About, Research, Admissions, Media). */

export type HubSection = { id: string; labelKey: string };

export const aboutHubSections: HubSection[] = [
  { id: "who-we-are", labelKey: "nav.aboutMenu.whoWeAre" },
  { id: "regulation", labelKey: "nav.aboutMenu.regulation" },
  { id: "university-in-numbers", labelKey: "nav.aboutMenu.universityInNumbers" },
  { id: "organizational-structure", labelKey: "nav.aboutMenu.organizationalStructure" },
  { id: "leadership-and-councils", labelKey: "nav.aboutMenu.leadershipAndCouncils" },
  { id: "accreditation-and-license", labelKey: "nav.aboutMenu.accreditationAndLicense" },
  { id: "workers-union-committee", labelKey: "nav.aboutMenu.workersUnionCommittee" },
  { id: "why-tues", labelKey: "nav.aboutMenu.whyTues" },
];

export const researchHubSections: HubSection[] = [
  { id: "scientific-publications-journals", labelKey: "nav.researchMenu.scientificPublicationsJournals" },
  { id: "seminars-and-conferences", labelKey: "nav.researchMenu.seminarsConferences" },
  { id: "academic-council", labelKey: "nav.researchMenu.academicCouncil" },
  { id: "research-papers-and-publications", labelKey: "nav.researchMenu.researchPapersPublications" },
  { id: "entrepreneurial-and-innovation-clubs", labelKey: "nav.researchMenu.entrepreneurialInnovationClubs" },
];

export const admissionsHubSections: HubSection[] = [
  { id: "study-programs", labelKey: "nav.admissionsMenu.studyPrograms" },
  { id: "regulations-and-requirements", labelKey: "nav.admissionsMenu.regulationsAndRequirements" },
  { id: "secondary-education-requirements", labelKey: "nav.admissionsMenu.secondaryEducationRequirements" },
  { id: "contract-amounts-tuition", labelKey: "nav.admissionsMenu.contractAmountsTuition" },
];

export const mediaHubSections: HubSection[] = [
  { id: "video-gallery", labelKey: "nav.newsMenu.videoGallery" },
  { id: "photo-gallery", labelKey: "nav.newsMenu.photoGallery" },
];

export type TopNavGroup = "about" | "research" | "admissions" | "media";

const SECTIONS_BY_GROUP: Record<TopNavGroup, HubSection[]> = {
  about: aboutHubSections,
  research: researchHubSections,
  admissions: admissionsHubSections,
  media: mediaHubSections,
};

export function subPagePath(group: TopNavGroup, sectionId: string): string {
  if (group === "admissions" && sectionId === "study-programs") return "/programs";
  return `/${group}/${sectionId}`;
}

function hrefMap(group: TopNavGroup, sections: HubSection[]): Record<string, string> {
  return Object.fromEntries(sections.map((s) => [s.labelKey, subPagePath(group, s.id)]));
}

/** i18n keys used in header dropdowns → router href */
export const topNavItemHref: Record<string, string> = {
  ...hrefMap("about", aboutHubSections),
  ...hrefMap("research", researchHubSections),
  ...hrefMap("admissions", admissionsHubSections),
  ...hrefMap("media", mediaHubSections),
  "secondNavUniversity.license": "/about/regulation",
  "secondNavUniversity.universityMission": "/university-mission",
  "secondNavUniversity.charter": "/about/regulation",
  "secondNavUniversity.organizationalStructure": "/about/organizational-structure",
  "secondNavUniversity.councils": "/about/leadership-and-councils",
  "secondNavUniversity.ratings": "/university-ratings",
  "secondNavUniversity.requisites": "/university-requisites",
  "secondNavUniversity.financialStatements": "/university-financial-statements",
  "secondNavUniversity.universityInNumbers": "/about/university-in-numbers",
  "secondNavUniversity.famousGraduates": "/university-famous-graduates",
  "secondNavUniversity.faculties": "/about/organizational-structure",
  "secondNavUniversity.departments": "/about/organizational-structure",
  "secondNavUniversity.campusCulture": "/university-campus-culture",
  "secondNavUniversity.tradeUnionCommittee": "/about/workers-union-committee",
  "secondNavUniversity.accreditation": "/about/accreditation-and-license",
  "nav.newsMenu.latestNews": "/news",
  "nav.newsMenu.upcomingEvents": "/events",
  "secondNavEducation.bachelor": "/education/bachelor",
  "secondNavEducation.courseCatalogue": "/education/bachelor",
  "secondNavEducation.mastersDegree": "/education/masters",
  "secondNavEducation.qualificationRequirements": "/education/qualification-requirements",
  "secondNavEducation.resources": "https://lib.tues.uz/",
  "secondNavEducation.distanceLearningSystem": "https://lms.tues.uz/",
  "secondNavAdmission2025.apply": "/admission-2025/apply",
  "secondNavAdmission2025.regulationSecondaryEducation":
    "/admission-2025/regulation-secondary-education",
  "secondNavAdmission2025.transferOfStudies": "/admission-2025/transfer-of-studies",
  "secondNavAdmission2025.informationTransferEducation":
    "/admission-2025/information-transfer-of-education",
  "secondNavAdmission2025.informationContractAmounts": "/admission-2025/contract-amounts",
  "secondNavAdmission2025.menu": "/admission-2025/menu",
  "secondNavAdmission2025.contactingAdmission": "/admission-2025/contacting-admission",
  "secondNavAdmission2025.faq": "/admission-2025/faq",
  "secondNavStudentLife.help247": "/student-life/24-7-help",
  "secondNavStudentLife.healthSupportService": "/student-life/health-support",
  "secondNavStudentLife.socialLife": "/student-life/social-life",
  "secondNavStudentLife.socialRooms": "/student-life/social-rooms",
  "secondNavStudentLife.supportCenterMinorityGroups": "/student-life/support-center-minority-groups",
  "secondNavStudentLife.dormitory": "/student-life/dormitory",
  "secondNavStudentLife.sportFacilities": "/student-life/sport-facilities",
  "secondNavStudentLife.cafeterias": "/student-life/cafeterias",
  "secondNavStudentLife.bookstore": "/student-life/bookstore",
  "secondNavStudentLife.facilitiesForDisabled": "/student-life/facilities-for-disabled",
  "secondNavStudentLife.studentOpinion": "/student-life/student-opinion",
  "secondNavStudentLife.studentAcademicSupport": "/student-life/student-academic-support",
  "secondNavStudentLife.communityClubs": "/student-life/community-clubs",
  "secondNavScience.scientificArticles": "/science/scientific-articles",
  "secondNavScience.certificates": "/science/certificates",
  "secondNavScience.entrepreneurialClubs": "/science/entrepreneurial-clubs",
  "secondNavScience.centerResearchSustainableInnovativeDevelopment": "/science/center-research-sustainable-innovation",
  "secondNavInformationServices.latestNews": "/news",
  "secondNavInformationServices.upcomingEvents": "/events",
  "secondNavInformationServices.aboutUniversity": "/information-services/about-university",
  "secondNavInformationServices.videoGallery": subPagePath("media", "video-gallery"),
  "secondNavInformationServices.photoGallery": subPagePath("media", "photo-gallery"),
  "secondNavInformationServices.officialDocuments": "/information-services/official-documents",
  "secondNavInternationalization.departmentInternationalRelationsEmployees":
    "/internationalization/department-international-relations-employees",
  "secondNavInternationalization.internationalGrants": "/internationalization/international-grants",
  "secondNavInternationalization.internationalConferences":
    "/internationalization/international-conferences",
  "secondNavInternationalization.professionalDevelopmentEducationChoir":
    "/internationalization/professional-development-education-choir",
  "secondNavInternationalization.advancedTrainingProgramsForeignTeachers":
    "/internationalization/advanced-training-foreign-teachers",
  "secondNavInternationalization.internationalSupportCenter":
    "/internationalization/international-support-center",
  "secondNavItems.academicPositions": "/vacancies/academic-positions",
  "secondNavItems.administrativePositions": "/vacancies/administrative-positions",
  "secondNavItems.researchPositions": "/vacancies/research-positions",
  "secondNavItems.howToApply": "/vacancies/how-to-apply",
  "secondNavItems.benefits": "/vacancies/benefits",
};

export function getTopNavItemHref(labelKey: string): string {
  if (topNavItemHref[labelKey]) return topNavItemHref[labelKey];
  if (labelKey.startsWith("secondNavUniversity.")) return "/about";
  if (labelKey.startsWith("secondNavEducation.")) return "#";
  if (labelKey.startsWith("secondNavScience.")) return "/science/scientific-articles";
  if (labelKey.startsWith("secondNavInternationalization.")) return "/internationalization/international-support-center";
  if (labelKey.startsWith("secondNavStudentLife.")) return "/student-life/community-clubs";
  if (labelKey.startsWith("secondNavAdmission2025.")) return "/admission-2025/menu";
  if (labelKey.startsWith("secondNavInformationServices.")) return "/information-services/about-university";
  if (labelKey.startsWith("secondNavVacancies.") || labelKey.startsWith("secondNavItems.")) return "/about/organizational-structure";
  if (labelKey.startsWith("nav.")) return "/about";
  return "/about";
}

export function getTopNavSubPageMeta(
  group: TopNavGroup,
  slug: string | undefined,
): HubSection | undefined {
  if (!slug) return undefined;
  return SECTIONS_BY_GROUP[group].find((s) => s.id === slug);
}

export function getSectionsForGroup(group: TopNavGroup): HubSection[] {
  return SECTIONS_BY_GROUP[group];
}

