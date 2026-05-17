const features = [
  { icon: "⏳", title: "Countdown Real-time", desc: "Hitung mundur yang elegan menuju hari istimewa Anda, membuat setiap tamu semakin antusias." },
  { icon: "📸", title: "Galeri Foto Premium", desc: "Tampilkan momen prewedding dan kisah cinta Anda dengan slider galeri yang cinematic dan smooth." },
  { icon: "✉️", title: "RSVP Digital Cerdas", desc: "Form konfirmasi kehadiran yang mudah diisi, dengan manajemen data tamu terintegrasi di dashboard." },
  { icon: "🎵", title: "Background Music", desc: "Pilih atau upload musik favorit Anda sebagai latar undangan digital untuk kesan yang lebih berkesan." },
  { icon: "📍", title: "Peta Lokasi Interaktif", desc: "Integrasi Google Maps langsung di undangan sehingga tamu mudah menemukan lokasi acara." },
  { icon: "💌", title: "Kirim via WhatsApp", desc: "Bagikan link undangan unik via WhatsApp, Instagram, atau salin link dengan satu klik mudah." },
];

export function Features() {
  return (
    <section id="features" className="py-24 px-5 md:px-8">
      <div className="max-w-[1000px] mx-auto">
        <span className="section-label">Fitur Unggulan</span>
        <h2 className="section-title">
          Semua yang Anda <em>Butuhkan</em>,<br />Dalam Satu Platform
        </h2>
        <p className="section-desc">
          Dari countdown pernikahan hingga manajemen tamu, kami hadirkan pengalaman premium yang tak tertandingi.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#C9A96E]/15 rounded-sm p-8 transition-all duration-300 hover:border-[#C9A96E]/40 hover:shadow-lg"
            >
              <div className="w-10 h-10 border border-[#E8D5B0] rounded-sm flex items-center justify-center text-lg mb-5">
                {feature.icon}
              </div>
              <h3 className="font-serif text-lg font-normal text-[#4A3728] mb-2">{feature.title}</h3>
              <p className="text-sm text-[#7A5C42] leading-relaxed font-light">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
