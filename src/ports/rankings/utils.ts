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

export const MAX_RESULTS = 1000

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

  if (entity === RankingEntity.WEARABLES) {
    where.push('searchEmoteCategory: null')
  } else if (entity === RankingEntity.EMOTES) {
    where.push('searchWearableCategory: null')
  }

  if (category) {
    where.push(
      entity === RankingEntity.WEARABLES
        ? `searchWearableCategory: ${category}`
        : `searchEmoteCategory: ${category}`
    )
  }
  if (entity === RankingEntity.CREATORS) {
    where.push('sales_gt: 0')
    if (from === 0) {
      where.push('collections_gt: 0')
    }
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
    where.push(`date_gte: ${Math.round(from / 1000)}`)
  }
  let orderBy = 'volume'
  let orderDirection = 'desc'
  switch (sortBy) {
    case RankingsSortBy.MOST_SALES:
      if (entity === RankingEntity.COLLECTORS) {
        orderBy = 'purchases'
        orderDirection = 'desc'
      } else if (from === 0 && entity === RankingEntity.CREATORS) {
        orderBy = 'primarySales'
        orderDirection = 'desc'
      } else {
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
        orderBy = from === 0 ? 'primarySalesEarned' : 'earned'
        orderDirection = 'desc'
      }
      break
  }
  return { where, orderBy, orderDirection }
}

export function getRankingQuery(
  entity: RankingEntity,
  filters: RankingsFilters,
  page = 0
) {
  switch (entity) {
    case RankingEntity.WEARABLES:
      return getItemsDayDataQuery(RankingEntity.WEARABLES, filters, page)
    case RankingEntity.EMOTES:
      return getItemsDayDataQuery(RankingEntity.EMOTES, filters, page)
    case RankingEntity.CREATORS:
      return getCreatorsDayDataQuery(filters, page)
    case RankingEntity.COLLECTORS:
      return getCollectorsDayDataQuery(filters, page)
  }
}

export function consolidateRankingResults(
  entity: RankingEntity,
  fragments: RankingFragment[],
  filters: RankingsFilters
) {
  switch (entity) {
    case RankingEntity.WEARABLES:
    case RankingEntity.EMOTES:
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

export function getItemsDayDataQuery(
  entity: RankingEntity,
  filters: RankingsFilters,
  page = 0
) {
  const { where, orderBy, orderDirection } = getQueryParams(entity, filters)

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
          first: ${MAX_RESULTS},
          skip: ${MAX_RESULTS * page}
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
    uniqueCollectionsSales
    uniqueCollectorsTotal
  }
`

export const getCreatorsTotalFragment = () => `
  fragment creatorsDayDataFragment on Account {
    id
    sales: primarySales
    earned: primarySalesEarned
    uniqueCollectionsSales: collections
    uniqueCollectorsTotal
  }
`

export function getCreatorsDayDataQuery(filters: RankingsFilters, page = 0) {
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
          first: ${MAX_RESULTS},
          skip: ${MAX_RESULTS * page}
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

export function getCollectorsDayDataQuery(filters: RankingsFilters, page = 0) {
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
          first: ${MAX_RESULTS},
          skip: ${MAX_RESULTS * page}
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
    case RankingEntity.EMOTES:
    case RankingEntity.WEARABLES:
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
