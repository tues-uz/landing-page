import type { TFunction } from "i18next";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Home } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { RecommendedNewsSidebar } from "@/components/RecommendedNewsSidebar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import {
  TRANSFER_APPLICATION_PERIODS,
  TRANSFER_CONDITION_ROWS,
  TRANSFER_DOCUMENT_KEYS,
  TRANSFER_ELIGIBILITY_KEYS,
  TRANSFER_FAQ_ITEMS,
  TRANSFER_INTERNATIONAL_KEYS,
  TRANSFER_OF_STUDIES_LAW_URL,
  TRANSFER_OF_STUDIES_PAGE_DEFAULTS,
  TRANSFER_PROCESS_STEPS,
  TRANSFER_REINSTATEMENT_DOC_KEYS,
  TRANSFER_RESTRICTION_KEYS,
  TRANSFER_SCENARIO_ROWS,
} from "@/locales/transferOfStudiesDefaults";

const listClass =
  "mt-3 list-outside list-disc space-y-2 pl-6 text-body-article text-muted-foreground marker:text-foreground/70";
const sectionHeadingClass = "text-xl font-semibold tracking-tight text-foreground";
const subHeadingClass = "text-lg font-semibold tracking-tight text-foreground";
const tableWrapClass = "mt-4 overflow-x-auto rounded-xl border border-border bg-card shadow-sm";
const tableClass = "w-full min-w-[640px] border-collapse text-left text-sm";
const thClass = "px-3 py-3 font-semibold text-foreground sm:px-4";
const tdClass = "px-3 py-2.5 align-top text-muted-foreground sm:px-4";
const faqTriggerClass =
  "py-4 text-left text-base font-bold leading-snug text-foreground hover:no-underline sm:text-lg [&[data-state=open]]:text-foreground";
const faqContentClass = "pb-4 text-[15px] leading-relaxed text-muted-foreground";
const externalLinkClass = "font-medium text-primary underline-offset-4 hover:underline";

function trTransfer(t: TFunction, key: keyof typeof TRANSFER_OF_STUDIES_PAGE_DEFAULTS) {
  return t(key, { defaultValue: TRANSFER_OF_STUDIES_PAGE_DEFAULTS[key] });
}

