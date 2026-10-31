import Link from "next/link";

import { getOffer, StoreIcon } from "./_data";
import Visual from "./_Visual";

// Carte de mise en avant d'une offre, au format des cartes « Ressources & conseils »
export default function OfferHighlight({ slug }: { slug: string }) {
  const offer = getOffer(slug)
  if (!offer) {
    return null
  }
  // Points mis en avant : les étapes de l'offre, ou à défaut ses prestations
  const points = offer.steps?.map(({ label }) => label) || offer.prestations.map(({ title }) => title)

  return (
    <div className="p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 h-full flex flex-col">
      <div className="flex flex-col gap-6 flex-1">
        <div>
          <h2 className="text-xl font-bold text-white mb-3">{offer.title}</h2>
          <p className="text-white/80 mb-4">{offer.summary}</p>
          <div className="relative w-full h-48 rounded-xl overflow-hidden mb-4">
            <Visual image={offer.image} alt={offer.title} icon={<StoreIcon />} />
          </div>
          {points.length > 0 && (
            <ul className="space-y-2 mb-6">
              {points.map(point => (
                <li key={point} className="flex items-start gap-2 text-white/70">
                  <svg className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <Link
        href={`/offers/${offer.slug}`}
        className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-400/50 w-fit mt-auto"
      >
        Décrire mon projet
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </Link>
    </div>
  )
}
