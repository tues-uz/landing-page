import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";
import { useLocation } from "react-router-dom";

const LANGUAGES = [
  { code: "uz", short: "UZ" },
  { code: "en", short: "EN" },
  { code: "ru", short: "RU" },
] as const;

/** Fixed globe FAB + popover; same row as home scroll-to-top: left of it (right-8 + w-14 + gap). */
export function FloatingLanguageSwitcher() {
  const { t, i18n } = useTranslation("common");
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

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

  const active = (i18n.resolvedLanguage ?? i18n.language ?? "en").slice(0, 2);

  return (
    <div
      ref={rootRef}
      className="fixed bottom-8 z-[100] right-[calc(2rem+3.5rem+0.75rem)]"
    >
      <button
        type="button"
        className="w-12 h-12 rounded-full bg-card border border-border shadow-lg flex items-center justify-center hover:bg-muted transition-colors"
        aria-label={t("changeLanguage")}
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => setOpen((o) => !o)}
      >
        <Globe className="w-5 h-5 text-foreground" aria-hidden />
      </button>
      {open ? (
        <div
          className="absolute bottom-14 right-0 bg-card border border-border rounded-2xl shadow-xl p-2 flex flex-col gap-1 min-w-14"
          role="listbox"
          aria-label={t("changeLanguage")}
        >
          {LANGUAGES.map((lang) => {
            const isActive = active === lang.code;
            return (
              <button
                key={lang.code}
                type="button"
                role="option"
                aria-selected={isActive}
                className={
                  isActive
                    ? "px-3 py-1.5 rounded-lg text-xs font-bold transition-colors bg-primary text-primary-foreground"
                    : "px-3 py-1.5 rounded-lg text-xs font-bold transition-colors text-muted-foreground hover:bg-muted hover:text-foreground"
                }
                onClick={() => {
                  void i18n.changeLanguage(lang.code);
                  setOpen(false);
                }}
              >
                {lang.short}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
