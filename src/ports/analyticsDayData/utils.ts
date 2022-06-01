import { AnalyticsDayDataFilters } from '@dcl/schemas'
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

function getDateXDaysAgo(numOfDays: number, date = new Date()) {
  const daysAgo = new Date(date.getTime())

  daysAgo.setDate(date.getDate() - numOfDays)

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
