import { useState, useRef, useEffect, useLayoutEffect, useMemo, useCallback } from "react";
import { createPortal } from "react-dom";
import {
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  Phone,
  Mail,
  Rocket,
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
  Search,
  Loader2,
  Newspaper,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useSiteSearchContent } from "@/hooks/useSiteSearchContent";
import { buildSiteSearchHits, getStaticSearchRoutes } from "@/lib/siteSearch";
import { cn } from "@/lib/utils";
import { getTopNavItemHref } from "@/config/topNavHubData";

type MegaMenuLink = { href: string; label: string; icon: LucideIcon };
type MegaMenuItem = { key: string; labelKey: string; description: string; links: MegaMenuLink[] };

const universityMegaLinks: MegaMenuLink[] = [
  { href: "#license", label: "License", icon: FileCheck },
  { href: "#mission", label: "University Mission", icon: Target },
  { href: "#charter", label: "Charter", icon: FileText },
  { href: "#structure", label: "Organizational structure", icon: Network },
  { href: "#councils", label: "Councils", icon: Users },
  { href: "#ratings", label: "Ratings", icon: Award },
  { href: "#requisites", label: "Requisites", icon: FileSearch },
  { href: "#financial-statements", label: "Financial statements", icon: DollarSign },
  { href: "#numbers", label: "University in numbers", icon: BarChart3 },
  { href: "#accreditation", label: "Accreditation", icon: Award },
  { href: "#graduates", label: "Famous graduates", icon: GraduationCap },
  { href: "#faculties", label: "Faculties", icon: School },
  { href: "#departments", label: "Departments", icon: Building2 },
  { href: "#centers", label: "Center and departments", icon: FolderOpen },
  { href: "#open-data", label: "Open data", icon: ExternalLink },
  { href: "#trade-union", label: "Trade union committee", icon: Handshake },
  { href: "#contract-prices", label: "Contract prices", icon: ClipboardList },
];

const secondNavMega: MegaMenuItem[] = [
  {
    key: "university",
    labelKey: "secondNav.university",
    description:
      "Currently, the university has 24 Bachelor's and 13 master's degrees. An electronic IRC is formed on the necessary books on the education of students. Applicants may be aware of the information on the admission process to the University remotely.",
    links: universityMegaLinks,
  },
  {
    key: "education",
    labelKey: "secondNav.education",
    description: "Academic programs, courses, calendar, faculty and departments.",
    links: [
      { href: "#academic-programs", label: "Academic Programs", icon: BookOpen },
      { href: "#courses", label: "Courses", icon: BookOpen },
      { href: "#academic-calendar", label: "Academic Calendar", icon: CalendarCheck },
      { href: "#faculty", label: "Faculty", icon: Users },
      { href: "#departments", label: "Departments", icon: Building2 },
    ],
  },
  {
    key: "science",
    labelKey: "secondNav.science",
    description: "Research areas, laboratories, publications and collaborations.",
    links: [
      { href: "#research-areas", label: "Research Areas", icon: FlaskConical },
      { href: "#laboratories", label: "Laboratories", icon: FlaskConical },
      { href: "#publications", label: "Publications", icon: FileText },
      { href: "#innovation", label: "Innovation", icon: Award },
      { href: "#collaborations", label: "Collaborations", icon: Network },
    ],
  },
  {
    key: "internationalization",
    labelKey: "secondNav.internationalization",
    description: "Exchange programs, global partnerships and international students.",
    links: [
      { href: "#exchange", label: "Exchange Programs", icon: Globe },
      { href: "#partnerships", label: "Global Partnerships", icon: Globe },
      { href: "#international-students", label: "International Students", icon: Users },
      { href: "#study-abroad", label: "Study Abroad", icon: Globe },
      { href: "#global-initiatives", label: "Global Initiatives", icon: Globe },
    ],
  },
  {
    key: "studentLife",
    labelKey: "secondNav.studentLife",
    description: "Campus life, clubs, housing, dining and wellness.",
    links: [
      { href: "#campus-life", label: "Campus Life", icon: Heart },
      { href: "#student-clubs", label: "Student Clubs", icon: Users },
      { href: "#housing", label: "Housing", icon: Building2 },
      { href: "#dining", label: "Dining", icon: Heart },
      { href: "#wellness", label: "Wellness", icon: Heart },
    ],
  },
  {
    key: "admission2025",
    labelKey: "secondNav.admission2025",
    description: "Requirements, application process, deadlines and scholarships.",
    links: [
      { href: "#requirements", label: "Requirements", icon: FileText },
      { href: "#application", label: "Application Process", icon: ClipboardList },
      { href: "#deadlines", label: "Deadlines", icon: CalendarCheck },
      { href: "#scholarships", label: "Scholarships", icon: Award },
      { href: "#faqs", label: "FAQs", icon: Info },
    ],
  },
  {
    key: "informationServices",
    labelKey: "secondNav.informationServices",
    description: "Library, IT services, online resources and support.",
    links: [
      { href: "#library", label: "Library", icon: BookOpen },
      { href: "#it-services", label: "IT Services", icon: Info },
      { href: "#online-resources", label: "Online Resources", icon: ExternalLink },
      { href: "#support", label: "Support", icon: Info },
      { href: "#help-desk", label: "Help Desk", icon: Info },
    ],
  },
  {
    key: "vacancies",
    labelKey: "secondNav.vacancies",
    description: "Academic, administrative and research positions.",
    links: [
      { href: "#academic-positions", label: "Academic Positions", icon: Briefcase },
      { href: "#administrative-positions", label: "Administrative Positions", icon: Briefcase },
      { href: "#research-positions", label: "Research Positions", icon: FlaskConical },
      { href: "#how-to-apply", label: "How to Apply", icon: FileText },
      { href: "#benefits", label: "Benefits", icon: Award },
    ],
  },
];

