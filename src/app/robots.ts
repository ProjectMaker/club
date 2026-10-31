import type { MetadataRoute } from 'next'

import { absoluteUrl } from '@/utils/seo'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/private/', '/api/'],
    },
    sitemap: absoluteUrl('/sitemap.xml'),
  }
}
