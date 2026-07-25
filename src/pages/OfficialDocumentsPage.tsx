import type { TFunction } from "i18next";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FileText, Home } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { DownloadCard } from "@/components/DownloadCard";
import { RecommendedNewsSidebar } from "@/components/RecommendedNewsSidebar";
import { OFFICIAL_DOCUMENTS } from "@/config/officialDocumentsData";
import { OFFICIAL_DOCUMENTS_PAGE_DEFAULTS } from "@/locales/officialDocumentsDefaults";

function trOfficialDocuments(t: TFunction, key: keyof typeof OFFICIAL_DOCUMENTS_PAGE_DEFAULTS) {
  return t(key, { defaultValue: OFFICIAL_DOCUMENTS_PAGE_DEFAULTS[key] });
}

export default function OfficialDocumentsPage() {
  const { t } = useTranslation("topNav");
  const { t: tCommon } = useTranslation("common");
  const { t: th } = useTranslation("header");

  const infoServicesLabel = th("secondNav.informationServices");
  const pageTitle = th("secondNavInformationServices.officialDocuments");
  const intro = trOfficialDocuments(t, "officialDocumentsPageIntro");
  const formatLabel = trOfficialDocuments(t, "officialDocumentsPdfBadge");

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
                    {infoServicesLabel}
                  </span>
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
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">{intro}</p>
                <p className="mt-3 text-xs text-muted-foreground">{formatLabel}</p>

                <ul
                  className="mt-8 grid grid-cols-1 gap-[16px] sm:grid-cols-2 lg:grid-cols-3"
                  role="list"
                >
                  {OFFICIAL_DOCUMENTS.map(({ id, detailPath, thumbSrc, titleKey, descriptionKey }) => {
                    const title = trOfficialDocuments(t, titleKey);
                    const description = trOfficialDocuments(t, descriptionKey);
                    const card = (
                      <DownloadCard
                        title={title}
                        description={description}
                        imageSrc={thumbSrc}
                        imageAlt={title}
                        PreviewIcon={thumbSrc ? undefined : FileText}
                        previewBadge={thumbSrc ? undefined : formatLabel}
                        showDownloadCta={false}
                      />
                    );

                    return (
                      <li key={id} className="flex min-h-0">
                        {detailPath ? (
                          <Link to={detailPath} className="flex min-h-0 w-full">
                            {card}
                          </Link>
                        ) : (
                          card
                        )}
                      </li>
                    );
                  })}
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
