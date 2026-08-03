import type { TFunction } from "i18next";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Home } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { RecommendedNewsSidebar } from "@/components/RecommendedNewsSidebar";
import { HELP_247_PAGE_DEFAULTS } from "@/locales/help247Defaults";

function trHelp247(t: TFunction, key: keyof typeof HELP_247_PAGE_DEFAULTS) {
  return t(key, { defaultValue: HELP_247_PAGE_DEFAULTS[key] });
}

const bodyClass = "text-body-article text-muted-foreground";
const h2Class = "text-xl font-semibold tracking-tight text-foreground md:text-2xl";
const h3Class = "text-lg font-semibold tracking-tight text-foreground";

function bulletLines(raw: string): string[] {
  return raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function ServiceBlock({
  t,
  titleKey,
  itemsKey,
}: {
  t: TFunction;
  titleKey: keyof typeof HELP_247_PAGE_DEFAULTS;
  itemsKey: keyof typeof HELP_247_PAGE_DEFAULTS;
}) {
  const title = trHelp247(t, titleKey);
  const itemsRaw = trHelp247(t, itemsKey);
  const lines = bulletLines(itemsRaw);
  return (
    <li className="list-none">
      <h3 className={h3Class}>{title}</h3>
      <ul className="mt-3 list-disc space-y-2 pl-6 text-justify marker:text-foreground" role="list">
        {lines.map((line, i) => (
          <li key={i} className={bodyClass}>
            {line}
          </li>
        ))}
      </ul>
    </li>
  );
}

export default function Help247Page() {
  const { t } = useTranslation("topNav");
  const { t: tCommon } = useTranslation("common");
  const { t: th } = useTranslation("header");

  const leafTitle = trHelp247(t, "help247PageTitle");
  const studentLifeLabel = th("secondNav.studentLife");

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
                  <span className="font-medium text-muted-foreground line-clamp-2 sm:line-clamp-none">{studentLifeLabel}</span>
                </li>
                <li aria-hidden className="flex items-center text-muted-foreground/70">
                  <span className="leading-none">/</span>
                </li>
                <li className="min-w-0 flex-1 font-medium text-foreground">
                  <span className="line-clamp-2 sm:line-clamp-none">{leafTitle}</span>
                </li>
              </ol>
            </nav>
          </div>
        </div>

        <div className="container mx-auto max-w-[1348px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
            <div className="order-1 lg:order-none lg:col-span-9">
              <Help247Article t={t} />
            </div>
            <RecommendedNewsSidebar className="order-2 lg:order-none lg:col-span-3" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function Help247Article({ t }: { t: TFunction }) {
  const title = trHelp247(t, "help247PageTitle");
  const intro = trHelp247(t, "help247PageIntro");
  const purposeHeading = trHelp247(t, "help247PurposeHeading");
  const purposeBody = trHelp247(t, "help247PurposeBody");
  const servicesHeading = trHelp247(t, "help247ServicesHeading");

  return (
    <article className="max-w-none">
      <h1 className="text-balance text-3xl font-semibold tracking-tight text-foreground md:text-[2rem] md:leading-tight">
        {title}
      </h1>
      <p className={`mt-3 text-justify ${bodyClass}`}>{intro}</p>

      <h2 className={`mt-10 ${h2Class}`}>{purposeHeading}</h2>
      <p className={`mt-4 text-justify ${bodyClass}`}>{purposeBody}</p>

      <h2 className={`mt-10 ${h2Class}`}>{servicesHeading}</h2>
      <ul className="m-0 mt-6 list-none space-y-8 p-0">
        <ServiceBlock
          t={t}
          titleKey="help247AcademicTitle"
          itemsKey="help247AcademicItems"
        />
        <ServiceBlock
          t={t}
          titleKey="help247TechnicalTitle"
          itemsKey="help247TechnicalItems"
        />
        <ServiceBlock
          t={t}
          titleKey="help247AdministrativeTitle"
          itemsKey="help247AdministrativeItems"
        />
        <ServiceBlock
          t={t}
          titleKey="help247CareerTitle"
          itemsKey="help247CareerItems"
        />
      </ul>
    </article>
  );
}
