'use server'

import { createServiceClient } from "@/lib/supabase-service";
import { checkIsAdmin } from "@/utils/auth";
import { createSignedImageUrl } from "@/utils/supabase-images";
import { OfferRequest, OfferRequestFile } from "@/models";
import { OFFER_REQUEST_STATUSES, OfferRequestStatus } from "@/utils/constants";

// Ces fonctions sont appelables depuis le navigateur : chacune vérifie que l'utilisateur est admin
async function assertAdmin() {
  if (!await checkIsAdmin()) {
    throw new Error('Accès réservé aux administrateurs')
  }
}

// Filtre de recherche commun à la liste et aux compteurs, vide si rien n'est saisi
function searchFilter(verbatim: string) {
  // Les caractères , ( ) cassent le filtre or() et % _ sont des jokers : on les retire
  const search = verbatim.trim().replace(/[,()%_\\]/g, '')
  return search
    ? `reference.ilike.%${search}%,firstname.ilike.%${search}%,lastname.ilike.%${search}%,email.ilike.%${search}%`
    : ''
}

export async function getOfferRequests({
  verbatim = '',
  offer = '',
  status = '',
  page,
  count,
}: {
  verbatim?: string;
  offer?: string;
  // Vide : toutes les demandes sauf les archivées
  status?: string;
  page: number;
  count: number;
}): Promise<OfferRequest[]> {
  await assertAdmin()
  const from = (page - 1) * count;
  const to = from + count - 1;

  const supabase = createServiceClient()
  let query = supabase
    .from('offer_requests')
    .select('id, reference, created_at, updated_at, user_id, offer, status, firstname, lastname, email, phone_number, data')
  const search = searchFilter(verbatim)
  if (search) {
    query = query.or(search)
  }
  if (offer) {
    query = query.eq('offer', offer)
  }
  query = status ? query.eq('status', status) : query.neq('status', 'archived')

  const { data, error } = await query
    .order('created_at', { ascending: false })
    .range(from, to)
  if (error) {
    throw error
  }
  return data as OfferRequest[]
}

// Nombre de demandes par statut, avec la recherche et l'offre sélectionnées
export async function getOfferRequestCounts({ verbatim = '', offer = '' }: { verbatim?: string, offer?: string }) {
  await assertAdmin()
  const supabase = createServiceClient()
  const counts = await Promise.all(OFFER_REQUEST_STATUSES.map(async ({ value }) => {
    let query = supabase
      .from('offer_requests')
      .select('id', { count: 'exact', head: true })
      .eq('status', value)
    const search = searchFilter(verbatim)
    if (search) {
      query = query.or(search)
    }
    if (offer) {
      query = query.eq('offer', offer)
    }
    const { count, error } = await query
    if (error) {
      throw error
    }
    return [value, count || 0] as const
  }))
  return Object.fromEntries(counts) as Record<OfferRequestStatus, number>
}

export async function getCountNewOfferRequests() {
  await assertAdmin()
  const supabase = createServiceClient()
  const { count, error } = await supabase
    .from('offer_requests')
    .select('id', { count: 'exact', head: true })
    .eq('status', 'new')
  if (error) {
    throw error
  }
  return count || 0
}

export async function getOfferRequest(id: number): Promise<OfferRequest> {
  await assertAdmin()
  const supabase = createServiceClient()
  const { data, error } = await supabase
    .from('offer_requests')
    .select('*, notes:offer_request_notes(id, created_at, content, author:users(firstname, lastname))')
    .eq('id', id)
    .order('created_at', { referencedTable: 'offer_request_notes', ascending: false })
    .single()
  if (error) {
    throw error
  }

  // Les pièces jointes sont dans un stockage privé : on ajoute un lien de téléchargement temporaire
  const request = data as OfferRequest
  const answers = await Promise.all(request.data.answers.map(async answer => {
    if (!Array.isArray(answer.value) || !answer.value.some(item => typeof item !== 'string')) {
      return answer
    }
    const files = await Promise.all((answer.value as OfferRequestFile[]).map(async file => ({
      ...file,
      url: await createSignedImageUrl(supabase, file.path).catch(() => ''),
    })))
    return { ...answer, value: files }
  }))
  return { ...request, data: { ...request.data, answers } }
}
