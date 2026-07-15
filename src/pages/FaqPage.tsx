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
import {
  FAQ_ITEMS,
  FAQ_LINK_PATHS,
  FAQ_PAGE_DEFAULTS,
} from "@/locales/faqDefaults";

const triggerClass =
  "py-4 text-left text-base font-bold leading-snug text-foreground hover:no-underline sm:text-lg [&[data-state=open]]:text-foreground";
const contentClass = "pb-4 text-[15px] leading-relaxed text-muted-foreground";
const linkClass = "font-medium text-foreground underline-offset-4 hover:underline";

function trFaq(t: TFunction, key: keyof typeof FAQ_PAGE_DEFAULTS) {
  return t(key, { defaultValue: FAQ_PAGE_DEFAULTS[key] });
}

function FaqAnswer({
  t,
  th,
  item,
}: {
  t: TFunction;
  th: TFunction;
  item: (typeof FAQ_ITEMS)[number];
}) {
  switch (item.answerType) {
    case "link-regulations":
      return (
        <>
          {trFaq(t, "faqA2BeforeLink")}
          <Link to={FAQ_LINK_PATHS.regulationsAndRequirements} className={linkClass}>
            {trFaq(t, "faqA2LinkLabel")}
          </Link>{" "}
          ({th("nav.admissionsMenu.regulationsAndRequirements")})
        </>
      );

    case "link-accreditation":
      return (
        <>
          {trFaq(t, "faqA3BeforeLink")}
          <Link to={FAQ_LINK_PATHS.accreditationAndLicense} className={linkClass}>
            {trFaq(t, "faqA3LinkLabel")}
          </Link>{" "}
          ({th("nav.aboutMenu.accreditationAndLicense")})
        </>
      );

    case "text":
      return item.answerKey ? trFaq(t, item.answerKey) : null;

    default:
      return null;
  }
}

export default function FaqPage() {
  const { t } = useTranslation("topNav");
  const { t: tCommon } = useTranslation("common");
  const { t: th } = useTranslation("header");

  const admissionLabel = th("secondNav.admission2025");
  const title = trFaq(t, "faqPageTitle");
  const intro = trFaq(t, "faqPageIntro");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="below-header">
        <div className="border-b border-border bg-muted/50">
          <div className="container mx-auto flex max-w-[1348px] items-center px-4 py-3 sm:px-6 lg:px-8">
            <nav aria-label="Breadcrumb" className="min-w-0 flex-1">
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
              <article className="max-w-none">
                <header className="max-w-2xl">
                  <h1 className="text-balance text-3xl font-semibold tracking-tight text-foreground md:text-[2rem] md:leading-tight">
                    {title}
                  </h1>
                  <p className="mt-3 text-body-article text-muted-foreground">{intro}</p>
                </header>

                <Accordion
                  type="single"
                  collapsible
                  defaultValue={FAQ_ITEMS[0]?.id}
                  className="mt-10 max-w-2xl"
                >
                  {FAQ_ITEMS.map((item, index) => (
                    <AccordionItem key={item.id} value={item.id} className="border-border/60">
                      <AccordionTrigger className={triggerClass}>
                        <span className="flex items-start gap-3">
                          <span
                            className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-sm bg-primary text-xs font-bold tabular-nums leading-none text-primary-foreground"
                            aria-hidden
                          >
                            {index + 1}
                          </span>
                          <span>{trFaq(t, item.questionKey)}</span>
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className={contentClass}>
                        <FaqAnswer t={t} th={th} item={item} />
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
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
