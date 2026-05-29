"use client";

import { useEffect, useState } from "react";
import { MessageCircleHeart } from "lucide-react";
import axios from "axios";

interface Wish {
  id: string;
  name: string;
  message: string;
  createdAt: string;
}

interface WishSectionProps {
  invitation: any;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    accent: string;
    muted: string;
  };
  fonts: { heading: string; body: string; quote: string };
  layout: {
    borderRadius: string;
    maxWidth: string;
    spacing: string;
    buttonStyle: string;
    containerStyle: string;
  };
}

export default function WishSection({
  invitation,
  colors,
  fonts,
  layout,
}: WishSectionProps) {
  const [wishes, setWishes] = useState<Wish[]>([]);

  useEffect(() => {
    if (!invitation?.id) return;

    const fetchWishes = async () => {
      try {
        const res = await axios.get(`/api/wishes/${invitation.id}`);
        setWishes(res.data?.data || res.data || []);
      } catch {
        // silently fail
      }
    };

    fetchWishes();
    const interval = setInterval(fetchWishes, 10000);
    return () => clearInterval(interval);
  }, [invitation?.id]);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <section
      className="relative px-6 py-20 md:px-12"
      style={{ backgroundColor: colors.surface }}
    >
      <div
        className="mx-auto"
        style={{ maxWidth: layout.maxWidth }}
      >
        <MessageCircleHeart
          size={28}
          className="mx-auto mb-4"
          style={{ color: colors.primary }}
        />

        <h2
          className="mb-12 text-center text-3xl font-light tracking-wide md:text-4xl"
          style={{ fontFamily: fonts.heading, color: colors.text }}
        >
          Ucapan
        </h2>

        {wishes.length === 0 ? (
          <p
            className="text-center text-lg"
            style={{ fontFamily: fonts.body, color: colors.muted }}
          >
            Belum ada ucapan
          </p>
        ) : (
          <div className="mx-auto max-w-lg space-y-4">
            {wishes.map((wish) => (
              <div
                key={wish.id}
                className="p-5"
                style={{
                  backgroundColor: colors.background,
                  borderRadius: layout.borderRadius,
                }}
              >
                <div className="mb-2 flex items-center justify-between">
                  <p
                    className="font-medium"
                    style={{
                      fontFamily: fonts.body,
                      color: colors.primary,
                    }}
                  >
                    {wish.name}
                  </p>
                  <span
                    className="text-xs"
                    style={{ fontFamily: fonts.body, color: colors.muted }}
                  >
                    {formatDate(wish.createdAt)}
                  </span>
                </div>
                <p
                  className="text-sm leading-relaxed"
                  style={{ fontFamily: fonts.quote, color: colors.text }}
                >
                  {wish.message}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export { WishSection };
