'use server'

import moment from "moment"
import { createServiceClient } from "@/lib/supabase-service"
import { queryPostHog } from "@/lib/posthog-api"
import { checkIsAdmin } from "@/utils/auth"
import { getStartsAt, getScale, generateRanges } from "@/utils/functions"

interface StatsGlobalItem {
  stats: {
    created_at: string
    count: number
  }
}

interface TrendsBreakdownResult {
  label: string
  aggregated_value: number
}

interface TrendsQueryResponse {
  results: TrendsBreakdownResult[]
}

export interface PageViewsByPath {
  path: string
  count: number
}

const POSTHOG_BREAKDOWN_LABELS: Record<string, string> = {
  '$$_posthog_breakdown_other_$$': 'Autres pages',
  '$$_posthog_breakdown_null_$$': 'Page inconnue',
}

const PAGE_VIEWS_BY_PATH_QUERY = {
  kind: 'TrendsQuery',
  series: [
    {
      kind: 'EventsNode',
      event: '$pageview',
      math: 'total',
    },
  ],
  breakdownFilter: {
    breakdowns: [
      {
        property: '$pathname',
        type: 'event',
      },
    ],
    breakdown_path_cleaning: true,
  },
  dateRange: {
    date_from: '-30d',
  },
  filterTestAccounts: true,
  trendsFilter: {
    display: 'ActionsBarValue',
  },
}

export async function countLaundriesUsers() {
  const supabase = await createServiceClient()
  const {data} = await supabase.rpc('count_users_laundries')
  return data
}

export async function countUsersWithLaundries() {
  const supabase = await createServiceClient()
  const {data} = await supabase.rpc('count_users_with_laundries')
  return data
}

export async function countUsersWithoutLaundries() {
  const supabase = await createServiceClient()
  const {data} = await supabase.rpc('count_users_without_laundries')
  return data
}

export async function statsGlobal(period: string) {
  const supabase = await createServiceClient()
  const startsAt = getStartsAt(period)
  const endsAt = moment()
  const scale = getScale(period)
  const range = generateRanges({startsAt, endsAt, scale})
  const {data} = await supabase.rpc('stats_analytics_global', {
    starts_at: startsAt,
    ends_at: endsAt.add(1, 'day')
  })
  if (data) {
    return range.map(({from, to}) => {
      const count = (data as StatsGlobalItem[])
        .filter(({stats: {created_at}}: StatsGlobalItem) => {
          return moment(created_at).diff(from, 'minutes') >= 0 && moment(created_at).diff(to, 'minutes') < 0
        })
        .reduce((total: number, {stats: {count}}: StatsGlobalItem) => total + count, 0)
      return {
        created_at: from,
        count
      }
    })
  }
  return []
}

export async function pageViewsByPath(): Promise<PageViewsByPath[]> {
  const isAdmin = await checkIsAdmin()
  if (!isAdmin) return []

  const data = await queryPostHog<TrendsQueryResponse>(PAGE_VIEWS_BY_PATH_QUERY)
  if (!data) return []

  return data.results.map(({ label, aggregated_value }) => ({
    path: POSTHOG_BREAKDOWN_LABELS[label] ?? label,
    count: aggregated_value,
  }))
}