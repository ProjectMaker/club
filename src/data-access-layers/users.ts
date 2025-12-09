'use server'

import { createServiceClient } from "@/lib/supabase-service";

export async function getUsers({ 
  verbatim = '', 
  isApproved = true,
  page, 
  count 
}: { 
  verbatim?: string; 
  page: number; 
  count: number; 
}) {
  // Calculer from et to pour Supabase à partir de page et count
  const from = (page - 1) * count;
  const to = from + count - 1;

  const supabase = await createServiceClient()

  let query = supabase
    .from('users')
    .select('*');

  // Ajouter le filtre de recherche si fourni
  if (verbatim && verbatim.trim()) {
    query = query.or(`email.ilike.%${verbatim.trim()}%,firstname.ilike.%${verbatim.trim()}%,lastname.ilike.%${verbatim.trim()}%`);
  }

  const records = await query
    .range(from, to)
    .eq('is_approved', isApproved)
    .order('created_at', { ascending: false });

  if (!records.error) {
    return records.data;
  } else {
    return [];
  }
}

export async function getUser(id: string) {
  const supabase = await createServiceClient()
  const { data, error } = await supabase.from('users').select('*').eq('id', id).single()
  if (error) {
    throw error
  }
  return data
}

export async function getOnboardingUsers({ 
  verbatim = '', 
  page, 
  count 
}: { 
  verbatim?: string; 
  page: number; 
  count: number; 
}) {
  // Calculer from et to pour Supabase à partir de page et count
  const from = (page - 1) * count;
  const to = from + count - 1;

  const supabase = await createServiceClient()

  let query = supabase
    .from('users')
    .select('*');

  // Ajouter le filtre de recherche si fourni
  if (verbatim && verbatim.trim()) {
    query = query.or(`email.ilike.%${verbatim.trim()}%`);
  }

  const records = await query
    .range(from, to)
    .eq('is_approved', false)
    .order('created_at', { ascending: false });
  console.log('----records----', records)
  if (!records.error) {
    return records.data;
  } else {
    return [];
  }
}

export async function getCountUsers() {
  const supabase = await createServiceClient()
  const { data } = await supabase.rpc('count_users')
  return data
}

export async function getCountOnboardingUsers() {
  const supabase = await createServiceClient()
  const { data } = await supabase.rpc('count_onboarding_users')
  return data
}