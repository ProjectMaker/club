'use server'

import { checkIsAdmin, getSupabaseClient } from '@/utils/auth'
import { Pressing, Picture } from '@/models'

export async function getFirstPicture(pressingId: number): Promise<Picture> {
  const supabase = await getSupabaseClient()
  const picturesRecords = await supabase
    .from('pressing_pictures')
    .select()
    .eq('pressing_id', pressingId)
    .limit(1)
    .single()
  if (picturesRecords.error) {
    throw picturesRecords.error
  }
  const picture = picturesRecords.data
  const { data } = await supabase
    .storage
    .from('images')
    .createSignedUrl(`pressings/${pressingId}/${picture.name}`, 24 * 60 * 60)
  return {
    uuid: picture.id,
    id: picture.id,
    name: picture.name,
    data_url: data?.signedUrl || ''
  }
}
export async function getPressings({ from = 1, to = 4 }: { from: number, to: number }): Promise<Pressing[]> {
  const supabase = await getSupabaseClient()

  const isAdmin = await checkIsAdmin()

  let query = supabase
    .from('pressings')
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
    return records.data.map(pressing => ({ ...pressing, pictures: [] }))
  } else {
    throw records.error
  }
}

export async function getPressing(pressingId: number) {
  const supabase = await getSupabaseClient()

  const records = await supabase
    .from('pressings')
    .select(`
              *,
              pressing_pictures (
                  id,
                  name
              )
            `)
    .eq('id', pressingId)
  if (records.error) {
    throw records.error
  }
  const pictures = await Promise.all(
    records.data[0].pressing_pictures.map(async (picture: { name: any; id: any; }) => {
      const { data } = await supabase
        .storage
        .from('images')
        .createSignedUrl(`pressings/${pressingId}/${picture.name}`, 24 * 60 * 60)
      return {
        id: picture.id,
        uuid: picture.id,
        name: picture.name,
        data_url: data?.signedUrl
      }
    })
  )
  const { pressing_pictures, ...pressing } = records.data[0]
  return {
    ...pressing,
    pictures
  }
}

export async function getProfilePressings() {
  const supabase = await getSupabaseClient()

  const records = await supabase
    .from('pressings')
    .select()
    .order('created_at', { ascending: false })
  if (!records.error) {
    return records.data
  } else {
    throw records.error
  }
}