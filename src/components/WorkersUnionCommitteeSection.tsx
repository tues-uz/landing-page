import type { TFunction } from "i18next";
import { useTranslation } from "react-i18next";
import { WORKERS_UNION_I18N_DEFAULTS } from "@/locales/workersUnionDefaults";

function tr(t: TFunction, key: keyof typeof WORKERS_UNION_I18N_DEFAULTS) {
  return t(key, { defaultValue: WORKERS_UNION_I18N_DEFAULTS[key] });
}

export function WorkersUnionCommitteeSection() {
  const { t } = useTranslation("topNav");

  const introParagraphs = tr(t, "workersUnionIntro")
    .split(/\n\n+/)
    .map((block) => block.trim())
    .filter(Boolean);

  const compositionLines = tr(t, "workersUnionCompositionList")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const bulletLines = tr(t, "workersUnionActivitiesBullets")
    .split(/\n/)
    .map((line) => line.replace(/^[·•\-\s]+/, "").trim())
    .filter(Boolean);

  const closingParagraphs = tr(t, "workersUnionClosing")
    .split(/\n\n+/)
    .map((block) => block.trim())
    .filter(Boolean);

  return (
    <div className="mt-4 max-w-none space-y-6 text-body-article text-muted-foreground">
      <div className="space-y-4">
        {introParagraphs.map((para, i) => (
          <p key={i} className="text-base md:text-base">
            {para}
          </p>
        ))}
      </div>

      <div>
        <h2 className="text-lg font-semibold text-foreground md:text-xl">{tr(t, "workersUnionCompositionTitle")}</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 marker:text-foreground">
          {compositionLines.map((line, i) => {
            const text = line.replace(/^\d+\.\s*/, "");
            return (
              <li key={i} className="pl-1 text-muted-foreground">
                {text}
              </li>
            );
          })}
        </ol>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-foreground md:text-xl">{tr(t, "workersUnionAimsTitle")}</h2>
        <p className="mt-3">{tr(t, "workersUnionAimsLead")}</p>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-foreground md:text-xl">{tr(t, "workersUnionActivitiesTitle")}</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 marker:text-foreground">
          {bulletLines.map((line, i) => (
            <li key={i} className="pl-1">
              {line}
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-4 border-t border-border pt-6">
        {closingParagraphs.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>
    </div>
  );
}
