/**
 * Article editor types: Medium-style block-based CMS.
 * See docs/ARTICLE_EDITOR_ARCHITECTURE.md for DB and API flow.
 */

export type ArticleBlockType =
  | "paragraph"
  | "heading1"
  | "heading2"
  | "heading3"
  | "quote"
  | "code_block"
  | "image"
  | "divider"
  | "bullet_list"
  | "ordered_list";

export interface ArticleSEO {
  title: string;
  slug: string;
  description: string;
}

export interface ArticleBlockContent {
  paragraph?: { text?: string };
  heading1?: { text?: string };
  heading2?: { text?: string };
  heading3?: { text?: string };
  quote?: { text?: string };
  code_block?: { language?: string; code?: string };
  image?: { src: string; alt?: string; media_id?: string };
  divider?: Record<string, never>;
  bullet_list?: { items?: string[] };
  ordered_list?: { items?: string[] };
}

export interface ArticleBlock {
  id?: string;
  article_id?: string;
  position: number;
  type: ArticleBlockType;
  content: ArticleBlockContent[keyof ArticleBlockContent] | Record<string, unknown>;
}

export interface Article {
  id?: string;
  title: string;
  slug: string;
  description: string;
  status: "draft" | "published";
  cover_image_id?: string | null;
  author_id?: string | null;
  created_at?: string;
  updated_at?: string;
  body?: TiptapDocJSON;
  blocks?: ArticleBlock[];
}

export interface TiptapDocJSON {
  type: "doc";
  content?: TiptapNodeJSON[];
}

export interface TiptapNodeJSON {
  type: string;
  attrs?: Record<string, unknown>;
  content?: TiptapNodeJSON[];
  text?: string;
}
