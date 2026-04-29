# Client delivery status — menus (navbar & Explore more)

How to read this:

- **Done** = clicking the label opens a real in-app URL or an external URL (e.g. LMS).
- **Undone** = the label is shown but the link is **`#`** (no page) or the control is not wired.

---

## Menus with no page yet (no place for content)

**“No content” here** = the item has **no URL** (`#`). There is no page to open or edit until developers add a route and map the label in `topNavItemHref`.

| Location | What still has no page |
|----------|-------------------------|
| **Header — social icons** | Twitter, LinkedIn, Instagram, YouTube (**4** links, all `#`) |
| **Mobile menu** (under About / Research / …) | Community, Colleges, Journal (**3** links, all `#`) |
| **Explore more → University** | Whole column — **18** labels, all `#` |
| **Explore more → Education** | Course catalogue, Resources, Study plans, Syllabus — **4** labels, all `#` |
| **Explore more → Science** | Seminars, Scientific journals, Expected conferences, Academic council — **4** labels, all `#` |
| **Explore more → Internationalization** | Whole column — **9** labels, all `#` |
| **Explore more → Student life** | Contests — **1** label, `#` |
| **Explore more → Admission 2025** | Whole column — **14** labels, all `#` |
| **Explore more → Information services** | Whole column — **6** labels, all `#` |
| **Explore more → Vacancies** | Whole column — **5** labels, all `#` |

**Total with no page:** **68** (7 in header / mobile + **61** in Explore more). Full English names for the Explore-more list are in **§3.3** below.

**Items that already have a URL** may still need richer copy, images, or PDFs — that is separate from “no page.” The main navbar (About · Research · Admissions · News) and every **Explore more** row in **§3.2** already open real routes.

---

## 1. Main navbar (desktop — center: About · Research · Admissions · News)

Each column opens a dropdown. **Every submenu item below is linked** to a route (via `topNavItemHref`). The column title in the dropdown also links to its **hub** page.

| Column | Hub (title link in dropdown) | Submenu items — **Done** (all linked) |
|--------|------------------------------|----------------------------------------|
| **About** | `/about` | Who we are · Regulation · University in numbers · Organizational structure · Leadership and councils · Accreditation and license · Workers’ union committee · Why TUES |
| **Research** | `/research` | Scientific publications & journals · Seminars & conferences · Academic council · Research papers & publications · Entrepreneurial & innovation clubs |
| **Admissions** | `/admissions` | Study programs · Regulations & requirements · Secondary education requirements · Contract amounts & tuition |
| **News** | `/news` | Latest news (`/news`) · Upcoming events (`/events`) · Video gallery (`/media/video-gallery`) · Photo gallery (`/media/photo-gallery`) |

**Other header controls (not the four columns above)**

| Item | Status |
|------|--------|
| Logo / university name → home | **Done** (`/`) |
| Search icon → search dialog | **Done** |
| Top bar phone / email | **Done** (`tel:` / `mailto:`) |
| Top bar social (Twitter, LinkedIn, Instagram, YouTube) | **Undone** (`href="#"`) |
| EduHub / Journal (top bar, red buttons) | **Done** (both go to `/eduhub`) |

---

## 2. Mobile hamburger menu — extra row (under main accordion)

Below **About / Research / Admissions / News** on small screens, three plain links are shown:

| Label (from `nav.*`) | Status |
|----------------------|--------|
| Community (`nav.community`) | **Undone** (`#`) |
| Colleges (`nav.colleges`) | **Undone** (`#`) |
| Journal (`nav.journal`) | **Undone** (`#`) |

The **Explore more** block on mobile uses the same wiring as section 3 below.

---

## 3. Explore more menu (hamburger on large screens, or full mobile menu section)

Opened from **Explore more** (desktop) or from the **menu** icon flow where the accordion lists University, Education, Science, etc.

### 3.1 Quick counts by column

