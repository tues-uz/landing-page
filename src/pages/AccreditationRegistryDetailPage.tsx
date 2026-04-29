import type { TFunction } from "i18next";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Home } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { AccreditationRegistryId } from "@/config/accreditationRegistryData";
import {
  ACCREDITATION_INTEAS_PAGE_DEFAULTS,
  ACCREDITATION_WDOMS_PAGE_DEFAULTS,
} from "@/locales/accreditationDetailDefaults";

function parseBulletLines(raw: string): string[] {
  return raw
    .split("\n")
    .map((line) => line.replace(/^\s*-\s*/, "").trim())
    .filter(Boolean);
}

export default function AccreditationRegistryDetailPage({ registry }: { registry: AccreditationRegistryId }) {
  const { t } = useTranslation("topNav");
  const { t: tCommon } = useTranslation("common");
  const { t: th } = useTranslation("header");

  const aboutHubLabel = th("nav.about");
  const accreditationSectionLabel = th("nav.aboutMenu.accreditationAndLicense");
  const accreditationPath = "/about/accreditation-and-license";

  const isInteas = registry === "inteas";

  const leafTitle = isInteas
    ? t("accreditationInteasPageTitle", {
        defaultValue: ACCREDITATION_INTEAS_PAGE_DEFAULTS.accreditationInteasPageTitle,
      })
    : t("accreditationWdomsPageTitle", {
        defaultValue: ACCREDITATION_WDOMS_PAGE_DEFAULTS.accreditationWdomsPageTitle,
      });

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
                <li className="flex items-center">
                  <Link to="/about" className="font-medium leading-none transition-colors hover:text-foreground">
                    {aboutHubLabel}
                  </Link>
                </li>
                <li aria-hidden className="flex items-center text-muted-foreground/70">
                  <span className="leading-none">/</span>
                </li>
                <li className="flex items-center">
                  <Link
                    to={accreditationPath}
                    className="font-medium leading-none transition-colors hover:text-foreground"
                  >
                    {accreditationSectionLabel}
                  </Link>
                </li>
                <li aria-hidden className="flex items-center text-muted-foreground/70">
                  <span className="leading-none">/</span>
                </li>
                <li className="flex items-center font-medium text-foreground">{leafTitle}</li>
              </ol>
            </nav>
          </div>
        </div>

        <div className="container mx-auto max-w-[1348px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          {isInteas ? <InteasArticle t={t} /> : <WdomsArticle t={t} />}
        </div>
      </main>
      <Footer />
    </div>
  );
}

function InteasArticle({ t }: { t: TFunction }) {
  const lead = t("accreditationInteasPageLead", {
    defaultValue: ACCREDITATION_INTEAS_PAGE_DEFAULTS.accreditationInteasPageLead,
  });
  const about = t("accreditationInteasPageAbout", {
    defaultValue: ACCREDITATION_INTEAS_PAGE_DEFAULTS.accreditationInteasPageAbout,
  });
  const advantagesTitle = t("accreditationInteasPageAdvantagesTitle", {
    defaultValue: ACCREDITATION_INTEAS_PAGE_DEFAULTS.accreditationInteasPageAdvantagesTitle,
  });
  const bulletsRaw = t("accreditationInteasPageBullets", {
    defaultValue: ACCREDITATION_INTEAS_PAGE_DEFAULTS.accreditationInteasPageBullets,
  });
  const bullets = parseBulletLines(bulletsRaw);

  return (
    <article className="max-w-none">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-[2rem] md:leading-tight">
        {t("accreditationInteasPageTitle", {
          defaultValue: ACCREDITATION_INTEAS_PAGE_DEFAULTS.accreditationInteasPageTitle,
        })}
      </h1>
      <div className="mt-3 space-y-4 text-body-article text-muted-foreground">
        <p>{lead}</p>
        <p>{about}</p>
      </div>

      <figure className="mt-8">
        <img
          src="/images/accreditation/inteas-certificate.png"
          alt={t("accreditationInteasCertificateAlt", {
            defaultValue: ACCREDITATION_INTEAS_PAGE_DEFAULTS.accreditationInteasCertificateAlt,
          })}
          className="mx-auto w-full max-w-3xl rounded-lg border border-border bg-card object-contain shadow-md"
          loading="lazy"
          decoding="async"
        />
      </figure>

      <h2 className="mt-10 text-xl font-semibold tracking-tight text-foreground md:text-2xl">{advantagesTitle}</h2>
      <ul className="mt-4 list-disc space-y-3 pl-6 text-body-article text-muted-foreground marker:text-foreground">
        {bullets.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </article>
  );
}

function WdomsArticle({ t }: { t: TFunction }) {
  const lead = t("accreditationWdomsPageLead", {
    defaultValue: ACCREDITATION_WDOMS_PAGE_DEFAULTS.accreditationWdomsPageLead,
  });
  const body = t("accreditationWdomsPageBody", {
    defaultValue: ACCREDITATION_WDOMS_PAGE_DEFAULTS.accreditationWdomsPageBody,
  });
  const paragraphs = body
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <article className="max-w-none">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-[2rem] md:leading-tight">
        {t("accreditationWdomsPageTitle", {
          defaultValue: ACCREDITATION_WDOMS_PAGE_DEFAULTS.accreditationWdomsPageTitle,
        })}
      </h1>
      <div className="mt-3 text-body-article text-muted-foreground">
        <p>{lead}</p>
      </div>

      <figure className="mt-8">
        <img
          src="/images/accreditation/wdoms-sponsors.png"
          alt={t("accreditationWdomsImageAlt", {
            defaultValue: ACCREDITATION_WDOMS_PAGE_DEFAULTS.accreditationWdomsImageAlt,
          })}
          className="mx-auto w-full max-w-4xl rounded-lg border border-border bg-card object-contain shadow-md"
          loading="lazy"
          decoding="async"
        />
      </figure>

      <div className="mt-8 space-y-4 text-body-article text-muted-foreground">
        {paragraphs.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>
    </article>
  );
}
