'use server'

import { createServiceClient } from "@/lib/supabase-service";

type OwnerFilter = 'laundries' | 'pressings' | 'carwashes';

export async function getUsers({ 
  verbatim = '', 
  isApproved = true,
  page, 
  count,
  ownerFilters = []
}: { 
  verbatim?: string; 
  page: number; 
  count: number; 
  isApproved?: boolean;
  ownerFilters?: OwnerFilter[];
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
  // Ajouter les filtres de propriétaire (OR)
  if (ownerFilters.length > 0) {
    const orConditions: string[] = [];
    if (ownerFilters.includes('laundries')) {
      orConditions.push('laundries_number.gt.0');
    }
    if (ownerFilters.includes('pressings')) {
      orConditions.push('pressings_number.gt.0');
    }
    if (ownerFilters.includes('carwashes')) {
      orConditions.push('carwashes_number.gt.0');
    }
    if (orConditions.length > 0) {
      query = query.or(orConditions.join(','));
    }
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
  if (!records.error) {
    return records.data;
  } else {
    return [];
  }
}

export async function getCountUsers({ 
  isApproved = true,
  ownerFilters = []
}: { 
  isApproved?: boolean;
  ownerFilters?: OwnerFilter[];
}) {
  const supabase = await createServiceClient()

  let query = supabase
    .from('users')
    .select('*', { count: 'exact', head: true })
    .eq('is_approved', isApproved)

  // Ajouter les filtres de propriétaire (OR)
  if (ownerFilters.length > 0) {
    const orConditions: string[] = [];
    if (ownerFilters.includes('laundries')) {
      orConditions.push('laundries_number.gt.0');
    }
    if (ownerFilters.includes('pressings')) {
      orConditions.push('pressings_number.gt.0');
    }
    if (ownerFilters.includes('carwashes')) {
      orConditions.push('carwashes_number.gt.0');
    }
    if (orConditions.length > 0) {
      query = query.or(orConditions.join(','));
    }
  }

  const { count, error } = await query
  
  if (error) {
    return 0
  }
  
  return count || 0
}
