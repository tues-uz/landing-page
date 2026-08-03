import type { UniNumbersI18nKey } from "@/locales/universityInNumbersDefaults";

export type LabelValueRow = {
  readonly labelKey: UniNumbersI18nKey;
  readonly value: string;
};

export type UniNumbersStatBlock = {
  readonly headingKey: UniNumbersI18nKey;
  readonly rows: readonly LabelValueRow[];
};

export type UniNumbersBulletGroup = {
  readonly headingKey: UniNumbersI18nKey;
  readonly itemKeys: readonly UniNumbersI18nKey[];
};

export type UniNumbersTwoColumnTable = {
  readonly headingKey?: UniNumbersI18nKey;
  readonly col1Key: UniNumbersI18nKey;
  readonly col2Key: UniNumbersI18nKey;
  readonly rows: readonly {
    readonly col1Key: UniNumbersI18nKey;
    readonly col2?: string;
    readonly col2Key?: UniNumbersI18nKey;
  }[];
};

export type UniNumbersRankTable = {
  readonly headingKey?: UniNumbersI18nKey;
  readonly rows: readonly { readonly rank: number; readonly regionKey: UniNumbersI18nKey }[];
};

export type UniNumbersProgress = {
  readonly current: string;
  readonly target: string;
  readonly captionKey: UniNumbersI18nKey;
};

export type UniNumbersContentBlock =
  | { readonly type: "paragraph"; readonly contentKey: UniNumbersI18nKey }
  | { readonly type: "subheading"; readonly contentKey: UniNumbersI18nKey }
  | { readonly type: "statBlock"; readonly block: UniNumbersStatBlock }
  | { readonly type: "progress"; readonly progress: UniNumbersProgress }
  | { readonly type: "bulletGroup"; readonly group: UniNumbersBulletGroup }
  | { readonly type: "table"; readonly table: UniNumbersTwoColumnTable }
  | { readonly type: "rankTable"; readonly table: UniNumbersRankTable }
  | { readonly type: "callout"; readonly contentKey: UniNumbersI18nKey }
  | {
      readonly type: "highlight";
      readonly labelKey: UniNumbersI18nKey;
      readonly captionKey: UniNumbersI18nKey;
    };

export type UniNumbersSection = {
  readonly titleKey: UniNumbersI18nKey;
  readonly blocks: readonly UniNumbersContentBlock[];
};

