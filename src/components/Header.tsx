import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  ChevronDown,
  Menu,
  X,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  Phone,
  Mail,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
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
import { megaSections, type MegaSectionId } from "@/data/headerMegaConfig";
import { footerNavSections } from "@/data/footerNavI18n";

const MAIN_NAV: { labelKey: string; itemKeys: string[] }[] = [
  {
    labelKey: "header.navAbout",
    itemKeys: [
      "header.aboutSub.history",
      "header.aboutSub.leadership",
      "header.aboutSub.facts",
      "header.aboutSub.mission",
    ],
  },
  {
    labelKey: "header.navResearch",
    itemKeys: [
      "header.researchSub.areas",
      "header.researchSub.publications",
      "header.researchSub.partnerships",
      "header.researchSub.innovation",
    ],
  },
  {
    labelKey: "header.navAdmissions",
    itemKeys: [
      "header.admissionsSub.undergrad",
      "header.admissionsSub.graduate",
      "header.admissionsSub.international",
      "header.admissionsSub.aid",
    ],
  },
  {
    labelKey: "header.navNews",
    itemKeys: [
      "header.newsSub.latest",
      "header.newsSub.events",
      "header.newsSub.press",
      "header.newsSub.media",
    ],
  },
];

const SECONDARY_KEYS = ["header.secondaryCommunity", "header.secondaryColleges", "header.secondaryJournal"] as const;

/** Official university name — always English (proper name). */
const HEADER_BRAND_LINE1 = "Termez University of";
const HEADER_BRAND_LINE2 = "Economics and Service";

const languages = [
  { code: "uz", name: "Uz", flag: "🇺🇿" },
  { code: "en", name: "En", flag: "🇬🇧" },
  { code: "ru", name: "Ru", flag: "🇷🇺" },
];

type HeaderProps = {
  onMobileMenuOpenChange?: (open: boolean) => void;
};

