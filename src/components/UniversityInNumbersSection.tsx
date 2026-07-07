import type { TFunction } from "i18next";
import { useTranslation } from "react-i18next";
import { Presentation } from "lucide-react";
import { DownloadCard } from "@/components/DownloadCard";
import { UNI_IN_NUMBERS_DECKS } from "@/config/universityInNumbersData";
import { UNIVERSITY_IN_NUMBERS_I18N_DEFAULTS } from "@/locales/universityInNumbersDefaults";

function tr(t: TFunction, key: keyof typeof UNIVERSITY_IN_NUMBERS_I18N_DEFAULTS) {
  return t(key, { defaultValue: UNIVERSITY_IN_NUMBERS_I18N_DEFAULTS[key] });
}

function fileNameFromHref(href: string): string {
  const last = href.split("/").pop();
  return last ?? href;
}

export function UniversityInNumbersSection() {
  const { t } = useTranslation("topNav");

  const introParagraphs = tr(t, "universityInNumbersIntro")
    .split(/\n\n+/)
    .map((block) => block.trim())
    .filter(Boolean);

  const downloadLabel = tr(t, "uniNumbersDownloadCta");
  const formatLabel = tr(t, "uniNumbersPptxBadge");

  return (
    <div className="mt-4 max-w-none">
      <div className="space-y-4 text-body-article text-muted-foreground">
        {introParagraphs.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      <div className="mt-10">
        <h2 className="text-lg font-semibold tracking-tight text-foreground md:text-xl">
          {tr(t, "universityInNumbersDownloadTitle")}
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
          {tr(t, "universityInNumbersDownloadLead")}
        </p>
        <p className="mt-3 text-xs text-muted-foreground">{formatLabel}</p>

        <ul
          className="mt-8 grid grid-cols-1 gap-[16px] sm:grid-cols-2 xl:grid-cols-4"
          role="list"
        >
          {UNI_IN_NUMBERS_DECKS.map(({ href, code, langKey }) => {
            const file = fileNameFromHref(href);
            const title = tr(t, langKey);
            return (
              <li key={href} className="flex min-h-0">
                <DownloadCard
                  title={title}
                  description={file}
                  cta={downloadLabel}
                  href={href}
                  PreviewIcon={Presentation}
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