| Column | Working links | Not working (`#`) | Total rows |
|--------|---------------|-------------------|------------|
| University | 0 | 18 | 18 |
| Education | 4 | 4 | 8 |
| Science | 4 | 4 | 8 |
| Internationalization | 0 | 9 | 9 |
| Student life | 14 | 1 | 15 |
| Admission 2025 | 0 | 14 | 14 |
| Information services | 0 | 6 | 6 |
| Vacancies | 0 | 5 | 5 |
| **Total** | **22** | **61** | **83** |

---

### 3.2 Explore more — **Done** (working links)

**Education**

| Label | URL |
|-------|-----|
| Bachelor | `/education/bachelor` |
| Master’s degree | `/education/masters` |
| Qualification requirements | `/education/qualification-requirements` |
| Distance learning system | `https://lms.tues.uz/` (opens in new tab) |

**Science**

| Label | URL |
|-------|-----|
| Scientific articles | `/science/scientific-articles` |
| Certificates | `/science/certificates` |
| Entrepreneurial Clubs | `/science/entrepreneurial-clubs` |
| Center for Research and Sustainable Innovative Development | `/science/center-research-sustainable-innovation` |

*Certificate and research center **detail** pages exist at `/science/certificates/:id` and `/science/center-research-sustainable-innovation/:id` but are opened from **cards** on those hubs, not as separate Explore-more rows.*

**Student life**

| Label | URL |
|-------|-----|
| Community clubs | `/student-life/community-clubs` |
| Health support service | `/student-life/health-support` |
| Social Life | `/student-life/social-life` |
| Social Rooms | `/student-life/social-rooms` |
| Support center for minority groups | `/student-life/support-center-minority-groups` |
| Dormitory | `/student-life/dormitory` |
| Sport Facilities | `/student-life/sport-facilities` |
| Cafeterias | `/student-life/cafeterias` |
| Bookstore | `/student-life/bookstore` |
| Facilities for the disabled | `/student-life/facilities-for-disabled` |
| Student opinion | `/student-life/student-opinion` |
| Career centre | `/student-life/career-centre` |
| 24/7 help | `/student-life/24-7-help` |
| Student Academic Support | `/student-life/student-academic-support` |

---

### 3.3 Explore more — **Undone** (still `#`)

**University (18)**  
License · University Mission · Charter · Organizational structure · Councils · Ratings · Requisites · Financial statements · University in numbers · Accreditation · Famous graduates · Faculties · Departments · Center and departments · Open data · Trade union committee · Contract prices · Campus Culture  

**Education (4)**  
Course catalogue · Resources · Study plans · Syllabus  

**Science (4)**  
Seminars · Scientific journals · Expected conferences · Academic council  

**Internationalization (9)**  
International relations · TISU xorijiy tillarni o'qitish markazi · Employees of the Department of International Relations · International grants · International scientific relations · International conferences · Professional development and education in the choir · Advanced training programs for foreign teachers · International Support Center  

**Student life (1)**  
Contests  

**Admission 2025 (14)**  
List of educational areas · Apply · Regulation on secondary education · Admission 2025 · Transfer of studies · To local applicants · Information about transfer of education · Information about contract amounts · Menu · For international applicants · Contacting about admission · Instructions for applicants · Register for undergraduate admission · FAQ  

**Information services (6)**  
Latest news · Directions and contract sums · About university · Yashil universitet1 · Video gallery · Photo gallery  

**Vacancies (5)**  
Academic Positions · Administrative Positions · Research Positions · How to Apply · Benefits  

---

## Note for developers (optional)

There is a second, **hidden** desktop strip in `Header.tsx` (`secondNavMega`) with hardcoded English links that are mostly `#`. The live **Explore more** experience uses **`secondNavItems`** + **`getTopNavItemHref`** (this document). The hidden strip is not shown to users while the parent `<nav>` has the `hidden` class.

---

*Wiring source: `src/config/topNavHubData.ts` (`topNavItemHref`). Update this file when the client delivery status should change.*
