import { Suspense } from "react";
import type { Metadata } from "next";
import Sales from "./_Sales";
import SalesLoading from "./_SalesLoading";
import { createClient } from "@/lib/supabase-server";

import LoginForm from "@/components/pages/LoginForm";
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
      <div className={`py-8 px-4 grid gap-12 items-center ${user ? 'lg:grid-cols-1' : 'lg:grid-cols-2'}`}>
        <div className="text-center lg:text-left">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Trouvez votre <span className="text-blue-300">laverie</span>, <span className="text-green-300">pressing</span> ou <span className="text-purple-300">matériel</span> idéal
          </h1>
          <p className="text-xl text-white/80 mb-8">
            Découvrez les meilleures opportunités d&apos;investissement dans les laveries automatiques.
            Des emplacements premium, des rendements attractifs.
          </p>
        </div>
        {!user && (
          <div className="flex justify-center lg:justify-end">
            <LoginForm />
          </div>
        )}
      </div>
      <Suspense fallback={<SalesLoading />}>
        <Sales user={user as unknown as User} />
      </Suspense>
    </div>
  )
}
