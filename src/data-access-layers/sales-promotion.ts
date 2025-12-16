'use server'
import { Laundry, Pressing, Material } from '@/models'
import { getSupabaseClient } from '@/utils/auth'

async function getLaundry(): Promise<Laundry> {
  const supabase = await getSupabaseClient()

  // Récupération du laundry sans jointure
  const laundryResult = await supabase
    .from('laundry')
    .select('*')
    .neq('status', 'sold')
    .order('updated_at', { ascending: false })
    .limit(1)
    .single()

  if (laundryResult.error) {
    throw laundryResult.error
  }

  // Récupération des images séparément
  const pictureResult = await supabase
    .from('laundry_pictures')
    .select('id, name')
    .eq('laundry_id', laundryResult.data.id)
    .limit(1)
    .single()

  if (pictureResult.error) {
    throw pictureResult.error
  } else if (!pictureResult.data) {
    return laundryResult.data
  }


  const { data } = await supabase
    .storage
    .from('images')
    .createSignedUrl(`laundries/${laundryResult.data.id}/${pictureResult.data.name}`, 24 * 60 * 60)
  return {
    ...laundryResult.data,
    pictures: [{
      id: pictureResult.data.id,
      uuid: pictureResult.data.id,
      name: pictureResult.data.name,
      data_url: data?.signedUrl || ''
    }]
  }
}

async function getMaterial(): Promise<Material | null> {
  const supabase = await getSupabaseClient()

  // Récupération du laundry sans jointure
  const materialResult = await supabase
    .from('materials')
    .select('*')
    .neq('status', 'sold')
    .order('updated_at', { ascending: false })
    .limit(1)
    .maybeSingle()
  
  if (materialResult.error) {
    throw materialResult.error
  } else if (!materialResult.data) {
    return null
  }
  // Récupération des images séparément
  const pictureResult = await supabase
    .from('material_pictures')
    .select('id, name')
    .eq('material_id', materialResult.data.id)
    .limit(1)
    .single()

  if (pictureResult.error) {
    throw pictureResult.error
  } else if (!pictureResult.data) {
    return materialResult.data
  }


  const { data } = await supabase
    .storage
    .from('images')
    .createSignedUrl(`materials/${materialResult.data.id}/${pictureResult.data.name}`, 24 * 60 * 60)
  return {
    ...materialResult.data,
    pictures: [{
      id: pictureResult.data.id,
      uuid: pictureResult.data.id,
      name: pictureResult.data.name,
      data_url: data?.signedUrl || ''
    }]
  }
}

async function getPressing(): Promise<Pressing | null> {
  try {
    const supabase = await getSupabaseClient()

    // Récupération du pressing sans jointure
    const pressingResult = await supabase
      .from('pressings')
      .select('*')
      .neq('status', 'sold')
      .order('updated_at', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (pressingResult.error) {
      console.warn('Erreur lors de la récupération du pressing:', pressingResult.error)
      return null
    } else if (!pressingResult.data) {
      return null
    }

    // Récupération des images séparément avec gestion d'erreur RLS
    const pictureResult = await supabase
      .from('pressing_pictures')
      .select('id, name')
      .eq('pressing_id', pressingResult.data.id)
      .limit(1)
      .single()
  
    if (pictureResult.error) {
      console.warn('Erreur RLS ou absence d\'image pour pressing:', pictureResult.error)
      // Retourner le pressing sans image si erreur RLS
      return pressingResult.data
    } else if (!pictureResult.data) {
      return pressingResult.data
    }
    
    const { data } = await supabase
      .storage
      .from('images')
      .createSignedUrl(`pressings/${pressingResult.data.id}/${pictureResult.data.name}`, 24 * 60 * 60)
    
    return {
      ...pressingResult.data,
      pictures: [{
        id: pictureResult.data.id,
        uuid: pictureResult.data.id,
        name: pictureResult.data.name,
        data_url: data?.signedUrl || ''
      }]
    }
  } catch (error) {
    console.warn('Erreur générale dans getPressing:', error)
    return null
  }
}

export async function getSales(): Promise<{ laundry: Laundry, pressing: Pressing | null, material: Material | null }> {
  const supabase = await getSupabaseClient()

  const laundry = await getLaundry()
  const pressing = await getPressing()
  const material = await getMaterial()
  
  return {
    laundry,
    pressing,
    material
  }
}