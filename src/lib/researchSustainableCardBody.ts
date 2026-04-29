/** i18n value is a JSON array of strings for `returnObjects`. */
export function getCardBodyParagraphs(
  t: (key: string, options?: { returnObjects?: boolean }) => unknown,
  bodyKey: string,
): string[] {
  const raw = t(bodyKey, { returnObjects: true });
  if (!Array.isArray(raw)) return [];
  return raw.filter((x): x is string => typeof x === "string");
}
