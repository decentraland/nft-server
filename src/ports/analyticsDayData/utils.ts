import { AnalyticsDayData, AnalyticsDayDataFilters } from '@dcl/schemas'
import {
  AnalyticsDayDataFragment,
  AnalyticsTimeframe,
  RentalsAnalyticsDayDataFragment,
} from './types'

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

export function mapAnalyticsFragment(
  fragment: AnalyticsDayDataFragment
): AnalyticsDayData {
  // The data returned from the collections/marketplace subgraphs is identical to the one that will be returned by the nft-server.
  // This means that there is no need to map it, just return the same values.
  return fragment
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

export function getRentalsAnalyticsDayDataQuery({
  from,
}: AnalyticsDayDataFilters) {
  return `
    query AnalyticsDayData {
      analytics: analyticsDayDatas${
        from ? `(where:{date_gt: ${Math.round(from / 1000)}})` : ''
      } {
        id
        date
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
      analytics: analyticsTotalDatas {
        id
        volume
        lessorEarnings
        feeCollectorEarnings
      }
    }
  `
}

export function mapRentalsAnalyticsFragment(
  fragment: RentalsAnalyticsDayDataFragment
): AnalyticsDayData {
  return {
    // Non rentals subgraphs bring this data from an entity with id 'all'
    // In order to merge the data correctly, we need to set the id to 'all' for the rentals subgraph data as well.
    id: fragment.id === 'analytics-total-data' ? 'all' : fragment.id,
    date: fragment.date,
    // Rentals provide rentals numbers, not sales, so we just return 0 for sales.
    sales: 0,
    volume: fragment.volume,
    creatorsEarnings: fragment.lessorEarnings,
    daoEarnings: fragment.feeCollectorEarnings,
  }
}
