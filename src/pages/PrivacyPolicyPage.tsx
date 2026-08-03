import type { TFunction } from "i18next";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Home } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  PRIVACY_POLICY_DEFAULTS,
  PRIVACY_POLICY_SECTIONS,
  type PrivacyPolicySection,
} from "@/locales/privacyPolicyDefaults";

function trPrivacy(t: TFunction, key: keyof typeof PRIVACY_POLICY_DEFAULTS) {
  return t(key, { defaultValue: PRIVACY_POLICY_DEFAULTS[key] });
}

function PolicyBullets({
  t,
  introKey,
  bulletKeys,
}: {
  t: TFunction;
  introKey?: keyof typeof PRIVACY_POLICY_DEFAULTS;
  bulletKeys: (keyof typeof PRIVACY_POLICY_DEFAULTS)[];
}) {
  return (
    <div className="space-y-2">
      {introKey ? (
        <p className="text-[15px] leading-relaxed text-muted-foreground md:text-base">{trPrivacy(t, introKey)}</p>
      ) : null}
      <ul className="list-disc space-y-2 pl-6 text-[15px] leading-relaxed text-muted-foreground marker:text-primary/80 md:text-base">
        {bulletKeys.map((key) => (
          <li key={key}>{trPrivacy(t, key)}</li>
        ))}
      </ul>
    </div>
  );
}

function PolicySection({ t, section }: { t: TFunction; section: PrivacyPolicySection }) {
  const paragraphs = section.paragraphKeys ?? [];
  const [firstParagraph, ...restParagraphs] = paragraphs;

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold tracking-tight text-foreground md:text-2xl">
        {trPrivacy(t, section.titleKey)}
      </h2>

      {firstParagraph ? (
        <p className="text-[15px] leading-relaxed text-muted-foreground md:text-base">{trPrivacy(t, firstParagraph)}</p>
      ) : null}

      {section.subsections?.map((subsection) => (
        <div key={subsection.titleKey} className="space-y-2">
          <h3 className="text-base font-semibold text-foreground">{trPrivacy(t, subsection.titleKey)}</h3>
          <ul className="list-disc space-y-2 pl-6 text-[15px] leading-relaxed text-muted-foreground marker:text-primary/80 md:text-base">
            {subsection.bulletKeys.map((key) => (
              <li key={key}>{trPrivacy(t, key)}</li>
            ))}
          </ul>
        </div>
      ))}

      {section.bulletKeys ? (
        <PolicyBullets t={t} introKey={section.bulletIntroKey} bulletKeys={section.bulletKeys} />
      ) : null}

      {restParagraphs.map((key) => (
        <p key={key} className="text-[15px] leading-relaxed text-muted-foreground md:text-base">
          {trPrivacy(t, key)}
        </p>
      ))}
    </section>
  );
}

export default function PrivacyPolicyPage() {
  const { t } = useTranslation("topNav");
  const { t: tCommon } = useTranslation("common");

  const pageTitle = trPrivacy(t, "privacyPolicyPageTitle");

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
                <li className="min-w-0 flex-1 font-medium text-foreground">
                  <span className="line-clamp-2 sm:line-clamp-none">{pageTitle}</span>
                </li>
              </ol>
            </nav>
          </div>
        </div>

        <div className="container mx-auto max-w-[1348px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          <article className="mx-auto max-w-3xl">
            <h1 className="text-balance text-3xl font-semibold tracking-tight text-foreground md:text-[2rem] md:leading-tight">
              {pageTitle}
            </h1>
            <p className="mt-3 text-sm font-medium text-muted-foreground">
              {trPrivacy(t, "privacyPolicyLastUpdated")}
            </p>

            <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-muted-foreground md:text-base">
              <p>{trPrivacy(t, "privacyPolicyIntro1")}</p>
              <p>{trPrivacy(t, "privacyPolicyIntro2")}</p>
            </div>

            <div className="mt-10 space-y-10">
              {PRIVACY_POLICY_SECTIONS.map((section) => (
                <PolicySection key={section.titleKey} t={t} section={section} />
              ))}

              <p className="text-[15px] leading-relaxed text-muted-foreground md:text-base">
                <span className="font-medium text-foreground">{trPrivacy(t, "privacyPolicySection8EmailLabel")} </span>
                <a
                  href={`mailto:${PRIVACY_POLICY_DEFAULTS.privacyPolicySection8Email}`}
                  className="font-medium text-primary underline-offset-4 hover:underline"
                >
                  {trPrivacy(t, "privacyPolicySection8Email")}
                </a>
              </p>
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
