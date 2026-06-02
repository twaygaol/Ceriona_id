import { useEffect } from "react";
import type { UseFormWatch } from "react-hook-form";

export function useAutoSaveForm<T extends Record<string, any>>(
  watch: UseFormWatch<T>,
  onChange?: (data: T) => void
) {
  useEffect(() => {
    if (!onChange) return;
    const sub = watch((value) => onChange(value as T));
    return () => sub.unsubscribe();
  }, [watch, onChange]);
}
