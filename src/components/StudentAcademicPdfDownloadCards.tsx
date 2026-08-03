import { useTranslation } from "react-i18next";
import { DownloadCard } from "@/components/DownloadCard";

export type PdfDownloadCard = {
  title: string;
  description: string;
  fileHref: string;
  imageSrc: string;
  cta?: string;
};

export function StudentAcademicPdfDownloadCards({ cards }: { cards: readonly PdfDownloadCard[] }) {
  const { t } = useTranslation("topNav");

  return (
    <ul className="mt-10 grid grid-cols-1 gap-[16px] md:grid-cols-2" role="list">
      {cards.map((card) => (
        <li key={card.fileHref} className="flex min-h-0">
          <DownloadCard
            title={card.title}
            description={card.description}
            cta={card.cta ?? t("officialDocumentsDownloadCta", { defaultValue: "Download" })}
            href={card.fileHref}
            imageSrc={card.imageSrc}
            imageAlt={card.title}
            previewBadge={t("officialDocumentsPdfBadge", { defaultValue: "PDF" })}
          />
        </li>
      ))}
    </ul>
  );
}
