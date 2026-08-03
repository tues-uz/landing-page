import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { CarouselNodeView } from "@/components/admin/CarouselNodeView";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    imageCarousel: {
      setImageCarousel: (options: { images: string[] }) => ReturnType;
    };
  }
}

export const CarouselExtension = Node.create({
  name: "imageCarousel",
  group: "block",
  atom: true,
  draggable: true,

  addAttributes() {
    return {
      images: {
        default: [] as string[],
        parseHTML: (element) => {
          const raw = element.getAttribute("data-images");
          if (!raw) return [];
          try {
            const parsed = JSON.parse(raw);
            return Array.isArray(parsed) ? parsed.filter((u) => typeof u === "string") : [];
          } catch {
            return [];
          }
        },
        renderHTML: (attributes) => ({
          "data-images": JSON.stringify(attributes.images ?? []),
        }),
      },
    };
  },

  parseHTML() {
    return [{ tag: "div[data-image-carousel]" }];
  },

  renderHTML({ HTMLAttributes }) {
    return ["div", mergeAttributes(HTMLAttributes, { "data-image-carousel": "" })];
  },

  addNodeView() {
    return ReactNodeViewRenderer(CarouselNodeView);
  },

  addCommands() {
    return {
      setImageCarousel:
        (options: { images: string[] }) =>
        ({ commands }) =>
          commands.insertContent({
            type: this.name,
            attrs: { images: options.images },
          }),
    };
  },
});
