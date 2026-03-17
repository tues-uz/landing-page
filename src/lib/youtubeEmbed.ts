/**
 * Minimal YouTube URL validation and embed URL for the article editor.
 * Replaces @tiptap/extension-youtube to avoid broken package dist.
 */

const YOUTUBE_REGEX =
  /^((?:https?:)?\/\/)?((?:www|m|music)\.)?((?:youtube\.com|youtu\.be|youtube-nocookie\.com))(\/(?:[\w-]+\?v=|embed\/|v\/)?)([\w-]+)(\S+)?$/;

export function isValidYoutubeUrl(url: string): boolean {
  return !!url.match(YOUTUBE_REGEX);
}

/** Convert a watch/share URL to an embed iframe src. */
export function getYoutubeEmbedSrc(url: string): string | null {
  if (!isValidYoutubeUrl(url)) return null;
  if (url.includes("/embed/")) return url;
  if (url.includes("youtu.be")) {
    const id = url.split("/").pop()?.split("?")[0];
    return id ? `https://www.youtube.com/embed/${id}` : null;
  }
  const m = url.match(/(?:v=|\/v\/|shorts\/)([-\w]+)/);
  const id = m?.[1];
  return id ? `https://www.youtube.com/embed/${id}` : null;
}
