'use client'
import { useRouter } from 'next/navigation';
import { useQuery } from "@tanstack/react-query";
import { getFirstPicture } from "@/data-access-layers/laundries";
import { Laundry } from "@/models";
import ChipStatus from "@/components/ui/ChipStatus";

function LaundryPicture({ laundry }: { laundry: Laundry }) {
  const { data: firstPicture, isLoading, isError } = useQuery({
    queryKey: ['laundry', laundry.id, 'firstPicture'],
    queryFn: () => getFirstPicture(laundry.id)
  });

  return !isLoading && !isError && firstPicture ? (
    <div className="relative">
      <img
        src={firstPicture.data_url}
        alt={laundry.name}
        className="w-full h-64 object-cover hover:scale-110 transition-transform duration-500"
      />
      <div className="absolute top-2 right-2">
        <ChipStatus status={laundry.status} />
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

export default function Card({ laundry }: { laundry: Laundry }) {
  const router = useRouter();
  console.log(laundry)
  return (


    <div
      key={laundry.id}
      className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 overflow-hidden flex flex-col justify-between"
    >
      <div>
        {/* Header avec titre et badge de statut */}
        <div className="flex justify-between items-start mb-4">
          <span className="text-xl font-bold text-white">
            {laundry.name}
          </span>
        </div>

        {/* Image avec placeholder */}
        <div className="relative mb-6 overflow-hidden rounded-lg">
          <LaundryPicture laundry={laundry} />
        </div>

        {/* Adresse avec icône */}
        <div className="flex items-center mb-6">
          <svg className="w-4 h-4 mr-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <p className="text-white/70 text-sm">{laundry.address || `${laundry.postal_code} ${laundry.city}`}</p>
        </div>

        {/* Statistiques principales */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="text-center p-2 bg-white/10 rounded">
            <div className="text-lg font-bold text-blue-300">{laundry.surface}</div>
            <div className="text-xs text-white/60">m²</div>
          </div>
          <div className="text-center p-2 bg-white/10 rounded">
            <div className="text-lg font-bold text-green-300">{laundry.rent}</div>
            <div className="text-xs text-white/60">€/mois</div>
          </div>
          <div className="text-center p-2 bg-white/10 rounded">
            <div className="text-lg font-bold text-yellow-300">{laundry.price}</div>
            <div className="text-xs text-white/60">€</div>
          </div>
        </div>

        {/* Matériaux */}
        {laundry.materials && laundry.materials.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-white mb-3 flex items-center">
              <svg className="w-4 h-4 mr-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              Équipements inclus
            </h4>
            <div className="flex flex-wrap gap-2">
              {laundry.materials.map((material, index) => (
                <span
                  key={index}
                  className="bg-white/20 text-white px-3 py-1 rounded-full text-xs font-medium hover:bg-white/30 transition-colors duration-200"
                >
                  {
                    material.name
                  }
{typeof material === 'object' && material !== null && 'name' in material ? (material as { name: string }).name : material}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
      <button
        onClick={() => router.push(`/laundries/${laundry.id}`)}
        className="w-full cursor-pointer bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold transition-colors"
      >
        Voir les détails
      </button>
    </div>
  )
}