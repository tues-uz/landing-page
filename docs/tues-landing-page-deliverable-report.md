# TUES Landing Page Deliverable Report — Source Document

> **Regenerate Word files:**
> - Master report: `python3 scripts/generate-landing-page-report.py` → `docs/TUES-Landing-Page-Deliverable-Report.docx`
> - Per-feature reports (single doc): `python3 scripts/generate-feature-reports.py` → `docs/TUES-Landing-Page-Feature-Reports.docx`

---

## Document Title

Professional Services Invoice & Deliverable Effort Report

TUES University Public Web Portal & Admissions System

Executive Commercial Invoice & Business Deliverable Report: Portal Modernization, CMS Content Management, Admissions Intake & Multilingual Public Experience

---

## Metadata & Project Overview

- **Document Reference:** INV-EFF/TUES-PORTAL/2026/09/001
- **Date of Issuance:** September 09, 2026
- **Project Title:** TUES University Public Web Portal & Admissions System
- **Contract / PO Reference:** [File]
- **Service Provider:** [Person]
- **Client Organization:** [Place]
- **Target Executive Audience:** University Steering Committee, Rectorate, Dean's Council, Finance Directorate, and IT Leadership
- **Total Delivered Effort:** 35.0 Man-Days (280 Professional Engineering Hours)
- **Scope Note:** This document covers Module 1 only — the `tues-landing-page` repository (Public Web Portal & Admissions). EduHub LMS and the Academic Journal platform are separate deliverables and are referenced only as external links where applicable.
- **Milestone Completion:** Core portal delivered; CMS operational; remaining items documented in Appendix A.

---

## Table of Contents

1. Executive Billing Summary & Commercial Schedule
2. Strategic Business Value & Return on Investment (ROI)
3. Module 1: TUES University Public Web Portal & Admissions System
4. CMS Admin Console (Content Management Subsystem)
5. Consolidated Effort Allocation & Role Accounting
6. Formal Billing Sign-Off & Payment Remittance Details
7. Appendix A — Remaining Work & Known Gaps

---

## 1. Executive Billing Summary & Commercial Schedule

### 1.1 Executive Summary

This document represents the formal Commercial Invoice and Business Deliverable Report submitted for the TUES University Public Web Portal. It provides institutional leadership with an executive-level account of the business objectives, operational workflows, and strategic value delivered for the public-facing digital presence and admissions intake system.

The scope encompassed the complete conceptualization, branding, user experience design, software development, CMS integration, multilingual localization, quality verification on a managed staging environment, and packaging for handoff to the university's deployment infrastructure.

### 1.2 Commercial Summary Recapitulation

| Indicator / Metric | Value / Status | Description / Notes |
|---|---|---|
| Total Delivered Effort | 35.0 Man-Days (MD) | 100.0% Module 1 Contract Delivery |
| Productive Engineering Hours | 280.0 Hours | Standard 8h / Man-Day equivalent |
| Application Delivered | 1 Core Public Portal | Public website + JWT-protected CMS admin |
| Total Routes Configured | 155 Routes | 138 public, 15 admin, login, 404 |
| Total Page Components | 147 Page Files | Plus 3 feature-routed pages (login, dashboard, admins) |
| Supported Languages | 4 (UZ / EN / RU / CN) | 48 locale JSON bundles + code fallbacks |
| CMS Admin Modules | 9 Functional Modules | Hero, news, events, programs, applications, newsletter, users |
| Delivery Status | Complete | Core portal and CMS modules delivered |
| Total Net Milestone Value | Fixed-Price Milestone | Net Amount as per Contract Schedule |

---

## 2. Strategic Business Value & Return on Investment (ROI)

For the university's executive leadership and finance committee, this investment delivers tangible institutional benefits across six primary dimensions:

- **Revenue Acceleration:** 24/7 global admissions intake via the digital application portal (`/admission-2025/apply`), with applications routed to the CMS admin inbox for staff review.
- **Operational Efficiency:** Self-service CMS for news, events, hero carousel, and study program content — reducing dependency on developers for routine content updates.
- **Global Reach:** Four-language public experience (Uzbek, English, Russian, Chinese) with localized study program titles and curriculum content.
- **Institutional Showcase:** Interactive virtual campus tour (homepage Kuula embeds + dedicated Photo Sphere Viewer page at `/virtual-tour`) driving prospective student engagement.
- **Academic Transparency:** Dynamic bachelor and master's degree catalogs with downloadable program PDFs, curriculum detail pages, and faculty-organized study program listings.
- **Statutory Accessibility:** Floating accessibility widget providing high-contrast mode, grayscale, color inversion, font enlargement, and brightness/contrast controls (WCAG-oriented).

---

## 3. Module 1: TUES University Public Web Portal & Admissions System

