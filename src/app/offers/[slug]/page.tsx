import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getUser } from "@/utils/auth";
import { getUser as getUserProfile } from "@/data-access-layers/users";
import { OFFERS, StoreIcon, getOffer } from "../_data";
import Visual from "../_Visual";
import OfferForm from "./_OfferForm";
import JsonLd from "@/components/JsonLd";
import { SITE_NAME, SITE_URL, absoluteUrl, breadcrumbJsonLd } from "@/utils/seo";

type Params = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return OFFERS.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const offer = getOffer(slug)
  if (!offer) {
    return {}
  }
  return {
    title: offer.title,
    description: offer.summary,
    alternates: { canonical: `/offers/${offer.slug}` },
    openGraph: {
      type: 'website',
      locale: 'fr_FR',
      siteName: SITE_NAME,
      url: `/offers/${offer.slug}`,
      title: offer.title,
      description: offer.summary,
      ...(offer.image && { images: [{ url: offer.image, alt: offer.title }] }),
    },
  }
}

const CheckIcon = () => (
  <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
  </svg>
)

export default async function OfferPage({ params }: Params) {
  const { slug } = await params
  const offer = getOffer(slug)
  if (!offer) {
    notFound()
  }

  const user = await getUser()
  const profile = user ? await getUserProfile(user.id).catch(() => null) : null

  const heroVisual = (
    <Visual image={offer.image} alt={offer.title} icon={<StoreIcon />} />
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: offer.title,
        description: offer.description,
        url: absoluteUrl(`/offers/${offer.slug}`),
        ...(offer.image && { image: absoluteUrl(offer.image) }),
        provider: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
        areaServed: { '@type': 'Country', name: 'France' },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: offer.prestationsTitle || 'Nos prestations',
          itemListElement: offer.prestations.map(prestation => ({
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: prestation.title, description: prestation.description },
          })),
        },
      }} />
      <JsonLd data={breadcrumbJsonLd([
        { name: 'Accueil', path: '/' },
        { name: 'Offres et services', path: '/offers' },
        { name: offer.title, path: `/offers/${offer.slug}` },
      ])} />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Colonne principale */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div>
            <nav aria-label="Fil d'Ariane" className="text-sm text-white/70 mb-4">
              <ol className="flex flex-wrap items-center gap-2">
                <li><Link href="/" className="hover:text-white">Accueil</Link></li>
                <li aria-hidden="true">›</li>
                <li><Link href="/offers" className="hover:text-white">Offres et services</Link></li>
                <li aria-hidden="true">›</li>
                <li className="text-white font-medium" aria-current="page">{offer.title}</li>
              </ol>
            </nav>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{offer.title}</h1>
            <p className="text-white/85 text-lg max-w-2xl">{offer.description}</p>
          </div>

          <div className="h-56 rounded-2xl overflow-hidden lg:hidden">{heroVisual}</div>

          {/* Largeur fixe et lignes centrées : les points restent groupés, quel que soit leur nombre */}
          {offer.steps && (
            <ul className="flex flex-wrap justify-center gap-x-2 gap-y-5 sm:gap-x-4">
              {offer.steps.map(step => (
                <li key={step.label} className="flex-1 min-w-22 max-w-26 flex flex-col items-center text-center gap-2">
                  <span className="w-12 h-12 rounded-full border-2 border-white/60 flex items-center justify-center text-white">
                    {step.icon}
                  </span>
                  <span className="text-white text-sm font-medium">{step.label}</span>
                </li>
              ))}
            </ul>
          )}

          <section className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6">
            <h2 className="text-2xl font-bold text-white mb-1">{offer.prestationsTitle || 'Nos prestations'}</h2>
            <p className="text-white/80 text-sm mb-5">{offer.prestationsIntro || 'Des solutions adaptées à chaque étape de votre projet.'}</p>
            <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 ${offer.prestations.length % 3 === 0 || offer.prestations.length === 5 ? 'xl:grid-cols-3' : 'xl:grid-cols-4'}`}>
              {offer.prestations.map(prestation => (
                <article key={prestation.title} className="bg-white/5 rounded-xl border border-white/15 overflow-hidden">
                  <div className="h-28">
                    <Visual image={prestation.image} alt={prestation.title} icon={prestation.icon} />
                  </div>
                  <div className="p-3">
                    <h3 className="text-white font-semibold text-sm mb-1">{prestation.title}</h3>
                    <p className="text-white/75 text-xs">{prestation.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {offer.benefits && (
            <section className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6">
              <h2 className="text-2xl font-bold text-white mb-4">Pourquoi passer par Club Laverie ?</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                {offer.benefits.map(benefit => (
                  <li key={benefit} className="flex items-start gap-3 text-white/90 text-sm">
                    <CheckIcon />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {offer.model && (
            <section className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6 flex items-center gap-5">
              <span className="w-14 h-14 rounded-full bg-blue-500/40 flex items-center justify-center text-white flex-shrink-0">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="4" y="13" width="4" height="7" rx="1" />
                  <rect x="10" y="9" width="4" height="11" rx="1" />
                  <rect x="16" y="5" width="4" height="15" rx="1" />
                </svg>
              </span>
              <div>
                <h2 className="text-lg font-bold text-white mb-1">Notre modèle</h2>
                {offer.model.map(line => (
                  <p key={line} className="text-white/80 text-sm">{line}</p>
                ))}
              </div>
            </section>
          )}

          {offer.contact && (
            <section className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6 flex flex-col sm:flex-row sm:items-center gap-5">
              <span className="w-14 h-14 rounded-full bg-blue-500/40 flex items-center justify-center text-white flex-shrink-0">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.86 9.86 0 01-4-.83L3 20l1.4-3.72A7.6 7.6 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </span>
              <div className="flex-1">
                <h2 className="text-lg font-bold text-white mb-1">{offer.contact.title}</h2>
                <p className="text-white/80 text-sm">{offer.contact.text}</p>
              </div>
              {/* Le formulaire de demande sert de prise de contact */}
              <a
                href="#demande"
                className="self-start sm:self-center whitespace-nowrap rounded-lg border border-white/40 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10 transition-colors duration-200"
              >
                {offer.contact.label}
              </a>
            </section>
          )}
        </div>

        {/* Colonne latérale */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="hidden lg:block h-64 rounded-2xl overflow-hidden">{heroVisual}</div>
          <div id="demande" className="scroll-mt-24">
            <OfferForm
              offer={offer.slug}
              form={offer.form}
              contact={user ? {
                firstname: profile?.firstname || '',
                lastname: profile?.lastname || '',
                email: profile?.email || user.email || '',
                phone_number: profile?.phone_number || '',
              } : null}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
