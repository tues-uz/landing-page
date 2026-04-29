/** Internal registry detail routes under About → Accreditation & License. */

export type AccreditationRegistryId = "inteas" | "wdoms";

export type AccreditationRegistryCard = {
  readonly id: AccreditationRegistryId;
  readonly to: string;
  /** Display name (proper noun — same in all locales). */
  readonly title: string;
  readonly descKey: "accreditationInteasDesc" | "accreditationWdomsDesc";
};

export const ACCREDITATION_REGISTRY_CARDS: readonly AccreditationRegistryCard[] = [
  {
    id: "inteas",
    to: "/about/inteas",
    title: "INTEAS",
    descKey: "accreditationInteasDesc",
  },
  {
    id: "wdoms",
    to: "/about/wdoms",
    title: "WDOMS",
    descKey: "accreditationWdomsDesc",
  },
] as const;
