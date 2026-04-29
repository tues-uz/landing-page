/** Static paths under `public/downloads/regulation/`. */

export type RegulationDocument = {
  readonly href: string;
  /** Short label on the accent stripe (language / region code). */
  readonly code: string;
  readonly langKey: "uniNumbersLangEn" | "uniNumbersLangRu" | "uniNumbersLangUz" | "uniNumbersLangCn";
};

export const REGULATION_DOCUMENTS: readonly RegulationDocument[] = [
  { href: "/downloads/regulation/reg-en.docx", code: "EN", langKey: "uniNumbersLangEn" },
  { href: "/downloads/regulation/reg-uz.docx", code: "UZ", langKey: "uniNumbersLangUz" },
  { href: "/downloads/regulation/reg-ru.docx", code: "RU", langKey: "uniNumbersLangRu" },
  { href: "/downloads/regulation/reg-cn.docx", code: "CN", langKey: "uniNumbersLangCn" },
] as const;
