'use client'

import { useQuery } from "@tanstack/react-query"
import { 
  countLaundriesUsers, 
  countUsersWithLaundries, 
  countUsersWithoutLaundries 
} from "@/data-access-layers/analytics"
import { UsersIcon, UserPlusIcon, UserMinusIcon } from "@heroicons/react/24/outline"

function Kpis() {
  const { data: laundriesUsersCount, isLoading: isLoadingLaundries } = useQuery({
    queryKey: ['count-laundries-users'],
    queryFn: () => countLaundriesUsers()
  })

  const { data: usersWithLaundriesCount, isLoading: isLoadingWithLaundries } = useQuery({
    queryKey: ['count-users-with-laundries'],
    queryFn: () => countUsersWithLaundries()
  })

  const { data: usersWithoutLaundriesCount, isLoading: isLoadingWithoutLaundries } = useQuery({
    queryKey: ['count-users-without-laundries'],
    queryFn: () => countUsersWithoutLaundries()
  })

  return (
    <div className="mt-3">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* KPI Card - Nombre de laveries utilisateurs */}
        <div 
          className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-6 hover:bg-white/15 transition-colors duration-200"
          role="article"
          aria-label="Nombre total de laveries par utilisateur"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/60 text-sm font-medium mb-1">
                Laveries
              </p>
              <p className="text-3xl font-bold text-white">
                {isLoadingLaundries ? '...' : (laundriesUsersCount ?? 0)}
              </p>
            </div>
            <div className="bg-blue-500/20 p-3 rounded-full">
              <UsersIcon className="h-6 w-6 text-blue-400" aria-hidden="true" />
            </div>
          </div>
        </div>

        {/* KPI Card - Utilisateurs avec laveries */}
        <div 
          className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-6 hover:bg-white/15 transition-colors duration-200"
          role="article"
          aria-label="Nombre d'utilisateurs avec laveries"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/60 text-sm font-medium mb-1">
                Utilisateurs avec laveries
              </p>
              <p className="text-3xl font-bold text-white">
                {isLoadingWithLaundries ? '...' : (usersWithLaundriesCount ?? 0)}
              </p>
            </div>
            <div className="bg-green-500/20 p-3 rounded-full">
              <UserPlusIcon className="h-6 w-6 text-green-400" aria-hidden="true" />
            </div>
          </div>
        </div>

        {/* KPI Card - Utilisateurs sans laveries */}
        <div 
          className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-6 hover:bg-white/15 transition-colors duration-200"
          role="article"
          aria-label="Nombre d'utilisateurs sans laveries"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/60 text-sm font-medium mb-1">
                Utilisateurs sans laveries
              </p>
              <p className="text-3xl font-bold text-white">
                {isLoadingWithoutLaundries ? '...' : (usersWithoutLaundriesCount ?? 0)}
              </p>
            </div>
            <div className="bg-orange-500/20 p-3 rounded-full">
              <UserMinusIcon className="h-6 w-6 text-orange-400" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default function AnalyticsPage() {
  return (
    <Kpis />
  )
}
