'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { getSupabaseServiceClient } from '@/utils/auth'

interface SignupData {
  email: string
  password: string
  first_name: string
  last_name: string
  phone_number: string
  owns_laundries: 'yes' | 'no'
  laundries_count?: number | string
}

export async function signup(prevState: any, data: SignupData) {
  const required: Array<keyof SignupData> = ['email', 'password', 'first_name', 'last_name', 'phone_number', 'owns_laundries']
  for (const key of required) {
    if (!data[key]) {
      return { error: `Le champ ${String(key)} est requis` }
    }
  }

  const supabase = await getSupabaseServiceClient()

  const { data: onboardingUser, error: onboardingUserError } = await supabase.from('onboarding_users').select('*').eq('email', data.email).single()
  if (onboardingUserError) {
    return { error: 'Vous n\'êtes pas autorisé à vous inscrire' }
  } else if (onboardingUser.validated) {
    return { error: 'Vous avez déjà validé votre inscription' }
  }

  const userExist = await supabase.rpc('user_exist', {
    email: data.email
  })
  if (userExist.error) {
    return { error: userExist.error.message }
  } else if (userExist.data) {
    return { error: 'Cette adresse email est déjà utilisée' }
  } 

  const authUser = await supabase.auth.admin.createUser({
    email: data.email,
    password: data.password,
    email_confirm: true
  })
  if (authUser.error) {
    return {error: authUser.error.message}
  }

  const publicUsers = await supabase
    .from('users')
    .upsert({
      id: authUser.data.user.id,
      email: data.email,
      firstname: data.first_name,
      lastname: data.last_name,
      phone_number: data.phone_number,
      laundries_number: data.laundries_count,
      laundries_owner: data.owns_laundries
    })
    .select()
  if (publicUsers.error) {
    return { error: {status: 500, message: publicUsers.error.message}}
  }
  
  await supabase
    .from('onboarding_users')
    .update({ validated: true })
    .eq('email', data.email)

  return { success: true}
}