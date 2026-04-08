import { useTranslation } from "react-i18next";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { VIDEO_GALLERY_ITEMS } from "@/config/videoGalleryData";

export function VideoGalleryCards() {
  const { t } = useTranslation("topNav");

  return (
    <div className="mt-8 grid gap-4 sm:grid-cols-2">
      {VIDEO_GALLERY_ITEMS.map((item) => {
        const titleKey = `videoGallery.${item.id}.title`;
        const descKey = `videoGallery.${item.id}.description`;
        return (
          <Card key={item.id} className="overflow-hidden p-0 shadow-sm">
            <div className="aspect-video bg-muted">
              <video
                className="h-full w-full object-cover"
                controls
                playsInline
                preload="metadata"
                aria-label={t(titleKey)}
              >
                <source src={item.src} type="video/mp4" />
              </video>
            </div>
            <CardHeader className="px-4 pb-4 pt-4 sm:px-5">
              <CardTitle className="text-lg font-semibold leading-snug">{t(titleKey)}</CardTitle>
              <CardDescription className="text-sm leading-relaxed">{t(descKey)}</CardDescription>
            </CardHeader>
          </Card>
        );
      })}
    </div>
  );
}
