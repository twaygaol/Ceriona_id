# AGENTS.md — Kundangan Project Documentation

> Dokumen ini menjelaskan arsitektur, struktur, dan fungsi setiap komponen dalam project **Kundangan** — Premium Digital Invitation Platform.
> Dibuat sebagai panduan untuk developer, AI agent, dan kontributor project.

---

## 📌 Gambaran Umum Project

**Kundangan** adalah platform undangan digital premium berbasis web yang memungkinkan pasangan untuk membuat, mengkustomisasi, dan membagikan undangan pernikahan digital secara elegan dan modern.

| Properti | Detail |
|---|---|
| **Nama Project** | Kundangan |
| **Tipe** | SaaS — Premium Digital Invitation Platform |
| **Framework** | Next.js 15 (App Router) |
| **Bahasa** | TypeScript (strict mode) |
| **Target** | Pasangan yang akan menikah di Indonesia |
| **Model Bisnis** | Freemium — Free / Premium (Rp149K) / Pro (Rp299K) |
| **Status** | Tahap awal — Frontend development |

---

## 🎯 Tujuan Project

1. Menyediakan platform undangan digital yang lebih premium dari kompetitor lokal (Kadio.id, dll)
2. Memberikan pengalaman UI/UX cinematic, smooth, dan elegan
3. Siap dikembangkan menjadi SaaS multi-tenant skala besar
4. Mobile-first, SEO-friendly, dan production-ready sejak awal

---

## 🗂️ Struktur Direktori Lengkap

```
kundangan/
├── AGENTS.md                        ← Dokumen ini
├── README.md                        ← Setup & cara menjalankan project
├── next.config.ts                   ← Konfigurasi Next.js
├── tailwind.config.ts               ← Design system & token warna
├── tsconfig.json                    ← TypeScript config (strict)
├── .env.local                       ← Environment variables (tidak di-commit)
├── .env.example                     ← Template env untuk developer baru
│
├── public/
│   ├── fonts/                       ← Self-hosted fonts (opsional)
│   ├── images/                      ← Static images (og-image, logo, dll)
│   └── icons/                       ← Favicon, app icons
│
└── src/
    ├── app/                         ← Next.js App Router (semua halaman)
    ├── components/                  ← Komponen reusable global
    ├── features/                    ← Modul fitur per domain
    ├── hooks/                       ← Custom React hooks
    ├── lib/                         ← Utilities & konfigurasi library
    ├── services/                    ← API service layer
    ├── store/                       ← Zustand state management
    ├── types/                       ← TypeScript type definitions
    ├── utils/                       ← Helper functions
    └── styles/                      ← Global CSS & design tokens
```

---

## 📁 Penjelasan Detail Setiap Direktori

---

### `src/app/` — Halaman & Routing

Menggunakan **Next.js App Router** dengan route groups untuk memisahkan layout.

```
src/app/
├── layout.tsx                       ← Root layout (font, metadata, providers)
├── globals.css                      ← CSS global (import di root layout)
│
├── (marketing)/                     ← Route group: halaman publik
│   ├── layout.tsx                   ← Layout dengan Navbar + Footer
│   ├── page.tsx                     ← Landing page utama "/"
│   └── templates/
│       └── page.tsx                 ← Galeri semua template "/templates"
│
├── (dashboard)/                     ← Route group: area login
│   ├── layout.tsx                   ← Layout dengan Sidebar dashboard
│   └── dashboard/
│       ├── page.tsx                 ← Overview dashboard "/dashboard"
│       ├── invitations/
│       │   ├── page.tsx             ← List undangan "/dashboard/invitations"
│       │   ├── new/page.tsx         ← Buat undangan baru
│       │   └── [id]/edit/page.tsx   ← Edit undangan
│       ├── guests/
│       │   └── page.tsx             ← Manajemen tamu "/dashboard/guests"
│       ├── rsvp/
│       │   └── page.tsx             ← Data konfirmasi "/dashboard/rsvp"
│       ├── gallery/
│       │   └── page.tsx             ← Upload foto "/dashboard/gallery"
│       ├── music/
│       │   └── page.tsx             ← Upload musik "/dashboard/music"
│       └── settings/
│           └── page.tsx             ← Pengaturan akun "/dashboard/settings"
│
├── invitation/
│   └── [slug]/
│       ├── page.tsx                 ← Halaman undangan publik
│       └── opengraph-image.tsx      ← Dynamic OG image per undangan
│
├── api/                             ← API Routes (sementara sebelum backend)
│   ├── rsvp/[id]/route.ts           ← POST: simpan RSVP
│   ├── wishes/[id]/route.ts         ← GET/POST: ucapan tamu
│   └── invitations/route.ts         ← GET/POST: data undangan
│
├── sitemap.ts                       ← Auto-generate sitemap.xml
├── robots.ts                        ← robots.txt
└── not-found.tsx                    ← Custom 404 page
```

