import type { MetadataRoute } from 'next'

import { OFFERS } from './offers/_data'
import { DISCLAIMER_SLUGS, absoluteUrl } from '@/utils/seo'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl('/'), changeFrequency: 'weekly', priority: 1 },
    { url: absoluteUrl('/offers'), changeFrequency: 'weekly', priority: 0.9 },
    ...OFFERS.map(({ slug }) => ({
      url: absoluteUrl(`/offers/${slug}`),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...DISCLAIMER_SLUGS.map(slug => ({
      url: absoluteUrl(`/disclaimers/${slug}`),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
    { url: absoluteUrl('/infos'), changeFrequency: 'monthly', priority: 0.7 },
    { url: absoluteUrl('/calendly'), changeFrequency: 'monthly', priority: 0.6 },
    { url: absoluteUrl('/who-i-am'), changeFrequency: 'yearly', priority: 0.5 },
  ]
}
