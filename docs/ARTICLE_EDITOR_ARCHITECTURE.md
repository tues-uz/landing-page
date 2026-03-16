# Medium-Style Article Editor – Architecture

## 1. Editor library recommendation: **Tiptap**

**Why Tiptap (over Slate, Lexical, etc.):**

| Criteria              | Tiptap | Slate | Lexical |
|-----------------------|--------|--------|--------|
| Block-based + WYSIWYG | ✅     | ✅     | ✅     |
| React first           | ✅     | ✅     | ✅     |
| Slash commands        | ✅ (custom) | ✅ | ✅     |
| Bubble / floating UI  | ✅ Built-in | Manual | Manual |
| JSON output           | ✅ ProseMirror JSON | Custom | Custom |
| Extensions (image, code, etc.) | ✅ Rich ecosystem | Manual | Good |
| Drag-and-drop blocks  | ✅ Extension | Manual | Possible |
| Bundle size / perf    | Good   | Good   | Good   |
| Learning curve        | Low    | Medium | Medium |

**Verdict:** Tiptap is the best fit for a Medium-style CMS editor: ProseMirror under the hood (battle-tested), first-class React and bubble/floating menus, clean JSON, and optional drag-handle extension. We already use it in this project.

---

## 2. Database structure

### Tables

```sql
-- Article metadata + SEO
CREATE TABLE articles (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title         TEXT NOT NULL,
  slug          TEXT NOT NULL UNIQUE,
  description   TEXT,                    -- meta description (SEO)
  status        TEXT NOT NULL DEFAULT 'draft',  -- draft | published
  author_id     UUID REFERENCES users(id),
  cover_image_id UUID REFERENCES media(id),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Block-based body (one row per block, order preserved)
CREATE TABLE article_blocks (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id UUID NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
  position   INT NOT NULL,                -- 0, 1, 2... for order
  type       TEXT NOT NULL,               -- paragraph | heading1 | heading2 | heading3 | quote | code_block | image | divider | bullet_list | ordered_list
  content    JSONB NOT NULL,              -- block payload (see below)
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(article_id, position)
);

CREATE INDEX idx_article_blocks_article_position ON article_blocks(article_id, position);

-- Media (images for uploads)
CREATE TABLE media (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key        TEXT NOT NULL UNIQUE,       -- storage path or key
  url        TEXT NOT NULL,               -- public URL
  mime_type  TEXT,
  size_bytes BIGINT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

### Block `content` JSONB shape (per type)

- **paragraph:** `{ "text": "HTML or plain text" }` or inline JSON
- **heading1 | heading2 | heading3:** `{ "text": "..." }`
- **quote:** `{ "text": "..." }`
- **code_block:** `{ "language": "ts", "code": "..." }`
- **image:** `{ "src": "https://...", "alt": "...", "media_id": "uuid?" }`
- **divider:** `{}`
- **bullet_list | ordered_list:** `{ "items": ["item1", "item2"] }` or nested structure

We store **Tiptap-compatible JSON** in `content` so one-to-one mapping with the editor state and easy rendering on the frontend.

---

## 3. Example JSON stored in the database

### Article (API response)

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Getting started with the CMS",
  "slug": "getting-started-cms",
  "description": "A short guide to writing and publishing articles.",
  "status": "draft",
  "cover_image_id": null,
  "created_at": "2025-03-15T10:00:00Z",
  "updated_at": "2025-03-15T12:30:00Z",
  "blocks": [
    {
      "id": "block-1",
      "article_id": "550e8400-e29b-41d4-a716-446655440000",
      "position": 0,
      "type": "heading1",
      "content": { "text": "Introduction" }
    },
    {
      "id": "block-2",
      "article_id": "550e8400-e29b-41d4-a716-446655440000",
      "position": 1,
      "type": "paragraph",
      "content": { "text": "This is the first paragraph of the article." }
    },
    {
      "id": "block-3",
      "position": 2,
      "type": "image",
      "content": { "src": "https://cdn.example.com/img/1.jpg", "alt": "Screenshot" }
    },
    {
      "id": "block-4",
      "position": 3,
      "type": "code_block",
      "content": { "language": "typescript", "code": "const x = 1;" }
    }
  ]
}
```

### Alternative: single `body` JSON (simpler backend)

If you prefer one column for the whole body (e.g. for MVP):

```json
{
  "type": "doc",
  "content": [
    { "type": "heading", "attrs": { "level": 1 }, "content": [{ "type": "text", "text": "Introduction" }] },
    { "type": "paragraph", "content": [{ "type": "text", "text": "First paragraph." }] },
    { "type": "image", "attrs": { "src": "https://...", "alt": "Screenshot" } },
    { "type": "codeBlock", "content": [{ "type": "text", "text": "const x = 1;" }] }
  ]
}
```

Storing Tiptap’s `getJSON()` in a single `body` JSONB column is valid and avoids joins; `article_blocks` is for when you need to query or reorder blocks at the DB level.

---

## 4. Frontend → backend flow

