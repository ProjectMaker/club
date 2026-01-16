'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase-server'
import { Picture } from '@/models'
import { getUser } from '@/utils/auth'

interface PictureWithProcessing extends Partial<Picture> {
  fileName: string;
  contentType: string;
  _deleted?: boolean;
}

async function createPictures(materialId: number, pictures: PictureWithProcessing[]): Promise<PictureWithProcessing[]> {
  const supabase = await createClient()
  const promises = pictures.map(async picture => {
    const [extension] = picture.fileName.split('.').slice(-1)
    const uuid = crypto.randomUUID()
    const fileName = `${uuid}.${extension}`
    const base64 = picture.data_url?.split('base64,')[1] || ''
    const buffer = Buffer.from(base64, 'base64');
    const storageResult = await supabase
      .storage
      .from('images')
      .upload(`materials/${materialId}/${fileName}`, buffer, {
        cacheControl: '3600',
        upsert: false,
        contentType: picture.contentType
      })
    if (storageResult.error) {
      throw new Error(storageResult.error.message)
    }

    const pictureResult = await supabase.from('material_pictures')
      .upsert({ material_id: materialId, name: fileName })
      .select()
    if (pictureResult.error) {
      throw new Error(pictureResult.error.message)
    }
    
    const signedUrlResult = await supabase
      .storage
      .from('images')
      .createSignedUrl(`materials/${materialId}/${pictureResult.data[0].name}`, 24 * 60 * 60)
    return {
      ...pictureResult.data[0],
      uuid: pictureResult.data[0].id,
      data_url: signedUrlResult.data?.signedUrl
    }
  })

  return Promise.all(promises)
}

async function processPictures(materialId: number, pictures: PictureWithProcessing[]): Promise<void> {
  const supabase = await createClient()

  const picturesToRemove = pictures.filter(({ uuid, _deleted }: PictureWithProcessing) => uuid && _deleted)
  if (picturesToRemove.length) {
    await supabase
      .from('material_pictures')
      .delete()
      .in('id', picturesToRemove.map(({ id }: PictureWithProcessing) => id))
  }
  const picturesToAdd = pictures.filter(({ uuid, _deleted }: PictureWithProcessing) => !uuid && !_deleted)
  await createPictures(materialId, picturesToAdd)
}

export async function createMaterial(prevState: any, { pictures, ...material }: { pictures: PictureWithProcessing[], [key: string]: any }) {
  const supabase = await createClient()
  const user = await getUser()
  const { data, error } = await supabase
    .from('materials')
    .upsert({
      ...material,
      user_id: material.user_id || user?.id,
      updated_at: new Date()
    })
    .select()
    .single()
  if (error) {
    return { success: false, error: error.message }
  }
  await processPictures(data.id, pictures)
  
  revalidatePath('/private/admin/materials', 'page')
  redirect('/private/admin/materials')
}