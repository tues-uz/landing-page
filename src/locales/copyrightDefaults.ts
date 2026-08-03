/** English fallbacks — Copyright page (`topNav`). */

export const COPYRIGHT_PAGE_DEFAULTS = {
  copyrightPageTitle: "Copyright",
  copyrightNotice:
    "© 2026 Termez University of Economics and Service. All rights reserved.",
  copyrightP1:
    'The texts, images, logos, graphic materials, videos, software code, databases, and other intellectual property objects placed on this website are protected by copyright and related rights in accordance with the Law of the Republic of Uzbekistan "On Copyright and Related Rights" and other applicable legal and regulatory acts.',
  copyrightP2:
    "Copying, reproducing, distributing, modifying, republishing on the internet, or using these materials for commercial purposes, in whole or in part, without the prior written consent of the University, is not permitted, except in cases provided for by law.",
  copyrightP3:
    'Use of the University\'s news and information materials is permitted provided that "Termez University of Economics and Service" is indicated as the source and an active link to the official website is included.',
  copyrightP4:
    "For permission to use materials or for further information, you may contact the University's official email address.",
  copyrightEmailLabel: "E-mail:",
  copyrightEmail: "info@tisu.uz",
} as const;

export const COPYRIGHT_PARAGRAPH_KEYS = [
  "copyrightP1",
  "copyrightP2",
  "copyrightP3",
  "copyrightP4",
] as const satisfies readonly (keyof typeof COPYRIGHT_PAGE_DEFAULTS)[];
