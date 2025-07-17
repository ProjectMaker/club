'use client'
import { Laundry } from "@/models";
import Loader from "@/components/ui/Loader";

import useList from './use-list'
import Card from './_Card'

console.log(Card)
export default function List() {
    const { data, isLoading, isFetching, error, fetchNextPage, shouldFetchNextPage } = useList()

    if (error) return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-red-500 text-white p-4 rounded-lg">
                <h2 className="text-xl font-bold mb-2">Erreur</h2>
                <p>Impossible de charger les laveries. Veuillez réessayer plus tard.</p>
            </div>
        </div>
    )

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {data?.pages?.flatMap(laundries => laundries.map((laundry) => (
                <Card key={laundry.id} laundry={laundry} />
            )))}
            {isFetching ? (
                <Loader />
            ) : shouldFetchNextPage && (
                <div className="flex justify-center mt-6">
                    <button onClick={() => fetchNextPage()} className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                        Charger plus de laveries
                    </button>
                </div>
            )}
        </div>
    )
}