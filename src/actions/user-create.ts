
'use server'
import { revalidatePath } from "next/cache";

import { createServiceClient } from "@/lib/supabase-service";
import { captureServerEvent } from "@/lib/posthog-server";
import { getUser } from "@/utils/auth";

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
  const actor = await getUser()
  if (actor) {
    await captureServerEvent(actor.id, 'admin_user_saved', {
      laundries_owner: laundries_owner === 'yes',
    })
  }
  // Invalider toutes les variantes de la page admin (avec ou sans query params)
  revalidatePath('/private/admin/users', 'page')
  
  return { success: true, data: data }
}