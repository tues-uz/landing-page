import type { ReactNode } from "react";
import type { TFunction } from "i18next";
import { ExternalLink, FileText } from "lucide-react";
import { useTranslation } from "react-i18next";
import { DownloadCard } from "@/components/DownloadCard";
import {
  UNIVERSITY_MISSION_CONTENT_DEFAULTS,
  UNIVERSITY_MISSION_GREEN_STRATEGY_PDF_HREF,
  UNIVERSITY_MISSION_STRATEGY_PDF_HREF,
} from "@/locales/universityMissionDefaults";
import { cn } from "@/lib/utils";

function tr(t: TFunction, key: keyof typeof UNIVERSITY_MISSION_CONTENT_DEFAULTS) {
  return t(key, { defaultValue: UNIVERSITY_MISSION_CONTENT_DEFAULTS[key] });
}

function OutLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 font-medium text-primary underline-offset-4 hover:underline"
    >
      {children}
      <ExternalLink className="h-3.5 w-3.5 shrink-0 opacity-80" aria-hidden />
    </a>
  );
}

function MissionPdfDownload({
  title,
  description,
  href,
  placeholder,
  cta,
  pdfBadge,
  downloadFilename,
}: {
  title: string;
  description: string;
  href: string | null;
  placeholder: string;
  cta: string;
  pdfBadge: string;
  downloadFilename?: string;
}) {
  return (
    <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" role="list">
      <li className="flex min-h-0 w-full">
        <DownloadCard
          title={title}
          description={href ? description : placeholder}
          cta={cta}
          href={href ?? undefined}
          PreviewIcon={FileText}
          previewBadge={pdfBadge}
          downloadFilename={downloadFilename}
          showDownloadCta={Boolean(href)}
        />
      </li>
    </ul>
  );
}

type UniversityMissionContentProps = {
  pdfNote: string;
};

