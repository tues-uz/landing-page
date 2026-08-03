import { Link } from "react-router-dom";
import type { TFunction } from "i18next";
import { useTranslation } from "react-i18next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  SECONDARY_EDUCATION_REQUIREMENTS_FAQ,
  SECONDARY_EDUCATION_REQUIREMENTS_I18N_DEFAULTS,
} from "@/locales/secondaryEducationRequirementsDefaults";

function tr(
  t: TFunction,
  key: keyof typeof SECONDARY_EDUCATION_REQUIREMENTS_I18N_DEFAULTS,
) {
  return t(key, { defaultValue: SECONDARY_EDUCATION_REQUIREMENTS_I18N_DEFAULTS[key] });
}

function FaqAnswer({
  t,
  item,
}: {
  t: TFunction;
  item: (typeof SECONDARY_EDUCATION_REQUIREMENTS_FAQ)[number];
}) {
  if ("answerType" in item && item.answerType === "link-regulation") {
    return (
      <>
        {tr(t, "secondaryEdFaqA6Before")}{" "}
        <Link
          to="/admission-2025/regulation-secondary-education"
          className="font-medium text-foreground underline-offset-4 hover:underline"
        >
          {tr(t, "secondaryEdFaqA6Link")}
        </Link>{" "}
        {tr(t, "secondaryEdFaqA6After")}
      </>
    );
  }

  if ("answerKey" in item && item.answerKey) {
    return tr(t, item.answerKey);
  }

  return null;
}

export function SecondaryEducationRequirementsSection() {
  const { t } = useTranslation("topNav");

  return (
    <div className="mt-4 max-w-none">
      <p className="text-base leading-relaxed text-muted-foreground">
        {tr(t, "secondaryEducationRequirementsIntro")}
      </p>

      <Accordion type="single" collapsible defaultValue={SECONDARY_EDUCATION_REQUIREMENTS_FAQ[0]?.id} className="mt-8">
        {SECONDARY_EDUCATION_REQUIREMENTS_FAQ.map((item) => (
          <AccordionItem key={item.id} value={item.id} className="border-border/60">
            <AccordionTrigger className="py-4 text-left text-base font-bold leading-snug text-foreground hover:no-underline sm:text-lg [&[data-state=open]]:text-foreground">
              {tr(t, item.questionKey)}
            </AccordionTrigger>
            <AccordionContent className="pb-4 text-[15px] leading-relaxed text-muted-foreground">
              <FaqAnswer t={t} item={item} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
