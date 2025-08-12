import { createClient } from '@supabase/supabase-js'

// Interdit tout usage côté client par sécurité
function assertServerOnly() {
  if (typeof window !== 'undefined') {
    throw new Error('Le client Service Supabase ne peut pas être utilisé côté client')
  }
}

export function createServiceClient() {
  assertServerOnly()

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url) {
    throw new Error('NEXT_PUBLIC_SUPABASE_URL est manquant dans les variables d\'environnement')
  }
  if (!serviceRoleKey) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY est manquant dans les variables d\'environnement')
  }

  return createClient(url, serviceRoleKey, {
    auth: {
      // Pas de session persistée pour un client service
      persistSession: false,
      autoRefreshToken: false,
    },
    global: {
      headers: {
        'X-Client-Info': 'service-role',
      },
    },
  })
} 