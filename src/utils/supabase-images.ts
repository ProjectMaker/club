import type { SupabaseClient } from '@supabase/supabase-js'

export const IMAGE_CACHE_CONTROL = `${60 * 60 * 24 * 365}`

export type ImagePreset = 'card' | 'hero' | 'thumbnail'

const SIGNED_URL_EXPIRES_IN = 60 * 60 * 24 * 7

export const createSignedImageUrl = async (
  supabase: Pick<SupabaseClient, 'storage'>,
  path: string,
  _preset: ImagePreset = 'card'
) => {
  const { data, error } = await supabase
    .storage
    .from('images')
    .createSignedUrl(path, SIGNED_URL_EXPIRES_IN)

  if (error) {
    throw error
  }

  return data?.signedUrl || ''
}
