const SPORTS_IMAGE = "/images/student-life/sport-facilities.png";

const BANNER_GRADIENT = [
  "linear-gradient(to right,",
  "rgb(0 0 0) 0%,",
  "rgb(0 0 0 / 0.96) 22%,",
  "rgb(0 0 0 / 0.82) 34%,",
  "rgb(0 0 0 / 0.48) 46%,",
  "rgb(0 0 0 / 0.12) 54%,",
  "transparent 62%)",
].join(" ");

function parseHighlightLabel(label: string): { value: string; title: string } {
  const match = label.match(/^(\d[\d,]*)\s+(.+)$/);
  if (match) {
    return { value: match[1], title: match[2] };
  }
  return { value: label, title: "" };
}

type ChampionsAmbitionBannerProps = {
  label: string;
  caption: string;
};

export function ChampionsAmbitionBanner({ label, caption }: ChampionsAmbitionBannerProps) {
  const { value, title } = parseHighlightLabel(label);

  return (
    <figure className="relative isolate min-h-[260px] overflow-hidden rounded-2xl md:min-h-[300px]">
      <img
        src={SPORTS_IMAGE}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-[center_35%]"
        loading="lazy"
        decoding="async"
      />

      <div className="absolute inset-0" style={{ background: BANNER_GRADIENT }} aria-hidden />

      <div className="relative flex min-h-[260px] items-end p-6 sm:p-7 md:min-h-[300px] md:p-8 lg:p-10">
        <div className="max-w-md text-white">
          <div className="flex items-end gap-x-3 gap-y-1">
            <div className="font-forum text-[4.75rem] font-bold leading-none tabular-nums sm:text-[5.25rem] md:text-[5.75rem] lg:text-[6.5rem]">
              {value}
            </div>
            {title ? (
              <div className="mb-1.5 font-forum text-[1.65rem] font-bold leading-[1.05] text-oxford-gold sm:text-[1.85rem] md:mb-2 md:text-[2rem] lg:text-[2.25rem]">
                {title}
              </div>
            ) : null}
          </div>

          <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-white/80 md:text-[15px]">
            {caption}
          </p>
        </div>
      </div>
    </figure>
  );
}
