"use client";

import { useState, useCallback } from "react";
import type { CoreGiftBank } from "../../types";

export function useGift() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = useCallback(async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    }
  }, []);

  return {
    banks: [] as CoreGiftBank[],
    copyToClipboard,
    copiedIndex,
  };
}

export function formatAccountNumber(num: string): string {
  return num.replace(/\s/g, "").replace(/(.{4})/g, "$1 ").trim();
}
