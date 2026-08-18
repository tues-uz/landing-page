import { Link } from "react-router-dom";
import { ArrowRight, Download } from "lucide-react";

const TITLE_COLOR = "rgb(30, 30, 30)";
const ICON_BG = "rgb(35, 47, 58)";

const iconButtonClass =
  "flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

type ProgramListingLinkRowProps = {
  title: string;
  detailHref: string;
  pdfHref: string;
  downloadLabel: string;
  detailLabel: string;
};

export function ProgramListingLinkRow({
  title,
  detailHref,
  pdfHref,
  downloadLabel,
  detailLabel,
}: ProgramListingLinkRowProps) {
  return (
    <div className="group flex w-full items-center justify-between rounded-none border-b border-border px-4 py-4 transition-colors hover:border-primary hover:bg-neutral-50/50">
      <Link to={detailHref} className="min-w-0 flex-1 pr-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm">
        <h3 className="text-lg font-semibold text-foreground md:text-xl" style={{ color: TITLE_COLOR }}>
          {title}
        </h3>
      </Link>
      <div className="flex shrink-0 items-center gap-2">
        <a
          href={pdfHref}
          download
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          aria-label={downloadLabel}
          title={downloadLabel}
        >
          <Download className="h-5 w-5" aria-hidden />
        </a>
        <Link
          to={detailHref}
          className={iconButtonClass}
          style={{ backgroundColor: ICON_BG }}
          aria-label={detailLabel}
          title={detailLabel}
        >
          <ArrowRight className="h-5 w-5 text-white" aria-hidden />
        </Link>
      </div>
    </div>
  );
}