**Fungsi setiap halaman:**

| Route | File | Fungsi |
|---|---|---|
| `/` | `(marketing)/page.tsx` | Landing page dengan Hero, Template preview, Pricing, FAQ |
| `/templates` | `(marketing)/templates/page.tsx` | Showcase semua template undangan |
| `/invitation/[slug]` | `invitation/[slug]/page.tsx` | Undangan publik yang dibagikan ke tamu |
| `/dashboard` | `(dashboard)/dashboard/page.tsx` | Overview statistik: views, RSVP, tamu |
| `/dashboard/invitations` | `invitations/page.tsx` | CRUD undangan milik user |
| `/dashboard/guests` | `guests/page.tsx` | Kelola daftar tamu, import/export CSV |
| `/dashboard/rsvp` | `rsvp/page.tsx` | Lihat & filter data konfirmasi kehadiran |
| `/dashboard/gallery` | `gallery/page.tsx` | Upload & manage foto untuk undangan |
| `/dashboard/music` | `music/page.tsx` | Upload & pilih background music |
| `/dashboard/settings` | `settings/page.tsx` | Profil, notifikasi, billing, keamanan |

---

### `src/components/` — Komponen Reusable Global

Komponen yang dipakai di lebih dari satu fitur/halaman.

```
src/components/
├── ui/                              ← Atomic UI components
│   ├── Button.tsx                   ← Button dengan variant: primary, outline, ghost, gold
│   ├── Card.tsx                     ← Card container dengan border gold subtle
│   ├── Badge.tsx                    ← Badge kecil: new, popular, hadir, dll
│   ├── Input.tsx                    ← Input field dengan label floating
│   ├── Textarea.tsx                 ← Textarea dengan auto-resize
│   ├── Select.tsx                   ← Dropdown select custom styled
│   ├── Modal.tsx                    ← Dialog/modal dengan backdrop blur
│   ├── Skeleton.tsx                 ← Loading skeleton placeholder
│   ├── Spinner.tsx                  ← Loading spinner animasi
│   ├── Divider.tsx                  ← Ornamental divider dengan icon ✦
│   ├── GoldLine.tsx                 ← Garis dekoratif tipis warna gold
│   └── Avatar.tsx                   ← Avatar circle dengan inisial
│
├── layout/
│   ├── Navbar.tsx                   ← Navbar publik (fixed, glassmorphism)
│   ├── Footer.tsx                   ← Footer publik (4 kolom, dark)
│   ├── Sidebar.tsx                  ← Sidebar dashboard (responsive, collapsible)
│   ├── DashboardHeader.tsx          ← Header area dashboard (breadcrumb, avatar)
│   ├── ThemeProvider.tsx            ← next-themes provider (dark/light mode)
│   └── LenisProvider.tsx            ← Smooth scroll provider (Lenis)
│
└── animations/
    ├── FadeInUp.tsx                 ← Wrapper animasi fade + slide up
    ├── StaggerChildren.tsx          ← Animasi stagger untuk list items
    ├── CountUp.tsx                  ← Angka animasi naik (statistik)
    └── CinematicReveal.tsx          ← Reveal animasi untuk hero section
```

