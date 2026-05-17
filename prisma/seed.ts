// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const defaultTemplates = [
  {
    name: "Elegant Wedding",
    slug: "elegant",
    category: "wedding",
    description: "Template mewah dengan sentuhan emas dan elegan",
    isDefault: true,
    isPremium: false,
    layout: {
      sections: ["opening", "hero", "quote", "countdown", "story", "gallery", "event", "rsvp", "wishes", "gift", "footer"],
      colors: {
        primary: "#C9A96E",
        secondary: "#4A3728",
        background: "#FAF7F2",
        text: "#2C2420",
      },
      fonts: {
        heading: "Cormorant Garamond",
        body: "DM Sans",
      },
    },
    styles: {
      borderRadius: "4px",
      buttonStyle: "solid",
      animation: "fade-up",
    },
  },
  {
    name: "Minimalist",
    slug: "minimalist",
    category: "wedding",
    description: "Simple, clean, modern",
    isDefault: true,
    isPremium: false,
    layout: {
      sections: ["hero", "countdown", "gallery", "event", "rsvp"],
      colors: {
        primary: "#2C2420",
        secondary: "#7A5C42",
        background: "#FFFFFF",
        text: "#1A1A1A",
      },
      fonts: {
        heading: "DM Sans",
        body: "DM Sans",
      },
    },
  },
  {
    name: "Floral Romance",
    slug: "floral",
    category: "wedding",
    description: "Nuansa bunga yang romantis dan feminin",
    isDefault: true,
    isPremium: false,
    layout: {
      sections: ["opening", "hero", "story", "gallery", "event", "rsvp", "gift"],
      colors: {
        primary: "#D4A5A0",
        secondary: "#8A9E85",
        background: "#FFF5F0",
        text: "#4A2820",
      },
    },
  },
  {
    name: "Dark Luxury",
    slug: "dark",
    category: "wedding",
    description: "Mewah dengan nuansa gelap elegan",
    isDefault: true,
    isPremium: true,
    layout: {
      sections: ["hero", "countdown", "gallery", "event", "rsvp", "gift"],
      colors: {
        primary: "#C9A96E",
        secondary: "#1A1410",
        background: "#1A1410",
        text: "#E8D5B0",
      },
    },
  },
  {
    name: "Traditional Indonesia",
    slug: "traditional",
    category: "wedding",
    description: "Nuansa adat Jawa yang kental",
    isDefault: true,
    isPremium: false,
    layout: {
      sections: ["opening", "hero", "story", "gallery", "event", "rsvp"],
      colors: {
        primary: "#C4862E",
        secondary: "#4A2C10",
        background: "#FFF5E0",
        text: "#4A2C10",
      },
    },
  },
];

async function main() {
  console.log("🌱 Seeding templates...");
  
  for (const template of defaultTemplates) {
    await prisma.template.upsert({
      where: { slug: template.slug },
      update: {},
      create: template,
    });
  }
  
  console.log("✅ Seed completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });