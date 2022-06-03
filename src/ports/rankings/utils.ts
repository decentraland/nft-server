import { RankingsFilters, RankingsSortBy, ItemsDayDataTimeframe } from './types'

export const getItemsDayDataFragment = () => `
  fragment itemsDayDataFragment on ItemsDayData {
    id
    sales
    volume
  }
`

export const getItemsTotalFragment = () => `
  fragment itemsDayDataFragment on Item {
    id
    sales
    volume
  }
`

function getQueryParams(filters: RankingsFilters) {
  const { from, category, rarity, sortBy } = filters
  const where: string[] = []

  if (category) {
    where.push(`searchWearableCategory: ${category}`)
  }
  if (rarity) {
    if (from === 0) {
      // if it fetches the Item entity
      where.push(`rarity: "${rarity}"`)
    } else {
      where.push(`searchRarity: "${rarity}"`)
    }
  }
  if (from) {
    where.push(`date_gt: ${Math.round(from / 1000)}`)
  }

  let orderBy: string
  let orderDirection: string
  switch (sortBy) {
    case RankingsSortBy.MOST_SALES:
      orderBy = 'sales'
      orderDirection = 'desc'
      break
    case RankingsSortBy.MOST_VOLUME:
      orderBy = 'volume'
      orderDirection = 'desc'
      break
    default:
      orderBy = 'volume'
      orderDirection = 'desc'
  }
  return { where, orderBy, orderDirection }
}

export function getItemsDayDataQuery(filters: RankingsFilters) {
  const { where, orderBy, orderDirection } = getQueryParams(filters)

  return `
    query ItemsDayData {
      rankings: itemsDayDatas(orderBy: ${orderBy}, 
        orderDirection: ${orderDirection}, 
        where: { ${where.join('\n')} }) {
        ...itemsDayDataFragment
      }
    }
    ${getItemsDayDataFragment()}
  `
}

export function getItemsDayDataTotalQuery(filters: RankingsFilters) {
  console.log('filters: ', filters)
  const { where, orderBy, orderDirection } = getQueryParams(filters)
  return `
    query ItemsDayTotalData{
      rankings: items(
        ${filters.first ? `first: ${filters.first}` : ''}
        orderBy: ${orderBy}, 
        orderDirection: ${orderDirection},
        where: { ${where.join('\n')} }) {
          ...itemsDayDataFragment
      }
    }
    ${getItemsTotalFragment()}
  `
}

export function getDateXDaysAgo(numOfDays: number, date = new Date()) {
  const daysAgo = new Date(date.getTime())

  daysAgo.setDate(date.getDate() - numOfDays)

  return daysAgo
}

export function getTimestampFromTimeframe(timeframe: ItemsDayDataTimeframe) {
  switch (timeframe) {
    case ItemsDayDataTimeframe.DAY:
      return getDateXDaysAgo(1).getTime()
    case ItemsDayDataTimeframe.WEEK:
      return getDateXDaysAgo(7).getTime()
    case ItemsDayDataTimeframe.MONTH:
      return getDateXDaysAgo(30).getTime()
    case ItemsDayDataTimeframe.ALL:
      return 0
    default:
      return 0
  }
}
