/** English fallbacks — Admission 2025 → Menu (`topNav`). */

export const ADMISSION_2025_MENU_PAGE_DEFAULTS = {
  admission2025MenuPageTitle: "Menu",
  admission2025MenuPageIntro:
    "Official admission-related references from the President of the Republic of Uzbekistan. Open a card below when a document link is available.",
  admission2025MenuCardPresidentOrderTitle: "Order of the President of the Republic of Uzbekistan",
} as const;

export const ADMISSION_2025_MENU_CARD_KEYS = [
  {
    id: "presidentOrder",
    titleKey: "admission2025MenuCardPresidentOrderTitle",
  },
] as const;

export const ADMISSION_2025_MENU_CARD_HREFS: Record<
  (typeof ADMISSION_2025_MENU_CARD_KEYS)[number]["id"],
  string | undefined
> = {
  presidentOrder: "/admission-2025/menu/state-order-parameters-2024-2025",
};

/** Preview image above card title (same layout as Information transfer education cards). */
export const ADMISSION_2025_MENU_CARD_IMAGES: Record<
  (typeof ADMISSION_2025_MENU_CARD_KEYS)[number]["id"],
  string | undefined
> = {
  presidentOrder: "/images/admission-2025/president-order-examination-hall.jpg",
};
