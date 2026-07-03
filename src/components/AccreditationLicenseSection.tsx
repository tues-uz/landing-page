import type { TFunction } from "i18next";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowDownToLine, ArrowRight } from "lucide-react";
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

const cardShellClass = cn(
  "group relative flex w-full flex-col overflow-hidden rounded-2xl",
  "border border-border bg-card",
  "shadow-[0_1px_2px_rgba(15,23,42,0.04),0_6px_20px_rgba(15,23,42,0.04)]",
  "transition-all duration-300 ease-out",
  "hover:-translate-y-1 hover:border-primary/25",
  "hover:shadow-[0_12px_40px_rgba(15,23,42,0.1)]",
);

const ctaButtonClass = cn(
  "flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-colors",
  "bg-muted/60 text-foreground no-underline",
  "hover:bg-primary hover:text-primary-foreground",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
);

function trAcc(t: TFunction, key: keyof typeof ACCREDITATION_LICENSE_I18N_DEFAULTS) {
  return t(key, { defaultValue: ACCREDITATION_LICENSE_I18N_DEFAULTS[key] });
}

type AccreditationCardBase = {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  cta: string;
  kind: "registry" | "document";
};

type RegistryCardProps = AccreditationCardBase & {
  kind: "registry";
  to: string;
};

type DocumentCardProps = AccreditationCardBase & {
  kind: "document";
  href: string;
};

type AccreditationCardProps = RegistryCardProps | DocumentCardProps;

function AccreditationCard(props: AccreditationCardProps) {
  const { title, description, imageSrc, imageAlt, cta, kind } = props;

  const ctaButton =
    kind === "registry" ? (
      <Link to={props.to} aria-label={`${title} — ${cta}`} className={ctaButtonClass}>
        {cta}
        <ArrowRight className="h-4 w-4 opacity-90" strokeWidth={2} aria-hidden />
      </Link>
    ) : (
      <a
        href={props.href}
        target="_blank"
        rel="noopener noreferrer"
        download
        aria-label={`${title} — ${cta}`}
        className={ctaButtonClass}
      >
        <ArrowDownToLine className="h-4 w-4 opacity-90" strokeWidth={2} aria-hidden />
        {cta}
      </a>
    );

  return (
    <article className={cardShellClass}>
      <div className="relative mx-4 mt-5 overflow-hidden rounded-xl bg-gradient-to-br from-primary/[0.05] via-muted/40 to-[hsl(var(--oxford-cream))] p-3 ring-1 ring-border">
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

        <div className="mt-5 pt-4">{ctaButton}</div>
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
              <AccreditationCard
                title={title}
                description={description}
                imageSrc={imageSrc}
                imageAlt={imageAlt}
                cta={cta}
                kind="registry"
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
              <AccreditationCard
                title={title}
                description={description}
                imageSrc={imageSrc}
                imageAlt={imageAlt}
                cta={downloadCta}
                kind="document"
                href={href}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
