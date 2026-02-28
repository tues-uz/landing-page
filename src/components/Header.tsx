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
  const secondNavRef = useRef<HTMLElement>(null);
  const megaPanelRef = useRef<HTMLDivElement>(null);
  const [openMegaKey, setOpenMegaKey] = useState<string | null>(null);
  const [openMegaTriggerRect, setOpenMegaTriggerRect] = useState<{ left: number; width: number } | null>(null);

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
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary">
      <div className="container mx-auto px-0">
        {/* Contact Information Bar */}
        <div className="bg-primary text-white py-2 px-4 text-xs hidden md:block border-b border-primary-foreground/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <a
                href="tel:+998954120707"
                className="flex items-center gap-2 hover:text-primary-foreground/80 hover:underline transition-all duration-200"
              >
                <Phone className="h-3.5 w-3.5" />
                <span>+998 95 412 07 07</span>
                <span>/</span>
                <span>+99890 074 74 74</span>
              </a>
              <a
                href="mailto:university@tues.uz"
                className="flex items-center gap-2 hover:text-primary-foreground/80 hover:underline transition-all duration-200"
              >
                <Mail className="h-3.5 w-3.5" />
                <span>university@tues.uz</span>
              </a>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="hover:text-primary-foreground/80 hover:scale-110 transition-all duration-200"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="hover:text-primary-foreground/80 hover:scale-110 transition-all duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="hover:text-primary-foreground/80 hover:scale-110 transition-all duration-200"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="hover:text-primary-foreground/80 hover:scale-110 transition-all duration-200"
                aria-label="YouTube"
              >
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="relative flex items-center justify-between min-h-20 px-4 py-4">
          {/* Wrapped Navigation, Logo, and Secondary Nav */}
          <div className="w-full flex items-center justify-center gap-8">
            {/* Desktop Navigation - Left */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <DropdownMenu key={item.label}>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="text-primary-foreground/90 hover:text-primary-foreground hover:bg-primary-foreground/10 font-medium text-[13px]"
                    >
                      {item.label}
                      <ChevronDown className="ml-1 h-4 w-4" />
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
              ))}
            </nav>

            {/* Logo - Centered (acts as Home button) */}
            <div className="flex items-center">
              <Link to="/" aria-label="Back to University Home" className="inline-flex items-center justify-center">
                <img 
                  src="/logo_white.png" 
                  alt="TUES University logo" 
                  className="h-16 w-auto object-contain cursor-pointer"
                />
              </Link>
            </div>

            {/* Secondary Nav & Actions - Right */}
            <div className="hidden lg:flex items-center gap-6">
            <div className="flex items-center gap-4">
              {secondaryNav.map((item) =>
                item === "Journal" ? (
                  <Link
                    key={item}
                    to="/journal"
                    className="inline-flex items-center px-2 py-2 text-primary-foreground/70 hover:text-primary-foreground transition-colors text-[13px]"
                  >
                    {item}
                  </Link>
                ) : (
                  <a
                    key={item}
                    href="#"
                    className="inline-flex items-center px-2 py-2 text-primary-foreground/70 hover:text-primary-foreground transition-colors text-[13px]"
                  >
                    {item}
                  </a>
                )
              )}
            </div>
            <div className="flex items-center gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                              <Button
                                variant="outline"
                                className="bg-primary hover:bg-primary/90 text-white hover:text-white border border-white/20 hover:border-white/30 text-[13px] h-10 px-2"
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
                  variant="outline"
                  className="bg-yellow-400 hover:bg-yellow-500 text-black border-yellow-400 hover:border-yellow-500 text-[13px] px-4"
                >
                  EduHub
                </Button>
              </Link>
            </div>
          </div>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-primary-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Second Navbar - same color as main header row */}
        <nav ref={secondNavRef} className="sticky top-0 z-50 border-b border-primary-foreground/10 transition-all duration-300 bg-primary">
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
