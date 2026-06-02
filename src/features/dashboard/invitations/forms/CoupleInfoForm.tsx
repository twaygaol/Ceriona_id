"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Upload, AtSign, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAutoSaveForm } from "@/hooks/useAutoSaveForm";
import { uploadToCloudinary } from "@/lib/upload";
import { useRef, useState } from "react";

const coupleInfoSchema = z.object({
  brideName: z.string().optional(),
  groomName: z.string().optional(),
  brideFullName: z.string().optional(),
  groomFullName: z.string().optional(),
  brideNickname: z.string().optional(),
  groomNickname: z.string().optional(),
  bridePhoto: z.string().optional(),
  groomPhoto: z.string().optional(),
  couplePhoto: z.string().optional(),
  brideDescription: z.string().optional(),
  groomDescription: z.string().optional(),
  brideInstagram: z.string().optional(),
  groomInstagram: z.string().optional(),
});

type CoupleInfoFormData = z.infer<typeof coupleInfoSchema>;

interface CoupleInfoFormProps {
  defaultValues?: Partial<CoupleInfoFormData>;
  onSave: (data: CoupleInfoFormData) => void;
  onNext?: () => void;
  onChange?: (data: CoupleInfoFormData) => void;
}

export function CoupleInfoForm({ defaultValues, onSave, onNext, onChange }: CoupleInfoFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    getValues,
  } = useForm<CoupleInfoFormData>({
    resolver: zodResolver(coupleInfoSchema),
    defaultValues,
  });

  useAutoSaveForm(watch, onChange);

  const [uploadingBride, setUploadingBride] = useState(false);
  const [uploadingGroom, setUploadingGroom] = useState(false);
  const [uploadingCouple, setUploadingCouple] = useState(false);
  
  const brideInputRef = useRef<HTMLInputElement>(null);
  const groomInputRef = useRef<HTMLInputElement>(null);
  const coupleInputRef = useRef<HTMLInputElement>(null);

  const handleBrideUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploadingBride(true);
      const url = await uploadToCloudinary(file);
      setValue("bridePhoto", url, { shouldDirty: true, shouldTouch: true, shouldValidate: true });
      // Trigger onChange manually for immediate preview update
      if (onChange) onChange(getValues());
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload gagal. Silakan coba lagi.");
    } finally {
      setUploadingBride(false);
    }
  };

  const handleGroomUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploadingGroom(true);
      const url = await uploadToCloudinary(file);
      setValue("groomPhoto", url, { shouldDirty: true, shouldTouch: true, shouldValidate: true });
      // Trigger onChange manually for immediate preview update
      if (onChange) onChange(getValues());
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload gagal. Silakan coba lagi.");
    } finally {
      setUploadingGroom(false);
    }
  };

  const handleCoupleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploadingCouple(true);
      const url = await uploadToCloudinary(file);
      setValue("couplePhoto", url, { shouldDirty: true, shouldTouch: true, shouldValidate: true });
      // Trigger onChange manually for immediate preview update
      if (onChange) onChange(getValues());
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload gagal. Silakan coba lagi.");
    } finally {
      setUploadingCouple(false);
    }
  };

  const onSubmit = (data: CoupleInfoFormData) => {
    onSave(data);
    if (onNext) onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Mempelai Wanita */}
      <div className="rounded-2xl border border-gold/15 bg-white p-6">
        <h3 className="mb-6 font-serif text-2xl text-brown">Mempelai Wanita</h3>
        
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-brown">
              Nama Panggilan <span className="text-red-500">*</span>
            </label>
            <input
              {...register("brideName")}
              className="w-full rounded-xl border border-gold/20 bg-white px-4 py-3 text-brown outline-none transition focus:border-brown"
              placeholder="Contoh: Salsabila"
            />
            {errors.brideName && (
              <p className="mt-1 text-sm text-red-500">{errors.brideName.message}</p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-brown">
              Nama Lengkap
            </label>
            <input
              {...register("brideFullName")}
              className="w-full rounded-xl border border-gold/20 bg-white px-4 py-3 text-brown outline-none transition focus:border-brown"
              placeholder="Contoh: Salsabila Putri Maharani"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-brown">
              Nama Panggilan Alternatif
            </label>
            <input
              {...register("brideNickname")}
              className="w-full rounded-xl border border-gold/20 bg-white px-4 py-3 text-brown outline-none transition focus:border-brown"
              placeholder="Contoh: Salsa"
            />
            <p className="mt-1 text-xs text-brown-light">
              Nama panggilan yang lebih akrab (opsional)
            </p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-brown">
              Deskripsi Singkat
            </label>
            <textarea
              {...register("brideDescription")}
              rows={3}
              className="w-full rounded-xl border border-gold/20 bg-white px-4 py-3 text-brown outline-none transition focus:border-brown"
              placeholder="Contoh: Putri pertama dari Bapak Ahmad dan Ibu Siti"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-brown">
              Instagram
            </label>
            <div className="relative">
              <AtSign className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-brown-light" />
              <input
                {...register("brideInstagram")}
                className="w-full rounded-xl border border-gold/20 bg-white py-3 pl-12 pr-4 text-brown outline-none transition focus:border-brown"
                placeholder="@username"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-brown">
              Foto Mempelai Wanita
            </label>
            <div className="flex items-center gap-4">
              {watch("bridePhoto") && (
                <img
                  src={watch("bridePhoto")}
                  alt="Bride"
                  className="h-24 w-24 rounded-xl object-cover"
                />
              )}
              <input
                ref={brideInputRef}
                type="file"
                accept="image/*"
                onChange={handleBrideUpload}
                className="hidden"
              />
              <Button 
                type="button" 
                variant="outline" 
                className="gap-2"
                onClick={() => brideInputRef.current?.click()}
                disabled={uploadingBride}
              >
                {uploadingBride ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="size-4" />
                    Upload Foto
                  </>
                )}
              </Button>
            </div>
            <p className="mt-1 text-xs text-brown-light">
              Foto portrait mempelai wanita (opsional)
            </p>
          </div>
        </div>
      </div>

      {/* Mempelai Pria */}
      <div className="rounded-2xl border border-gold/15 bg-white p-6">
        <h3 className="mb-6 font-serif text-2xl text-brown">Mempelai Pria</h3>
        
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-brown">
              Nama Panggilan <span className="text-red-500">*</span>
            </label>
            <input
              {...register("groomName")}
              className="w-full rounded-xl border border-gold/20 bg-white px-4 py-3 text-brown outline-none transition focus:border-brown"
              placeholder="Contoh: Rizky"
            />
            {errors.groomName && (
              <p className="mt-1 text-sm text-red-500">{errors.groomName.message}</p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-brown">
              Nama Lengkap
            </label>
            <input
              {...register("groomFullName")}
              className="w-full rounded-xl border border-gold/20 bg-white px-4 py-3 text-brown outline-none transition focus:border-brown"
              placeholder="Contoh: Rizky Pratama Wijaya"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-brown">
              Nama Panggilan Alternatif
            </label>
            <input
              {...register("groomNickname")}
              className="w-full rounded-xl border border-gold/20 bg-white px-4 py-3 text-brown outline-none transition focus:border-brown"
              placeholder="Contoh: Rizki"
            />
            <p className="mt-1 text-xs text-brown-light">
              Nama panggilan yang lebih akrab (opsional)
            </p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-brown">
              Deskripsi Singkat
            </label>
            <textarea
              {...register("groomDescription")}
              rows={3}
              className="w-full rounded-xl border border-gold/20 bg-white px-4 py-3 text-brown outline-none transition focus:border-brown"
              placeholder="Contoh: Putra kedua dari Bapak Budi dan Ibu Ani"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-brown">
              Instagram
            </label>
            <div className="relative">
              <AtSign className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-brown-light" />
              <input
                {...register("groomInstagram")}
                className="w-full rounded-xl border border-gold/20 bg-white py-3 pl-12 pr-4 text-brown outline-none transition focus:border-brown"
                placeholder="@username"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-brown">
              Foto Mempelai Pria
            </label>
            <div className="flex items-center gap-4">
              {watch("groomPhoto") && (
                <img
                  src={watch("groomPhoto")}
                  alt="Groom"
                  className="h-24 w-24 rounded-xl object-cover"
                />
              )}
              <input
                ref={groomInputRef}
                type="file"
                accept="image/*"
                onChange={handleGroomUpload}
                className="hidden"
              />
              <Button 
                type="button" 
                variant="outline" 
                className="gap-2"
                onClick={() => groomInputRef.current?.click()}
                disabled={uploadingGroom}
              >
                {uploadingGroom ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="size-4" />
                    Upload Foto
                  </>
                )}
              </Button>
            </div>
            <p className="mt-1 text-xs text-brown-light">
              Foto portrait mempelai pria (opsional)
            </p>
          </div>
        </div>
      </div>

      {/* Foto Bersama */}
      <div className="rounded-2xl border border-gold/15 bg-white p-6">
        <h3 className="mb-6 font-serif text-2xl text-brown">Foto Bersama</h3>
        
        <div>
          <label className="mb-2 block text-sm font-medium text-brown">
            Foto Couple
          </label>
          <div className="flex items-center gap-4">
            {watch("couplePhoto") && (
              <img
                src={watch("couplePhoto")}
                alt="Couple"
                className="h-32 w-32 rounded-xl object-cover"
              />
            )}
            <input
              ref={coupleInputRef}
              type="file"
              accept="image/*"
              onChange={handleCoupleUpload}
              className="hidden"
            />
            <Button 
              type="button" 
              variant="outline" 
              className="gap-2"
              onClick={() => coupleInputRef.current?.click()}
              disabled={uploadingCouple}
            >
              {uploadingCouple ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="size-4" />
                  Upload Foto
                </>
              )}
            </Button>
          </div>
          <p className="mt-1 text-xs text-brown-light">
            Foto bersama kedua mempelai (opsional)
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <Button type="button" variant="outline">
          Simpan Draft
        </Button>
        <Button type="submit" className="bg-brown text-gold-light hover:bg-gold hover:text-brown">
          Simpan & Lanjutkan
        </Button>
      </div>
    </form>
  );
}
