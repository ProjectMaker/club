import Link from "next/link"

import { getLaundry } from "@/data-access-layers/laundries"
import ChipStatus from '@/components/ui/ChipStatus'
import Carousel from "./_Carousel"
import ButtonMail from "./_ButtonMail"

export default async function Laundry({params}: {params: Promise<{id: string}>}) {
    const {id} = await params
    const laundry = await getLaundry(parseInt(id))
    return (
        <div className="container mx-auto px-4 py-8">
            {/* Bouton retour */}
            <Link
                href={'/private/laundries'}
                className="mb-6 flex items-center text-white hover:text-white/70 transition-colors duration-200"
            >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Retour à la liste
            </Link>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden">
                {/* En-tête avec carousel */}
                <div className="relative">
                    <Carousel laundry={laundry} />
                    <div className="absolute top-4 right-4 z-10">
                        <ChipStatus status={laundry.status} />
                    </div>
                </div>


                {/* Contenu principal */}
                <div className="p-8">
                    {/* Titre et informations principales */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-white mb-4">{laundry.name}</h1>
                        
                        {/* Adresse */}
                        <div className="flex items-center mb-6 text-white/70">
                            <svg className="w-6 h-6 mr-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span className="text-lg">{laundry.address || `${laundry.postal_code} ${laundry.city}`}</span>
                        </div>

                        {/* Statistiques principales */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="bg-white/10 p-6 rounded-lg text-center">
                                <div className="text-3xl font-bold text-blue-300 mb-2">{laundry.surface}</div>
                                <div className="text-white/80 font-semibold">Surface (m²)</div>
                            </div>
                            <div className="bg-white/10 p-6 rounded-lg text-center">
                                <div className="text-3xl font-bold text-green-300 mb-2">{laundry.rent.toLocaleString()}</div>
                                <div className="text-white/80 font-semibold">Loyer mensuel (€)</div>
                            </div>
                            <div className="bg-white/10 p-6 rounded-lg text-center">
                                <div className="text-3xl font-bold text-yellow-300 mb-2">{laundry.price.toLocaleString()}</div>
                                <div className="text-white/80 font-semibold">Prix de vente (€)</div>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    {laundry.description && (
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                                <svg className="w-6 h-6 mr-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                Description
                            </h2>
                            <div className="bg-white/10 p-6 rounded-lg">
                            <p className="text-white/80 leading-relaxed text-lg" dangerouslySetInnerHTML={{ __html: laundry.description.replace(/\n/g, '<br />') }} />
                            </div>
                        </div>
                    )}

                    {/* Équipements */}
                    {laundry.materials && laundry.materials.length > 0 && (
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                                <svg className="w-6 h-6 mr-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                                Équipements inclus
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                {laundry.materials.map((material: {name: string}, index: number) => (
                                    <div
                                        key={index}
                                        className="bg-white/20 text-white px-4 py-3 rounded-lg text-center font-medium hover:bg-white/30 transition-colors duration-200"
                                    >
                                        {material.name}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Informations supplémentaires */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-white/10 p-6 rounded-lg">
                            <h3 className="text-lg font-semibold text-white mb-2">Date de création</h3>
                            <p className="text-white/70">{new Date(laundry.created_at).toLocaleDateString('fr-FR')}</p>
                        </div>
                        <div className="bg-white/10 p-6 rounded-lg">
                            <h3 className="text-lg font-semibold text-white mb-2">Dernière mise à jour</h3>
                            <p className="text-white/70">{new Date(laundry.updated_at).toLocaleDateString('fr-FR')}</p>
                        </div>
                    </div>

                    {/* Boutons d'action */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <ButtonMail laundry={laundry} />
                    </div>
                </div>
            </div>
        </div>
    )
}