**Penjelasan komponen penting:**

#### `Navbar.tsx`
- Posisi: `fixed top-0` dengan `backdrop-filter: blur`
- Logo "Kundangan" dengan highlight warna gold
- Link navigasi: Template, Fitur, Harga, FAQ
- CTA button "Mulai Gratis"
- Responsive: hamburger menu di mobile

#### `Sidebar.tsx`
- Hanya muncul di route group `(dashboard)`
- Menu: Dashboard, Undangan, Tamu, RSVP, Galeri, Musik, Pengaturan, Billing
- Collapsible di mobile (drawer dari kiri)
- Active state dengan highlight gold
- User avatar + nama di bagian bawah

#### `ThemeProvider.tsx`
- Wraps seluruh app dengan `next-themes`
- Support dark mode / light mode
- Tersimpan di localStorage user

#### `LenisProvider.tsx`
- Inisialisasi Lenis smooth scroll
- RAF (requestAnimationFrame) loop
- Destroy on unmount

---

### `src/features/` — Modul Fitur Per Domain

Setiap fitur bisnis dipisahkan dalam modul sendiri (**Feature-Sliced Design**).

```
src/features/
│
├── landing/                         ← Semua section Landing Page
│   ├── HeroSection.tsx              ← Section hero cinematic (full viewport)
│   ├── TemplatesPreview.tsx         ← Grid preview 5 template undangan
│   ├── StatsSection.tsx             ← Statistik pengguna (animated countup)
│   ├── FeaturesSection.tsx          ← Grid 6 fitur unggulan
│   ├── PricingSection.tsx           ← Tabel harga 3 paket
│   ├── TestimoniSection.tsx         ← Kartu testimoni pasangan
│   ├── FAQSection.tsx               ← Accordion FAQ interaktif
│   ├── CTASection.tsx               ← Call-to-action final sebelum footer
│   └── index.ts                     ← Re-export semua section
│
├── invitation/                      ← Template undangan digital
│   ├── templates/
│   │   ├── ElegantWedding/          ← Template Elegant (dark, gold)
│   │   │   ├── index.tsx            ← Entry point template
│   │   │   ├── OpeningScreen.tsx    ← Layar pembuka dengan nama tamu
│   │   │   ├── HeroSection.tsx      ← Nama mempelai besar cinematic
│   │   │   ├── QuoteSection.tsx     ← Ayat Al-Quran / quote
│   │   │   ├── CoupleSection.tsx    ← Profil kedua mempelai
│   │   │   ├── CountdownSection.tsx ← Hitung mundur real-time
│   │   │   ├── StoryTimeline.tsx    ← Timeline perjalanan cinta
│   │   │   ├── GallerySection.tsx   ← Grid/slider foto prewedding
│   │   │   ├── EventSection.tsx     ← Detail akad & resepsi
│   │   │   ├── MapsSection.tsx      ← Google Maps embed + petunjuk arah
│   │   │   ├── RSVPSection.tsx      ← Form konfirmasi kehadiran
│   │   │   ├── WishesSection.tsx    ← Buku ucapan tamu
│   │   │   ├── GiftSection.tsx      ← Amplop digital / rekening
│   │   │   └── ClosingSection.tsx   ← Penutup + share button
│   │   ├── Minimalist/              ← Template clean putih
│   │   ├── FloralRomance/           ← Template floral dusty rose
│   │   ├── DarkLuxury/              ← Template gelap prestisius
│   │   └── TraditionalJawa/         ← Template batik tradisional
│   │
│   ├── components/                  ← Komponen shared antar template
│   │   ├── MusicPlayer.tsx          ← Floating music button (play/pause)
│   │   ├── ShareButton.tsx          ← Floating share button (copy link, WA)
│   │   ├── RSVPForm.tsx             ← Form RSVP reusable
│   │   └── WishCard.tsx             ← Kartu ucapan tamu
│   │
│   └── hooks/
│       ├── useCountdown.ts          ← Hook hitung mundur ke tanggal tertentu
│       ├── useRSVP.ts               ← Hook submit & fetch data RSVP
│       └── useWishes.ts             ← Hook fetch & post ucapan tamu
│
├── dashboard/                       ← Area dashboard user
│   ├── overview/
│   │   ├── StatsCards.tsx           ← Kartu ringkasan: views, RSVP, tamu
│   │   ├── RSVPChart.tsx            ← Chart grafik RSVP (Recharts)
│   │   ├── RecentActivity.tsx       ← Feed aktivitas terbaru
│   │   └── QuickActions.tsx         ← Tombol aksi cepat
│   │
│   ├── invitations/
│   │   ├── InvitationList.tsx       ← Table/grid daftar undangan
│   │   ├── InvitationCard.tsx       ← Kartu satu undangan
│   │   ├── InvitationForm.tsx       ← Form buat/edit undangan
│   │   ├── TemplateSelector.tsx     ← Pilih template saat buat undangan
│   │   └── LinkGenerator.tsx        ← Generate & copy link undangan
│   │
│   ├── guests/
│   │   ├── GuestTable.tsx           ← Tabel data tamu (sortable, filterable)
│   │   ├── GuestForm.tsx            ← Form tambah/edit tamu manual
│   │   ├── ImportCSV.tsx            ← Upload & parse file CSV tamu
│   │   └── ExportButton.tsx         ← Export data tamu ke CSV/Excel
│   │
│   ├── rsvp/
│   │   ├── RSVPTable.tsx            ← Tabel data konfirmasi kehadiran
│   │   ├── RSVPFilter.tsx           ← Filter: hadir/tidak/belum konfirmasi
│   │   └── RSVPStats.tsx            ← Statistik RSVP (chart pie)
│   │
│   ├── gallery/
│   │   ├── GalleryGrid.tsx          ← Grid foto yang sudah diupload
│   │   ├── UploadZone.tsx           ← Drag & drop upload foto
│   │   └── ImageCard.tsx            ← Kartu satu foto dengan aksi hapus
│   │
│   ├── music/
│   │   ├── MusicList.tsx            ← Daftar musik yang tersedia
│   │   ├── UploadMusic.tsx          ← Upload file musik
│   │   └── MusicPlayer.tsx          ← Preview putar musik
│   │
│   └── settings/
│       ├── ProfileForm.tsx          ← Form edit profil user
│       ├── NotificationSettings.tsx ← Toggle notifikasi email/WA
│       ├── BillingInfo.tsx          ← Info paket aktif & upgrade
│       └── DangerZone.tsx           ← Hapus akun, reset data
│
└── rsvp/                            ← Logic RSVP yang dishare
    ├── RSVPForm.tsx                 ← Form konfirmasi tamu (dipakai di template)
    └── rsvpSchema.ts                ← Zod schema validasi form RSVP
```

