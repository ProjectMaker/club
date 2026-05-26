import type { SupabaseClient } from '@supabase/supabase-js'

export const IMAGE_CACHE_CONTROL = `${60 * 60 * 24 * 365}`

export type ImagePreset = 'card' | 'hero' | 'thumbnail'

const SIGNED_URL_EXPIRES_IN = 60 * 60 * 24 * 7

const IMAGE_TRANSFORMS = {
  card: {
    width: 640,
    quality: 72,
  },
  hero: {
    width: 1280,
    quality: 78,
  },
  thumbnail: {
    width: 240,
    quality: 65,
  },
} satisfies Record<ImagePreset, { width: number; quality: number }>

export const createSignedImageUrl = async (
  supabase: Pick<SupabaseClient, 'storage'>,
  path: string,
  preset: ImagePreset = 'card'
) => {
  const { data, error } = await supabase
    .storage
    .from('images')
    .createSignedUrl(path, SIGNED_URL_EXPIRES_IN, {
      transform: IMAGE_TRANSFORMS[preset],
    })

  if (error) {
    throw error
  }

  return data?.signedUrl || ''
}
