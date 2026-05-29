import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LenisProvider } from "@/components/layout/LenisProvider";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LenisProvider>
      <Navbar />
      {children}
      <Footer />
    </LenisProvider>
  );
}