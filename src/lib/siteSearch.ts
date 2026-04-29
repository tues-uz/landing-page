import type { EventItem, NewsItem, ProgramItem } from "@/api/client";

export function filterNewsByQuery(items: NewsItem[], search: string): NewsItem[] {
  const q = search.trim().toLowerCase();
  if (!q) return items;
  return items.filter(
    (item) =>
      item.title.toLowerCase().includes(q) ||
      item.excerpt.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.author.toLowerCase().includes(q),
  );
}

export function filterEventsByQuery(items: EventItem[], search: string): EventItem[] {
  const q = search.trim().toLowerCase();
  if (!q) return [];
  return items.filter(
    (item) =>
      item.title.toLowerCase().includes(q) ||
      item.location.toLowerCase().includes(q) ||
      item.date.toLowerCase().includes(q) ||
      item.time.toLowerCase().includes(q),
  );
}

export function filterProgramsByQuery(items: ProgramItem[], search: string): ProgramItem[] {
  const q = search.trim().toLowerCase();
  if (!q) return [];
  const hay = (s: string) => s.toLowerCase();
  return items.filter(
    (item) =>
      hay(item.title).includes(q) ||
      hay(item.description).includes(q) ||
      hay(item.longDescription).includes(q) ||
      hay(item.degreeType).includes(q) ||
      hay(item.slug).includes(q) ||
      hay(item.introduction).includes(q) ||
      hay(item.careerOutcomes).includes(q) ||
      item.highlights.some((h) => hay(h).includes(q)),
  );
}

export type StaticSearchRoute = { id: string; path: string; label: string };

