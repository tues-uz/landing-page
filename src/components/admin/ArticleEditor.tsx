/**
 * Medium-style article editor: slash menu, bubble toolbar, floating "+", blocks.
 * Outputs Tiptap JSON for API/store. See docs/ARTICLE_EDITOR_ARCHITECTURE.md.
 */

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import { YoutubeExtension, isValidYoutubeUrl } from "@/lib/youtubeExtension";
import type { Editor } from "@tiptap/core";
import type { TiptapDocJSON } from "@/types/article";
import {
  mediumStyleEmptyDoc,
  getWordCount,
  getReadingTimeLabel,
} from "@/lib/articleEditorUtils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Heading3,
  Quote,
  Link as LinkIcon,
  Code,
  Minus,
  Type,
  ImageIcon,
  Plus,
  Video,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const PLACEHOLDER = "Tell your story...";

const SLASH_COMMANDS: Array<{
  title: string;
  keywords: string[];
  icon: React.ReactNode;
  run: (editor: Editor) => void;
}> = [
  { title: "Paragraph", keywords: ["p", "text"], icon: <Type className="h-4 w-4" />, run: (e) => e.chain().focus().setParagraph().run() },
  { title: "Heading 1", keywords: ["h1", "title"], icon: <Heading1 className="h-4 w-4" />, run: (e) => e.chain().focus().toggleHeading({ level: 1 }).run() },
  { title: "Heading 2", keywords: ["h2", "subtitle"], icon: <Heading2 className="h-4 w-4" />, run: (e) => e.chain().focus().toggleHeading({ level: 2 }).run() },
  { title: "Heading 3", keywords: ["h3"], icon: <Heading3 className="h-4 w-4" />, run: (e) => e.chain().focus().toggleHeading({ level: 3 }).run() },
  { title: "Quote", keywords: ["quote", "blockquote"], icon: <Quote className="h-4 w-4" />, run: (e) => e.chain().focus().toggleBlockquote().run() },
  { title: "Code block", keywords: ["code", "pre"], icon: <Code className="h-4 w-4" />, run: (e) => e.chain().focus().toggleCodeBlock().run() },
  { title: "Image", keywords: ["image", "img", "photo"], icon: <ImageIcon className="h-4 w-4" />, run: () => {} },
  { title: "Divider", keywords: ["divider", "hr", "line"], icon: <Minus className="h-4 w-4" />, run: (e) => e.chain().focus().setHorizontalRule().run() },
  { title: "Bullet list", keywords: ["ul", "bullet"], icon: <List className="h-4 w-4" />, run: (e) => e.chain().focus().toggleBulletList().run() },
  { title: "Numbered list", keywords: ["ol", "numbered"], icon: <ListOrdered className="h-4 w-4" />, run: (e) => e.chain().focus().toggleOrderedList().run() },
];

export interface ArticleEditorProps {
  value: TiptapDocJSON | null;
  onChange: (doc: TiptapDocJSON) => void;
  placeholder?: string;
  className?: string;
  onImageUpload?: (file: File) => Promise<string>;
  showStats?: boolean;
}

function ToolbarButton({
  onClick,
  onMouseDown,
  active,
  title,
  children,
}: {
  onClick: () => void;
  /** Use onMouseDown with preventDefault so the editor keeps focus/selection when applying format (e.g. in bubble menu). */
  onMouseDown?: (e: React.MouseEvent) => void;
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
      onMouseDown={onMouseDown}
      onClick={onClick}
      title={title}
      aria-pressed={active}
    >
      {children}
    </Button>
  );
}

