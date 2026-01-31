import { Suspense } from "react";
import type { Metadata } from "next";
import Sales from "./_Sales";
import SalesLoading from "./_SalesLoading";
import { createClient } from "@/lib/supabase-server";

import LoginForm from "@/components/pages/LoginForm";
import InfosSummary from "@/components/pages/InfosSummary";
import WhoIAmSummary from "@/components/pages/WhoIAmSummary";
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

      {/* CTA Consultation */}
      <div className="my-8 p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
        <div className="flex flex-col gap-6">
          <div>
            <h2 className="text-xl font-bold text-white mb-3">
              Un doute sur votre projet de laverie
            </h2>
            <p className="text-white/80 mb-4">
              Prenez 45 minutes pour mettre à plat votre réflexion et lever les points de blocage avec un expert terrain
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-2 text-white/70">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>clarifier vos zones d&apos;incertitudes</span>
              </li>
              <li className="flex items-start gap-2 text-white/70">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>lever les objections qui vous freinent</span>
              </li>
              <li className="flex items-start gap-2 text-white/70">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>vous aider à décider en toute lucidité</span>
              </li>
            </ul>
          </div>
          <a
            href="https://calendly.com/raphael-pariscommerce/45min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-400/50 w-fit"
            tabIndex={0}
            aria-label="Réserver un entretien sur Calendly"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            Réserver un entretien
          </a>
        </div>
      </div>

      <WhoIAmSummary />
      <InfosSummary />
      <Suspense fallback={<SalesLoading />}>
        <Sales user={user as unknown as User} />
      </Suspense>
    </div>
  )
}
