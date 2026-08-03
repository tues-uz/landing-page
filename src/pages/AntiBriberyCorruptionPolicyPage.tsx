import type { TFunction } from "i18next";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Home } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { DownloadCard } from "@/components/DownloadCard";
import { RecommendedNewsSidebar } from "@/components/RecommendedNewsSidebar";
import {
  ANTI_BRIBERY_CORRUPTION_POLICY_DEFAULTS,
  ANTI_BRIBERY_CORRUPTION_POLICY_PDF_HREF,
  ANTI_BRIBERY_CORRUPTION_POLICY_PDF_THUMB_SRC,
  ANTI_BRIBERY_CORRUPTION_POLICY_SECTIONS,
} from "@/locales/antiBriberyCorruptionPolicyDefaults";
import { OFFICIAL_DOCUMENTS_PAGE_DEFAULTS } from "@/locales/officialDocumentsDefaults";

const OFFICIAL_DOCUMENTS_PATH = "/information-services/official-documents";
const bodyClass = "text-body-article leading-relaxed text-muted-foreground";
const sectionTitleClass = "text-xl font-semibold tracking-tight text-foreground md:text-2xl";

function trPolicy(t: TFunction, key: keyof typeof ANTI_BRIBERY_CORRUPTION_POLICY_DEFAULTS) {
  return t(key, { defaultValue: ANTI_BRIBERY_CORRUPTION_POLICY_DEFAULTS[key] });
}

function trOfficialDocuments(t: TFunction, key: keyof typeof OFFICIAL_DOCUMENTS_PAGE_DEFAULTS) {
  return t(key, { defaultValue: OFFICIAL_DOCUMENTS_PAGE_DEFAULTS[key] });
}

function splitParagraphs(raw: string): string[] {
  return raw
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);
}

export default function AntiBriberyCorruptionPolicyPage() {
  const { t } = useTranslation("topNav");
  const { t: tCommon } = useTranslation("common");
  const { t: th } = useTranslation("header");

  const infoServicesLabel = th("secondNav.informationServices");
  const hubTitle = th("secondNavInformationServices.officialDocuments");
  const pageTitle = trOfficialDocuments(t, "officialDocAntiBriberyTitle");
  const pageDescription = trOfficialDocuments(t, "officialDocAntiBriberyDescription");
  const pdfCta = trPolicy(t, "antiBriberyPolicyPdfDownloadCta");
  const pdfFilename =
    ANTI_BRIBERY_CORRUPTION_POLICY_PDF_HREF.split("/").pop() ?? "anti-bribery-corruption-policy.pdf";

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
                    {infoServicesLabel}
                  </span>
                </li>
                <li aria-hidden className="flex items-center text-muted-foreground/70">
                  <span className="leading-none">/</span>
                </li>
                <li className="flex min-w-0 items-center">
                  <Link
                    to={OFFICIAL_DOCUMENTS_PATH}
                    className="font-medium leading-none transition-colors hover:text-foreground line-clamp-2 sm:line-clamp-none"
                  >
                    {hubTitle}
                  </Link>
                </li>
                <li aria-hidden className="flex items-center text-muted-foreground/70">
                  <span className="leading-none">/</span>
                </li>
                <li className="min-w-0 flex-1 font-medium text-foreground">
                  <span className="line-clamp-2 sm:line-clamp-none">{pageTitle}</span>
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
                  {pageTitle}
                </h1>

                <div className="mt-10 flex flex-col gap-10">
                  {ANTI_BRIBERY_CORRUPTION_POLICY_SECTIONS.map(({ titleKey, bodyKey }) => (
                    <section key={titleKey}>
                      <h2 className={sectionTitleClass}>{trPolicy(t, titleKey)}</h2>
                      <div className={`mt-4 space-y-4 ${bodyClass}`}>
                        {splitParagraphs(trPolicy(t, bodyKey)).map((paragraph, i) => (
                          <p key={i}>{paragraph}</p>
                        ))}
                      </div>
                    </section>
                  ))}
                </div>

                <footer className="mt-12 border-t border-border pt-8">
                  <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
                    <div className="border-l-2 border-primary pl-4 sm:pl-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                        {trPolicy(t, "antiBriberyPolicyApprovedHeading")}
                      </p>
                      <p className="mt-2 text-base font-semibold leading-snug text-foreground sm:text-lg">
                        {trPolicy(t, "antiBriberyPolicyApprovedInstitution")}
                      </p>
                    </div>

                    <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-x-10 lg:text-right">
                      <div>
                        <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                          {trPolicy(t, "antiBriberyPolicyApprovedByLabel")}
                        </dt>
                        <dd className="mt-1 text-sm font-medium text-foreground">
                          {trPolicy(t, "antiBriberyPolicyApprovedBy")}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                          {trPolicy(t, "antiBriberyPolicyEffectiveDateLabel")}
                        </dt>
                        <dd className="mt-1 text-sm font-medium tabular-nums text-foreground">
                          {trPolicy(t, "antiBriberyPolicyEffectiveDate")}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </footer>

                <ul className="mt-10 grid grid-cols-1 gap-[16px] md:grid-cols-3" role="list">
                  <li className="flex min-h-0">
                    <DownloadCard
                      title={pageTitle}
                      description={pageDescription}
                      cta={pdfCta}
                      href={ANTI_BRIBERY_CORRUPTION_POLICY_PDF_HREF}
                      imageSrc={ANTI_BRIBERY_CORRUPTION_POLICY_PDF_THUMB_SRC}
                      imageAlt={pageTitle}
                      downloadFilename={pdfFilename}
                    />
                  </li>
                </ul>
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
