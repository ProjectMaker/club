import Link from "next/link";
import { getProfileLaundries } from '@/data-access-layers/laundries'

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
  });
};

const getStatusLabel = (status: string) => {
  switch (status) {
      case 'available': return 'Disponible';
      case 'sold': return 'Vendu';
      case 'reserved': return 'Réservé';
      default: return status;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
      case 'available': return 'text-green-400';
      case 'sold': return 'text-red-400';
      case 'reserved': return 'text-orange-400';
      default: return 'text-gray-400';
  }
};

export default async function Laundries() {
  const laundries = await getProfileLaundries()
  return (
    <div className="min-h-screen">
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    Mes laveries
                </h1>
                <div className="text-white/90 leading-relaxed">
                    <div className="text-lg">
                        Consultez la liste de <span className="font-semibold text-blue-300">vos laveries</span> mises en vente.
                    </div>
                    <div className="text-base">
                        Gérez vos annonces et suivez leur statut.
                    </div>
                </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
                    <h2 className="text-2xl font-bold text-white mb-4 sm:mb-0">
                        Liste de vos laveries ({laundries?.length || 0})
                    </h2>
                    <Link
                        href={'/profile/laundries/new'}
                        className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
                    >
                        Ajouter une laverie
                    </Link>
                </div>

                {laundries?.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="text-white/60 text-lg mb-4">
                            Vous n'avez pas encore de laveries en vente
                        </div>
                        <div className="text-white/40 text-base">
                            Contactez notre équipe pour ajouter votre première laverie
                        </div>
                    </div>
                ) : (

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-white/20">
                                    <th className="text-left py-3 px-4 text-white font-semibold">
                                        Nom
                                    </th>
                                    <th className="text-left py-3 px-4 text-white font-semibold">
                                        Ville
                                    </th>
                                    <th className="text-left py-3 px-4 text-white font-semibold">
                                        Surface
                                    </th>
                                    <th className="text-left py-3 px-4 text-white font-semibold">
                                        Prix
                                    </th>
                                    <th className="text-left py-3 px-4 text-white font-semibold">
                                        Statut
                                    </th>
                                    <th className="text-left py-3 px-4 text-white font-semibold">
                                        Date
                                    </th>
                                    <th className="text-left py-3 px-4 text-white font-semibold">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {laundries?.map((laundry) => (
                                    <tr
                                        key={laundry.id}
                                        className="border-b border-white/10 hover:bg-white/5 transition-colors duration-200"
                                    >
                                        <td className="py-3 px-4 text-white">
                                            <div className="font-medium">
                                                {laundry.name}
                                            </div>
                                        </td>
                                        <td className="py-3 px-4 text-white/80">
                                            {laundry.city}
                                        </td>
                                        <td className="py-3 px-4 text-white/80">
                                            {laundry.surface} m²
                                        </td>
                                        <td className="py-3 px-4 text-white font-medium">
                                            {laundry.price.toLocaleString('fr-FR')} €
                                        </td>
                                        <td className="py-3 px-4">
                                            <span className={`font-medium ${getStatusColor(laundry.status)}`}>
                                                {getStatusLabel(laundry.status)}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 text-white/80">
                                            {formatDate(laundry.created_at)}
                                        </td>
                                        <td className="py-3 px-4">
                                            <div className="flex items-center gap-3">
                                                <Link
                                                    href={`/private/profile/laundries/${laundry.id}`}
                                                    className="text-blue-400 hover:text-blue-300 text-sm font-medium cursor-pointer"
                                                >
                                                    Voir
                                                </Link>
                                                
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