import { DownloadCard } from "@/components/DownloadCard";

export type PdfDownloadCard = {
  title: string;
  description: string;
  fileHref: string;
  imageSrc: string;
  cta?: string;
};

export function StudentAcademicPdfDownloadCards({ cards }: { cards: readonly PdfDownloadCard[] }) {
  return (
    <ul className="mt-10 grid grid-cols-1 gap-[16px] md:grid-cols-2" role="list">
      {cards.map((card) => (
        <li key={card.fileHref} className="flex min-h-0">
          <DownloadCard
            title={card.title}
            description={card.description}
            cta={card.cta ?? "Download"}
            href={card.fileHref}
            imageSrc={card.imageSrc}
            imageAlt={card.title}
            previewBadge="PDF"
          />
        </li>
      ))}
    </ul>
  );
}