**Delivered Effort:** 35.0 Man-Days (280 Hours)
**Target Beneficiaries:** Prospective Students, Parents, International Partners, Alumni, Public Visitors, and University Communications Staff

### 3.1 Business Purpose

Transform the university's public digital identity into a comprehensive institutional showcase, driving international prospective student enrollments, centralizing campus communications, and providing staff with a modern content management workflow for news, events, and academic program information.

### 3.2 Business Features & Operational Capabilities

| Sub-Module Code | Feature / Capability Name | Business Objective & User-Facing Functionality | Effort |
|---|---|---|---|
| PORTAL-1.1 | Institutional Brand Identity & App Shell | Oxford Blue / Gold visual identity, responsive header with mega-dropdown navigation, dynamic breadcrumbs, site-wide search, floating language switcher (UZ/EN/RU/CN), and footer with institutional links. | 6.0 MD |
| PORTAL-1.2 | Interactive Virtual Campus Tour | Homepage Kuula 360° embeds (3 campus collections: Medicine, Campus, Med Hub) plus dedicated `/virtual-tour` page built with Photo Sphere Viewer (linked panoramic nodes, gallery plugin, custom tooltips and loader). | 4.5 MD |
| PORTAL-1.3 | Digital Admissions 2025 Intake Portal | Multi-field application form with study program selection, identity document fields, captcha anti-bot protection, and admin applications inbox with status workflow (new / contacted / rejected / enrolled). | 5.5 MD |
| PORTAL-1.4 | Academic Programs & Curriculum Showcases | Bachelor full-time/correspondence hubs, master's degree catalog, CMS-managed study programs (3 faculties, 37 programs), localized curriculum (509 courses), and downloadable program PDFs. | 4.5 MD |
| PORTAL-1.5 | Executive Governance & Leadership Directory | Organizational structure org-chart pages, dean/vice-rector/department leader profile pages, university departments hub, and leadership council content. | 3.5 MD |
| PORTAL-1.6 | Internationalization & Global Grants | 30 routes under `/internationalization/*` covering teacher exchange, global scholarship directories (MEXT, Matsumae, Humphrey Fellowship), minority support, and international relations content. | 4.0 MD |
| PORTAL-1.7 | Digital Newsroom & Events Calendar | Public news listing with date/category filters, event calendar with detail pages, CMS Tiptap article editor, drag-and-drop news ordering, event translations (UZ/EN/RU), and newsletter subscriber management. | 4.0 MD |
| PORTAL-1.8 | Statutory Accessibility Toolbar (WCAG 2.1 AA) | Floating accessibility widget: high contrast, grayscale, color inversion, font size (+/− 4 steps), brightness/contrast sliders; settings persisted in browser localStorage. | 3.0 MD |
| **SUBTOTAL** | **TUES PUBLIC WEB PORTAL** | **155 Routes, 147 Pages, 4 Languages, 9 CMS Modules** | **35.0 MD** |

### 3.3 Technology Stack

| Layer | Technologies |
|---|---|
| Frontend | React 18, TypeScript 5, Vite 5 |
| Routing | React Router v6 (155 routes in `App.tsx`) |
| Styling | Tailwind CSS 3, Radix UI / shadcn components |
| State / Data | TanStack React Query 5 |
| Internationalization | i18next, react-i18next (4 languages, 12 namespaces) |
| CMS Rich Text | Tiptap 3 (starter-kit, image, link, placeholder) |
| Virtual Tour | Photo Sphere Viewer 5 + Kuula embeds |
| Animation | GSAP 3 with ScrollTrigger |
| Backend Integration | REST API via `VITE_API_BASE_URL`, JWT auth for admin |
| Accessibility | Custom widget + `open-accessibility` library |

---

## 4. CMS Admin Console (Content Management Subsystem)

The portal includes a JWT-authenticated admin console (`/admin/*`) enabling non-technical staff to manage public content without developer intervention.

| Admin Module | Route | Capabilities |
|---|---|---|
| Dashboard | `/admin` | Overview, quick actions, recent activity |
| Hero Management | `/admin/hero` | Carousel slides + background video/image, UZ/EN/RU translations |
| News Board | `/admin/news` | Drag-and-drop highlight ordering, article list |
| News Articles | `/admin/news/articles` | Tiptap rich-text editor, cover image upload, UZ/EN/RU tabs, category/display type |
| Events | `/admin/events` | Create/edit events, date/time/location/description, image upload, translations |
| Study Programs | `/admin/study-programs` | Faculty manager, program CRUD, curriculum editing, translations |
| Bachelor Programs | `/admin/bachelor-programs` | Full-time/correspondence program content editing |
| Applications | `/admin/applications` | Admissions inbox, status updates, applicant detail view |
| Newsletter | `/admin/newsletter` | Subscriber list management |
| User Provisioning | `/admin/users` | Admin account creation with role-based permissions |

