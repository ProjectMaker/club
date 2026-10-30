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
  const { error } = await supabase
    .from('offer_requests')
    .insert({ user_id: user?.id || null, offer, data: { answers } })
  if (error) {
    return { success: false, error: error.message }
  }

  if (user) {
    await captureServerEvent(user.id, 'offer_request_created', { offer })
  }
  await logPostHogInfo('offer_request_creation_succeeded')
  return { success: true }
}