export function getStaticSearchRoutes(translate: (key: string) => string): StaticSearchRoute[] {
  return [
    { id: "home", path: "/", label: translate("searchRoutes.home") },
    { id: "about", path: "/about", label: translate("searchRoutes.about") },
    {
      id: "universityMission",
      path: "/university-mission",
      label: translate("searchRoutes.universityMission"),
    },
    {
      id: "universityRequisites",
      path: "/university-requisites",
      label: translate("searchRoutes.universityRequisites"),
    },
    {
      id: "famousGraduates",
      path: "/university-famous-graduates",
      label: translate("searchRoutes.famousGraduates"),
    },
    {
      id: "universityFaculties",
      path: "/university-faculties",
      label: translate("searchRoutes.universityFaculties"),
    },
    {
      id: "universityDepartments",
      path: "/university-departments",
      label: translate("searchRoutes.universityDepartments"),
    },
    {
      id: "facultyOfMedicine",
      path: "/university-faculties/medicine",
      label: translate("searchRoutes.facultyOfMedicine"),
    },
    {
      id: "facultyOfPedagogy",
      path: "/university-faculties/pedagogy-social-humanities",
      label: translate("searchRoutes.facultyOfPedagogy"),
    },
    {
      id: "facultyOfEconomics",
      path: "/university-faculties/economics-information-technologies",
      label: translate("searchRoutes.facultyOfEconomics"),
    },
    { id: "research", path: "/research", label: translate("searchRoutes.research") },
    { id: "admissions", path: "/admissions", label: translate("searchRoutes.admissions") },
    { id: "programs", path: "/programs", label: translate("searchRoutes.programs") },
    { id: "bachelor", path: "/education/bachelor", label: translate("searchRoutes.bachelor") },
    { id: "mastersDegree", path: "/education/masters", label: translate("searchRoutes.mastersDegree") },
    {
      id: "qualificationRequirements",
      path: "/education/qualification-requirements",
      label: translate("searchRoutes.qualificationRequirements"),
    },
    {
      id: "regulationSecondaryEducation",
      path: "/admission-2025/regulation-secondary-education",
      label: translate("searchRoutes.regulationSecondaryEducation"),
    },
    {
      id: "informationTransferEducationPage",
      path: "/admission-2025/information-transfer-of-education",
      label: translate("searchRoutes.informationTransferEducationPage"),
    },
    {
      id: "informationTransferCabinet578",
      path: "/admission-2025/information-transfer-of-education/cabinet-resolution-578",
      label: translate("searchRoutes.informationTransferCabinet578"),
    },
    {
      id: "contractAmountsTuition",
      path: "/admission-2025/contract-amounts",
      label: translate("searchRoutes.contractAmountsTuition"),
    },
    {
      id: "admission2025Menu",
      path: "/admission-2025/menu",
      label: translate("searchRoutes.admission2025Menu"),
    },
    {
      id: "presidentOrderStateOrderParameters",
      path: "/admission-2025/menu/state-order-parameters-2024-2025",
      label: translate("searchRoutes.presidentOrderStateOrderParameters"),
    },
    {
      id: "contactingAdmission",
      path: "/admission-2025/contacting-admission",
      label: translate("searchRoutes.contactingAdmission"),
    },
    { id: "news", path: "/news", label: translate("searchRoutes.news") },
    { id: "events", path: "/events", label: translate("searchRoutes.events") },
    { id: "media", path: "/media", label: translate("searchRoutes.media") },
    {
      id: "scientificArticles",
      path: "/science/scientific-articles",
      label: translate("searchRoutes.scientificArticles"),
    },
    {
      id: "entrepreneurialClubs",
      path: "/science/entrepreneurial-clubs",
      label: translate("searchRoutes.entrepreneurialClubs"),
    },
    {
      id: "scienceCertificates",
      path: "/science/certificates",
      label: translate("searchRoutes.scienceCertificates"),
    },
    {
      id: "centerResearchSustainable",
      path: "/science/center-research-sustainable-innovation",
      label: translate("searchRoutes.centerResearchSustainable"),
    },
    { id: "virtualTour", path: "/virtual-tour", label: translate("searchRoutes.virtualTour") },
    { id: "careerCentre", path: "/student-life/career-centre", label: translate("searchRoutes.careerCentre") },
    { id: "help247", path: "/student-life/24-7-help", label: translate("searchRoutes.help247") },
    { id: "healthSupport", path: "/student-life/health-support", label: translate("searchRoutes.healthSupport") },
    { id: "socialLife", path: "/student-life/social-life", label: translate("searchRoutes.socialLife") },
    { id: "socialRooms", path: "/student-life/social-rooms", label: translate("searchRoutes.socialRooms") },
    {
      id: "supportCenterMinorityGroups",
      path: "/student-life/support-center-minority-groups",
      label: translate("searchRoutes.supportCenterMinorityGroups"),
    },
    { id: "dormitory", path: "/student-life/dormitory", label: translate("searchRoutes.dormitory") },
    { id: "sportFacilities", path: "/student-life/sport-facilities", label: translate("searchRoutes.sportFacilities") },
    { id: "cafeterias", path: "/student-life/cafeterias", label: translate("searchRoutes.cafeterias") },
    { id: "bookstore", path: "/student-life/bookstore", label: translate("searchRoutes.bookstore") },
    { id: "studentOpinion", path: "/student-life/student-opinion", label: translate("searchRoutes.studentOpinion") },
    {
      id: "facilitiesForDisabled",
      path: "/student-life/facilities-for-disabled",
      label: translate("searchRoutes.facilitiesForDisabled"),
    },
    {
      id: "studentAcademicSupport",
      path: "/student-life/student-academic-support",
      label: translate("searchRoutes.studentAcademicSupport"),
    },
    { id: "communityClubs", path: "/student-life/community-clubs", label: translate("searchRoutes.communityClubs") },
    { id: "qizlarjonCharity", path: "/student-life/community-clubs/qizlarjon-charity", label: translate("searchRoutes.qizlarjonCharity") },
    {
      id: "studentTheaterStudio",
      path: "/student-life/community-clubs/student-theater-studio-contest",
      label: translate("searchRoutes.studentTheaterStudio"),
    },
    {
      id: "mushoiraClubHonored",
      path: "/student-life/community-clubs/mushoira-club-honored",
      label: translate("searchRoutes.mushoiraClubHonored"),
    },
    {
      id: "clubsAndCircles",
      path: "/student-life/community-clubs/clubs-and-circles",
      label: translate("searchRoutes.clubsAndCircles"),
    },
    {
      id: "interfacultyStudentTheatreStudio",
      path: "/student-life/community-clubs/interfaculty-student-theatre-studio-contest",
      label: translate("searchRoutes.interfacultyStudentTheatreStudio"),
    },
    {
      id: "qalqonShields",
      path: "/student-life/community-clubs/qalqon-shields",
      label: translate("searchRoutes.qalqonShields"),
    },
    {
      id: "qizlarjonClub",
      path: "/student-life/community-clubs/qizlarjon-club",
      label: translate("searchRoutes.qizlarjonClub"),
    },
    {
      id: "leaderGirlsClub",
      path: "/student-life/community-clubs/leader-girls-club",
      label: translate("searchRoutes.leaderGirlsClub"),
    },
    {
      id: "fineAppliedArtsClub",
      path: "/student-life/community-clubs/fine-and-applied-arts-club",
      label: translate("searchRoutes.fineAppliedArtsClub"),
    },
    {
      id: "youthLeaders",
      path: "/student-life/community-clubs/youth-leaders",
      label: translate("searchRoutes.youthLeaders"),
    },
    {
      id: "aboutUniversityPage",
      path: "/information-services/about-university",
      label: translate("searchRoutes.aboutUniversityPage"),
    },
    {
      id: "departmentIntlRelEmployees",
      path: "/internationalization/department-international-relations-employees",
      label: translate("searchRoutes.departmentIntlRelEmployees"),
    },
    {
      id: "intlRelRoleViceRector",
      path: "/internationalization/department-international-relations-employees/vice-rector-international-cooperation",
      label: translate("searchRoutes.intlRelRoleViceRector"),
    },
    {
      id: "intlRelRoleHead",
      path: "/internationalization/department-international-relations-employees/head-department-international-cooperation",
      label: translate("searchRoutes.intlRelRoleHead"),
    },
    {
      id: "intlRelRoleLead",
      path: "/internationalization/department-international-relations-employees/lead-specialist-international-cooperation",
      label: translate("searchRoutes.intlRelRoleLead"),
    },
    {
      id: "internationalGrantsPage",
      path: "/internationalization/international-grants",
      label: translate("searchRoutes.internationalGrantsPage"),
    },
    {
      id: "internationalSupportCenterPage",
      path: "/internationalization/international-support-center",
      label: translate("searchRoutes.internationalSupportCenterPage"),
    },
    {
      id: "internationalSupportCenterAbout",
      path: "/internationalization/international-support-center/about",
      label: translate("searchRoutes.internationalSupportCenterAbout"),
    },
    {
      id: "internationalConferencesPage",
      path: "/internationalization/international-conferences",
      label: translate("searchRoutes.internationalConferencesPage"),
    },
    {
      id: "professionalDevelopmentChoirPage",
      path: "/internationalization/professional-development-education-choir",
      label: translate("searchRoutes.professionalDevelopmentChoirPage"),
    },
    {
      id: "advancedTrainingForeignTeachersPage",
      path: "/internationalization/advanced-training-foreign-teachers",
      label: translate("searchRoutes.advancedTrainingForeignTeachersPage"),
    },
    {
      id: "advancedTrainingForeignTeachersFzu",
      path: "/internationalization/advanced-training-foreign-teachers/fzu-institute-physics",
      label: translate("searchRoutes.advancedTrainingForeignTeachersFzu"),
    },
    {
      id: "advancedTrainingForeignTeachersSouthKorea",
      path: "/internationalization/advanced-training-foreign-teachers/south-korea-universities",
      label: translate("searchRoutes.advancedTrainingForeignTeachersSouthKorea"),
    },
    {
      id: "advancedTrainingForeignTeachersGuangzhou",
      path: "/internationalization/advanced-training-foreign-teachers/guangzhou-industrial-visit",
      label: translate("searchRoutes.advancedTrainingForeignTeachersGuangzhou"),
    },
    {
      id: "professionalDevelopmentChoirExchangeMedipol",
      path: "/internationalization/professional-development-education-choir/exchange-experience-medipol-cooperation",
      label: translate("searchRoutes.professionalDevelopmentChoirExchangeMedipol"),
    },
    {
      id: "professionalDevelopmentChoirMedipolClinic",
      path: "/internationalization/professional-development-education-choir/istanbul-medipol-clinic-conditions-opportunities",
      label: translate("searchRoutes.professionalDevelopmentChoirMedipolClinic"),
    },
    {
      id: "professionalDevelopmentChoirMedipolLaboratory",
      path: "/internationalization/professional-development-education-choir/medipol-laboratory",
      label: translate("searchRoutes.professionalDevelopmentChoirMedipolLaboratory"),
    },
    {
      id: "professionalDevelopmentChoirPhysiotherapy",
      path: "/internationalization/professional-development-education-choir/medipol-physiotherapy-practice",
      label: translate("searchRoutes.professionalDevelopmentChoirPhysiotherapy"),
    },
    {
      id: "professionalDevelopmentChoirTurkeyHistoricSites",
      path: "/internationalization/professional-development-education-choir/turkey-historic-sites",
      label: translate("searchRoutes.professionalDevelopmentChoirTurkeyHistoricSites"),
    },
    {
      id: "professionalDevelopmentChoirIndonesiaInternshipDeparture",
      path: "/internationalization/professional-development-education-choir/indonesia-internship-departure",
      label: translate("searchRoutes.professionalDevelopmentChoirIndonesiaInternshipDeparture"),
    },
    {
      id: "professionalDevelopmentChoirIndonesiaSummerProgram",
      path: "/internationalization/professional-development-education-choir/indonesia-summer-education-program",
      label: translate("searchRoutes.professionalDevelopmentChoirIndonesiaSummerProgram"),
    },
    {
      id: "professionalDevelopmentChoirIndonesiaMedicalInternship",
      path: "/internationalization/professional-development-education-choir/indonesia-medical-internship-upi",
      label: translate("searchRoutes.professionalDevelopmentChoirIndonesiaMedicalInternship"),
    },
    {
      id: "internationalConferenceScientificTues",
      path: "/internationalization/international-conferences/international-scientific-conference-tues",
      label: translate("searchRoutes.internationalConferenceScientificTues"),
    },
    {
      id: "internationalConferenceTourismSector2025",
      path: "/internationalization/international-conferences/tourism-sector-international-experience-2025",
      label: translate("searchRoutes.internationalConferenceTourismSector2025"),
    },
    {
      id: "internationalConferencePreventiveMedicine",
      path: "/internationalization/international-conferences/preventive-medicine-conference",
      label: translate("searchRoutes.internationalConferencePreventiveMedicine"),
    },
    {
      id: "internationalConferenceLinguisticsLanguageEducation",
      path: "/internationalization/international-conferences/innovations-linguistics-language-education",
      label: translate("searchRoutes.internationalConferenceLinguisticsLanguageEducation"),
    },
    {
      id: "internationalConferenceGlobalInnovationsLanguageEducation",
      path: "/internationalization/international-conferences/global-innovations-language-education",
      label: translate("searchRoutes.internationalConferenceGlobalInnovationsLanguageEducation"),
    },
    {
      id: "internationalConferenceLinguisticsLiteraryStudies",
      path: "/internationalization/international-conferences/current-issues-linguistics-literary-studies",
      label: translate("searchRoutes.internationalConferenceLinguisticsLiteraryStudies"),
    },
    {
      id: "internationalCongressGreenTransformation",
      path: "/internationalization/international-conferences/sustainability-green-transformation-congress",
      label: translate("searchRoutes.internationalCongressGreenTransformation"),
    },
    {
      id: "internationalMedicalOlympiadTermez2026",
      path: "/internationalization/international-conferences/international-medical-olympiad-termiz-2026",
      label: translate("searchRoutes.internationalMedicalOlympiadTermez2026"),
    },
    {
      id: "internationalGrantJapanMatsumae",
      path: "/internationalization/international-grants/japan-matsumae-foundation",
      label: translate("searchRoutes.internationalGrantJapanMatsumae"),
    },
    {
      id: "internationalGrantUsaHumphrey",
      path: "/internationalization/international-grants/hubert-h-humphrey-fellowship",
      label: translate("searchRoutes.internationalGrantUsaHumphrey"),
    },
    {
      id: "internationalGrantMext2026",
      path: "/internationalization/international-grants/mext-japan-2026",
      label: translate("searchRoutes.internationalGrantMext2026"),
    },
  ];
}

