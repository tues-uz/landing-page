/** Static paths under `public/uni-in-numbers/`. */

export type UniInNumbersDeck = {
  readonly href: string;
  /** Short label on the accent stripe (language / region code). */
  readonly code: string;
  readonly langKey: "uniNumbersLangEn" | "uniNumbersLangRu" | "uniNumbersLangUz" | "uniNumbersLangCn";
};

export const UNI_IN_NUMBERS_DECKS: readonly UniInNumbersDeck[] = [
  { href: "/uni-in-numbers/num-en.pptx", code: "EN", langKey: "uniNumbersLangEn" },
  { href: "/uni-in-numbers/num-ru.pptx", code: "RU", langKey: "uniNumbersLangRu" },
  { href: "/uni-in-numbers/num-uz.pptx", code: "UZ", langKey: "uniNumbersLangUz" },
  { href: "/uni-in-numbers/num-cn.pptx", code: "CN", langKey: "uniNumbersLangCn" },
] as const;
