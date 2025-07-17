'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase-server'

export async function logout(state: { error?: string; data?: any }, params: any) {
  const supabase = await createClient()
  
  try {
    // S'assurer que la déconnexion est complète avec le scope 'global'
    const { error } = await supabase.auth.signOut({ scope: 'global' })
    
    if (error) {
      console.error('Erreur lors de la déconnexion:', error)
      return { error: error.message }
    }
    
    // Revalidation optimisée pour la déconnexion
    revalidatePath('/', 'layout')           // Revalide le layout racine et toutes ses pages enfants
    revalidatePath('/private', 'layout')    // Revalide toutes les routes privées en une fois
    
    // Attendre plus longtemps pour s'assurer de la synchronisation complète
    await new Promise(resolve => setTimeout(resolve, 500))
    
  } catch (error) {
    console.error('Erreur inattendue lors de la déconnexion:', error)
    return { error: 'Une erreur inattendue s\'est produite' }
  }
  
  redirect('/')
}