function getSecondNavMegaItem(key: string): MegaMenuItem | undefined {
  return secondNavMega.find((m) => m.key === key);
}

type MainNavMegaItem = {
  labelKey: string;
  hubPath: string;
  descriptionKey: string;
  icon: LucideIcon;
  itemKeys: string[];
};

/** Desktop mega menus: hub blurb + two-column links (reference-style layout). */
const mainNavMegaItems: MainNavMegaItem[] = [
  {
    labelKey: "nav.about",
    hubPath: "/about",
    descriptionKey: "nav.megaBlurbAbout",
    icon: Building2,
    itemKeys: [
      "nav.aboutMenu.whoWeAre",
      "nav.aboutMenu.regulation",
      "nav.aboutMenu.universityInNumbers",
      "nav.aboutMenu.organizationalStructure",
      "nav.aboutMenu.leadershipAndCouncils",
      "nav.aboutMenu.accreditationAndLicense",
      "nav.aboutMenu.workersUnionCommittee",
      "nav.aboutMenu.whyTues",
    ],
  },
  {
    labelKey: "nav.research",
    hubPath: "/research",
    descriptionKey: "nav.megaBlurbResearch",
    icon: FlaskConical,
    itemKeys: [
      "nav.researchMenu.scientificPublicationsJournals",
      "nav.researchMenu.seminarsConferences",
      "nav.researchMenu.academicCouncil",
      "nav.researchMenu.researchPapersPublications",
      "nav.researchMenu.entrepreneurialInnovationClubs",
    ],
  },
  {
    labelKey: "nav.admissions",
    hubPath: "/admissions",
    descriptionKey: "nav.megaBlurbAdmissions",
    icon: GraduationCap,
    itemKeys: [
      "nav.admissionsMenu.studyPrograms",
      "nav.admissionsMenu.regulationsAndRequirements",
      "nav.admissionsMenu.secondaryEducationRequirements",
      "nav.admissionsMenu.contractAmountsTuition",
    ],
  },
  {
    labelKey: "nav.news",
    hubPath: "/news",
    descriptionKey: "nav.megaBlurbNews",
    icon: Newspaper,
    itemKeys: [
      "nav.newsMenu.latestNews",
      "nav.newsMenu.upcomingEvents",
      "nav.newsMenu.videoGallery",
      "nav.newsMenu.photoGallery",
    ],
  },
];

/** Wide mega panel: anchor so it stays in view (About left, News right, middle centered). */
const secondaryNav = ["nav.community", "nav.colleges", "nav.journal"];

const secondNavItems = [
  {
    key: "university",
    labelKey: "secondNav.university",
    itemKeys: [
      "secondNavUniversity.license",
      "secondNavUniversity.universityMission",
      "secondNavUniversity.charter",
      "secondNavUniversity.organizationalStructure",
      "secondNavUniversity.councils",
      "secondNavUniversity.ratings",
      "secondNavUniversity.requisites",
      "secondNavUniversity.financialStatements",
      "secondNavUniversity.universityInNumbers",
      "secondNavUniversity.accreditation",
      "secondNavUniversity.famousGraduates",
      "secondNavUniversity.faculties",
      "secondNavUniversity.departments",
      "secondNavUniversity.centerAndDepartments",
      "secondNavUniversity.openData",
      "secondNavUniversity.tradeUnionCommittee",
      "secondNavUniversity.contractPrices",
      "secondNavUniversity.campusCulture",
    ],
  },
  {
    key: "education",
    labelKey: "secondNav.education",
    itemKeys: [
      "secondNavEducation.courseCatalogue",
      "secondNavEducation.resources",
      "secondNavEducation.bachelor",
      "secondNavEducation.mastersDegree",
      "secondNavEducation.qualificationRequirements",
      "secondNavEducation.studyPlans",
      "secondNavEducation.syllabus",
      "secondNavEducation.distanceLearningSystem",
    ],
  },
  {
    key: "science",
    labelKey: "secondNav.science",
    itemKeys: [
      "secondNavScience.seminars",
      "secondNavScience.scientificArticles",
      "secondNavScience.scientificJournals",
      "secondNavScience.expectedConferences",
      "secondNavScience.academicCouncil",
      "secondNavScience.certificates",
      "secondNavScience.entrepreneurialClubs",
      "secondNavScience.centerResearchSustainableInnovativeDevelopment",
    ],
  },
  {
    key: "internationalization",
    labelKey: "secondNav.internationalization",
    itemKeys: [
      "secondNavInternationalization.internationalRelations",
      "secondNavInternationalization.tisuForeignLanguagesCenter",
      "secondNavInternationalization.departmentInternationalRelationsEmployees",
      "secondNavInternationalization.internationalGrants",
      "secondNavInternationalization.internationalScientificRelations",
      "secondNavInternationalization.internationalConferences",
      "secondNavInternationalization.professionalDevelopmentEducationChoir",
      "secondNavInternationalization.advancedTrainingProgramsForeignTeachers",
      "secondNavInternationalization.internationalSupportCenter",
    ],
  },
  {
    key: "studentLife",
    labelKey: "secondNav.studentLife",
    itemKeys: [
      "secondNavStudentLife.communityClubs",
      "secondNavStudentLife.healthSupportService",
      "secondNavStudentLife.socialLife",
      "secondNavStudentLife.socialRooms",
      "secondNavStudentLife.contests",
      "secondNavStudentLife.supportCenterMinorityGroups",
      "secondNavStudentLife.dormitory",
      "secondNavStudentLife.sportFacilities",
      "secondNavStudentLife.cafeterias",
      "secondNavStudentLife.bookstore",
      "secondNavStudentLife.facilitiesForDisabled",
      "secondNavStudentLife.studentOpinion",
      "secondNavStudentLife.careerCentre",
      "secondNavStudentLife.help247",
      "secondNavStudentLife.studentAcademicSupport",
    ],
  },
  {
    key: "admission2025",
    labelKey: "secondNav.admission2025",
    itemKeys: [
      "secondNavAdmission2025.listOfEducationalAreas",
      "secondNavAdmission2025.apply",
      "secondNavAdmission2025.regulationSecondaryEducation",
      "secondNavAdmission2025.admission2025",
      "secondNavAdmission2025.transferOfStudies",
      "secondNavAdmission2025.toLocalApplicants",
      "secondNavAdmission2025.informationTransferEducation",
      "secondNavAdmission2025.informationContractAmounts",
      "secondNavAdmission2025.menu",
      "secondNavAdmission2025.forInternationalApplicants",
      "secondNavAdmission2025.contactingAdmission",
      "secondNavAdmission2025.instructionsApplicants",
      "secondNavAdmission2025.registerUndergraduateAdmission",
      "secondNavAdmission2025.faq",
    ],
  },
  {
    key: "informationServices",
    labelKey: "secondNav.informationServices",
    itemKeys: [
      "secondNavInformationServices.latestNews",
      "secondNavInformationServices.directionsContractSums",
      "secondNavInformationServices.aboutUniversity",
      "secondNavInformationServices.yashilUniversitet1",
      "secondNavInformationServices.videoGallery",
      "secondNavInformationServices.photoGallery",
    ],
  },
  {
    key: "vacancies",
    labelKey: "secondNav.vacancies",
    itemKeys: [
      "secondNavItems.academicPositions",
      "secondNavItems.administrativePositions",
      "secondNavItems.researchPositions",
      "secondNavItems.howToApply",
      "secondNavItems.benefits",
    ],
  },
];