---

### `src/hooks/` — Custom React Hooks

```
src/hooks/
├── useCountdown.ts          ← Hitung mundur real-time ke tanggal target
│                               Return: { days, hours, minutes, seconds }
│
├── useScrollAnimation.ts    ← IntersectionObserver untuk fade-in on scroll
│                               Return: { ref, isVisible }
│
├── useLocalStorage.ts       ← Get/set localStorage dengan TypeScript
│                               Return: [value, setValue]
│
├── useDebounce.ts           ← Debounce nilai input (untuk search)
│                               Return: debouncedValue
│
├── useMediaQuery.ts         ← Deteksi breakpoint responsive
│                               Return: isMobile, isTablet, isDesktop
│
├── useCopyToClipboard.ts    ← Copy teks ke clipboard + feedback
│                               Return: { copy, copied }
│
├── useMusic.ts              ← Control audio play/pause/volume
│                               Return: { playing, toggle, volume, setVolume }
│
└── useInvitation.ts         ← Fetch data undangan berdasarkan slug
                                Return: { invitation, loading, error }
```

---

### `src/lib/` — Konfigurasi Library & Utilities

```
src/lib/
├── axios.ts                 ← Instance Axios dengan interceptor auth & error
├── cn.ts                    ← Utility: clsx + tailwind-merge
│                               Usage: cn('class1', condition && 'class2')
├── fonts.ts                 ← Definisi Google Fonts (Cormorant + DM Sans)
├── metadata.ts              ← Helper generateMetadata untuk SEO
├── cloudinary.ts            ← Config Cloudinary upload preset
└── validations/
    ├── rsvpSchema.ts        ← Zod schema form RSVP
    ├── invitationSchema.ts  ← Zod schema buat/edit undangan
    └── guestSchema.ts       ← Zod schema tambah tamu
```

