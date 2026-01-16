import Link from "next/link";
import { getProfileMaterials } from '@/data-access-layers/materials'
import { 
  formatDate, 
  getStatusLabel, 
  getStatusColor,
  getCategoryLabel,
  getBrandLabel
} from '@/utils/functions'

import DeleteButton from "./_DeleteButton"

export default async function Materials() {
  const materials = await getProfileMaterials()
  return (
    <div className="min-h-screen">
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    Mon matériel
                </h1>
                <div className="text-white/90 leading-relaxed">
                    <div className="text-lg">
                        Consultez la liste de <span className="font-semibold text-blue-300">votre matériel</span> mises en vente.
                    </div>
                    <div className="text-base">
                        Gérez vos annonces et suivez leur statut.
                    </div>
                </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
                    <h2 className="text-2xl font-bold text-white mb-4 sm:mb-0">
                        Liste de votre matériel ({materials?.length || 0})
                    </h2>
                    <Link
                        href={'/private/admin/materials/new'}
                        className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
                    >
                        Ajouter un matériel
                    </Link>
                </div>

                {materials?.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="text-white/60 text-lg mb-4">
                            Vous n&apos;avez pas encore de pressing en vente
                        </div>
                        <div className="text-white/40 text-base">
                            Contactez notre équipe pour ajouter votre premier matériel
                        </div>
                    </div>
                ) : (

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-white/20">
                                    <th className="text-left py-3 px-4 text-white font-semibold">
                                        Nom/Modèle
                                    </th>
                                    <th className="text-left py-3 px-4 text-white font-semibold">
                                        Catégorie
                                    </th>
                                    <th className="text-left py-3 px-4 text-white font-semibold">
                                        Marque
                                    </th>
                                    <th className="text-left py-3 px-4 text-white font-semibold">
                                        Prix
                                    </th>
                                    <th className="text-left py-3 px-4 text-white font-semibold">
                                        Qté
                                    </th>
                                    <th className="text-left py-3 px-4 text-white font-semibold">
                                        Statut
                                    </th>
                                    <th className="text-left py-3 px-4 text-white font-semibold">
                                        Utilisateur
                                    </th>
                                    <th className="text-left py-3 px-4 text-white font-semibold">
                                        Date de création
                                    </th>
                                    <th className="text-left py-3 px-4 text-white font-semibold">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {materials?.map((material) => (
                                    <tr
                                        key={material.id}
                                        className="border-b border-white/10 hover:bg-white/5 transition-colors duration-200"
                                    >
                                        <td className="py-3 px-4 text-white">
                                            {material.model || material.name}
                                            
                                        </td>
                                        <td className="py-3 px-4 text-white/80">
                                            {getCategoryLabel(material.category)}
                                        </td>
                                        <td className="py-3 px-4 text-white/80">
                                            {getBrandLabel(material.brand)}
                                        </td>
                                        <td className="py-3 px-4 text-white font-medium">
                                            {material.price.toLocaleString('fr-FR')} €
                                        </td>
                                        <td className="py-3 px-4 text-white/80">
                                            {getBrandLabel(material.quantity)}
                                        </td>
                                        <td className="py-3 px-4">
                                            <span className={`font-medium ${getStatusColor(material.status)}`}>
                                                {getStatusLabel(material.status)}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 text-white/80">
                                                {material.users?.firstname} {material.users?.lastname}
                                            </td>
                                        <td className="py-3 px-4 text-white/80">
                                            {formatDate(material.created_at, false)}
                                        </td>
                                        <td className="py-3 px-4">
                                            <div className="flex items-center gap-3">
                                                <Link
                                                    href={`/private/admin/materials/${material.id}`}
                                                    className="text-blue-400 hover:text-blue-300 text-sm font-medium cursor-pointer"
                                                >
                                                    Voir
                                                </Link>
                                                <DeleteButton material={material} />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                )}
            </div>
        </div>
        
    </div>
);
}