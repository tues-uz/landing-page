/** Science → Certificates: ranked achievements and sustainability-related recognitions. */
export type ScienceCertificateCard = { id: string; titleKey: string; bodyKey: string };

export const SCIENCE_CERTIFICATE_CARDS: ScienceCertificateCard[] = [
  {
    id: "ui-greenmetric-2025",
    titleKey: "certificatesGreenMetric2025Title",
    bodyKey: "certificatesGreenMetric2025Body",
  },
];

export function getScienceCertificateById(
  id: string | undefined,
): ScienceCertificateCard | undefined {
  if (!id) return undefined;
  return SCIENCE_CERTIFICATE_CARDS.find((c) => c.id === id);
}
