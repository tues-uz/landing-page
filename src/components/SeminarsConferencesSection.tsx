import type { TFunction } from "i18next";
import { useTranslation } from "react-i18next";
import {
  SEMINARS_CONFERENCES_DEFAULTS,
  SEMINARS_CONFERENCES_ROWS,
} from "@/config/seminarsConferencesData";

function trSeminars(t: TFunction, key: keyof typeof SEMINARS_CONFERENCES_DEFAULTS) {
  return t(key, { defaultValue: SEMINARS_CONFERENCES_DEFAULTS[key] });
}

export function SeminarsConferencesSection() {
  const { t } = useTranslation("topNav");
  const introParagraphs = t("seminarsConferencesIntro")
    .split(/\n\n+/)
    .map((block) => block.trim())
    .filter(Boolean);

  return (
    <div className="mt-4 max-w-none text-foreground">
      <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
        {introParagraphs.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      <h2 className="mt-8 text-lg font-semibold leading-snug text-foreground md:text-xl">
        {t("seminarsConferencesTableTitle")}
      </h2>

      <div className="mt-4 overflow-x-auto rounded-lg border border-border shadow-sm">
        <table className="w-full min-w-[720px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="whitespace-nowrap px-3 py-3 font-semibold text-foreground sm:px-4">
                {t("seminarsColNo")}
              </th>
              <th className="px-3 py-3 font-semibold text-foreground sm:px-4">{t("seminarsColTitle")}</th>
              <th className="whitespace-nowrap px-3 py-3 font-semibold text-foreground sm:px-4">
                {t("seminarsColLevel")}
              </th>
              <th className="whitespace-nowrap px-3 py-3 font-semibold text-foreground sm:px-4">
                {t("seminarsColDate")}
              </th>
            </tr>
          </thead>
          <tbody>
            {SEMINARS_CONFERENCES_ROWS.map((row) => (
              <tr key={row.no} className="border-b border-border last:border-0">
                <td className="align-top px-3 py-3 tabular-nums text-muted-foreground sm:px-4">{row.no}</td>
                <td className="max-w-md px-3 py-3 text-foreground sm:px-4">
                  {trSeminars(t, row.titleKey as keyof typeof SEMINARS_CONFERENCES_DEFAULTS)}
                </td>
                <td className="whitespace-nowrap px-3 py-3 text-muted-foreground sm:px-4">
                  {trSeminars(t, row.levelKey)}
                </td>
                <td className="whitespace-nowrap px-3 py-3 text-muted-foreground sm:px-4">
                  {trSeminars(t, row.dateKey as keyof typeof SEMINARS_CONFERENCES_DEFAULTS)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