export default function TransferOfStudiesPage() {
  const { t } = useTranslation("topNav");
  const { t: tCommon } = useTranslation("common");
  const { t: th } = useTranslation("header");

  const admissionLabel = th("secondNav.admission2025");
  const title = trTransfer(t, "transferOfStudiesPageTitle");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="below-header">
        <div className="border-b border-border bg-muted/50">
          <div className="container mx-auto flex max-w-[1348px] items-center px-4 py-3 sm:px-6 lg:px-8">
            <nav aria-label={tCommon("breadcrumbNav")} className="min-w-0 flex-1">
              <ol className="m-0 flex list-none flex-wrap items-center gap-x-2 gap-y-1 p-0 text-sm text-[#5A626C]">
                <li className="flex items-center">
                  <Link
                    to="/"
                    className="inline-flex items-center gap-1.5 font-medium leading-none transition-colors hover:text-foreground"
                  >
                    <Home className="h-5 w-5 shrink-0" strokeWidth={1.5} aria-hidden />
                    <span className="leading-none">{tCommon("breadcrumbHome")}</span>
                  </Link>
                </li>
                <li aria-hidden className="flex items-center text-muted-foreground/70">
                  <span className="leading-none">/</span>
                </li>
                <li className="flex min-w-0 items-center">
                  <span className="font-medium text-muted-foreground line-clamp-2 sm:line-clamp-none">
                    {admissionLabel}
                  </span>
                </li>
                <li aria-hidden className="flex items-center text-muted-foreground/70">
                  <span className="leading-none">/</span>
                </li>
                <li className="min-w-0 flex-1 font-medium text-foreground">
                  <span className="line-clamp-2 sm:line-clamp-none">{title}</span>
                </li>
              </ol>
            </nav>
          </div>
        </div>

        <div className="container mx-auto max-w-[1348px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
            <div className="order-1 lg:order-none lg:col-span-9">
              <TransferOfStudiesArticle t={t} />
            </div>
            <RecommendedNewsSidebar className="order-2 lg:order-none lg:col-span-3" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function TransferOfStudiesArticle({ t }: { t: TFunction }) {
  return (
    <article className="max-w-none">
      <header className="max-w-2xl">
        <h1 className="text-balance text-3xl font-semibold tracking-tight text-foreground md:text-[2rem] md:leading-tight">
          {trTransfer(t, "transferOfStudiesPageTitle")}
        </h1>
        <p className="mt-2 text-lg font-medium text-foreground/90">
          {trTransfer(t, "transferOfStudiesPageSubtitle")}
        </p>
        <p className="mt-3 text-body-article text-muted-foreground">
          {trTransfer(t, "transferOfStudiesPageIntro")}
        </p>
      </header>

      <section className="mt-10 max-w-3xl">
        <h2 className={sectionHeadingClass}>{trTransfer(t, "transferOfStudiesSectionRequirements")}</h2>

        <h3 className={cn(subHeadingClass, "mt-8")}>{trTransfer(t, "transferOfStudiesWhoCanTransfer")}</h3>
        <p className="mt-2 text-body-article text-muted-foreground">
          {trTransfer(t, "transferOfStudiesWhoCanTransferIntro")}
        </p>
        <ul className={listClass}>
          {TRANSFER_ELIGIBILITY_KEYS.map((key) => (
            <li key={key}>{trTransfer(t, key)}</li>
          ))}
        </ul>

        <h3 className={cn(subHeadingClass, "mt-8")}>{trTransfer(t, "transferOfStudiesKeyConditions")}</h3>
        <p className="mt-2 text-body-article text-muted-foreground">
          {trTransfer(t, "transferOfStudiesKeyConditionsIntro")}
        </p>
        <KeyConditionsTable t={t} />

        <h3 className={cn(subHeadingClass, "mt-8")}>{trTransfer(t, "transferOfStudiesWhenToApply")}</h3>
        <ApplicationPeriodsTable t={t} />
        <p className="mt-4 border-l-2 border-border pl-4 text-body-article text-muted-foreground">
          {trTransfer(t, "transferOfStudiesSpringImportant")}
        </p>

        <h3 className={cn(subHeadingClass, "mt-8")}>{trTransfer(t, "transferOfStudiesDocumentsHeading")}</h3>
        <p className="mt-2 text-body-article text-muted-foreground">
          {trTransfer(t, "transferOfStudiesDocumentsIntro")}
        </p>
        <ul className={listClass}>
          {TRANSFER_DOCUMENT_KEYS.map((key) => (
            <li key={key}>{trTransfer(t, key)}</li>
          ))}
        </ul>
      </section>

      <section className="mt-12 max-w-2xl border-t border-border pt-10">
        <h2 className={sectionHeadingClass}>{trTransfer(t, "transferOfStudiesProcessHeading")}</h2>
        <ProcessStepsTimeline t={t} />
      </section>

      <section className="mt-12 max-w-2xl border-t border-border pt-10">
        <h2 className={sectionHeadingClass}>{trTransfer(t, "transferOfStudiesRestrictionsHeading")}</h2>
        <p className="mt-2 text-body-article text-muted-foreground">
          {trTransfer(t, "transferOfStudiesRestrictionsIntro")}
        </p>
        <ul className={listClass}>
          {TRANSFER_RESTRICTION_KEYS.map((key) => (
            <li key={key}>{trTransfer(t, key)}</li>
          ))}
        </ul>
      </section>

      <section className="mt-12 max-w-2xl border-t border-border pt-10">
        <h2 className={sectionHeadingClass}>{trTransfer(t, "transferOfStudiesInternationalHeading")}</h2>
        <ul className={listClass}>
          {TRANSFER_INTERNATIONAL_KEYS.map((key) => (
            <li key={key}>{trTransfer(t, key)}</li>
          ))}
        </ul>
      </section>

      <section className="mt-12 max-w-2xl border-t border-border pt-10">
        <h2 className={sectionHeadingClass}>{trTransfer(t, "transferOfStudiesReinstatementHeading")}</h2>
        <p className="mt-2 text-body-article text-muted-foreground">
          {trTransfer(t, "transferOfStudiesReinstatementIntro")}
        </p>
        <ul className={listClass}>
          {TRANSFER_REINSTATEMENT_DOC_KEYS.map((key) => (
            <li key={key}>{trTransfer(t, key)}</li>
          ))}
        </ul>
        <p className="mt-4 text-body-article text-muted-foreground">
          {trTransfer(t, "transferOfStudiesReinstatementNote")}
        </p>
      </section>

      <section className="mt-12 max-w-none border-t border-border pt-10">
        <h2 className={sectionHeadingClass}>{trTransfer(t, "transferOfStudiesScenariosHeading")}</h2>
        <ScenariosTable t={t} />
      </section>

      <section className="mt-12 max-w-2xl border-t border-border pt-10">
        <h2 className={sectionHeadingClass}>{trTransfer(t, "transferOfStudiesFaqHeading")}</h2>
        <Accordion
          type="single"
          collapsible
          defaultValue={TRANSFER_FAQ_ITEMS[0]?.id}
          className="mt-6"
        >
          {TRANSFER_FAQ_ITEMS.map((item, index) => (
            <AccordionItem key={item.id} value={item.id} className="border-border/60">
              <AccordionTrigger className={faqTriggerClass}>
                <span className="flex items-start gap-3">
                  <span
                    className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-sm bg-primary text-xs font-bold tabular-nums leading-none text-primary-foreground"
                    aria-hidden
                  >
                    {index + 1}
                  </span>
                  <span>{trTransfer(t, item.questionKey)}</span>
                </span>
              </AccordionTrigger>
              <AccordionContent className={faqContentClass}>
                {trTransfer(t, item.answerKey)}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <section className="mt-12 max-w-2xl border-t border-border pt-10">
        <h2 className={sectionHeadingClass}>{trTransfer(t, "transferOfStudiesMoreInfoHeading")}</h2>
        <p className="mt-3 text-body-article text-muted-foreground">
          {trTransfer(t, "transferOfStudiesMoreInfoIntro")}{" "}
          <a
            href={TRANSFER_OF_STUDIES_LAW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={externalLinkClass}
          >
            {trTransfer(t, "transferOfStudiesLawLinkLabel")}
          </a>
          .
        </p>
        <p className="mt-4 text-sm text-muted-foreground">{trTransfer(t, "transferOfStudiesLastUpdated")}</p>
      </section>
    </article>
  );
}

function KeyConditionsTable({ t }: { t: TFunction }) {
  return (
    <div className={tableWrapClass}>
      <table className={tableClass}>
        <thead>
          <tr className="border-b border-border bg-muted/80">
            <th scope="col" className={thClass}>
              {trTransfer(t, "transferOfStudiesColRequirement")}
            </th>
            <th scope="col" className={thClass}>
              {trTransfer(t, "transferOfStudiesColDetails")}
            </th>
          </tr>
        </thead>
        <tbody>
          {TRANSFER_CONDITION_ROWS.map(({ requirementKey, detailsKey }) => (
            <tr
              key={requirementKey}
              className="border-b border-border transition-colors last:border-b-0 hover:bg-muted/25"
            >
              <td className={cn(tdClass, "font-medium text-foreground")}>{trTransfer(t, requirementKey)}</td>
              <td className={tdClass}>{trTransfer(t, detailsKey)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ApplicationPeriodsTable({ t }: { t: TFunction }) {
  return (
    <div className={tableWrapClass}>
      <table className={tableClass}>
        <thead>
          <tr className="border-b border-border bg-muted/80">
            <th scope="col" className={thClass}>
              {trTransfer(t, "transferOfStudiesColSemester")}
            </th>
            <th scope="col" className={thClass}>
              {trTransfer(t, "transferOfStudiesColApplicationPeriod")}
            </th>
            <th scope="col" className={thClass}>
              {trTransfer(t, "transferOfStudiesColDecisionPeriod")}
            </th>
          </tr>
        </thead>
        <tbody>
          {TRANSFER_APPLICATION_PERIODS.map(({ semesterKey, applicationKey, decisionKey }) => (
            <tr
              key={semesterKey}
              className="border-b border-border transition-colors last:border-b-0 hover:bg-muted/25"
            >
              <td className={cn(tdClass, "font-medium text-foreground")}>{trTransfer(t, semesterKey)}</td>
              <td className={tdClass}>{trTransfer(t, applicationKey)}</td>
              <td className={tdClass}>{trTransfer(t, decisionKey)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ScenariosTable({ t }: { t: TFunction }) {
  return (
    <div className={cn(tableWrapClass, "mt-6")}>
      <table className={cn(tableClass, "min-w-[56rem]")}>
        <thead>
          <tr className="border-b border-border bg-muted/80">
            <th scope="col" className={thClass}>
              {trTransfer(t, "transferOfStudiesColSituation")}
            </th>
            <th scope="col" className={thClass}>
              {trTransfer(t, "transferOfStudiesColTransferType")}
            </th>
            <th scope="col" className={thClass}>
              {trTransfer(t, "transferOfStudiesColApprovalAuthority")}
            </th>
            <th scope="col" className={thClass}>
              {trTransfer(t, "transferOfStudiesColRequiresExam")}
            </th>
          </tr>
        </thead>
        <tbody>
          {TRANSFER_SCENARIO_ROWS.map(({ situationKey, typeKey, authorityKey, examKey }) => (
            <tr
              key={situationKey}
              className="border-b border-border transition-colors last:border-b-0 hover:bg-muted/25"
            >
              <td className={cn(tdClass, "font-medium text-foreground")}>{trTransfer(t, situationKey)}</td>
              <td className={tdClass}>{trTransfer(t, typeKey)}</td>
              <td className={tdClass}>{trTransfer(t, authorityKey)}</td>
              <td className={tdClass}>{trTransfer(t, examKey)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ProcessStepsTimeline({ t }: { t: TFunction }) {
  const lastIndex = TRANSFER_PROCESS_STEPS.length - 1;

  return (
    <ol className="relative m-0 mt-8 list-none p-0" role="list">
      {TRANSFER_PROCESS_STEPS.map(({ titleKey, bodyKey }, index) => {
        const isLast = index === lastIndex;
        const body = trTransfer(t, bodyKey);
        const bodyLines = body.split("\n").filter(Boolean);

        return (
          <li
            key={titleKey}
            className={cn(
              "grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-5 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-x-6",
              !isLast && "pb-1",
            )}
          >
            <div className="flex flex-col items-center">
              <span
                className="relative z-[1] flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-[13px] font-bold tabular-nums leading-none text-primary-foreground ring-4 ring-background sm:h-9 sm:w-9 sm:text-sm"
                aria-hidden
              >
                {index + 1}
              </span>
              {!isLast ? (
                <span
                  aria-hidden
                  className="my-1 min-h-[calc(100%-0.25rem)] w-[2px] flex-1 bg-border"
                />
              ) : null}
            </div>

            <div className={cn("min-w-0", !isLast && "pb-8 sm:pb-10")}>
              <h3 className={subHeadingClass}>{trTransfer(t, titleKey)}</h3>
              {bodyLines.length > 1 ? (
                <ul className="mt-2 list-outside list-disc space-y-1.5 pl-5 text-body-article text-muted-foreground">
                  {bodyLines.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2 text-body-article text-muted-foreground">{body}</p>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
