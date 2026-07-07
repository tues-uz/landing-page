import { REGULATION_DOCUMENTS_CHARTER_BODY } from "./regulationDocumentsCharterBody";

export const REGULATION_DOCUMENTS_I18N_DEFAULTS = {
  regulationDocsIntro: REGULATION_DOCUMENTS_CHARTER_BODY,
  regulationDocsDownloadTitle: "Download regulation",
  regulationDocsDownloadLead:
    "Each link opens the file in a new tab. Use your browser’s save option if you want to keep a copy on your device.",
  regulationDocsDocxBadge: "Microsoft Word (.docx)",
  regulationDocsDownloadCta: "Download",
} as const;