export function UniversityMissionContent({ pdfNote }: UniversityMissionContentProps) {
  const { t } = useTranslation("topNav");
  const pdfCta = tr(t, "universityMissionPdfDownloadCta");
  const pdfBadge = t("officialDocumentsPdfBadge", { defaultValue: "PDF" });

  return (
    <div
      className={cn(
        "mt-6 max-w-none space-y-10 text-[15px] leading-relaxed text-muted-foreground md:text-base",
      )}
    >
      <section className="space-y-4" aria-labelledby="um-mission">
        <h2 id="um-mission" className="text-xl font-bold tracking-tight text-foreground md:text-2xl">
          {tr(t, "universityMissionSection1Title")}
        </h2>
        <p>{tr(t, "universityMissionSection1P1")}</p>
        <p className="font-semibold text-foreground">{tr(t, "universityMissionSection1CoreValuesTitle")}</p>
        <ul className="list-disc space-y-2 pl-6 marker:text-primary/80">
          <li>{tr(t, "universityMissionSection1CoreValue1")}</li>
          <li>{tr(t, "universityMissionSection1CoreValue2")}</li>
          <li>{tr(t, "universityMissionSection1CoreValue3")}</li>
        </ul>
        <p>{tr(t, "universityMissionSection1P3")}</p>
        <ol className="list-decimal space-y-2 pl-6 marker:font-medium marker:text-foreground">
          <li>{tr(t, "universityMissionSection1Value1")}</li>
          <li>{tr(t, "universityMissionSection1Value2")}</li>
          <li>{tr(t, "universityMissionSection1Value3")}</li>
          <li>{tr(t, "universityMissionSection1Value4")}</li>
        </ol>
        <p>{tr(t, "universityMissionSection1P4")}</p>
      </section>

      <section className="space-y-4" aria-labelledby="um-strategic">
        <h2 id="um-strategic" className="text-xl font-bold tracking-tight text-foreground md:text-2xl">
          {tr(t, "universityMissionSection2Title")}
        </h2>
        <h3 className="text-lg font-semibold text-foreground">
          {tr(t, "universityMissionSection2ObjectivesTitle")}
        </h3>
        <ul className="list-disc space-y-2 pl-6 marker:text-primary/80">
          <li>{tr(t, "universityMissionSection2Objective1")}</li>
          <li>{tr(t, "universityMissionSection2Objective2")}</li>
          <li>{tr(t, "universityMissionSection2Objective3")}</li>
          <li>{tr(t, "universityMissionSection2Objective4")}</li>
          <li>{tr(t, "universityMissionSection2Objective5")}</li>
        </ul>
        <h3 className="text-lg font-semibold text-foreground">
          {tr(t, "universityMissionSection2GoalsTitle")}
        </h3>
        <ul className="list-disc space-y-2 pl-6 marker:text-primary/80">
          <li>{tr(t, "universityMissionSection2Goal1")}</li>
          <li>{tr(t, "universityMissionSection2Goal2")}</li>
          <li>{tr(t, "universityMissionSection2Goal3")}</li>
          <li>{tr(t, "universityMissionSection2Goal4")}</li>
          <li>{tr(t, "universityMissionSection2Goal5")}</li>
        </ul>
        <h3 className="text-lg font-semibold text-foreground">
          {tr(t, "universityMissionSection2ImplementationTitle")}
        </h3>
        <p>{tr(t, "universityMissionSection2ImplementationP1")}</p>
        <MissionPdfDownload
          title={tr(t, "universityMissionSection2PdfTitle")}
          description={tr(t, "universityMissionSection2PdfDescription")}
          href={UNIVERSITY_MISSION_STRATEGY_PDF_HREF}
          placeholder={tr(t, "universityMissionSection2PdfPlaceholder")}
          cta={pdfCta}
          pdfBadge={pdfBadge}
          downloadFilename="strategic-development.pdf"
        />
      </section>

      <section className="space-y-4" aria-labelledby="um-risk">
        <h2 id="um-risk" className="text-xl font-bold tracking-tight text-foreground md:text-2xl">
          {tr(t, "universityMissionSection3Title")}
        </h2>
        <p>{tr(t, "universityMissionSection3P1")}</p>
        <h3 className="text-lg font-semibold text-foreground">
          {tr(t, "universityMissionSection3RiskIdTitle")}
        </h3>
        <ul className="list-disc space-y-2 pl-6 marker:text-primary/80">
          <li>{tr(t, "universityMissionSection3Risk1")}</li>
          <li>{tr(t, "universityMissionSection3Risk2")}</li>
          <li>{tr(t, "universityMissionSection3Risk3")}</li>
        </ul>
        <p>{tr(t, "universityMissionSection3RiskIdP2")}</p>
        <h3 className="text-lg font-semibold text-foreground">
          {tr(t, "universityMissionSection3MitigationTitle")}
        </h3>
        <ul className="list-disc space-y-2 pl-6 marker:text-primary/80">
          <li>{tr(t, "universityMissionSection3Mitigation1")}</li>
          <li>{tr(t, "universityMissionSection3Mitigation2")}</li>
          <li>{tr(t, "universityMissionSection3Mitigation3")}</li>
          <li>{tr(t, "universityMissionSection3Mitigation4")}</li>
          <li>{tr(t, "universityMissionSection3Mitigation5")}</li>
        </ul>
        <h3 className="text-lg font-semibold text-foreground">
          {tr(t, "universityMissionSection3GovernanceTitle")}
        </h3>
        <p>{tr(t, "universityMissionSection3GovernanceP1")}</p>
      </section>

      <section className="space-y-4" aria-labelledby="um-green">
        <h2 id="um-green" className="text-xl font-bold tracking-tight text-foreground md:text-2xl">
          {tr(t, "universityMissionSection4Title")}
        </h2>
        <p>{tr(t, "universityMissionSection4P1")}</p>
        <h3 className="text-lg font-semibold text-foreground">
          {tr(t, "universityMissionSection4GreenCampusTitle")}
        </h3>
        <ul className="list-disc space-y-2 pl-6 marker:text-primary/80">
          <li>{tr(t, "universityMissionSection4Initiative1")}</li>
          <li>{tr(t, "universityMissionSection4Initiative2")}</li>
          <li>{tr(t, "universityMissionSection4Initiative3")}</li>
          <li>{tr(t, "universityMissionSection4Initiative4")}</li>
        </ul>
        <h3 className="text-lg font-semibold text-foreground">
          {tr(t, "universityMissionSection4SustainableEducationTitle")}
        </h3>
        <p>{tr(t, "universityMissionSection4SustainableEducationP1")}</p>
        <h3 className="text-lg font-semibold text-foreground">
          {tr(t, "universityMissionSection4EnvironmentalAwarenessTitle")}
        </h3>
        <p>{tr(t, "universityMissionSection4EnvironmentalAwarenessP1")}</p>
        <h3 className="text-lg font-semibold text-foreground">
          {tr(t, "universityMissionSection4FutureGoalsTitle")}
        </h3>
        <ul className="list-disc space-y-2 pl-6 marker:text-primary/80">
          <li>{tr(t, "universityMissionSection4FutureGoal1")}</li>
          <li>{tr(t, "universityMissionSection4FutureGoal2")}</li>
          <li>{tr(t, "universityMissionSection4FutureGoal3")}</li>
          <li>{tr(t, "universityMissionSection4FutureGoal4")}</li>
        </ul>
        <MissionPdfDownload
          title={tr(t, "universityMissionSection4PdfTitle")}
          description={tr(t, "universityMissionSection4PdfDescription")}
          href={UNIVERSITY_MISSION_GREEN_STRATEGY_PDF_HREF}
          placeholder={pdfNote || tr(t, "universityMissionSection4PdfPlaceholder")}
          cta={pdfCta}
          pdfBadge={pdfBadge}
          downloadFilename="green-strategy.pdf"
        />
      </section>

      <section className="space-y-8" aria-labelledby="um-policies">
        <h2 id="um-policies" className="text-xl font-bold tracking-tight text-foreground md:text-2xl">
          {tr(t, "universityMissionSection5Title")}
        </h2>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-foreground">{tr(t, "universityMissionPolicy51Title")}</h3>
          <p>{tr(t, "universityMissionPolicy51P1")}</p>
          <p>
            <span className="font-medium text-foreground">{tr(t, "universityMissionLearnMorePrefix")}</span>
            <OutLink href="https://tues.uz/leader/view/35">
              {tr(t, "universityMissionLinkEducationalMethodologicalDept")}
            </OutLink>
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-foreground">{tr(t, "universityMissionPolicy52Title")}</h3>
          <p>{tr(t, "universityMissionPolicy52P1")}</p>
          <p>
            <span className="font-medium text-foreground">{tr(t, "universityMissionLearnMorePrefix")}</span>
            <OutLink href="https://tues.uz/leader/view/66">
              {tr(t, "universityMissionLinkComplianceControlDept")}
            </OutLink>
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-foreground">{tr(t, "universityMissionPolicy53Title")}</h3>
          <p>{tr(t, "universityMissionPolicy53P1")}</p>
          <p>
            <span className="font-medium text-foreground">{tr(t, "universityMissionLearnMorePrefix")}</span>
            <OutLink href="https://tues.uz/leader/view/67">
              {tr(t, "universityMissionLinkAccountingAuditDept")}
            </OutLink>
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-foreground">{tr(t, "universityMissionPolicy54Title")}</h3>
          <p>{tr(t, "universityMissionPolicy54P1")}</p>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-foreground">{tr(t, "universityMissionPolicy55Title")}</h3>
          <p>{tr(t, "universityMissionPolicy55P1")}</p>
          <p>
            <span className="font-medium text-foreground">{tr(t, "universityMissionReportConcernsPrefix")}</span>
            <OutLink href="https://tues.uz/leader/view/66">
              {tr(t, "universityMissionLinkComplianceControlDept")}
            </OutLink>
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-foreground">{tr(t, "universityMissionPolicy56Title")}</h3>
          <p>{tr(t, "universityMissionPolicy56P1")}</p>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-foreground">{tr(t, "universityMissionPolicy57Title")}</h3>
          <p>{tr(t, "universityMissionPolicy57P1")}</p>
        </div>
      </section>
    </div>
  );
}
