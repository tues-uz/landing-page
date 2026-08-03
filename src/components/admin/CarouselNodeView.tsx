import { NodeViewWrapper } from "@tiptap/react";
import type { NodeViewProps } from "@tiptap/react";
import { Images } from "lucide-react";
import { ArticleBodyCarousel } from "@/components/ArticleBodyCarousel";

export function CarouselNodeView({ node }: NodeViewProps) {
  const images = (node.attrs.images as string[] | undefined) ?? [];

  return (
    <NodeViewWrapper className="my-4">
      <div className="rounded-lg border border-border bg-muted/30 p-3">
        <div className="mb-2 flex items-center gap-2 text-xs font-medium text-muted-foreground">
          <Images className="h-3.5 w-3.5" />
          Carousel · {images.length} {images.length === 1 ? "image" : "images"}
        </div>
        {images.length === 0 ? (
          <span className="text-sm text-muted-foreground">No images</span>
        ) : (
          <ArticleBodyCarousel images={images} title="Article gallery" compact />
        )}
      </div>
    </NodeViewWrapper>
  );
}
