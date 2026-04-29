import { Download } from "lucide-react";
import { cn } from "@/lib/utils";

export type PdfDownloadCard = {
  title: string;
  description: string;
  fileHref: string;
  imageSrc: string;
};

const cardClass = cn(
  "group flex w-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm",
  "transition-colors hover:border-primary/25 hover:shadow-md",
  "cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
);

export function StudentAcademicPdfDownloadCards({ cards }: { cards: readonly PdfDownloadCard[] }) {
  return (
    <ul className="mt-10 grid grid-cols-1 gap-[16px] md:grid-cols-2" role="list">
      {cards.map((card) => (
        <li key={card.fileHref} className="flex min-h-0">
          <a
            href={card.fileHref}
            download
            className={cardClass}
            aria-label={`${card.title} — download PDF`}
          >
            <div className="relative aspect-[3/2] w-full shrink-0 overflow-hidden bg-muted">
              <img
                src={card.imageSrc}
                alt=""
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                loading="lazy"
                decoding="async"
              />
              <span className="absolute right-2 top-2 rounded-md bg-primary px-2 py-0.5 text-xs font-semibold text-primary-foreground shadow-sm">
                PDF
              </span>
            </div>
            <div className="flex min-h-0 flex-1 flex-col p-5">
              <h2 className="text-lg font-semibold leading-snug tracking-tight text-foreground md:text-xl">
                {card.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">{card.description}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary">
                <Download className="h-4 w-4 shrink-0" aria-hidden />
                Download
              </span>
            </div>
          </a>
        </li>
      ))}
    </ul>
  );
}
