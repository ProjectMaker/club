'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import moment from 'moment'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import { statsGlobal } from '@/data-access-layers/analytics'
import { ChartBarIcon } from '@heroicons/react/24/outline'

type Period = '1day' | '3days' | '7days' | '1month' | '1year'

interface PeriodOption {
  value: Period
  label: string
}

const PERIOD_OPTIONS: PeriodOption[] = [
  { value: '1day', label: '1 jour' },
  { value: '3days', label: '3 jours' },
  { value: '7days', label: '7 jours' },
  { value: '1month', label: '1 mois' },
  { value: '1year', label: '1 an' }
]

const formatXAxisTick = (dateString: string, period: Period): string => {
  const date = moment(dateString)
  
  if (period === '1day' || period === '3days') {
    return date.format('HH:mm')
  } else if (period === '7days' || period === '1month') {
    return date.format('DD/MM')
  }
  return date.format('MMM YYYY')
}

const formatTooltipDate = (dateString: string, period: Period): string => {
  const date = moment(dateString)
  
  if (period === '1day' || period === '3days') {
    return date.format('DD/MM/YYYY HH:mm')
  } else if (period === '7days' || period === '1month') {
    return date.format('DD/MM/YYYY')
  }
  return date.format('MMMM YYYY')
}

interface TooltipPayloadItem {
  value: number
  payload: {
    created_at: string
    count: number
  }
}

interface CustomTooltipProps {
  active?: boolean
  payload?: TooltipPayloadItem[]
  period: Period
}

const CustomTooltip = ({ active, payload, period }: CustomTooltipProps) => {
  if (!active || !payload || !payload.length) {
    return null
  }

  const data = payload[0]

  return (
    <div className="bg-gray-900/95 backdrop-blur-sm border border-white/20 rounded-lg p-3 shadow-xl">
      <p className="text-white/60 text-xs mb-1">
        {formatTooltipDate(data.payload.created_at, period)}
      </p>
      <p className="text-white font-semibold text-lg">
        {data.value} <span className="text-white/60 text-sm font-normal">activité(s)</span>
      </p>
    </div>
  )
}

const Activity = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<Period>('7days')

  const { data: chartData, isLoading } = useQuery({
    queryKey: ['stats-global', selectedPeriod],
    queryFn: () => statsGlobal(selectedPeriod)
  })

  const handlePeriodChange = (period: Period) => {
    setSelectedPeriod(period)
  }

  const totalActivity = chartData?.reduce((sum, item) => sum + item.count, 0) ?? 0

  return (
    <div className="mt-6">
      <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-6">
        {/* Header avec titre et sélecteur */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-500/20 p-2 rounded-full">
              <ChartBarIcon className="h-5 w-5 text-indigo-400" aria-hidden="true" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Activité globale</h2>
              <p className="text-white/60 text-sm">
                {isLoading ? 'Chargement...' : `${totalActivity} activité(s) sur la période`}
              </p>
            </div>
          </div>

          {/* Sélecteur de période */}
          <div 
            className="flex flex-wrap gap-2"
            role="group"
            aria-label="Sélectionner une période"
          >
            {PERIOD_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handlePeriodChange(option.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handlePeriodChange(option.value)
                  }
                }}
                className={`
                  px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200
                  focus:outline-none focus:ring-2 focus:ring-indigo-500/50
                  ${selectedPeriod === option.value
                    ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/25'
                    : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                  }
                `}
                aria-pressed={selectedPeriod === option.value}
                tabIndex={0}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Graphique */}
        <div className="h-80 w-full">
          {isLoading ? (
            <div className="h-full flex items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-white/60 text-sm">Chargement des données...</p>
              </div>
            </div>
          ) : chartData && chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  stroke="rgba(255,255,255,0.1)" 
                  vertical={false}
                />
                <XAxis
                  dataKey="created_at"
                  tickFormatter={(value) => formatXAxisTick(value, selectedPeriod)}
                  stroke="rgba(255,255,255,0.4)"
                  tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }}
                  axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                  tickLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                  interval="preserveStartEnd"
                />
                <YAxis
                  stroke="rgba(255,255,255,0.4)"
                  tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }}
                  axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                  tickLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                  allowDecimals={false}
                />
                <Tooltip
                  content={<CustomTooltip period={selectedPeriod} />}
                  cursor={{ stroke: 'rgba(255,255,255,0.2)', strokeWidth: 1 }}
                />
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="#6366f1"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorCount)"
                  animationDuration={500}
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center">
              <p className="text-white/60 text-sm">Aucune donnée disponible pour cette période</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Activity

