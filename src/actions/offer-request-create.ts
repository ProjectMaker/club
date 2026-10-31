'use server'

import { createServiceClient } from '@/lib/supabase-service'
import { getUser } from '@/utils/auth'
import { captureServerEvent } from '@/lib/posthog-server'
import { logPostHogInfo } from '@/lib/posthog-logs'

interface OfferRequestAnswer {
  name: string
  label: string
  // Pièces jointes : nom du fichier et chemin dans le stockage
  value: string | string[] | { name: string, path: string }[]
}

interface OfferRequestData {
  offer: string
  answers: OfferRequestAnswer[]
  // Champ piège invisible du formulaire
  website?: string
}

const REQUIRED_CONTACT = ['firstname', 'lastname', 'email', 'phone_number']

// Membre dont l'email correspond à celui saisi par un visiteur (sans tenir compte de la casse)
async function findUserIdByEmail(supabase: ReturnType<typeof createServiceClient>, email: unknown) {
  if (typeof email !== 'string' || !email.trim()) {
    return null
  }
  // % et _ sont des jokers pour ilike : on les échappe pour une correspondance exacte
  const pattern = email.trim().replace(/[\\%_]/g, '\\$&')
  const { data } = await supabase.from('users').select('id').ilike('email', pattern).limit(1).maybeSingle()
  return (data?.id as string | undefined) || null
}

// Ouvert aux visiteurs : la demande est rattachée au membre s'il est connecté
export async function createOfferRequest(prevState: any, { offer, answers, website }: OfferRequestData) {
  if (website) {
    return { success: true }
  }
  if (!offer || !Array.isArray(answers) || !answers.length) {
    return { success: false, error: 'Demande incomplète' }
  }
  const missingContact = REQUIRED_CONTACT.some(name => !answers.find(answer => answer.name === name)?.value)
  if (missingContact) {
    return { success: false, error: 'Vos coordonnées sont incomplètes' }
  }
  const invalidFile = answers.some(({ value }) => Array.isArray(value) && value.some(item => (
    typeof item !== 'string' && !item?.path?.startsWith('offer-requests/')
  )))
  if (invalidFile) {
    return { success: false, error: 'Pièce jointe invalide' }
  }

  const user = await getUser()
  const supabase = createServiceClient()
  // Un visiteur non connecté est rattaché au membre de même email. user_match garde la trace
  // du rattachement : une demande rattachée par email n'a pas forcément été faite par le membre.
  const contact = Object.fromEntries(REQUIRED_CONTACT.map(name => [name, answers.find(answer => answer.name === name)?.value]))
  const userId = user?.id || await findUserIdByEmail(supabase, contact.email)
  const userMatch = user ? 'session' : userId ? 'email' : null
  const { error } = await supabase
    .from('offer_requests')
    .insert({ user_id: userId, offer, ...contact, data: { answers, user_match: userMatch } })
  if (error) {
    return { success: false, error: error.message }
  }

  if (userId) {
    await captureServerEvent(userId, 'offer_request_created', { offer, user_match: userMatch })
  }
  await logPostHogInfo('offer_request_creation_succeeded')
  return { success: true }
}
