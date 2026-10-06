'use client'

import { useQuery } from '@tanstack/react-query'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import { EyeIcon } from '@heroicons/react/24/outline'
import { pageViewsByPath, type PageViewsByPath } from '@/data-access-layers/analytics'

const BAR_HEIGHT = 32
const MIN_CHART_HEIGHT = 160
const STALE_TIME_MS = 5 * 60 * 1000

interface TooltipPayloadItem {
  value: number
  payload: PageViewsByPath
}

interface CustomTooltipProps {
  active?: boolean
  payload?: TooltipPayloadItem[]
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (!active || !payload || !payload.length) {
    return null
  }

  const data = payload[0]

  return (
    <div className="bg-gray-900/95 backdrop-blur-sm border border-white/20 rounded-lg p-3 shadow-xl">
      <p className="text-white/60 text-xs mb-1">{data.payload.path}</p>
      <p className="text-white font-semibold text-lg">
        {data.value} <span className="text-white/60 text-sm font-normal">vue(s)</span>
      </p>
    </div>
  )
}

const PageViews = () => {
  const { data: chartData, isLoading, isError } = useQuery({
    queryKey: ['page-views-by-path'],
    queryFn: () => pageViewsByPath(),
    staleTime: STALE_TIME_MS
  })

  const totalPageViews = chartData?.reduce((sum, item) => sum + item.count, 0) ?? 0
  const chartHeight = Math.max((chartData?.length ?? 0) * BAR_HEIGHT, MIN_CHART_HEIGHT)

  const renderSubtitle = () => {
    if (isLoading) return 'Chargement...'
    if (isError) return 'Erreur de chargement'
    return `${totalPageViews} vue(s) sur les 30 derniers jours`
  }

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="h-80 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-white/60 text-sm">Chargement des données...</p>
          </div>
        </div>
      )
    }

    if (isError) {
      return (
        <div className="h-80 flex items-center justify-center">
          <p className="text-red-400 text-sm" role="alert">
            Impossible de récupérer les pages vues depuis PostHog
          </p>
        </div>
      )
    }

    if (!chartData || chartData.length === 0) {
      return (
        <div className="h-80 flex items-center justify-center">
          <p className="text-white/60 text-sm">Aucune page vue sur les 30 derniers jours</p>
        </div>
      )
    }

    return (
      <ResponsiveContainer width="100%" height={chartHeight}>
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{ top: 0, right: 10, left: 0, bottom: 0 }}
          accessibilityLayer
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255,255,255,0.1)"
            horizontal={false}
          />
          <XAxis
            type="number"
            stroke="rgba(255,255,255,0.4)"
            tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }}
            axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
            tickLine={{ stroke: 'rgba(255,255,255,0.1)' }}
            allowDecimals={false}
          />
          <YAxis
            type="category"
            dataKey="path"
            width={200}
            stroke="rgba(255,255,255,0.4)"
            tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }}
            axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
            tickLine={false}
            interval={0}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: 'rgba(255,255,255,0.05)' }}
          />
          <Bar
            dataKey="count"
            fill="#6366f1"
            radius={[0, 4, 4, 0]}
            animationDuration={500}
          />
        </BarChart>
      </ResponsiveContainer>
    )
  }

  return (
    <div className="mt-6">
      <section
        className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-6"
        aria-labelledby="page-views-title"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-indigo-500/20 p-2 rounded-full">
            <EyeIcon className="h-5 w-5 text-indigo-400" aria-hidden="true" />
          </div>
          <div>
            <h2 id="page-views-title" className="text-lg font-semibold text-white">
              Pages vues
            </h2>
            <p className="text-white/60 text-sm">{renderSubtitle()}</p>
          </div>
        </div>

        {renderContent()}
      </section>
    </div>
  )
}

export default PageViews
