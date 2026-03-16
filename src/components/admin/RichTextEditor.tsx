import { useEffect, useMemo } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import type { NewsSection } from "@/api/client";
import {
  sectionsToTiptapContent,
  tiptapJsonToSections,
  emptyTiptapDoc,
} from "@/lib/newsEditorUtils";
import { Button } from "@/components/ui/button";
import { Bold, Italic, Heading2, List, ListOrdered } from "lucide-react";
import { cn } from "@/lib/utils";

const PLACEHOLDER = "Tell your story...";

interface RichTextEditorProps {
  value: NewsSection[];
  onChange: (sections: NewsSection[]) => void;
  placeholder?: string;
  className?: string;
}

function ToolbarButton({
  onClick,
  active,
  title,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className={cn(
        "h-8 w-8 rounded-md text-muted-foreground hover:text-foreground",
        active && "bg-muted text-foreground"
      )}
      onClick={onClick}
      title={title}
      aria-pressed={active}
    >
      {children}
    </Button>
  );
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = PLACEHOLDER,
  className,
}: RichTextEditorProps) {
  const initialContent = useMemo(
    () =>
      value?.length
        ? { type: "doc" as const, content: sectionsToTiptapContent(value) }
        : emptyTiptapDoc(),
    [value]
  );

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
      }),
      Placeholder.configure({
        placeholder,
        emptyEditorClass: "is-editor-empty",
        showOnlyWhenEditable: true,
      }),
    ],
    content: initialContent,
    editorProps: {
      attributes: {
        class:
          "tiptap ProseMirror prose prose-neutral max-w-none min-h-[280px] px-0 py-3 text-[17px] leading-[1.65] focus:outline-none focus:ring-0",
      },
    },
  });

  useEffect(() => {
    if (!editor) return;
    const onUpdate = () => {
      const doc = editor.getJSON();
      const sections = tiptapJsonToSections(doc);
      onChange(sections);
    };
    editor.on("update", onUpdate);
    return () => {
      editor.off("update", onUpdate);
    };
  }, [editor, onChange]);

  if (!editor) return null;

  return (
    <div className={cn("relative rounded-lg bg-background", className)}>
      {/* Inline toolbar when text is selected (same as reference localhost:5175/news/new) */}
      <BubbleMenu
        editor={editor}
        options={{ placement: "top" }}
        className="flex items-center gap-0.5 rounded-lg border border-border bg-popover p-0.5 shadow-md"
      >
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive("bold")}
          title="Bold"
        >
          <Bold className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive("italic")}
          title="Italic"
        >
          <Italic className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          active={editor.isActive("heading", { level: 2 })}
          title="Heading 2"
        >
          <Heading2 className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive("bulletList")}
          title="Bullet list"
        >
          <List className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive("orderedList")}
          title="Numbered list"
        >
          <ListOrdered className="h-4 w-4" />
        </ToolbarButton>
      </BubbleMenu>

      <div className="px-1 pb-4 [&_.is-editor-empty:first-child::before]:content-[attr(data-placeholder)] [&_.is-editor-empty:first-child::before]:text-muted-foreground/60 [&_.is-editor-empty:first-child::before]:float-left [&_.is-editor-empty:first-child::before]:h-0 [&_.is-editor-empty:first-child::before]:pointer-events-none">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
