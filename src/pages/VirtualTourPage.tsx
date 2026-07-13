import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Viewer, EquirectangularAdapter } from "@photo-sphere-viewer/core";
import { VirtualTourPlugin } from "@photo-sphere-viewer/virtual-tour-plugin";
import { GalleryPlugin } from "@photo-sphere-viewer/gallery-plugin";
import { MarkersPlugin } from "@photo-sphere-viewer/markers-plugin";
import "@photo-sphere-viewer/core/index.css";
import "@photo-sphere-viewer/virtual-tour-plugin/index.css";
import "@photo-sphere-viewer/gallery-plugin/index.css";
import "@photo-sphere-viewer/markers-plugin/index.css";
import "./virtual-tour-overrides.css";

const LOCAL_TOUR_ASSETS = "/virtual-tour/";

const TOUR_NODE_CONFIG = [
  {
    id: "1",
    panorama: LOCAL_TOUR_ASSETS + "photo_studio_loft_hall.jpg",
    thumbnail: LOCAL_TOUR_ASSETS + "photo_studio_loft_hall.jpg",
    links: [{ nodeId: "2" }],
    gps: [0, 0, 1] as [number, number, number],
    panoData: { poseHeading: 0 },
  },
  {
    id: "2",
    panorama: LOCAL_TOUR_ASSETS + "aviation_museum.jpg",
    thumbnail: LOCAL_TOUR_ASSETS + "aviation_museum.jpg",
    links: [{ nodeId: "1" }, { nodeId: "3" }],
    gps: [0.001, 0, 1] as [number, number, number],
    panoData: { poseHeading: 90 },
  },
  {
    id: "3",
    panorama: LOCAL_TOUR_ASSETS + "brown_photostudio_02.jpg",
    thumbnail: LOCAL_TOUR_ASSETS + "brown_photostudio_02.jpg",
    links: [{ nodeId: "2" }, { nodeId: "4" }],
    gps: [0.002, 0, 1] as [number, number, number],
    panoData: { poseHeading: 180 },
  },
  {
    id: "4",
    panorama: LOCAL_TOUR_ASSETS + "kloppenheim_02.jpg",
    thumbnail: LOCAL_TOUR_ASSETS + "kloppenheim_02.jpg",
    links: [{ nodeId: "3" }],
    gps: [0.003, 0, 1] as [number, number, number],
    panoData: { poseHeading: 270 },
  },
] as const;

type TourNode = (typeof TOUR_NODE_CONFIG)[number] & { name: string; caption: string };

function createViewerOptions(container: HTMLDivElement, nodes: TourNode[]) {
  return {
    container,
    touchmoveTwoFingers: true,
    mousewheelCtrlKey: true,
    defaultYaw: "130deg",
    moveInertia: false,
    navbar: "zoom move gallery caption fullscreen",
    rendererParameters: { antialias: false },
    adapter: EquirectangularAdapter.withConfig({ resolution: 32 }),
    plugins: [
      MarkersPlugin,
      [
        GalleryPlugin,
        { thumbnailSize: { width: 80, height: 80 } },
      ],
      [
        VirtualTourPlugin,
        {
          positionMode: "gps",
          renderMode: "3d",
          preload: false,
          transitionOptions: {
            showLoader: false,
            speed: 0,
            effect: "none",
            rotation: false,
          },
          getLinkTooltip(content: string, link: { nodeId: string }) {
            const target = nodes.find((n) => n.id === link.nodeId);
            if (!target) return content;
            return `<div class="vt-link-card">
              <div class="vt-link-card__image"><img src="${target.thumbnail}" alt="" loading="lazy" /></div>
              <div class="vt-link-card__body">
                <span class="vt-link-card__title">${target.name}</span>
                <span class="vt-link-card__caption">${target.caption}</span>
              </div>
            </div>`;
          },
        },
      ],
    ],
  };
}

export default function VirtualTourPage() {
  const { t, i18n } = useTranslation("home");
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<Viewer | null>(null);
  const [loading, setLoading] = useState(true);

  const tourNodes = useMemo<TourNode[]>(
    () =>
      TOUR_NODE_CONFIG.map((node) => ({
        ...node,
        name: t(`virtualTour.nodes.${node.id}.name`),
        caption: t(`virtualTour.nodes.${node.id}.caption`),
      })),
    [t],
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let cancelled = false;
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (cancelled) return;

        const viewer = new Viewer(createViewerOptions(container, tourNodes) as ConstructorParameters<typeof Viewer>[0]);
        viewerRef.current = viewer;

        const virtualTour = viewer.getPlugin(VirtualTourPlugin);
        if (virtualTour && "setNodes" in virtualTour && typeof virtualTour.setNodes === "function") {
          (virtualTour as { setNodes: (nodes: unknown[], nodeId?: string) => void }).setNodes(tourNodes, "1");
        }
        viewer.loader.hide();
        viewer.addEventListener("ready", () => setLoading(false), { once: true });
      });
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(id);
      if (viewerRef.current) {
        viewerRef.current.destroy();
        viewerRef.current = null;
      }
    };
  }, [i18n.language, tourNodes]);

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Header />
      <section
        className="relative overflow-hidden"
        style={{
          marginTop: "var(--header-height)",
          height: "calc(100dvh - var(--header-height))",
          minHeight: "calc(100dvh - var(--header-height))",
        }}
      >
        <div className="relative w-full h-full flex flex-col">
          <div id="viewer" ref={containerRef} className="w-full h-full min-h-0 flex-1 rounded-none" />
        </div>
        {loading && (
          <div className="virtual-tour-loading" aria-hidden="true">
            <div className="virtual-tour-loading__container">
              <div className="virtual-tour-loading__ball" />
              <div className="virtual-tour-loading__ball" />
              <div className="virtual-tour-loading__ball" />
              <div className="virtual-tour-loading__ball" />
              <div className="virtual-tour-loading__ball" />
              <div className="virtual-tour-loading__ball" />
              <div className="virtual-tour-loading__ball" />
            </div>
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
}
