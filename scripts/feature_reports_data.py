"""Per-feature deliverable report definitions for PORTAL-1.1 through PORTAL-1.8."""

from __future__ import annotations

from dataclasses import dataclass, field


@dataclass
class FeatureReport:
    code: str
    slug: str
    title: str
    effort_md: str
    allocation_pct: str
    beneficiaries: str
    purpose: str
    routes: list[str]
    source_files: list[str]
    capabilities: list[str]
    known_gaps: list[str] = field(default_factory=list)
    admin_routes: list[str] = field(default_factory=list)


FEATURES: list[FeatureReport] = [
    FeatureReport(
        code="PORTAL-1.1",
        slug="institutional-brand-app-shell",
        title="Institutional Brand Identity & App Shell",
        effort_md="6.0 MD",
        allocation_pct="17.1%",
        beneficiaries="All public visitors, prospective students, and university staff",
        purpose=(
            "Establish a prestigious, consistent digital identity for Termiz University of Economics and Service "
            "with responsive navigation, multilingual support, site-wide search, and an app shell that scales across "
            "155 routes and 147 page components."
        ),
        routes=[
            "/ — Homepage (hero, stats, news, programs, virtual tour preview)",
            "/search — Site-wide search (news, events, study programs, static pages)",
            "/about, /research, /admissions, /news — Primary navigation hub pages",
            "TopNavSubPage dynamic routes: /about/:slug, /research/:slug, /admissions/:slug, /media/:slug",
        ],
        source_files=[
            "src/components/Header.tsx — Mega-menu navigation, search dialog, language switcher mount",
            "src/components/Footer.tsx — Institutional links and contact blocks",
            "src/config/topNavHubData.ts — Navigation hub URLs and Explore-more wiring",
            "src/components/FloatingLanguageSwitcher.tsx — UZ / EN / RU / CN selector",
            "src/pages/SiteSearchPage.tsx + src/lib/siteSearch.ts — Unified search index",
            "src/lib/i18n.ts + public/locales/{uz,en,ru,zh}/ — 4 languages, 12 namespaces",
            "src/App.tsx — 155 route definitions",
        ],
        capabilities=[
            "Oxford Blue / Gold brand palette applied site-wide via Tailwind theme",
            "Desktop mega-dropdown menus for About, Research, Admissions, News columns",
            "Explore-more accordion menu with 83 secondary navigation rows",
            "Dynamic breadcrumb trails on detail pages (programs, news, events, education)",
            "Floating language switcher with persisted locale (i18next)",
            "Header search dialog with live results across news, events, and programs",
            "Responsive mobile hamburger menu with accordion sections",
            "GSAP scroll animations on homepage sections",
        ],
        known_gaps=[
            "Explore-more → University column (18 items) — all #",
            "Explore-more → Internationalization column (9 items) — all #",
            "Explore-more → Admission 2025 column (14 items) — all # (some routes exist under different nav paths)",
        ],
    ),
    FeatureReport(
        code="PORTAL-1.2",
        slug="virtual-campus-tour",
        title="Interactive Virtual Campus Tour",
        effort_md="4.5 MD",
        allocation_pct="12.9%",
        beneficiaries="Prospective students, parents, international partners",
        purpose=(
            "Provide an immersive digital campus experience allowing remote visitors to explore TUES facilities "
            "before visiting in person, supporting international recruitment and open-day marketing."
        ),
        routes=[
            "/virtual-tour — Full-screen Photo Sphere Viewer tour page",
            "/ (homepage) — Virtual Tour section with Kuula 360° embeds",
        ],
        source_files=[
            "src/pages/VirtualTourPage.tsx — Photo Sphere Viewer with VirtualTour + Gallery plugins",
            "src/components/VirtualTour.tsx — Homepage Kuula embed section (3 collections)",
            "src/config/virtualTourContent.ts — Kuula collection URLs (Medicine, Campus, Med Hub)",
            "src/pages/virtual-tour-overrides.css — Custom PSV styling",
            "public/virtual-tour/ — Local equirectangular panorama assets",
        ],
        capabilities=[
            "Homepage: 3 Kuula 360° collections (Medicine, Campus, Med Hub) with tab switcher",
            "Dedicated /virtual-tour page: Photo Sphere Viewer with linked panoramic nodes",
            "Gallery plugin for thumbnail navigation between tour nodes",
            "Custom first-load animated loader (7-ball animation)",
            "Custom arrow-hover tooltip cards with image, title, and caption",
            "Performance optimizations: disabled preload, reduced antialias, lower resolution",
            "Layout sits below site header; full viewport under navbar",
        ],
        known_gaps=[
            "Homepage Kuula embeds use external Kuula.co URLs (3 collections)",
            "PSV page uses Poly Haven CC0 demo assets — may be swapped for real campus photography",
        ],
    ),
    FeatureReport(
        code="PORTAL-1.3",
        slug="admissions-2025-portal",
        title="Digital Admissions 2025 Intake Portal",
        effort_md="5.5 MD",
        allocation_pct="15.7%",
        beneficiaries="Prospective students, admission office staff",
        purpose=(
            "Enable 24/7 digital application intake for prospective students with structured data collection, "
            "anti-bot protection, and an admin inbox for admission staff to review and update application status."
        ),
        routes=[
            "/admission-2025/apply — Primary application form",
            "/admission-2025/faq — Admissions FAQ",
            "/admission-2025/contract-amounts — Contract amounts and tuition",
            "/admission-2025/contacting-admission — Contact information",
            "/admission-2025/transfer-of-studies — Transfer information",
            "/admin/applications — Staff applications inbox",
        ],
        source_files=[
            "src/pages/StudyProgramApplyPage.tsx — Application page wrapper",
            "src/components/StudyProgramApplicationForm.tsx — Multi-field form with validation",
            "src/pages/admin/AdminApplications.tsx — Admin inbox with status workflow",
            "src/api/client.ts — ApplicationSubmitPayload + captcha API",
            "src/api/adminClient.ts — applications.list, updateStatus",
        ],
        capabilities=[
            "Application fields: full name, citizenship, phone, passport, JSHSHIR, study type, program selection",
            "Captcha challenge anti-bot protection on submit",
            "Form validation via react-hook-form + zod",
            "Admin inbox: list, filter, and update status (new / contacted / rejected / enrolled)",
            "Supporting admission pages: FAQ, contract amounts, transfer info, contacting admission",
        ],
        known_gaps=[
            "Explore-more → Admission 2025 column not fully wired to existing routes",
        ],
        admin_routes=["/admin/applications"],
    ),
    FeatureReport(
        code="PORTAL-1.4",
        slug="academic-programs-curriculum",
        title="Academic Programs & Curriculum Showcases",
        effort_md="4.5 MD",
        allocation_pct="12.9%",
        beneficiaries="Prospective students, academic deans, program coordinators",
        purpose=(
            "Present the university's full academic offering — bachelor (full-time and correspondence), master's degrees, "
            "and CMS-managed study programs — with localized curriculum detail and downloadable program PDFs."
        ),
        routes=[
            "/programs — Study programs listing (CMS-backed)",
            "/admissions/study-programs/:programId — CMS study program detail",
            "/education/bachelor — Bachelor hub",
            "/education/bachelor/:track — Full-time or correspondence track listing",
            "/education/bachelor/:track/programs/:programNo — Bachelor program detail + PDF download",
            "/education/masters — Master's degree listing",
            "/education/masters/programs/:programNo — Master's program detail + PDF download",
            "/education/qualification-requirements — Qualification requirements",
            "/education/bachelor/international-foundation-year — Foundation year",
            "/admin/study-programs, /admin/study-programs/:id/edit — CMS study programs",
            "/admin/bachelor-programs, /admin/bachelor-programs/:id/edit — CMS bachelor programs",
        ],
        source_files=[
            "src/pages/BachelorHubPage.tsx, BachelorTrackPage.tsx, BachelorFullTimeProgramDetailPage.tsx",
            "src/pages/MastersDegreePage.tsx, MastersDegreeProgramDetailPage.tsx",
            "src/pages/StudyProgramDetailPage.tsx, StudyProgramDetailView.tsx",
            "src/components/Programs.tsx, StudyProgramsSection.tsx, ProgramListingLinkRow.tsx",
            "src/data/bachelor-full-time-programs.json, bachelor-correspondence-programs.json",
            "src/data/mastersDegreePrograms.ts",
            "src/data/studyPrograms/ + studyProgramsCurriculum.ts (509 courses, 14 groups)",
            "src/lib/educationProgramPdf.ts — PDF href helpers",
            "public/documents/bachelor/{track}/{cipher}.pdf, public/documents/masters/{code}.pdf",
            "src/lib/localizeStudyPrograms.ts — Localized program titles per locale",
        ],
        capabilities=[
            "Bachelor catalog: 27 full-time + 13 correspondence programs with cipher codes",
            "Master's catalog: 12 specialty programs with specialty codes",
            "CMS study programs: 3 faculties, 37 programs, curriculum editor with UZ/EN/RU translations",
            "Localized curriculum: 509 courses across 14 groups in 4 languages",
            "Program detail pages: duration, credits, qualification, overview, PDF download",
            "Program listing rows: title link + download icon + arrow navigation",
            "Faculty manager in admin for organizing programs by faculty",
        ],
        known_gaps=[
            "4 Explore-more Education labels not wired despite bachelor hub existing at /education/bachelor",
        ],
        admin_routes=[
            "/admin/study-programs",
            "/admin/study-programs/:programId/edit",
            "/admin/bachelor-programs",
            "/admin/bachelor-programs/:id/edit",
        ],
    ),
    FeatureReport(
        code="PORTAL-1.5",
        slug="leadership-governance-directory",
        title="Executive Governance & Leadership Directory",
        effort_md="3.5 MD",
        allocation_pct="10.0%",
        beneficiaries="University leadership, deans, public stakeholders",
        purpose=(
            "Publish official leadership profiles, organizational structure, and department directories "
            "for transparency and stakeholder communication."
        ),
        routes=[
            "/about — About hub with leadership and governance links",
            "/about/student-council, /about/new-scientific-council, /about/womens-affairs-advisory-committee",
            "/university-departments — Departments hub",
            "/university-departments/first-vice-rector-academic-affairs",
            "/university-departments/dean-economics-information-technology",
            "/university-departments/dean-pedagogy-social-humanities",
            "/university-departments/dean-medicine",
            "/university-departments/profile/:leaderId — Dynamic leader profile",
            "/university-faculties, /university-faculties/medicine, etc.",
            "Organizational structure pages under /about",
        ],
        source_files=[
            "src/pages/UniversityDepartmentsPage.tsx, UniversityFacultiesPage.tsx",
            "src/pages/DepartmentLeaderProfilePage.tsx",
            "src/data/organizationalLeaderProfiles/ — Leader profile data",
            "src/config/organizationalStructureOrgChartTree.ts — Org chart tree",
            "src/pages/StudentCouncilPage.tsx, NewScientificCouncilPage.tsx, WomensAffairsCommitteePage.tsx",
        ],
        capabilities=[
            "University departments hub with dean and vice-rector profile pages",
            "Dynamic leader profile pages by leaderId slug",
            "Faculty detail pages (Medicine, Pedagogy, Economics & IT)",
            "Student Council, Scientific Council, Women's Affairs Committee content pages",
            "Organizational structure org-chart visualization",
            "Accreditation registry pages (INTEAS, WDOMS)",
        ],
        known_gaps=[
            "Many University Explore-more labels duplicate routes that exist elsewhere but are not cross-linked",
        ],
    ),
    FeatureReport(
        code="PORTAL-1.6",
        slug="internationalization-global-grants",
        title="Internationalization & Global Grants",
        effort_md="4.0 MD",
        allocation_pct="11.4%",
        beneficiaries="International students, faculty on exchange, grant applicants",
        purpose=(
            "Showcase the university's international partnerships, teacher exchange programs, global scholarship "
            "directories, and international conference participation to support global recruitment and research visibility."
        ),
        routes=[
            "/internationalization/international-grants — Grants hub",
            "/internationalization/international-grants/mext-japan-2026",
            "/internationalization/international-grants/japan-matsumae-foundation",
            "/internationalization/international-grants/hubert-h-humphrey-fellowship",
            "/internationalization/international-support-center — Support center hub",
            "/internationalization/advanced-training-foreign-teachers — Training programs hub",
            "/internationalization/professional-development-education-choir — Choir exchange hub",
            "/internationalization/international-conferences — Conferences hub (+ 8 detail routes)",
            "/internationalization/department-international-relations-employees — Staff directory",
            "30+ routes total under /internationalization/*",
        ],
        source_files=[
            "src/pages/InternationalGrantsPage.tsx, InternationalSupportCenterPage.tsx",
            "src/pages/AdvancedTrainingForeignTeachersPage.tsx",
            "src/pages/ProfessionalDevelopmentEducationChoirPage.tsx",
            "src/pages/InternationalConferencesPage.tsx",
            "src/pages/DepartmentInternationalRelationsEmployeesPage.tsx",
            "Multiple detail pages for grants, conferences, and exchange programs",
        ],
        capabilities=[
            "International grants directory: MEXT Japan, Matsumae Foundation, Humphrey Fellowship",
            "International support center with about page",
            "Advanced training programs for foreign teachers (FZU, South Korea, Guangzhou visits)",
            "Professional development choir exchange (Indonesia, Turkey, Medipol programs)",
            "International conferences listing with 8 individual conference detail pages",
            "Department of International Relations employee directory with role profiles",
            "All content localized via i18n locale files and code defaults",
        ],
        known_gaps=[
            "Internationalization Explore-more menu not wired to existing /internationalization/* routes",
        ],
    ),
    FeatureReport(
        code="PORTAL-1.7",
        slug="newsroom-events-calendar",
        title="Digital Newsroom & Events Calendar",
        effort_md="4.0 MD",
        allocation_pct="11.4%",
        beneficiaries="Public relations staff, prospective students, campus community",
        purpose=(
            "Provide a self-service digital newsroom and events calendar allowing communications staff to publish "
            "university news, press releases, and event schedules without developer involvement."
        ),
        routes=[
            "/news — News listing with search, category filter, date sort",
            "/news/:slug — News article detail",
            "/events — Events listing",
            "/events/:id — Event detail with description",
            "/admin/news — News board (highlight ordering)",
            "/admin/news/articles — Article editor (Tiptap)",
            "/admin/events — Events CMS",
            "/admin/newsletter — Newsletter subscribers",
        ],
        source_files=[
            "src/pages/NewsEventsPage.tsx, NewsDetailPage.tsx",
            "src/pages/EventsPage.tsx, EventDetailPage.tsx",
            "src/components/NewsEvents.tsx — Homepage news/events section",
            "src/pages/admin/AdminNewsBoard.tsx, AdminNews.tsx",
            "src/pages/admin/AdminEvents.tsx",
            "src/components/admin/ArticleEditor.tsx — Tiptap rich-text editor",
            "src/lib/newsDateUtils.ts — Date normalization and sortNewsByDate",
            "src/api/client.ts — contentApi.news.list (newest-first default)",
        ],
        capabilities=[
            "Public news: hero carousel (highlight articles), grid listing, search, category filter, date sort",
            "Public events: card listing, detail page with date/time/location/description",
            "CMS news: Tiptap article editor, cover image upload, UZ/EN/RU translation tabs",
            "CMS news board: drag-and-drop highlight ordering (max 5 highlights)",
            "CMS events: create/edit with title, date, time, location, description, image, translations",
            "Newsletter subscriber list in admin",
            "Presigned media upload for hero, news, and event images",
            "News sorted by publication date (newest first) on public page",
        ],
        known_gaps=[
            "Explore-more Information services: Latest news, video/photo gallery — still # (routes exist at /news, /media/*)",
        ],
        admin_routes=[
            "/admin/news",
            "/admin/news/articles",
            "/admin/events",
            "/admin/newsletter",
        ],
    ),
    FeatureReport(
        code="PORTAL-1.8",
        slug="accessibility-toolbar",
        title="Statutory Accessibility Toolbar (WCAG 2.1 AA)",
        effort_md="3.0 MD",
        allocation_pct="8.6%",
        beneficiaries="Users with visual impairments, elderly visitors, compliance auditors",
        purpose=(
            "Provide one-click accessibility controls meeting government accessibility compliance requirements, "
            "ensuring the portal is usable by people with diverse visual needs."
        ),
        routes=[
            "Global — FloatingAccessibilityButton mounted in App.tsx on all public pages",
            "/student-life/facilities-for-disabled — Dedicated accessibility information page",
        ],
        source_files=[
            "src/components/FloatingAccessibilityButton.tsx — Main accessibility widget",
            "src/pages/FacilitiesForDisabledPage.tsx — Facilities for disabled students page",
            "package.json — open-accessibility dependency",
        ],
        capabilities=[
            "Floating accessibility button on all public pages",
            "Text size enlargement/reduction (+/− 4 steps)",
            "High contrast mode toggle",
            "Grayscale mode toggle",
            "Color inversion toggle",
            "Brightness adjustment (+/− 3 steps)",
            "Contrast adjustment (+/− 3 steps)",
            "Reset all settings to default",
            "Settings persisted in browser localStorage",
            "Dedicated /student-life/facilities-for-disabled information page",
        ],
        known_gaps=[
            "Automated accessibility audit report not included in delivery documentation",
        ],
    ),
]
