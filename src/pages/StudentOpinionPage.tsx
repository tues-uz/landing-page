import type { ReactNode } from "react";
import type { TFunction } from "i18next";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type { LucideIcon } from "lucide-react";
import { Home, Mail, MapPin, Phone } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { RecommendedNewsSidebar } from "@/components/RecommendedNewsSidebar";
import { STUDENT_OPINION_DEFAULTS } from "@/locales/studentOpinionDefaults";

function trStudentOpinion(t: TFunction, key: keyof typeof STUDENT_OPINION_DEFAULTS) {
  return t(key, { defaultValue: STUDENT_OPINION_DEFAULTS[key] });
}

const bodyClass = "text-body-article text-muted-foreground";
const h2Class = "text-xl font-semibold tracking-tight text-foreground md:text-2xl";

export default function StudentOpinionPage() {
  const { t } = useTranslation("topNav");
  const { t: tCommon } = useTranslation("common");
  const { t: th } = useTranslation("header");

  const studentLifeLabel = th("secondNav.studentLife");
  const navLeafLabel = th("secondNavStudentLife.studentOpinion");

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
                  <span className="font-medium text-muted-foreground line-clamp-2 sm:line-clamp-none">{studentLifeLabel}</span>
                </li>
                <li aria-hidden className="flex items-center text-muted-foreground/70">
                  <span className="leading-none">/</span>
                </li>
                <li className="min-w-0 flex-1 font-medium text-foreground">
                  <span className="line-clamp-2 sm:line-clamp-none">{navLeafLabel}</span>
                </li>
              </ol>
            </nav>
          </div>
        </div>

        <div className="container mx-auto max-w-[1348px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
            <div className="order-1 lg:order-none lg:col-span-9">
              <StudentOpinionArticle t={t} />
            </div>
            <RecommendedNewsSidebar className="order-2 lg:order-none lg:col-span-3" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function StudentOpinionArticle({ t }: { t: TFunction }) {
  const title = trStudentOpinion(t, "studentOpinionPageTitle");
  const intro = trStudentOpinion(t, "studentOpinionIntro");
  const contactHeading = trStudentOpinion(t, "studentOpinionContactHeading");
  const labelAddress = trStudentOpinion(t, "studentOpinionLabelAddress");
  const labelPhone = trStudentOpinion(t, "studentOpinionLabelPhone");
  const labelEmail = trStudentOpinion(t, "studentOpinionLabelEmail");
  const address = trStudentOpinion(t, "studentOpinionValueAddress");
  const phoneDisplay = trStudentOpinion(t, "studentOpinionValuePhoneDisplay");
  const phoneTel = trStudentOpinion(t, "studentOpinionValuePhoneTel");
  const email = trStudentOpinion(t, "studentOpinionValueEmail");

  const rows: { icon: LucideIcon; label: string; children: ReactNode }[] = [
    {
      icon: MapPin,
      label: labelAddress,
      children: <span className="text-foreground">{address}</span>,
    },
    {
      icon: Phone,
      label: labelPhone,
      children: (
        <a href={`tel:${phoneTel.replace(/\s/g, "")}`} className="font-medium text-primary underline-offset-4 hover:underline">
          {phoneDisplay}
        </a>
      ),
    },
    {
      icon: Mail,
      label: labelEmail,
      children: (
        <a href={`mailto:${email}`} className="font-medium text-primary underline-offset-4 hover:underline">
          {email}
        </a>
      ),
    },
  ];

  return (
    <article className="max-w-none">
      <h1 className="text-balance text-3xl font-semibold tracking-tight text-foreground md:text-[2rem] md:leading-tight">
        {title}
      </h1>
      <p className={`mt-3 text-justify ${bodyClass}`}>{intro}</p>

      <h2 className={`mt-10 ${h2Class}`}>{contactHeading}</h2>
      <ul className="mt-6 m-0 list-none space-y-5 p-0">
        {rows.map(({ icon: Icon, label, children }) => (
          <li
            key={label}
            className="flex gap-4 rounded-xl border border-border bg-card p-4 shadow-sm sm:p-5"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-muted-foreground">{label}</p>
              <div className={`mt-1 ${bodyClass} text-foreground`}>{children}</div>
            </div>
          </li>
        ))}
      </ul>
    </article>
  );
}
