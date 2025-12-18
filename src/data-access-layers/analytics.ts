'use server'

import moment from "moment"
import { createServiceClient } from "@/lib/supabase-service"
import { getStartsAt, getScale, generateRanges } from "@/utils/functions"

interface StatsGlobalItem {
  stats: {
    created_at: string
    count: number
  }
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