"use client";

import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { CoupleInfoForm } from "./forms/CoupleInfoForm";
import { ParentsInfoForm } from "./forms/ParentsInfoForm";
import { CoverScreenForm } from "./forms/CoverScreenForm";
import { HeroSectionForm } from "./forms/HeroSectionForm";
import { EventsForm } from "./forms/EventsForm";
import { CountdownForm } from "./forms/CountdownForm";
import { LoveStoryForm } from "./forms/LoveStoryForm";
import { GalleryForm } from "./forms/GalleryForm";
import { MomentsForm } from "./forms/MomentsForm";
import { VideoForm } from "./forms/VideoForm";
import { GiftForm } from "./forms/GiftForm";
import { RSVPForm } from "./forms/RSVPForm";
import { MusicForm } from "./forms/MusicForm";
import { ThemeForm } from "./forms/ThemeForm";
import { SEOForm } from "./forms/SEOForm";
import { PublishForm } from "./forms/PublishForm";
import { Check, ChevronLeft, ChevronRight, Eye, EyeOff, Monitor, Save, Send, Smartphone, X } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface InvitationBuilderProps {
  invitationId?: string;
  mode: "create" | "edit";
}

type TabId =
  | "theme" | "couple" | "parents" | "cover" | "hero"
  | "events" | "countdown" | "lovestory" | "gallery"
  | "moments" | "video" | "gift" | "rsvp"
  | "music" | "seo" | "publish";

interface TabDefinition {
  id: TabId;
  label: string;
}

const TABS: TabDefinition[] = [
  { id: "theme", label: "Tema" },
  { id: "couple", label: "Mempelai" },
  { id: "parents", label: "Orang Tua" },
  { id: "cover", label: "Sampul" },
  { id: "hero", label: "Hero" },
  { id: "events", label: "Acara" },
  { id: "countdown", label: "Hitung Mundur" },
  { id: "lovestory", label: "Cerita Cinta" },
  { id: "gallery", label: "Galeri" },
  { id: "moments", label: "Momen" },
  { id: "video", label: "Video" },
  { id: "gift", label: "Hadiah" },
  { id: "rsvp", label: "RSVP" },
  { id: "music", label: "Musik" },
  { id: "seo", label: "SEO" },
  { id: "publish", label: "Publikasi" },
];

