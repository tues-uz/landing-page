import type { NewsSection } from "@/api/client";

/** Tiptap/ProseMirror JSON node (simplified). */
interface PMNode {
  type: string;
  content?: PMNode[];
  text?: string;
  attrs?: { level?: number };
}

/** Get plain text from a ProseMirror node. */
function getText(node: PMNode): string {
  if (node.type === "text" && node.text != null) return node.text;
  if (node.content) return node.content.map(getText).join("");
  return "";
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
      const text = getText(node).trim();
      if (text) current.paragraphs.push(text);
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
      const alt = (node.attrs as { alt?: string })?.alt;
      const src = (node.attrs as { src?: string })?.src;
      current.paragraphs.push(alt || src ? `[Image: ${alt || src}]` : "[Image]");
    }
    // horizontalRule: skip (no text to store)
  }
  if (current.paragraphs.length > 0 || current.heading !== "") {
    sections.push(current);
  }
  return sections;
}

/** Convert NewsSection[] to Tiptap doc content (array of block nodes). */
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
      blocks.push({
        type: "paragraph",
        content: p ? [{ type: "text", text: p }] : [],
      });
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
