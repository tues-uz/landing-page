import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import {
  ACADEMIC_COUNCIL_CARD_IDS,
  ACADEMIC_COUNCIL_CARD_IMAGE,
  ACADEMIC_COUNCIL_I18N,
  academicCouncilDetailPath,
} from "@/config/academicCouncilHub";

export function AcademicCouncilSection() {
  const { t } = useTranslation("topNav");

  return (
    <>
      <p className="mt-4 text-base leading-relaxed text-muted-foreground">{t("academicCouncilSelectHint")}</p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {ACADEMIC_COUNCIL_CARD_IDS.map((id) => {
          const titleText = t(ACADEMIC_COUNCIL_I18N[id].titleKey);
          return (
            <Link
              key={id}
              to={academicCouncilDetailPath(id)}
              title={titleText}
              className={cn(
                "group flex min-w-0 flex-col overflow-hidden rounded-xl border border-border bg-card text-left shadow-sm transition-all",
                "hover:shadow-md",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              )}
            >
              <div className="relative h-44 w-full shrink-0 overflow-hidden bg-muted sm:h-48 lg:h-52">
                <img
                  src={ACADEMIC_COUNCIL_CARD_IMAGE[id]}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-5">
                <span className="line-clamp-2 min-w-0 text-sm font-semibold leading-snug text-foreground sm:text-base">
                  {titleText}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
