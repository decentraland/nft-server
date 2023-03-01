import { addLandFilters } from '../nfts/utils'
import { FetchEstateSizesQueryFragment, StatsResourceFilters } from './types'

export const MAX_RESULTS = 1000

export function getEstatesSizesQuery(
  filters: Pick<
    StatsResourceFilters,
    | 'adjacentToRoad'
    | 'maxDistanceToPlaza'
    | 'maxEstateSize'
    | 'minDistanceToPlaza'
    | 'minEstateSize'
    | 'isOnSale'
  >
) {
  const extraWhere = []
  if (filters.isOnSale) {
    extraWhere.push('searchOrderStatus: open')
    extraWhere.push('searchOrderExpiresAt_gt: $expiresAt')
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
