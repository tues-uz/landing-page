import { useTranslation } from "react-i18next";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PHOTO_GALLERY_ITEMS } from "@/config/photoGalleryData";

export function PhotoGalleryCards() {
  const { t } = useTranslation("topNav");

  return (
    <div className="mt-8 grid gap-4 sm:grid-cols-2">
      {PHOTO_GALLERY_ITEMS.map((item) => {
        const titleKey = `photoGallery.${item.id}.title`;
        const descKey = `photoGallery.${item.id}.description`;
        const title = t(titleKey);
        return (
          <Card key={item.id} className="overflow-hidden p-0 shadow-sm">
            <div className="aspect-[4/3] bg-muted">
              <img
                src={item.src}
                alt={title}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>
            <CardHeader className="px-4 pb-4 pt-4 sm:px-5">
              <CardTitle className="text-lg font-semibold leading-snug">{title}</CardTitle>
              <CardDescription className="text-sm leading-relaxed">{t(descKey)}</CardDescription>
            </CardHeader>
          </Card>
        );
      })}
    </div>
  );
}
