/** Notable alumni listed on the Famous graduates page (names as provided). */

export type FamousGraduate = { id: string; fullName: string; portraitSrc: string };

/** Portrait paths — replace under `public/images/famous-graduates/` when official photos are available. */
export const FAMOUS_GRADUATES: readonly FamousGraduate[] = [
  {
    id: "begaliyev-azam-olimnazarovich",
    fullName: "BEGALIYEV A\u2019ZAM OLIMNAZAROVICH",
    portraitSrc: "/images/famous-graduates/begaliyev-azam-olimnazarovich.png",
  },
  {
    id: "panjieva-nigora-normakhmatovna",
    fullName: "Panjieva Nigora Normakhmatovna",
    portraitSrc: "/images/famous-graduates/panjieva-nigora-normakhmatovna.png",
  },
  {
    id: "alimov-jalol-qudratovich",
    fullName: "Alimov Jalol Qudratovich",
    portraitSrc: "/images/famous-graduates/alimov-jalol-qudratovich.png",
  },
  {
    id: "abdirakhmanov-khayitali-normukhammadovich",
    fullName: "ABDIRAKHMANOV KHAYITALI NORMUKHAMMADOVICH",
    portraitSrc: "/images/famous-graduates/abdirakhmanov-khayitali-normukhammadovich.png",
  },
  {
    id: "ashurov-karomat-musulmonqulovich",
    fullName: "ASHUROV KAROMAT MUSULMONQULOVICH",
    portraitSrc: "/images/famous-graduates/ashurov-karomat-musulmonqulovich.png",
  },
  {
    id: "togayev-rakhmatillo-ravzatovich",
    fullName: "TOGAYEV RAKHMATILLO RAVZATOVICH",
    portraitSrc: "/images/famous-graduates/togayev-rakhmatillo-ravzatovich.png",
  },
  {
    id: "sadatov-oltiboy-nazarovich",
    fullName: "SADATOV OLTIBOY NAZAROVICH",
    portraitSrc: "/images/famous-graduates/sadatov-oltiboy-nazarovich.png",
  },
  {
    id: "ibragimov-rustam-alijanovich",
    fullName: "IBRAGIMOV RUSTAM ALIJANOVICH",
    portraitSrc: "/images/famous-graduates/ibragimov-rustam-alijanovich.png",
  },
] as const;

export function getFamousGraduateById(id: string | undefined) {
  if (!id) return undefined;
  return FAMOUS_GRADUATES.find((g) => g.id === id);
}
