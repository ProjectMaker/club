import { Suspense } from "react";
import type { Metadata } from "next";
import Sales from "./_Sales";
import SalesLoading from "./_SalesLoading";
import { createClient } from "@/lib/supabase-server";

import LoginForm from "@/components/pages/LoginForm";
import InfosSummary from "@/components/pages/InfosSummary";
import { User } from "@/models";

export const metadata: Metadata = {
  title: "Club Laverie - Trouvez votre laverie, pressing ou matériel idéal",
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
    type: "website",
    locale: "fr_FR",
    url: "/",
    title: "Club Laverie - Trouvez votre laverie, pressing ou matériel idéal",
    description: "Découvrez les meilleures opportunités d'investissement dans les laveries automatiques. Des emplacements premium, des rendements attractifs.",
    siteName: "Club Laverie",
  },
  twitter: {
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
      <div className={`py-8 px-4`}>
        <div className="text-center lg:text-left">
          <h1 className="text-4xl font-bold text-white mb-6 leading-tight">
            Réseau des <span className="text-blue-300">professionnels</span>, <span className="text-green-300">investisseurs</span> et <span className="text-purple-300">nouveaux entrepreneurs</span> dans le domaine du lavage.

          </h1>
        </div>

      </div>
      <div className="flex flex-col md:flex-row md:items-start md:gap-12">
        <p className={`text-xl text-white/80 mb-8 md:mb-0 ${!Boolean(user) ? 'md:w-1/2' : 'md:w-full'}`}>
          Découvrez les meilleures opportunités d&apos;investissement dans les laveries automatiques, pressings, lavages automobiles et la vente de matériel professionnel.
        </p>
        {
          !Boolean(user) && (
            <div className="md:w-1/2">
              <LoginForm />
            </div>
          )
        }
      </div>
      <InfosSummary />
      <Suspense fallback={<SalesLoading />}>
        <Sales user={user as unknown as User} />
      </Suspense>
    </div>
  )
}
