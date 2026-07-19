export type KuulaVirtualTour = {
  readonly id: "medicine" | "campus";
  readonly embedUrl: string;
};

export const KUULA_VIRTUAL_TOURS: readonly KuulaVirtualTour[] = [
  {
    id: "medicine",
    embedUrl:
      "https://kuula.co/share/collection/7T9J4?logo=0&info=0&logosize=61&fs=1&vr=1&sd=1&initload=0&thumbs=1",
  },
  {
    id: "campus",
    embedUrl:
      "https://kuula.co/share/collection/7TYGV?logo=0&info=0&logosize=61&fs=1&vr=1&sd=1&initload=0&thumbs=1",
  },
] as const;

export const DEFAULT_KUULA_TOUR_ID = KUULA_VIRTUAL_TOURS[0].id;
