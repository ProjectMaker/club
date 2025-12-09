
'use server'
import { createServiceClient } from "@/lib/supabase-service";

export async function createUser(prevState: any, {laundries_owner, ...user}: { laundries_owner: string, [key: string]: any }) {
  console.log('create laundry')
  
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
  return { success: true, data: data }
}