import { useEffect, useRef, useState } from "react";
import type { TFunction } from "i18next";
import { useTranslation } from "react-i18next";
import {
  Accessibility,
  ALargeSmall,
  ArrowDownToLine,
  Contrast,
  Eclipse,
  Minus,
  Palette,
  Plus,
  RotateCcw,
  SlidersHorizontal,
  Sun,
} from "lucide-react";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const STORAGE_LARGE = "tues-a11y-large-text";
const STORAGE_HC = "tues-a11y-high-contrast";
const STORAGE_VISUAL = "tues-a11y-visual";

const BRIGHTNESS_STEP = 0.12;
const CONTRAST_STEP = 0.15;
const MAX_BRIGHTNESS_STEPS = 3;
const MAX_CONTRAST_STEPS = 3;

type VisualState = {
  invert: boolean;
  grayscale: boolean;
  brightnessStep: number;
  contrastStep: number;
};

const defaultVisual: VisualState = {
  invert: false,
  grayscale: false,
  brightnessStep: 0,
  contrastStep: 0,
};

function parseVisual(raw: string | null): VisualState {
  if (!raw) return { ...defaultVisual };
  try {
    const o = JSON.parse(raw) as Partial<VisualState>;
    return {
      invert: Boolean(o.invert),
      grayscale: Boolean(o.grayscale),
      brightnessStep: clamp(
        Number(o.brightnessStep) || 0,
        -MAX_BRIGHTNESS_STEPS,
        MAX_BRIGHTNESS_STEPS,
      ),
      contrastStep: clamp(
        Number(o.contrastStep) || 0,
        -MAX_CONTRAST_STEPS,
        MAX_CONTRAST_STEPS,
      ),
    };
  } catch {
    return { ...defaultVisual };
  }
}

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function applyVisualFilter(v: VisualState) {
  const b = 1 + v.brightnessStep * BRIGHTNESS_STEP;
  const c = 1 + v.contrastStep * CONTRAST_STEP;
  const neutral =
    b === 1 && c === 1 && !v.grayscale && !v.invert;
  if (neutral) {
    document.documentElement.style.removeProperty("filter");
    return;
  }
  const parts: string[] = [];
  parts.push(`brightness(${b})`);
  parts.push(`contrast(${c})`);
  if (v.grayscale) parts.push("grayscale(1)");
  if (v.invert) {
    parts.push("invert(1)");
    parts.push("hue-rotate(180deg)");
  }
  document.documentElement.style.filter = parts.join(" ");
}

function applyLargeText(on: boolean) {
  document.documentElement.classList.toggle("a11y-large-text", on);
}

function applyHighContrast(on: boolean) {
  document.documentElement.classList.toggle("a11y-high-contrast", on);
}

/** English fallbacks so labels never show raw i18n keys if locale JSON is stale or partial. */
const a11y = {
  openMenu: "Open accessibility options",
  skipToMain: "Skip to main content",
  largerText: "Larger text",
  highContrast: "Higher contrast",
  colorAdjustGroup: "Color and display",
  invertColors: "Invert colors",
  grayscale: "Grayscale",
  brightness: "Brightness",
  dim: "Dimmer screen",
  brighten: "Brighter screen",
  displayContrast: "Contrast (display)",
  lessDisplayContrast: "Lower display contrast",
  moreDisplayContrast: "Raise display contrast",
  reset: "Reset display options",
  remoteDecor: "Display",
} as const;

function a11yLabel(t: TFunction, key: keyof typeof a11y) {
  return t(`accessibility.${key}`, { defaultValue: a11y[key] });
}

/** TV-remote style: raised keys, dark shell (reads as physical chrome in any site theme). */
const remoteShell =
  "min-w-[288px] max-w-[320px] rounded-[1.35rem] border border-zinc-700/90 bg-gradient-to-b from-zinc-800 via-zinc-900 to-zinc-950 p-3 shadow-[0_16px_40px_rgba(0,0,0,0.45),0_0_0_1px_rgba(255,255,255,0.06)_inset] ring-1 ring-black/40";

const remoteKey = cn(
  "flex flex-col items-center justify-center gap-1 rounded-xl border border-zinc-600/90 bg-gradient-to-b from-zinc-500/90 to-zinc-700 text-center text-[11px] font-semibold leading-tight text-zinc-50 shadow-[0_4px_0_rgb(24_24_27),0_6px_12px_rgba(0,0,0,0.35)] transition-[transform,box-shadow,background-color] duration-150",
  "hover:from-zinc-500 hover:to-zinc-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/90 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900",
  "active:translate-y-0.5 active:shadow-[0_1px_0_rgb(24_24_27),0_2px_6px_rgba(0,0,0,0.3)] disabled:pointer-events-none disabled:opacity-35",
);

const remoteKeyOn = cn(
  "border-amber-500/50 from-amber-800/80 to-amber-950/90 text-amber-50 shadow-[0_4px_0_rgb(120_53_15),0_0_20px_rgba(251_191_36/0.15)]",
);

