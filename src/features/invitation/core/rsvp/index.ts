"use client";

import { useState, useCallback } from "react";
import axios from "axios";
import type { CoreRSVPData } from "../../types";

export function useRSVP(invitationId: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitRSVP = useCallback(
    async (data: Partial<CoreRSVPData>) => {
      setLoading(true);
      setError(null);
      try {
        const validation = validateRSVP(data);
        if (!validation.valid) {
          throw new Error(validation.error);
        }
        await axios.post(`/api/rsvp/${invitationId}`, data);
      } catch (err: any) {
        const message =
          err instanceof Error ? err.message : "Gagal mengirim konfirmasi";
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [invitationId]
  );

  return { submitRSVP, loading, error };
}

export function validateRSVP(data: Partial<CoreRSVPData>): {
  valid: boolean;
  error?: string;
} {
  if (!data.name || data.name.trim() === "") {
    return { valid: false, error: "Nama wajib diisi" };
  }
  if (
    !data.attendance ||
    !["hadir", "tidak hadir", "ragu"].includes(data.attendance)
  ) {
    return { valid: false, error: "Kehadiran wajib dipilih" };
  }
  return { valid: true };
}
