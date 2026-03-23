import { NextApiRequest, NextApiResponse } from 'next'

import { getSupabaseServiceClient, getUser } from '@/utils/auth'


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' })
    }

    const { service } = req.body
    if (!service) {
        return res.status(400).json({ error: 'URL is required' })
    }

    const user = await getUser()
    const supabase = await getSupabaseServiceClient()
    const { data, error } = await supabase.from('service_links').insert({
        service_name: service,
        user_id: user?.id,
    }).select()
    if (error) {
        return res.status(500).json({ error: error.message })
    }
    return res.status(200).json(data)
}