export function ArticleEditor({
  value,
  onChange,
  placeholder = PLACEHOLDER,
  className,
  onImageUpload,
  showStats = true,
}: ArticleEditorProps) {
  const lastValueRef = useRef<string>(JSON.stringify(value?.content ?? []));
  const [slashOpen, setSlashOpen] = useState(false);
  const [slashFilter, setSlashFilter] = useState("");
  const [slashIndex, setSlashIndex] = useState(0);
  const [slashPos, setSlashPos] = useState<{ top: number; left: number } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const slashStateRef = useRef({ open: false, filter: "", index: 0 });
  slashStateRef.current = { open: slashOpen, filter: slashFilter, index: slashIndex };
  const [videoDialogOpen, setVideoDialogOpen] = useState(false);
  const [videoUrlInput, setVideoUrlInput] = useState("");
  const videoInsertPosRef = useRef<number | null>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const [linkMenuOpen, setLinkMenuOpen] = useState(false);
  const [linkMenuUrl, setLinkMenuUrl] = useState("");
  const linkInputRef = useRef<HTMLInputElement>(null);
  const [linkEmbedDialogOpen, setLinkEmbedDialogOpen] = useState(false);
  const [linkEmbedUrl, setLinkEmbedUrl] = useState("");
  const linkEmbedInsertPosRef = useRef<number | null>(null);
  const linkEmbedInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const initialContent = useMemo(() => {
    if (value?.type === "doc" && value.content?.length) return value;
    return mediumStyleEmptyDoc();
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
        codeBlock: { HTMLAttributes: { class: "rounded-lg bg-muted p-4 font-mono text-sm" } },
      }),
      Placeholder.configure({
        placeholder,
        emptyEditorClass: "is-editor-empty",
        showOnlyWhenEditable: true,
      }),
      Link.configure({ openOnClick: false, HTMLAttributes: { class: "text-primary underline" } }),
      Image.configure({ inline: false, allowBase64: false }),
      HorizontalRule,
      YoutubeExtension.configure({ inline: false, width: 640, height: 360 }),
    ],
    content: initialContent,
    editorProps: {
      attributes: {
        class:
          "tiptap ProseMirror prose prose-neutral max-w-none min-h-[280px] px-0 py-3 text-[17px] leading-[1.65] focus:outline-none focus:ring-0",
      },
      handleKeyDown: (view, event) => {
        const stateRef = slashStateRef.current;
        const filter = (q: string) =>
          q
            ? SLASH_COMMANDS.filter(
                (c) =>
                  c.title.toLowerCase().includes(q.toLowerCase()) ||
                  c.keywords.some((k) => k.includes(q.toLowerCase()))
              )
            : SLASH_COMMANDS;

        if (stateRef.open) {
          const list = filter(stateRef.filter);
          const len = list.length;
          if (event.key === "ArrowDown") {
            event.preventDefault();
            setSlashIndex((i) => Math.min(i + 1, len - 1));
            return true;
          }
          if (event.key === "ArrowUp") {
            event.preventDefault();
            setSlashIndex((i) => Math.max(i - 1, 0));
            return true;
          }
          if (event.key === "Enter") {
            event.preventDefault();
            const cmd = list[Math.min(stateRef.index, len - 1)];
            if (cmd?.title === "Image") fileInputRef.current?.click();
            else if (cmd) cmd.run(editor!);
            setSlashOpen(false);
            setSlashFilter("");
            setSlashIndex(0);
            setSlashPos(null);
            editor?.commands.focus();
            return true;
          }
          if (event.key === "Escape") {
            event.preventDefault();
            setSlashOpen(false);
            setSlashFilter("");
            setSlashIndex(0);
            setSlashPos(null);
            editor?.commands.focus();
            return true;
          }
          if (event.key === "Backspace") {
            if (stateRef.filter) {
              setSlashFilter((q) => q.slice(0, -1));
              setSlashIndex(0);
              event.preventDefault();
              return true;
            }
            setSlashOpen(false);
            setSlashFilter("");
            setSlashIndex(0);
            setSlashPos(null);
            return false;
          }
          if (event.key.length === 1) {
            setSlashFilter((q) => q + event.key);
            setSlashIndex(0);
            event.preventDefault();
            return true;
          }
          return false;
        }

        if (event.key === "/") {
          const { state } = view;
          const $from = state.selection.$from;
          if ($from.parent.type.name === "codeBlock") return false;
          event.preventDefault();
          view.dispatch(state.tr.delete(state.selection.from - 1, state.selection.from));
          setSlashFilter("");
          setSlashIndex(0);
          setSlashOpen(true);
          const coords = view.coordsAtPos(state.selection.from);
          setSlashPos({ top: coords.bottom + 4, left: coords.left });
          return true;
        }
        return false;
      },
    },
  });

  const setLink = useCallback(
    (url: string | null) => {
      if (!editor) return;
      if (url === null) return;
      if (url === "") editor.chain().focus().extendMarkRange("link").unsetLink().run();
      else editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    },
    [editor]
  );

  const openLinkInput = useCallback(() => {
    if (!editor) return;
    const previousUrl = editor.getAttributes("link").href || "";
    setLinkMenuUrl(previousUrl);
    setLinkMenuOpen(true);
    requestAnimationFrame(() => linkInputRef.current?.focus());
  }, [editor]);

  const submitLinkInput = useCallback(() => {
    const url = linkMenuUrl.trim();
    setLink(url);
    setLinkMenuOpen(false);
    setLinkMenuUrl("");
    editor?.commands.focus();
  }, [linkMenuUrl, setLink, editor]);

  const cancelLinkInput = useCallback(() => {
    setLinkMenuOpen(false);
    setLinkMenuUrl("");
    editor?.commands.focus();
  }, [editor]);

  useEffect(() => {
    if (!editor) return;
    const onSelectionUpdate = () => {
      const { from, to } = editor.state.selection;
      if (from === to) setLinkMenuOpen(false);
    };
    editor.on("selectionUpdate", onSelectionUpdate);
    return () => {
      editor.off("selectionUpdate", onSelectionUpdate);
    };
  }, [editor]);

  const handleImageFile = useCallback(
    async (file: File) => {
      if (!editor) return;
      const isImage = file.type.startsWith("image/");
      if (onImageUpload && isImage) {
        try {
          const url = await onImageUpload(file);
          editor.chain().focus().setImage({ src: url }).run();
        } catch (e) {
          console.error("Image upload failed", e);
        }
      } else if (isImage) {
        const url = URL.createObjectURL(file);
        editor.chain().focus().setImage({ src: url }).run();
      }
    },
    [editor, onImageUpload]
  );

  useEffect(() => {
    if (!editor) return;
    const onUpdate = () => {
      const doc = editor.getJSON() as TiptapDocJSON;
      onChange(doc);
    };
    editor.on("update", onUpdate);
    return () => {
      editor.off("update", onUpdate);
    };
  }, [editor, onChange]);

  useEffect(() => {
    if (!editor || !value?.content?.length) return;
    const str = JSON.stringify(value.content);
    if (str !== lastValueRef.current) {
      lastValueRef.current = str;
      editor.commands.setContent(value, { emitUpdate: false });
    }
  }, [value, editor]);

  const filteredCommands = useMemo(
    () =>
      slashFilter
        ? SLASH_COMMANDS.filter(
            (c) =>
              c.title.toLowerCase().includes(slashFilter.toLowerCase()) ||
              c.keywords.some((k) => k.includes(slashFilter.toLowerCase()))
          )
        : SLASH_COMMANDS,
    [slashFilter]
  );
  const safeIndex = Math.min(slashIndex, Math.max(0, filteredCommands.length - 1));

  useLayoutEffect(() => {
    if (slashOpen && editor) {
      const coords = editor.view.coordsAtPos(editor.state.selection.from);
      setSlashPos({ top: coords.bottom + 4, left: coords.left });
    }
  }, [slashOpen, slashFilter, editor]);

  const closeSlash = useCallback(() => {
    setSlashOpen(false);
    setSlashFilter("");
    setSlashIndex(0);
    setSlashPos(null);
    editor?.commands.focus();
  }, [editor]);

  useEffect(() => {
    if (videoDialogOpen) {
      setVideoUrlInput("");
      videoInputRef.current?.focus();
    }
  }, [videoDialogOpen]);

  useEffect(() => {
    if (linkEmbedDialogOpen) {
      setLinkEmbedUrl("");
      linkEmbedInputRef.current?.focus();
    }
  }, [linkEmbedDialogOpen]);

  const handleVideoInsert = useCallback(() => {
    const url = videoUrlInput.trim();
    if (!url) {
      toast({ title: "Enter a video link", variant: "destructive" });
      return;
    }
    const pos = videoInsertPosRef.current;
    if (pos == null || !editor) {
      setVideoDialogOpen(false);
      setVideoUrlInput("");
      return;
    }
    if (isValidYoutubeUrl(url)) {
      editor.chain().focus().insertContentAt(pos, { type: "youtube", attrs: { src: url } }).setTextSelection(pos + 1).run();
      toast({ title: "Video added", description: "Embed inserted." });
    } else {
      editor
        .chain()
        .focus()
        .insertContentAt(pos, {
          type: "paragraph",
          content: [{ type: "text", text: url, marks: [{ type: "link", attrs: { href: url } }] }],
        })
        .run();
      toast({ title: "Link added", description: "Link inserted as text." });
    }
    setVideoDialogOpen(false);
    setVideoUrlInput("");
    videoInsertPosRef.current = null;
  }, [videoUrlInput, editor, toast]);

  const handleLinkEmbedInsert = useCallback(() => {
    const url = linkEmbedUrl.trim();
    if (!url) {
      toast({ title: "Enter a link URL", variant: "destructive" });
      return;
    }
    const pos = linkEmbedInsertPosRef.current;
    if (pos == null || !editor) {
      setLinkEmbedDialogOpen(false);
      setLinkEmbedUrl("");
      return;
    }
    editor
      .chain()
      .focus()
      .insertContentAt(pos, {
        type: "paragraph",
        content: [{ type: "text", text: url, marks: [{ type: "link", attrs: { href: url } }] }],
      })
      .run();
    toast({ title: "Link added" });
    setLinkEmbedDialogOpen(false);
    setLinkEmbedUrl("");
    linkEmbedInsertPosRef.current = null;
  }, [linkEmbedUrl, editor, toast]);

  const doc = editor?.getJSON() as TiptapDocJSON | null;
  const wordCount = doc ? getWordCount(doc) : 0;
  const readingTime = doc ? getReadingTimeLabel(doc) : "";

  const editorWrapperRef = useRef<HTMLDivElement>(null);
  const editorContentWrapperRef = useRef<HTMLDivElement>(null);
  const flexRowRef = useRef<HTMLDivElement>(null);
  const [addButtonTop, setAddButtonTop] = useState(12);

  const updateAddButtonPosition = useCallback(() => {
    if (!editor || !flexRowRef.current) return;
    const view = editor.view;
    if (!view.hasFocus()) return;
    const { from } = editor.state.selection;
    const coords = view.coordsAtPos(from);
    const rowRect = flexRowRef.current.getBoundingClientRect();
    const top = coords.top - rowRect.top;
    setAddButtonTop(Math.max(0, Math.round(top) - 4));
  }, [editor]);

  useEffect(() => {
    if (!editor) return;
    updateAddButtonPosition();
    editor.on("selectionUpdate", updateAddButtonPosition);
    editor.on("focus", updateAddButtonPosition);
    const wrapper = editorContentWrapperRef.current ?? flexRowRef.current;
    if (wrapper) {
      const scrollParent = wrapper.closest(".overflow-auto") ?? window;
      scrollParent.addEventListener("scroll", updateAddButtonPosition, { passive: true });
      window.addEventListener("resize", updateAddButtonPosition);
      return () => {
        editor.off("selectionUpdate", updateAddButtonPosition);
        editor.off("focus", updateAddButtonPosition);
        scrollParent.removeEventListener("scroll", updateAddButtonPosition);
        window.removeEventListener("resize", updateAddButtonPosition);
      };
    }
    return () => {
      editor.off("selectionUpdate", updateAddButtonPosition);
      editor.off("focus", updateAddButtonPosition);
    };
  }, [editor, updateAddButtonPosition]);

  if (!editor) return null;

  return (
    <div ref={editorWrapperRef} className={cn("relative rounded-lg bg-background", className)}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleImageFile(file);
          e.target.value = "";
        }}
      />

      <BubbleMenu
        editor={editor}
        appendTo={() => document.body}
        updateDelay={0}
        options={{ placement: "top", strategy: "fixed" }}
        className="flex flex-col gap-1 rounded-xl border border-border bg-popover px-1 py-1 shadow-lg z-[100]"
      >
        <div className="flex items-center gap-0.5">
          <ToolbarButton
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => editor.chain().focus().toggleBold().run()}
            active={editor.isActive("bold")}
            title="Bold"
          >
            <Bold className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => editor.chain().focus().toggleItalic().run()}
            active={editor.isActive("italic")}
            title="Italic"
          >
            <Italic className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            onMouseDown={(e) => e.preventDefault()}
            onClick={openLinkInput}
            active={editor.isActive("link")}
            title="Link"
          >
            <LinkIcon className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => editor.chain().focus().toggleCode().run()}
            active={editor.isActive("code")}
            title="Inline code"
          >
            <Code className="h-4 w-4" />
          </ToolbarButton>
          <div className="mx-1 w-px h-5 bg-border shrink-0" aria-hidden />
          <ToolbarButton
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            active={editor.isActive("heading", { level: 2 })}
            title="Heading 2"
          >
            <Heading2 className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            active={editor.isActive("heading", { level: 3 })}
            title="Heading 3"
          >
            <Heading3 className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            active={editor.isActive("blockquote")}
            title="Quote"
          >
            <Quote className="h-4 w-4" />
          </ToolbarButton>
        </div>
        {linkMenuOpen && (
          <div className="flex items-center gap-1 px-1 pb-0.5 pt-0.5 border-t border-border">
            <input
              ref={linkInputRef}
              type="url"
              placeholder="Paste or type a link…"
              value={linkMenuUrl}
              onChange={(e) => setLinkMenuUrl(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  submitLinkInput();
                }
                if (e.key === "Escape") cancelLinkInput();
              }}
              className="flex-1 min-w-[180px] rounded-md border border-input bg-background px-2 py-1.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              aria-label="Link URL"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8 shrink-0 text-muted-foreground hover:text-foreground"
              onClick={cancelLinkInput}
              aria-label="Cancel link"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
      </BubbleMenu>

      {/* Medium-style section: section-content > section-inner (inset column); "+" follows active block */}
      <div className="section-content">
        <div className="section-inner mx-auto max-w-[680px] px-0">
          <div ref={flexRowRef} className="flex w-full">
            {/* "+" button on the left – position follows the active (focused) block */}
            <div className="relative shrink-0 w-11 min-h-[280px] pr-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    style={{ top: addButtonTop }}
                    className="absolute left-0 inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-foreground text-background shadow-sm hover:bg-foreground/90 focus:outline-none focus:ring-2 focus:ring-ring transition-[top] duration-150"
                    title="Add an image, divider, or new block"
                    aria-label="Add an image, divider, or new block"
                  >
                    <Plus className="h-5 w-5" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" side="bottom" className="min-w-[11rem] overflow-visible p-1.5 rounded-xl border border-border shadow-lg">
                  <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Insert block">
                    <button
                      type="button"
                      title="Add empty block"
                      aria-label="Add empty block"
                      className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-full border border-[#1A8917] pl-1.5 pr-2 text-[#1A8917] bg-transparent hover:bg-[#1A8917]/10 focus:outline-none focus:ring-2 focus:ring-[#1A8917]/30 transition-colors"
                      onClick={() => {
                        editor.chain().focus().run();
                        const { selection } = editor.state;
                        const pos = selection.$anchor.after();
                        editor.chain().insertContentAt(pos, { type: "paragraph", content: [] }).setTextSelection(pos + 1).run();
                      }}
                    >
                      <Type className="h-4 w-4 shrink-0" />
                      <span className="text-xs font-medium">Empty block</span>
                    </button>
                    <button
                      type="button"
                      title="Add an image"
                      aria-label="Add an image"
                      className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#1A8917] text-[#1A8917] bg-transparent hover:bg-[#1A8917]/10 focus:outline-none focus:ring-2 focus:ring-[#1A8917]/30 transition-colors"
                      onClick={() => {
                        editor.chain().focus().run();
                        fileInputRef.current?.click();
                      }}
                    >
                      <ImageIcon className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      title="Add a video (YouTube, Vimeo, or link)"
                      aria-label="Add a video"
                      className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-full border border-[#1A8917] pl-1.5 pr-2 text-[#1A8917] bg-transparent hover:bg-[#1A8917]/10 focus:outline-none focus:ring-2 focus:ring-[#1A8917]/30 transition-colors"
                      onClick={() => {
                        editor.chain().focus().run();
                        videoInsertPosRef.current = editor.state.selection.anchor;
                        setVideoDialogOpen(true);
                        toast({ title: "Paste your video link in the field below" });
                      }}
                    >
                      <Video className="h-4 w-4 shrink-0" />
                      <span className="text-xs font-medium">Video</span>
                    </button>
                    <button
                      type="button"
                      title="Add a link (embed URL as clickable link)"
                      aria-label="Add link"
                      className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-full border border-[#1A8917] pl-1.5 pr-2 text-[#1A8917] bg-transparent hover:bg-[#1A8917]/10 focus:outline-none focus:ring-2 focus:ring-[#1A8917]/30 transition-colors"
                      onClick={() => {
                        editor.chain().focus().run();
                        linkEmbedInsertPosRef.current = editor.state.selection.anchor;
                        setLinkEmbedDialogOpen(true);
                      }}
                    >
                      <LinkIcon className="h-4 w-4 shrink-0" />
                      <span className="text-xs font-medium">Link</span>
                    </button>
                    <button
                      type="button"
                      title="Add a divider"
                      aria-label="Add a divider"
                      className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#1A8917] text-[#1A8917] bg-transparent hover:bg-[#1A8917]/10 focus:outline-none focus:ring-2 focus:ring-[#1A8917]/30 transition-colors"
                      onClick={() => {
                        editor.chain().focus().run();
                        const { selection } = editor.state;
                        const pos = selection.$anchor.after();
                        editor
                          .chain()
                          .insertContentAt(pos, [{ type: "horizontalRule" }, { type: "paragraph", content: [] }])
                          .setTextSelection(pos + 3)
                          .run();
                      }}
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div
              ref={editorContentWrapperRef}
              className="min-w-0 flex-1 relative px-1 pb-4 [&_.ProseMirror>.is-editor-empty::before]:content-[attr(data-placeholder)] [&_.ProseMirror>.is-editor-empty::before]:text-muted-foreground/60 [&_.ProseMirror>.is-editor-empty::before]:float-left [&_.ProseMirror>.is-editor-empty::before]:h-0 [&_.ProseMirror>.is-editor-empty::before]:pointer-events-none [&_.ProseMirror>h3.is-editor-empty::before]:content-['Title']"
              data-placeholder={placeholder}
            >
              <EditorContent editor={editor} />
            </div>
          </div>
        </div>
      </div>

      <Dialog open={videoDialogOpen} onOpenChange={(open) => { setVideoDialogOpen(open); if (!open) { setVideoUrlInput(""); videoInsertPosRef.current = null; } }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add video</DialogTitle>
            <DialogDescription>
              Paste a YouTube, Vimeo, or other video link. YouTube links will be embedded; others will be inserted as a link.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <Input
              ref={videoInputRef}
              type="url"
              placeholder="https://www.youtube.com/watch?v=… or paste any video URL"
              value={videoUrlInput}
              onChange={(e) => setVideoUrlInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleVideoInsert();
                }
              }}
              className="font-mono text-sm"
              aria-label="Video URL"
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setVideoDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="button" className="bg-[#1A8917] hover:bg-[#1A8917]/90" onClick={handleVideoInsert}>
              Insert
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={linkEmbedDialogOpen}
        onOpenChange={(open) => {
          setLinkEmbedDialogOpen(open);
          if (!open) {
            setLinkEmbedUrl("");
            linkEmbedInsertPosRef.current = null;
          }
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add link</DialogTitle>
            <DialogDescription>
              Paste or type a URL. It will be inserted as a clickable link in the article.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <Input
              ref={linkEmbedInputRef}
              type="url"
              placeholder="https://…"
              value={linkEmbedUrl}
              onChange={(e) => setLinkEmbedUrl(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleLinkEmbedInsert();
                }
              }}
              className="font-mono text-sm"
              aria-label="Link URL"
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setLinkEmbedDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="button" className="bg-[#1A8917] hover:bg-[#1A8917]/90" onClick={handleLinkEmbedInsert}>
              Insert
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {showStats && (
        <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
          <span>{wordCount} words</span>
          {readingTime && <span>{readingTime}</span>}
        </div>
      )}

      {slashOpen && slashPos && (
        <>
          <div className="fixed inset-0 z-40" aria-hidden onClick={closeSlash} />
          <div
            className="fixed z-50 min-w-[220px] rounded-lg border border-border bg-popover py-1 shadow-lg"
            style={{ top: slashPos.top, left: slashPos.left }}
            role="listbox"
          >
            <p className="px-2 py-1 text-xs text-muted-foreground">Insert block</p>
            {filteredCommands.length === 0 ? (
              <p className="px-2 py-2 text-sm text-muted-foreground">No match</p>
            ) : (
              filteredCommands.map((cmd, i) => (
                <button
                  key={cmd.title}
                  type="button"
                  role="option"
                  aria-selected={i === safeIndex}
                  className={cn(
                    "flex w-full cursor-pointer items-center gap-2 px-2 py-1.5 text-left text-sm outline-none hover:bg-accent hover:text-accent-foreground",
                    i === safeIndex && "bg-accent text-accent-foreground"
                  )}
                  onMouseEnter={() => setSlashIndex(i)}
                  onClick={() => {
                    if (cmd.title === "Image") fileInputRef.current?.click();
                    else cmd.run(editor);
                    closeSlash();
                  }}
                >
                  <span className="text-muted-foreground">{cmd.icon}</span>
                  {cmd.title}
                </button>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
}