---

### `src/services/` — API Service Layer

Abstraksi semua pemanggilan API. Komponen tidak boleh memanggil `axios` langsung.

```
src/services/
├── invitationService.ts     ← CRUD undangan
│   ├── getInvitations()     ← GET semua undangan milik user
│   ├── getInvitationBySlug()← GET undangan publik by slug
│   ├── createInvitation()   ← POST buat undangan baru
│   ├── updateInvitation()   ← PUT edit undangan
│   └── deleteInvitation()   ← DELETE hapus undangan
│
├── guestService.ts          ← Manajemen tamu
│   ├── getGuests()          ← GET daftar tamu
│   ├── addGuest()           ← POST tambah tamu
│   ├── importGuests()       ← POST import CSV
│   └── exportGuests()       ← GET export CSV
│
├── rsvpService.ts           ← Konfirmasi kehadiran
│   ├── submitRSVP()         ← POST submit konfirmasi tamu
│   └── getRSVPs()           ← GET semua RSVP per undangan
│
├── wishService.ts           ← Ucapan tamu
│   ├── getWishes()          ← GET ucapan per undangan
│   └── postWish()           ← POST tambah ucapan
│
├── uploadService.ts         ← Upload file ke Cloudinary
│   ├── uploadImage()        ← Upload foto
│   └── uploadAudio()        ← Upload musik
│
└── authService.ts           ← Autentikasi (siap untuk backend)
    ├── login()
    ├── register()
    ├── logout()
    └── getMe()
```

---

### `src/store/` — Zustand State Management

```
src/store/
├── index.ts                 ← Export semua store
│
├── useAuthStore.ts          ← State autentikasi user
│   State:  user, token, isAuthenticated
│   Action: setUser, setToken, logout
│
├── useInvitationStore.ts    ← State undangan aktif
│   State:  invitations[], activeInvitation, activeTemplate
│   Action: setInvitations, setActive, setTemplate, addInvitation
│
├── useGuestStore.ts         ← State daftar tamu
│   State:  guests[], totalGuests, filters
│   Action: setGuests, addGuest, setFilter
│
├── useRSVPStore.ts          ← State data RSVP
│   State:  rsvps[], stats { hadir, tidakHadir, belum }
│   Action: setRSVPs, addRSVP
│
├── useUIStore.ts            ← State UI global
│   State:  sidebarOpen, activeModal, toasts[]
│   Action: toggleSidebar, openModal, closeModal
│
└── useThemeStore.ts         ← State tema aplikasi
    State:  theme ('light' | 'dark')
    Action: setTheme, toggleTheme
```

---

### `src/types/` — TypeScript Type Definitions

