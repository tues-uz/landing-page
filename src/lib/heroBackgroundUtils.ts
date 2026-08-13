import type { HeroBackground } from "@/api/client";

export function getHeroImageUrls(
  bg: Pick<HeroBackground, "imageUrl" | "imageUrls"> | null | undefined,
): string[] {
  const fromArray = (bg?.imageUrls ?? []).filter(
    (u): u is string => typeof u === "string" && u.trim().length > 0,
  );
  if (fromArray.length > 0) return fromArray;
  const single = bg?.imageUrl?.trim();
  return single ? [single] : [];
}

export type HeroBackgroundRaw = {
  mediaType?: string;
  videoUrl?: string | null;
  imageUrl?: string | null;
  imageUrls?: string[] | null;
  image_urls?: string[] | null;
  id?: string;
};

export function normalizeHeroBackground(raw: HeroBackgroundRaw): HeroBackground {
  const mediaType = raw.mediaType?.toLowerCase() === "image" ? "image" : "video";
  const fromArray = [...(raw.imageUrls ?? []), ...(raw.image_urls ?? [])].filter(
    (u): u is string => typeof u === "string" && u.trim().length > 0,
  );
  const unique = [...new Set(fromArray)];
  const imageUrls =
    unique.length > 0 ? unique : raw.imageUrl?.trim() ? [raw.imageUrl.trim()] : [];
  return {
    id: raw.id,
    mediaType,
    videoUrl: raw.videoUrl ?? null,
    imageUrl: imageUrls[0] ?? null,
    imageUrls: imageUrls.length > 0 ? imageUrls : null,
  };
}

/** Keep imageUrl (first slide) in sync for APIs that only persist a single URL. */
export function serializeHeroBackgroundForApi(bg: HeroBackground): HeroBackground {
  const imageUrls = getHeroImageUrls(bg);
  return {
    ...bg,
    imageUrls: imageUrls.length > 0 ? imageUrls : null,
    imageUrl: imageUrls[0] ?? null,
  };
}
