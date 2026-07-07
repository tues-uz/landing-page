import type { TFunction } from "i18next";
import { useTranslation } from "react-i18next";
import { FileText } from "lucide-react";
import { DownloadCard } from "@/components/DownloadCard";
import { WHO_WE_ARE_MISSION_DOCS } from "@/config/whoWeAreMissionData";
import { WHO_WE_ARE_MISSION_I18N_DEFAULTS } from "@/locales/whoWeAreMissionDefaults";
import { UNIVERSITY_IN_NUMBERS_I18N_DEFAULTS } from "@/locales/universityInNumbersDefaults";

function trMission(t: TFunction, key: keyof typeof WHO_WE_ARE_MISSION_I18N_DEFAULTS) {
  return t(key, { defaultValue: WHO_WE_ARE_MISSION_I18N_DEFAULTS[key] });
}

function fileNameFromHref(href: string): string {
  const last = href.split("/").pop();
  return last ?? href;
}

export function WhoWeAreSection() {
  const { t } = useTranslation("topNav");

  const introParagraphs = trMission(t, "whoWeAreMissionIntro")
    .split(/\n\n+/)
    .map((block) => block.trim())
    .filter(Boolean);

  const downloadLabel = trMission(t, "whoWeAreMissionDownloadCta");
  const formatLabel = trMission(t, "whoWeAreMissionDocxBadge");

  return (
    <div className="mt-4 max-w-none">
      <div className="space-y-4 text-body-article text-muted-foreground">
        {introParagraphs.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      <div className="mt-10">
        <h2 className="text-lg font-semibold tracking-tight text-foreground md:text-xl">
          {trMission(t, "whoWeAreMissionDownloadTitle")}
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
          {trMission(t, "whoWeAreMissionDownloadLead")}
        </p>
        <p className="mt-3 text-xs text-muted-foreground">{formatLabel}</p>

        <ul
          className="mt-8 grid grid-cols-1 gap-[16px] sm:grid-cols-2 xl:grid-cols-4"
          role="list"
        >
          {WHO_WE_ARE_MISSION_DOCS.map(({ href, code, langKey }) => {
            const file = fileNameFromHref(href);
            const title = t(langKey, { defaultValue: UNIVERSITY_IN_NUMBERS_I18N_DEFAULTS[langKey] });
            return (
              <li key={href} className="flex min-h-0">
                <DownloadCard
                  title={title}
                  description={file}
                  cta={downloadLabel}
                  href={href}
                  PreviewIcon={FileText}
                  previewBadge={code}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