```
src/types/
├── invitation.ts            ← Type Invitation, Template, InvitationStatus
├── guest.ts                 ← Type Guest, RSVPStatus
├── rsvp.ts                  ← Type RSVP, RSVPStats
├── user.ts                  ← Type User, UserPlan
├── wish.ts                  ← Type Wish
├── music.ts                 ← Type MusicTrack
└── api.ts                   ← Type APIResponse<T>, PaginatedResponse<T>
```

**Contoh type penting:**

```typescript
// invitation.ts
interface Invitation {
  id: string
  slug: string
  userId: string
  groomName: string
  brideName: string
  groomFullName: string
  brideFullName: string
  weddingDate: Date
  akadTime: string
  receptionTime: string
  venueName: string
  venueAddress: string
  googleMapsUrl: string
  templateId: TemplateId
  musicUrl?: string
  galleryUrls: string[]
  status: 'draft' | 'published' | 'archived'
  plan: 'free' | 'premium' | 'pro'
  views: number
  createdAt: Date
  updatedAt: Date
}

type TemplateId = 'elegant' | 'minimalist' | 'floral' | 'dark-luxury' | 'traditional'
```

---

### `src/styles/` — Global Styles & Design Tokens

```
src/styles/
├── globals.css              ← CSS global: reset, body, scrollbar custom
└── tokens.css               ← CSS variables: warna, spacing, typography
```

**Design tokens utama:**

```css
/* tokens.css */
:root {
  /* Color palette */
  --cream:        #FAF7F2;   /* Background utama */
  --ivory:        #F5EFE3;   /* Background sekunder */
  --gold:         #C9A96E;   /* Aksen utama */
  --gold-light:   #E8D5B0;   /* Gold terang */
  --gold-dark:    #9E7A3E;   /* Gold gelap */
  --brown:        #4A3728;   /* Warna primer teks & CTA */
  --brown-light:  #7A5C42;   /* Teks sekunder */
  --sage:         #8A9E85;   /* Aksen hijau */
  --rose:         #D4A5A0;   /* Aksen merah muda */
  --charcoal:     #2C2420;   /* Background gelap */

  /* Typography */
  --font-serif:  'Cormorant Garamond';  /* Heading, nama, quotes */
  --font-sans:   'DM Sans';             /* Body text, UI */

  /* Spacing scale (8px base) */
  --space-1: 0.25rem;   /* 4px  */
  --space-2: 0.5rem;    /* 8px  */
  --space-4: 1rem;      /* 16px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  --space-20: 5rem;     /* 80px */
}
```

---

## 🔌 Tech Stack & Alasan Pemilihan

| Package | Versi | Fungsi | Alasan |
|---|---|---|---|
| `next` | 15 | Framework utama | App Router, Server Components, Image Optimization |
| `typescript` | 5 | Type safety | Mencegah bug, autocomplete lebih baik |
| `tailwindcss` | 4 | Styling utility | Cepat, konsisten, purge CSS otomatis |
| `shadcn/ui` | latest | Komponen UI | Accessible, customizable, tidak opinionated |
| `framer-motion` | 11 | Animasi React | Animasi declarative, gesture support |
| `@studio-freight/lenis` | 1 | Smooth scroll | Scroll paling smooth di web |
| `gsap` | 3 | Complex animation | Untuk timeline animasi yang kompleks |
| `swiper` | 11 | Slider/carousel | Gallery foto di template undangan |
| `zustand` | 5 | State management | Ringan, simple, tidak perlu boilerplate |
| `react-hook-form` | 7 | Form handling | Performa terbaik, uncontrolled by default |
| `zod` | 3 | Validasi schema | Type-safe validation, terintegrasi RHF |
| `axios` | 1 | HTTP client | Interceptor mudah untuk auth token |
| `date-fns` | 3 | Date utility | Ringan, tree-shakeable, modern |
| `sonner` | 1 | Toast notification | Animasi smooth, simple API |
| `next-themes` | 0.4 | Dark mode | Terintegrasi sempurna dengan Next.js |
| `recharts` | 2 | Chart dashboard | React-native, customizable |
| `next-cloudinary` | 6 | Upload media | Integrasi Cloudinary untuk Next.js |
| `react-countup` | 6 | Animasi angka | Untuk section statistik di landing page |
| `react-intersection-observer` | 9 | Scroll trigger | Trigger animasi saat element masuk viewport |
| `clsx` + `tailwind-merge` | - | Class utility | Gabung class Tailwind tanpa konflik |

