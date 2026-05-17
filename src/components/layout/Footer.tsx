import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#1A1410] py-12 px-5 md:px-12 text-[#E8D5B0]">
      <div className="max-w-[1100px] mx-auto">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <Link href="/" className="font-serif text-xl font-semibold text-[#E8D5B0] tracking-wide inline-block mb-4">
              Kundang<span className="text-[#C9A96E]">an</span>
            </Link>
            <p className="text-sm text-[#E8D5B0]/50 leading-relaxed font-light">
              Platform undangan digital premium untuk momen pernikahan paling berkesan dalam hidup Anda.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h3 className="text-[0.65rem] font-medium tracking-[0.2em] uppercase text-[#C9A96E] mb-4">Platform</h3>
            <ul className="space-y-2">
              {["Template", "Harga", "Fitur", "Demo"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm text-[#E8D5B0]/50 hover:text-[#C9A96E] transition-colors font-light">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-[0.65rem] font-medium tracking-[0.2em] uppercase text-[#C9A96E] mb-4">Perusahaan</h3>
            <ul className="space-y-2">
              {["Tentang Kami", "Blog", "Karir", "Press"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm text-[#E8D5B0]/50 hover:text-[#C9A96E] transition-colors font-light">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Bantuan */}
          <div>
            <h3 className="text-[0.65rem] font-medium tracking-[0.2em] uppercase text-[#C9A96E] mb-4">Bantuan</h3>
            <ul className="space-y-2">
              {["Pusat Bantuan", "Kontak", "WhatsApp", "Status"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm text-[#E8D5B0]/50 hover:text-[#C9A96E] transition-colors font-light">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6 border-t border-[#C9A96E]/10">
          <span className="text-xs text-[#E8D5B0]/30 font-light">
            © 2025 Kundangan. Dibuat dengan ♥ di Indonesia.
          </span>
          <div className="flex gap-6">
            {["Privasi", "Syarat & Ketentuan", "Cookie"].map((item) => (
              <Link key={item} href="#" className="text-xs text-[#E8D5B0]/30 hover:text-[#C9A96E] transition-colors">
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}