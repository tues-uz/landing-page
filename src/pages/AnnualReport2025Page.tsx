import type { TFunction } from "i18next";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Home } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { DownloadCard } from "@/components/DownloadCard";
import { RecommendedNewsSidebar } from "@/components/RecommendedNewsSidebar";
import {
  ANNUAL_REPORT_2025_DEFAULTS,
  ANNUAL_REPORT_2025_PDF_HREF,
  ANNUAL_REPORT_2025_PDF_THUMB_SRC,
} from "@/locales/annualReport2025Defaults";
import { OFFICIAL_DOCUMENTS_PAGE_DEFAULTS } from "@/locales/officialDocumentsDefaults";

const OFFICIAL_DOCUMENTS_PATH = "/information-services/official-documents";
const bodyClass = "text-body-article leading-relaxed text-muted-foreground";

function trAnnualReport(t: TFunction, key: keyof typeof ANNUAL_REPORT_2025_DEFAULTS) {
  return t(key, { defaultValue: ANNUAL_REPORT_2025_DEFAULTS[key] });
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

export default function AnnualReport2025Page() {
  const { t } = useTranslation("topNav");
  const { t: tCommon } = useTranslation("common");
  const { t: th } = useTranslation("header");

  const infoServicesLabel = th("secondNav.informationServices");
  const hubTitle = th("secondNavInformationServices.officialDocuments");
  const pageTitle = trOfficialDocuments(t, "officialDocAnnualReport2025Title");
  const pageDescription = trOfficialDocuments(t, "officialDocAnnualReport2025Description");
  const pdfCta = trAnnualReport(t, "annualReport2025PdfDownloadCta");
  const pdfFilename = ANNUAL_REPORT_2025_PDF_HREF.split("/").pop() ?? "annual-report-2025.pdf";

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

                <div className={`mt-4 max-w-3xl space-y-4 ${bodyClass}`}>
                  {splitParagraphs(trAnnualReport(t, "annualReport2025PageIntro")).map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>

                <ul className="mt-10 grid grid-cols-1 gap-[16px] md:grid-cols-3" role="list">
                  <li className="flex min-h-0">
                    <DownloadCard
                      title={pageTitle}
                      description={pageDescription}
                      cta={pdfCta}
                      href={ANNUAL_REPORT_2025_PDF_HREF}
                      imageSrc={ANNUAL_REPORT_2025_PDF_THUMB_SRC}
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
