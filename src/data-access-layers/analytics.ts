'use server'

import { createServiceClient } from "@/lib/supabase-service"

export async function countLaundriesUsers() {
  const supabase = await createServiceClient()
  const {data} = await supabase.rpc('count_users_laundries')
  return data
}

export async function countUsersWithLaundries() {
  const supabase = await createServiceClient()
  const {data} = await supabase.rpc('count_users_with_laundries')
  return data
}

export async function countUsersWithoutLaundries() {
  const supabase = await createServiceClient()
  const {data} = await supabase.rpc('count_users_without_laundries')
  return data
}