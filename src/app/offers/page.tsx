import Link from "next/link";
import type { Metadata } from "next";

import { OFFERS, StoreIcon } from "./_data";
import Visual from "./_Visual";

export const metadata: Metadata = {
  title: 'Offres et services',
}

export default function Offers() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Offres et services</h1>
        <p className="text-white/80">
          Des solutions proposées par Club Laverie et ses partenaires pour faire avancer vos projets.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {OFFERS.map(offer => (
          <Link
            key={offer.slug}
            href={`/offers/${offer.slug}`}
            className="group bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden flex flex-col hover:bg-white/15 hover:border-white/40 transition-all duration-200"
          >
            <div className="h-44 overflow-hidden">
              <Visual image={offer.image} alt={offer.title} icon={<StoreIcon />} className="group-hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="p-6 flex flex-col gap-3 flex-1">
              <h2 className="text-xl font-bold text-white">{offer.title}</h2>
              <p className="text-white/80 text-sm flex-1">{offer.summary}</p>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-blue-200 group-hover:text-white">
                Découvrir l&apos;offre
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