export const UNIVERSITY_IN_NUMBERS_REPORT = {
  institutionKey: "uniNumbersReportInstitution" as const,
  headlineKey: "uniNumbersReportHeadline" as const,
  taglineKey: "uniNumbersReportTagline" as const,
  introKey: "uniNumbersReportIntro" as const,
  sections: [
    {
      titleKey: "uniNumbersSection1Title",
      blocks: [
        { type: "paragraph", contentKey: "uniNumbersS1P1" },
        {
          type: "statBlock",
          block: {
            headingKey: "uniNumbersS1StatAcademicHeading",
            rows: [
              { labelKey: "uniNumbersS1StatFaculties", value: "3" },
              { labelKey: "uniNumbersS1StatDepartments", value: "16" },
              { labelKey: "uniNumbersS1StatBachelorSpecialities", value: "28" },
              { labelKey: "uniNumbersS1StatMasterSpecialities", value: "13" },
            ],
          },
        },
        { type: "paragraph", contentKey: "uniNumbersS1P2" },
        {
          type: "statBlock",
          block: {
            headingKey: "uniNumbersS1StatStudentHeading",
            rows: [
              { labelKey: "uniNumbersS1StatTotalStudents", value: "23,684" },
              { labelKey: "uniNumbersS1StatBachelorStudents", value: "23,217" },
              { labelKey: "uniNumbersS1StatMasterStudents", value: "467" },
              { labelKey: "uniNumbersS1StatMaleStudents", value: "7,475" },
              { labelKey: "uniNumbersS1StatFemaleStudents", value: "16,209" },
            ],
          },
        },
        { type: "paragraph", contentKey: "uniNumbersS1P3" },
        {
          type: "statBlock",
          block: {
            headingKey: "uniNumbersS1StatTeachingHeading",
            rows: [
              { labelKey: "uniNumbersS1StatTotalTeachingStaff", value: "281" },
              { labelKey: "uniNumbersS1StatDsc", value: "10" },
              { labelKey: "uniNumbersS1StatPhd", value: "111" },
              { labelKey: "uniNumbersS1StatAverageAge", value: "37 years" },
            ],
          },
        },
        {
          type: "progress",
          progress: {
            current: "42.6%",
            target: "75%",
            captionKey: "uniNumbersS1ProgressCaption",
          },
        },
      ],
    },
    {
      titleKey: "uniNumbersSection2Title",
      blocks: [
        { type: "paragraph", contentKey: "uniNumbersS2P1" },
        {
          type: "statBlock",
          block: {
            headingKey: "uniNumbersS2StatInfraHeading",
            rows: [
              { labelKey: "uniNumbersS2StatCampusArea", value: "1.3 hectares" },
              { labelKey: "uniNumbersS2StatEducationalArea", value: "32,687 m²" },
              { labelKey: "uniNumbersS2StatAdditionalArea", value: "14,963 m²" },
              { labelKey: "uniNumbersS2StatAuditoriums", value: "148" },
              { labelKey: "uniNumbersS2StatLaboratories", value: "9" },
              { labelKey: "uniNumbersS2StatComputerCabins", value: "10" },
              { labelKey: "uniNumbersS2StatAreaPerStudent", value: "4.2 m²" },
            ],
          },
        },
        { type: "subheading", contentKey: "uniNumbersS2SubheadingRoadmap" },
        { type: "paragraph", contentKey: "uniNumbersS2P2" },
        {
          type: "table",
          table: {
            col1Key: "uniNumbersS2TableColInitiative",
            col2Key: "uniNumbersS2TableColTargetYear",
            rows: [
              { col1Key: "uniNumbersS2TableRow1Col1", col2: "2028" },
              { col1Key: "uniNumbersS2TableRow2Col1", col2: "2026" },
              { col1Key: "uniNumbersS2TableRow3Col1", col2: "2027" },
              { col1Key: "uniNumbersS2TableRow4Col1", col2Key: "uniNumbersS2TableRow4Col2" },
            ],
          },
        },
      ],
    },
    {
      titleKey: "uniNumbersSection3Title",
      blocks: [
        { type: "paragraph", contentKey: "uniNumbersS3P1" },
        {
          type: "table",
          table: {
            headingKey: "uniNumbersS3TableHeading",
            col1Key: "uniNumbersS3TableColTarget",
            col2Key: "uniNumbersS3TableCol2030Goal",
            rows: [
              { col1Key: "uniNumbersS3TableRow1Col1", col2: "150" },
              { col1Key: "uniNumbersS3TableRow2Col1", col2: "75" },
              { col1Key: "uniNumbersS3TableRow3Col1", col2: "10" },
              { col1Key: "uniNumbersS3TableRow4Col1", col2: "1,000" },
            ],
          },
        },
      ],
    },
    {
      titleKey: "uniNumbersSection4Title",
      blocks: [
        { type: "paragraph", contentKey: "uniNumbersS4P1" },
        { type: "subheading", contentKey: "uniNumbersS4SubheadingSchools" },
        { type: "paragraph", contentKey: "uniNumbersS4P2" },
        { type: "subheading", contentKey: "uniNumbersS4SubheadingLabs" },
        { type: "paragraph", contentKey: "uniNumbersS4P3" },
        { type: "callout", contentKey: "uniNumbersS4Callout" },
      ],
    },
    {
      titleKey: "uniNumbersSection5Title",
      blocks: [
        { type: "paragraph", contentKey: "uniNumbersS5P1" },
        {
          type: "bulletGroup",
          group: {
            headingKey: "uniNumbersS5DigitalHeading",
            itemKeys: [
              "uniNumbersS5DigitalItem1",
              "uniNumbersS5DigitalItem2",
              "uniNumbersS5DigitalItem3",
            ],
          },
        },
        {
          type: "bulletGroup",
          group: {
            headingKey: "uniNumbersS5CreativeHeading",
            itemKeys: [
              "uniNumbersS5CreativeItem1",
              "uniNumbersS5CreativeItem2",
              "uniNumbersS5CreativeItem3",
              "uniNumbersS5CreativeItem4",
              "uniNumbersS5CreativeItem5",
              "uniNumbersS5CreativeItem6",
            ],
          },
        },
        { type: "subheading", contentKey: "uniNumbersS5SubheadingSports" },
        { type: "paragraph", contentKey: "uniNumbersS5P2" },
        {
          type: "highlight",
          labelKey: "uniNumbersS5HighlightLabel",
          captionKey: "uniNumbersS5HighlightCaption",
        },
        {
          type: "bulletGroup",
          group: {
            headingKey: "uniNumbersS5ClubsHeading",
            itemKeys: [
              "uniNumbersS5ClubsItem1",
              "uniNumbersS5ClubsItem2",
              "uniNumbersS5ClubsItem3",
              "uniNumbersS5ClubsItem4",
              "uniNumbersS5ClubsItem5",
            ],
          },
        },
      ],
    },
    {
      titleKey: "uniNumbersSection6Title",
      blocks: [
        { type: "paragraph", contentKey: "uniNumbersS6P1" },
        {
          type: "rankTable",
          table: {
            rows: [
              { rank: 1, regionKey: "uniNumbersS6Region1" },
              { rank: 2, regionKey: "uniNumbersS6Region2" },
              { rank: 3, regionKey: "uniNumbersS6Region3" },
              { rank: 4, regionKey: "uniNumbersS6Region4" },
            ],
          },
        },
      ],
    },
    {
      titleKey: "uniNumbersSection7Title",
      blocks: [{ type: "paragraph", contentKey: "uniNumbersS7P1" }],
    },
  ] satisfies readonly UniNumbersSection[],
} as const;
