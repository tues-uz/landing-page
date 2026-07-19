export type LabelValueRow = {
  readonly label: string;
  readonly value: string;
};

export type UniNumbersStatBlock = {
  readonly heading: string;
  readonly rows: readonly LabelValueRow[];
};

export type UniNumbersBulletGroup = {
  readonly heading: string;
  readonly items: readonly string[];
};

export type UniNumbersTwoColumnTable = {
  readonly heading?: string;
  readonly col1: string;
  readonly col2: string;
  readonly rows: readonly { readonly col1: string; readonly col2: string }[];
};

export type UniNumbersRankTable = {
  readonly heading?: string;
  readonly rows: readonly { readonly rank: number; readonly region: string }[];
};

export type UniNumbersProgress = {
  readonly current: string;
  readonly target: string;
  readonly caption: string;
};

export type UniNumbersContentBlock =
  | { readonly type: "paragraph"; readonly text: string }
  | { readonly type: "subheading"; readonly text: string }
  | { readonly type: "statBlock"; readonly block: UniNumbersStatBlock }
  | { readonly type: "progress"; readonly progress: UniNumbersProgress }
  | { readonly type: "bulletGroup"; readonly group: UniNumbersBulletGroup }
  | { readonly type: "table"; readonly table: UniNumbersTwoColumnTable }
  | { readonly type: "rankTable"; readonly table: UniNumbersRankTable }
  | { readonly type: "callout"; readonly text: string }
  | { readonly type: "highlight"; readonly label: string; readonly caption: string };

export type UniNumbersSection = {
  readonly title: string;
  readonly blocks: readonly UniNumbersContentBlock[];
};

