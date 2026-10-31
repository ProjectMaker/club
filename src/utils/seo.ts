export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '')
export const SITE_NAME = 'Club Laverie'

// Pages publiques présentées par /disclaimers/[slug]
export const DISCLAIMER_SLUGS = ['laundries', 'pressings', 'materials']

export const absoluteUrl = (path: string) => `${SITE_URL}${path}`

export const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  logo: absoluteUrl('/club-laverie-logo.svg'),
  email: 'contact@aventure-immobiliere.fr',
}

export const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: 'fr-FR',
}

export const breadcrumbJsonLd = (items: { name: string, path: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: absoluteUrl(item.path),
  })),
})

// Image générée par src/app/opengraph-image.tsx ; à remettre dans les pages qui définissent leur propre openGraph/twitter
export const DEFAULT_OG_IMAGE = { url: '/opengraph-image', width: 1200, height: 630, alt: 'Club Laverie' }