---

## 🌐 Environment Variables

Buat file `.env.local` di root project:

```env
# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=Kundangan

# Cloudinary (media upload)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=kundangan_unsigned

# Database (siap untuk backend)
DATABASE_URL=postgresql://user:password@localhost:5432/kundangan

# Auth (siap untuk backend)
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000

# Google Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_maps_key
```

---

## 🚀 Cara Menjalankan Project

```bash
# 1. Clone & install
git clone https://github.com/username/kundangan.git
cd kundangan
npm install

# 2. Setup environment
cp .env.example .env.local
# Edit .env.local sesuai kebutuhan

# 3. Jalankan development server
npm run dev
# Buka http://localhost:3000

# 4. Build production
npm run build
npm run start

# 5. Lint & type check
npm run lint
npm run type-check
```

---

## 📋 Panduan Pengembangan

### Naming Convention

```
Komponen React    : PascalCase       → HeroSection.tsx
Hook custom       : camelCase + use  → useCountdown.ts
Service function  : camelCase        → getInvitations()
Type/Interface    : PascalCase       → Invitation, UserPlan
CSS class (Tailwind): kebab-case     → section-title
Zustand store     : camelCase + use  → useInvitationStore
```

### Cara Menambah Template Baru

1. Buat folder baru di `src/features/invitation/templates/NamaTemplate/`
2. Buat file `index.tsx` sebagai entry point
3. Tambahkan semua section sebagai komponen terpisah
4. Daftarkan di `src/types/invitation.ts` pada type `TemplateId`
5. Tambahkan preview card di `src/features/landing/TemplatesPreview.tsx`

### Cara Menambah Halaman Dashboard Baru

1. Buat file di `src/app/(dashboard)/dashboard/nama-halaman/page.tsx`
2. Buat komponen fitur di `src/features/dashboard/nama-fitur/`
3. Tambahkan menu item di `src/components/layout/Sidebar.tsx`
4. Tambahkan route ke type navigasi di `src/types/`

---

## 🏗️ Roadmap Pengembangan

### Phase 1 — Frontend (Sekarang)
- [x] Setup project Next.js + semua dependencies
- [x] Design system & Tailwind tokens
- [x] Landing page premium
- [x] Template Elegant Wedding (HTML preview)
- [ ] Convert landing page ke Next.js components
- [ ] Buat semua section landing page
- [ ] Template undangan (5 template)
- [ ] Dashboard modern (semua halaman)

### Phase 2 — Backend Integration
- [ ] Setup database (PostgreSQL + Prisma)
- [ ] API Routes lengkap
- [ ] Autentikasi (NextAuth.js)
- [ ] Upload media ke Cloudinary
- [ ] Payment gateway (Midtrans)

### Phase 3 — SaaS Features
- [ ] Multi-tenant architecture
- [ ] Custom domain support
- [ ] Email notifikasi (Resend)
- [ ] WhatsApp notifikasi (Fonnte)
- [ ] Analytics dashboard advanced
- [ ] Admin panel

---

## 👥 Kontribusi

Project ini adalah project pribadi yang sedang dikembangkan. Untuk pertanyaan atau diskusi arsitektur, hubungi owner project.

---

*Dokumentasi ini dibuat dan dipelihara bersama AI agent. Update dokumen ini setiap kali ada perubahan arsitektur signifikan.*
