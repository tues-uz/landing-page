import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Clock3, Mail, MessageCircle, Phone, Home } from "lucide-react";
import type { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { RecommendedNewsSidebar } from "@/components/RecommendedNewsSidebar";

const PROFILE = {
  pageTitle: "First Vice-Rector for Academic Affairs",
  name: "Esanov Alijon Mengbayevich",
  degree: "Doctor of philosophy in philology",
  phone: "+99897-530-57-07",
  email: "alijontisu@gmail.com",
  telegram: "+99897-530-57-07",
  reception: "Monday - Friday, 09:00 - 17:00",
  imageSrc: "/images/university/first-vice-rector-academic-affairs.png",
} as const;

const RESPONSIBILITIES: readonly string[] = [
  "Ensure implementation of laws of the Republic of Uzbekistan, decrees and resolutions of the President, decisions of the Oliy Majlis, Cabinet of Ministers, and the Ministry of Higher Education, Science and Innovation related to education and personnel training.",
  "Perform official duties honestly and conscientiously; comply with labor and executive discipline, occupational safety rules, industrial hygiene standards, the University Charter, Internal Regulations, Code of Ethics, University Council decisions, employer orders, and assigned responsibilities.",
  "Coordinate and manage the activities of departments and divisions subordinate to the Vice-Rector for Academic Affairs.",
  "Organize educational-methodological, scientific, and moral-educational activities in line with state educational standards and ensure the training of qualified specialists.",
  "Ensure that deans, heads of departments, and faculty members fully understand requirements on educational content and training level set by state educational standards.",
  "Study advanced education system trends; develop modern methods and innovative pedagogical technologies for implementation of tasks set by the Law On Education and state authority decisions.",
  "Organize introduction and effective use of advanced teaching methods, including distance learning and modern pedagogical and information-communication technologies.",
  "Coordinate, organize, and supervise activities of departments, divisions, and dean offices supporting the educational process.",
  "Approve work plans of departments, faculties, and divisions, and monitor implementation.",
  "Ensure and monitor teaching quality and implementation of individual work plans of faculty members.",
  "Ensure and supervise instruction using modern technical tools and foreign languages.",
  "Ensure and monitor provision of modern educational literature, textbooks, teaching materials, and electronic resources for the Information Resource Center.",
  "Organize academic and scientific-practical conferences, lead the methodological council, promote pedagogical excellence, and generalize advanced methodological practices.",
  "Ensure and supervise student industrial internships.",
  "Provide overall supervision of preparation and publication of educational-methodological and scientific materials, including journals and collections of research papers, and ensure regular library updates.",
  "Report to the University Council on educational and methodological activities of faculties and departments.",
  "Organize and supervise state final attestations for bachelor students and defense of master's theses.",
  "Supervise graduate employment distribution activities.",
  "Approve and monitor implementation of working curricula, syllabi, academic schedules, and class timetables.",
  "Monitor preparation of annual and quarterly student enrollment reports.",
  "Conclude contracts with professional development institutes, form faculty training plans, and supervise implementation.",
  "Manage the scholarship commission and ensure fairness and legality in scholarship allocation.",
  "Ensure transparency of the student knowledge assessment rating system.",
  "Manage identification and support of talented students, including preparation of candidates for Presidential Scholarship, Ibn Sina State Scholarship, and other awards.",
  "Develop staffing proposals for faculty and support staff and ensure provision of qualified personnel.",
  "Prepare proposals for competitive recruitment of faculty members and retention of master's degree holders, and implement faculty development and renewal plans.",
  "Develop proposals to improve efficient use of classrooms and technical equipment of laboratories and lecture halls.",
  "Submit proposals to the Rector on disciplinary measures against faculty members violating labor discipline.",
  "Prepare proposals for cooperation with foreign universities to improve educational quality in accordance with international standards.",
  "Analyze annual reports of faculties and departments, submit conclusions to the Rector, and implement modern methods for evaluating faculty academic performance.",
  "Maintain cooperation with leading universities and research institutions and ensure active participation in conferences and seminars.",
  "Determine and analyze the annual university ranking and implement improvement measures.",
  "Submit concrete proposals to improve institutional efficiency and resolve identified issues.",
];

export default function FirstViceRectorAcademicAffairsPage() {
  const { t: tCommon } = useTranslation("common");
  const { t: th } = useTranslation("header");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="below-header">
        <div className="border-b border-border bg-muted/50">
          <div className="container mx-auto flex max-w-[1348px] items-center px-4 py-3 sm:px-6 lg:px-8">
            <nav aria-label={tCommon("breadcrumbNav")} className="min-w-0 flex-1">
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
                      <div className="max-w-[34ch] space-y-1">
                        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                          FIRST VICE-RECTOR FOR ACADEMIC AFFAIRS
                        </p>
                        <h1 className="text-balance text-[1.75rem] font-semibold tracking-tight text-foreground">
                          {PROFILE.name}
                        </h1>
                        <p className="text-sm text-muted-foreground">{PROFILE.degree}</p>
                      </div>

                      <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                        <ContactCard
                          icon={<Phone className="h-3.5 w-3.5" />}
                          label={tCommon("contactPhone")}
                          value={PROFILE.phone}
                          href={`tel:${PROFILE.phone}`}
                        />
                        <ContactCard
                          icon={<Mail className="h-3.5 w-3.5" />}
                          label={tCommon("contactEmail")}
                          value={PROFILE.email}
                          href={`mailto:${PROFILE.email}`}
                        />
                        <ContactCard
                          icon={<MessageCircle className="h-3.5 w-3.5" />}
                          label={tCommon("contactTelegram")}
                          value={PROFILE.telegram}
                          href={`https://t.me/${PROFILE.telegram.replace(/\D/g, "")}`}
                        />
                        <ContactCard
                          icon={<Clock3 className="h-3.5 w-3.5" />}
                          label={tCommon("contactReceptionTime")}
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
                  <p className="mt-1 text-xs text-muted-foreground">
                    Core duties and oversight responsibilities of the First Vice-Rector for Academic Affairs.
                  </p>
                  <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-foreground/90 marker:text-primary">
                    {RESPONSIBILITIES.map((item, idx) => (
                      <li key={idx}>
                        {item}
                      </li>
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
