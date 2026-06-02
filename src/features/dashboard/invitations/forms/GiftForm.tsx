"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Gift, Wallet } from "lucide-react";
import { useAutoSaveForm } from "@/hooks/useAutoSaveForm";

const bankAccountSchema = z.object({
  bankName: z.string().optional(),
  accountNumber: z.string().optional(),
  accountName: z.string().optional(),
});

const giftFormSchema = z.object({
  bankAccounts: z.array(bankAccountSchema),
  giftMessage: z.string().optional(),
});

type GiftFormData = z.infer<typeof giftFormSchema>;

interface GiftFormProps {
  defaultValues?: Partial<GiftFormData>;
  onSave: (data: GiftFormData) => void;
  onNext?: () => void;
  onPrev?: () => void;
  onChange?: (data: GiftFormData) => void;
}

export function GiftForm({ defaultValues, onSave, onNext, onPrev, onChange }: GiftFormProps) {
  const {
    register,
    control,
    handleSubmit,
    watch,
  } = useForm<GiftFormData>({
    resolver: zodResolver(giftFormSchema),
    defaultValues: defaultValues || { bankAccounts: [], giftMessage: "" },
  });

  useAutoSaveForm(watch, onChange);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "bankAccounts",
  });

  const onSubmit = (data: GiftFormData) => {
    onSave(data);
    if (onNext) onNext();
  };

  const addBankAccount = () => {
    append({ bankName: "", accountNumber: "", accountName: "" });
  };

  const bankOptions = [
    "BCA", "Mandiri", "BNI", "BRI", "BSI", "CIMB Niaga", "Permata",
    "Danamon", "Maybank", "Panin", "OCBC NISP", "Bank Jago", "SeaBank",
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4">
        <p className="text-sm text-blue-900">
          <strong>Tip:</strong> Tamu yang tidak bisa hadir dapat tetap mengirimkan kado 
          melalui transfer rekening yang dicantumkan.
        </p>
      </div>

      {/* Bank Accounts */}
      <div className="space-y-6">
        <h3 className="font-serif text-2xl text-brown">Rekening Digital</h3>
        
        {fields.map((field, index) => (
          <div key={field.id} className="rounded-2xl border border-gold/15 bg-white p-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wallet className="size-5 text-gold" />
                <h4 className="font-serif text-lg text-brown">
                  Rekening {index + 1}
                </h4>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => remove(index)}
                className="text-red-500 hover:bg-red-50"
              >
                <Trash2 className="size-4" />
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-brown">
                  Nama Bank <span className="text-red-500">*</span>
                </label>
                <input
                  {...register(`bankAccounts.${index}.bankName`)}
                  list="bank-options"
                  className="w-full rounded-xl border border-gold/20 bg-white px-4 py-3 text-brown outline-none transition focus:border-brown"
                  placeholder="Contoh: BCA"
                />
                <datalist id="bank-options">
                  {bankOptions.map((bank) => (
                    <option key={bank} value={bank} />
                  ))}
                </datalist>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-brown">
                  Nomor Rekening <span className="text-red-500">*</span>
                </label>
                <input
                  {...register(`bankAccounts.${index}.accountNumber`)}
                  className="w-full rounded-xl border border-gold/20 bg-white px-4 py-3 text-brown outline-none transition focus:border-brown"
                  placeholder="Contoh: 1234567890"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-brown">
                  Nama Pemilik Rekening <span className="text-red-500">*</span>
                </label>
                <input
                  {...register(`bankAccounts.${index}.accountName`)}
                  className="w-full rounded-xl border border-gold/20 bg-white px-4 py-3 text-brown outline-none transition focus:border-brown"
                  placeholder="Contoh: Rizky Pratama Wijaya"
                />
              </div>
            </div>
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          onClick={addBankAccount}
          className="w-full gap-2 border-dashed"
        >
          <Plus className="size-4" />
          Tambah Rekening Lain
        </Button>
      </div>

      {/* E-Wallet */}
      <div className="rounded-2xl border border-gold/15 bg-white p-6">
        <h3 className="mb-4 font-serif text-xl text-brown">Dompet Digital</h3>
        <p className="text-sm text-brown-light">
          Fitur dompet digital (GoPay, OVO, DANA, ShopeePay) akan segera hadir.
        </p>
      </div>

      {/* Gift Message */}
      <div className="rounded-2xl border border-gold/15 bg-white p-6">
        <h3 className="mb-4 font-serif text-xl text-brown">Teks Amplop Digital</h3>
        
        <div>
          <label className="mb-2 block text-sm font-medium text-brown">
            Pesan untuk Tamu
          </label>
          <textarea
            {...register("giftMessage")}
            rows={3}
            className="w-full rounded-xl border border-gold/20 bg-white px-4 py-3 text-brown outline-none transition focus:border-brown"
            placeholder='Contoh: "Tanpa mengurangi rasa hormat, bagi yang ingin mengirimkan kado dapat melalui rekening berikut..."'
          />
          <p className="mt-1 text-xs text-brown-light">
            Biarkan kosong untuk menggunakan teks default
          </p>
        </div>
      </div>

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
