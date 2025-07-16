'use server'

import { checkIsAdmin, getSupabaseClient } from '@/utils/auth'

export async function getLaundries({ from = 1, to = 4 }: { from: number, to: number }) {
    const supabase = await getSupabaseClient()

    // Récupérer la session utilisateur
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
    console.log(records)
    if (!records.error) {
        return records.data
    } else {
        throw records.error
    }
}