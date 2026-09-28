import { BACHELOR_FULL_TIME_PROGRAMS } from "@/data/bachelorFullTimePrograms";
import { bachelorProgramDetailPath } from "@/data/bachelorProgramPaths";
import type { QualificationRequirementArea } from "@/data/qualificationRequirementAreas";
import { MASTERS_DEGREE_PROGRAMS } from "@/data/mastersDegreePrograms";
import {
  flattenStudyPrograms,
  STUDY_PROGRAMS_CURRICULUM,
  studyProgramDetailPath,
} from "@/data/studyProgramsCurriculum";
import { bachelorProgramPdfHref, mastersProgramPdfHref } from "@/lib/educationProgramPdf";

/** Source list ciphers that differ from catalogue / PDF filenames. */
const QUALIFICATION_CIPHER_ALIASES: Readonly<Record<string, string>> = {
  "60411900": "60411100",
};

export type QualificationAreaListingLinks = {
  detailHref: string;
  pdfHref: string;
};

function resolveCatalogueCipher(cipher: string): string {
  return QUALIFICATION_CIPHER_ALIASES[cipher] ?? cipher;
}

function findBachelorFullTimeByCipher(cipher: string) {
  const catalogueCipher = resolveCatalogueCipher(cipher);
  return BACHELOR_FULL_TIME_PROGRAMS.find((p) => p.cipher === catalogueCipher);
}

function findStudyProgramIdByCode(cipher: string): string | undefined {
  const catalogueCipher = resolveCatalogueCipher(cipher);
  const matches = flattenStudyPrograms(STUDY_PROGRAMS_CURRICULUM).filter(
    ({ program }) => program.code === catalogueCipher,
  );
  return matches[0]?.program.id;
}

function findMasterByCipher(cipher: string) {
  return MASTERS_DEGREE_PROGRAMS.find((p) => p.specialtyCode === cipher);
}

/** Detail page + PDF for a qualification-requirements row (mirrors bachelor / master listings). */
export function getQualificationAreaListingLinks(
  area: QualificationRequirementArea,
): QualificationAreaListingLinks | null {
  if (area.cipher) {
    const master = findMasterByCipher(area.cipher);
    if (master) {
      return {
        detailHref: `/education/masters/programs/${master.index}`,
        pdfHref: mastersProgramPdfHref(area.cipher),
      };
    }

    const bachelor = findBachelorFullTimeByCipher(area.cipher);
    if (bachelor) {
      const pdfCipher = resolveCatalogueCipher(area.cipher);
      return {
        detailHref: bachelorProgramDetailPath("full-time", bachelor.no),
        pdfHref: bachelorProgramPdfHref("full-time", pdfCipher),
      };
    }

    const studyProgramId = findStudyProgramIdByCode(area.cipher);
    if (studyProgramId) {
      const pdfCipher = resolveCatalogueCipher(area.cipher);
      return {
        detailHref: studyProgramDetailPath(studyProgramId),
        pdfHref: bachelorProgramPdfHref("full-time", pdfCipher),
      };
    }

    return null;
  }

  const primaryEducationMaster = MASTERS_DEGREE_PROGRAMS.find((p) => p.specialtyCode === "70110401");
  if (primaryEducationMaster && /primary education/i.test(area.title)) {
    return {
      detailHref: `/education/masters/programs/${primaryEducationMaster.index}`,
      pdfHref: mastersProgramPdfHref(primaryEducationMaster.specialtyCode),
    };
  }

  return null;
}
