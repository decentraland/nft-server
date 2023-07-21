import {
  Network,
  NFTCategory,
  NFTFilters,
  WearableCategory,
} from '@dcl/schemas'
import {
  addLandFilters,
  addWearableCategoryAndRaritiesFilters,
} from '../../ports/nfts/utils'
import {
  PriceFilterCategory,
  PriceFilterExtraOption,
  PriceFilters,
} from '../../ports/prices/types'

const MAX_RESULTS = 1000

export function marketplaceShouldFetch(filters: PriceFilters) {
  const isCorrectNetworkFilter =
    !filters.network ||
    !!(filters.network && filters.network === Network.ETHEREUM)
  const isWearableSmartFilter = filters.isWearableSmart
  return (
    [
      PriceFilterExtraOption.LAND,
      NFTCategory.PARCEL,
      NFTCategory.ESTATE,
      NFTCategory.WEARABLE,
      NFTCategory.ENS,
    ].includes(filters.category) &&
    isCorrectNetworkFilter &&
    !isWearableSmartFilter
  )
}

export const getPriceFragment = () => `
  fragment priceFragment on NFT {
    price: searchOrderPrice
    id: tokenId
  }
`

export const getNFTCategoryFromPriceCategory = (
  category: PriceFilterCategory
) => {
  switch (category) {
    case PriceFilterExtraOption.LAND:
      return [NFTCategory.PARCEL, NFTCategory.ESTATE]
    default:
      return [category]
  }
}

export const getMarketplacePriceFiltersValidation = (filters: PriceFilters) => {
  const { wearableCategory } = filters
  // There aren't any HANDS_WEAR wearables in the marketplace subgraph as its only available
  // for new versions of wearables. If the wearableCategory filter is hands_wear we shouldn't
  // fetch marketplace graph
  return wearableCategory !== WearableCategory.HANDS_WEAR
}

export function getMarketplacePricesQuery(id: string) {
  return id ? marketplacePricesQueryById : marketplacePricesQuery
}

function getExtraWheres(filters: NFTFilters) {
  const where: string[] = []
  if (filters.contractAddresses && filters.contractAddresses.length > 0) {
    where.push(
      `contractAddress_in: [${filters.contractAddresses
        .map((contract) => `"${contract}"`)
        .join(', ')}]`
    )
  }
  if (filters.isWearableSmart) {
    where.push('itemType: smart_wearable_v1')
  }

  addLandFilters(filters, where)
  addWearableCategoryAndRaritiesFilters(filters, where)
  return where
}

export function marketplacePricesQuery(filters: PriceFilters) {
  const additionalWheres: string[] = getExtraWheres({
    ...filters,
    category: filters.category as NFTCategory,
  })
  const categories = getNFTCategoryFromPriceCategory(filters.category)

  const innerWhere = `
    searchOrderPrice_gt:0, 
    searchOrderStatus: open,
    category_in: [${categories}],
    searchEstateSize_gt: 0,
    ${additionalWheres.join('\n')}
  `
  return `query NFTPrices(
      $expiresAt: String
      $expiresAtSec: String
      $wearableCategory: String
      $isWearableHead: Boolean
      $isWearableAccessory: Boolean
      ) {
      prices: nfts(
        first: ${MAX_RESULTS},
        orderBy: tokenId,
        orderDirection: asc, 
        where: {
          or:[
            {
              ${innerWhere}
              searchOrderExpiresAt_gt: $expiresAtSec
              searchOrderExpiresAt_lt: "1000000000000"
            },
            {
              ${innerWhere}
              searchOrderExpiresAt_gt: $expiresAt
            }
          ]
        }) {
        ...priceFragment
      }
    }
    ${getPriceFragment()}`
}

export function marketplacePricesQueryById(filters: PriceFilters) {
  const { category, ...rest } = filters
  const additionalWheres: string[] = getExtraWheres(rest)
  const categories = getNFTCategoryFromPriceCategory(category)
  return `query NFTPrices(
      $lastId: ID,
      $expiresAt: String
      $wearableCategory: String
      $isWearableHead: Boolean
      $isWearableAccessory: Boolean
     ) {
      prices: nfts(
        orderBy: tokenId,
        orderDirection: asc, 
        first: ${MAX_RESULTS},
        where: { 
          searchOrderPrice_gt:0,
          searchOrderStatus: open,
          searchOrderExpiresAt_gt: $expiresAt,
          category_in: [${categories}],
          tokenId_gt: $lastId,
          searchEstateSize_gt:0,
          ${additionalWheres.join('\n')}
        }) {
        ...priceFragment
      }
    }
    ${getPriceFragment()}`
}
