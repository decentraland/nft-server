import BN from 'bn.js'
import {
  getUniqueCollectorsFromCollectorsDayData,
  getUniqueCreatorsFromCreatorsDayData,
  getUniqueItemsFromItemsDayData,
} from '../../logic/rankings'
import {
  RankingsFilters,
  RankingsSortBy,
  ItemsDayDataTimeframe,
  RankingEntity,
  RankingEntityResponse,
  ItemRank,
  CreatorRank,
  CollectorRank,
  RankingFragment,
  ItemsDayDataFragment,
  CollectorsDayDataFragment,
  CreatorsDayDataFragment,
} from './types'

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

function getQueryParams(entity: RankingEntity, filters: RankingsFilters) {
  const { from, category, rarity, sortBy } = filters
  const where: string[] = []

  if (category) {
    where.push(`searchWearableCategory: ${category}`)
  }
  if (entity === RankingEntity.CREATORS) {
    where.push('sales_gt: 0')
  } else if (entity === RankingEntity.COLLECTORS) {
    where.push('purchases_gt: 0')
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
  let orderBy = 'volume'
  let orderDirection = 'desc'
  switch (sortBy) {
    case RankingsSortBy.MOST_SALES:
      if (entity === RankingEntity.COLLECTORS) {
        orderBy = 'purchases'
        orderDirection = 'desc'
      } else if (entity === RankingEntity.CREATORS) {
        orderBy = 'sales'
        orderDirection = 'desc'
      }
      break
    case RankingsSortBy.MOST_VOLUME:
      if (entity === RankingEntity.COLLECTORS) {
        // for accounts the field is "spent"
        orderBy = 'spent'
        orderDirection = 'desc'
      } else if (entity === RankingEntity.CREATORS) {
        // for accounts the field is "earned"
        orderBy = 'earned'
        orderDirection = 'desc'
      }
      break
  }
  return { where, orderBy, orderDirection }
}

export function getRankingQuery(
  entity: RankingEntity,
  filters: RankingsFilters
) {
  switch (entity) {
    case RankingEntity.ITEMS:
      return getItemsDayDataQuery(filters)
    case RankingEntity.CREATORS:
      return getCreatorsDayDataQuery(filters)
    case RankingEntity.COLLECTORS:
      return getCollectorsDayDataQuery(filters)
  }
}

export function consolidateRankingResults(
  entity: RankingEntity,
  fragments: RankingFragment[],
  filters: RankingsFilters
) {
  switch (entity) {
    case RankingEntity.ITEMS:
      return getUniqueItemsFromItemsDayData(
        fragments as ItemsDayDataFragment[],
        filters
      )
    case RankingEntity.CREATORS:
      return getUniqueCreatorsFromCreatorsDayData(
        fragments as CreatorsDayDataFragment[]
      )
    case RankingEntity.COLLECTORS:
      return getUniqueCollectorsFromCollectorsDayData(
        fragments as CollectorsDayDataFragment[]
      )
  }
}

export function getItemsDayDataQuery(filters: RankingsFilters) {
  const { where, orderBy, orderDirection } = getQueryParams(
    RankingEntity.ITEMS,
    filters
  )

  return filters.from === 0
    ? `query ItemsDayTotalData{
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
    : `query ItemsDayData {
        rankings: itemsDayDatas(orderBy: ${orderBy}, 
          orderDirection: ${orderDirection}, 
          where: { ${where.join('\n')} }) {
          ...itemsDayDataFragment
        }
      }
      ${getItemsDayDataFragment()}
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

// Creators
export const getCreatorsDayDataFragment = () => `
  fragment creatorsDayDataFragment on AccountsDayData {
    id
    sales
    earned
    collections
    uniqueCollectorsTotal
  }
`

export const getCreatorsTotalFragment = () => `
  fragment creatorsDayDataFragment on Account {
    id
    sales
    earned
    collections
    uniqueCollectorsTotal
  }
`

export function getCreatorsDayDataQuery(filters: RankingsFilters) {
  const { where, orderBy, orderDirection } = getQueryParams(
    RankingEntity.CREATORS,
    filters
  )

  return filters.from === 0
    ? `query CreatorsTotalDayData{
        rankings: accounts(
          ${filters.first ? `first: ${filters.first}` : ''}
          orderBy: ${orderBy}, 
          orderDirection: ${orderDirection},
          where: { ${where.join('\n')} }) {
            ...creatorsDayDataFragment
        }
      }
      ${getCreatorsTotalFragment()}`
    : `query AccountsDayData {
        rankings: accountsDayDatas(orderBy: ${orderBy}, 
          orderDirection: ${orderDirection}, 
          where: { ${where.join('\n')} }) {
          ...creatorsDayDataFragment
        }
      }
      ${getCreatorsDayDataFragment()}
    `
}

// Collectors
export const getCollectorsDayDataFragment = () => `
  fragment collectorsDayDataFragment on AccountsDayData {
    id
    purchases
    spent
    uniqueAndMythicItems
    creatorsSupportedTotal
  }
`

export const getCollectorsTotalFragment = () => `
  fragment collectorsDayDataFragment on Account {
    id
    purchases
    spent
    uniqueAndMythicItems
    creatorsSupportedTotal
  }
`

export function getCollectorsDayDataQuery(filters: RankingsFilters) {
  const { where, orderBy, orderDirection } = getQueryParams(
    RankingEntity.COLLECTORS,
    filters
  )

  return filters.from === 0
    ? `query CollectorsTotalDayData{
        rankings: accounts(
          ${filters.first ? `first: ${filters.first}` : ''}
          orderBy: ${orderBy}, 
          orderDirection: ${orderDirection},
          where: { ${where.join('\n')} }) {
            ...collectorsDayDataFragment
        }
      }
      ${getCollectorsTotalFragment()}`
    : `query AccountsDayData {
        rankings: accountsDayDatas(orderBy: ${orderBy}, 
          orderDirection: ${orderDirection}, 
          where: { ${where.join('\n')} }) {
          ...collectorsDayDataFragment
        }
      }
      ${getCollectorsDayDataFragment()}
    `
}

export function sortRankResults(
  entity: RankingEntity,
  ranks: RankingEntityResponse[],
  sortBy: RankingsSortBy = RankingsSortBy.MOST_VOLUME
): RankingEntityResponse[] {
  switch (entity) {
    case RankingEntity.ITEMS:
      return (ranks as ItemRank[]).sort((a: ItemRank, b: ItemRank) =>
        sortBy === RankingsSortBy.MOST_SALES
          ? b.sales - a.sales
          : new BN(a.volume).lt(new BN(b.volume))
          ? 1
          : -1
      )
    case RankingEntity.CREATORS:
      return (ranks as CreatorRank[]).sort((a: CreatorRank, b: CreatorRank) =>
        sortBy === RankingsSortBy.MOST_SALES
          ? b.sales - a.sales
          : new BN(a.earned).lt(new BN(b.earned))
          ? 1
          : -1
      )
    case RankingEntity.COLLECTORS:
      return (ranks as CollectorRank[]).sort(
        (a: CollectorRank, b: CollectorRank) =>
          sortBy === RankingsSortBy.MOST_SALES
            ? b.purchases - a.purchases
            : new BN(a.spent).lt(new BN(b.spent))
            ? 1
            : -1
      )
  }
}