const Header = ({ onMobileMenuOpenChange }: HeaderProps) => {
  const { t, i18n } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [secondNavMobileOpen, setSecondNavMobileOpen] = useState(false);
  const activeCode = (i18n.resolvedLanguage ?? i18n.language ?? "en").slice(0, 2);
  const currentLanguage = languages.find((l) => l.code === activeCode) ?? languages[1];
  const [topBarVisible, setTopBarVisible] = useState(true);
  const lastScrollY = useRef(0);
  const secondNavRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const mainRowRef = useRef<HTMLDivElement>(null);
  const megaPanelRef = useRef<HTMLDivElement>(null);
  const [openMegaKey, setOpenMegaKey] = useState<MegaSectionId | null>(null);
  const [openMegaTriggerRect, setOpenMegaTriggerRect] = useState<{ left: number; width: number } | null>(null);
  const [panelTop, setPanelTop] = useState(128);

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

  const openMegaItem = openMegaKey ? megaSections.find((m) => m.id === openMegaKey) : undefined;

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
                  {t("eduhub.title")}
                </Button>
              </Link>
              <Link to="/eduhub" className="self-stretch flex items-stretch min-h-[44px]">
                <Button
                  className="h-full min-h-[44px] min-w-[100px] py-0 rounded-sm bg-red-600 hover:bg-red-700 text-white border-0 text-[12px] px-4 py-0 font-medium"
                >
                  {t("header.journal")}
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
              className="fixed right-0 z-50 w-full max-w-sm border-l border-t border-primary-foreground/10 bg-primary shadow-xl overflow-y-auto"
              style={{ top: panelTop, maxHeight: `calc(100vh - ${panelTop}px)`, scrollbarGutter: 'stable' }}
              role="dialog"
              aria-label={t("header.menuDialogAria")}
            >
              <nav className="py-4 pl-4 pr-4 border-b-0">
                <Accordion type="single" collapsible className="w-full [&>*]:border-b-0">
                  {footerNavSections.map((section, index) => (
                    <AccordionItem
                      key={section.titleKey}
                      value={section.titleKey}
                      className={index === footerNavSections.length - 1 ? "border-b-0 border-primary-foreground/10" : "border-primary-foreground/10"}
                    >
                      <AccordionTrigger className="py-3 text-[13px] font-medium text-primary-foreground/80 hover:text-primary-foreground hover:no-underline [&[data-state=open]>svg]:rotate-180">
                        {t(section.titleKey)}
                      </AccordionTrigger>
                      <AccordionContent className="pb-3 pt-0">
                        <ul className="flex flex-col gap-0.5">
                          {section.links.map((link) => (
                            <li key={link.labelKey}>
                              <button
                                type="button"
                                className="w-full rounded px-3 py-2 text-left text-sm text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground transition-colors"
                              >
                                {t(link.labelKey)}
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
        <div ref={mainRowRef} className="relative flex min-h-16 flex-nowrap items-center justify-between gap-3 overflow-hidden px-4 py-2 lg:gap-0 lg:px-6">
          {/* Logo - left */}
          <div className="flex min-w-0 shrink items-center">
            <Link to="/" aria-label={t("header.backHomeAria")} className="flex min-w-0 items-center gap-2 overflow-hidden sm:gap-4">
              <img
                src="/logo_white.png"
                alt="TUES LOGO"
                className="h-10 w-auto max-w-[140px] shrink-0 object-contain cursor-pointer sm:max-w-[180px] sm:h-14 lg:max-w-[240px] lg:h-16"
              />
              <span className="truncate text-primary-foreground text-xs sm:text-sm">
                {HEADER_BRAND_LINE1}
                <br />
                {HEADER_BRAND_LINE2}
              </span>
            </Link>
          </div>

          {/* Nav: About, Research, Admissions, News - right of logo */}
          <nav className="hidden min-w-0 flex-1 lg:flex lg:justify-center" aria-label={t("header.mainNavAria")}>
            <ul role="list" className="flex w-full flex-wrap items-center justify-center gap-x-4 gap-y-1 list-none p-0 text-[14px]">
              {MAIN_NAV.map((item) => (
                <li key={item.labelKey} className="px-0">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="text-primary-foreground/90 hover:text-primary-foreground hover:bg-primary-foreground/10 font-medium h-auto py-1.5 text-[14px]"
                      >
                        {t(item.labelKey)}
                        <ChevronDown className="ml-0.5 h-3.5 w-3.5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-card border-border">
                      {item.itemKeys.map((subKey) => (
                        <DropdownMenuItem
                          key={subKey}
                          className="cursor-pointer hover:bg-muted"
                        >
                          {t(subKey)}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right: language + EduHub + hamburger */}
          <div className="flex shrink-0 items-center gap-2 min-w-[44px]">
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
                      onClick={() => void i18n.changeLanguage(lang.code)}
                    >
                      <span className="mr-2">{lang.flag}</span>
                      {lang.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <Button
                type="button"
                variant="ghost"
                className="shrink-0 h-10 gap-2 px-3 text-primary-foreground/90 hover:text-primary-foreground hover:bg-primary-foreground/10 text-sm font-medium"
                aria-label={t("header.menuDialogAria")}
                aria-expanded={secondNavMobileOpen}
                onClick={() => setSecondNavMobileOpen(!secondNavMobileOpen)}
              >
                <span>{t("header.exploreMore")}</span>
                {secondNavMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-primary-foreground"
              aria-label={t("header.menuDialogAria")}
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
                {megaSections.map((item) => (
                  <div key={item.id} className="h-14 flex items-center">
                    <button
                      type="button"
                      aria-expanded={openMegaKey === item.id}
                      aria-haspopup="true"
                      onClick={(e) => {
                        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
                        setOpenMegaKey((k) => {
                          if (k === item.id) {
                            setOpenMegaTriggerRect(null);
                            return null;
                          }
                          setOpenMegaTriggerRect({ left: rect.left, width: rect.width });
                          return item.id;
                        });
                      }}
                      className="flex items-center gap-1 text-[13px] font-medium text-primary-foreground/80 hover:text-primary-foreground transition-colors py-2 whitespace-nowrap"
                    >
                      {t(item.titleKey)}
                      <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Single fixed mega menu panel (same width as nav, never exceeds) - portaled to body */}
              {openMegaItem && (() => {
                const item = openMegaItem;
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
                        <h3 className="text-base font-semibold text-slate-900 mt-0">{t(item.titleKey)}</h3>
                        <p className="text-sm text-slate-600 leading-relaxed mt-2">{t(item.descriptionKey)}</p>
                      </div>
                      <div className="flex-1 grid grid-cols-2 gap-x-0 gap-y-0 auto-rows-[36px] min-w-0">
                        {item.links.map((link) => {
                          const Icon = link.icon;
                          return (
                            <a
                              key={link.href + link.labelKey}
                              href={link.href}
                              onClick={() => {
                                setOpenMegaKey(null);
                                setOpenMegaTriggerRect(null);
                              }}
                              className="block px-4 py-1.5 h-9 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors line-clamp-1 flex items-center gap-2"
                            >
                              <Icon className="h-4 w-4 flex-shrink-0" aria-hidden />
                              <span>{t(link.labelKey)}</span>
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
                        onClick={() => void i18n.changeLanguage(lang.code)}
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
                    {t("eduhub.title")}
                  </Button>
                </Link>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="p-2 text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
                  aria-label={t("header.menuDialogAria")}
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
                {footerNavSections.map((section) => (
                  <DropdownMenu key={section.titleKey}>
                    <DropdownMenuTrigger asChild>
                      <button
                        type="button"
                        className="flex items-center justify-between w-full py-3 text-left text-[13px] font-medium text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                      >
                        {t(section.titleKey)}
                        <ChevronDown className="h-4 w-4 shrink-0" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="bg-card border-border w-[var(--radix-dropdown-menu-trigger-width)] max-w-[280px] p-3"
                      align="start"
                      side="right"
                    >
                      {section.links.map((link) => (
                        <DropdownMenuItem
                          key={link.labelKey}
                          className="cursor-pointer hover:bg-muted rounded px-3 py-2 text-sm"
                        >
                          {t(link.labelKey)}
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
          <>
          <div className="lg:hidden max-h-[100dvh] overflow-y-auto px-4 py-4 pb-24 border-t border-primary-foreground/10 lg:px-6">
            <nav className="flex flex-col gap-2">
              {MAIN_NAV.map((item) => (
                <div key={item.labelKey} className="py-2">
                  <span className="text-primary-foreground font-medium">{t(item.labelKey)}</span>
                </div>
              ))}
              <div className="pt-4 border-t border-primary-foreground/10 mt-2">
                {SECONDARY_KEYS.map((key) => (
                  <a
                    key={key}
                    href="#"
                    className="block py-2 text-primary-foreground/70"
                  >
                    {t(key)}
                  </a>
                ))}
              </div>
              <div className="pt-4 border-t border-primary-foreground/10 mt-2">
                <p className="text-primary-foreground/50 text-xs uppercase tracking-wider mb-2">{t("header.secondMenuHeading")}</p>
                <Accordion type="single" collapsible className="w-full [&>*]:border-b [&>*]:border-primary-foreground/10">
                  {footerNavSections.map((section) => (
                    <AccordionItem key={section.titleKey} value={section.titleKey} className="border-none border-b border-primary-foreground/10 last:border-b-0">
                      <AccordionTrigger className="py-3 text-primary-foreground font-medium hover:no-underline hover:text-primary-foreground [&[data-state=open]>svg]:rotate-180">
                        {t(section.titleKey)}
                      </AccordionTrigger>
                      <AccordionContent className="pb-3 pt-0">
                        <div className="flex flex-col gap-1 pl-0">
                          {section.links.map((link) => (
                            <a
                              key={link.labelKey}
                              href={link.href}
                              className="block py-1.5 text-primary-foreground/70 text-sm hover:text-primary-foreground"
                            >
                              {t(link.labelKey)}
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
                {t("eduhub.title")}
              </Button>
            </Link>
            <Link to="/eduhub" className="flex-1 min-w-[120px]">
              <Button className="w-full rounded-sm bg-red-600 hover:bg-red-700 text-white border-0 text-sm px-4 py-2.5 font-medium">
                {t("header.journal")}
              </Button>
            </Link>
          </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
