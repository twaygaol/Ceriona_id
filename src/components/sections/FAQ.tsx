"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "Berapa lama undangan saya aktif setelah dibuat?",
    answer: "Undangan paket Premium dan Pro aktif selamanya tanpa batas waktu. Paket Free aktif selama 3 bulan sejak tanggal pernikahan. Anda bisa memperpanjang kapan saja dengan upgrade.",
  },
  {
    question: "Apakah saya bisa mengganti template setelah membayar?",
    answer: "Ya! Anda bisa mengganti template kapan saja tanpa biaya tambahan. Semua data undangan, foto, dan RSVP akan otomatis tersinkron ke template baru.",
  },
  {
    question: "Bagaimana cara tamu mengkonfirmasi kehadiran?",
    answer: "Tamu cukup membuka link undangan dan mengisi form RSVP yang sudah tersedia di halaman undangan. Data langsung masuk ke dashboard Anda secara real-time.",
  },
  {
    question: "Apakah undangan bisa dibuka di semua perangkat?",
    answer: "Tentu! Semua template kami dioptimalkan untuk smartphone, tablet, dan komputer. Tamu bisa membuka undangan dari perangkat apapun tanpa install aplikasi.",
  },
  {
    question: "Apakah data tamu saya aman?",
    answer: "Keamanan data adalah prioritas kami. Data tamu Anda terenkripsi dan tidak pernah dibagikan ke pihak ketiga. Anda memiliki kontrol penuh atas data Anda.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 px-5 md:px-8 bg-[#FAF7F2]">
      <div className="max-w-[680px] mx-auto">
        <span className="section-label">Pertanyaan Umum</span>
        <h2 className="section-title">
          Ada <em>Pertanyaan?</em>
        </h2>
        <p className="section-desc">Temukan jawaban dari pertanyaan yang paling sering ditanyakan.</p>

        <div className="space-y-0">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className={cn(
                "border-b border-[#C9A96E]/20 py-6 cursor-pointer transition-all",
                openIndex === idx && "pb-6"
              )}
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            >
              <div className="flex justify-between items-center gap-4">
                <span className="font-serif text-base font-normal text-[#4A3728]">{faq.question}</span>
                <span className={cn(
                  "w-6 h-6 border border-[#E8D5B0] rounded-full flex items-center justify-center text-sm text-[#9E7A3E] flex-shrink-0 transition-transform duration-300",
                  openIndex === idx && "rotate-45"
                )}>
                  +
                </span>
              </div>
              <div
                className={cn(
                  "overflow-hidden transition-all duration-400",
                  openIndex === idx ? "max-h-[200px] mt-4" : "max-h-0"
                )}
              >
                <p className="text-sm text-[#7A5C42] leading-relaxed font-light">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}