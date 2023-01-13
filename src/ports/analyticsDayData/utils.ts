import { AnalyticsDayData, AnalyticsDayDataFilters } from '@dcl/schemas'
import { AnalyticsTimeframe } from './types'

export const getAnalyticsDayDataFragment = () => `
  fragment analyticsDayDataFragment on AnalyticsDayData {
    id
    date
    sales
    volume
    creatorsEarnings
    daoEarnings
  }
`

export const getAnalyticsTotalDataFragment = () => `
  fragment analyticsTotalDataFragment on Count {
    id
    sales: salesTotal
    volume: salesManaTotal
    creatorsEarnings: creatorEarningsManaTotal
    daoEarnings: daoEarningsManaTotal
  }
`

export function getAnalyticsDayDataQuery(filters: AnalyticsDayDataFilters) {
  const { from } = filters

  const where: string[] = []

  if (from) {
    where.push(`date_gt: ${Math.round(from / 1000)}`)
  }

  return `
    query AnalyticsDayData {
      analytics: analyticsDayDatas(where: { ${where.join('\n')} }) {
        ...analyticsDayDataFragment
      }
    }
    ${getAnalyticsDayDataFragment()}
  `
}

export function getAnalyticsTotalDataQuery() {
  return `
    query AnalyticsTotalData {
      analytics: counts {
        ...analyticsTotalDataFragment
      }
    }
    ${getAnalyticsTotalDataFragment()}
  `
}

export function mapAnalyticsFragment(fragment: any): AnalyticsDayData {
  return {
    id: fragment.id,
    date: fragment.date,
    sales: fragment.sales,
    volume: fragment.volume,
    creatorsEarnings: fragment.creatorsEarnings,
    daoEarnings: fragment.daoEarnings,
  }
}

export function getDateXDaysAgo(numOfDays: number, date = new Date()) {
  const daysAgo = new Date(date.getTime())

  daysAgo.setDate(date.getDate() - numOfDays)
  daysAgo.setHours(0)
  daysAgo.setMinutes(0)
  daysAgo.setSeconds(0)

  return daysAgo
}

export function getTimestampFromTimeframe(timeframe: AnalyticsTimeframe) {
  switch (timeframe) {
    case AnalyticsTimeframe.DAY:
      return getDateXDaysAgo(1).getTime()
    case AnalyticsTimeframe.WEEK:
      return getDateXDaysAgo(7).getTime()
    case AnalyticsTimeframe.MONTH:
      return getDateXDaysAgo(30).getTime()
    case AnalyticsTimeframe.ALL:
      return 0
    default:
      return 0
  }
}

// Rentals

export function getRentalsAnalyticsDayDataQuery(
  filters: AnalyticsDayDataFilters
) {
  const { from } = filters

  const where: string[] = []

  if (from) {
    where.push(`date_gt: ${Math.round(from / 1000)}`)
  }

  return `
    query AnalyticsDayData {
      analytics: analyticsDayDatas(where: { ${where.join('\n')} }) {
        id
        date
        rentals
        volume
        lessorEarnings
        feeCollectorEarnings
      }
    }
  `
}

export function getRentalsAnalyticsTotalDataQuery() {
  return `
    query AnalyticsTotalData {
      analytics: globals {
        id
        rentals
        volume
        lessorEarnings
        feeCollectorEarnings
      }
    }
  `
}

export function mapRentalsAnalyticsFragment(fragment: any): AnalyticsDayData {
  return {
    id: fragment.id === 'global' ? 'all' : fragment.id,
    date: fragment.date,
    sales: 0,
    volume: fragment.volume,
    creatorsEarnings: fragment.lessorEarnings,
    daoEarnings: fragment.feeCollectorEarnings,
  }
}
