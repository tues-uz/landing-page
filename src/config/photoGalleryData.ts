/** Original full-size WebPs live in `public/tuesw/`. Gallery uses optimized copies from `public/tuesw-gallery/` (run `npm run optimize:tuesw-gallery` after adding sources). */
const TUESW_IMAGE_NUMBERS = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 21, 22, 23, 24, 25, 26, 27, 28,
  29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52,
  53, 54, 55, 56, 57, 58,
] as const;

/** Matches `PhotoGalleryCards` grid: 1 / 2 / 3 columns at Tailwind `sm` / `lg`. */
export const PHOTO_GALLERY_SIZES_ATTR = "(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw";

export type PhotoGalleryItem = {
  id: string;
  /** Largest srcset candidate (800px wide). */
  src: string;
  srcSet: string;
  /** Full-resolution source for the lightbox viewer. */
  lightboxSrc: string;
};

export const PHOTO_GALLERY_ITEMS: readonly PhotoGalleryItem[] = TUESW_IMAGE_NUMBERS.map((n) => {
  const base = `/tuesw-gallery`;
  return {
    id: `tuesw-${n}`,
    src: `${base}/800/${n}.webp`,
    srcSet: `${base}/480/${n}.webp 480w, ${base}/800/${n}.webp 800w`,
    lightboxSrc: `/tuesw/${n}.webp`,
  };
});