**Permission model:** Role-based access via `usePermissions` hook — hero, news, events, applications, newsletter scopes; superadmin bypass.

---

## 5. Consolidated Effort Allocation & Role Accounting

| Solution Domain / Sub-Module | Delivered Effort (MD) | Allocation (%) |
|---|---|---|
| PORTAL-1.1 Institutional Brand Identity & App Shell | 6.0 MD | 17.1% |
| PORTAL-1.2 Interactive Virtual Campus Tour | 4.5 MD | 12.9% |
| PORTAL-1.3 Digital Admissions 2025 Intake Portal | 5.5 MD | 15.7% |
| PORTAL-1.4 Academic Programs & Curriculum Showcases | 4.5 MD | 12.9% |
| PORTAL-1.5 Executive Governance & Leadership Directory | 3.5 MD | 10.0% |
| PORTAL-1.6 Internationalization & Global Grants | 4.0 MD | 11.4% |
| PORTAL-1.7 Digital Newsroom & Events Calendar | 4.0 MD | 11.4% |
| PORTAL-1.8 Statutory Accessibility Toolbar | 3.0 MD | 8.6% |
| **TOTAL DELIVERED PROJECT EFFORT** | **35.0 MD** | **100.0%** |

---

## 6. Formal Billing Sign-Off & Payment Remittance Details

### 6.1 Commercial Billing Summary

- **Total Delivered Professional Effort:** 35.0 Man-Days (280 Productive Engineering Hours)
- **Contract Milestone:** Public Web Portal Delivery & CMS Integration
- **Payment Terms:** Net 14 Calendar Days from receipt of invoice

### 6.2 Corporate Bank Wire Remittance Details

Please remit funds to the service provider's designated corporate bank account:

- **Account Name:** [Person]
- **Account Number:** [File]
- **Beneficiary Bank:** [Place]
- **Bank Branch:** [Place]
- **SWIFT / BIC Code:** [File]
- **Payment Reference:** Invoice INV-EFF/TUES-PORTAL/2026/09/001

### 6.3 Formal Sign-Off

IN WITNESS WHEREOF, the undersigned authorized representatives hereby confirm and certify the accuracy and delivery of the professional engineering efforts detailed throughout this dossier:

| | SUBMITTED BY (SERVICE PROVIDER) | RECEIVED & VERIFIED BY (CLIENT) |
|---|---|---|
| Company | [Person] | [Place] |
| Signature | ___________________________ | ___________________________ |
| Name | [Person] | [Person] |
| Title | Managing Director / Lead Partner | Chief Information Officer / Vice Rector |
| Date | September 09, 2026 | September 09, 2026 |

---

## 7. Appendix A — Remaining Work & Known Gaps

This appendix documents items identified during delivery that are outside the core Module 1 scope or pending client content/decisions. These do not diminish the delivered functionality but should be tracked for future sprints.

### A.1 Navigation Links Without Pages (68 items)

The main navbar (About · Research · Admissions · News) and 22 Explore-more links are fully wired. The following **68 menu labels** still resolve to `#` (no destination page):

| Location | Count | Examples |
|---|---|---|
| Header social icons | 4 | Twitter, LinkedIn, Instagram, YouTube |
| Mobile menu extras | 3 | Community, Colleges, Journal |
| Explore more → University | 18 | License, Charter, Faculties, Open data, etc. |
| Explore more → Education | 4 | Course catalogue, Resources, Study plans, Syllabus |
| Explore more → Science | 4 | Seminars, Scientific journals, Expected conferences, Academic council |
| Explore more → Internationalization | 9 | International relations, grants hub, support center, etc. |
| Explore more → Student life | 1 | Contests |
| Explore more → Admission 2025 | 14 | Apply, FAQ, contract amounts, transfer info, etc. |
| Explore more → Information services | 6 | Latest news, video gallery, photo gallery, etc. |
| Explore more → Vacancies | 5 | Academic/admin/research positions, benefits |

*Source: `CLIENT_DELIVERY_STATUS.md` — wiring controlled by `src/config/topNavHubData.ts`*

### A.2 Virtual Tour — Remaining Items

- Arrow SVG sizing refinement across breakpoints
- Controls layout review (caption / gallery / navbar ordering)
- Optional panorama asset optimization for low-end devices

### A.3 External System Links

- **EduHub LMS** (`/eduhub`) and **Journal** links in the header point to external systems not included in this repository.
- **Distance learning** Explore-more link opens `https://lms.tues.uz/` in a new tab.

### A.4 Content Enrichment (Not Blocking)

Many routed pages exist with structural layout and i18n keys but may benefit from richer copy, images, or PDF attachments supplied by the university communications team. This is a content population task, not a development blocker.
