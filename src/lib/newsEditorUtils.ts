import type { NewsSection } from "@/api/client";

/** Tiptap/ProseMirror JSON node (simplified). */
interface PMNode {
  type: string;
  content?: PMNode[];
  text?: string;
  attrs?: { level?: number; href?: string; src?: string; images?: string[] };
  marks?: { type: string; attrs?: { href?: string } }[];
}

/** Get plain text from a ProseMirror node. */
function getText(node: PMNode): string {
  if (node.type === "text" && node.text != null) return node.text;
  if (node.content) return node.content.map(getText).join("");
  return "";
}

const LINK_PLACEHOLDER_PREFIX = "[Link: ";
const LINK_PLACEHOLDER_END = "]";

const GALLERY_PLACEHOLDER_PREFIX = "[Gallery: ";
const GALLERY_PLACEHOLDER_END = "]";

export function isNewsGalleryParagraph(para: string): boolean {
  return para.startsWith(GALLERY_PLACEHOLDER_PREFIX) && para.endsWith(GALLERY_PLACEHOLDER_END);
}

export function getNewsGalleryUrls(para: string): string[] {
  if (!isNewsGalleryParagraph(para)) return [];
  const inner = para.slice(GALLERY_PLACEHOLDER_PREFIX.length, -GALLERY_PLACEHOLDER_END.length).trim();
  if (!inner) return [];
  return inner.split("|").map((url) => url.trim()).filter(Boolean);
}

export function serializeNewsGalleryUrls(urls: string[]): string {
  const cleaned = urls.map((url) => url.trim()).filter(Boolean);
  if (cleaned.length === 0) return "";
  return `${GALLERY_PLACEHOLDER_PREFIX}${cleaned.join("|")}${GALLERY_PLACEHOLDER_END}`;
}

/** If paragraph is a single link (one text node with link mark), return "[Link: href]" for round-trip. */
function getParagraphLinkSerialized(paragraph: PMNode): string | null {
  const content = paragraph.content;
  if (!content || content.length !== 1) return null;
  const first = content[0];
  if (first.type !== "text" || first.text == null) return null;
  const linkMark = first.marks?.find((m) => m.type === "link");
  const href = linkMark?.attrs?.href;
  if (!href) return null;
  return LINK_PLACEHOLDER_PREFIX + href + LINK_PLACEHOLDER_END;
}

function isLinkPlaceholder(p: string): boolean {
  return p.startsWith(LINK_PLACEHOLDER_PREFIX) && p.endsWith(LINK_PLACEHOLDER_END);
}

function linkPlaceholderToHref(p: string): string {
  return p.slice(LINK_PLACEHOLDER_PREFIX.length, -LINK_PLACEHOLDER_END.length).trim();
}

/** Flatten list (bulletList/orderedList) to paragraph texts. */
function listToParagraphs(node: PMNode): string[] {
  const out: string[] = [];
  if (!node.content) return out;
  for (const child of node.content) {
    if (child.type === "listItem" && child.content) {
      for (const p of child.content) {
        const t = getText(p).trim();
        if (t) out.push(t);
      }
    }
  }
  return out;
}

/** Convert Tiptap doc JSON to NewsSection[]. Handles heading, paragraph, lists, blockquote, codeBlock, image, horizontalRule. */
export function tiptapJsonToSections(doc: { content?: PMNode[] } | null): NewsSection[] {
  if (!doc?.content?.length) return [];
  const sections: NewsSection[] = [];
  let current: NewsSection = { heading: "", paragraphs: [] };

  for (const node of doc.content) {
    if (node.type === "heading") {
      if (current.paragraphs.length > 0 || current.heading !== "") {
        sections.push({ ...current });
      }
      current = { heading: getText(node), paragraphs: [] };
    } else if (node.type === "paragraph") {
      const linkSerialized = getParagraphLinkSerialized(node);
      if (linkSerialized != null) {
        current.paragraphs.push(linkSerialized);
      } else {
        const text = getText(node).trim();
        current.paragraphs.push(text || "");
      }
    } else if (node.type === "bulletList" || node.type === "orderedList") {
      const items = listToParagraphs(node);
      current.paragraphs.push(...items);
    } else if (node.type === "blockquote") {
      const text = getText(node).trim();
      if (text) current.paragraphs.push(text);
    } else if (node.type === "codeBlock") {
      const text = getText(node).trim();
      if (text) current.paragraphs.push(text);
    } else if (node.type === "image") {
      const src = (node.attrs as { src?: string })?.src?.trim();
      current.paragraphs.push(src ? `[Image: ${src}]` : "[Image]");
    } else if (node.type === "imageCarousel") {
      const images = (node.attrs as { images?: string[] })?.images ?? [];
      const serialized = serializeNewsGalleryUrls(images);
      if (serialized) current.paragraphs.push(serialized);
    }
    // horizontalRule: skip (no text to store)
  }
  if (current.paragraphs.length > 0 || current.heading !== "") {
    sections.push(current);
  }
  return sections;
}

/** Paragraph text that represents an image from tiptapJsonToSections. */
const IMAGE_PLACEHOLDER_PREFIX = "[Image: ";
const IMAGE_PLACEHOLDER_END = "]";

function isImagePlaceholder(p: string): boolean {
  return p === "[Image]" || (p.startsWith(IMAGE_PLACEHOLDER_PREFIX) && p.endsWith(IMAGE_PLACEHOLDER_END));
}

function imagePlaceholderToSrc(p: string): string {
  if (p === "[Image]") return "";
  return p.slice(IMAGE_PLACEHOLDER_PREFIX.length, -IMAGE_PLACEHOLDER_END.length).trim();
}

/** Convert NewsSection[] to Tiptap doc content (array of block nodes). Preserves [Image: src] as image nodes. */
export function sectionsToTiptapContent(sections: NewsSection[]): PMNode[] {
  const blocks: PMNode[] = [];
  for (const section of sections) {
    if (section.heading) {
      blocks.push({
        type: "heading",
        attrs: { level: 2 },
        content: section.heading ? [{ type: "text", text: section.heading }] : [],
      });
    }
    for (const p of section.paragraphs || []) {
      if (isNewsGalleryParagraph(p)) {
        const images = getNewsGalleryUrls(p);
        if (images.length > 0) {
          blocks.push({
            type: "imageCarousel",
            attrs: { images },
          });
        }
      } else if (isImagePlaceholder(p)) {
        const src = imagePlaceholderToSrc(p);
        if (src) {
          blocks.push({
            type: "image",
            attrs: { src },
          });
        }
      } else if (isLinkPlaceholder(p)) {
        const href = linkPlaceholderToHref(p);
        if (href) {
          blocks.push({
            type: "paragraph",
            content: [{ type: "text", text: href, marks: [{ type: "link", attrs: { href } }] }],
          });
        }
      } else {
        blocks.push({
          type: "paragraph",
          content: p ? [{ type: "text", text: p }] : [],
        });
      }
    }
  }
  if (blocks.length === 0) {
    blocks.push({ type: "paragraph", content: [] });
  }
  return blocks;
}

/** Default empty Tiptap doc. */
export function emptyTiptapDoc(): { type: "doc"; content: PMNode[] } {
  return { type: "doc", content: [{ type: "paragraph", content: [] }] };
}

/** Convert NewsSection[] to full Tiptap doc (for ArticleEditor value). */
export function sectionsToTiptapDoc(sections: NewsSection[]): { type: "doc"; content: PMNode[] } {
  return { type: "doc", content: sectionsToTiptapContent(sections) };
}
