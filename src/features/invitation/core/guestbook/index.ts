"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import type { CoreWishData } from "../../types";

export function useGuestbook(invitationId: string) {
  const [wishes, setWishes] = useState<CoreWishData[]>([]);
  const [loading, setLoading] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchWishes = useCallback(async () => {
    try {
      const res = await axios.get(`/api/wishes/${invitationId}`);
      setWishes(res.data.wishes ?? res.data ?? []);
    } catch {
      // silent fail on refresh
    }
  }, [invitationId]);

  useEffect(() => {
    fetchWishes();
    intervalRef.current = setInterval(fetchWishes, 15000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [fetchWishes]);

  const addWish = useCallback(
    async (name: string, message: string) => {
      setLoading(true);
      try {
        await axios.post(`/api/wishes/${invitationId}`, { name, message });
        await fetchWishes();
      } finally {
        setLoading(false);
      }
    },
    [invitationId, fetchWishes]
  );

  const refreshWishes = useCallback(() => {
    fetchWishes();
  }, [fetchWishes]);

  return { wishes, loading, addWish, refreshWishes };
}
