/** Campus / life photos for bachelor programme cards (rotate by programme number). */
const CARD_IMAGES = [
  "/tuesw-gallery/480/8.webp",
  "/tuesw-gallery/480/11.webp",
  "/tuesw-gallery/480/16.webp",
  "/tuesw-gallery/480/21.webp",
  "/tuesw-gallery/480/24.webp",
  "/tuesw-gallery/480/28.webp",
  "/tuesw-gallery/480/32.webp",
  "/tuesw-gallery/480/35.webp",
  "/tuesw-gallery/480/42.webp",
  "/tuesw-gallery/480/48.webp",
  "/tuesw-gallery/480/52.webp",
  "/tuesw-gallery/480/6.webp",
] as const;

export function bachelorFullTimeCardImageSrc(programNo: number): string {
  const n = Math.max(0, programNo - 1) % CARD_IMAGES.length;
  return CARD_IMAGES[n]!;
}
