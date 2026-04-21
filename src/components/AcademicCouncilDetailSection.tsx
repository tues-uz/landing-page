import { useTranslation } from "react-i18next";
import {
  ACADEMIC_COUNCIL_I18N,
  type AcademicCouncilCardId,
} from "@/config/academicCouncilHub";

type Props = { cardId: AcademicCouncilCardId };

export function AcademicCouncilDetailSection({ cardId }: Props) {
  const { t } = useTranslation("topNav");
  const { bodyKey } = ACADEMIC_COUNCIL_I18N[cardId];
  const paragraphs = t(bodyKey)
    .split(/\n\n+/)
    .map((block) => block.trim())
    .filter(Boolean);

  return (
    <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground md:text-base">
      {paragraphs.map((para, i) => (
        <p key={i}>{para}</p>
      ))}
    </div>
  );
}
