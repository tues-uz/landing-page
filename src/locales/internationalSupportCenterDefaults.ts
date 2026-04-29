/** English fallbacks for Internationalization → International Support Center (`topNav`). */

export const INTERNATIONAL_SUPPORT_CENTER_CARD1_PATH =
  "/internationalization/international-support-center/about" as const;

export const INTERNATIONAL_SUPPORT_CENTER_CARD1_HERO_SRC =
  "/images/internationalization/international-support-center/isc-globe-headset.png" as const;

export const INTERNATIONAL_SUPPORT_CENTER_PAGE_DEFAULTS = {
  internationalSupportCenterPageTitle: "International Support Center",
  internationalSupportCenterPageIntro:
    "Services and entry points for international students, partners, and visitors at Termez University of Economics and Service. Select a topic below.",
  internationalSupportCenterCard1Title: "International Support Center",

  internationalSupportCenterCard1BreadcrumbLabel: "About",
  internationalSupportCenterCard1PageTitle: "About the International Support Center",
  internationalSupportCenterCard1HeroAlt:
    "Globe with headset icon representing international support and assistance services.",
  internationalSupportCenterCard1DetailBody:
    "## About the International Support Center\n\nThe International Support Center (ISC) at Termez University of Economics and Service provides comprehensive assistance to international students, researchers, and visiting faculty members. Our mission is to ensure that international students feel welcomed, supported, and well integrated into academic and social life at the university. The center offers guidance on immigration procedures, academic adaptation, language support, and cultural integration.\n\n## Immigration and Visa Support\n\nThe International Support Center assists international students with immigration and visa-related procedures, including:\n\n•    Visa application and extension guidance\n•    Registration with local migration authorities\n•    Residence permit support\n•    Invitation letters for international students and scholars\n•    Consultation on legal requirements for studying in Uzbekistan\n\n## Responsible Officer for Immigration Support\n\nAskarov Abror\nLead specialist of the university's international cooperation department\nEmail: international@tues.uz\nTel: +998 412 07 07\nOffice hours: Monday–Friday, 08:00–17:00\n\n## Arrival and Orientation Support\n\nTo help new students adapt to university life, the center organizes orientation activities such as:\n\n•    International student orientation sessions\n•    Campus introduction and academic guidance\n•    Assistance with accommodation and registration\n•    Information sessions about living in Uzbekistan\n\n## Language Support Programs\n\nInternational students can improve their language skills through special courses offered by the university:\n\n•    Uzbek language courses\n•    Russian language courses\n•    English language improvement programs\n•    Academic writing and communication workshops\n\nLanguage support resources are available here:\n\nhttps://tues.uz/resource/view/166\n\n## Academic Support\n\nThe center provides academic guidance to help international students succeed in their studies:\n\n•    Academic advising and consultation\n•    Assistance with course selection\n•    Support in communication with faculty members\n•    Information on academic regulations and policies\n\n## Cultural and Social Integration\n\nTo promote intercultural understanding and student engagement, the center organizes various events:\n\n•    Cultural exchange events\n•    International student meetings\n•    Participation in university festivals and celebrations\n•    Networking events with local and international students\n\n## Student Support and Counseling\n\nThe International Support Center offers general guidance and support for students who may face challenges during their studies.\n\n•    Adjustment to a new academic environment\n•    Social integration\n•    Student welfare guidance\n•    Referral to relevant university services when necessary\n\n## Contact Information\n\nInternational Support Center\nTermez University of Economics and Service\n\nEmail: international@tues.uz\nPhone: +998 55 452 77 77\n\nOffice Hours:\nMonday – Friday\n08:00 – 17:00",
} as const;

export const INTERNATIONAL_SUPPORT_CENTER_CARD_KEYS = [
  "internationalSupportCenterCard1Title",
] as const satisfies readonly (keyof typeof INTERNATIONAL_SUPPORT_CENTER_PAGE_DEFAULTS)[];

export const INTERNATIONAL_SUPPORT_CENTER_CARD_HREFS: (string | undefined)[] = [
  INTERNATIONAL_SUPPORT_CENTER_CARD1_PATH,
];

export const INTERNATIONAL_SUPPORT_CENTER_CARD_IMAGES: (string | undefined)[] = [
  INTERNATIONAL_SUPPORT_CENTER_CARD1_HERO_SRC,
];