const remoteWell =
  "rounded-2xl border border-zinc-900/80 bg-zinc-950/60 p-2 shadow-[inset_0_2px_8px_rgba(0,0,0,0.45)]";

const remoteRound = cn(
  "flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-zinc-600 bg-gradient-to-b from-zinc-500 to-zinc-700 text-zinc-50 shadow-[0_3px_0_rgb(24_24_27),0_4px_10px_rgba(0,0,0,0.35)] transition-[transform,box-shadow] duration-150",
  "hover:from-zinc-400 hover:to-zinc-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/90 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950",
  "active:translate-y-0.5 active:shadow-[0_1px_0_rgb(24_24_27)] disabled:pointer-events-none disabled:opacity-35",
);

/** Left-side FAB (mirrors FloatingLanguageSwitcher): skip to main + display toggles. */
export function FloatingAccessibilityButton() {
  const { t } = useTranslation("common");
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [visual, setVisual] = useState<VisualState>(() =>
    typeof window !== "undefined"
      ? parseVisual(window.localStorage.getItem(STORAGE_VISUAL))
      : { ...defaultVisual },
  );
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const l = localStorage.getItem(STORAGE_LARGE) === "1";
    const h = localStorage.getItem(STORAGE_HC) === "1";
    setLargeText(l);
    setHighContrast(h);
    applyLargeText(l);
    applyHighContrast(h);
  }, []);

  useEffect(() => {
    applyVisualFilter(visual);
    localStorage.setItem(STORAGE_VISUAL, JSON.stringify(visual));
  }, [visual]);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      if (rootRef.current?.contains(e.target as Node)) return;
      setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
    };
  }, [open]);

  if (location.pathname.startsWith("/admin") || location.pathname === "/login") {
    return null;
  }

  const skipToMain = () => {
    const main = document.querySelector("main");
    if (main instanceof HTMLElement) {
      if (!main.hasAttribute("tabindex")) main.setAttribute("tabindex", "-1");
      main.focus();
      main.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setOpen(false);
  };

  const toggleLarge = () => {
    const next = !largeText;
    setLargeText(next);
    localStorage.setItem(STORAGE_LARGE, next ? "1" : "0");
    applyLargeText(next);
  };

  const toggleContrast = () => {
    const next = !highContrast;
    setHighContrast(next);
    localStorage.setItem(STORAGE_HC, next ? "1" : "0");
    applyHighContrast(next);
  };

  const setVisualPatch = (patch: Partial<VisualState>) => {
    setVisual((prev) => ({ ...prev, ...patch }));
  };

  const adjustBrightness = (delta: number) => {
    setVisual((prev) => ({
      ...prev,
      brightnessStep: clamp(
        prev.brightnessStep + delta,
        -MAX_BRIGHTNESS_STEPS,
        MAX_BRIGHTNESS_STEPS,
      ),
    }));
  };

  const adjustContrast = (delta: number) => {
    setVisual((prev) => ({
      ...prev,
      contrastStep: clamp(
        prev.contrastStep + delta,
        -MAX_CONTRAST_STEPS,
        MAX_CONTRAST_STEPS,
      ),
    }));
  };

  const resetAll = () => {
    setLargeText(false);
    setHighContrast(false);
    setVisual({ ...defaultVisual });
    localStorage.removeItem(STORAGE_LARGE);
    localStorage.removeItem(STORAGE_HC);
    localStorage.removeItem(STORAGE_VISUAL);
    applyLargeText(false);
    applyHighContrast(false);
    document.documentElement.style.removeProperty("filter");
  };

  return (
    <div ref={rootRef} className="fixed bottom-8 left-8 z-[100]">
      <button
        type="button"
        className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card shadow-lg transition-colors hover:bg-muted"
        aria-label={a11yLabel(t, "openMenu")}
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((o) => !o)}
      >
        <Accessibility className="h-5 w-5 text-foreground" aria-hidden />
      </button>
      {open ? (
        <div
          className={cn("absolute bottom-14 left-0 flex flex-col gap-2.5", remoteShell)}
          role="menu"
          aria-label={a11yLabel(t, "openMenu")}
        >
          {/* IR / branding strip — decorative */}
          <div className="flex flex-col items-center gap-1.5 pb-0.5" aria-hidden>
            <div className="h-1.5 w-14 rounded-full bg-zinc-950 shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)] ring-1 ring-zinc-700/50" />
            <span className="text-[9px] font-bold uppercase tracking-[0.35em] text-zinc-500">
              {a11yLabel(t, "remoteDecor")}
            </span>
          </div>

          <button
            type="button"
            role="menuitem"
            className={cn(remoteKey, "min-h-[3rem] flex-row gap-2 px-3 py-2.5")}
            onClick={skipToMain}
          >
            <ArrowDownToLine className="h-5 w-5 shrink-0 text-zinc-200" aria-hidden />
            <span className="text-left text-xs font-semibold leading-snug">
              {a11yLabel(t, "skipToMain")}
            </span>
          </button>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              role="menuitemcheckbox"
              aria-pressed={largeText}
              className={cn(remoteKey, "min-h-[4.25rem] px-1.5 py-2", largeText && remoteKeyOn)}
              onClick={toggleLarge}
            >
              <ALargeSmall className="h-5 w-5 text-zinc-200" aria-hidden />
              <span>{a11yLabel(t, "largerText")}</span>
            </button>
            <button
              type="button"
              role="menuitemcheckbox"
              aria-pressed={highContrast}
              className={cn(remoteKey, "min-h-[4.25rem] px-1.5 py-2", highContrast && remoteKeyOn)}
              onClick={toggleContrast}
            >
              <Contrast className="h-5 w-5 text-zinc-200" aria-hidden />
              <span>{a11yLabel(t, "highContrast")}</span>
            </button>
            <button
              type="button"
              role="menuitemcheckbox"
              aria-pressed={visual.invert}
              className={cn(remoteKey, "min-h-[4.25rem] px-1.5 py-2", visual.invert && remoteKeyOn)}
              onClick={() => setVisualPatch({ invert: !visual.invert })}
            >
              <Eclipse className="h-5 w-5 text-zinc-200" aria-hidden />
              <span>{a11yLabel(t, "invertColors")}</span>
            </button>
            <button
              type="button"
              role="menuitemcheckbox"
              aria-pressed={visual.grayscale}
              className={cn(remoteKey, "min-h-[4.25rem] px-1.5 py-2", visual.grayscale && remoteKeyOn)}
              onClick={() => setVisualPatch({ grayscale: !visual.grayscale })}
            >
              <Palette className="h-5 w-5 text-zinc-200" aria-hidden />
              <span>{a11yLabel(t, "grayscale")}</span>
            </button>
          </div>

          <div className="flex flex-col gap-2" role="group" aria-label={a11yLabel(t, "colorAdjustGroup")}>
            <div className={remoteWell}>
              <p className="mb-2 text-center text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                {a11yLabel(t, "brightness")}
              </p>
              <div className="flex items-center justify-between gap-2 px-0.5">
                <button
                  type="button"
                  role="menuitem"
                  aria-label={a11yLabel(t, "dim")}
                  disabled={visual.brightnessStep <= -MAX_BRIGHTNESS_STEPS}
                  className={remoteRound}
                  onClick={() => adjustBrightness(-1)}
                >
                  <Minus className="h-5 w-5" aria-hidden />
                </button>
                <div className="flex flex-col items-center gap-0.5 text-zinc-500">
                  <Sun className="h-6 w-6 text-amber-400/90" aria-hidden />
                  <span className="font-mono text-[10px] tabular-nums text-zinc-400">
                    {visual.brightnessStep > 0 ? `+${visual.brightnessStep}` : visual.brightnessStep}
                  </span>
                </div>
                <button
                  type="button"
                  role="menuitem"
                  aria-label={a11yLabel(t, "brighten")}
                  disabled={visual.brightnessStep >= MAX_BRIGHTNESS_STEPS}
                  className={remoteRound}
                  onClick={() => adjustBrightness(1)}
                >
                  <Plus className="h-5 w-5" aria-hidden />
                </button>
              </div>
            </div>
            <div className={remoteWell}>
              <p className="mb-2 text-center text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                {a11yLabel(t, "displayContrast")}
              </p>
              <div className="flex items-center justify-between gap-2 px-0.5">
                <button
                  type="button"
                  role="menuitem"
                  aria-label={a11yLabel(t, "lessDisplayContrast")}
                  disabled={visual.contrastStep <= -MAX_CONTRAST_STEPS}
                  className={remoteRound}
                  onClick={() => adjustContrast(-1)}
                >
                  <Minus className="h-5 w-5" aria-hidden />
                </button>
                <div className="flex flex-col items-center gap-0.5 text-zinc-500">
                  <SlidersHorizontal className="h-6 w-6 text-amber-400/90" aria-hidden />
                  <span className="font-mono text-[10px] tabular-nums text-zinc-400">
                    {visual.contrastStep > 0 ? `+${visual.contrastStep}` : visual.contrastStep}
                  </span>
                </div>
                <button
                  type="button"
                  role="menuitem"
                  aria-label={a11yLabel(t, "moreDisplayContrast")}
                  disabled={visual.contrastStep >= MAX_CONTRAST_STEPS}
                  className={remoteRound}
                  onClick={() => adjustContrast(1)}
                >
                  <Plus className="h-5 w-5" aria-hidden />
                </button>
              </div>
            </div>
          </div>

          <button
            type="button"
            role="menuitem"
            className={cn(
              remoteKey,
              "mt-0.5 min-h-[2.75rem] flex-row gap-2 border-red-900/40 bg-gradient-to-b from-red-950/50 to-zinc-900 text-zinc-300 hover:from-red-950/70 hover:to-zinc-800",
            )}
            onClick={resetAll}
          >
            <RotateCcw className="h-4 w-4 shrink-0 text-red-300/90" aria-hidden />
            <span className="text-xs">{a11yLabel(t, "reset")}</span>
          </button>
        </div>
      ) : null}
    </div>
  );
}
