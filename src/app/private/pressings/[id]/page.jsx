import Link from 'next/link'

import { getPressing } from '@/data-access-layers/pressings'
import ChipStatus from '@/components/ui/ChipStatus'

import Carousel from './_Carousel'
import ButtonMail from './_ButtonMail'


export default async function Detail({ params }) {
  const {id} = await params
  const pressing = await getPressing(id)

  return (
    <div className="container mx-auto px-4 py-8">
        {/* Bouton retour */}
        <button
            onClick={() => router.back()}
            className="mb-6 flex items-center text-white hover:text-white/70 transition-colors duration-200"
        >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Retour à la liste
        </button>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden">
            {/* En-tête avec carousel */}
            <div className="relative">
                <Carousel pressing={pressing}  />
                <div className="absolute top-4 right-4 z-10">
                    <ChipStatus status={pressing.status} />
                </div>
            </div>

            {/* Contenu principal */}
            <div className="p-8">
                {/* Titre et informations principales */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white mb-4">{pressing.name}</h1>
                    
                    {/* Adresse */}
                    <div className="flex items-center mb-6 text-white/70">
                        <svg className="w-6 h-6 mr-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="text-lg">{pressing.postal_code} {pressing.city}</span>
                    </div>

                    {/* Statistiques principales */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white/10 p-6 rounded-lg text-center">
                            <div className="text-3xl font-bold text-blue-300 mb-2">{pressing.surface}</div>
                            <div className="text-white/80 font-semibold">Surface (m²)</div>
                        </div>
                        <div className="bg-white/10 p-6 rounded-lg text-center">
                            <div className="text-3xl font-bold text-green-300 mb-2">{pressing.rent.toLocaleString()}</div>
                            <div className="text-white/80 font-semibold">Loyer mensuel (€)</div>
                        </div>
                        <div className="bg-white/10 p-6 rounded-lg text-center">
                            <div className="text-3xl font-bold text-yellow-300 mb-2">{pressing.price.toLocaleString()}</div>
                            <div className="text-white/80 font-semibold">Prix de vente (€)</div>
                        </div>
                    </div>
                </div>

                {/* Description */}
                {pressing.description && (
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                            <svg className="w-6 h-6 mr-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Description
                        </h2>
                        <div className="bg-white/10 p-6 rounded-lg">
                            <p className="text-white/80 leading-relaxed text-lg" dangerouslySetInnerHTML={{ __html: pressing.description.replace(/\n/g, '<br />') }} />
                        </div>
                    </div>
                )}

                {/* Informations supplémentaires */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white/10 p-6 rounded-lg">
                        <h3 className="text-lg font-semibold text-white mb-2">Date de création</h3>
                        <p className="text-white/70">{new Date(pressing.created_at).toLocaleDateString('fr-FR')}</p>
                    </div>
                    <div className="bg-white/10 p-6 rounded-lg">
                        <h3 className="text-lg font-semibold text-white mb-2">Dernière mise à jour</h3>
                        <p className="text-white/70">{new Date(pressing.updated_at).toLocaleDateString('fr-FR')}</p>
                    </div>
                </div>

                {/* Boutons d'action */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <ButtonMail pressing={pressing} />
                </div>
            </div>
        </div>
    </div>
);
}