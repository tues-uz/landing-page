import { Phone } from "lucide-react";
import { useTranslation } from "react-i18next";
import { ENTREPRENEURIAL_CLUBS_IMAGES } from "@/config/entrepreneurialClubsImages";

const bodyClass = "text-justify text-body-article text-muted-foreground";

function SectionImage({ src, alt, priority = false }: { src: string; alt: string; priority?: boolean }) {
  return (
    <figure className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-border bg-white shadow-sm">
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className="h-full w-full object-contain object-center p-4 sm:p-6"
      />
    </figure>
  );
}

export function EntrepreneurialClubsSection() {
  const { t } = useTranslation("header");
  const phoneDisplay = t("entrepreneurialClubsPhone");
  const phoneHref = t("entrepreneurialClubsPhoneHref");
  const [innovationImage, leadersImage, startupImage] = ENTREPRENEURIAL_CLUBS_IMAGES;

  return (
    <div className="mt-4 max-w-none">
      <SectionImage src={innovationImage.src} alt={t(innovationImage.altKey)} priority />

      <section className="mt-10">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          {t("entrepreneurialClubsS1Title")}
        </h2>
        <p className={`mt-3 ${bodyClass}`}>{t("entrepreneurialClubsS1Body")}</p>
      </section>

      <div className="mt-10">
        <SectionImage src={leadersImage.src} alt={t(leadersImage.altKey)} />
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          {t("entrepreneurialClubsS2Title")}
        </h2>
        <p className={`mt-3 ${bodyClass}`}>{t("entrepreneurialClubsS2Body")}</p>
      </section>

      <div className="mt-10">
        <SectionImage src={startupImage.src} alt={t(startupImage.altKey)} />
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          {t("entrepreneurialClubsS3Title")}
        </h2>
        <p className={`mt-3 ${bodyClass}`}>{t("entrepreneurialClubsS3Body")}</p>
      </section>

      <section
        className="mt-12 rounded-2xl border border-border bg-muted/30 p-5 sm:p-6"
        aria-labelledby="entrepreneurial-clubs-contacts"
      >
        <h2
          id="entrepreneurial-clubs-contacts"
          className="text-lg font-semibold tracking-tight text-foreground"
        >
          {t("entrepreneurialClubsContactsTitle")}
        </h2>
        <p className={`mt-2 ${bodyClass}`}>{t("entrepreneurialClubsContactsLead")}</p>
        <dl className="mt-4 space-y-3 text-sm sm:text-base">
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground sm:text-[0.8125rem]">
              {t("entrepreneurialClubsContactRole")}
            </dt>
            <dd className="mt-1 text-foreground">{t("entrepreneurialClubsContactName")}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground sm:text-[0.8125rem]">
              {t("entrepreneurialClubsPhoneLabel")}
            </dt>
            <dd className="mt-1">
              <a
                href={`tel:${phoneHref}`}
                className="inline-flex items-center gap-2 font-medium text-primary underline-offset-2 hover:underline"
              >
                <Phone className="h-4 w-4 shrink-0" aria-hidden />
                {phoneDisplay}
              </a>
            </dd>
          </div>
        </dl>
      </section>
    </div>
  );
}
