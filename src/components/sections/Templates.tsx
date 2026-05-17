"use client";
import { cn } from "@/lib/utils";

const templates = [
  {
    id: "elegant",
    name: "Elegant Wedding",
    features: "Countdown · Gallery · RSVP · Maps",
    type: "elegant",
    popular: true,
    colors: "from-[#2C2420] to-[#6B4F38]",
    textColor: "text-[#E8D5B0]",
    couples: "Rizky & Salsabila",
    date: "24 · Agustus · 2025",
  },
  {
    id: "minimalist",
    name: "Minimalist",
    features: "Clean · Modern · Timeless",
    type: "minimalist",
    popular: false,
    colors: "from-[#F5EFE3] to-[#EDE4D3]",
    textColor: "text-[#4A3728]",
    couples: "Bagas & Nadia",
    date: "12 · Oktober · 2025",
  },
  {
    id: "floral",
    name: "Floral Romance",
    features: "Romantis · Bunga · Feminine",
    type: "floral",
    popular: false,
    new: true,
    colors: "from-[#F8EDE8] to-[#D9A5A0]",
    textColor: "text-[#4A2820]",
    couples: "Dimas & Putri",
    date: "03 · Maret · 2026",
  },
  {
    id: "dark",
    name: "Dark Luxury",
    features: "Mewah · Gelap · Prestisius",
    type: "dark",
    popular: false,
    colors: "from-[#1A1410] to-[#2C2018]",
    textColor: "text-[#C9A96E]",
    couples: "Ahmad & Raisya",
    date: "17 · Mei · 2025",
  },
  {
    id: "traditional",
    name: "Traditional Indonesia",
    features: "Batik · Jawa · Berkarakter",
    type: "traditional",
    popular: false,
    new: true,
    colors: "from-[#4A2C10] to-[#C4862E]",
    textColor: "text-[#FFF5E0]",
    couples: "Sekar & Arjuna",
    date: "Sabtu, 7 Juni 2025",
  },
];

export function Templates() {
  return (
    <section id="templates" className="py-24 px-5 md:px-8 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(201,169,110,0.06)_0%,transparent_70%)]" />

      <div className="relative z-10 max-w-[1200px] mx-auto">
        <span className="section-label">Koleksi Template</span>
        <h2 className="section-title">
          Pilih <em>Estetika</em> yang Mencerminkan Kisah Anda
        </h2>
        <p className="section-desc">
          5 template premium yang dirancang khusus untuk momen pernikahan Indonesia, 
          dari yang elegan modern hingga tradisional berkarakter.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {templates.map((template) => (
            <div
              key={template.id}
              className="group cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
            >
              {/* Template Preview */}
              <div
                className={cn(
                  "aspect-[3/4] relative overflow-hidden rounded-sm",
                  `bg-gradient-135 ${template.colors}`
                )}
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  {template.popular && (
                    <span className="absolute top-4 right-4 text-[0.6rem] font-medium tracking-[0.1em] uppercase px-2 py-1 rounded-sm border border-[#8A9E85] text-[#8A9E85] bg-[#8A9E85]/10">
                      Terpopuler
                    </span>
                  )}
                  {template.new && (
                    <span className="absolute top-4 right-4 text-[0.6rem] font-medium tracking-[0.1em] uppercase px-2 py-1 rounded-sm border border-[#C9A96E] text-[#C9A96E] bg-[#C9A96E]/10">
                      Baru
                    </span>
                  )}

                  <div className="w-10 h-px bg-current opacity-40 mx-auto mb-4" />
                  <div className={cn("text-[0.55rem] font-medium tracking-[0.2em] uppercase opacity-60 mb-2", template.textColor)}>
                    {template.name}
                  </div>
                  <div className={cn("font-serif text-xl font-light leading-tight mb-2", template.textColor)}>
                    {template.id === "minimalist" ? (
                      <>
                        {template.couples.split(" ")[0]}<br />&<br />{template.couples.split(" ")[2]}
                      </>
                    ) : (
                      template.couples
                    )}
                  </div>
                  {template.id !== "minimalist" && template.id !== "dark" && (
                    <div className={cn("font-serif text-sm italic opacity-70", template.textColor)}>
                      {template.id === "elegant" && "The Wedding of"}
                    </div>
                  )}
                  <div className="w-10 h-px bg-current opacity-40 mx-auto my-3" />
                  <div className={cn("text-[0.6rem] font-medium tracking-[0.15em] uppercase opacity-50", template.textColor)}>
                    {template.date}
                  </div>
                </div>
              </div>

              {/* Template Info */}
              <div className="pt-4 px-2">
                <div className="font-serif text-base font-normal text-[#4A3728] mb-1">{template.name}</div>
                <div className="text-[0.7rem] text-[#7A5C42] font-light tracking-wide">{template.features}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
