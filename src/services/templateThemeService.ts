import type { TemplateSection } from "@/types/template";

export interface TemplateThemePreset {
  key: string;
  label: string;
  description: string;
  preview: string;
  values: {
    primaryColor: string;
    secondaryColor: string;
    backgroundColor: string;
    textColor: string;
    gradientFrom: string;
    gradientTo: string;
    headingFont: string;
    bodyFont: string;
    buttonStyle: "solid" | "outline" | "rounded";
    borderRadius: "0px" | "4px" | "8px" | "16px" | "24px";
    isPremium: boolean;
    category: "wedding" | "birthday" | "graduation" | "custom";
  };
  sections: TemplateSection[];
  opening: {
    eyebrow: string;
    buttonLabel: string;
    ornament: "royal" | "floral" | "minimal";
    backgroundImage?: string;
  };
  ornaments?: {
  headerSvg?: string;   
  footerSvg?: string;   
  dividerSvg?: string;  
  cornerSvg?: string;   
  patternClass?: string;
};
}

export const templateThemePresets: TemplateThemePreset[] = [
  {
    key: "chara-51-inspired",
    label: "Chara 51 Inspired",
    description: "Royal dark wedding theme dengan gold ornament dan opening cinematic.",
    preview: "radial-gradient(circle at 50% 18%,rgba(220,185,105,0.36),transparent 32%),linear-gradient(145deg,#100c0b,#2b1b16 48%,#070605)",
    values: {
      primaryColor: "#120D0B",
      secondaryColor: "#D9B86C",
      backgroundColor: "#100C0B",
      textColor: "#F7EBDD",
      gradientFrom: "#2A1A15",
      gradientTo: "#080605",
      headingFont: "Playfair Display",
      bodyFont: "DM Sans",
      buttonStyle: "rounded",
      borderRadius: "24px",
      isPremium: true,
      category: "wedding",
    },
    sections: ["opening", "hero", "quote", "countdown", "story", "gallery", "event", "rsvp", "wishes", "gift", "live-streaming", "footer"],
    opening: {
      eyebrow: "The Wedding Of",
      buttonLabel: "Lihat Undangan",
      ornament: "royal",
      backgroundImage: "/ornament/ornament-jawa-opening.jpg",
    },
  },
  {
    key: "floral-romance",
    label: "Floral Romance",
    description: "Tema romantic soft rose dengan aksen floral dan nuansa intimate.",
    preview: "linear-gradient(145deg,#fff7f5,#f2d7d2)",
    values: {
      primaryColor: "#7E4F52",
      secondaryColor: "#D6A0A5",
      backgroundColor: "#FFF8F5",
      textColor: "#3B2928",
      gradientFrom: "#FFF8F5",
      gradientTo: "#F1D8D3",
      headingFont: "Cormorant Garamond",
      bodyFont: "Poppins",
      buttonStyle: "rounded",
      borderRadius: "24px",
      isPremium: true,
      category: "wedding",
    },
    sections: ["opening", "hero", "quote", "countdown", "story", "gallery", "event", "rsvp", "wishes", "footer"],
    opening: {
      eyebrow: "The Wedding Of",
      buttonLabel: "Buka Undangan",
      ornament: "floral",
      backgroundImage: "/ornament/ornament-jawa-opening.jpg",
    },
  },
  {
    key: "minimal-editorial",
    label: "Minimal Editorial",
    description: "Tema clean editorial dengan typography modern dan layout ringan.",
    preview: "linear-gradient(145deg,#ffffff,#eee7dc)",
    values: {
      primaryColor: "#27211D",
      secondaryColor: "#B99A62",
      backgroundColor: "#FAF7F2",
      textColor: "#2C2420",
      gradientFrom: "#FFFFFF",
      gradientTo: "#EEE7DC",
      headingFont: "Playfair Display",
      bodyFont: "Inter",
      buttonStyle: "outline",
      borderRadius: "16px",
      isPremium: false,
      category: "wedding",
    },
    sections: ["opening", "hero", "quote", "countdown", "gallery", "event", "rsvp", "footer"],
    opening: {
      eyebrow: "Wedding Invitation",
      buttonLabel: "View Invitation",
      ornament: "minimal",
      backgroundImage: "/ornament/ornament-jawa-opening.jpg",
    },
  },
  {
    key: "youtube-premiere",
    label: "YouTube Premiere",
    description: "Tema merah-hitam seperti premiere video, cocok untuk undangan modern dan playful.",
    preview: "radial-gradient(circle at 50% 18%,rgba(255,0,0,0.32),transparent 30%),linear-gradient(145deg,#0f0f0f,#2a0505 52%,#050505)",
    values: {
      primaryColor: "#0F0F0F",
      secondaryColor: "#FF0033",
      backgroundColor: "#0A0A0A",
      textColor: "#FFFFFF",
      gradientFrom: "#250505",
      gradientTo: "#050505",
      headingFont: "Montserrat",
      bodyFont: "Inter",
      buttonStyle: "rounded",
      borderRadius: "24px",
      isPremium: false,
      category: "custom",
    },
    sections: ["opening", "hero", "countdown", "gallery", "event", "rsvp", "wishes", "footer"],
    opening: {
      eyebrow: "Premiere Invitation",
      buttonLabel: "Play Undangan",
      ornament: "minimal",
      backgroundImage: "/ornament/ornament-jawa-opening.jpg",
    },
  },
  {
    key: "facebook-classic",
    label: "Facebook Classic",
    description: "Tema biru sosial yang clean, friendly, dan mudah dibaca untuk semua tamu.",
    preview: "linear-gradient(145deg,#1877F2,#0f4fa8 58%,#082b5c)",
    values: {
      primaryColor: "#0B3D91",
      secondaryColor: "#8EC5FF",
      backgroundColor: "#EEF5FF",
      textColor: "#102033",
      gradientFrom: "#1877F2",
      gradientTo: "#082B5C",
      headingFont: "Poppins",
      bodyFont: "Inter",
      buttonStyle: "rounded",
      borderRadius: "16px",
      isPremium: false,
      category: "custom",
    },
    sections: ["opening", "hero", "quote", "countdown", "gallery", "event", "rsvp", "wishes", "footer"],
    opening: {
      eyebrow: "Social Invitation",
      buttonLabel: "Lihat Undangan",
      ornament: "minimal",
      backgroundImage: "/ornament/ornament-jawa-opening.jpg",
    },
  },
  {
    key: "twitter-x-minimal",
    label: "Twitter / X Minimal",
    description: "Tema minimal hitam-putih dengan aksen biru, modern dan tajam.",
    preview: "radial-gradient(circle at 50% 18%,rgba(29,155,240,0.28),transparent 32%),linear-gradient(145deg,#000000,#111827)",
    values: {
      primaryColor: "#000000",
      secondaryColor: "#1D9BF0",
      backgroundColor: "#060606",
      textColor: "#F8FAFC",
      gradientFrom: "#000000",
      gradientTo: "#111827",
      headingFont: "Inter",
      bodyFont: "Inter",
      buttonStyle: "outline",
      borderRadius: "24px",
      isPremium: false,
      category: "custom",
    },
    sections: ["opening", "hero", "countdown", "event", "rsvp", "wishes", "footer"],
    opening: {
      eyebrow: "Now Live",
      buttonLabel: "Open Invite",
      ornament: "minimal",
      backgroundImage: "/ornament/ornament-jawa-opening.jpg",
    },
  },
  {
    key: "adat-jawa-royal",
    label: "Adat Jawa Royal",
    description: "Tema adat Jawa dengan nuansa sogan, gold, dan rasa klasik keraton.",
    preview: "radial-gradient(circle at 50% 18%,rgba(210,169,89,0.32),transparent 34%),linear-gradient(145deg,#2B160E,#6B3D1F 55%,#140A06)",
    values: {
      primaryColor: "#2B160E",
      secondaryColor: "#D6A94F",
      backgroundColor: "#F8F0E3",
      textColor: "#2A1A12",
      gradientFrom: "#6B3D1F",
      gradientTo: "#140A06",
      headingFont: "Cormorant Garamond",
      bodyFont: "DM Sans",
      buttonStyle: "rounded",
      borderRadius: "24px",
      isPremium: true,
      category: "wedding",
    },
    sections: ["opening", "hero", "quote", "countdown", "story", "gallery", "event", "rsvp", "wishes", "gift", "live-streaming", "footer"],
    opening: {
      eyebrow: "selamat Berbahagia",
      buttonLabel: "Mlebet Undangan",
      ornament: "royal",
      backgroundImage: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400">
  <image
    href="/ornament/header.jpg"
    width="800"
    height="400"
    preserveAspectRatio="xMidYMid slice"
  />
</svg>`,
    },
    ornaments: {
  headerSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400">
  <image
    href="/ornament/header.jpg"
    width="800"
    height="400"
    preserveAspectRatio="xMidYMid slice"
  />
</svg>`,

  dividerSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 24" preserveAspectRatio="none">
    <path d="M0 12 C50 2 90 22 140 12 C190 2 230 22 320 12"
      fill="none"
      stroke="#C9A646"
      stroke-width="1"
      opacity="0.7"
    />
    <circle cx="160" cy="12" r="3" fill="#C9A646"/>
  </svg>`,

  footerSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 50" preserveAspectRatio="none">
    <path d="M0 24 C120 42 210 8 340 24 C470 40 560 8 800 24"
      fill="none"
      stroke="#C9A646"
      stroke-width="0.8"
      opacity="0.45"
    />
    <g fill="#C9A646" opacity="0.45">
      <circle cx="260" cy="24" r="2.5"/>
      <circle cx="400" cy="24" r="3.5"/>
      <circle cx="540" cy="24" r="2.5"/>
    </g>
  </svg>`,

  cornerSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 90">
    <path d="M0 0 H70" stroke="#C9A646" stroke-width="0.8" opacity="0.45"/>
    <path d="M0 0 V70" stroke="#C9A646" stroke-width="0.8" opacity="0.45"/>
    <path d="M12 12 C28 14 40 26 42 42 C26 40 14 28 12 12Z"
      fill="#C9A646"
      opacity="0.13"
    />
    <circle cx="16" cy="16" r="3.5" fill="#C9A646" opacity="0.5"/>
  </svg>`,

  patternClass: "jawa-classic-luxury-pattern",
},
  },
  {
    key: "adat-jawa-classic-luxury",
    label: "Adat Jawa Classic Luxury",
    description: "Tema adat Jawa mewah dengan cream ivory, sage green, gold, dan nuansa keraton modern.",
    preview: "radial-gradient(circle at 50% 18%,rgba(201,166,70,0.25),transparent 34%),linear-gradient(145deg,#F8F1DE,#E8DFC8 55%,#D4CBB4)",
    values: {
      primaryColor: "#4F845E",
      secondaryColor: "#C9A646",
      backgroundColor: "#F8F1DE",
      textColor: "#5B4A2D",
      gradientFrom: "#F8F1DE",
      gradientTo: "#E8DFC8",
      headingFont: "Cormorant Garamond",
      bodyFont: "DM Sans",
      buttonStyle: "rounded",
      borderRadius: "24px",
      isPremium: true,
      category: "wedding",
    },
    sections: ["opening", "hero", "quote", "countdown", "story", "gallery", "event", "rsvp", "wishes", "gift", "live-streaming", "footer"],
    opening: {
      eyebrow: "Pawiwahan",
      buttonLabel: "Mlebet Undangan",
      ornament: "royal",
      backgroundImage: "/ornament/ornament-jawa-opening.jpg",
    },
    ornaments: {
    headerSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 90" preserveAspectRatio="none">
      <rect width="800" height="90" fill="#F8F1DE" opacity="0"/>
      <path d="M0 72 C140 30 260 110 400 55 C540 0 660 80 800 32" fill="none" stroke="#C9A646" stroke-width="0.8" opacity="0.5"/>
      <g fill="#C9A646" opacity="0.35">
        <path d="M400 14 L430 58 L400 76 L370 58 Z"/>
        <circle cx="400" cy="50" r="8" fill="#F8F1DE" opacity="0.5"/>
      </g>
    </svg>`,

    dividerSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 36" preserveAspectRatio="none">
      <path d="M0 18 H330" stroke="#C9A646" stroke-width="0.6" opacity="0.5"/>
      <path d="M470 18 H800" stroke="#C9A646" stroke-width="0.6" opacity="0.5"/>
      <path d="M400 4 C425 18 425 18 400 32 C375 18 375 18 400 4Z" fill="#C9A646" opacity="0.5"/>
      <circle cx="400" cy="18" r="4" fill="#4F845E" opacity="0.4"/>
    </svg>`,

    footerSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 80" preserveAspectRatio="none">
      <rect width="800" height="80" fill="#4F845E" opacity="0.95"/>
      <path d="M0 18 C120 58 260 0 400 38 C540 76 680 18 800 54" fill="none" stroke="#C9A646" stroke-width="0.8" opacity="0.45"/>
      <g fill="#C9A646" opacity="0.3">
        <circle cx="160" cy="42" r="3"/>
        <circle cx="320" cy="28" r="3"/>
        <circle cx="480" cy="52" r="3"/>
        <circle cx="640" cy="34" r="3"/>
      </g>
    </svg>`,

    cornerSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 90">
      <path d="M0 0 H90 V8 H8 V90 H0Z" fill="#C9A646" opacity="0.35"/>
      <circle cx="16" cy="16" r="4" fill="#C9A646" opacity="0.4"/>
      <path d="M24 24 L44 44 L24 64 Z" fill="none" stroke="#C9A646" stroke-width="0.6" opacity="0.4"/>
    </svg>`,

    patternClass: "jawa-classic-pattern",
  },
  },
  {
    key: "adat-batak-ulos",
    label: "Adat Batak Ulos",
    description: "Tema adat Batak dengan merah, hitam, putih, dan aksen ulos yang tegas.",
    preview: "linear-gradient(145deg,#130707,#8B1E1E 46%,#111111 72%,#F5EFE3)",
    values: {
      primaryColor: "#151010",
      secondaryColor: "#000000",
      backgroundColor: "#F7EFE4",
      textColor: "#211715",
      gradientFrom: "#000000",
      gradientTo: "#111111",
      headingFont: "Playfair Display",
      bodyFont: "Poppins",
      buttonStyle: "rounded",
      borderRadius: "16px",
      isPremium: true,
      category: "wedding",
    },
    sections: ["opening", "hero", "quote", "countdown", "story", "gallery", "event", "rsvp", "wishes", "gift", "footer"],
    opening: {
      eyebrow: "Horas Invitation",
      buttonLabel: "Buka Undangan",
      ornament: "royal",
      backgroundImage: "/ornament/ornament-jawa-opening.jpg",
    },
    ornaments: {
      headerSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 80" preserveAspectRatio="none">
        <rect width="800" height="80" fill="#151010"/>
        <line x1="0" y1="8" x2="800" y2="8" stroke="#B91C1C" stroke-width="1.5"/>
        <line x1="0" y1="72" x2="800" y2="72" stroke="#B91C1C" stroke-width="1.5"/>
        <g fill="#B91C1C" opacity="0.85">
          ${Array.from({length: 50}, (_, i) => {
            const x = i * 16;
            return `<polygon points="${x},16 ${x+8},16 ${x+8},32 ${x},32" opacity="${i%2===0?'1':'0.4'}"/>
                    <polygon points="${x},48 ${x+8},48 ${x+8},64 ${x},64" opacity="${i%2===0?'0.4':'1'}"/>`;
          }).join('')}
        </g>
        <g fill="none" stroke="#C9A84C" stroke-width="0.8" opacity="0.6">
          ${Array.from({length: 26}, (_, i) => {
            const x = i * 32 + 8;
            return `<rect x="${x-5}" y="37" width="10" height="10" transform="rotate(45,${x},42)"/>`;
          }).join('')}
        </g>
      </svg>`,

      dividerSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 32" preserveAspectRatio="none">
        <g fill="#B91C1C">
          ${Array.from({length: 100}, (_, i) => {
            const x = i * 8;
            return `<polygon points="${x},0 ${x+4},0 ${x+4},16 ${x},16" opacity="${i%2===0?'0.9':'0.3'}"/>
                    <polygon points="${x},16 ${x+4},16 ${x+4},32 ${x},32" opacity="${i%2===0?'0.3':'0.9'}"/>`;
          }).join('')}
        </g>
        <line x1="0" y1="16" x2="800" y2="16" stroke="#C9A84C" stroke-width="0.5" opacity="0.5"/>
      </svg>`,

      footerSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 60" preserveAspectRatio="none">
        <rect width="800" height="60" fill="#151010"/>
        <line x1="0" y1="6" x2="800" y2="6" stroke="#B91C1C" stroke-width="1.5"/>
        <g fill="#B91C1C" opacity="0.7">
          ${Array.from({length: 50}, (_, i) => {
            const x = i * 16;
            return `<polygon points="${x+8},10 ${x+16},28 ${x},28"/>`;
          }).join('')}
        </g>
        <g fill="none" stroke="#C9A84C" stroke-width="0.6" opacity="0.5">
          ${Array.from({length: 26}, (_, i) => {
            const x = i * 32 + 8;
            return `<rect x="${x-4}" y="38" width="8" height="8" transform="rotate(45,${x},42)"/>`;
          }).join('')}
        </g>
        <line x1="0" y1="54" x2="800" y2="54" stroke="#B91C1C" stroke-width="1.5"/>
      </svg>`,

      cornerSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80">
        <path d="M0,0 L60,0 L0,60 Z" fill="#B91C1C" opacity="0.12"/>
        <path d="M0,0 L40,0 L0,40 Z" fill="#B91C1C" opacity="0.18"/>
        <path d="M0,0 L20,0 L0,20 Z" fill="#B91C1C" opacity="0.3"/>
        <line x1="0" y1="0" x2="60" y2="0" stroke="#C9A84C" stroke-width="1" opacity="0.6"/>
        <line x1="0" y1="0" x2="0" y2="60" stroke="#C9A84C" stroke-width="1" opacity="0.6"/>
        <rect x="2" y="2" width="8" height="8" transform="rotate(45,6,6)" fill="#C9A84C" opacity="0.5"/>
      </svg>`,

      patternClass: "batak-ulos-pattern",
    },
  },
  {
    key: "dark-luxury-gold",
    label: "Dark Luxury Gold",
    description: "Tema hitam emas high-end dengan atmosfer ballroom dan typography dramatis.",
    preview: "radial-gradient(circle at 50% 18%,rgba(245,197,92,0.34),transparent 30%),linear-gradient(145deg,#050403,#1f1712 58%,#000000)",
    values: {
      primaryColor: "#090604",
      secondaryColor: "#F1C45D",
      backgroundColor: "#090604",
      textColor: "#FFF5E1",
      gradientFrom: "#241911",
      gradientTo: "#000000",
      headingFont: "Playfair Display",
      bodyFont: "DM Sans",
      buttonStyle: "rounded",
      borderRadius: "24px",
      isPremium: true,
      category: "wedding",
    },
    sections: ["opening", "hero", "quote", "countdown", "story", "gallery", "event", "rsvp", "wishes", "gift", "live-streaming", "footer"],
    opening: {
      eyebrow: "Luxury Wedding",
      buttonLabel: "Enter Invitation",
      ornament: "royal",
      backgroundImage: "/ornament/ornament-jawa-opening.jpg",
    },
  },
  {
    key: "sage-garden-party",
    label: "Sage Garden Party",
    description: "Tema outdoor garden dengan sage green, cream, dan suasana intimate natural.",
    preview: "linear-gradient(145deg,#F7F3EA,#C9D4BE 58%,#7E906F)",
    values: {
      primaryColor: "#4C5E43",
      secondaryColor: "#C8A96A",
      backgroundColor: "#F7F3EA",
      textColor: "#273021",
      gradientFrom: "#F7F3EA",
      gradientTo: "#C9D4BE",
      headingFont: "Cormorant Garamond",
      bodyFont: "DM Sans",
      buttonStyle: "rounded",
      borderRadius: "24px",
      isPremium: true,
      category: "wedding",
    },
    sections: ["opening", "hero", "quote", "countdown", "story", "gallery", "event", "rsvp", "wishes", "gift", "footer"],
    opening: {
      eyebrow: "Garden Wedding",
      buttonLabel: "Buka Undangan",
      ornament: "floral",
      backgroundImage: "/ornament/ornament-jawa-opening.jpg",
    },
  },
  {
    key: "beach-sunset",
    label: "Beach Sunset",
    description: "Tema pantai dengan sunset peach, sand beige, dan vibe destination wedding.",
    preview: "linear-gradient(145deg,#FFB199,#FFDDB8 48%,#5A8CA8)",
    values: {
      primaryColor: "#29546A",
      secondaryColor: "#F0A06D",
      backgroundColor: "#FFF2E4",
      textColor: "#2B3F48",
      gradientFrom: "#FFB199",
      gradientTo: "#5A8CA8",
      headingFont: "Playfair Display",
      bodyFont: "Poppins",
      buttonStyle: "rounded",
      borderRadius: "24px",
      isPremium: true,
      category: "wedding",
    },
    sections: ["opening", "hero", "countdown", "gallery", "event", "rsvp", "wishes", "gift", "footer"],
    opening: {
      eyebrow: "Sunset Wedding",
      buttonLabel: "Open Invitation",
      ornament: "minimal",
      backgroundImage: "/ornament/ornament-jawa-opening.jpg",
    },
  },
  {
    key: "modern-monochrome",
    label: "Modern Monochrome",
    description: "Tema hitam putih editorial, minimal, cocok untuk pasangan modern urban.",
    preview: "linear-gradient(145deg,#F8F8F8,#111111)",
    values: {
      primaryColor: "#111111",
      secondaryColor: "#A3A3A3",
      backgroundColor: "#F8F8F8",
      textColor: "#171717",
      gradientFrom: "#FFFFFF",
      gradientTo: "#D4D4D4",
      headingFont: "Montserrat",
      bodyFont: "Inter",
      buttonStyle: "outline",
      borderRadius: "16px",
      isPremium: false,
      category: "wedding",
    },
    sections: ["opening", "hero", "quote", "gallery", "event", "rsvp", "footer"],
    opening: {
      eyebrow: "Modern Wedding",
      buttonLabel: "View Invitation",
      ornament: "minimal",
      backgroundImage: "/ornament/ornament-jawa-opening.jpg",
    },
  },
  {
    key: "birthday-pop",
    label: "Birthday Pop",
    description: "Tema ulang tahun colorful, fun, dan playful untuk birthday invitation.",
    preview: "radial-gradient(circle at 30% 25%,rgba(255,255,255,0.45),transparent 22%),linear-gradient(145deg,#FF5EA8,#6C63FF 54%,#20D3B8)",
    values: {
      primaryColor: "#6C2BD9",
      secondaryColor: "#FF5EA8",
      backgroundColor: "#FFF7FD",
      textColor: "#281536",
      gradientFrom: "#FF5EA8",
      gradientTo: "#20D3B8",
      headingFont: "Poppins",
      bodyFont: "Inter",
      buttonStyle: "rounded",
      borderRadius: "24px",
      isPremium: false,
      category: "birthday",
    },
    sections: ["opening", "hero", "countdown", "gallery", "event", "rsvp", "wishes", "footer"],
    opening: {
      eyebrow: "Birthday Party",
      buttonLabel: "Join The Party",
      ornament: "minimal",
    },
  },
  {
    key: "graduation-prestige",
    label: "Graduation Prestige",
    description: "Tema wisuda formal dengan navy, gold, dan layout prestisius.",
    preview: "linear-gradient(145deg,#071A33,#123A6B 55%,#D9B86C)",
    values: {
      primaryColor: "#071A33",
      secondaryColor: "#D9B86C",
      backgroundColor: "#F5F0E6",
      textColor: "#091827",
      gradientFrom: "#071A33",
      gradientTo: "#123A6B",
      headingFont: "Playfair Display",
      bodyFont: "Inter",
      buttonStyle: "rounded",
      borderRadius: "16px",
      isPremium: true,
      category: "graduation",
    },
    sections: ["opening", "hero", "quote", "countdown", "gallery", "event", "rsvp", "wishes", "footer"],
    opening: {
      eyebrow: "Graduation Invitation",
      buttonLabel: "Open Invitation",
      ornament: "royal",
    },
  },
  {
    key: "islamic-elegance",
    label: "Islamic Elegance",
    description: "Tema islami elegan dengan emerald, ivory, gold, dan atmosfer sakral.",
    preview: "radial-gradient(circle at 50% 18%,rgba(218,185,105,0.28),transparent 34%),linear-gradient(145deg,#063C35,#0C6B5C 58%,#F8F1E4)",
    values: {
      primaryColor: "#063C35",
      secondaryColor: "#D7B66D",
      backgroundColor: "#F8F1E4",
      textColor: "#102E29",
      gradientFrom: "#063C35",
      gradientTo: "#0C6B5C",
      headingFont: "Cormorant Garamond",
      bodyFont: "DM Sans",
      buttonStyle: "rounded",
      borderRadius: "24px",
      isPremium: true,
      category: "wedding",
    },
    sections: ["opening", "hero", "quote", "countdown", "gallery", "event", "rsvp", "wishes", "gift", "footer"],
    opening: {
      eyebrow: "Bismillahirrahmanirrahim",
      buttonLabel: "Buka Undangan",
      ornament: "royal",
    },
  },
  {
    key: "korean-soft",
    label: "Korean Soft Wedding",
    description: "Tema soft pastel ala Korean wedding: clean, romantic, dan airy.",
    preview: "linear-gradient(145deg,#FFFFFF,#F7DEE4 48%,#D8E7F5)",
    values: {
      primaryColor: "#59464C",
      secondaryColor: "#E7A9B8",
      backgroundColor: "#FFFFFF",
      textColor: "#3A2B30",
      gradientFrom: "#FFFFFF",
      gradientTo: "#F7DEE4",
      headingFont: "Cormorant Garamond",
      bodyFont: "Poppins",
      buttonStyle: "rounded",
      borderRadius: "24px",
      isPremium: true,
      category: "wedding",
    },
    sections: ["opening", "hero", "quote", "countdown", "story", "gallery", "event", "rsvp", "wishes", "footer"],
    opening: {
      eyebrow: "Our Wedding Day",
      buttonLabel: "Open Invitation",
      ornament: "floral",
    },
  },
];

export function getTemplateTheme(themeKey?: string | null) {
  return templateThemePresets.find((theme) => theme.key === themeKey) ?? templateThemePresets[0];
}
