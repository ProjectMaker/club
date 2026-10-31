import type { MetadataRoute } from 'next'

import { SITE_NAME } from '@/utils/seo'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: SITE_NAME,
    description: 'Trouvez votre laverie, pressing ou matériel idéal.',
    start_url: '/',
    display: 'standalone',
    background_color: '#1e3a8a',
    theme_color: '#1e3a8a',
    lang: 'fr',
    icons: [{ src: '/favicon.png', type: 'image/png', sizes: 'any' }],
  }
}
