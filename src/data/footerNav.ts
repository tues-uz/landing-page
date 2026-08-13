/**
 * Footer menu sections — aligned with navbar (secondNavItems in Header).
 * Used by Footer for link columns.
 */
export type FooterLink = { label: string; href: string };

export type FooterSection = { title: string; links: FooterLink[] };

export const footerMenuSections: FooterSection[] = [
  {
    title: "University",
    links: [
      { label: "Overview", href: "#" },
      { label: "History", href: "#" },
      { label: "Leadership", href: "#" },
      { label: "Governance", href: "#" },
      { label: "Strategic Plan", href: "#" },
    ],
  },
  {
    title: "Education",
    links: [
      { label: "Academic Programs", href: "/programs" },
      { label: "Courses", href: "#" },
      { label: "Academic Calendar", href: "#" },
      { label: "Faculty", href: "#" },
      { label: "Departments", href: "#" },
    ],
  },
  {
    title: "Science",
    links: [
      { label: "Research Areas", href: "#" },
      { label: "Laboratories", href: "#" },
      { label: "Publications", href: "#" },
      { label: "Innovation", href: "#" },
      { label: "Collaborations", href: "#" },
    ],
  },
  {
    title: "Internationalization",
    links: [
      { label: "Exchange Programs", href: "#" },
      { label: "Global Partnerships", href: "#" },
      { label: "International Students", href: "#" },
      { label: "Study Abroad", href: "#" },
      { label: "Global Initiatives", href: "#" },
    ],
  },
  {
    title: "Student Life",
    links: [
      { label: "Campus Life", href: "#" },
      { label: "Student Clubs", href: "#" },
      { label: "Housing", href: "#" },
      { label: "Dining", href: "#" },
      { label: "Wellness", href: "#" },
    ],
  },
  {
    title: "Admission 2026",
    links: [
      { label: "Requirements", href: "#" },
      { label: "Application Process", href: "#" },
      { label: "Deadlines", href: "#" },
      { label: "Scholarships", href: "#" },
      { label: "FAQs", href: "/admission-2025/faq" },
    ],
  },
  {
    title: "Information Services",
    links: [
      { label: "Library", href: "#" },
      { label: "IT Services", href: "#" },
      { label: "Online Resources", href: "#" },
      { label: "Support", href: "#" },
      { label: "Help Desk", href: "#" },
    ],
  },
  {
    title: "Vacancies",
    links: [
      { label: "Academic Positions", href: "/vacancies/academic-positions" },
      { label: "Administrative Positions", href: "/vacancies/administrative-positions" },
      { label: "Research Positions", href: "/vacancies/research-positions" },
      { label: "How to Apply", href: "/vacancies/how-to-apply" },
      { label: "Benefits", href: "/vacancies/benefits" },
    ],
  },
];
