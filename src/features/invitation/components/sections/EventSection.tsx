"use client";

import { CalendarHeart, Clock, MapPin } from "lucide-react";

interface EventSectionProps {
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
  eventDate?: string;
  eventTime?: string;
  eventLocation?: string;
  googleMapsUrl?: string;
}

export default function EventSection({
  colors,
  fonts,
  layout,
  eventDate,
  eventTime,
  eventLocation,
  googleMapsUrl,
}: EventSectionProps) {
  const formatDate = (date?: string) => {
    if (!date) return "Tanggal acara";
    return new Date(date).toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const buttonClass =
    layout.buttonStyle === "pill"
      ? "rounded-full"
      : layout.buttonStyle === "rounded"
        ? "rounded-lg"
        : "rounded-md";

  return (
    <section
      className="relative px-6 py-20 md:px-12"
      style={{ backgroundColor: colors.surface }}
    >
      <div
        className="mx-auto"
        style={{ maxWidth: layout.maxWidth }}
      >
        <h2
          className="mb-12 text-center text-3xl font-light tracking-wide md:text-4xl"
          style={{ fontFamily: fonts.heading, color: colors.text }}
        >
          Acara
        </h2>

        <div
          className="p-8"
          style={{
            backgroundColor: colors.background,
            borderRadius: layout.borderRadius,
          }}
        >
          <div className="space-y-8">
            {eventDate && (
              <div className="flex items-center gap-4">
                <CalendarHeart
                  size={28}
                  style={{ color: colors.primary }}
                />
                <div>
                  <p
                    className="text-sm tracking-widest uppercase"
                    style={{ fontFamily: fonts.body, color: colors.muted }}
                  >
                    Tanggal
                  </p>
                  <p
                    className="text-lg"
                    style={{ fontFamily: fonts.body, color: colors.text }}
                  >
                    {formatDate(eventDate)}
                  </p>
                </div>
              </div>
            )}

            {eventTime && (
              <div className="flex items-center gap-4">
                <Clock size={28} style={{ color: colors.primary }} />
                <div>
                  <p
                    className="text-sm tracking-widest uppercase"
                    style={{ fontFamily: fonts.body, color: colors.muted }}
                  >
                    Waktu
                  </p>
                  <p
                    className="text-lg"
                    style={{ fontFamily: fonts.body, color: colors.text }}
                  >
                    {eventTime}
                  </p>
                </div>
              </div>
            )}

            {eventLocation && (
              <div className="flex items-start gap-4">
                <MapPin
                  size={28}
                  className="mt-1 shrink-0"
                  style={{ color: colors.primary }}
                />
                <div>
                  <p
                    className="text-sm tracking-widest uppercase"
                    style={{ fontFamily: fonts.body, color: colors.muted }}
                  >
                    Lokasi
                  </p>
                  <p
                    className="text-lg"
                    style={{ fontFamily: fonts.body, color: colors.text }}
                  >
                    {eventLocation}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div
            className="mx-auto my-8 h-px w-24"
            style={{ backgroundColor: colors.primary }}
          />

          {googleMapsUrl && (
            <div className="text-center">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-block px-6 py-3 text-sm font-medium transition-all hover:opacity-90 ${buttonClass}`}
                style={{
                  backgroundColor: colors.primary,
                  color: colors.surface,
                  borderRadius:
                    layout.buttonStyle === "pill"
                      ? "9999px"
                      : layout.buttonStyle === "rounded"
                        ? "8px"
                        : "4px",
                }}
              >
                Lihat di Google Maps
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export { EventSection };
