'use server'

import { createClient } from "@/lib/supabase-server"
import { revalidatePath } from "next/cache"
import { captureServerEvent } from "@/lib/posthog-server"
import { getUser } from "@/utils/auth"

export async function deletePressing(prevState: any, { pressingId }: { pressingId: number }) {
  const supabase = await createClient()
  const picturesResult = await supabase
    .from('pressing_pictures')
    .select()
    .eq('pressing_id', pressingId)
  if (picturesResult.error) {
    throw picturesResult.error
  } else if (picturesResult.data.length) {
    await supabase
      .storage
      .from('images')
      .remove(picturesResult.data.map(({ name }) => `pressings/${pressingId}/${name}`))
    await supabase
      .from('pressing_pictures')
      .delete()
      .eq('pressing_id', pressingId)
  }
  const { error } = await supabase
    .from('pressings')
    .delete()
    .eq('id', pressingId)
  if (error) {
    throw error
  }
  const user = await getUser()
  if (user) {
    await captureServerEvent(user.id, 'pressing_deleted')
  }
  revalidatePath('/private/admin/pressings', 'page')
}