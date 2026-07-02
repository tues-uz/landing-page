/** Internal registry detail routes under About → Accreditation & License. */

export type AccreditationRegistryId = "inteas" | "wdoms";

export type AccreditationRegistryCard = {
  readonly id: AccreditationRegistryId;
  readonly to: string;
  /** Display name (proper noun — same in all locales). */
  readonly title: string;
  readonly descKey: "accreditationInteasDesc" | "accreditationWdomsDesc";
  readonly imageSrc: string;
  readonly imageAltKey: "accreditationInteasCertificateAlt" | "accreditationWdomsImageAlt";
};

export const ACCREDITATION_REGISTRY_CARDS: readonly AccreditationRegistryCard[] = [
  {
    id: "inteas",
    to: "/about/inteas",
    title: "INTEAS",
    descKey: "accreditationInteasDesc",
    imageSrc: "/images/accreditation/inteas-certificate.png",
    imageAltKey: "accreditationInteasCertificateAlt",
  },
  {
    id: "wdoms",
    to: "/about/wdoms",
    title: "WDOMS",
    descKey: "accreditationWdomsDesc",
    imageSrc: "/images/accreditation/wdoms-sponsors.png",
    imageAltKey: "accreditationWdomsImageAlt",
  },
] as const;

export type AccreditationLicenseDocument = {
  readonly id: string;
  readonly href: string;
  readonly titleKey: "accreditationLicense2Title";
  readonly descKey: "accreditationLicense2Desc";
  readonly imageSrc: string;
  readonly imageAltKey: "accreditationLicense2ImageAlt";
};

export const ACCREDITATION_LICENSE_DOCUMENTS: readonly AccreditationLicenseDocument[] = [
  {
    id: "license-2",
    href: "/documents/tues-license-2.pdf",
    titleKey: "accreditationLicense2Title",
    descKey: "accreditationLicense2Desc",
    imageSrc: "/images/accreditation/tues-license-2.png",
    imageAltKey: "accreditationLicense2ImageAlt",
  },
] as const;
