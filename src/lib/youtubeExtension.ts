/**
 * Minimal Tiptap YouTube embed node. Replaces @tiptap/extension-youtube
 * so we don't depend on the package that ships without dist.
 */

import { Node, mergeAttributes } from "@tiptap/core";
import { getYoutubeEmbedSrc, isValidYoutubeUrl } from "./youtubeEmbed";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    youtube: {
      setYoutubeVideo: (options: { src: string; width?: number; height?: number }) => ReturnType;
    };
  }
}

const DEFAULT_WIDTH = 640;
const DEFAULT_HEIGHT = 360;

export const YoutubeExtension = Node.create({
  name: "youtube",

  addOptions() {
    return {
      inline: false,
      width: DEFAULT_WIDTH,
      height: DEFAULT_HEIGHT,
      HTMLAttributes: {},
    };
  },

  group() {
    return this.options.inline ? "inline" : "block";
  },

  draggable: true,

  addAttributes() {
    return {
      src: { default: null },
      width: { default: this.options.width },
      height: { default: this.options.height },
    };
  },

  parseHTML() {
    return [{ tag: 'div[data-youtube-video] iframe' }];
  },

  addCommands() {
    return {
      setYoutubeVideo:
        (options: { src: string; width?: number; height?: number }) =>
        ({ commands }) => {
          if (!isValidYoutubeUrl(options.src)) return false;
          return commands.insertContent({
            type: this.name,
            attrs: {
              src: options.src,
              width: options.width ?? this.options.width,
              height: options.height ?? this.options.height,
            },
          });
        },
    };
  },

  renderHTML({ HTMLAttributes }) {
    const embedSrc = getYoutubeEmbedSrc(HTMLAttributes.src);
    if (!embedSrc) return ["div", { "data-youtube-video": "" }, "Invalid URL"];

    const width = HTMLAttributes.width ?? this.options.width;
    const height = HTMLAttributes.height ?? this.options.height;

    return [
      "div",
      { "data-youtube-video": "" },
      [
        "iframe",
        mergeAttributes(this.options.HTMLAttributes, {
          src: embedSrc,
          width,
          height,
          allowfullscreen: "true",
          frameborder: "0",
        }),
      ],
    ];
  },
});

export { isValidYoutubeUrl } from "./youtubeEmbed";
