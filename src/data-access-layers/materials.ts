'use server'

import { checkIsAdmin, getUser, getSupabaseClient } from '@/utils/auth'
import { createSignedImageUrl } from '@/utils/supabase-images'

export async function getMaterial(materialId: number) {
  const supabase = await getSupabaseClient()
  const record = await supabase
    .from('materials')
    .select(`
              *,
              material_pictures (
                  id,
                  name
              )
            `)
    .eq('id', materialId)
    .single()
    if (record.error) {
      throw record.error
    }
    const pictures = await Promise.all(
      record.data.material_pictures.map(async (picture: { name: any; id: any; }) => {
        const path = `materials/${materialId}/${picture.name}`
        const dataUrl = await createSignedImageUrl(supabase, path, 'hero')
        return {
          id: picture.id,
          uuid: picture.id,
          name: picture.name,
          data_url: dataUrl,
          thumbnail_url: dataUrl
        }
      })
    )
    const { material_pictures, ...material } = record.data
    return {
      ...material,
      pictures
    }
}

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
  const dataUrl = await createSignedImageUrl(supabase, `materials/${materialId}/${picture.name}`, 'card')
  return {
    uuid: picture.id,
    id: picture.id,
    name: picture.name,
    data_url: dataUrl
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
    console.log(records.error)
    throw records.error
  }
}

export async function getProfileMaterials() {
  const supabase = await getSupabaseClient()
  let query = supabase.from('materials').select(`
    *,
    users (
        id,
        email,
        firstname,
        lastname,
        phone_number,
        laundries_number,
        laundries_owner,
        created_at
    )
  `)
  const checkAdmin = await checkIsAdmin()
  const user = await getUser()
  if (!user) {
    throw new Error('User not found')
  }
  if (!checkAdmin) {
    query = query.eq('user_id', user.id)
  }
  query = query.order('created_at', { ascending: false })
  const { data, error } = await query
  if (error) {
    throw error
  }
  return data
}