import { NFTCategory } from '@dcl/schemas'
import {
  PriceFilterCategory,
  PriceFilterExtraOption,
  PriceFilters,
} from '../../ports/prices/types'

const MAX_RESULTS = 1000

export function marketplaceShouldFetch(filters: PriceFilters) {
  return [
    PriceFilterExtraOption.LAND,
    NFTCategory.PARCEL,
    NFTCategory.ESTATE,
    NFTCategory.WEARABLE,
    NFTCategory.ENS,
  ].includes(filters.category)
}

export const getPriceFragment = () => `
  fragment priceFragment on NFT {
    price: searchOrderPrice
    id: tokenId
    name
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

export function marketplacePricesQuery(filters: PriceFilters) {
  const { category } = filters
  const categories = getNFTCategoryFromPriceCategory(category)
  return `query NFTPrices($expiresAt: String) {
      prices: nfts(
        first: ${MAX_RESULTS},
        orderBy: tokenId,
        orderDirection: asc, 
        where: { 
          searchOrderPrice_gt:0, 
          searchOrderStatus: open,
          searchOrderExpiresAt_gt: $expiresAt,
          category_in: [${categories}],
          searchEstateSize_gt: 0
        }) {
        ...priceFragment
      }
    }
    ${getPriceFragment()}`
}

export function marketplacePricesQueryById(filters: PriceFilters) {
  const { category } = filters
  const categories = getNFTCategoryFromPriceCategory(category)
  return `query NFTPrices($lastId: ID, $expiresAt: String) {
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
          searchEstateSize_gt:0
        }) {
        ...priceFragment
      }
    }
    ${getPriceFragment()}`
}