export const UNIVERSITY_IN_NUMBERS_REPORT = {
  institution: "TERMIZ UNIVERSITY OF ECONOMICS AND SERVICE (TUES)",
  headline: "TUES IN NUMBERS",
  tagline: "Key Figures & Strategic Vision 2025–2030",
  intro:
    "Termiz University of Economics and Service (TUES) is committed to transforming into a modern, innovative educational hub. This report presents a snapshot of the university's academic strength, infrastructure, scientific potential, and strategic growth as TUES advances toward its 2030 goals.",
  sections: [
    {
      title: "1. Institutional Snapshot",
      blocks: [
        {
          type: "paragraph",
          text: "TUES currently operates three faculties and sixteen departments, delivering 28 bachelor's and 13 master's degree specialities to a growing academic community.",
        },
        {
          type: "statBlock",
          block: {
            heading: "Academic Structure",
            rows: [
              { label: "Faculties", value: "3" },
              { label: "Departments", value: "16" },
              { label: "Bachelor's Degree Specialities", value: "28" },
              { label: "Master's Degree Specialities", value: "13" },
            ],
          },
        },
        {
          type: "paragraph",
          text: "The university's total student body has reached 23,684, with women comprising more than two-thirds of overall enrollment.",
        },
        {
          type: "statBlock",
          block: {
            heading: "Student Body",
            rows: [
              { label: "Total Students", value: "23,684" },
              { label: "Bachelor's Students", value: "23,217" },
              { label: "Master's Students", value: "467" },
              { label: "Male Students", value: "7,475" },
              { label: "Female Students", value: "16,209" },
            ],
          },
        },
        {
          type: "paragraph",
          text: "This community is supported by a teaching staff of 281. Scientific potential — the share of faculty holding a Doctor of Science or PhD degree — currently stands at 42.6%, with a strategic target of 75% by 2030.",
        },
        {
          type: "statBlock",
          block: {
            heading: "Teaching Staff",
            rows: [
              { label: "Total Teaching Staff", value: "281" },
              { label: "Doctors of Science (DSc)", value: "10" },
              { label: "Doctors of Philosophy (PhD)", value: "111" },
              { label: "Average Age", value: "37 years" },
            ],
          },
        },
        {
          type: "progress",
          progress: {
            current: "42.6%",
            target: "75%",
            caption: "Current scientific potential, targeting three-quarters of faculty by 2030",
          },
        },
      ],
    },
    {
      title: "2. Campus & Infrastructure",
      blocks: [
        {
          type: "paragraph",
          text: "The campus spans 1.3 hectares across four educational buildings, offering 148 auditoriums, nine laboratories, and ten computer cabins to support classroom and hands-on learning.",
        },
        {
          type: "statBlock",
          block: {
            heading: "Current Infrastructure",
            rows: [
              { label: "Total Campus Area", value: "1.3 hectares" },
              { label: "Educational Area (4 Buildings)", value: "32,687 m²" },
              { label: "Additional Useful Area", value: "14,963 m²" },
              { label: "Auditoriums", value: "148" },
              { label: "Laboratories", value: "9" },
              { label: "Computer Cabins", value: "10" },
              { label: "Educational Area per Student", value: "4.2 m²" },
            ],
          },
        },
        {
          type: "subheading",
          text: "Infrastructure Development Roadmap (2025–2030)",
        },
        {
          type: "paragraph",
          text: "A series of major capital projects will reshape the campus over the coming years:",
        },
        {
          type: "table",
          table: {
            col1: "Initiative",
            col2: "Target Year",
            rows: [
              { col1: "New Educational Building (5,000 seats)", col2: "2028" },
              { col1: "New Student Dormitory (2,000 seats)", col2: "2026" },
              { col1: "Apartment Houses for Professors & Teachers (68 units)", col2: "2027" },
              {
                col1: '"Smart Campus" & Green Campus Initiative (Solar Panels)',
                col2: "Through 2030",
              },
            ],
          },
        },
      ],
    },
    {
      title: "3. Global Reach & Internationalization",
      blocks: [
        {
          type: "paragraph",
          text: "TUES is expanding its global footprint through partnerships, accreditations, and student exchanges, maintaining active academic collaborations with institutions in Kazakhstan, Russia, Turkey, Tajikistan, Japan, China, India, and Czechia.",
        },
        {
          type: "table",
          table: {
            heading: "2030 Internationalization Targets",
            col1: "Target",
            col2: "2030 Goal",
            rows: [
              { col1: "Professors & Teachers in Professional Development Abroad", col2: "150" },
              { col1: "International Students at TUES", col2: "75" },
              { col1: "Joint Educational Programs (Double Degree)", col2: "10" },
              { col1: "Research Articles in Scopus / Web of Science", col2: "1,000" },
            ],
          },
        },
      ],
    },
    {
      title: "4. Science, Innovation & Laboratories",
      blocks: [
        {
          type: "paragraph",
          text: "Our focus is on practical research and cutting-edge laboratory infrastructure, anchored by nine newly established scientific schools and sustained investment in specialized equipment.",
        },
        {
          type: "subheading",
          text: "Scientific Schools",
        },
        {
          type: "paragraph",
          text: "Nine new scientific schools have been established in Chemistry, Biophysics, Biology, Anatomy, Physiology, Histology, History, Ethnography, and Biochemistry.",
        },
        {
          type: "subheading",
          text: "Laboratory Investment",
        },
        {
          type: "paragraph",
          text: "Laboratory upgrades are focused on advanced equipment for medicinal plants, pharmacology, natural sciences, and software/AI research, strengthening the university's applied research capacity.",
        },
        {
          type: "callout",
          text: "5 Programs — Target for international academic accreditation by 2030",
        },
      ],
    },
    {
      title: "5. Student Development, Digitalization & Sports",
      blocks: [
        {
          type: "paragraph",
          text: "Equal emphasis is placed on the holistic development of students through technology, social engagement, and sport.",
        },
        {
          type: "bulletGroup",
          group: {
            heading: "Digital Campus Initiatives",
            items: [
              "A secure mobile application for dormitory management and campus public order",
              'A "Smart Campus" platform hosting all lesson materials',
              "Digital educational platforms enhanced with AI and VR technologies",
            ],
          },
        },
        {
          type: "bulletGroup",
          group: {
            heading: "Creative & Social Hubs",
            items: [
              "Student Media Center",
              "Creative Students' Park",
              '"Book-cafe"',
              "Student Tech Zone",
              'The "Zulfiyaxonim izdoshlari" club and other dedicated support programs for female students',
              "Free vocational skills training for vulnerable youth",
            ],
          },
        },
        {
          type: "subheading",
          text: "Sports Ambitions",
        },
        {
          type: "paragraph",
          text: "A dedicated university program promotes national sports, with the ambitious goal of nurturing 30 national, Asian, World, and Olympic champions by 2030.",
        },
        {
          type: "highlight",
          label: "30 Champions",
          caption: "National, Asian, World and Olympic champions\ntargeted by 2030",
        },
        {
          type: "bulletGroup",
          group: {
            heading: "Student Clubs",
            items: [
              "Chess club",
              '"Bookworm" reading circle',
              "Socio-psychological service",
              "Volunteer center",
              "Embroidery and design club",
            ],
          },
        },
      ],
    },
    {
      title: "6. Regional Footprint",
      blocks: [
        {
          type: "paragraph",
          text: "While TUES students come from every region of Uzbekistan, the highest concentration of the university's academic family hails from Surkhandarya, followed by Samarkand, Tashkent, and Kashkadarya.",
        },
        {
          type: "rankTable",
          table: {
            rows: [
              { rank: 1, region: "Surkhandarya region (highest concentration)" },
              { rank: 2, region: "Samarkand region" },
              { rank: 3, region: "Tashkent region" },
              { rank: 4, region: "Kashkadarya region" },
            ],
          },
        },
      ],
    },
    {
      title: "Looking Ahead",
      blocks: [
        {
          type: "paragraph",
          text: "Guided by these targets, TUES continues its transformation into a globally connected, research-driven university — expanding its campuses, growing its scientific community, and preparing students to compete on regional and international stages through 2030.",
        },
      ],
    },
  ] satisfies readonly UniNumbersSection[],
} as const;

export const UNIVERSITY_IN_NUMBERS_TABLE_COL_FIGURE = "Figure";
