'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createServiceClient } from '@/lib/supabase-service'
import { getSupabaseServiceClient } from '@/utils/auth'

interface UpdatePasswordData {
  password: string
  confirmPassword: string
  token: string
}
export async function updatePassword(prevState: { error?: string; success?: boolean } | null, data: UpdatePasswordData) {
  const { password, confirmPassword, token } = data

  if (password !== confirmPassword) {
    return { error: 'Les mots de passe ne correspondent pas' }
  }

  if (password.length < 6) {
    return { error: 'Le mot de passe doit contenir au moins 6 caractères' }
  }

  const supabase = await createServiceClient()

  // 1. Vérifier que le token existe, n'est pas expiré et n'a pas été utilisé
  const { data: tokenData, error: tokenError } = await supabase
    .from('password_reset_tokens')
    .select('user_id, expires_at, used')
    .eq('token', token)
    .single()

  if (tokenError || !tokenData) {
    return { error: 'Token invalide ou expiré' }
  }

  if (tokenData.used) {
    return { error: 'Ce lien de réinitialisation a déjà été utilisé' }
  }

  const expiresAt = new Date(tokenData.expires_at)
  if (expiresAt < new Date()) {
    return { error: 'Ce lien de réinitialisation a expiré' }
  }

  // 2. Utiliser le service client Supabase pour mettre à jour le mot de passe
  const serviceClient = await getSupabaseServiceClient()
  
  const { error: updateError } = await serviceClient.auth.admin.updateUserById(
    tokenData.user_id,
    {
      password: password
    }
  )

  if (updateError) {
    return { error: updateError.message }
  }

  // 3. Marquer le token comme utilisé
  await supabase
    .from('password_reset_tokens')
    .update({ used: true })
    .eq('token', token)

  // 4. Forcer la revalidation
  revalidatePath('/', 'layout')

  // 5. Rediriger vers la page de connexion
  redirect('/login')
}