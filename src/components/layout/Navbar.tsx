"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Tema", href: "#themes" },
  { label: "Fitur", href: "#features" },
  { label: "Harga", href: "/#pricing" },
  { label: "FAQ", href: "/#faq" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-100 transition-all duration-500",
        "px-5 md:px-12 py-4 md:py-5",
        isScrolled
          ? "bg-[#fffaf4]/85 backdrop-blur-xl border-b border-[#241A16]/10"
          : "bg-transparent"
      )}
    >
      <div className="max-w-[1400px] mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-serif text-4xl md:text-2xl font-semibold text-[#241A16] tracking-wide">
          Cerio<span className="text-[#C9A96E]">na</span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-8 list-none">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
            className="text-xs font-semibold tracking-[0.12em] uppercase text-[#6F5A4E] hover:text-[#241A16] transition-colors"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <Link
          href="/dashboard"
          prefetch={false}
          className="hidden rounded-full bg-[#241A16] px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.1em] text-[#F6E7C8] transition-all hover:bg-[#3A2A22] md:inline-block"
        >
          Mulai Gratis
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-[#4A3728]"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-[#FAF7F2] border-b border-[#C9A96E]/15 py-6 px-5 flex flex-col gap-4 md:hidden">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium tracking-wide text-[#4A3728] hover:text-[#9E7A3E]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <Link
              href="/dashboard"
              prefetch={false}
              className="inline-block px-6 py-2 bg-[#4A3728] text-[#E8D5B0] text-sm font-medium tracking-wide uppercase rounded-sm text-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Mulai Gratis
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
