
'use server'
import { revalidatePath } from "next/cache";

import { createServiceClient } from "@/lib/supabase-service";

export async function createUser(prevState: any, {laundries_owner, ...user}: { laundries_owner: string, [key: string]: any }) {
  const supabase = await createServiceClient()
  const { data, error } = await supabase
    .from('users')
    .upsert({
      ...user,
      laundries_owner: laundries_owner === 'yes'
    })
    .select()
    .single()
    console.log(error)
  if (error) {
    return { success: false, error: error.message }
  }
  // Invalider toutes les variantes de la page admin (avec ou sans query params)
  revalidatePath('/private/admin', 'page')
  
  return { success: true, data: data }
}