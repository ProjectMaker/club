'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase-server'

export async function logout(state: { error?: string; data?: any }, params: any) {
  const supabase = await createClient()
  
  try {
    // S'assurer que la déconnexion est complète
    const { error } = await supabase.auth.signOut()
    
    if (error) {
      console.error('Erreur lors de la déconnexion:', error)
      return { error: error.message }
    }
    
    // Invalider agressivement le cache
    revalidatePath('/', 'layout')
    revalidatePath('/', 'page')
    revalidatePath('/private/laundries', 'page')
    
    // Attendre un peu plus pour s'assurer de la synchronisation
    await new Promise(resolve => setTimeout(resolve, 200))
    
  } catch (error) {
    console.error('Erreur inattendue lors de la déconnexion:', error)
    return { error: 'Une erreur inattendue s\'est produite' }
  }
  
  redirect('/')
}