'use server'

import { createServiceClient } from '@/lib/supabase-service'
import { sendTransactionnal } from '@/lib/brevo'
import crypto from 'crypto'

interface ResetPasswordData {
  email: string
}
export async function resetPassword(prevState: { error?: string; success?: boolean } | null, data: ResetPasswordData) {
  const supabase = await createServiceClient()

  // 1. Vérifier si l'utilisateur existe
  const { data: user, error: userError } = await supabase
    .from('users')
    .select('id, email, firstname, lastname')
    .eq('email', data.email)
    .single()

  if (userError || !user) {
    // Pour des raisons de sécurité, on ne révèle pas si l'email existe
    return { success: true }
  }

  // 2. Invalider tous les tokens précédents pour cet utilisateur
  await supabase
    .from('password_reset_tokens')
    .update({ used: true })
    .eq('user_id', user.id)
    .eq('used', false)

  // 3. Générer un token sécurisé
  const token = crypto.randomBytes(32).toString('hex')
  const expiresAt = new Date()
  expiresAt.setHours(expiresAt.getHours() + 1) // Expire dans 1 heure

  // 4. Stocker le token dans la base de données
  const { error: tokenError } = await supabase
    .from('password_reset_tokens')
    .insert({
      user_id: user.id,
      token,
      expires_at: expiresAt.toISOString(),
      used: false
    })

  if (tokenError) {
    return { error: 'Erreur lors de la génération du token' }
  }

  // 5. Construire l'URL de réinitialisation
  const resetUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/update-password/?token=${token}`

  // 6. Envoyer l'email via Brevo
  try {
    await sendTransactionnal({
      templateId: 386,
      params: {
        email: user.email!,
        firstname: user.firstname || '',
        lastname: user.lastname || '',
        url: resetUrl
      }
    })
  } catch (emailError) {
    console.error('Erreur envoi email:', emailError)
    // Ne pas révéler l'erreur à l'utilisateur pour des raisons de sécurité
  }

  // Toujours retourner success pour ne pas révéler si l'email existe
  return { success: true }
}