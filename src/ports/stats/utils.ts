import { addLandFilters } from '../nfts/utils'
import { FetchEstateSizesQueryFragment, StatsEstateFilters } from './types'

export const MAX_RESULTS = 1000

export function getEstatesSizesQuery(filters: StatsEstateFilters) {
  const extraWhere = []
  let wrapWhere = false

  if (filters.isOnSale) {
    extraWhere.push('searchOrderStatus: open')
    wrapWhere = true
  }
  if (filters.maxPrice) {
    extraWhere.push(`searchOrderPrice_lte: "${filters.maxPrice}"`)
  }

  if (filters.minPrice) {
    extraWhere.push(`searchOrderPrice_gte: "${filters.minPrice}"`)
  }

  addLandFilters(filters, extraWhere)

  let wrappedWhere = `
    category: estate, 
    searchEstateSize_gt:0, 
    id_gt: $lastId, 
    ${extraWhere.join('\n')} 
  `

  if (wrapWhere) {
    wrappedWhere = `
      or:[
        {
          ${wrappedWhere}
          searchOrderExpiresAt_gt: $expiresAtSec
          searchOrderExpiresAt_lt: "1000000000000"
        },
        {
          ${wrappedWhere}
          searchOrderExpiresAt_gt: $expiresAt
        }
      ]`
  }

  const variables = wrapWhere
    ? `$lastId: String, $expiresAt: BigInt, $expiresAtSec: BigInt`
    : `$lastId: String`

  return `
    query EstateSizesQuery(${variables}) {
      nfts (
        first: ${MAX_RESULTS}, 
        where: {
          ${wrappedWhere}
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
