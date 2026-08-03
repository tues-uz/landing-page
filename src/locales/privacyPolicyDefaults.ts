/** English fallbacks — Privacy Policy page (`topNav`). */

export type PrivacySubsection = {
  titleKey: keyof typeof PRIVACY_POLICY_DEFAULTS;
  bulletKeys: (keyof typeof PRIVACY_POLICY_DEFAULTS)[];
};

export type PrivacyPolicySection = {
  titleKey: keyof typeof PRIVACY_POLICY_DEFAULTS;
  paragraphKeys?: (keyof typeof PRIVACY_POLICY_DEFAULTS)[];
  bulletIntroKey?: keyof typeof PRIVACY_POLICY_DEFAULTS;
  bulletKeys?: (keyof typeof PRIVACY_POLICY_DEFAULTS)[];
  subsections?: PrivacySubsection[];
};

export const PRIVACY_POLICY_DEFAULTS = {
  privacyPolicyPageTitle: "Privacy Policy",
  privacyPolicyLastUpdated: "Last updated: July 30, 2026",
  privacyPolicyIntro1:
    'Termez University of Economics and Service (hereinafter – the University) respects the privacy of its users\' personal data and processes and protects it in accordance with the Law of the Republic of Uzbekistan "On Personal Data," the Law "On Informatization," and other applicable legal and regulatory acts.',
  privacyPolicyIntro2:
    "This Privacy Policy sets out the procedure for collecting, processing, storing, and protecting personal data when using the official website on the TUES.UZ domain and other electronic information resources administered by the University.",

  privacyPolicySection1Title: "1. What information do we collect?",
  privacyPolicySection1Intro: "The University may collect the following information:",
  privacyPolicySection1RegistrationTitle: "Through the registration form:",
  privacyPolicySection1RegistrationBullet1: "last name, first name, and patronymic;",
  privacyPolicySection1RegistrationBullet2: "citizenship;",
  privacyPolicySection1RegistrationBullet3: "phone number;",
  privacyPolicySection1RegistrationBullet4: "passport details (series and number);",
  privacyPolicySection1RegistrationBullet5: "PINFL (Personal Identification Number of an Individual).",
  privacyPolicySection1NewsletterTitle: "Through subscribing to email newsletters:",
  privacyPolicySection1NewsletterBullet1: "email address.",
  privacyPolicySection1InquiryTitle: "Through submitting an inquiry or application:",
  privacyPolicySection1InquiryBullet1: "the content of the inquiry or application and the contact details provided.",
  privacyPolicySection1AutoTitle: "Automatically collected from the website:",
  privacyPolicySection1AutoBullet1: "IP address;",
  privacyPolicySection1AutoBullet2: "technical information about browser type, operating system, and device;",
  privacyPolicySection1AutoBullet3: "statistical data obtained through cookies.",
  privacyPolicySection1P2:
    "The University may also collect other information voluntarily provided by the user while using the University's electronic services.",
  privacyPolicySection1P3:
    "Passport details and PINFL are requested only where precise identification of the user is required (registration and processing of related documents) and are not used for any other purpose.",

  privacyPolicySection2Title: "2. Purpose of using the data",
  privacyPolicySection2Intro: "Collected personal data is used for the following purposes:",
  privacyPolicySection2Bullet1: "responding to user inquiries;",
  privacyPolicySection2Bullet2: "providing the University's electronic services;",
  privacyPolicySection2Bullet3: "registering students, applicants, and other users, and serving them;",
  privacyPolicySection2Bullet4: "precisely identifying the user based on passport details and PINFL;",
  privacyPolicySection2Bullet5: "organizing the educational process;",
  privacyPolicySection2Bullet6:
    "informing about University news and announcements by email (as part of the newsletter subscription service);",
  privacyPolicySection2Bullet7: "analyzing and improving the performance of the website;",
  privacyPolicySection2Bullet8: "ensuring information security;",
  privacyPolicySection2Bullet9: "complying with applicable legal requirements.",
  privacyPolicySection2P2:
    "The University does not use personal data for purposes inconsistent with those for which it was collected.",

  privacyPolicySection3Title: "3. Cookies",
  privacyPolicySection3P1:
    "The University's website may use cookies to provide convenient service to users, ensure the correct operation of the website's functions, and carry out statistical analysis.",
  privacyPolicySection3P2: "Users may restrict or disable cookies through their browser settings.",

  privacyPolicySection4Title: "4. Protection of personal data",
  privacyPolicySection4P1:
    "The University applies the necessary organizational and technical security measures to prevent the loss, unlawful use, unauthorized access, alteration, or disclosure of personal data.",
  privacyPolicySection4P2:
    "Passport details and PINFL, as identifying information, are accessible only to authorized staff and are stored under additional security controls.",
  privacyPolicySection4P3:
    "Personal data may be disclosed to third parties only in cases provided for by law or with the consent of the user.",
  privacyPolicySection4P4:
    "The University does not sell users' personal data and does not provide it to third parties for advertising purposes.",

  privacyPolicySection5Title: "5. Data retention",
  privacyPolicySection5P1:
    "Personal data is retained for as long as necessary to achieve the purpose of its processing, or for the periods established by the legislation of the Republic of Uzbekistan.",
  privacyPolicySection5P2:
    "Data collected during registration is retained for the duration of the user's status in relation to the University (student status, subscriber status, etc.) and thereafter for the archival periods established by law. Users may unsubscribe from newsletters at any time, upon which their email address is removed from the subscriber list.",

  privacyPolicySection6Title: "6. User rights",
  privacyPolicySection6Intro: "In accordance with applicable law, the user has the right to:",
  privacyPolicySection6Bullet1: "obtain information about their own personal data;",
  privacyPolicySection6Bullet2: "request the correction of inaccurate or incomplete data;",
  privacyPolicySection6Bullet3:
    "request the deletion of data or the restriction of its processing, in cases provided for by law;",
  privacyPolicySection6Bullet4: "submit inquiries regarding the processing of their personal data.",

  privacyPolicySection7Title: "7. Amendments to the Privacy Policy",
  privacyPolicySection7P1:
    "The University reserves the right to amend and supplement this Privacy Policy. The updated version takes effect from the date it is published on the official website.",

  privacyPolicySection8Title: "8. Contact",
  privacyPolicySection8P1:
    "For questions regarding this Privacy Policy or the processing of personal data, you may contact the University's official email address.",
  privacyPolicySection8EmailLabel: "E-mail:",
  privacyPolicySection8Email: "info@tisu.uz",
} as const;