function matchStaticRoutes(routes: StaticSearchRoute[], query: string): StaticSearchRoute[] {
  const ql = query.trim().toLowerCase();
  if (!ql) return [];
  return routes.filter((r) => {
    const pathTail = r.path.replace(/^\//, "").toLowerCase();
    return r.label.toLowerCase().includes(ql) || pathTail.includes(ql) || r.path.toLowerCase().includes(ql);
  });
}

export type SiteSearchHitKind = "page" | "program" | "event" | "news";

export type SiteSearchHit = {
  id: string;
  kind: SiteSearchHitKind;
  title: string;
  badge: string;
  subtitle: string;
  to: string;
};

export type SiteSearchKindLabels = Record<SiteSearchHitKind, string>;

export function buildSiteSearchHits(options: {
  query: string;
  news: NewsItem[];
  events: EventItem[];
  programs: ProgramItem[];
  staticRoutes: StaticSearchRoute[];
  kindLabels: SiteSearchKindLabels;
}): SiteSearchHit[] {
  const q = options.query.trim();
  if (!q) return [];

  const { kindLabels } = options;
  const hits: SiteSearchHit[] = [];

  for (const r of matchStaticRoutes(options.staticRoutes, q)) {
    hits.push({
      id: `page-${r.id}`,
      kind: "page",
      title: r.label,
      badge: kindLabels.page,
      subtitle: r.path === "/" ? "" : r.path,
      to: r.path,
    });
  }

  for (const p of filterProgramsByQuery(options.programs, q)) {
    hits.push({
      id: `program-${p.id}`,
      kind: "program",
      title: p.title,
      badge: kindLabels.program,
      subtitle: [p.degreeType, p.duration].filter(Boolean).join(" · "),
      to: `/programs/${p.slug}`,
    });
  }

  for (const e of filterEventsByQuery(options.events, q)) {
    hits.push({
      id: `event-${e.id}`,
      kind: "event",
      title: e.title,
      badge: kindLabels.event,
      subtitle: [e.date, e.location].filter(Boolean).join(" · "),
      to: `/events/${e.id}`,
    });
  }

  for (const n of filterNewsByQuery(options.news, q)) {
    hits.push({
      id: `news-${n.id}`,
      kind: "news",
      title: n.title,
      badge: kindLabels.news,
      subtitle: [n.category, n.date].filter(Boolean).join(" · "),
      to: `/news/${n.slug}`,
    });
  }

  return hits;
}
