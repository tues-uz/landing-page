import { useState, useRef, useEffect } from "react";
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
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type MegaMenuLink = { href: string; label: string; icon: LucideIcon };
type MegaMenuItem = { label: string; description: string; links: MegaMenuLink[] };

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
    label: "University",
    description:
      "Currently, the university has 24 Bachelor's and 13 master's degrees. An electronic IRC is formed on the necessary books on the education of students. Applicants may be aware of the information on the admission process to the University remotely.",
    links: universityMegaLinks,
  },
  {
    label: "Education",
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
    label: "Science",
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
    label: "Internationalization",
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
    label: "Student Life",
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
    label: "Admission 2025",
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
    label: "Information Services",
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
    label: "Vacancies",
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

const navItems = [
  {
    label: "About",
    items: ["History", "Leadership", "Facts & Figures", "Mission & Values"],
  },
  {
    label: "Research",
    items: ["Research Areas", "Publications", "Partnerships", "Innovation"],
  },
  {
    label: "Admissions",
    items: ["Undergraduate", "Graduate", "International", "Financial Aid"],
  },
  {
    label: "News",
    items: ["Latest News", "Events", "Press Releases", "Media Center"],
  },
];

const secondaryNav = ["Community", "Colleges", "Journal"];

const secondNavItems = [
  {
    label: "University",
    items: ["Overview", "History", "Leadership", "Governance", "Strategic Plan"],
  },
  {
    label: "Education",
    items: ["Academic Programs", "Courses", "Academic Calendar", "Faculty", "Departments"],
  },
  {
    label: "Science",
    items: ["Research Areas", "Laboratories", "Publications", "Innovation", "Collaborations"],
  },
  {
    label: "Internationalization",
    items: ["Exchange Programs", "Global Partnerships", "International Students", "Study Abroad", "Global Initiatives"],
  },
  {
    label: "Student Life",
    items: ["Campus Life", "Student Clubs", "Housing", "Dining", "Wellness"],
  },
  {
    label: "Admission 2025",
    items: ["Requirements", "Application Process", "Deadlines", "Scholarships", "FAQs"],
  },
  {
    label: "Information Services",
    items: ["Library", "IT Services", "Online Resources", "Support", "Help Desk"],
  },
  {
    label: "Vacancies",
    items: ["Academic Positions", "Administrative Positions", "Research Positions", "How to Apply", "Benefits"],
  },
];

const languages = [
  { code: "uz", name: "Uz", flag: "🇺🇿" },
  { code: "en", name: "En", flag: "🇬🇧" },
  { code: "ru", name: "Ru", flag: "🇷🇺" },
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [secondNavMobileOpen, setSecondNavMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(languages[1]); // Default to English
  const [topBarVisible, setTopBarVisible] = useState(true);
  const lastScrollY = useRef(0);
  const secondNavRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const mainRowRef = useRef<HTMLDivElement>(null);
  const megaPanelRef = useRef<HTMLDivElement>(null);
  const [openMegaKey, setOpenMegaKey] = useState<string | null>(null);
  const [openMegaTriggerRect, setOpenMegaTriggerRect] = useState<{ left: number; width: number } | null>(null);
  const [panelTop, setPanelTop] = useState(128);

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

  // Sync hamburger panel top with bottom of main header row (so panel aligns under full header)
  useEffect(() => {
    if (!secondNavMobileOpen) return;
    const setPanelTopFromHeader = () => {
      if (mainRowRef.current) {
        setPanelTop(mainRowRef.current.getBoundingClientRect().bottom);
      }
    };
    setPanelTopFromHeader();
    window.addEventListener("scroll", setPanelTopFromHeader, true);
    window.addEventListener("resize", setPanelTopFromHeader);
    return () => {
      window.removeEventListener("scroll", setPanelTopFromHeader, true);
      window.removeEventListener("resize", setPanelTopFromHeader);
    };
  }, [secondNavMobileOpen, topBarVisible]);

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
    <header ref={headerRef} className="fixed top-0 left-0 right-0 z-50 bg-primary">
      <div className="container mx-auto px-0">
        {/* Top bar: contact (left) - hides on scroll down, shows on scroll up */}
        <div
          className="overflow-hidden transition-all duration-300 ease-out"
          style={{ maxHeight: topBarVisible ? 48 : 0 }}
        >
          <div className="border-b border-primary-foreground/10 bg-primary px-4 py-3.5 text-xs text-primary-foreground/90 md:px-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2 shrink-0">
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
            <div className="flex items-center gap-3 shrink-0">
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
              className="fixed right-0 z-50 w-full max-w-sm border-l border-t border-primary-foreground/10 bg-primary shadow-xl overflow-y-auto"
              style={{ top: panelTop, maxHeight: `calc(100vh - ${panelTop}px)`, scrollbarGutter: 'stable' }}
              role="dialog"
              aria-label="Menu"
            >
              <nav className="py-4 pl-4 pr-4 border-b-0">
                <Accordion type="single" collapsible className="w-full [&>*]:border-b-0">
                  {secondNavItems.map((item, index) => (
                    <AccordionItem
                      key={item.label}
                      value={item.label}
                      className={index === secondNavItems.length - 1 ? "border-b-0 border-primary-foreground/10" : "border-primary-foreground/10"}
                    >
                      <AccordionTrigger className="py-3 text-[13px] font-medium text-primary-foreground/80 hover:text-primary-foreground hover:no-underline [&[data-state=open]>svg]:rotate-180">
                        {item.label}
                      </AccordionTrigger>
                      <AccordionContent className="pb-3 pt-0">
                        <ul className="flex flex-col gap-0.5">
                          {item.items.map((subItem) => (
                            <li key={subItem}>
                              <button
                                type="button"
                                className="w-full rounded px-3 py-2 text-left text-sm text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground transition-colors"
                              >
                                {subItem}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </nav>
            </div>
          </>,
          document.body
        )}

        {/* Main row: Logo (left) | Social + Phone + Lang + CTA (right) */}
        <div ref={mainRowRef} className="relative flex min-h-16 flex-wrap items-center justify-between gap-0 px-4 py-2 lg:px-6">
          {/* Logo - left */}
          <div className="flex shrink-0 items-center">
            <Link to="/" aria-label="Back to University Home" className="block">
              <img
                src="/logo_white.png"
                alt="TUES University logo"
                className="h-10 w-auto max-w-[200px] object-contain cursor-pointer lg:h-12"
              />
            </Link>
          </div>

          {/* Nav: About, Research, Admissions, News - right of logo */}
          <nav className="hidden min-w-0 flex-1 lg:flex lg:justify-center" aria-label="Main">
            <ul role="list" className="flex w-full flex-wrap items-center justify-center gap-x-4 gap-y-1 list-none p-0 text-[14px]">
              {navItems.map((item) => (
                <li key={item.label} className="px-0">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="text-primary-foreground/90 hover:text-primary-foreground hover:bg-primary-foreground/10 font-medium h-auto py-1.5 text-[14px]"
                      >
                        {item.label}
                        <ChevronDown className="ml-0.5 h-3.5 w-3.5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-card border-border">
                      {item.items.map((subItem) => (
                        <DropdownMenuItem
                          key={subItem}
                          className="cursor-pointer hover:bg-muted"
                        >
                          {subItem}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right: language + EduHub + hamburger */}
          <div className="flex shrink-0 items-center gap-2">
            <div className="hidden lg:flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="h-9 border-primary-foreground/20 bg-transparent text-primary-foreground/90 hover:bg-primary-foreground/10 hover:text-primary-foreground text-[13px] px-2"
                  >
                    <span className="mr-1">{currentLanguage.flag}</span>
                    {currentLanguage.name}
                    <ChevronDown className="ml-1 h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-card border-border" align="end">
                  {languages.map((lang) => (
                    <DropdownMenuItem
                      key={lang.code}
                      className="cursor-pointer hover:bg-muted"
                      onClick={() => setCurrentLanguage(lang)}
                    >
                      <span className="mr-2">{lang.flag}</span>
                      {lang.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <Link to="/eduhub">
                <Button
                  className="h-9 rounded-sm bg-red-600 hover:bg-red-700 text-white border-0 text-[13px] px-4 font-medium"
                >
                  EduHub
                </Button>
              </Link>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="shrink-0 text-primary-foreground/90 hover:text-primary-foreground hover:bg-primary-foreground/10"
                aria-label="Menu"
                aria-expanded={secondNavMobileOpen}
                onClick={() => setSecondNavMobileOpen(!secondNavMobileOpen)}
              >
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

        {/* Divider line above main row (second nav is now hamburger in top bar) */}
        <div className="h-px w-full bg-primary-foreground/10" aria-hidden />

        {/* Second Navbar - hidden; content shown via hamburger panel in top bar */}
        <nav ref={secondNavRef} className="hidden sticky top-0 z-50 border-b border-primary-foreground/10 transition-all duration-300 bg-primary">
          <div className="w-full px-6 lg:px-8">
            <div className="flex h-14 items-center justify-between">
              {/* Desktop nav (lg+) - centered with space between items */}
              <div className="hidden lg:flex flex-1 justify-between items-center">
                {secondNavMega.map((item) => (
                  <div key={item.label} className="h-14 flex items-center">
                    <button
                      type="button"
                      aria-expanded={openMegaKey === item.label}
                      aria-haspopup="true"
                      onClick={(e) => {
                        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
                        setOpenMegaKey((k) => {
                          if (k === item.label) {
                            setOpenMegaTriggerRect(null);
                            return null;
                          }
                          setOpenMegaTriggerRect({ left: rect.left, width: rect.width });
                          return item.label;
                        });
                      }}
                      className="flex items-center gap-1 text-[13px] font-medium text-primary-foreground/80 hover:text-primary-foreground transition-colors py-2 whitespace-nowrap"
                    >
                      {item.label}
                      <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Single fixed mega menu panel (same width as nav, never exceeds) - portaled to body */}
              {openMegaKey && (() => {
                const item = secondNavMega.find((m) => m.label === openMegaKey);
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
                        <h3 className="text-base font-semibold text-slate-900 mt-0">{item.label}</h3>
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

              {/* Smaller desktop / tablet: Lang + EduHub + Hamburger */}
              <div className="flex lg:hidden items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      className="flex items-center gap-2 px-2 py-2 text-sm font-medium text-primary-foreground/80 hover:text-primary-foreground transition-colors border border-primary-foreground/20 rounded-lg bg-primary hover:bg-primary-foreground/10"
                    >
                      <span className="text-base">{currentLanguage.flag}</span>
                      <span className="hidden sm:inline">{currentLanguage.name}</span>
                      <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-card border-border" align="end">
                    {languages.map((lang) => (
                      <DropdownMenuItem
                        key={lang.code}
                        className="cursor-pointer hover:bg-muted"
                        onClick={() => setCurrentLanguage(lang)}
                      >
                        <span className="mr-2">{lang.flag}</span>
                        {lang.name}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
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

          {/* Mobile menu panel for second nav */}
          {secondNavMobileOpen && (
            <div className="lg:hidden border-t border-primary-foreground/10 bg-primary">
              <nav className="px-6 py-4 flex flex-col gap-2 max-h-[70vh] overflow-y-auto">
                {secondNavItems.map((item) => (
                  <DropdownMenu key={item.label}>
                    <DropdownMenuTrigger asChild>
                      <button
                        type="button"
                        className="flex items-center justify-between w-full py-3 text-left text-[13px] font-medium text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                      >
                        {item.label}
                        <ChevronDown className="h-4 w-4 shrink-0" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="bg-card border-border w-[var(--radix-dropdown-menu-trigger-width)] max-w-[280px] p-3"
                      align="start"
                      side="right"
                    >
                      {item.items.map((subItem) => (
                        <DropdownMenuItem
                          key={subItem}
                          className="cursor-pointer hover:bg-muted rounded px-3 py-2 text-sm"
                        >
                          {subItem}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ))}
              </nav>
            </div>
          )}
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-primary-foreground/10">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <div key={item.label} className="py-2">
                  <span className="text-primary-foreground font-medium">{item.label}</span>
                </div>
              ))}
              <div className="pt-4 border-t border-primary-foreground/10 mt-2">
                {secondaryNav.map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="block py-2 text-primary-foreground/70"
                  >
                    {item}
                  </a>
                ))}
              </div>
              <div className="pt-4 border-t border-primary-foreground/10 mt-2">
                <p className="text-primary-foreground/50 text-xs uppercase tracking-wider mb-2">Second Menu</p>
                {secondNavItems.map((item) => (
                  <div key={item.label} className="py-2">
                    <span className="text-primary-foreground font-medium">{item.label}</span>
                    <div className="pl-4 pt-1 flex flex-col gap-1">
                      {item.items.map((subItem) => (
                        <a
                          key={subItem}
                          href="#"
                          className="block py-1 text-primary-foreground/70 text-sm"
                        >
                          {subItem}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
