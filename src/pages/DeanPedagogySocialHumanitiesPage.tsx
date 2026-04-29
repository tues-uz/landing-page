import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Clock3, Mail, MessageCircle, Phone, Home } from "lucide-react";
import type { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { RecommendedNewsSidebar } from "@/components/RecommendedNewsSidebar";

const PROFILE = {
  pageTitle: "Dean of the Faculty of Pedagogy and Social Sciences and Humanities",
  roleShort: "DEAN OF THE FACULTY OF PEDAGOGY AND SOCIAL SCIENCES AND HUMANITIES",
  name: "Bozorov Sobir Bektashovich",
  degree: "Doctor of philosophy in philology, associate professor",
  phone: "+998997 351 40 90",
  email: "sobirtisu@gmail.com",
  telegram: "+998997 351 40 90",
  reception: "Haftaning barcha ish kunlari 14:00-16:00",
  imageSrc: "/images/university/dean-pedagogy-social-humanities.png",
} as const;

const RESPONSIBILITIES: readonly string[] = [
  "Ensuring implementation of the Laws of the Republic of Uzbekistan, Presidential decrees and orders, resolutions of the Oliy Majlis, Cabinet of Ministers, and the Ministry of Higher Education, Science and Innovation in education and personnel training.",
  "Honest and conscientious performance of labor duties; adherence to executive, labor, and academic discipline; compliance with occupational health and safety regulations, industrial sanitation rules, University Charter, Internal Regulations, Code of Ethics, Council decisions, employer orders, and goals set by regulatory documents in the education system.",
  "General management of faculty deanery operations and staff.",
  "Organization of the educational process within the faculty.",
  "Ensuring training of qualified specialists; direct supervision of educational-methodological, scientific, and spiritual-enlightenment activities; ensuring compliance with state educational standards, curricula, and syllabi.",
  "Organizing class schedule development and monitoring implementation; tracking student performance and attendance; organizing rating and disciplinary controls.",
  "Organizing maintenance of student academic record cards.",
  "Organizing preparation of individual schedules and rating test sheets for students.",
  "Organizing preparation and duplication of student documents.",
  "Organizing compilation of the 3-NK form report on number of faculty students.",
  "Organizing preparation of academic documents for first-year students (rating books, student IDs, academic cards).",
  "Regularly reviewing student files and sending notification letters regarding clearance of academic debts.",
  "Preparing statistical reports on student numbers, performance, and academic mobility (transfers/dropouts).",
  "Preparing draft orders for promotion of students from one year to the next.",
  "Organizing graduation thesis defense and student participation in state certifications.",
  "Drafting orders for sending students to professional internships.",
  "Organizing and monitoring student attendance and timely delivery of lectures and classes.",
  "Ensuring compliance with Rating System Regulations.",
  "Drafting orders permitting students to take State Final Examinations and defend graduation theses.",
  "Organizing responses to inquiry letters regarding students.",
  "Organizing orders for documentation required for deanery operations.",
  "Ensuring safe storage of all documents within the faculty deanery.",
  "Organizing preparation of personal files of graduated or dismissed students for submission to University Archives.",
  "Identifying gifted students, organizing targeted work with them, and preparing them for Olympiads and competitions (including foreign foundations).",
  "Coordinating training of senior research fellows and professional development programs for teaching staff.",
  "Coordinating preparation of textbooks, teaching materials, and methodological manuals related to faculty study fields.",
  "Ensuring broad integration of new information technologies into educational process and mastery by faculty staff.",
  "Directing activities of the Faculty Council.",
  "Organizing and conducting scientific and methodological conferences, inter-departmental meetings, seminars, and discussions involving faculty and students.",
  "Collaborating with university internship/career department to assess specialist demand, establish employer relations, support graduate employment, and provide practical recommendations.",
  "Establishing cooperative relations with related state and non-state higher and secondary-specialized institutions and scientific institutions, including those in developed foreign countries.",
  "Organizing additional educational services at faculty level (independent centers/courses), attracting grants and investments, and ensuring active participation of faculty and students.",
  "Organizing character-building and educational activities in student dormitories.",
  "Formulating proposals for development of institutional activities, identifying efficiency problems, and proposing elimination measures.",
];

export default function DeanPedagogySocialHumanitiesPage() {
  const { t: tCommon } = useTranslation("common");
  const { t: th } = useTranslation("header");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="below-header">
        <div className="border-b border-border bg-muted/50">
          <div className="container mx-auto flex max-w-[1348px] items-center px-4 py-3 sm:px-6 lg:px-8">
            <nav aria-label="Breadcrumb" className="min-w-0 flex-1">
              <ol className="m-0 flex list-none flex-wrap items-center gap-x-2 gap-y-1 p-0 text-sm text-[#5A626C]">
                <li className="flex items-center">
                  <Link
                    to="/"
                    className="inline-flex items-center gap-1.5 font-medium leading-none transition-colors hover:text-foreground"
                  >
                    <Home className="h-5 w-5 shrink-0" strokeWidth={1.5} aria-hidden />
                    <span className="leading-none">{tCommon("breadcrumbHome")}</span>
                  </Link>
                </li>
                <li aria-hidden className="flex items-center text-muted-foreground/70">
                  <span className="leading-none">/</span>
                </li>
                <li className="flex min-w-0 items-center">
                  <span className="font-medium text-muted-foreground line-clamp-2 sm:line-clamp-none">
                    {th("secondNav.university")}
                  </span>
                </li>
                <li aria-hidden className="flex items-center text-muted-foreground/70">
                  <span className="leading-none">/</span>
                </li>
                <li className="flex min-w-0 items-center">
                  <Link
                    to="/university-departments"
                    className="font-medium text-muted-foreground transition-colors hover:text-foreground line-clamp-2 sm:line-clamp-none"
                  >
                    Departments
                  </Link>
                </li>
                <li aria-hidden className="flex items-center text-muted-foreground/70">
                  <span className="leading-none">/</span>
                </li>
                <li className="min-w-0 flex-1 font-medium text-foreground">
                  <span className="line-clamp-2 sm:line-clamp-none">{PROFILE.pageTitle}</span>
                </li>
              </ol>
            </nav>
          </div>
        </div>

        <div className="container mx-auto max-w-[1348px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-8">
            <div className="order-1 lg:order-none lg:col-span-9">
              <article className="max-w-none">
                <section className="overflow-hidden rounded-2xl bg-card">
                  <div className="grid grid-cols-1 md:grid-cols-[minmax(220px,34%)_1fr]">
                    <figure className="relative min-h-[220px] w-full overflow-hidden rounded-t-2xl bg-muted md:min-h-[280px] md:rounded-l-2xl md:rounded-tr-none">
                      <img
                        src={PROFILE.imageSrc}
                        alt={PROFILE.name}
                        className="absolute inset-0 h-full w-full rounded-[inherit] object-cover object-center"
                        loading="eager"
                        decoding="async"
                      />
                    </figure>

                    <div className="p-4 sm:p-5 md:p-6">
                      <div className="max-w-[38ch] space-y-1">
                        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                          {PROFILE.roleShort}
                        </p>
                        <h1 className="text-balance text-[1.75rem] font-semibold tracking-tight text-foreground">
                          {PROFILE.name}
                        </h1>
                        <p className="text-sm text-muted-foreground">{PROFILE.degree}</p>
                      </div>

                      <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                        <ContactCard
                          icon={<Phone className="h-3.5 w-3.5" />}
                          label="Phone number"
                          value={PROFILE.phone}
                          href={`tel:${PROFILE.phone}`}
                        />
                        <ContactCard
                          icon={<Mail className="h-3.5 w-3.5" />}
                          label="E-mail"
                          value={PROFILE.email}
                          href={`mailto:${PROFILE.email}`}
                        />
                        <ContactCard
                          icon={<MessageCircle className="h-3.5 w-3.5" />}
                          label="Telegram"
                          value={PROFILE.telegram}
                          href={`https://t.me/${PROFILE.telegram.replace(/\D/g, "")}`}
                        />
                        <ContactCard
                          icon={<Clock3 className="h-3.5 w-3.5" />}
                          label="Reception time"
                          value={PROFILE.reception}
                        />
                      </div>
                    </div>
                  </div>
                </section>

                <section className="mt-6 rounded-2xl bg-card p-4 sm:p-5 md:p-6">
                  <h2 className="text-lg font-semibold tracking-tight text-foreground md:text-xl">
                    Job responsibilities
                  </h2>
                  <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-foreground/90 marker:text-primary">
                    {RESPONSIBILITIES.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ol>
                </section>
              </article>
            </div>
            <RecommendedNewsSidebar className="order-2 lg:order-none lg:col-span-3" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function ContactCard({
  icon,
  label,
  value,
  href,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div className="rounded-lg bg-background/60 px-3 py-2.5">
      <p className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
        {icon}
        {label}
      </p>
      {href ? (
        <a
          href={href}
          target={href.startsWith("https://") ? "_blank" : undefined}
          rel={href.startsWith("https://") ? "noopener noreferrer" : undefined}
          className="mt-1 block text-sm font-medium text-foreground hover:text-primary"
        >
          {value}
        </a>
      ) : (
        <p className="mt-1 text-sm font-medium text-foreground">{value}</p>
      )}
    </div>
  );
}
