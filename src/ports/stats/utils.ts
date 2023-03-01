import { addLandFilters } from '../nfts/utils'
import { FetchEstateSizesQueryFragment, StatsEstateFilters } from './types'

export const MAX_RESULTS = 1000

export function getEstatesSizesQuery(filters: StatsEstateFilters) {
  const extraWhere = []
  if (filters.isOnSale) {
    extraWhere.push('searchOrderStatus: open')
    extraWhere.push('searchOrderExpiresAt_gt: $expiresAt')
  }
  if (filters.maxPrice) {
    extraWhere.push(`searchOrderPrice_lte: "${filters.maxPrice}"`)
  }

  if (filters.minPrice) {
    extraWhere.push(`searchOrderPrice_gte: "${filters.minPrice}"`)
  }
  addLandFilters(filters, extraWhere)
  return `
    query EstateSizesQuery($lastId: ID, $expiresAt: String ) {
      nfts (
        first: ${MAX_RESULTS}, 
        where: { 
          category: estate, 
          searchEstateSize_gt:0, 
          id_gt: $lastId, 
          ${extraWhere.join('\n')} 
        }, 
        orderBy: id, 
        orderDirection: asc) 
      {
        id
        searchEstateSize
      }
    }
  `
}

export function consolidateSizes(estateSizes: FetchEstateSizesQueryFragment[]) {
  return estateSizes.reduce((acc, { searchEstateSize }) => {
    acc[searchEstateSize] = acc[searchEstateSize]
      ? acc[searchEstateSize] + 1
      : 1
    return acc
  }, {} as Record<string, number>)
}
