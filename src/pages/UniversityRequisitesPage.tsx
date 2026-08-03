import type { TFunction } from "i18next";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Home, Phone } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { RecommendedNewsSidebar } from "@/components/RecommendedNewsSidebar";
import { CONTACTING_ADMISSION_PHONES } from "@/locales/contactingAdmissionDefaults";
import {
  UNIVERSITY_REQUISITES_ACCOUNT_NUMBER,
  UNIVERSITY_REQUISITES_INN,
  UNIVERSITY_REQUISITES_MFO,
  UNIVERSITY_REQUISITES_PAGE_DEFAULTS,
} from "@/locales/universityRequisitesDefaults";

function trReq(t: TFunction, key: keyof typeof UNIVERSITY_REQUISITES_PAGE_DEFAULTS) {
  return t(key, { defaultValue: UNIVERSITY_REQUISITES_PAGE_DEFAULTS[key] });
}

export default function UniversityRequisitesPage() {
  const { t } = useTranslation("topNav");
  const { t: tCommon } = useTranslation("common");
  const { t: th } = useTranslation("header");

  const sectionLabel = th("secondNav.university");
  const title = trReq(t, "universityRequisitesPageTitle");
  const intro = trReq(t, "universityRequisitesPageIntro");
  const institutionName = trReq(t, "universityRequisitesInstitutionName");
  const labelAddress = trReq(t, "universityRequisitesLabelAddress");
  const address = trReq(t, "universityRequisitesAddress");
  const labelPhone = trReq(t, "universityRequisitesLabelPhone");
  const labelAccount = trReq(t, "universityRequisitesLabelAccount");
  const labelBank = trReq(t, "universityRequisitesLabelBank");
  const labelMfo = trReq(t, "universityRequisitesLabelMfo");
  const labelInn = trReq(t, "universityRequisitesLabelInn");
  const bankName = trReq(t, "universityRequisitesBankName");

  const rowClass =
    "flex flex-col gap-1 border-b border-border py-4 last:border-b-0 sm:flex-row sm:items-baseline sm:gap-6";
  const dtClass = "shrink-0 text-sm font-medium text-muted-foreground sm:w-40";
  const ddClass = "min-w-0 flex-1 text-base text-foreground";

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
                    {sectionLabel}
                  </span>
                </li>
                <li aria-hidden className="flex items-center text-muted-foreground/70">
                  <span className="leading-none">/</span>
                </li>
                <li className="min-w-0 flex-1 font-medium text-foreground">
                  <span className="line-clamp-2 sm:line-clamp-none">{title}</span>
                </li>
              </ol>
            </nav>
          </div>
        </div>

        <div className="container mx-auto max-w-[1348px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
            <div className="order-1 lg:order-none lg:col-span-9">
              <article className="max-w-none">
                <h1 className="text-balance text-3xl font-semibold tracking-tight text-foreground md:text-[2rem] md:leading-tight">
                  {title}
                </h1>
                <p className="mt-3 text-xl font-semibold tracking-tight text-foreground">
                  {institutionName}
                </p>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">{intro}</p>

                <dl className="mt-8 rounded-xl border border-border bg-card p-1 px-4 shadow-sm sm:px-6">
                  <div className={rowClass}>
                    <dt className={dtClass}>{labelAddress}</dt>
                    <dd className={ddClass}>{address}</dd>
                  </div>
                  <div className={rowClass}>
                    <dt className={dtClass}>{labelPhone}</dt>
                    <dd className={ddClass}>
                      <ul className="m-0 flex list-none flex-col gap-2 p-0" role="list">
                        {CONTACTING_ADMISSION_PHONES.map(({ display, tel }) => (
                          <li key={tel}>
                            <a
                              href={`tel:${tel}`}
                              className="inline-flex items-center gap-2 rounded-md font-semibold tabular-nums tracking-tight text-foreground underline-offset-4 transition-colors hover:text-primary hover:underline"
                            >
                              <Phone className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                              {display}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                  <div className={rowClass}>
                    <dt className={dtClass}>{labelAccount}</dt>
                    <dd className={`${ddClass} font-mono text-sm tabular-nums sm:text-base`}>
                      {UNIVERSITY_REQUISITES_ACCOUNT_NUMBER}
                    </dd>
                  </div>
                  <div className={rowClass}>
                    <dt className={dtClass}>{labelBank}</dt>
                    <dd className={ddClass}>{bankName}</dd>
                  </div>
                  <div className={rowClass}>
                    <dt className={dtClass}>{labelMfo}</dt>
                    <dd className={`${ddClass} font-mono tabular-nums`}>{UNIVERSITY_REQUISITES_MFO}</dd>
                  </div>
                  <div className={rowClass}>
                    <dt className={dtClass}>{labelInn}</dt>
                    <dd className={`${ddClass} font-mono tabular-nums`}>{UNIVERSITY_REQUISITES_INN}</dd>
                  </div>
                </dl>
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