type HeaderProps = {
  onMobileMenuOpenChange?: (open: boolean) => void;
};

const Header = ({ onMobileMenuOpenChange }: HeaderProps) => {
  const { t } = useTranslation("header");
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [secondNavMobileOpen, setSecondNavMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchDraft, setSearchDraft] = useState("");
  const { isPending: siteSearchPending, newsItems, eventItems, programItems } =
    useSiteSearchContent(searchOpen);

  const staticSearchRoutes = useMemo(() => getStaticSearchRoutes((key) => t(key)), [t]);

  const searchKindLabels = useMemo(
    () => ({
      page: t("searchKind.page"),
      program: t("searchKind.program"),
      event: t("searchKind.event"),
      news: t("searchKind.news"),
    }),
    [t],
  );

  const siteSearchHits = useMemo(
    () =>
      buildSiteSearchHits({
        query: searchDraft,
        news: newsItems,
        events: eventItems,
        programs: programItems,
        staticRoutes: staticSearchRoutes,
        kindLabels: searchKindLabels,
      }),
    [searchDraft, newsItems, eventItems, programItems, staticSearchRoutes, searchKindLabels],
  );

  const searchPreviewLimit = 12;
  const suggestionList = siteSearchHits.slice(0, searchPreviewLimit);
  const [topBarVisible, setTopBarVisible] = useState(true);
  const lastScrollY = useRef(0);
  const secondNavRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const mainRowRef = useRef<HTMLDivElement>(null);
  const megaPanelRef = useRef<HTMLDivElement>(null);
  const [openMegaKey, setOpenMegaKey] = useState<string | null>(null);
  const [openMegaTriggerRect, setOpenMegaTriggerRect] = useState<{ left: number; width: number } | null>(null);
  const [panelTop, setPanelTop] = useState(128);
  const [secondNavPanelLeft, setSecondNavPanelLeft] = useState(0);
  const [secondNavPanelWidth, setSecondNavPanelWidth] = useState(0);

  /** Mega dropdown: flush to bottom of main navbar row (0px gap); width = full main row. */
  const [mainNavMegaOpen, setMainNavMegaOpen] = useState(false);
  const [mainNavMegaSideOffset, setMainNavMegaSideOffset] = useState(0);
  const [mainNavMegaAlignOffset, setMainNavMegaAlignOffset] = useState(0);
  const [mainNavMegaPanelWidth, setMainNavMegaPanelWidth] = useState(0);

  const recomputeMainNavMegaPlacement = useCallback(() => {
    const row = mainRowRef.current;
    if (!row) return;
    const rowRect = row.getBoundingClientRect();
    const trigger = row.querySelector('nav[aria-label="Main"] button[aria-expanded="true"]');
    if (!(trigger instanceof HTMLElement)) return;
    const triggerRect = trigger.getBoundingClientRect();
    setMainNavMegaSideOffset(Math.max(0, Math.round(rowRect.bottom - triggerRect.bottom)));
    setMainNavMegaAlignOffset(Math.round(rowRect.left - triggerRect.left));
    setMainNavMegaPanelWidth(Math.round(rowRect.width));
  }, []);

  const onMainNavMegaOpenChange = useCallback(
    (_open: boolean) => {
      queueMicrotask(() => {
        const row = mainRowRef.current;
        const expanded = row?.querySelector('nav[aria-label="Main"] button[aria-expanded="true"]');
        const anyOpen = !!expanded;
        setMainNavMegaOpen(anyOpen);
        if (anyOpen) recomputeMainNavMegaPlacement();
      });
    },
    [recomputeMainNavMegaPlacement],
  );

  useLayoutEffect(() => {
    if (!mainNavMegaOpen) return;
    recomputeMainNavMegaPlacement();
  }, [mainNavMegaOpen, recomputeMainNavMegaPlacement]);

  useEffect(() => {
    if (!mainNavMegaOpen) return;
    recomputeMainNavMegaPlacement();
    window.addEventListener("resize", recomputeMainNavMegaPlacement);
    window.addEventListener("scroll", recomputeMainNavMegaPlacement, true);
    return () => {
      window.removeEventListener("resize", recomputeMainNavMegaPlacement);
      window.removeEventListener("scroll", recomputeMainNavMegaPlacement, true);
    };
  }, [mainNavMegaOpen, recomputeMainNavMegaPlacement]);

  useEffect(() => {
    if (mainNavMegaOpen) {
      const id = window.requestAnimationFrame(() => recomputeMainNavMegaPlacement());
      return () => window.cancelAnimationFrame(id);
    }
  }, [topBarVisible, mainNavMegaOpen, recomputeMainNavMegaPlacement]);

  useEffect(() => {
    onMobileMenuOpenChange?.(mobileMenuOpen);
  }, [mobileMenuOpen, onMobileMenuOpenChange]);

  // Hide top bar on scroll down, show on scroll up or near top
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY ?? window.pageYOffset;
      if (y <= 50) {
        setTopBarVisible(true);
      } else if (y > lastScrollY.current) {
        setTopBarVisible(false);
      } else {
        setTopBarVisible(true);
      }
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Position mega menu panel to align with second nav (same width, never exceeds)
  const [megaMenuTop, setMegaMenuTop] = useState(208);
  useEffect(() => {
    const setTop = () => {
      if (secondNavRef.current) {
        setMegaMenuTop(secondNavRef.current.getBoundingClientRect().bottom);
      }
    };
    setTop();
    window.addEventListener("scroll", setTop, true);
    window.addEventListener("resize", setTop);
    return () => {
      window.removeEventListener("scroll", setTop, true);
      window.removeEventListener("resize", setTop);
    };
  }, []);

  // Sync --header-height with actual header height so .below-header has no gap
  useEffect(() => {
    const syncHeaderHeight = () => {
      if (headerRef.current) {
        const h = headerRef.current.getBoundingClientRect().height;
        document.documentElement.style.setProperty("--header-height", `${h}px`);
      }
    };
    syncHeaderHeight();
    window.addEventListener("scroll", syncHeaderHeight, true);
    window.addEventListener("resize", syncHeaderHeight);
    const obs = new ResizeObserver(syncHeaderHeight);
    if (headerRef.current) obs.observe(headerRef.current);
    return () => {
      window.removeEventListener("scroll", syncHeaderHeight, true);
      window.removeEventListener("resize", syncHeaderHeight);
      obs.disconnect();
    };
  }, [topBarVisible]);

  const syncSecondNavPanelLayout = useCallback(() => {
    const row = mainRowRef.current;
    if (!row) return;
    const r = row.getBoundingClientRect();
    setPanelTop(Math.round(r.bottom));
    setSecondNavPanelLeft(Math.round(r.left));
    setSecondNavPanelWidth(Math.round(r.width));
  }, []);

  // Portaled "Explore more" panel: same horizontal box as main navbar row
  useLayoutEffect(() => {
    if (!secondNavMobileOpen) return;
    syncSecondNavPanelLayout();
  }, [secondNavMobileOpen, syncSecondNavPanelLayout]);

  useEffect(() => {
    if (!secondNavMobileOpen) return;
    syncSecondNavPanelLayout();
    window.addEventListener("scroll", syncSecondNavPanelLayout, true);
    window.addEventListener("resize", syncSecondNavPanelLayout);
    return () => {
      window.removeEventListener("scroll", syncSecondNavPanelLayout, true);
      window.removeEventListener("resize", syncSecondNavPanelLayout);
    };
  }, [secondNavMobileOpen, topBarVisible, syncSecondNavPanelLayout]);

  useEffect(() => {
    if (secondNavMobileOpen) {
      const id = window.requestAnimationFrame(() => syncSecondNavPanelLayout());
      return () => window.cancelAnimationFrame(id);
    }
  }, [topBarVisible, secondNavMobileOpen, syncSecondNavPanelLayout]);

  // Close mega menu on outside click
  useEffect(() => {
    if (!openMegaKey) return;
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (megaPanelRef.current?.contains(target)) return;
      if (secondNavRef.current?.contains(target)) return;
      setOpenMegaKey(null);
      setOpenMegaTriggerRect(null);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [openMegaKey]);

  return (
    <header ref={headerRef} className="fixed top-0 left-0 right-0 z-50 flex flex-col bg-primary">
      <div className="container mx-auto flex w-full flex-col px-0">
        {/* Top bar: contact (left) - hides on scroll down, shows on scroll up */}
        <div
          className="overflow-hidden transition-all duration-300 ease-out"
          style={{ maxHeight: topBarVisible ? 44 : 0 }}
        >
          <div className="bg-primary px-4 py-0 pt-0 pb-0 text-xs text-primary-foreground/90 md:px-6 h-[44px] flex items-center overflow-hidden">
            <div className="flex min-h-0 min-w-0 w-full flex-1 flex-nowrap items-stretch justify-between gap-2 overflow-x-auto overflow-y-hidden border-b border-primary-foreground/15 md:gap-8 md:overflow-visible h-full min-h-[44px]">
            <div className="flex flex-shrink-0 flex-wrap items-center gap-2">
              <a
                href="tel:+998954120707"
                className="flex items-center gap-1.5 hover:text-primary-foreground transition-colors"
              >
                <Phone className="h-3.5 w-3.5" />
                <span>+998 95 412 07 07</span>
                <span className="text-primary-foreground/50">/</span>
                <span>+998 90 074 74 74</span>
              </a>
              <a
                href="mailto:university@tues.uz"
                className="hidden items-center gap-1.5 hover:text-primary-foreground transition-colors sm:inline-flex"
              >
                <Mail className="h-3.5 w-3.5" />
                <span>university@tues.uz</span>
              </a>
            </div>
            <div className="flex flex-shrink-0 items-center gap-4 md:gap-8">
              <div className="flex items-center gap-3">
                <a href="#" aria-label="Twitter" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  <Twitter className="h-4 w-4" />
                </a>
                <a href="#" aria-label="LinkedIn" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  <Linkedin className="h-4 w-4" />
                </a>
                <a href="#" aria-label="Instagram" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  <Instagram className="h-4 w-4" />
                </a>
                <a href="#" aria-label="YouTube" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  <Youtube className="h-4 w-4" />
                </a>
              </div>
              <div className="hidden lg:flex items-stretch gap-0">
              <Link to="/eduhub" className="self-stretch flex items-stretch min-h-[44px]">
                <Button
                  className="h-full min-h-[44px] min-w-[100px] py-0 rounded-sm bg-red-600 hover:bg-red-700 text-white border-0 text-[12px] px-4 py-0 font-medium"
                >
                  EduHub
                </Button>
              </Link>
              <Link to="/eduhub" className="self-stretch flex items-stretch min-h-[44px]">
                <Button
                  className="h-full min-h-[44px] min-w-[100px] py-0 rounded-sm bg-red-600 hover:bg-red-700 text-white border-0 text-[12px] px-4 py-0 font-medium"
                >
                  Journal
                </Button>
              </Link>
              </div>
            </div>
          </div>
        </div>
        </div>

        {/* Second nav panel (opens from hamburger in top bar) - portaled */}
        {secondNavMobileOpen && createPortal(
          <>
            <div
              className="fixed inset-0 z-40 bg-black/20"
              aria-hidden
              onClick={() => setSecondNavMobileOpen(false)}
            />
            <div
              className="fixed z-50 overflow-y-auto rounded-b-md border border-border bg-card text-popover-foreground shadow-xl"
              style={{
                top: panelTop,
                left: secondNavPanelWidth > 0 ? secondNavPanelLeft : 0,
                width: secondNavPanelWidth > 0 ? secondNavPanelWidth : "100%",
                maxHeight: `calc(100vh - ${panelTop}px)`,
                scrollbarGutter: "stable",
              }}
              role="dialog"
              aria-label="Menu"
            >
              <nav className="border-b-0 px-[32px] py-5 sm:py-6">
                <Accordion type="single" collapsible className="w-full">
                  {secondNavItems.map((item) => {
                    const mega = getSecondNavMegaItem(item.key);
                    return (
                      <AccordionItem key={item.key} value={item.key} className="border-b border-border last:border-b-0">
                        <AccordionTrigger className="py-3 text-left text-[0.7rem] font-bold uppercase tracking-[0.14em] text-foreground hover:no-underline sm:text-xs [&[data-state=open]>svg]:rotate-180">
                          {t(item.labelKey)}
                        </AccordionTrigger>
                        <AccordionContent className="pb-5 pt-0">
                          <div className="flex flex-col gap-5">
                            {mega?.description ? (
                              <p className="text-sm leading-relaxed text-muted-foreground">{mega.description}</p>
                            ) : null}
                            <ul className="grid grid-cols-1 gap-x-8 gap-y-0.5 sm:grid-cols-2">
                              {item.itemKeys.map((subItemKey) => (
                                <li key={subItemKey} className="min-w-0">
                                  <button
                                    type="button"
                                    className="w-full rounded-md px-2 py-2 text-left text-sm text-foreground transition-colors hover:bg-sky-50 hover:text-sky-700 dark:hover:bg-primary/15 dark:hover:text-primary"
                                  >
                                    {t(subItemKey)}
                                  </button>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              </nav>
            </div>
          </>,
          document.body
        )}

        {/* Main row: Logo (left) | Social + Phone + Lang + CTA (right) */}
        <div
          ref={mainRowRef}
          className="relative flex min-h-16 flex-nowrap items-center justify-between gap-3 overflow-x-clip overflow-y-visible px-4 py-2 lg:gap-0 lg:px-6"
        >
          {/* Logo - left */}
          <div className="flex min-w-0 shrink items-center">
            <Link to="/" aria-label="Back to University Home" className="flex min-w-0 items-center gap-2 overflow-hidden sm:gap-4">
              <img
                src="/logo_white.png"
                alt="TUES LOGO"
                className="h-10 w-auto max-w-[140px] shrink-0 object-contain cursor-pointer sm:max-w-[180px] sm:h-14 lg:max-w-[240px] lg:h-16"
              />
              <span className="truncate text-primary-foreground text-xs sm:text-sm">
                Termez University of
                <br />
                Economics and Service
              </span>
            </Link>
          </div>

          {/* Nav: About, Research, Admissions, News - right of logo */}
          <nav className="hidden min-w-0 flex-1 lg:flex lg:justify-center" aria-label="Main">
            <ul
              role="list"
              className="flex w-full list-none flex-wrap items-center justify-center gap-x-4 gap-y-1 p-0 text-[14px] lg:flex-nowrap"
            >
              {mainNavMegaItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.labelKey} className="px-0">
                    <DropdownMenu modal={false} onOpenChange={onMainNavMegaOpenChange}>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="h-auto gap-0.5 px-2 py-1.5 text-[14px] font-medium text-primary-foreground/90 hover:bg-primary-foreground/10 hover:text-primary-foreground"
                        >
                          {t(item.labelKey)}
                          <ChevronDown className="h-3.5 w-3.5 shrink-0" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        side="bottom"
                        align="start"
                        sideOffset={mainNavMegaSideOffset}
                        alignOffset={mainNavMegaAlignOffset}
                        avoidCollisions={false}
                        collisionPadding={0}
                        style={
                          mainNavMegaPanelWidth > 0
                            ? { width: mainNavMegaPanelWidth, maxWidth: mainNavMegaPanelWidth }
                            : undefined
                        }
                        className={cn(
                          "z-[100] min-w-0 max-w-none rounded-none rounded-b-md border-border bg-card p-0 text-popover-foreground shadow-xl",
                          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
                          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
                        )}
                      >
                        <div className="flex flex-col gap-6 px-5 py-5 sm:px-6 sm:py-6 lg:px-[100px] lg:flex-row lg:items-stretch lg:gap-10">
                          <DropdownMenuItem
                            asChild
                            className="h-auto cursor-pointer items-start rounded-lg p-0 focus:bg-transparent data-[highlighted]:bg-transparent data-[highlighted]:text-foreground focus:text-foreground"
                          >
                            <Link
                              to={item.hubPath}
                              className="flex outline-none lg:min-w-0 lg:max-w-[min(20rem,28vw)] lg:shrink-0 lg:border-r lg:border-border lg:pr-8"
                            >
                              <div className="flex min-w-0 flex-1 gap-3.5">
                                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
                                  <Icon className="h-5 w-5" aria-hidden />
                                </span>
                                <div className="flex min-w-0 flex-1 flex-col gap-2.5 text-left">
                                  <h3 className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-foreground leading-snug sm:text-xs">
                                    {t(item.labelKey)}
                                  </h3>
                                  <p className="text-sm leading-relaxed text-muted-foreground">
                                    {t(item.descriptionKey)}
                                  </p>
                                </div>
                              </div>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuGroup className="grid w-full grid-cols-1 gap-x-8 gap-y-0.5 sm:grid-cols-2 lg:flex-1">
                            {item.itemKeys.map((subKey) => (
                              <DropdownMenuItem
                                key={subKey}
                                asChild
                                className="h-auto cursor-pointer rounded-md px-2 py-2 text-sm text-foreground focus:bg-sky-50 focus:text-sky-700 data-[highlighted]:bg-sky-50 data-[highlighted]:text-sky-700 dark:focus:bg-primary/15 dark:focus:text-primary dark:data-[highlighted]:bg-primary/15 dark:data-[highlighted]:text-primary"
                              >
                                <Link to={getTopNavItemHref(subKey)} className="block w-full">
                                  <span className="leading-snug">{t(subKey)}</span>
                                </Link>
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuGroup>
                        </div>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Right: search + EduHub + hamburger (language: floating FAB in App) */}
          <div className="flex min-w-[44px] shrink-0 items-center gap-1 sm:gap-2">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="shrink-0 h-10 w-10 text-primary-foreground/90 hover:text-primary-foreground hover:bg-primary-foreground/10"
              aria-label={t("searchAria")}
              onClick={() => setSearchOpen(true)}
            >
              <Search className="h-5 w-5" aria-hidden />
            </Button>
            <div className="hidden lg:flex items-center gap-2">
              <Button
                type="button"
                variant="ghost"
                className="shrink-0 h-10 gap-2 px-3 text-primary-foreground/90 hover:text-primary-foreground hover:bg-primary-foreground/10 text-sm font-medium"
                aria-label="Menu"
                aria-expanded={secondNavMobileOpen}
                onClick={() => setSecondNavMobileOpen(!secondNavMobileOpen)}
              >
                <span>{t("exploreMore")}</span>
                {secondNavMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-primary-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Second Navbar - hidden; content shown via hamburger panel in top bar */}
        <nav ref={secondNavRef} className="hidden sticky top-0 z-50 border-b border-primary-foreground/10 transition-all duration-300 bg-primary">
          <div className="w-full px-6 lg:px-8">
            <div className="flex h-14 items-center justify-between">
              {/* Desktop nav (lg+) - centered with space between items */}
              <div className="hidden lg:flex flex-1 justify-between items-center">
                {secondNavMega.map((item) => (
                  <div key={item.key} className="h-14 flex items-center">
                    <button
                      type="button"
                      aria-expanded={openMegaKey === item.key}
                      aria-haspopup="true"
                      onClick={(e) => {
                        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
                        setOpenMegaKey((k) => {
                          if (k === item.key) {
                            setOpenMegaTriggerRect(null);
                            return null;
                          }
                          setOpenMegaTriggerRect({ left: rect.left, width: rect.width });
                          return item.key;
                        });
                      }}
                      className="flex items-center gap-1 text-[13px] font-medium text-primary-foreground/80 hover:text-primary-foreground transition-colors py-2 whitespace-nowrap"
                    >
                      {t(item.labelKey)}
                      <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Single fixed mega menu panel (same width as nav, never exceeds) - portaled to body */}
              {openMegaKey && (() => {
                const item = secondNavMega.find((m) => m.key === openMegaKey);
                if (!item) return null;
                const panelLeftPx = 32; // left-8 = 2rem
                const arrowLeft =
                  openMegaTriggerRect != null
                    ? openMegaTriggerRect.left - panelLeftPx + openMegaTriggerRect.width / 2 - 6
                    : undefined;

                return createPortal(
                  <div
                    ref={megaPanelRef}
                    className="fixed z-[100] left-8 right-8 overflow-visible bg-white rounded-none shadow-lg border border-slate-200 min-w-0"
                    style={{
                      top: megaMenuTop,
                      width: "calc(100vw - 4rem)",
                      maxWidth: "calc(100vw - 4rem)",
                    }}
                  >
                    {/* Arrow pointing up to the open menu item */}
                    {arrowLeft != null && (
                      <div
                        className="absolute bottom-full left-0 w-0 h-0 border-l-[6px] border-r-[6px] border-b-[6px] border-l-transparent border-r-transparent border-b-white border-t-0"
                        style={{ left: `${arrowLeft}px` }}
                        aria-hidden
                      />
                    )}
                    <div className="flex gap-6 overflow-hidden p-4 w-full min-w-0">
                      <div className="w-[300px] flex-shrink-0 flex flex-col p-4 bg-slate-50 rounded-none">
                        <h3 className="text-base font-semibold text-slate-900 mt-0">{t(item.labelKey)}</h3>
                        <p className="text-sm text-slate-600 leading-relaxed mt-2">{item.description}</p>
                      </div>
                      <div className="flex-1 grid grid-cols-2 gap-x-0 gap-y-0 auto-rows-[36px] min-w-0">
                        {item.links.map((link) => {
                          const Icon = link.icon;
                          return (
                            <a
                              key={link.href + link.label}
                              href={link.href}
                              onClick={() => {
                                setOpenMegaKey(null);
                                setOpenMegaTriggerRect(null);
                              }}
                              className="block px-4 py-1.5 h-9 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors line-clamp-1 flex items-center gap-2"
                            >
                              <Icon className="h-4 w-4 flex-shrink-0" aria-hidden />
                              <span>{link.label}</span>
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  </div>,
                  document.body
                );
              })()}

              {/* Smaller desktop / tablet: EduHub + Hamburger */}
              <div className="flex lg:hidden items-center gap-2">
                <Link to="/eduhub">
                  <Button
                    variant="outline"
                    className="bg-yellow-400 hover:bg-yellow-500 text-black border-yellow-400 hover:border-yellow-500 text-[13px] px-4 h-11"
                  >
                    EduHub
                  </Button>
                </Link>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="p-2 text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
                  aria-label="Menu"
                  onClick={() => setSecondNavMobileOpen(!secondNavMobileOpen)}
                >
                  {secondNavMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </Button>
              </div>
            </div>
          </div>

          {/* Mobile menu panel for second nav (below header row on small screens) */}
          {secondNavMobileOpen && (
            <div className="lg:hidden border-t border-border bg-card text-popover-foreground shadow-inner">
              <nav className="flex max-h-[70vh] flex-col gap-2 overflow-y-auto px-5 py-5 sm:px-6 sm:py-6">
                {secondNavItems.map((item) => {
                  const mega = getSecondNavMegaItem(item.key);
                  return (
                    <DropdownMenu key={item.key}>
                      <DropdownMenuTrigger asChild>
                        <button
                          type="button"
                          className="flex w-full items-center justify-between py-3 text-left text-[0.7rem] font-bold uppercase tracking-[0.14em] text-foreground transition-colors sm:text-xs"
                        >
                          {t(item.labelKey)}
                          <ChevronDown className="h-4 w-4 shrink-0" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        className="z-[100] w-[var(--radix-dropdown-menu-trigger-width)] max-w-[min(280px,calc(100vw-2rem))] border-border bg-card p-3 text-popover-foreground shadow-xl"
                        align="start"
                        side="right"
                      >
                        {mega?.description ? (
                          <p className="mb-3 border-b border-border pb-3 text-sm leading-relaxed text-muted-foreground">
                            {mega.description}
                          </p>
                        ) : null}
                        {item.itemKeys.map((subItemKey) => (
                          <DropdownMenuItem
                            key={subItemKey}
                            className="h-auto cursor-pointer rounded-md px-2 py-2 text-sm text-foreground focus:bg-sky-50 focus:text-sky-700 data-[highlighted]:bg-sky-50 data-[highlighted]:text-sky-700 dark:focus:bg-primary/15 dark:focus:text-primary dark:data-[highlighted]:bg-primary/15 dark:data-[highlighted]:text-primary"
                          >
                            {t(subItemKey)}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  );
                })}
              </nav>
            </div>
          )}
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <>
          <div className="lg:hidden max-h-[100dvh] overflow-y-auto px-4 py-4 pb-24 border-t border-primary-foreground/10 lg:px-6">
            <nav className="flex flex-col gap-2">
              <Accordion type="single" collapsible className="w-full [&>*]:border-b [&>*]:border-primary-foreground/10">
                {mainNavMegaItems.map((item) => (
                  <AccordionItem key={item.labelKey} value={item.labelKey} className="border-none border-b border-primary-foreground/10 last:border-b-0">
                    <AccordionTrigger className="py-3 text-primary-foreground font-medium hover:no-underline hover:text-primary-foreground [&[data-state=open]>svg]:rotate-180">
                      {t(item.labelKey)}
                    </AccordionTrigger>
                    <AccordionContent className="pb-3 pt-0">
                      <div className="flex flex-col gap-1 pl-0">
                        {item.itemKeys.map((subKey) => (
                          <Link
                            key={subKey}
                            to={getTopNavItemHref(subKey)}
                            className="block py-1.5 text-primary-foreground/70 text-sm hover:text-primary-foreground"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {t(subKey)}
                          </Link>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              <div className="pt-4 border-t border-primary-foreground/10 mt-2">
                {secondaryNav.map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="block py-2 text-primary-foreground/70"
                  >
                    {t(item)}
                  </a>
                ))}
              </div>
              <div className="pt-4 border-t border-primary-foreground/10 mt-2">
                <p className="text-primary-foreground/50 text-xs uppercase tracking-wider mb-2">{t("header.secondMenu")}</p>
                <Accordion type="single" collapsible className="w-full [&>*]:border-b [&>*]:border-primary-foreground/10">
                  {secondNavItems.map((item) => (
                    <AccordionItem key={item.key} value={item.key} className="border-none border-b border-primary-foreground/10 last:border-b-0">
                      <AccordionTrigger className="py-3 text-primary-foreground font-medium hover:no-underline hover:text-primary-foreground [&[data-state=open]>svg]:rotate-180">
                        {t(item.labelKey)}
                      </AccordionTrigger>
                      <AccordionContent className="pb-3 pt-0">
                        <div className="flex flex-col gap-1 pl-0">
                          {item.itemKeys.map((subItemKey) => (
                            <a
                              key={subItemKey}
                              href="#"
                              className="block py-1.5 text-primary-foreground/70 text-sm hover:text-primary-foreground"
                            >
                              {t(subItemKey)}
                            </a>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </nav>
          </div>
          <div className="fixed bottom-0 left-0 right-0 z-50 flex flex-wrap gap-2 border-t border-primary-foreground/10 bg-primary p-4 lg:hidden">
            <Link to="/eduhub" className="flex-1 min-w-[120px]">
              <Button className="w-full rounded-sm bg-red-600 hover:bg-red-700 text-white border-0 text-sm px-4 py-2.5 font-medium">
                EduHub
              </Button>
            </Link>
            <Link to="/eduhub" className="flex-1 min-w-[120px]">
              <Button className="w-full rounded-sm bg-red-600 hover:bg-red-700 text-white border-0 text-sm px-4 py-2.5 font-medium">
                Journal
              </Button>
            </Link>
          </div>
          </>
        )}
      </div>

      <Dialog
        open={searchOpen}
        onOpenChange={(open) => {
          setSearchOpen(open);
          if (!open) setSearchDraft("");
        }}
      >
        <DialogContent fullScreen>
          <DialogHeader>
            <DialogTitle>{t("searchTitle")}</DialogTitle>
            <DialogDescription className="sr-only">{t("searchPlaceholder")}</DialogDescription>
          </DialogHeader>
          <form
            className="flex min-h-0 flex-1 flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              const q = searchDraft.trim();
              navigate(q ? `/search?q=${encodeURIComponent(q)}` : "/search");
              setSearchOpen(false);
              setSearchDraft("");
            }}
          >
            <Input
              autoFocus
              type="search"
              value={searchDraft}
              onChange={(e) => setSearchDraft(e.target.value)}
              placeholder={t("searchPlaceholder")}
              aria-label={t("searchPlaceholder")}
              className="w-full shrink-0 text-base md:text-lg h-11 md:h-12"
            />
            <div
              className="flex min-h-0 flex-1 flex-col gap-3 border-t border-border pt-4"
              aria-live="polite"
              aria-label={t("searchTitle")}
            >
              {!searchDraft.trim() ? (
                <p className="text-sm text-muted-foreground">{t("searchHint")}</p>
              ) : siteSearchPending ? (
                <p className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 shrink-0 animate-spin" aria-hidden />
                  {t("searchLoading")}
                </p>
              ) : suggestionList.length === 0 ? (
                <p className="text-sm text-muted-foreground">{t("searchNoResults")}</p>
              ) : (
                <>
                  <ul className="max-h-[min(50vh,28rem)] space-y-1 overflow-y-auto overscroll-contain rounded-lg border border-border/80 bg-muted/20 p-1">
                    {suggestionList.map((item) => (
                      <li key={item.id}>
                        <Link
                          to={item.to}
                          onClick={() => {
                            setSearchOpen(false);
                            setSearchDraft("");
                          }}
                          className={cn(
                            "block rounded-md px-3 py-2.5 text-left transition-colors",
                            "hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                          )}
                        >
                          <span className="flex flex-wrap items-center gap-2">
                            <span className="line-clamp-2 flex-1 font-medium text-foreground">{item.title}</span>
                            <span className="shrink-0 rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                              {item.badge}
                            </span>
                          </span>
                          {item.subtitle ? (
                            <span className="mt-1 block text-xs text-muted-foreground line-clamp-2">
                              {item.subtitle}
                            </span>
                          ) : null}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  {siteSearchHits.length > searchPreviewLimit ? (
                    <Link
                      to={`/search?q=${encodeURIComponent(searchDraft.trim())}`}
                      onClick={() => {
                        setSearchOpen(false);
                        setSearchDraft("");
                      }}
                      className="text-sm font-medium text-primary underline-offset-4 hover:underline"
                    >
                      {t("searchSeeAll", { count: siteSearchHits.length })}
                    </Link>
                  ) : null}
                </>
              )}
            </div>
            <DialogFooter className="shrink-0 gap-2 border-t border-border pt-4 sm:gap-0">
              <Button type="button" variant="outline" onClick={() => setSearchOpen(false)}>
                {t("searchCancel")}
              </Button>
              <Button type="submit">{t("searchSubmit")}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </header>
  );
};

export default Header;
