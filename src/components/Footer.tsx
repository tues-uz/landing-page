import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { useLocation, Link } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { footerMenuSections } from "@/data/footerNav";

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Youtube, href: "#", label: "YouTube" },
  { icon: Facebook, href: "#", label: "Facebook" },
];

const Footer = () => {
  const { t } = useTranslation(["footer", "header"]);
  const location = useLocation();
  const isEduHubPage = location.pathname === "/eduhub" || location.pathname.startsWith("/eduhub/");
  const isJournalPage = location.pathname === "/journal" || location.pathname.startsWith("/journal/");
  const [email, setEmail] = useState("");
  
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Subscribe:", email);
    setEmail("");
  };

  // Journal page has different footer styling
  if (isJournalPage) {
    return (
      <footer className="bg-gray-100 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="md:col-span-1">
              <h3 className="text-lg font-bold text-gray-900 mb-4">{t("footer:journal.title")}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {t("footer:journal.description")}
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">{t("footer:journal.quickLinks")}</h4>
              <ul className="space-y-2">
                <li>
                  <a href="/journal" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                    {t("footer:journal.links.home")}
                  </a>
                </li>
                <li>
                  <a href="/journal/articles" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                    {t("footer:journal.links.articles")}
                  </a>
                </li>
                <li>
                  <a href="/journal/authors" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                    {t("footer:journal.links.authors")}
                  </a>
                </li>
                <li>
                  <a href="/journal/topics" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                    {t("footer:journal.links.topics")}
                  </a>
                </li>
              </ul>
            </div>

            {/* About */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">{t("footer:journal.about")}</h4>
              <ul className="space-y-2">
                <li>
                  <a href="/journal/about" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                    {t("footer:journal.links.aboutUs")}
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                    {t("footer:journal.links.editorialTeam")}
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                    {t("footer:journal.links.submissionGuidelines")}
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                    {t("footer:journal.links.contactUs")}
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">{t("footer:journal.contact")}</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <a href="mailto:journal@tues.uz" className="hover:text-gray-900 transition-colors">
                    journal@tues.uz
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <a href="tel:+998777029695" className="hover:text-gray-900 transition-colors">
                    +998 777029695
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>38B, Ibn Sino, Termez</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-300 mt-8 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-sm text-gray-600">
                © 2026 TUES Economics Journal. All rights reserved.
              </div>
              <div className="flex items-center gap-4">
                <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Terms of Use
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  const cream = "rgb(253, 253, 251)";
  const creamMuted = "rgb(249, 249, 247)";
  const dark = "rgb(38, 41, 46)";
  const sectionTitleKeyMap: Record<string, string> = {
    University: "header:secondNav.university",
    Education: "header:secondNav.education",
    Science: "header:secondNav.science",
    Internationalization: "header:secondNav.internationalization",
    "Student Life": "header:secondNav.studentLife",
    "Admission 2025": "header:secondNav.admission2025",
    "Information Services": "header:secondNav.informationServices",
    Vacancies: "header:secondNav.vacancies",
  };
  const sectionLinkKeyMap: Record<string, string> = {
    Overview: "header:secondNavItems.overview",
    History: "header:secondNavItems.history",
    Leadership: "header:secondNavItems.leadership",
    Governance: "header:secondNavItems.governance",
    "Strategic Plan": "header:secondNavItems.strategicPlan",
    "Academic Programs": "header:secondNavItems.academicPrograms",
    Courses: "header:secondNavItems.courses",
    "Academic Calendar": "header:secondNavItems.academicCalendar",
    Faculty: "header:secondNavItems.faculty",
    Departments: "header:secondNavItems.departments",
    "Research Areas": "header:secondNavItems.researchAreas",
    Laboratories: "header:secondNavItems.laboratories",
    Publications: "header:secondNavItems.publications",
    Innovation: "header:secondNavItems.innovation",
    Collaborations: "header:secondNavItems.collaborations",
    "Exchange Programs": "header:secondNavItems.exchangePrograms",
    "Global Partnerships": "header:secondNavItems.globalPartnerships",
    "International Students": "header:secondNavItems.internationalStudents",
    "Study Abroad": "header:secondNavItems.studyAbroad",
    "Global Initiatives": "header:secondNavItems.globalInitiatives",
    "Campus Life": "header:secondNavItems.campusLife",
    "Student Clubs": "header:secondNavItems.studentClubs",
    Housing: "header:secondNavItems.housing",
    Dining: "header:secondNavItems.dining",
    Wellness: "header:secondNavItems.wellness",
    Requirements: "header:secondNavItems.requirements",
    "Application Process": "header:secondNavItems.applicationProcess",
    Deadlines: "header:secondNavItems.deadlines",
    Scholarships: "header:secondNavItems.scholarships",
    FAQs: "header:secondNavItems.faqs",
    Library: "header:secondNavItems.library",
    "IT Services": "header:secondNavItems.itServices",
    "Online Resources": "header:secondNavItems.onlineResources",
    Support: "header:secondNavItems.support",
    "Help Desk": "header:secondNavItems.helpDesk",
    "Academic Positions": "header:secondNavItems.academicPositions",
    "Administrative Positions": "header:secondNavItems.administrativePositions",
    "Research Positions": "header:secondNavItems.researchPositions",
    "How to Apply": "header:secondNavItems.howToApply",
    Benefits: "header:secondNavItems.benefits",
  };

  return (
    <footer className="w-full bg-white">
      <div className="w-full rounded-none bg-neutral-950 p-8 pb-0 lg:p-12 lg:pb-0">
        <div className="container mx-auto px-0">
          <div className="grid grid-cols-1 gap-12 py-0 lg:grid-cols-12 lg:gap-8">
            {/* Left column: logo, newsletter, social */}
            <div className="flex flex-col justify-between gap-8 lg:col-span-4">
              <div className="flex min-h-0 flex-1 flex-col gap-6">
                <Link to="/" className="shrink-0 self-start rounded-[8px]">
                  <img src="/logo_white.png" alt={t("footer:logoAlt")} className="h-10 w-auto object-contain sm:h-12" />
                </Link>
                <div className="flex flex-1 flex-col gap-4">
                  <h3 className="text-base font-semibold leading-snug text-white/90">
                    {t("newsletterTitle")}
                  </h3>
                  <form onSubmit={handleSubscribe} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                      <label htmlFor="footer-email" className="sr-only">
                        {t("emailAddress")}
                      </label>
                      <input
                        id="footer-email"
                        type="email"
                        placeholder={t("emailAddress")}
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="min-w-0 flex-1 rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30"
                      />
                      <button
                        type="submit"
                        className="shrink-0 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                      >
                        {t("subscribeNow")}
                      </button>
                    </div>
                    <label className="flex cursor-pointer items-center gap-3 text-center">
                      <input
                        type="checkbox"
                        required
                        className="h-4 w-4 shrink-0 rounded border-white/30 bg-white/10 text-primary focus:ring-primary/50"
                      />
                      <span className="text-xs text-white/60">
                        {t("consent")}
                      </span>
                    </label>
                  </form>
                  <div className="mt-auto flex flex-wrap items-center justify-start gap-4 pt-2">
                    {socialLinks.map((social) => {
                      const Icon = social.icon;
                      return (
                        <a
                          key={social.label}
                          href={social.href}
                          aria-label={social.label}
                          className="text-white/60 transition-colors hover:text-white"
                        >
                          <Icon className="h-5 w-5" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Right: menu columns from navbar */}
            <div className="grid grid-cols-4 grid-rows-2 gap-8 lg:col-span-8 lg:gap-6">
              {footerMenuSections.map((section) => (
                <div key={section.title} className="flex flex-col gap-4">
                  <h3 className="text-xs font-medium uppercase tracking-wider text-white/50">
                    {t(sectionTitleKeyMap[section.title] ?? section.title)}
                  </h3>
                  <ul className="list-none space-y-3 p-0">
                    {section.links.map((link) => (
                      <li key={link.label}>
                        {link.href.startsWith("/") ? (
                          <Link
                            to={link.href}
                            className="text-sm text-white/80 transition-colors hover:text-white"
                          >
                            {t(sectionLinkKeyMap[link.label] ?? link.label)}
                          </Link>
                        ) : (
                          <a
                            href={link.href}
                            className="text-sm text-white/80 transition-colors hover:text-white"
                          >
                            {t(sectionLinkKeyMap[link.label] ?? link.label)}
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Footer bottom - NanoFi-style: left = copyright + links, right = logo */}
          <div
            className="mt-10 w-full border-t px-4 py-6 sm:px-6 lg:px-8"
            style={{ borderColor: "rgba(255,255,255,0.1)" }}
          >
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
              <div
                className="flex flex-wrap items-center justify-center gap-4 text-sm md:justify-start"
                style={{ color: creamMuted }}
              >
                <span>{t("copyright", { brand: isEduHubPage ? "EduHub" : "TUES" })}</span>
                <a href="#" className="transition-colors hover:text-white">
                  {t("privacyPolicy")}
                </a>
                <a href="#" className="transition-colors hover:text-white">
                  {t("termsOfUse")}
                </a>
                <a href="#" className="transition-colors hover:text-white">
                  {t("accessibility")}
                </a>
              </div>
              <div className="flex items-center gap-4">
                {isEduHubPage ? (
                  <Link to="/eduhub" className="flex shrink-0 items-center">
                    <img src="/logo-eduhub.png" alt="EduHub" className="h-8 w-auto object-contain opacity-90" />
                  </Link>
                ) : (
                  <Link to="/" className="shrink-0 self-start rounded-[8px]">
                    <img src="/logo_white.png" alt={t("footer:logoAlt")} className="h-8 w-auto object-contain opacity-90" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