export function InvitationBuilder({ invitationId, mode }: InvitationBuilderProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabId>("theme");
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [completedTabs, setCompletedTabs] = useState<Set<TabId>>(new Set());
  const [showPreview, setShowPreview] = useState(true);
  const [saving, setSaving] = useState(false);
  const [previewDevice, setPreviewDevice] = useState<"mobile" | "desktop">("mobile");
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const currentIndex = TABS.findIndex((t) => t.id === activeTab);

  // Auto-generate slug from couple names
  const autoSlug = useMemo(() => {
    const couple = (formData.couple as any) || {};
    const bride = couple.brideName || "";
    const groom = couple.groomName || "";
    if (!bride && !groom) return "";
    return `${bride}-${groom}`
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 50);
  }, [formData.couple]);

  // Preview data - transforms formData into flat invitation object
  const previewData = useMemo(() => {
    const d = formData;
    const theme = d.theme || {};
    const couple = d.couple || {};
    const parents = d.parents || {};
    const cover = d.cover || {};
    const hero = d.hero || {};
    const events = d.events || { events: [] };
    const countdown = d.countdown || {};
    const lovestory = d.lovestory || { stories: [] };
    const gallery = d.gallery || { galleryImages: [] };
    const moments = d.moments || { moments: [] };
    const video = d.video || { videos: [] };
    const gift = d.gift || { bankAccounts: [] };
    const music = d.music || {};
    const seo = d.seo || {};

    return {
      templateId: theme.templateId || "",
      brideName: couple.brideName || "",
      groomName: couple.groomName || "",
      brideFullName: couple.brideFullName || "",
      groomFullName: couple.groomFullName || "",
      brideNickname: couple.brideNickname || "",
      groomNickname: couple.groomNickname || "",
      bridePhoto: couple.bridePhoto || "",
      groomPhoto: couple.groomPhoto || "",
      couplePhoto: couple.couplePhoto || "",
      brideDescription: couple.brideDescription || "",
      groomDescription: couple.groomDescription || "",
      brideInstagram: couple.brideInstagram || "",
      groomInstagram: couple.groomInstagram || "",
      brideFatherName: parents.brideFatherName || "",
      brideMotherName: parents.brideMotherName || "",
      groomFatherName: parents.groomFatherName || "",
      groomMotherName: parents.groomMotherName || "",
      coverTitle: cover.coverTitle || "",
      coverGuestName: cover.coverGuestName || "",
      coverBackground: cover.coverBackground || "",
      coverPhoto: cover.coverPhoto || "",
      coverQuote: cover.coverQuote || "",
      heroImage: hero.heroImage || "",
      heroBackground: hero.heroBackground || "",
      heroQuote: hero.heroQuote || "",
      countdownTarget: countdown.countdownTarget || null,
      selectedMusic: music.selectedMusic || "",
      musicUrl: music.musicUrl || "",
      musicTitle: music.musicTitle || "",
      metaTitle: seo.metaTitle || "",
      metaDescription: seo.metaDescription || "",
      slug: autoSlug,
      themeCustomization: theme.themeCustomization || {},
      events: events.events || [],
      loveStories: (lovestory.stories || []).map((s: any) => ({
        ...s,
        photo: s.photoUrl || s.photo,
      })),
      moments: (moments.moments || []).map((m: any) => ({
        ...m,
        photo: m.imageUrl || m.photo,
      })),
      videos: video.videos || [],
      gallery: gallery.galleryImages || [],
      bankAccounts: gift.bankAccounts || [],
    };
  }, [formData, autoSlug]);

  // Load existing invitation data in edit mode
  useEffect(() => {
    if (mode === "edit" && invitationId) {
      axios.get(`/api/invitations/${invitationId}`)
        .then(res => {
          const inv = res.data;
          // Transform API data back to form structure
          setFormData({
            theme: {
              templateId: inv.templateId,
              themeCustomization: inv.themeCustomization,
            },
            couple: {
              brideName: inv.brideName,
              groomName: inv.groomName,
              brideFullName: inv.brideFullName,
              groomFullName: inv.groomFullName,
              brideNickname: inv.brideNickname,
              groomNickname: inv.groomNickname,
              bridePhoto: inv.bridePhoto,
              groomPhoto: inv.groomPhoto,
              couplePhoto: inv.couplePhoto,
              brideDescription: inv.brideDescription,
              groomDescription: inv.groomDescription,
              brideInstagram: inv.brideInstagram,
              groomInstagram: inv.groomInstagram,
            },
            parents: {
              brideFatherName: inv.brideFatherName,
              brideMotherName: inv.brideMotherName,
              groomFatherName: inv.groomFatherName,
              groomMotherName: inv.groomMotherName,
            },
            cover: {
              coverTitle: inv.coverTitle,
              coverGuestName: inv.coverGuestName,
              coverBackground: inv.coverBackground,
              coverPhoto: inv.coverPhoto,
              coverQuote: inv.coverQuote,
            },
            hero: {
              heroImage: inv.heroImage,
              heroBackground: inv.heroBackground,
              heroQuote: inv.heroQuote,
            },
            events: {
              events: inv.events || [],
            },
            countdown: {
              countdownTarget: inv.countdownTarget,
            },
            lovestory: {
              stories: (inv.loveStories || []).map((s: any) => ({
                ...s,
                photoUrl: s.photo,
              })),
            },
            gallery: {
              galleryImages: inv.gallery || [],
            },
            moments: {
              moments: (inv.moments || []).map((m: any) => ({
                ...m,
                imageUrl: m.photo,
              })),
            },
            video: {
              videos: inv.videos || [],
            },
            gift: {
              bankAccounts: (inv.virtualGifts || []).map((g: any) => ({
                bankName: g.provider,
                accountNumber: g.accountNumber,
                accountName: g.accountName,
              })),
            },
            rsvp: {
              enableRsvp: inv.isRsvpEnabled,
              rsvpDeadline: inv.rsvpDeadline,
              maxGuests: inv.maxGuests,
              confirmMessage: inv.confirmMessage,
            },
            music: {
              selectedMusic: inv.selectedMusic,
              musicUrl: inv.musicUrl,
              musicTitle: inv.musicTitle,
            },
            seo: {
              metaTitle: inv.metaTitle,
              metaDescription: inv.metaDescription,
            },
          });
        })
        .catch(err => {
          console.error("Failed to load invitation:", err);
          alert("Gagal memuat data undangan");
        });
    }
  }, [mode, invitationId]);

  // Send live preview data to iframe via postMessage (no reload)
  useEffect(() => {
    iframeRef.current?.contentWindow?.postMessage({
      type: "preview-update",
      data: previewData,
    }, "*");
  }, [previewData]);

  const handleSave = useCallback((tabId: TabId, data: any) => {
    setFormData((prev) => ({ ...prev, [tabId]: data }));
    setCompletedTabs((prev) => new Set(prev).add(tabId));
  }, []);

  const handleChange = useCallback((tabId: TabId, data: any) => {
    setFormData((prev) => ({ ...prev, [tabId]: data }));
  }, []);

  const goNext = () => {
    if (currentIndex < TABS.length - 1) {
      setActiveTab(TABS[currentIndex + 1].id);
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      setActiveTab(TABS[currentIndex - 1].id);
    }
  };

  const handleSubmitAll = async () => {
    setSaving(true);
    try {
      const payload = {
        ...previewData,
        slug: autoSlug || formData.seo?.slug || undefined,
        isPublished: formData.publish?.status === "published",
      };

      if (mode === "edit" && invitationId) {
        await axios.put(`/api/invitations/${invitationId}`, payload);
      } else {
        await axios.post("/api/invitations", payload);
      }

      router.push("/dashboard/invitations");
    } catch (err) {
      console.error("Save error:", err);
      alert("Gagal menyimpan undangan. Silakan coba lagi.");
    } finally {
      setSaving(false);
    }
  };

  const renderForm = () => {
    const commonProps = {
      defaultValues: formData[activeTab] as Record<string, any> | undefined,
      onSave: (data: any) => handleSave(activeTab, data),
      onChange: (data: any) => handleChange(activeTab, data),
      onNext: goNext,
      onPrev: goPrev,
    };

    switch (activeTab) {
      case "theme": return <ThemeForm {...commonProps} />;
      case "couple": return <CoupleInfoForm {...commonProps} />;
      case "parents": return <ParentsInfoForm {...commonProps} />;
      case "cover": return <CoverScreenForm {...commonProps} />;
      case "hero": return <HeroSectionForm {...commonProps} />;
      case "events": return <EventsForm {...commonProps} />;
      case "countdown": return <CountdownForm {...commonProps} />;
      case "lovestory": return <LoveStoryForm {...commonProps} />;
      case "gallery": return <GalleryForm {...commonProps} />;
      case "moments": return <MomentsForm {...commonProps} />;
      case "video": return <VideoForm {...commonProps} />;
      case "gift": return <GiftForm {...commonProps} />;
      case "rsvp": return <RSVPForm {...commonProps} />;
      case "music": return <MusicForm {...commonProps} />;
      case "seo": return <SEOForm {...commonProps} slug={autoSlug} />;
      case "publish":
        return (
          <PublishForm
            defaultValues={formData.publish as Record<string, any> | undefined}
            onSave={(data) => handleSave("publish", data)}
            onPrev={goPrev}
            invitationSlug={autoSlug}
          />
        );
      default: return null;
    }
  };

  // Count filled sections
  const filledCount = useMemo(() => {
    return TABS.filter((t) => {
      const data = formData[t.id];
      if (!data) return false;
      // Check if object has any non-empty values
      if (typeof data === 'object' && !Array.isArray(data)) {
        return Object.values(data).some(v => {
          if (Array.isArray(v)) return v.length > 0;
          if (typeof v === 'string') return v.trim() !== '';
          if (typeof v === 'boolean') return true;
          return v != null;
        });
      }
      return true;
    }).length;
  }, [formData]);

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-cream">
      {/* Top Bar */}
      <div className="border-b border-gold/15 bg-white/80 px-6 py-3 backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-serif text-2xl text-brown">
              {mode === "create" ? "Buat Undangan" : "Edit Undangan"}
            </h1>
            <p className="text-xs text-brown-light">
              {filledCount}/{TABS.length} bagian terisi
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => router.push("/dashboard/invitations")}
              className="rounded-xl border border-gold/20 px-4 py-2 text-sm text-brown transition hover:bg-gold/10"
            >
              Kembali
            </button>
            <button
              type="button"
              onClick={() => setShowPreview(!showPreview)}
              className={`rounded-xl border px-4 py-2 text-sm transition ${
                showPreview
                  ? "border-brown bg-brown text-gold-light"
                  : "border-gold/20 text-brown hover:bg-gold/10"
              }`}
            >
              {showPreview ? <EyeOff className="inline size-4 mr-1" /> : <Eye className="inline size-4 mr-1" />}
              Preview
            </button>
            <button
              type="button"
              onClick={handleSubmitAll}
              disabled={saving}
              className="flex items-center gap-2 rounded-xl bg-brown px-5 py-2 text-sm text-gold-light transition hover:bg-gold hover:text-brown disabled:opacity-50"
            >
              {saving ? (
                <span className="inline-block size-4 animate-spin rounded-full border-2 border-gold-light border-t-transparent" />
              ) : (
                <Save className="size-4" />
              )}
              {mode === "edit" ? "Simpan" : "Simpan"}
            </button>
            <button
              type="button"
              onClick={async () => {
                await handleSubmitAll();
                window.open(`/invitation/${autoSlug}`, "_blank");
              }}
              disabled={saving}
              className="flex items-center gap-2 rounded-xl bg-green-700 px-5 py-2 text-sm text-white transition hover:bg-green-800 disabled:opacity-50"
            >
              <Send className="size-4" />
              Publish
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Navigation */}
        <aside className="w-48 shrink-0 border-r border-gold/10 bg-white/50 overflow-y-auto">
          <nav className="space-y-0.5 p-2">
            {TABS.map((tab, index) => {
              const isActive = activeTab === tab.id;
              const isCompleted = completedTabs.has(tab.id) || !!formData[tab.id];
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs transition-all ${
                    isActive
                      ? "bg-brown text-white shadow"
                      : "text-brown-light hover:bg-gold/10 hover:text-brown"
                  }`}
                >
                  <div
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-medium ${
                      isActive
                        ? "bg-gold text-brown"
                        : isCompleted
                          ? "bg-green-100 text-green-700"
                          : "border border-gold/30 text-brown-light"
                    }`}
                  >
                    {isCompleted ? <Check className="size-3" /> : index + 1}
                  </div>
                  <span className="truncate">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Form Area */}
        <main className={`flex flex-col overflow-hidden transition-all ${showPreview ? "w-1/2" : "flex-1"}`}>
          <div className="border-b border-gold/10 bg-white px-6 py-3">
            <h2 className="font-serif text-xl text-brown">
              {TABS.find((t) => t.id === activeTab)?.label}
            </h2>
            <p className="text-xs text-brown-light">
              Step {currentIndex + 1} dari {TABS.length}
            </p>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-4">
            {renderForm()}
          </div>

          {/* Bottom Navigation */}
          <div className="border-t border-gold/10 bg-white px-6 py-3">
            <div className="flex items-center justify-between">
              <div className="flex gap-1">
                {TABS.map((t, i) => (
                  <div
                    key={t.id}
                    className={`h-1 rounded-full transition-all ${
                      i <= currentIndex
                        ? completedTabs.has(t.id) || !!formData[t.id] || i === currentIndex
                          ? "bg-gold"
                          : "bg-gold/30"
                        : "bg-gray-200"
                    } ${i === currentIndex ? "w-6" : "w-3"}`}
                  />
                ))}
              </div>

              <div className="flex gap-2">
                {currentIndex > 0 && (
                  <button
                    type="button"
                    onClick={goPrev}
                    className="flex items-center gap-1 rounded-lg border border-gold/20 px-3 py-1.5 text-xs text-brown transition hover:bg-gold/10"
                  >
                    <ChevronLeft className="size-3" />
                    Sebelumnya
                  </button>
                )}
                {currentIndex < TABS.length - 1 && (
                  <button
                    type="button"
                    onClick={goNext}
                    className="flex items-center gap-1 rounded-lg bg-brown px-4 py-1.5 text-xs text-gold-light transition hover:bg-gold hover:text-brown"
                  >
                    Selanjutnya
                    <ChevronRight className="size-3" />
                  </button>
                )}
                {currentIndex === TABS.length - 1 && (
                  <button
                    type="button"
                    onClick={handleSubmitAll}
                    disabled={saving}
                    className="flex items-center gap-1 rounded-lg bg-green-700 px-4 py-1.5 text-xs text-white transition hover:bg-green-800"
                  >
                    <Save className="size-3" />
                    {saving ? "Menyimpan..." : "Simpan Undangan"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </main>

        {/* VisualBuilder Preview Panel */}
        {showPreview && (
          <aside className="w-1/2 border-l border-gold/10 bg-[#0D0D0D] overflow-hidden flex flex-col">
            {/* Preview Toolbar */}
            <div className="flex items-center justify-between border-b border-white/10 bg-black/60 px-4 py-2">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setPreviewDevice("mobile")}
                  className={`rounded-lg p-2 transition ${previewDevice === "mobile" ? "bg-white/15 text-white" : "text-white/40 hover:text-white/70"}`}
                >
                  <Smartphone className="size-4" />
                </button>
                <button
                  onClick={() => setPreviewDevice("desktop")}
                  className={`rounded-lg p-2 transition ${previewDevice === "desktop" ? "bg-white/15 text-white" : "text-white/40 hover:text-white/70"}`}
                >
                  <Monitor className="size-4" />
                </button>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-white/30">Live Preview</span>
                <button
                  type="button"
                  onClick={() => {
                    sessionStorage.setItem("preview-data", JSON.stringify(previewData));
                    window.open("/preview/builder", "_blank");
                  }}
                  className="text-[10px] text-gold hover:underline"
                >
                  Tab baru
                </button>
              </div>
            </div>

            {/* Preview Area */}
            <div className="flex flex-1 items-center justify-center overflow-hidden bg-[#0D0D0D] p-4">
              {previewData.templateId ? (
                <div
                  className={`relative transition-all duration-200 ${
                    previewDevice === "mobile"
                      ? "h-[780px] w-[390px] shrink-0 rounded-[3rem] border-[4px] border-[#222] bg-[#000] shadow-2xl"
                      : "h-full w-full max-w-4xl"
                  }`}
                >
                  {previewDevice === "mobile" && (
                    <>
                      <div className="absolute left-1/2 top-0 z-20 h-[30px] w-[120px] -translate-x-1/2 rounded-b-2xl bg-[#000]" />
                      <div className="absolute left-1/2 top-[10px] z-20 h-[14px] w-[14px] -translate-x-1/2 rounded-full bg-[#222]" />
                      <div className="absolute left-[-6px] top-[140px] z-10 h-[50px] w-[4px] rounded-r bg-[#333]" />
                      <div className="absolute left-[-6px] top-[200px] z-10 h-[60px] w-[4px] rounded-r bg-[#333]" />
                      <div className="absolute right-[-6px] top-[160px] z-10 h-[70px] w-[4px] rounded-l bg-[#333]" />
                    </>
                  )}
                  <iframe
                    ref={iframeRef}
                    src={`/preview/builder`}
                    className={`h-full w-full border-0 bg-white ${
                      previewDevice === "mobile" ? "rounded-[2.6rem]" : "rounded-2xl border border-white/10 shadow-2xl"
                    }`}
                    title="Preview"
                    sandbox="allow-same-origin allow-scripts"
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center text-white/40 text-sm p-8 text-center">
                  <div>
                    <Eye className="mx-auto mb-3 size-10 opacity-30" />
                    <p>Pilih tema terlebih dahulu</p>
                    <p className="text-xs mt-1">untuk melihat preview</p>
                  </div>
                </div>
              )}
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