1. **Editor state**  
   User edits in `ArticleEditor` (Tiptap). State is in memory and/or synced to React state.

2. **Structured output**  
   On save (or autosave), call `editor.getJSON()`. Optionally convert to `ArticleBlock[]` (or keep as one doc JSON) and add SEO fields (title, slug, description).

3. **Payload to API**  
   POST/PUT to e.g. `POST /api/admin/articles` or `PUT /api/admin/articles/:id`:

```ts
// Example request body
{
  "title": "Getting started with the CMS",
  "slug": "getting-started-cms",
  "description": "A short guide to writing and publishing.",
  "status": "draft",
  "body": { "type": "doc", "content": [ ... ] }   // Tiptap JSON
  // OR
  "blocks": [ { "position": 0, "type": "paragraph", "content": { ... } }, ... ]
}
```

4. **Backend**  
   - Validate title, slug, description.  
   - If using `article_blocks`: map each block to a row (article_id, position, type, content).  
   - If using single `body`: store `body` as JSONB.  
   - Handle image uploads separately (e.g. `POST /api/admin/media`) and replace temp URLs with final `media_id` or URLs in block content.

5. **Autosave**  
   Frontend debounces `onChange` (e.g. 2s), then sends the same payload to a “draft” endpoint (e.g. `PUT /api/admin/articles/:id/draft`). No need to send full blocks every time if backend supports partial updates.

6. **Image upload**  
   - User picks image → `POST /api/admin/media` with `FormData` → backend stores file, returns `{ id, url }`.  
   - Editor inserts image block with `url` (and optionally `media_id`).  
   - Save article stores that URL/media_id in block content.

---

## 5. Performance with large articles

- **Virtualization:** Not required for typical article length (Tiptap/ProseMirror only render visible nodes). For very long docs, consider windowing or pagination of “sections” in the UI.
- **Debounce:** Autosave and any “live” stats (word count, reading time) should be debounced (e.g. 300–500 ms).
- **Large JSON:** Store and send Tiptap JSON as-is; ensure backend indexes JSONB only if you query inside (e.g. by block type). Avoid loading full history for list views; load only metadata and optionally first N blocks for preview.

---

## 6. File map (this repo)

| File | Purpose |
|------|--------|
| `src/types/article.ts` | `Article`, `ArticleBlock`, block types, SEO |
| `src/lib/articleEditorUtils.ts` | Word count, reading time, empty doc |
| `src/components/admin/ArticleEditor.tsx` | Full Medium-style editor (slash, bubble, floating menu, blocks) |
| `src/hooks/useAutosave.ts` | Debounced save to API |
| `src/api/adminClient.ts` | Optional: `articles.saveDraft`, `media.upload` (see below) |
| `docs/ARTICLE_EDITOR_ARCHITECTURE.md` | This document |

---

## 7. Example: frontend sends structured content to backend

### Request body (POST /api/admin/articles or PUT /api/admin/articles/:id)

```json
{
  "title": "Getting started with the CMS",
  "slug": "getting-started-cms",
  "description": "A short guide to writing and publishing articles.",
  "status": "draft",
  "body": {
    "type": "doc",
    "content": [
      {
        "type": "heading",
        "attrs": { "level": 1 },
        "content": [{ "type": "text", "text": "Introduction" }]
      },
      {
        "type": "paragraph",
        "content": [{ "type": "text", "text": "This is the first paragraph." }]
      },
      {
        "type": "image",
        "attrs": { "src": "https://cdn.example.com/img/1.jpg", "alt": "Screenshot" }
      },
      {
        "type": "codeBlock",
        "content": [{ "type": "text", "text": "const x = 1;" }]
      }
    ]
  }
}
```

### Using ArticleEditor + autosave

```tsx
import { useState } from "react";
import { ArticleEditor } from "@/components/admin/ArticleEditor";
import { useAutosave } from "@/hooks/useAutosave";
import type { TiptapDocJSON } from "@/types/article";
import { adminApi } from "@/api/adminClient";

function ArticleEditPage() {
  const [body, setBody] = useState<TiptapDocJSON | null>({ type: "doc", content: [] });

  useAutosave({
    value: body,
    onSave: async (doc) => {
      await adminApi.articles.saveDraft({ body: doc, title: "...", slug: "...", description: "..." });
    },
    delayMs: 2000,
    disabled: !articleId,
  });

  return (
    <ArticleEditor
      value={body}
      onChange={setBody}
      showStats
      onImageUpload={async (file) => {
        const { url } = await adminApi.media.upload(file);
        return url;
      }}
    />
  );
}
```

### Backend API route (pseudo)

- **POST /api/admin/articles:** Validate `title`, `slug`, `description`, `body`. Insert into `articles` (and optionally normalize `body` into `article_blocks`). Return `{ id, ... }`.
- **PUT /api/admin/articles/:id:** Same validation; update row. Optionally support `PUT /api/admin/articles/:id/draft` for autosave (partial update of `body` only).
- **POST /api/admin/media:** Accept `multipart/form-data` with file; store file (e.g. S3), insert into `media`, return `{ id, url }`.
