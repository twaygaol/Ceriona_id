"use client";

import { useEffect, useState } from "react";

interface CountdownSectionProps {
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
  targetDate?: string;
  labels?: { days?: string; hours?: string; minutes?: string; seconds?: string };
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(target: Date): TimeLeft | null {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

export default function CountdownSection({
  colors,
  fonts,
  layout,
  targetDate,
  labels,
}: CountdownSectionProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(() =>
    targetDate ? calculateTimeLeft(new Date(targetDate)) : null,
  );

  useEffect(() => {
    if (!targetDate) return;
    const target = new Date(targetDate);
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(target));
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <section
      className="relative px-6 py-20 md:px-12"
      style={{ backgroundColor: colors.background }}
    >
      <div
        className="mx-auto text-center"
        style={{ maxWidth: layout.maxWidth }}
      >
        <h2
          className="mb-12 text-3xl font-light tracking-wide md:text-4xl"
          style={{ fontFamily: fonts.heading, color: colors.text }}
        >
          Hitung Mundur
        </h2>

        {timeLeft === null ? (
          <p
            className="text-xl"
            style={{ fontFamily: fonts.body, color: colors.muted }}
          >
            Acara telah dilaksanakan
          </p>
        ) : (
          <div className="flex justify-center gap-4 md:gap-8">
            {(
              [
                { value: timeLeft.days, label: labels?.days || "Hari" },
                { value: timeLeft.hours, label: labels?.hours || "Jam" },
                { value: timeLeft.minutes, label: labels?.minutes || "Menit" },
                { value: timeLeft.seconds, label: labels?.seconds || "Detik" },
              ] as const
            ).map((item) => (
              <div
                key={item.label}
                className="flex w-20 flex-col items-center p-4 md:w-24"
                style={{
                  backgroundColor: colors.surface,
                  borderRadius: layout.borderRadius,
                }}
              >
                <span
                  className="text-3xl font-light md:text-4xl"
                  style={{
                    fontFamily: fonts.heading,
                    color: colors.primary,
                  }}
                >
                  {pad(item.value)}
                </span>
                <span
                  className="mt-1 text-xs tracking-wider uppercase"
                  style={{ fontFamily: fonts.body, color: colors.muted }}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export { CountdownSection };
