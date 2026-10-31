'use client'

import { useActionState, useEffect, useRef, useTransition } from "react";
import { useRouter } from "next/navigation";

import { createOfferRequestNote } from "@/actions/offer-request-update";
import { OfferRequestNote } from "@/models";
import { formatDate } from "@/utils/functions";

export default function Notes({ requestId, notes }: { requestId: number, notes: OfferRequestNote[] }) {
  const router = useRouter()
  const textarea = useRef<HTMLTextAreaElement>(null)
  const [state, formAction] = useActionState(createOfferRequestNote, null)
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    if (state?.success && textarea.current) {
      textarea.current.value = ''
      router.refresh()
    }
  }, [state, router])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    startTransition(() => {
      formAction({ requestId, content: textarea.current?.value || '' })
    })
  }

  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <label htmlFor="note" className="sr-only">Nouvelle note</label>
        <textarea
          id="note"
          ref={textarea}
          rows={3}
          placeholder="Ajouter une note interne (appel, relance, devis envoyé...)"
          className="w-full bg-white text-gray-700 rounded-lg border border-gray-300 py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        {state?.error && <p role="alert" className="text-red-300 text-sm">{state.error}</p>}
        <button
          type="submit"
          disabled={isPending}
          className="self-end py-2 px-4 cursor-pointer rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60 disabled:cursor-wait transition-colors duration-200 text-sm"
        >
          {isPending ? 'Enregistrement...' : 'Ajouter la note'}
        </button>
      </form>
      {notes.length === 0 ? (
        <p className="text-white/60 text-sm">Aucune note pour le moment.</p>
      ) : (
        <ol className="flex flex-col gap-3">
          {notes.map(note => (
            <li key={note.id} className="bg-white/5 rounded-lg border border-white/15 p-3">
              <p className="text-xs text-white/60 mb-1">
                {[note.author?.firstname, note.author?.lastname].filter(Boolean).join(' ') || 'Admin'} · {formatDate(note.created_at, true)}
              </p>
              <p className="text-white text-sm whitespace-pre-line break-words">{note.content}</p>
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}
