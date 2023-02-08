import { Network, NFTCategory, NFTFilters } from '@dcl/schemas'
import { addWearableCategoryAndRaritiesFilters } from '../../ports/nfts/utils'
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

  addWearableCategoryAndRaritiesFilters(filters, where)
  return where
}

export function marketplacePricesQuery(filters: PriceFilters) {
  const additionalWheres: string[] = getExtraWheres({
    ...filters,
    category: filters.category as NFTCategory,
  })
  const categories = getNFTCategoryFromPriceCategory(filters.category)
  return `query NFTPrices(
      $expiresAt: String
      $wearableCategory: String
      $isWearableHead: Boolean
      $isWearableAccessory: Boolean
      ) {
      prices: nfts(
        first: ${MAX_RESULTS},
        orderBy: tokenId,
        orderDirection: asc, 
        where: { 
          searchOrderPrice_gt:0, 
          searchOrderStatus: open,
          searchOrderExpiresAt_gt: $expiresAt,
          category_in: [${categories}],
          searchEstateSize_gt: 0,
          ${additionalWheres.join('\n')}
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
