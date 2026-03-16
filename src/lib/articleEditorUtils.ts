/**
 * Article editor utilities: Tiptap JSON ↔ blocks, word count, reading time.
 * Used by ArticleEditor and API save flow.
 */

import type { TiptapDocJSON, TiptapNodeJSON } from "@/types/article";

const WORDS_PER_MINUTE = 200;

/** Recursively extract plain text from Tiptap JSON for word count. */
function getTextFromNode(node: TiptapNodeJSON): string {
  if (node.type === "text" && node.text != null) return node.text;
  if (node.content) return node.content.map(getTextFromNode).join("");
  return "";
}

/** Word count from Tiptap doc JSON. */
export function getWordCount(doc: TiptapDocJSON | null): number {
  if (!doc?.content?.length) return 0;
  const text = doc.content.map(getTextFromNode).join(" ");
  return text.trim() ? text.trim().split(/\s+/).length : 0;
}

/** Reading time in minutes (rounded up). */
export function getReadingTimeMinutes(doc: TiptapDocJSON | null): number {
  const words = getWordCount(doc);
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

/** Human-readable reading time (e.g. "3 min read"). */
export function getReadingTimeLabel(doc: TiptapDocJSON | null): string {
  const min = getReadingTimeMinutes(doc);
  return min === 1 ? "1 min read" : `${min} min read`;
}

/** Empty Tiptap doc for new articles. */
export function emptyArticleDoc(): TiptapDocJSON {
  return { type: "doc", content: [{ type: "paragraph", content: [] }] };
}

/** Medium-style empty doc: Title (h3) + body paragraph. */
export function mediumStyleEmptyDoc(): TiptapDocJSON {
  return {
    type: "doc",
    content: [
      { type: "heading", attrs: { level: 3 }, content: [] },
      { type: "paragraph", content: [] },
    ],
  };
}

/** Check if doc is effectively empty (no meaningful content). */
export function isDocEmpty(doc: TiptapDocJSON | null): boolean {
  return getWordCount(doc) === 0;
}
