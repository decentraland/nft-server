import { FetchEstateSizesQueryFragment } from './types'

export const MAX_RESULTS = 1000

export function getEstatesSizesQuery(isOnSale?: boolean) {
  const extraWhere = []
  if (isOnSale) {
    extraWhere.push('searchOrderStatus: open')
    extraWhere.push('searchOrderExpiresAt_gt: $expiresAt')
  }
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
