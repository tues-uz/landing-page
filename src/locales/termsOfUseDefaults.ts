/** English fallbacks — Terms of Use page (`topNav`). */

export type TermsOfUseSection = {
  titleKey: keyof typeof TERMS_OF_USE_DEFAULTS;
  paragraphKeys: (keyof typeof TERMS_OF_USE_DEFAULTS)[];
  bulletKeys?: (keyof typeof TERMS_OF_USE_DEFAULTS)[];
};

export const TERMS_OF_USE_DEFAULTS = {
  termsOfUsePageTitle: "Terms of Use",
  termsOfUseLastUpdated: "Last updated: July 30, 2026",
  termsOfUseIntro1:
    "These Terms of Use govern the use of the official website of Termez University of Economics and Service (hereinafter – the University).",
  termsOfUseIntro2:
    "By using the website, the user confirms that they have read these terms and agree to comply with them.",

  termsOfUseSection1Title: "1. General provisions",
  termsOfUseSection1P1:
    "The University provides access to the information, electronic services, and other materials placed on this website in accordance with applicable law and these Terms of Use.",
  termsOfUseSection1P2:
    "Information placed on the University's website is published for informational and educational purposes.",

  termsOfUseSection2Title: "2. Intellectual property rights",
  termsOfUseSection2P1:
    "The texts, images, logos, graphic materials, videos, software code, databases, and other materials placed on the website are protected by the intellectual property legislation of the Republic of Uzbekistan.",
  termsOfUseSection2P2:
    'Copying, reproducing, distributing, modifying, republishing on the internet, or using these materials for commercial purposes without the prior written consent of the University is not permitted, except in cases provided for by law. Further details on this matter are provided in the "Copyright" document.',

  termsOfUseSection3Title: "3. User obligations",
  termsOfUseSection3Intro: "When using the website, the user is required to:",
  termsOfUseSection3Bullet1: "comply with applicable legal requirements;",
  termsOfUseSection3Bullet2: "not infringe on the rights and legitimate interests of other persons;",
  termsOfUseSection3Bullet3: "not post malicious software, viruses, or unlawful content;",
  termsOfUseSection3Bullet4: "not unlawfully interfere with the operation of the website.",

  termsOfUseSection4Title: "4. University's rights",
  termsOfUseSection4Intro: "The University reserves the right to:",
  termsOfUseSection4Bullet1: "update, modify, or remove content on the website;",
  termsOfUseSection4Bullet2:
    "temporarily restrict or suspend the operation of the website for technical maintenance purposes;",
  termsOfUseSection4Bullet3:
    "restrict access to certain services for users who act in violation of these Terms of Use.",

  termsOfUseSection5Title: "5. Limitation of liability",
  termsOfUseSection5P1:
    "The University takes the necessary measures to ensure the relevance and reliability of the information placed on the website.",
  termsOfUseSection5P2:
    "At the same time, unless otherwise provided by law, the University is not liable for any direct or indirect damages that may arise from the use of information on the website.",
  termsOfUseSection5P3:
    "The University is not responsible for the content of third-party websites linked from this website.",

  termsOfUseSection6Title: "6. External links",
  termsOfUseSection6P1: "The website may contain links to third-party internet resources.",
  termsOfUseSection6P2:
    "The presence of such links does not imply the University's endorsement of the activities or content of those resources.",

  termsOfUseSection7Title: "7. Privacy",
  termsOfUseSection7P1:
    'The procedure for collecting and processing users\' personal data is governed by the "Privacy Policy" document.',

  termsOfUseSection8Title: "8. Amendments to the Terms of Use",
  termsOfUseSection8P1:
    "The University reserves the right to amend and supplement these Terms of Use at any time.",
  termsOfUseSection8P2:
    "The updated version takes effect from the date it is published on the official website.",

  termsOfUseSection9Title: "9. Contact",
  termsOfUseSection9P1:
    "For questions or suggestions regarding these Terms of Use, you may contact the University's official email address.",
  termsOfUseSection9EmailLabel: "E-mail:",
  termsOfUseSection9Email: "info@tisu.uz",
} as const;

export const TERMS_OF_USE_SECTIONS: TermsOfUseSection[] = [
  {
    titleKey: "termsOfUseSection1Title",
    paragraphKeys: ["termsOfUseSection1P1", "termsOfUseSection1P2"],
  },
  {
    titleKey: "termsOfUseSection2Title",
    paragraphKeys: ["termsOfUseSection2P1", "termsOfUseSection2P2"],
  },
  {
    titleKey: "termsOfUseSection3Title",
    paragraphKeys: ["termsOfUseSection3Intro"],
    bulletKeys: [
      "termsOfUseSection3Bullet1",
      "termsOfUseSection3Bullet2",
      "termsOfUseSection3Bullet3",
      "termsOfUseSection3Bullet4",
    ],
  },
  {
    titleKey: "termsOfUseSection4Title",
    paragraphKeys: ["termsOfUseSection4Intro"],
    bulletKeys: ["termsOfUseSection4Bullet1", "termsOfUseSection4Bullet2", "termsOfUseSection4Bullet3"],
  },
  {
    titleKey: "termsOfUseSection5Title",
    paragraphKeys: ["termsOfUseSection5P1", "termsOfUseSection5P2", "termsOfUseSection5P3"],
  },
  {
    titleKey: "termsOfUseSection6Title",
    paragraphKeys: ["termsOfUseSection6P1", "termsOfUseSection6P2"],
  },
  {
    titleKey: "termsOfUseSection7Title",
    paragraphKeys: ["termsOfUseSection7P1"],
  },
  {
    titleKey: "termsOfUseSection8Title",
    paragraphKeys: ["termsOfUseSection8P1", "termsOfUseSection8P2"],
  },
  {
    titleKey: "termsOfUseSection9Title",
    paragraphKeys: ["termsOfUseSection9P1"],
  },
];
