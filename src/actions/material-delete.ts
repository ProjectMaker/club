'use server'

import { createClient } from "@/lib/supabase-server"
import { revalidatePath } from "next/cache"

export async function deleteMaterial(prevState: any, { materialId }: { materialId: number }) {
  const supabase = await createClient()
  const picturesResult = await supabase
    .from('material_pictures')
    .select()
    .eq('material_id', materialId)
  if (picturesResult.error) {
    throw picturesResult.error
  } else if (picturesResult.data.length) {
    await supabase
      .storage
      .from('images')
      .remove(picturesResult.data.map(({ name }) => `materials/${materialId}/${name}`))
    await supabase
      .from('material_pictures')
      .delete()
      .eq('material_id', materialId)
  }
  await supabase
    .from('materials')
    .delete()
    .eq('id', materialId)
  revalidatePath('/private/private/materials', 'page')
}