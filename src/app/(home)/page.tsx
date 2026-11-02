import { Suspense } from "react";
import type { Metadata } from "next";
import { DEFAULT_OG_IMAGE } from "@/utils/seo";
import Sales from "./_Sales";
import SalesLoading from "./_SalesLoading";
import { createClient } from "@/lib/supabase-server";

import Link from "next/link";
import InfosSummary from "@/components/pages/InfosSummary";
import { User } from "@/models";

import OfferHighlight from "@/app/offers/_OfferHighlight";

export const metadata: Metadata = {
  title: { absolute: "Club Laverie - Trouvez votre laverie, pressing ou matériel idéal" },
  description: "Découvrez les meilleures opportunités d'investissement dans les laveries automatiques. Des emplacements premium, des rendements attractifs. Recherchez et trouvez votre laverie, pressing ou matériel professionnel idéal.",
  keywords: [
    "laverie automatique",
    "pressing",
    "matériel laverie",
    "investissement laverie",
    "achat laverie",
    "vente laverie",
    "laverie professionnelle",
    "machines à laver professionnelles",
    "sécheuses professionnelles",
    "opportunités investissement",
    "laverie self-service",
    "business laverie"
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
    images: [DEFAULT_OG_IMAGE],
    type: "website",
    locale: "fr_FR",
    url: "/",
    title: "Club Laverie - Trouvez votre laverie, pressing ou matériel idéal",
    description: "Découvrez les meilleures opportunités d'investissement dans les laveries automatiques. Des emplacements premium, des rendements attractifs.",
    siteName: "Club Laverie",
  },
  twitter: {
    images: [DEFAULT_OG_IMAGE],
    card: "summary_large_image",
    title: "Club Laverie - Trouvez votre laverie, pressing ou matériel idéal",
    description: "Découvrez les meilleures opportunités d'investissement dans les laveries automatiques. Des emplacements premium, des rendements attractifs.",
  },
  alternates: {
    canonical: "/",
  },
  category: "Business",
};

export default async function Home() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div>
      <div className="py-6 sm:py-8">
        <div className="text-center lg:text-left">
          <h1 className="text-2xl sm:text-4xl font-bold text-white mb-2 sm:mb-6 leading-tight">
            Réseau des <span className="text-blue-300">professionnels</span>, <span className="text-green-300">investisseurs</span> et <span className="text-purple-300">nouveaux entrepreneurs</span> dans le domaine du lavage.

          </h1>
        </div>

      </div>
      <div className="flex flex-col md:flex-row md:items-start md:gap-12">
        <div className="mb-8 md:mb-0 md:flex-1 space-y-4">
          <p className="text-xl text-white/80">
            Découvrez les meilleures opportunités d&apos;investissement dans les laveries automatiques, pressings, lavages automobiles et la vente de matériel professionnel.
          </p>
          <p className="text-lg text-white/70">
            Et pour faire avancer vos projets, nos <strong className="text-white font-semibold">offres et services</strong> vous mettent en relation avec des partenaires spécialisés : création ou rénovation de laverie, matériel, maintenance, financement, coaching et formation.
          </p>
          <Link href="/offers" className="inline-flex items-center gap-1 text-blue-200 hover:text-white font-semibold">
            Voir les offres et services
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        {/* Encart membres compact : la connexion se fait sur /login pour laisser la place aux offres */}
        {!user && (
          <div className="md:w-96 flex-shrink-0 p-5 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
            <p className="text-white font-semibold mb-1">Espace membres</p>
            <p className="text-white/70 text-sm mb-4">
              Annonces de laveries, pressings et matériel réservées aux membres du Club.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-lg bg-blue-600 hover:bg-blue-700 px-4 py-2 text-sm font-semibold text-white transition-colors duration-200"
              >
                Se connecter
              </Link>
              <Link
                href="/signup"
                className="inline-flex items-center justify-center rounded-lg border border-white/40 hover:bg-white/10 px-4 py-2 text-sm font-semibold text-white transition-colors duration-200"
              >
                Rejoindre le Club
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Offres mises en avant */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <OfferHighlight slug="acheter-ou-financer-du-materiel" />
        <OfferHighlight slug="creer-ou-renover-ma-laverie" />
      </div>

      <InfosSummary />
      <Suspense fallback={<SalesLoading />}>
        <Sales user={user as unknown as User} />
      </Suspense>
    </div >
  )
}
