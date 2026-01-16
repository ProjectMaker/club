'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase-server'
import { Picture } from '@/models'

// Type pour les pictures avec les propriétés de traitement côté client
interface PictureWithProcessing extends Partial<Picture> {
  fileName: string;
  contentType: string;
  _deleted?: boolean;
}

async function createPictures(pressingId: number, pictures: PictureWithProcessing[]): Promise<PictureWithProcessing[]> {
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
      .upload(`pressings/${pressingId}/${fileName}`, buffer, {
        cacheControl: '3600',
        upsert: false,
        contentType: picture.contentType
      })
    if (storageResult.error) {
      throw new Error(storageResult.error.message)
    }

    const pictureResult = await supabase.from('pressing_pictures')
      .upsert({ pressing_id: pressingId, name: fileName })
      .select()
    if (pictureResult.error) {
      throw new Error(pictureResult.error.message)
    }
    const signedUrlResult = await supabase
      .storage
      .from('images')
      .createSignedUrl(`pressings/${pressingId}/${pictureResult.data[0].name}`, 24 * 60 * 60)
    return {
      ...pictureResult.data[0],
      uuid: pictureResult.data[0].id,
      data_url: signedUrlResult.data?.signedUrl
    }
  })

  return Promise.all(promises)
}

async function processPictures(pressingId: number, pictures: PictureWithProcessing[]): Promise<void> {
  const supabase = await createClient()

  const picturesToRemove = pictures.filter(({ uuid, _deleted }: PictureWithProcessing) => uuid && _deleted)
  if (picturesToRemove.length) {
    await supabase
      .from('pressing_pictures')
      .delete()
      .in('id', picturesToRemove.map(({ id }: PictureWithProcessing) => id))
  }
  const picturesToAdd = pictures.filter(({ uuid, _deleted }: PictureWithProcessing) => !uuid && !_deleted)
  await createPictures(pressingId, picturesToAdd)
}

export async function createPressing(prevState: any, { pictures, ...pressing }: { pictures: PictureWithProcessing[], [key: string]: any }) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('pressings')
    .upsert({
      ...pressing,
      updated_at: new Date()
    })
    .select()
    .single()
    
  if (error) {
    return { success: false, error: error.message }
  }
  await processPictures(data.id, pictures)

  revalidatePath('/private/admin/pressings', 'page')
  redirect('/private/admin/pressings')
}