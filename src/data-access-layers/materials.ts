'use server'

import { checkIsAdmin, getSupabaseClient } from '@/utils/auth'

export async function getFirstPicture(materialId: number) {
  const supabase = await getSupabaseClient()
  const picturesRecords = await supabase
    .from('material_pictures')
    .select()
    .eq('material_id', materialId)
    .limit(1)
    .single()
  if (picturesRecords.error) {
    throw picturesRecords.error
  }
  const picture = picturesRecords.data
  const { data } = await supabase
    .storage
    .from('images')
    .createSignedUrl(`materials/${materialId}/${picture.name}`, 24 * 60 * 60)
  return {
    uuid: picture.id,
    id: picture.id,
    name: picture.name,
    data_url: data?.signedUrl || ''
  }
}
export async function getMaterials({ from = 1, to = 10 }: { from: number, to: number }) {
  const supabase = await getSupabaseClient()

  const isAdmin = await checkIsAdmin()

  let query = supabase
    .from('materials')
    .select()
  if (!isAdmin) {
    query = query.neq('status', 'sold')
  }
  query = query
    .range(from, to)
    .order('status')
    .order('updated_at', { ascending: false })
    .order('created_at', { ascending: false })
  const records = await query
  if (!records.error) {
    return records.data
  } else {
    throw records.error
  }
}