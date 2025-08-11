import Link from 'next/link';
import { useQuery } from '@tanstack/react-query'

import { Pressing } from '@/models';
import ChipStatus from '@/components/ui/ChipStatus';

import { getFirstPicture } from '@/data-access-layers/pressings';

function PressingPicture({ pressing }: { pressing: Pressing }) {
  const {data} = useQuery({
    queryKey: ['pressing', pressing.id, 'first-picture'],
    queryFn: () => getFirstPicture(pressing.id)
  })
    return data ? (
        <div className="relative">
            <img
                src={data.data_url}
                alt={pressing.name}
                className="w-full h-64 object-cover hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute top-2 right-2">
                <ChipStatus status={pressing.status} />
            </div>
        </div>
    ) : (
        <div className="w-full h-64 flex items-center justify-center">
            <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
        </div>
    )
}

export default function PressingCard({ pressing }: { pressing: Pressing }) {
    return (
        <div
            key={pressing.id}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 overflow-hidden flex flex-col justify-between"
        >
            <div>
                {/* Header avec titre et badge de statut */}
                <div className="flex justify-between items-start mb-4">
                    <span className="text-xl font-bold text-white">
                        {pressing.name}
                    </span>
                </div>

                {/* Image avec placeholder */}
                <div className="relative mb-6 overflow-hidden rounded-lg">
                    <PressingPicture pressing={pressing} />
                </div>

                {/* Adresse avec icône */}
                <div className="flex items-center mb-6">
                    <svg className="w-4 h-4 mr-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <p className="text-white/70 text-sm">{pressing.postal_code} {pressing.city}</p>
                </div>

                {/* Statistiques principales */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="text-center p-2 bg-white/10 rounded">
                        <div className="text-lg font-bold text-blue-300">{pressing.surface}</div>
                        <div className="text-xs text-white/60">m²</div>
                    </div>
                    <div className="text-center p-2 bg-white/10 rounded">
                        <div className="text-lg font-bold text-green-300">{pressing.rent}</div>
                        <div className="text-xs text-white/60">€/mois</div>
                    </div>
                    <div className="text-center p-2 bg-white/10 rounded">
                        <div className="text-lg font-bold text-yellow-300">{pressing.price}</div>
                        <div className="text-xs text-white/60">€</div>
                    </div>
                </div>

                {/* Description si disponible */}
                {pressing.description && (
                    <div className="mb-4">
                        <h4 className="text-sm font-semibold text-white mb-3 flex items-center">
                            <svg className="w-4 h-4 mr-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Description
                        </h4>
                        <p className="text-white/70 text-sm line-clamp-2">{pressing.description}</p>
                    </div>
                )}
            </div>
            <Link 
                href={`/private/pressings/${pressing.id}`}
                className="w-full cursor-pointer bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold transition-colors text-center block"
            >
                Voir les détails
            </Link>
        </div>
    )
} 