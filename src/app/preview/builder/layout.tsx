import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Preview",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
};

export default function PreviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
