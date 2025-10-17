'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase-server'

export async function login(state: { error?: string; data?: any } | null, formData: FormData) {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.signInWithPassword({
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  })

  if (error) {
    return { error: error.message }
  }

  // Vérifier que l'utilisateur est bien connecté avant de rediriger
  const { data: { user: verifiedUser } } = await supabase.auth.getUser()

  if (!verifiedUser) {
    return { error: 'Erreur de synchronisation de session' }
  }

  // Forcer la revalidation de toutes les pages et du layout
  revalidatePath('/', 'layout')
  revalidatePath('/private', 'layout')
  revalidatePath('/private/laundries', 'page')

  // Rediriger directement vers la page privée puisque l'utilisateur est connecté
  redirect('/private/laundries')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    redirect('/error')
  }

  redirect('/')
}