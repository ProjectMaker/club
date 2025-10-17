'use client'

import { use } from 'react'
import LaundriesSummary from "@/components/pages/LaundriesSummary"
import PressingsSummary from "@/components/pages/PressingsSummary"
import MaterialsSummary from "@/components/pages/MaterialsSummary"

const handleEmailClick = () => {
  const subject = encodeURIComponent("Contact depuis Club Laverie")
  const body = encodeURIComponent("Bonjour,\n\nJe vous contacte depuis Club Laverie.\n\nCordialement,")
  window.location.href = `mailto:contact@clublaverie.com?subject=${subject}&body=${body}`
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
        <button
          onClick={handleEmailClick}
          className="cursor-pointer group relative inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-purple-300/50"
          tabIndex={0}
          aria-label="Ouvrir la boîte mail pour nous contacter"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              handleEmailClick()
            }
          }}
        >
          <svg
            className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          <span>Nous Contacter</span>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
        </button>
      </div>



    </div>
  )
}