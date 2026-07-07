import type { TFunction } from "i18next";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import { DownloadCard, downloadCardCtaClass, downloadCardShellClass } from "@/components/DownloadCard";
import {
  ACCREDITATION_LICENSE_DOCUMENTS,
  ACCREDITATION_REGISTRY_CARDS,
} from "@/config/accreditationRegistryData";
import {
  ACCREDITATION_INTEAS_PAGE_DEFAULTS,
  ACCREDITATION_WDOMS_PAGE_DEFAULTS,
} from "@/locales/accreditationDetailDefaults";
import { ACCREDITATION_LICENSE_I18N_DEFAULTS } from "@/locales/accreditationLicenseDefaults";
import { cn } from "@/lib/utils";

const REGISTRY_IMAGE_ALT_DEFAULTS = {
  accreditationInteasCertificateAlt: ACCREDITATION_INTEAS_PAGE_DEFAULTS.accreditationInteasCertificateAlt,
  accreditationWdomsImageAlt: ACCREDITATION_WDOMS_PAGE_DEFAULTS.accreditationWdomsImageAlt,
} as const;

const previewFrameClass =
  "relative mx-4 mt-5 overflow-hidden rounded-xl bg-gradient-to-br from-primary/[0.05] via-muted/40 to-[hsl(var(--oxford-cream))] p-3 ring-1 ring-border";

const registryCtaClass = cn(downloadCardCtaClass);

function trAcc(t: TFunction, key: keyof typeof ACCREDITATION_LICENSE_I18N_DEFAULTS) {
  return t(key, { defaultValue: ACCREDITATION_LICENSE_I18N_DEFAULTS[key] });
}

type RegistryCardProps = {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  cta: string;
  to: string;
};

function RegistryCard({ title, description, imageSrc, imageAlt, cta, to }: RegistryCardProps) {
  return (
    <article className={downloadCardShellClass}>
      <div className={previewFrameClass}>
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="h-full w-full object-contain object-center transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col px-5 pb-5 pt-4">
        <h3 className="text-lg font-bold leading-snug tracking-tight text-foreground">{title}</h3>
        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">{description}</p>

        <div className="mt-5 pt-4">
          <Link to={to} aria-label={`${title} — ${cta}`} className={registryCtaClass}>
            {cta}
            <ArrowRight className="h-4 w-4 opacity-90" strokeWidth={2} aria-hidden />
          </Link>
        </div>
      </div>
    </article>
  );
}

export function AccreditationLicenseSection() {
  const { t } = useTranslation("topNav");

  const introParagraphs = trAcc(t, "accreditationLicenseIntro")
    .split(/\n\n+/)
    .map((block) => block.trim())
    .filter(Boolean);

  const cta = trAcc(t, "accreditationRegistryCta");
  const downloadCta = trAcc(t, "accreditationLicenseDownloadCta");

  return (
    <div className="mt-4 max-w-none">
      <div className="space-y-4 text-body-article text-muted-foreground">
        {introParagraphs.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      <ul className="mt-10 grid grid-cols-1 gap-[16px] md:grid-cols-3" role="list">
        {ACCREDITATION_REGISTRY_CARDS.map(({ to, title, descKey, imageSrc, imageAltKey }) => {
          const description = trAcc(t, descKey);
          const imageAlt = t(imageAltKey, { defaultValue: REGISTRY_IMAGE_ALT_DEFAULTS[imageAltKey] });

          return (
            <li key={to} className="flex min-h-0">
              <RegistryCard
                title={title}
                description={description}
                imageSrc={imageSrc}
                imageAlt={imageAlt}
                cta={cta}
                to={to}
              />
            </li>
          );
        })}

        {ACCREDITATION_LICENSE_DOCUMENTS.map(({ id, href, titleKey, descKey, imageSrc, imageAltKey }) => {
          const title = trAcc(t, titleKey);
          const description = trAcc(t, descKey);
          const imageAlt = trAcc(t, imageAltKey);

          return (
            <li key={id} className="flex min-h-0">
              <DownloadCard
                title={title}
                description={description}
                cta={downloadCta}
                href={href}
                imageSrc={imageSrc}
                imageAlt={imageAlt}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
