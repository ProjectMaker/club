'use server'

import { checkIsAdmin, getSupabaseClient } from '@/utils/auth'

export async function getFirstPicture(laundryId: number) {
  const supabase = await getSupabaseClient()
  const picturesRecords = await supabase.from('laundry_picture')
    .select()
    .eq('laundry_id', laundryId)
    .limit(1)
  if (picturesRecords.error) {
    throw picturesRecords.error
  }
  return picturesRecords.data[0]
}

export async function getLaundry(id: number) {
  const supabase = await getSupabaseClient()
  const records = await supabase
    .from('laundry')
    .select(`
                *,
                laundry_picture (
                    id,
                    data_url
                )
                `)
    .eq('id', id)
  if (!records.error) {
    return records.data[0]
  } else {
    throw records.error
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
