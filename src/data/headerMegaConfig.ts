import type { LucideIcon } from "lucide-react";
import {
  FileCheck,
  Target,
  FileText,
  Network,
  Users,
  Award,
  FileSearch,
  DollarSign,
  BarChart3,
  GraduationCap,
  School,
  Building2,
  FolderOpen,
  ExternalLink,
  Handshake,
  ClipboardList,
  BookOpen,
  FlaskConical,
  Globe,
  Heart,
  CalendarCheck,
  Info,
  Briefcase,
} from "lucide-react";

/** Stable id for mega menu open state (not translated). */
export type MegaSectionId =
  | "university"
  | "education"
  | "science"
  | "internationalization"
  | "studentLife"
  | "admission2025"
  | "informationServices"
  | "vacancies";

export type MegaLinkDef = { href: string; icon: LucideIcon; labelKey: string };

export type MegaSectionDef = {
  id: MegaSectionId;
  titleKey: string;
  descriptionKey: string;
  links: MegaLinkDef[];
};

/** University column — unique labels (header.university.*). */
export const universityMegaLinks: MegaLinkDef[] = [
  { href: "/about/regulation", icon: FileCheck, labelKey: "header.university.license" },
  { href: "/university-mission", icon: Target, labelKey: "header.university.mission" },
  { href: "/about/regulation", icon: FileText, labelKey: "header.university.charter" },
  { href: "/about/organizational-structure", icon: Network, labelKey: "header.university.structure" },
  { href: "#councils", icon: Users, labelKey: "header.university.councils" },
  { href: "/university-ratings", icon: Award, labelKey: "header.university.ratings" },
  { href: "/university-requisites", icon: FileSearch, labelKey: "header.university.requisites" },
  { href: "/university-financial-statements", icon: DollarSign, labelKey: "header.university.financialStatements" },
  { href: "/about/university-in-numbers", icon: BarChart3, labelKey: "header.university.numbers" },
  { href: "#accreditation", icon: Award, labelKey: "header.university.accreditation" },
  { href: "/university-famous-graduates", icon: GraduationCap, labelKey: "header.university.graduates" },
  { href: "/about/organizational-structure", icon: School, labelKey: "header.university.faculties" },
  { href: "/about/organizational-structure", icon: Building2, labelKey: "header.university.departments" },
  { href: "#centers", icon: FolderOpen, labelKey: "header.university.centers" },
  { href: "#open-data", icon: ExternalLink, labelKey: "header.university.openData" },
  { href: "/about/workers-union-committee", icon: Handshake, labelKey: "header.university.tradeUnion" },
  { href: "#contract-prices", icon: ClipboardList, labelKey: "header.university.contractPrices" },
];

export const megaSections: MegaSectionDef[] = [
  {
    id: "university",
    titleKey: "footerMenu.university.title",
    descriptionKey: "header.mega.university.description",
    links: universityMegaLinks,
  },
  {
    id: "education",
    titleKey: "footerMenu.education.title",
    descriptionKey: "header.mega.education.description",
    links: [
      { href: "#academic-programs", icon: BookOpen, labelKey: "footerMenu.education.academicPrograms" },
      { href: "#courses", icon: BookOpen, labelKey: "footerMenu.education.courses" },
      { href: "#academic-calendar", icon: CalendarCheck, labelKey: "footerMenu.education.calendar" },
      { href: "#faculty", icon: Users, labelKey: "footerMenu.education.faculty" },
      { href: "#departments", icon: Building2, labelKey: "footerMenu.education.departments" },
    ],
  },
  {
    id: "science",
    titleKey: "footerMenu.science.title",
    descriptionKey: "header.mega.science.description",
    links: [
      { href: "#research-areas", icon: FlaskConical, labelKey: "footerMenu.science.researchAreas" },
      { href: "#laboratories", icon: FlaskConical, labelKey: "footerMenu.science.laboratories" },
      { href: "#publications", icon: FileText, labelKey: "footerMenu.science.publications" },
      { href: "#innovation", icon: Award, labelKey: "footerMenu.science.innovation" },
      { href: "#collaborations", icon: Network, labelKey: "footerMenu.science.collaborations" },
    ],
  },
  {
    id: "internationalization",
    titleKey: "footerMenu.international.title",
    descriptionKey: "header.mega.international.description",
    links: [
      { href: "#exchange", icon: Globe, labelKey: "footerMenu.international.exchange" },
      { href: "#partnerships", icon: Globe, labelKey: "footerMenu.international.partnerships" },
      { href: "#international-students", icon: Users, labelKey: "footerMenu.international.intlStudents" },
      { href: "#study-abroad", icon: Globe, labelKey: "footerMenu.international.studyAbroad" },
      { href: "#global-initiatives", icon: Globe, labelKey: "footerMenu.international.global" },
    ],
  },
  {
    id: "studentLife",
    titleKey: "footerMenu.studentLife.title",
    descriptionKey: "header.mega.studentLife.description",
    links: [
      { href: "#campus-life", icon: Heart, labelKey: "footerMenu.studentLife.campus" },
      { href: "#student-clubs", icon: Users, labelKey: "footerMenu.studentLife.clubs" },
      { href: "#housing", icon: Building2, labelKey: "footerMenu.studentLife.housing" },
      { href: "#dining", icon: Heart, labelKey: "footerMenu.studentLife.dining" },
      { href: "#wellness", icon: Heart, labelKey: "footerMenu.studentLife.wellness" },
    ],
  },
  {
    id: "admission2025",
    titleKey: "footerMenu.admission.title",
    descriptionKey: "header.mega.admission.description",
    links: [
      { href: "#requirements", icon: FileText, labelKey: "footerMenu.admission.requirements" },
      { href: "#application", icon: ClipboardList, labelKey: "footerMenu.admission.application" },
      { href: "#deadlines", icon: CalendarCheck, labelKey: "footerMenu.admission.deadlines" },
      { href: "#scholarships", icon: Award, labelKey: "footerMenu.admission.scholarships" },
      { href: "/admission-2025/faq", icon: Info, labelKey: "footerMenu.admission.faqs" },
    ],
  },
  {
    id: "informationServices",
    titleKey: "footerMenu.infoServices.title",
    descriptionKey: "header.mega.infoServices.description",
    links: [
      { href: "#library", icon: BookOpen, labelKey: "footerMenu.infoServices.library" },
      { href: "#it-services", icon: Info, labelKey: "footerMenu.infoServices.it" },
      { href: "#online-resources", icon: ExternalLink, labelKey: "footerMenu.infoServices.online" },
      { href: "#support", icon: Info, labelKey: "footerMenu.infoServices.support" },
      { href: "#help-desk", icon: Info, labelKey: "footerMenu.infoServices.helpDesk" },
    ],
  },
  {
    id: "vacancies",
    titleKey: "footerMenu.vacancies.title",
    descriptionKey: "header.mega.vacancies.description",
    links: [
      { href: "/vacancies/academic-positions", icon: Briefcase, labelKey: "footerMenu.vacancies.academic" },
      { href: "/vacancies/administrative-positions", icon: Briefcase, labelKey: "footerMenu.vacancies.admin" },
      { href: "/vacancies/research-positions", icon: FlaskConical, labelKey: "footerMenu.vacancies.research" },
      { href: "/vacancies/how-to-apply", icon: FileText, labelKey: "footerMenu.vacancies.howToApply" },
      { href: "/vacancies/benefits", icon: Award, labelKey: "footerMenu.vacancies.benefits" },
    ],
  },
];
