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
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="pb-4 text-[15px] leading-relaxed text-muted-foreground">
              {item.id === "official-regulation" ? (
                <>
                  The Cabinet of Ministers resolution on the procedure for obtaining a second and subsequent
                  higher education and related admission rules are published on the Admission 2025 section of
                  this website. See{" "}
                  <Link
                    to="/admission-2025/regulation-secondary-education"
                    className="font-medium text-foreground underline-offset-4 hover:underline"
                  >
                    Regulation on secondary education
                  </Link>{" "}
                  for the full text.
                </>
              ) : (
                item.answer
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
