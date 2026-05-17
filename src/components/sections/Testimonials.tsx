const testimonials = [
  {
    stars: 5,
    text: '"Template Dark Luxury-nya luar biasa! Banyak tamu yang menyebut undangan kami sebagai yang paling cantik yang pernah mereka terima."',
    author: "Ahmad & Raisya",
    role: "Menikah 17 Mei 2025 · Jakarta",
    initials: "A&R",
  },
  {
    stars: 5,
    text: '"Fitur RSVP-nya sangat membantu! Saya bisa pantau siapa saja yang hadir langsung dari dashboard. Simpel dan profesional."',
    author: "Dimas & Putri",
    role: "Menikah 3 Maret 2025 · Surabaya",
    initials: "D&P",
  },
  {
    stars: 5,
    text: '"Undangan digitalnya sangat smooth dan elegan. Fitur musik backgroundnya bikin tamu terharu saat membuka. Highly recommended!"',
    author: "Rizky & Salsabila",
    role: "Menikah 24 Agustus 2025 · Bandung",
    initials: "R&S",
  },
];

export function Testimonials() {
  return (
    <section className="py-24 px-5 md:px-8 bg-[#FAF7F2]">
      <div className="max-w-[1000px] mx-auto">
        <span className="section-label">Kata Mereka</span>
        <h2 className="section-title">
          Pasangan yang <em>Bahagia</em>
        </h2>
        <p className="section-desc">
          Ribuan pasangan sudah mempercayakan undangan digital mereka kepada kami.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testi, idx) => (
            <div key={idx} className="bg-white border border-[#C9A96E]/15 rounded-sm p-8">
              <div className="text-[#C9A96E] text-sm tracking-wide mb-4">
                {"★".repeat(testi.stars)}
              </div>
              <p className="font-serif text-base font-light italic text-[#4A3728] leading-relaxed mb-5">
                {testi.text}
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center font-serif text-sm font-normal bg-[#F5EFE3] text-[#7A5C42] border border-[#E8D5B0]">
                  {testi.initials}
                </div>
                <div>
                  <div className="text-sm font-medium text-[#4A3728]">{testi.author}</div>
                  <div className="text-[0.7rem] text-[#7A5C42] font-light">{testi.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}