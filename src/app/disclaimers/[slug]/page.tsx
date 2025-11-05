//'use client'

import { use } from 'react'
import type { Metadata } from "next";
import LaundriesSummary from "@/components/pages/LaundriesSummary"
import PressingsSummary from "@/components/pages/PressingsSummary"
import MaterialsSummary from "@/components/pages/MaterialsSummary"

import ButtonEmail from '../_ButtonEmail'

const getMetadataBySlug = (slug: string): Metadata => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  
  const metadataMap: Record<string, Metadata> = {
    laundries: {
      title: "Laveries - Club Laverie",
      description: "Découvrez les meilleures opportunités d'investissement dans les laveries automatiques. Trouvez la laverie qui correspond à votre profil et commencez votre aventure entrepreneuriale avec Club Laverie.",
      keywords: [
        "laverie automatique",
        "laverie à vendre",
        "investissement laverie",
        "achat laverie",
        "opportunité laverie",
        "laverie professionnelle",
        "laverie self-service",
        "business laverie",
        "club laverie",
        "ouvrir laverie",
        "projet laverie",
      ],
      authors: [{ name: "Club Laverie" }],
      creator: "Club Laverie",
      publisher: "Club Laverie",
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
      openGraph: {
        type: "website",
        locale: "fr_FR",
        url: `${baseUrl}/disclaimers/laundries`,
        title: "Laveries - Club Laverie",
        description: "Découvrez les meilleures opportunités d'investissement dans les laveries automatiques. Trouvez la laverie qui correspond à votre profil.",
        siteName: "Club Laverie",
      },
      twitter: {
        card: "summary_large_image",
        title: "Laveries - Club Laverie",
        description: "Découvrez les meilleures opportunités d'investissement dans les laveries automatiques. Trouvez la laverie qui correspond à votre profil.",
      },
      alternates: {
        canonical: `${baseUrl}/disclaimers/laundries`,
      },
      category: "Business",
    },
    pressings: {
      title: "Pressings - Club Laverie",
      description: "Découvrez les meilleures opportunités d'investissement dans les pressings. Trouvez le pressing qui correspond à votre profil et commencez votre aventure entrepreneuriale avec Club Laverie.",
      keywords: [
        "pressing",
        "pressing à vendre",
        "investissement pressing",
        "achat pressing",
        "opportunité pressing",
        "pressing professionnel",
        "blanchisserie",
        "business pressing",
        "club laverie",
        "ouvrir pressing",
        "projet pressing",
      ],
      authors: [{ name: "Club Laverie" }],
      creator: "Club Laverie",
      publisher: "Club Laverie",
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
      openGraph: {
        type: "website",
        locale: "fr_FR",
        url: `${baseUrl}/disclaimers/pressings`,
        title: "Pressings - Club Laverie",
        description: "Découvrez les meilleures opportunités d'investissement dans les pressings. Trouvez le pressing qui correspond à votre profil.",
        siteName: "Club Laverie",
      },
      twitter: {
        card: "summary_large_image",
        title: "Pressings - Club Laverie",
        description: "Découvrez les meilleures opportunités d'investissement dans les pressings. Trouvez le pressing qui correspond à votre profil.",
      },
      alternates: {
        canonical: `${baseUrl}/disclaimers/pressings`,
      },
      category: "Business",
    },
    materials: {
      title: "Matériel Laverie - Club Laverie",
      description: "Découvrez une large sélection de matériel professionnel pour laverie : lave-linges, séchoirs, monnayeurs et bien plus encore. Trouvez l'équipement idéal pour votre projet avec Club Laverie.",
      keywords: [
        "matériel laverie",
        "machines à laver professionnelles",
        "sécheuses professionnelles",
        "monnayeur laverie",
        "équipement laverie",
        "matériel pressing",
        "matériel blanchisserie",
        "achat matériel laverie",
        "vente matériel laverie",
        "club laverie",
        "équipement professionnel",
      ],
      authors: [{ name: "Club Laverie" }],
      creator: "Club Laverie",
      publisher: "Club Laverie",
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
      openGraph: {
        type: "website",
        locale: "fr_FR",
        url: `${baseUrl}/disclaimers/materials`,
        title: "Matériel Laverie - Club Laverie",
        description: "Découvrez une large sélection de matériel professionnel pour laverie : lave-linges, séchoirs, monnayeurs et bien plus encore.",
        siteName: "Club Laverie",
      },
      twitter: {
        card: "summary_large_image",
        title: "Matériel Laverie - Club Laverie",
        description: "Découvrez une large sélection de matériel professionnel pour laverie : lave-linges, séchoirs, monnayeurs et bien plus encore.",
      },
      alternates: {
        canonical: `${baseUrl}/disclaimers/materials`,
      },
      category: "Business",
    },
  };

  return metadataMap[slug] || {
    title: "Club Laverie",
    description: "Découvrez les meilleures opportunités d'investissement dans les laveries automatiques, pressings et matériel professionnel.",
    robots: {
      index: true,
      follow: true,
    },
  };
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return getMetadataBySlug(slug);
}

export default function Disclaimer({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  return (
    <div className="container mx-auto px-4 py-8">
      {
        slug === 'laundries' && (
          <LaundriesSummary />
        )
      }
      {
        slug === 'pressings' && (
          <PressingsSummary />
        )
      }
      {
        slug === 'materials' && (
          <MaterialsSummary />
        )
      }
      {/* Message d'information sur la création de compte */}
      <div className="mt-8 p-6 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-400/30 rounded-xl backdrop-blur-sm">
        <div className="flex items-start gap-3">
          <svg
            className="w-6 h-6 text-amber-400 mt-0.5 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div className="text-white">
            <h3 className="text-lg font-semibold text-amber-200 mb-2">
              Accès Complet avec Compte
            </h3>
            <p className="text-white/90 leading-relaxed">
              Pour accéder à toutes nos fonctionnalités et consulter le détail des produits disponibles,
              la création d&apos;un compte est requise. Cela nous permet de vous proposer une expérience
              personnalisée et de garantir la qualité de nos services.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <ButtonEmail />
      </div>



    </div>
  )
}