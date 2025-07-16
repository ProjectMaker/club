'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createAuthClient } from '@/lib/supabase-server'

export async function logout(state: { error?: string; data?: any }, params: any) {
  const supabase = await createAuthClient()
  
  try {
    // S'assurer que la déconnexion est complète avec le scope 'global'
    const { error } = await supabase.auth.signOut({ scope: 'global' })
    
    if (error) {
      console.error('Erreur lors de la déconnexion:', error)
      return { error: error.message }
    }
    
    // Invalider agressivement le cache pour forcer le refresh
    revalidatePath('/', 'layout')
    revalidatePath('/private/laundries', 'page')
    
    // Attendre plus longtemps pour s'assurer de la synchronisation complète
    await new Promise(resolve => setTimeout(resolve, 500))
    
  } catch (error) {
    console.error('Erreur inattendue lors de la déconnexion:', error)
    return { error: 'Une erreur inattendue s\'est produite' }
  }
  
  redirect('/login')
}