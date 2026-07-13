import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  ENTREPRENEURIAL_CLUB_IDS,
  ENTREPRENEURIAL_CLUB_META,
  entrepreneurialClubDetailPath,
  type EntrepreneurialClubId,
} from "@/config/entrepreneurialClubsImages";
import { cn } from "@/lib/utils";

const bodyClass = "text-justify text-body-article text-muted-foreground";

function ClubLogo({
  src,
  alt,
  priority = false,
}: {
  src: string;
  alt: string;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <div className="absolute inset-0 bg-neutral-100" aria-hidden />;
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      onError={() => setFailed(true)}
      className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.03]"
    />
  );
}

export function EntrepreneurialClubsSection({
  pathBase = "research",
}: {
  pathBase?: "research" | "science";
}) {
  const { t } = useTranslation("header");
  const phoneDisplay = t("entrepreneurialClubsPhone");
  const phoneHref = t("entrepreneurialClubsPhoneHref");
  const intro = t("entrepreneurialClubsPageIntro");
  const exploreLabel = t("entrepreneurialClubsLearnMore", { defaultValue: "Learn more" });

  return (
    <div className="mt-4 max-w-none">
      {intro ? <p className={`mb-8 ${bodyClass}`}>{intro}</p> : null}

      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3" role="list">
        {ENTREPRENEURIAL_CLUB_IDS.map((clubId: EntrepreneurialClubId, index) => {
          const meta = ENTREPRENEURIAL_CLUB_META[clubId];
          const title = t(meta.titleKey);
          const to = entrepreneurialClubDetailPath(clubId, pathBase);

          return (
            <li key={clubId} className="flex min-h-0">
              <Link
                to={to}
                aria-label={`${title} — ${exploreLabel}`}
                className={cn(
                  "group flex h-full w-full flex-col overflow-hidden rounded-3xl bg-background",
                  "ring-1 ring-border/80",
                  "transition-[box-shadow,ring-color] duration-300 ease-out",
                  "hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:ring-border",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                )}
              >
                <div className="relative h-[200px] w-full shrink-0 overflow-hidden bg-neutral-50 sm:h-[220px] md:h-[240px]">
                  <ClubLogo
                    src={meta.imageSrc}
                    alt={t(meta.imageAltKey)}
                    priority={index === 0}
                  />
                </div>

                <div className="flex items-center justify-between gap-4 px-5 py-4 sm:px-6 sm:py-5">
                  <h2 className="min-w-0 text-base font-medium leading-snug tracking-tight text-foreground sm:text-[1.0625rem]">
                    {title}
                  </h2>
                  <span
                    className={cn(
                      "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
                      "bg-neutral-100 text-neutral-600",
                      "transition-colors duration-300",
                      "group-hover:bg-foreground group-hover:text-background",
                    )}
                    aria-hidden
                  >
                    <ArrowRight className="h-4 w-4" strokeWidth={2} />
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>

      <section className="mt-10" aria-labelledby="entrepreneurial-clubs-contacts">
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
