/** English fallbacks — Admission 2025 → Study program application form (`topNav`). */

export const STUDY_PROGRAM_APPLY_PAGE_DEFAULTS = {
  studyProgramApplyPageTitle: "Application form",
  studyProgramApplyPageIntro:
    "Fill in the form below to apply for admission to Termez University of Economics and Service.",
  studyProgramApplyFullName: "Full Name",
  studyProgramApplyCitizenship: "Citizenship",
  studyProgramApplyCitizenshipPlaceholder: "Choose the citizenship",
  studyProgramApplyPhone: "Phone Number",
  studyProgramApplyPassport: "Passport",
  studyProgramApplyJshshir: "JSHSHIR",
  studyProgramApplyStudyType: "The form of education",
  studyProgramApplyStudyTypePlaceholder: "Choose the study type",
  studyProgramApplyCourse: "Course of Study",
  studyProgramApplyCoursePlaceholder: "Choose the course of study",
  studyProgramApplyCourseLoading: "Loading programs…",
  studyProgramApplyCourseEmpty: "No programs available.",
  studyProgramApplyVerifyCode: "Verify Code",
  studyProgramApplySend: "Send",
  studyProgramApplySuccessTitle: "Application sent",
  studyProgramApplySuccessDescription:
    "Your application has been received. The admissions office will contact you shortly.",
  studyProgramApplyCaptchaError: "The verification code does not match.",
  studyProgramApplyRequired: "This field is required.",
  studyProgramApplyRefreshCaptcha: "Refresh verification code",
  studyProgramApplyCitizenshipOptionUz: "Uzbekistan",
  studyProgramApplyCitizenshipOptionKz: "Kazakhstan",
  studyProgramApplyCitizenshipOptionTj: "Tajikistan",
  studyProgramApplyCitizenshipOptionKg: "Kyrgyzstan",
  studyProgramApplyCitizenshipOptionAf: "Afghanistan",
  studyProgramApplyCitizenshipOptionRu: "Russia",
  studyProgramApplyCitizenshipOptionOther: "Other",
  studyProgramApplyStudyTypeFullTime: "Full-time",
  studyProgramApplyStudyTypeCorrespondence: "Correspondence",
} as const;

export const STUDY_PROGRAM_APPLY_CITIZENSHIP_OPTIONS = [
  { value: "uz", labelKey: "studyProgramApplyCitizenshipOptionUz" },
  { value: "kz", labelKey: "studyProgramApplyCitizenshipOptionKz" },
  { value: "tj", labelKey: "studyProgramApplyCitizenshipOptionTj" },
  { value: "kg", labelKey: "studyProgramApplyCitizenshipOptionKg" },
  { value: "af", labelKey: "studyProgramApplyCitizenshipOptionAf" },
  { value: "ru", labelKey: "studyProgramApplyCitizenshipOptionRu" },
  { value: "other", labelKey: "studyProgramApplyCitizenshipOptionOther" },
] as const;

export const STUDY_PROGRAM_APPLY_STUDY_TYPES = [
  { value: "full-time", labelKey: "studyProgramApplyStudyTypeFullTime" },
  { value: "correspondence", labelKey: "studyProgramApplyStudyTypeCorrespondence" },
] as const;
