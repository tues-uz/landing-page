import { useTranslation } from "react-i18next";
import { PRESIDENT_ORDER_STATE_ORDER_ARTICLE } from "@/data/presidentOrderStateOrderArticleContent";
import { getUiLang } from "@/lib/localeContent";

const LEX_URL = "https://lex.uz/uz/docs/-7028136" as const;

/**
 * President order F-36 on state order admission parameters (2024/2025).
 * Uzbek: official text; en/ru/zh: editorial translations.
 */
export function PresidentOrderStateOrderArticle() {
  const { i18n } = useTranslation();
  const lang = getUiLang(i18n);
  const c = PRESIDENT_ORDER_STATE_ORDER_ARTICLE[lang];

  return (
    <div className="mt-6 flex flex-col gap-6 text-[15px] leading-relaxed text-muted-foreground md:text-base">
      {c.documentTitle ? (
        <header className="space-y-1 text-foreground">
          <p className="text-lg font-semibold tracking-tight text-pretty">{c.documentTitle}</p>
          {c.documentDateLine ? <p className="text-muted-foreground">{c.documentDateLine}</p> : null}
        </header>
      ) : null}

      <p className="text-pretty">{c.intro}</p>

      <section className="space-y-3" aria-labelledby="po-section-1">
        <h2 id="po-section-1" className="text-lg font-semibold tracking-tight text-foreground">
          {c.section1Heading}
        </h2>
        <ul className="list-disc space-y-2 pl-5 marker:text-primary/80 md:pl-6">
          {c.section1Items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="space-y-3" aria-labelledby="po-section-2">
        <h2 id="po-section-2" className="text-lg font-semibold tracking-tight text-foreground">
          {c.section2Heading}
        </h2>
        <ul className="list-disc space-y-2 pl-5 marker:text-primary/80 md:pl-6">
          {c.section2Items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="space-y-4" aria-labelledby="po-section-3">
        <h2 id="po-section-3" className="text-lg font-semibold tracking-tight text-foreground">
          {c.section3Heading}
        </h2>
        <div className="space-y-3 pl-0 md:pl-1">
          <p className="font-medium text-foreground">{c.section3AHeading}</p>
          <ul className="list-disc space-y-2 pl-5 marker:text-primary/80 md:pl-6">
            {c.section3AItems.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
          <p className="font-medium text-foreground">{c.section3BHeading}</p>
          <ul className="list-disc space-y-2 pl-5 marker:text-primary/80 md:pl-6">
            {c.section3BItems.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="space-y-4" aria-labelledby="po-section-4">
        <h2 id="po-section-4" className="text-lg font-semibold tracking-tight text-foreground">
          {c.section4Heading}
        </h2>
        <div className="space-y-4">
          <div>
            <p className="font-medium text-foreground">{c.section4AHeading}</p>
            <ul className="mt-2 list-disc space-y-2 pl-5 marker:text-primary/80 md:pl-6">
              {c.section4AItems.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
          <p className="text-pretty">{c.section4B}</p>
        </div>
      </section>

      <section aria-labelledby="po-section-5">
        <h2 id="po-section-5" className="sr-only">
          5
        </h2>
        <p className="text-pretty">
          <span className="font-semibold text-foreground">5. </span>
          {c.section5}
        </p>
      </section>

      <section aria-labelledby="po-section-6">
        <h2 id="po-section-6" className="sr-only">
          6
        </h2>
        <p className="text-pretty">
          <span className="font-semibold text-foreground">6. </span>
          {c.section6}
        </p>
      </section>

      <p className="text-pretty">{c.controlParagraph}</p>

      <div className="border-t border-border pt-6 text-foreground">
        <p className="font-medium">{c.signaturePresident}</p>
        <p className="mt-3 text-muted-foreground">{c.signaturePlace}</p>
        <p className="text-muted-foreground">{c.signatureDate}</p>
        <p className="text-muted-foreground">{c.signatureNumber}</p>
      </div>

      <p className="text-pretty">
        {c.lexLinkPrefix}{" "}
        <a
          href={LEX_URL}
          className="font-medium text-primary underline-offset-4 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {LEX_URL}
        </a>
      </p>
    </div>
  );
}
