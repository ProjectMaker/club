'use client'
import { useRef, useEffect } from "react";
import Loader from "@/components/ui/Loader";

import Card from "./_Card";
import useList from './use-list'

export default function List() {
    const { data, isLoading, isFetching, error, fetchNextPage, shouldFetchNextPage } = useList()
    const sentinelRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const sentinel = sentinelRef.current
        if (!sentinel || !shouldFetchNextPage || isFetching) return

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && shouldFetchNextPage && !isFetching) {
                    fetchNextPage()
                }
            },
            {
                rootMargin: '100px',
            }
        )

        observer.observe(sentinel)

        return () => {
            if (sentinel) {
                observer.unobserve(sentinel)
            }
        }
    }, [shouldFetchNextPage, isFetching, fetchNextPage])
    
    if (error) return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-red-500 text-white p-4 rounded-lg">
                <h2 className="text-xl font-bold mb-2">Erreur</h2>
                <p>Impossible de charger les matériaux. Veuillez réessayer plus tard.</p>
            </div>
        </div>
    )

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                {data?.pages?.flatMap(materials => materials.map((material) => (
                    <Card key={material.id} material={material} />
                )))}
            </div>
            {shouldFetchNextPage && (
                <div ref={sentinelRef} className="flex justify-center mt-6 min-h-[100px]">
                    {isFetching && <Loader />}
                </div>
            )}
        </>
    )
}