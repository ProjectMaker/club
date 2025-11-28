'use server'

import { checkIsAdmin, getSupabaseClient } from '@/utils/auth'

export async function getFirstPicture(laundryId: number) {
  console.log('getFirstPicture', laundryId)
  const supabase = await getSupabaseClient()
  const picturesRecords = await supabase
    .from('laundry_pictures')
    .select()
    .eq('laundry_id', laundryId)
    .limit(1)
    .single()
    console.log('picturesRecords', picturesRecords)
  if (picturesRecords.error) {
    throw picturesRecords.error
  }
  const picture = picturesRecords.data
  const { data } = await supabase
    .storage
    .from('images')
    .createSignedUrl(`laundries/${laundryId}/${picture.name}`, 24 * 60 * 60)
  return {
    uuid: picture.id,
    id: picture.id,
    name: picture.name,
    data_url: data?.signedUrl || ''
  }
}

export async function getLaundry(laundryId: number) {
  const supabase = await getSupabaseClient()
  const record = await supabase
    .from('laundry')
    .select(`
              *,
              laundry_pictures (
                  id,
                  name
              )
            `)
    .eq('id', laundryId)
    .single()
    if (record.error) {
      throw record.error
    }
    const pictures = await Promise.all(
      record.data.laundry_pictures.map(async (picture: { name: any; id: any; }) => {
        const { data } = await supabase
          .storage
          .from('images')
          .createSignedUrl(`laundries/${laundryId}/${picture.name}`, 24 * 60 * 60)
        return {
          id: picture.id,
          uuid: picture.id,
          name: picture.name,
          data_url: data?.signedUrl
        }
      })
    )
    const { laundry_pictures, ...laundry } = record.data
    return {
      ...laundry,
      pictures
    }
}


export async function getLaundries({ from = 1, to = 4 }: { from: number, to: number }) {
  const supabase = await getSupabaseClient()

  const isAdmin = await checkIsAdmin()

  let query = supabase
    .from('laundry')
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

export async function getProfileLaundries() {
  const supabase = await getSupabaseClient()

  const records = await supabase
    .from('laundry')
    .select()
    .order('created_at', { ascending: false })
  if (!records.error) {
    return records.data
  } else {
    throw records.error
  }
}
