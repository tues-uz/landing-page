/** Static paths under `public/downloads/mission/`. */

export type WhoWeAreMissionDoc = {
  readonly href: string;
  /** Short label on the accent stripe (language / region code). */
  readonly code: string;
  readonly langKey: "uniNumbersLangEn" | "uniNumbersLangRu" | "uniNumbersLangUz" | "uniNumbersLangCn";
};

export const WHO_WE_ARE_MISSION_DOCS: readonly WhoWeAreMissionDoc[] = [
  { href: "/downloads/mission/mission-en.docx", code: "EN", langKey: "uniNumbersLangEn" },
  { href: "/downloads/mission/mission-uz.docx", code: "UZ", langKey: "uniNumbersLangUz" },
  { href: "/downloads/mission/mission-ru.docx", code: "RU", langKey: "uniNumbersLangRu" },
  { href: "/downloads/mission/mission-cn.docx", code: "CN", langKey: "uniNumbersLangCn" },
] as const;
