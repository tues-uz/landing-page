import type { TFunction } from "i18next";
import { useTranslation } from "react-i18next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  REGULATIONS_AND_REQUIREMENTS_FAQ,
  REGULATIONS_AND_REQUIREMENTS_I18N_DEFAULTS,
} from "@/locales/regulationsAndRequirementsDefaults";

const triggerClass =
  "py-4 text-left text-base font-bold leading-snug text-foreground hover:no-underline sm:text-lg [&[data-state=open]]:text-foreground";
const contentClass = "pb-4 text-[15px] leading-relaxed text-muted-foreground";

function tr(
  t: TFunction,
  key: keyof typeof REGULATIONS_AND_REQUIREMENTS_I18N_DEFAULTS,
) {
  return t(key, { defaultValue: REGULATIONS_AND_REQUIREMENTS_I18N_DEFAULTS[key] });
}

function FaqAnswer({ id }: { id: (typeof REGULATIONS_AND_REQUIREMENTS_FAQ)[number]["id"] }) {
  switch (id) {
    case "what-you-need":
      return (
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <span className="font-medium text-foreground">Secondary education</span> — a high school diploma
            or a diploma from an academic lyceum/vocational college.
          </li>
          <li>
            <span className="font-medium text-foreground">Entrance exams</span> — passing the exams or
            successfully passing an interview.
          </li>
          <li>Gather the required documents and submit them by the specified deadline.</li>
        </ul>
      );

    case "basic-requirements":
      return (
        <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-sm">
          <table className="w-full min-w-[320px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/80">
                <th scope="col" className="px-4 py-3 font-semibold text-foreground">
                  Requirement
                </th>
                <th scope="col" className="px-4 py-3 font-semibold text-foreground">
                  Explanation
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="px-4 py-3 align-top font-medium text-foreground">Information document</td>
                <td className="px-4 py-3 align-top">
                  School graduation certificate (electronic) or lyceum/college diploma (original and
                  transcript).
                </td>
              </tr>
              <tr className="border-b border-border last:border-b-0">
                <td className="px-4 py-3 align-top font-medium text-foreground">Entrance Examinations</td>
                <td className="px-4 py-3 align-top">Internal exams or an interview</td>
              </tr>
            </tbody>
          </table>
        </div>
      );

    case "documents-list":
      return (
        <ul className="list-disc space-y-2 pl-5">
          <li>Application letter addressed to the Rector;</li>
          <li>Passport or ID card (original and copy);</li>
          <li>Transcript or diploma (with an appendix);</li>
          <li>2 photos, 3.5 × 4.5 cm.</li>
        </ul>
      );

    case "modes-of-study":
      return (
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <span className="font-medium text-foreground">Full-time</span> — you attend classes at the
            university every day.
          </li>
          <li>
            <span className="font-medium text-foreground">Master&apos;s Degree</span> — a 2-year, in-depth
            specialization for graduates of a bachelor&apos;s program.
          </li>
        </ul>
      );

    case "additional-information":
      return (
        <div className="space-y-2">
          <p>
            <span className="font-medium text-foreground">Contact:</span>{" "}
            <a href="tel:+998554527777" className="text-foreground underline-offset-4 hover:underline">
              +998 55 452 77 77
            </a>
            {" · "}
            <a href="tel:+998954120707" className="text-foreground underline-offset-4 hover:underline">
              +998 95 412 07 07
            </a>
          </p>
          <p>
            <span className="font-medium text-foreground">Email:</span>{" "}
            <a
              href="mailto:university@tues.uz"
              className="text-foreground underline-offset-4 hover:underline"
            >
              university@tues.uz
            </a>
          </p>
        </div>
      );

    default:
      return null;
  }
}

export function RegulationsAndRequirementsSection() {
  const { t } = useTranslation("topNav");

  return (
    <div className="mt-4 max-w-none">
      <p className="text-base leading-relaxed text-muted-foreground">
        {tr(t, "regulationsAndRequirementsIntro")}
      </p>

      <Accordion
        type="single"
        collapsible
        defaultValue={REGULATIONS_AND_REQUIREMENTS_FAQ[0]?.id}
        className="mt-8"
      >
        {REGULATIONS_AND_REQUIREMENTS_FAQ.map((item) => (
          <AccordionItem key={item.id} value={item.id} className="border-border/60">
            <AccordionTrigger className={triggerClass}>{item.question}</AccordionTrigger>
            <AccordionContent className={contentClass}>
              <FaqAnswer id={item.id} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
