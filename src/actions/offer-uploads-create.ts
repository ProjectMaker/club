'use server'

import { createServiceClient } from '@/lib/supabase-service'
import { OFFER_UPLOAD } from '@/utils/constants'

interface UploadFile {
  name: string
  type: string
  size: number
}

// Prépare l'envoi des pièces jointes d'une demande : le navigateur envoie ensuite
// chaque fichier directement dans le stockage avec l'URL signée, sans passer par le serveur
export async function createOfferUploads(files: UploadFile[]) {
  if (!Array.isArray(files) || !files.length || files.length > OFFER_UPLOAD.maxFiles) {
    return { error: `Vous pouvez joindre jusqu'à ${OFFER_UPLOAD.maxFiles} fichiers` }
  }
  const invalid = files.find(file => !OFFER_UPLOAD.types.includes(file.type) || file.size > OFFER_UPLOAD.maxSize)
  if (invalid) {
    return { error: `${invalid.name} : format non accepté ou fichier trop volumineux` }
  }

  const supabase = createServiceClient()
  const folder = `offer-requests/${crypto.randomUUID()}`
  try {
    const uploads = await Promise.all(files.map(async (file, index) => {
      const extension = file.name.includes('.') ? file.name.split('.').pop()?.toLowerCase() : 'bin'
      const path = `${folder}/${index + 1}.${extension}`
      const { data, error } = await supabase.storage.from('images').createSignedUploadUrl(path)
      if (error) {
        throw error
      }
      return { name: file.name, path, token: data.token }
    }))
    return { uploads }
  } catch (error: any) {
    return { error: error.message as string }
  }
}
