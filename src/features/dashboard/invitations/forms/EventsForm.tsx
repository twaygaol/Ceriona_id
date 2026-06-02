"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, MapPin } from "lucide-react";
import { useAutoSaveForm } from "@/hooks/useAutoSaveForm";

const eventSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  date: z.string().optional(),
  time: z.string().optional(),
  location: z.string().optional(),
  address: z.string().optional(),
  googleMapsUrl: z.string().optional(),
  order: z.number(),
});

const eventsFormSchema = z.object({
  events: z.array(eventSchema).optional(),
});

type EventsFormData = z.infer<typeof eventsFormSchema>;

interface EventsFormProps {
  defaultValues?: Partial<EventsFormData>;
  onSave: (data: EventsFormData) => void;
  onNext?: () => void;
  onPrev?: () => void;
  onChange?: (data: EventsFormData) => void;
}

export function EventsForm({ defaultValues, onSave, onNext, onPrev, onChange }: EventsFormProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<EventsFormData>({
    resolver: zodResolver(eventsFormSchema),
    defaultValues: defaultValues || {
      events: [
        {
          name: "Akad Nikah",
          date: "",
          time: "",
          location: "",
          address: "",
          googleMapsUrl: "",
          order: 0,
        },
      ],
    },
  });

  useAutoSaveForm(watch, onChange);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "events",
  });

  const onSubmit = (data: EventsFormData) => {
    onSave(data);
    if (onNext) onNext();
  };

  const addEvent = () => {
    append({
      name: "",
      date: "",
      time: "",
      location: "",
      address: "",
      googleMapsUrl: "",
      order: fields.length,
    });
  };

  const eventTypeOptions = [
    "Akad Nikah",
    "Resepsi",
    "Pemberkatan",
    "Ngunduh Mantu",
    "Sangjit",
    "Martumpol",
    "Tea Ceremony",
    "Walimatul Ursy",
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Info Box */}
      <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4">
        <p className="text-sm text-blue-900">
          <strong>Tip:</strong> Anda dapat menambahkan beberapa acara (Akad, Resepsi, dll). 
          Semua acara akan ditampilkan di undangan sesuai urutan.
        </p>
      </div>

      {/* Events List */}
      <div className="space-y-6">
        {fields.map((field, index) => (
          <div key={field.id} className="rounded-2xl border border-gold/15 bg-white p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-serif text-xl text-brown">
                Acara {index + 1}
              </h3>
              {fields.length > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => remove(index)}
                  className="text-red-500 hover:bg-red-50"
                >
                  <Trash2 className="size-4" />
                  Hapus
                </Button>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-brown">
                  Nama Acara <span className="text-red-500">*</span>
                </label>
                <input
                  {...register(`events.${index}.name`)}
                  list={`event-types-${index}`}
                  className="w-full rounded-xl border border-gold/20 bg-white px-4 py-3 text-brown outline-none transition focus:border-brown"
                  placeholder="Contoh: Akad Nikah"
                />
                <datalist id={`event-types-${index}`}>
                  {eventTypeOptions.map((option) => (
                    <option key={option} value={option} />
                  ))}
                </datalist>
                {errors.events?.[index]?.name && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.events[index]?.name?.message}
                  </p>
                )}
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-brown">
                    Tanggal <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    {...register(`events.${index}.date`)}
                    className="w-full rounded-xl border border-gold/20 bg-white px-4 py-3 text-brown outline-none transition focus:border-brown"
                  />
                  {errors.events?.[index]?.date && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.events[index]?.date?.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-brown">
                    Waktu <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="time"
                    {...register(`events.${index}.time`)}
                    className="w-full rounded-xl border border-gold/20 bg-white px-4 py-3 text-brown outline-none transition focus:border-brown"
                  />
                  {errors.events?.[index]?.time && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.events[index]?.time?.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-brown">
                  Nama Lokasi <span className="text-red-500">*</span>
                </label>
                <input
                  {...register(`events.${index}.location`)}
                  className="w-full rounded-xl border border-gold/20 bg-white px-4 py-3 text-brown outline-none transition focus:border-brown"
                  placeholder="Contoh: Gedung Balai Kartini"
                />
                {errors.events?.[index]?.location && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.events[index]?.location?.message}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-brown">
                  Alamat Lengkap
                </label>
                <textarea
                  {...register(`events.${index}.address`)}
                  rows={2}
                  className="w-full rounded-xl border border-gold/20 bg-white px-4 py-3 text-brown outline-none transition focus:border-brown"
                  placeholder="Contoh: Jl. Gatot Subroto No. 1, Jakarta Pusat"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-brown">
                  Google Maps URL
                </label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-brown-light" />
                  <input
                    {...register(`events.${index}.googleMapsUrl`)}
                    className="w-full rounded-xl border border-gold/20 bg-white py-3 pl-12 pr-4 text-brown outline-none transition focus:border-brown"
                    placeholder="https://maps.google.com/..."
                  />
                </div>
                {errors.events?.[index]?.googleMapsUrl && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.events[index]?.googleMapsUrl?.message}
                  </p>
                )}
                <p className="mt-1 text-xs text-brown-light">
                  Buka Google Maps, cari lokasi, klik Share, lalu copy link
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Event Button */}
      <Button
        type="button"
        variant="outline"
        onClick={addEvent}
        className="w-full gap-2 border-dashed"
      >
        <Plus className="size-4" />
        Tambah Acara Lain
      </Button>

      {errors.events && (
        <p className="text-sm text-red-500">{errors.events.message}</p>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          {onPrev && (
            <Button type="button" variant="outline" onClick={onPrev}>
              Kembali
            </Button>
          )}
          <Button type="button" variant="outline">
            Simpan Draft
          </Button>
        </div>
        <Button type="submit" className="bg-brown text-gold-light hover:bg-gold hover:text-brown">
          Simpan & Lanjutkan
        </Button>
      </div>
    </form>
  );
}
