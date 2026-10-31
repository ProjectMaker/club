'use client'

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

import { updateOfferRequestStatus } from "@/actions/offer-request-update";
import { OFFER_REQUEST_STATUSES } from "@/utils/constants";

export default function Status({ id, status }: { id: number, status: string }) {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState('')

  const handleChange = (value: string) => {
    if (value === status) {
      return
    }
    setError('')
    startTransition(async () => {
      const result = await updateOfferRequestStatus(id, value)
      if (!result.success) {
        setError(result.error || 'Erreur')
        return
      }
      // La liste et le compteur du menu doivent refléter le nouveau statut
      await queryClient.invalidateQueries({ queryKey: ['offer-requests'] })
      await queryClient.invalidateQueries({ queryKey: ['count-new-offer-requests'] })
      router.refresh()
    })
  }

  return (
    <div>
      <div role="group" aria-label="Statut de la demande" className="flex flex-wrap gap-2">
        {OFFER_REQUEST_STATUSES.map(({ value, label, className }) => (
          <button
            key={value}
            type="button"
            aria-pressed={status === value}
            disabled={isPending}
            onClick={() => handleChange(value)}
            className={`rounded-full border px-3 py-1.5 text-sm font-semibold transition-all duration-150 cursor-pointer disabled:cursor-wait ${status === value
              ? `${className} ring-2 ring-white/70`
              : 'border-white/20 text-white/60 hover:text-white hover:border-white/40'
              }`}
          >
            {label}
          </button>
        ))}
      </div>
      {error && <p role="alert" className="text-red-300 text-sm mt-2">{error}</p>}
    </div>
  )
}
