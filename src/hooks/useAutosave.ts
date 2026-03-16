/**
 * Debounced autosave for article editor (or any draft).
 * Calls save with the current value after a quiet period.
 */

import { useEffect, useRef } from "react";

export interface UseAutosaveOptions<T> {
  /** Current value to save (e.g. Tiptap doc or form state). */
  value: T;
  /** Called when the value has been unchanged for delayMs. */
  onSave: (value: T) => void | Promise<void>;
  /** Debounce delay in ms. Default 2000. */
  delayMs?: number;
  /** If true, do not run save (e.g. when not authenticated). */
  disabled?: boolean;
}

export function useAutosave<T>({
  value,
  onSave,
  delayMs = 2000,
  disabled = false,
}: UseAutosaveOptions<T>): void {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastSavedRef = useRef<string>(JSON.stringify(value));

  useEffect(() => {
    if (disabled) return;

    const payload = JSON.stringify(value);
    if (payload === lastSavedRef.current) return;

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      timeoutRef.current = null;
      lastSavedRef.current = payload;
      void Promise.resolve(onSave(value)).catch((e) => console.error("Autosave failed", e));
    }, delayMs);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [value, onSave, delayMs, disabled]);
}
