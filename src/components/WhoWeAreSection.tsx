import type { TFunction } from "i18next";
import { useTranslation } from "react-i18next";
import { YouTubePosterPlay } from "@/components/YouTubePosterPlay";
import { WHO_WE_ARE_MISSION_I18N_DEFAULTS } from "@/locales/whoWeAreMissionDefaults";
import { cn } from "@/lib/utils";

const WHO_WE_ARE_YOUTUBE_VIDEO_ID = "BZk8os75D24";

function trMission(t: TFunction, key: keyof typeof WHO_WE_ARE_MISSION_I18N_DEFAULTS) {
  return t(key, { defaultValue: WHO_WE_ARE_MISSION_I18N_DEFAULTS[key] });
}

function renderBodyBlock(block: string, i: number) {
  const trimmed = block.trim();
  if (trimmed.startsWith("## ")) {
    return (
      <h2 key={i} className="text-balance text-xl font-semibold tracking-tight text-foreground">
        {trimmed.slice(3).trim()}
      </h2>
    );
  }
  const lines = trimmed.split("\n").map((line) => line.trim()).filter(Boolean);
  if (lines.length > 0 && lines.every((line) => line.startsWith("- "))) {
    return (
      <ul key={i} className="list-disc space-y-2 pl-5">
        {lines.map((line, j) => (
          <li key={j}>{line.slice(2).trim()}</li>
        ))}
      </ul>
    );
  }
  return (
    <p key={i} className={cn("whitespace-pre-line text-justify")}>
      {trimmed}
    </p>
  );
}

export function WhoWeAreSection() {
  const { t } = useTranslation("topNav");

  const introBlocks = trMission(t, "whoWeAreMissionIntro")
    .split(/\n\n+/)
    .map((block) => block.trim())
    .filter(Boolean);

  const playLabel = t("aboutUniversityVideoPlayLabel", { defaultValue: "Play video on this page" });

  return (
    <div className="mt-4 max-w-none">
      <div className="flex flex-col gap-5 text-body-article text-muted-foreground">
        {introBlocks.map((block, i) => renderBodyBlock(block, i))}
      </div>

      <div className="mt-10">
        <YouTubePosterPlay
          videoId={WHO_WE_ARE_YOUTUBE_VIDEO_ID}
          playLabel={playLabel}
        />
      </div>
    </div>
  );
}
