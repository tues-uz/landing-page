import { useMemo } from "react";
import type { TFunction } from "i18next";
import { useTranslation } from "react-i18next";
import { OrgChartTree } from "@/components/OrgChartTree";
import { buildOrganizationalStructureTree } from "@/config/organizationalStructureOrgChartTree";
import { ORGANIZATIONAL_STRUCTURE_I18N_DEFAULTS } from "@/locales/organizationalStructureDefaults";
import "@/styles/jquery.orgchart.scoped.css";
import "@/styles/orgchart-tues-overrides.css";

function tr(t: TFunction, key: keyof typeof ORGANIZATIONAL_STRUCTURE_I18N_DEFAULTS) {
  return t(key, { defaultValue: ORGANIZATIONAL_STRUCTURE_I18N_DEFAULTS[key] });
}

export function OrganizationalStructureSection() {
  const { t } = useTranslation("topNav");
  const tree = useMemo(() => buildOrganizationalStructureTree(), []);

  const introParagraphs = tr(t, "organizationalStructureIntro")
    .split(/\n\n+/)
    .map((block) => block.trim())
    .filter(Boolean);

  return (
    <div className="mt-4 max-w-none">
      <div className="space-y-4 text-body-article text-muted-foreground">
        {introParagraphs.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      <div
        id="structure_org_chart"
        className="mt-8 overflow-x-auto rounded-lg bg-white dark:bg-muted/20"
      >
        <div className="orgchart mx-auto min-w-0 max-w-5xl p-4 sm:p-6">
          <OrgChartTree root={tree} />
        </div>
        <p className="mx-auto mt-2 max-w-3xl px-4 pb-6 text-center text-sm leading-relaxed text-muted-foreground sm:px-6">
          {tr(t, "organizationalStructureCaption")}
        </p>
      </div>
    </div>
  );
}