export const PRIVACY_POLICY_SECTIONS: PrivacyPolicySection[] = [
  {
    titleKey: "privacyPolicySection1Title",
    paragraphKeys: ["privacyPolicySection1Intro", "privacyPolicySection1P2", "privacyPolicySection1P3"],
    subsections: [
      {
        titleKey: "privacyPolicySection1RegistrationTitle",
        bulletKeys: [
          "privacyPolicySection1RegistrationBullet1",
          "privacyPolicySection1RegistrationBullet2",
          "privacyPolicySection1RegistrationBullet3",
          "privacyPolicySection1RegistrationBullet4",
          "privacyPolicySection1RegistrationBullet5",
        ],
      },
      {
        titleKey: "privacyPolicySection1NewsletterTitle",
        bulletKeys: ["privacyPolicySection1NewsletterBullet1"],
      },
      {
        titleKey: "privacyPolicySection1InquiryTitle",
        bulletKeys: ["privacyPolicySection1InquiryBullet1"],
      },
      {
        titleKey: "privacyPolicySection1AutoTitle",
        bulletKeys: [
          "privacyPolicySection1AutoBullet1",
          "privacyPolicySection1AutoBullet2",
          "privacyPolicySection1AutoBullet3",
        ],
      },
    ],
  },
  {
    titleKey: "privacyPolicySection2Title",
    paragraphKeys: ["privacyPolicySection2P2"],
    bulletIntroKey: "privacyPolicySection2Intro",
    bulletKeys: [
      "privacyPolicySection2Bullet1",
      "privacyPolicySection2Bullet2",
      "privacyPolicySection2Bullet3",
      "privacyPolicySection2Bullet4",
      "privacyPolicySection2Bullet5",
      "privacyPolicySection2Bullet6",
      "privacyPolicySection2Bullet7",
      "privacyPolicySection2Bullet8",
      "privacyPolicySection2Bullet9",
    ],
  },
  {
    titleKey: "privacyPolicySection3Title",
    paragraphKeys: ["privacyPolicySection3P1", "privacyPolicySection3P2"],
  },
  {
    titleKey: "privacyPolicySection4Title",
    paragraphKeys: [
      "privacyPolicySection4P1",
      "privacyPolicySection4P2",
      "privacyPolicySection4P3",
      "privacyPolicySection4P4",
    ],
  },
  {
    titleKey: "privacyPolicySection5Title",
    paragraphKeys: ["privacyPolicySection5P1", "privacyPolicySection5P2"],
  },
  {
    titleKey: "privacyPolicySection6Title",
    bulletIntroKey: "privacyPolicySection6Intro",
    bulletKeys: [
      "privacyPolicySection6Bullet1",
      "privacyPolicySection6Bullet2",
      "privacyPolicySection6Bullet3",
      "privacyPolicySection6Bullet4",
    ],
  },
  {
    titleKey: "privacyPolicySection7Title",
    paragraphKeys: ["privacyPolicySection7P1"],
  },
  {
    titleKey: "privacyPolicySection8Title",
    paragraphKeys: ["privacyPolicySection8P1"],
  },
];
