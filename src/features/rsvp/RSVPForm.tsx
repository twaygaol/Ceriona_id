"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"

const rsvpSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter"),
  attending: z.enum(["yes", "no"], { error: "Pilih konfirmasi kehadiran" }),
  guestCount: z.number().min(1).max(5).optional(),
  message: z.string().max(300).optional(),
})

type RSVPForm = z.infer<typeof rsvpSchema>

export function RSVPForm({ invitationId }: { invitationId: string }) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RSVPForm>({
    resolver: zodResolver(rsvpSchema),
  })

  const onSubmit = async (data: RSVPForm) => {
    try {
      await fetch(`/api/rsvp/${invitationId}`, {
        method: "POST", body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      })
      toast.success("Konfirmasi kehadiran berhasil dikirim! 🎉")
    } catch {
      toast.error("Gagal mengirim, coba lagi.")
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-[#4A3728]">
          Nama
        </label>
        <input
          id="name"
          {...register("name")}
          className="mt-1 w-full rounded-sm border border-[#C9A96E]/30 px-3 py-2 text-sm outline-none focus:border-[#C9A96E]"
        />
        {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="attending" className="block text-sm font-medium text-[#4A3728]">
          Kehadiran
        </label>
        <select
          id="attending"
          {...register("attending")}
          className="mt-1 w-full rounded-sm border border-[#C9A96E]/30 px-3 py-2 text-sm outline-none focus:border-[#C9A96E]"
        >
          <option value="">Pilih konfirmasi</option>
          <option value="yes">Hadir</option>
          <option value="no">Tidak hadir</option>
        </select>
        {errors.attending && <p className="mt-1 text-xs text-red-600">{errors.attending.message}</p>}
      </div>

      <div>
        <label htmlFor="guestCount" className="block text-sm font-medium text-[#4A3728]">
          Jumlah tamu
        </label>
        <input
          id="guestCount"
          type="number"
          min={1}
          max={5}
          {...register("guestCount", { valueAsNumber: true })}
          className="mt-1 w-full rounded-sm border border-[#C9A96E]/30 px-3 py-2 text-sm outline-none focus:border-[#C9A96E]"
        />
        {errors.guestCount && <p className="mt-1 text-xs text-red-600">{errors.guestCount.message}</p>}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-[#4A3728]">
          Pesan
        </label>
        <textarea
          id="message"
          rows={4}
          {...register("message")}
          className="mt-1 w-full rounded-sm border border-[#C9A96E]/30 px-3 py-2 text-sm outline-none focus:border-[#C9A96E]"
        />
        {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-sm bg-[#4A3728] px-5 py-3 text-xs font-medium uppercase tracking-[0.1em] text-[#E8D5B0] transition-all hover:bg-[#9E7A3E] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Mengirim..." : "Kirim RSVP"}
      </button>
    </form>
  )
}
