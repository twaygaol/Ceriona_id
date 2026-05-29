"use client";

import { Copy, Gift } from "lucide-react";
import { toast } from "sonner";

interface BankAccount {
  bank: string;
  accountNumber: string;
  accountName: string;
}

interface GiftSectionProps {
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
  banks?: BankAccount[];
}

export default function GiftSection({
  colors,
  fonts,
  layout,
  banks,
}: GiftSectionProps) {
  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Nomor rekening berhasil disalin");
    } catch {
      toast.error("Gagal menyalin nomor rekening");
    }
  };

  return (
    <section
      className="relative px-6 py-20 md:px-12"
      style={{ backgroundColor: colors.surface }}
    >
      <div
        className="mx-auto text-center"
        style={{ maxWidth: layout.maxWidth }}
      >
        <Gift
          size={28}
          className="mx-auto mb-4"
          style={{ color: colors.primary }}
        />

        <h2
          className="mb-4 text-3xl font-light tracking-wide md:text-4xl"
          style={{ fontFamily: fonts.heading, color: colors.text }}
        >
          Hadiah
        </h2>

        <p
          className="mb-10 text-sm leading-relaxed"
          style={{ fontFamily: fonts.body, color: colors.muted }}
        >
          Doa restu Anda merupakan hadiah terberi bagi kami. Namun jika
          memberi adalah ungkapan tanda kasih, Anda dapat memberi melalui:
        </p>

        {(!banks || banks.length === 0) && (
          <p
            className="text-lg"
            style={{ fontFamily: fonts.body, color: colors.muted }}
          >
            Belum ada informasi rekening
          </p>
        )}

        {banks && banks.length > 0 && (
          <div className="space-y-4">
            {banks.map((bank, index) => (
              <div
                key={index}
                className="mx-auto flex max-w-md items-center justify-between p-5 text-left"
                style={{
                  backgroundColor: colors.background,
                  borderRadius: layout.borderRadius,
                }}
              >
                <div>
                  <p
                    className="text-sm font-semibold uppercase tracking-wider"
                    style={{
                      fontFamily: fonts.body,
                      color: colors.primary,
                    }}
                  >
                    {bank.bank}
                  </p>
                  <p
                    className="mt-1 text-lg font-light tracking-wider"
                    style={{ fontFamily: fonts.body, color: colors.text }}
                  >
                    {bank.accountNumber}
                  </p>
                  <p
                    className="text-sm"
                    style={{ fontFamily: fonts.body, color: colors.muted }}
                  >
                    a.n {bank.accountName}
                  </p>
                </div>
                <button
                  onClick={() => handleCopy(bank.accountNumber)}
                  className="shrink-0 p-2 transition-opacity hover:opacity-70"
                  style={{ color: colors.primary }}
                >
                  <Copy size={20} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export { GiftSection };
