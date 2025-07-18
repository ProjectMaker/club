'use server'

import { createClient } from '@/lib/supabase-server'

export async function createLaundry(prevState: any, formData: FormData) {
  const supabase = await createClient()
  
  try {
    // Extraire les données du FormData
    const data = JSON.parse(formData.get('data') as string)
    console.log('Données reçues:', data)

    // Ici vous pouvez ajouter la logique pour sauvegarder en base de données
    
    return { 
      success: true, 
      data: data,
      error: null 
    }
  } catch (error) {
    console.error('Erreur lors de la création de la laverie:', error)
    return { 
      success: false, 
      data: null,
      error: 'Erreur lors de la sauvegarde' 
    }
  }
}