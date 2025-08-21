'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase-server'
import { Picture } from '@/models'

// Type pour les pictures avec les propriétés de traitement côté client
interface PictureWithProcessing extends Partial<Picture> {
  _deleted?: boolean;
}

async function processPictures(laundryId: number, pictures: PictureWithProcessing[]): Promise<void> {
  const supabase = await createClient()

  const picturesToRemove = pictures.filter(({ uuid, _deleted }: PictureWithProcessing) => uuid && _deleted)
  if (picturesToRemove.length) {
    await supabase
      .from('laundry_picture')
      .delete()
      .in('id', picturesToRemove.map(({ id }: PictureWithProcessing) => id))
  }
  const picturesToAdd = pictures.filter(({ uuid, _deleted }: PictureWithProcessing) => !uuid && !_deleted)
  await Promise.all(
    picturesToAdd.map(async ({ data_url, ...picture }: PictureWithProcessing) => {
      await supabase.from('laundry_picture')
        .upsert({ laundry_id: laundryId, data_url })
    })
  )
}

export async function createLaundry(prevState: any, { pictures, ...laundry }: { pictures: PictureWithProcessing[], [key: string]: any }) {
  console.log('create laundry')
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('laundry')
    .upsert({
      ...laundry,
      updated_at: new Date()
    })
    .select()
    .single()
  if (error) {
    return { success: false, error: error.message }
  }
  await processPictures(data.id, pictures)

  revalidatePath('/private/profile/laundries', 'page')
  // Traitement des images
  redirect('/private/profile/laundries')
}