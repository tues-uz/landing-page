import type { TFunction } from "i18next";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Home } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { RecommendedNewsSidebar } from "@/components/RecommendedNewsSidebar";
import { cn } from "@/lib/utils";
import {
  HOW_TO_APPLY_CONTACT,
  HOW_TO_APPLY_PAGE_DEFAULTS,
  HOW_TO_APPLY_STEPS,
} from "@/locales/howToApplyDefaults";

function trHowToApply(t: TFunction, key: keyof typeof HOW_TO_APPLY_PAGE_DEFAULTS) {
  return t(key, { defaultValue: HOW_TO_APPLY_PAGE_DEFAULTS[key] });
}

export default function HowToApplyPage() {
  const { t } = useTranslation("topNav");
  const { t: tCommon } = useTranslation("common");
  const { t: th } = useTranslation("header");

  const vacanciesLabel = th("secondNav.vacancies");
  const title = trHowToApply(t, "howToApplyPageTitle");
  const intro = trHowToApply(t, "howToApplyPageIntro");
  const contactHeading = trHowToApply(t, "howToApplyContactHeading");
  const contactIntro = trHowToApply(t, "howToApplyContactIntro");

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
                    {vacanciesLabel}
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
              <article className="max-w-none">
                <header className="max-w-2xl">
                  <h1 className="text-balance text-3xl font-semibold tracking-tight text-foreground md:text-[2rem] md:leading-tight">
                    {title}
                  </h1>
                  <p className="mt-3 text-body-article text-muted-foreground">{intro}</p>
                </header>

                <ApplicationStepsTimeline t={t} />

                <section className="mt-12 max-w-2xl border-t border-border pt-10">
                  <h2 className="text-xl font-semibold tracking-tight text-foreground">{contactHeading}</h2>
                  <p className="mt-2 text-body-article text-muted-foreground">{contactIntro}</p>

                  <dl className="mt-8 space-y-6">
                    <ContactRow
                      label={trHowToApply(t, "howToApplyEmailLabel")}
                      value={HOW_TO_APPLY_CONTACT.email}
                      href={`mailto:${HOW_TO_APPLY_CONTACT.email}`}
                    />
                    {HOW_TO_APPLY_CONTACT.phones.map(({ display, tel }) => (
                      <ContactRow
                        key={tel}
                        label={trHowToApply(t, "howToApplyPhoneLabel")}
                        value={display}
                        href={`tel:${tel}`}
                        mono
                      />
                    ))}
                  </dl>
                </section>
              </article>
            </div>
            <RecommendedNewsSidebar className="order-2 lg:order-none lg:col-span-3" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function ApplicationStepsTimeline({ t }: { t: TFunction }) {
  const lastIndex = HOW_TO_APPLY_STEPS.length - 1;

  return (
    <ol className="relative m-0 mt-10 max-w-2xl list-none p-0" role="list">
      {HOW_TO_APPLY_STEPS.map(({ titleKey, bodyKey }, index) => {
        const isLast = index === lastIndex;

        return (
          <li
            key={titleKey}
            className={cn("grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-5 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-x-6", !isLast && "pb-1")}
          >
            <div className="flex flex-col items-center">
              <span
                className="relative z-[1] flex h-8 w-8 shrink-0 items-center justify-center rounded-sm bg-primary text-[13px] font-bold tabular-nums leading-none text-primary-foreground ring-4 ring-background sm:h-9 sm:w-9 sm:text-sm"
                aria-hidden
              >
                {index + 1}
              </span>
              {!isLast ? (
                <span
                  aria-hidden
                  className="my-1 min-h-[calc(100%-0.25rem)] flex-1 border-l-2 border-dashed border-border"
                />
              ) : null}
            </div>

            <div className={cn("min-w-0", !isLast && "pb-8 sm:pb-10")}>
              <h2 className="text-lg font-semibold leading-snug tracking-tight text-foreground">
                {trHowToApply(t, titleKey)}
              </h2>
              <p className="mt-2 text-body-article text-muted-foreground">{trHowToApply(t, bodyKey)}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

function ContactRow({
  label,
  value,
  href,
  mono = false,
}: {
  label: string;
  value: string;
  href: string;
  mono?: boolean;
}) {
  return (
    <div>
      <div className="flex flex-col gap-2 sm:hidden">
        <dt className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
          {label}
        </dt>
        <dd className="m-0">
          <a
            href={href}
            className={`text-base font-semibold text-primary underline-offset-4 hover:underline ${mono ? "font-mono tabular-nums" : "break-all"}`}
          >
            {value}
          </a>
        </dd>
      </div>

      <div className="hidden min-w-0 items-baseline gap-3 sm:flex">
        <dt className="w-20 shrink-0 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
          {label}
        </dt>
        <span
          className="h-px min-w-[1.5rem] flex-1 border-b border-dotted border-muted-foreground/45"
          aria-hidden
        />
        <dd className="m-0 shrink-0">
          <a
            href={href}
            className={`font-semibold text-primary underline-offset-4 transition-colors hover:underline ${mono ? "font-mono tabular-nums" : "break-all"}`}
          >
            {value}
          </a>
        </dd>
      </div>
    </div>
  );
}
