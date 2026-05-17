// src/app/layout.tsx
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { LenisProvider } from "@/components/layout/LenisProvider";
import { Toaster } from "sonner";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <LenisProvider>
            {children}
            <Toaster position="top-right" richColors />
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}