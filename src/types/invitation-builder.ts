// Complete Wedding Invitation Data Types

export interface CoupleInfo {
  brideName: string;
  groomName: string;
  brideFullName?: string;
  groomFullName?: string;
  brideNickname?: string;
  groomNickname?: string;
  bridePhoto?: string;
  groomPhoto?: string;
  couplePhoto?: string;
  brideDescription?: string;
  groomDescription?: string;
  brideInstagram?: string;
  groomInstagram?: string;
}

export interface ParentsInfo {
  brideFatherName?: string;
  brideMotherName?: string;
  groomFatherName?: string;
  groomMotherName?: string;
}

export interface CoverScreen {
  coverTitle?: string;
  coverGuestName?: string;
  coverBackground?: string;
  coverPhoto?: string;
  coverQuote?: string;
}

export interface HeroSection {
  heroImage?: string;
  heroBackground?: string;
  heroQuote?: string;
}

export interface Event {
  id: string;
  name: string;
  date: Date | string;
  time: string;
  location: string;
  address?: string;
  googleMapsUrl?: string;
  order: number;
}

export interface LoveStory {
  id: string;
  title: string;
  description: string;
  date?: string;
  photo?: string;
  order: number;
}

export interface Moment {
  id: string;
  title: string;
  description?: string;
  photo?: string;
  date?: string;
  order: number;
}

export interface Video {
  id: string;
  type: "youtube" | "upload";
  url: string;
  title?: string;
  thumbnail?: string;
  order: number;
}

export interface GalleryImage {
  id: string;
  url: string;
  caption?: string;
  order: number;
}

export interface VirtualGift {
  id: string;
  type: "bank" | "ewallet" | "qris";
  provider: string;
  accountNumber?: string;
  accountName?: string;
  qrImageUrl?: string;
  isActive: boolean;
}

export interface SEOData {
  metaTitle?: string;
  metaDescription?: string;
  metaCoverImage?: string;
}

export interface ThemeCustomization {
  colorVariant?: string;
  fontVariant?: string;
  musicVariant?: string;
  [key: string]: any;
}

export interface CompleteInvitationData {
  id: string;
  slug: string;
  title: string;
  templateId: string;
  
  // Couple & Parents
  couple: CoupleInfo;
  parents: ParentsInfo;
  
  // Sections
  cover: CoverScreen;
  hero: HeroSection;
  
  // Multiple data
  events: Event[];
  loveStories: LoveStory[];
  moments: Moment[];
  videos: Video[];
  gallery: GalleryImage[];
  virtualGifts: VirtualGift[];
  
  // Countdown
  countdownTarget?: Date | string;
  
  // Music & Customization
  selectedMusic?: string;
  musicUrl?: string;
  themeCustomization?: ThemeCustomization;
  
  // SEO
  seo: SEOData;
  
  // Publish
  isPublished: boolean;
  viewCount: number;
  
  // Meta
  userId: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

// Form data for builder (flattened for react-hook-form)
export interface InvitationBuilderFormData {
  // Basic
  title: string;
  templateId: string;
  slug: string;
  
  // Couple
  brideName: string;
  groomName: string;
  brideFullName?: string;
  groomFullName?: string;
  brideNickname?: string;
  groomNickname?: string;
  bridePhoto?: string;
  groomPhoto?: string;
  couplePhoto?: string;
  brideDescription?: string;
  groomDescription?: string;
  brideInstagram?: string;
  groomInstagram?: string;
  
  // Parents
  brideFatherName?: string;
  brideMotherName?: string;
  groomFatherName?: string;
  groomMotherName?: string;
  
  // Cover
  coverTitle?: string;
  coverGuestName?: string;
  coverBackground?: string;
  coverPhoto?: string;
  coverQuote?: string;
  
  // Hero
  heroImage?: string;
  heroBackground?: string;
  heroQuote?: string;
  
  // Countdown
  countdownTarget?: string;
  
  // Music
  selectedMusic?: string;
  
  // SEO
  metaTitle?: string;
  metaDescription?: string;
  metaCoverImage?: string;
  
  // Publish
  isPublished: boolean;
}

// API response types
export interface InvitationWithRelations extends CompleteInvitationData {
  rsvps?: any[];
  guests?: any[];
  liveStreams?: any[];
}
