'use server'

import { revalidatePath } from 'next/cache'

import { createServiceClient } from '@/lib/supabase-service'
import { checkIsAdmin, getUser } from '@/utils/auth'
import { OFFER_REQUEST_STATUSES } from '@/utils/constants'

export async function updateOfferRequestStatus(id: number, status: string) {
  if (!await checkIsAdmin()) {
    return { success: false, error: 'Accès réservé aux administrateurs' }
  }
  if (!OFFER_REQUEST_STATUSES.some(({ value }) => value === status)) {
    return { success: false, error: 'Statut inconnu' }
  }

  const supabase = createServiceClient()
  const { error } = await supabase
    .from('offer_requests')
    .update({ status, updated_at: new Date() })
    .eq('id', id)
  if (error) {
    return { success: false, error: error.message }
  }
  revalidatePath(`/private/admin/offers/${id}`)
  return { success: true }
}

export async function createOfferRequestNote(prevState: any, { requestId, content }: { requestId: number, content: string }) {
  const user = await getUser()
  if (!user?.is_admin) {
    return { success: false, error: 'Accès réservé aux administrateurs' }
  }
  if (!content?.trim()) {
    return { success: false, error: 'La note est vide' }
  }

  const supabase = createServiceClient()
  const { error } = await supabase
    .from('offer_request_notes')
    .insert({ request_id: requestId, author_id: user.id, content: content.trim() })
  if (error) {
    return { success: false, error: error.message }
  }
  await supabase
    .from('offer_requests')
    .update({ updated_at: new Date() })
    .eq('id', requestId)
  revalidatePath(`/private/admin/offers/${requestId}`)
  return { success: true }
}
