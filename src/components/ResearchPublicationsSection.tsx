import { useTranslation } from "react-i18next";
import { RESEARCH_PUBLICATION_FIELD_ROWS } from "@/config/researchPublicationsData";
import { RESEARCH_PUBLICATIONS_I18N_DEFAULTS } from "@/locales/researchPublicationsDefaults";

export function ResearchPublicationsSection() {
  const { t } = useTranslation("topNav");
  const introParagraphs = t("researchPublicationsIntro", {
    defaultValue: RESEARCH_PUBLICATIONS_I18N_DEFAULTS.researchPublicationsIntro,
  })
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

      <div className="mt-8 overflow-x-auto rounded-lg border border-border shadow-sm">
        <table className="w-full min-w-[640px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="whitespace-nowrap px-3 py-3 font-semibold text-foreground sm:px-4">
                {t("researchPubsColNo", { defaultValue: RESEARCH_PUBLICATIONS_I18N_DEFAULTS.researchPubsColNo })}
              </th>
              <th className="px-3 py-3 font-semibold text-foreground sm:px-4">
                {t("researchPubsColField", { defaultValue: RESEARCH_PUBLICATIONS_I18N_DEFAULTS.researchPubsColField })}
              </th>
              <th className="whitespace-nowrap px-3 py-3 font-semibold text-foreground sm:px-4">
                {t("researchPubsColNumber", {
                  defaultValue: RESEARCH_PUBLICATIONS_I18N_DEFAULTS.researchPubsColNumber,
                })}
              </th>
            </tr>
          </thead>
          <tbody>
            {RESEARCH_PUBLICATION_FIELD_ROWS.map((row) => (
              <tr key={row.no} className="border-b border-border last:border-0">
                <td className="px-3 py-3 tabular-nums text-muted-foreground sm:px-4">{row.no}</td>
                <td className="max-w-xl px-3 py-3 text-foreground sm:px-4">{row.field}</td>
                <td className="px-3 py-3 tabular-nums text-muted-foreground sm:px-4">{row.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
