import { NFTCategory } from '@dcl/schemas'
import { AssetType, PriceFilters } from '../../ports/prices/types'

const MAX_RESULTS = 1000

export function collectionsShouldFetch(filters: PriceFilters) {
  return [NFTCategory.EMOTE, NFTCategory.WEARABLE].includes(
    filters.category as NFTCategory
  )
}

export const getNFTPriceFragment = () => `
  fragment priceFragment on NFT {
    price: searchOrderPrice
    id
  }
`
export const getItemPriceFragment = () => `
  fragment priceFragment on Item {
    price
    id
  }
`

export function getCollectionPricesQuery(id: string, filters: PriceFilters) {
  const { assetType } = filters
  return id
    ? assetType === AssetType.ITEM
      ? collectionsItemsPricesQueryById
      : collectionsNFTsPricesQueryById
    : assetType === AssetType.ITEM
    ? collectionsItemsPricesQuery
    : collectionsNFTsPricesQuery
}

export function collectionsNFTsPricesQuery(filters: PriceFilters) {
  const { category } = filters
  return `query NFTPrices($expiresAt: String) {
      prices: nfts (
        first: ${MAX_RESULTS},
        orderBy: id,
        orderDirection: asc, 
        where: { 
          searchOrderPrice_gt: 0, 
          searchOrderStatus: open,
          searchOrderExpiresAt_gt: $expiresAt,
          category_in: ["${category}"]
        }) {
        ...priceFragment
      }
    }
    ${getNFTPriceFragment()}`
}

export function collectionsNFTsPricesQueryById(filters: PriceFilters) {
  const { category } = filters
  return `query NFTPrices($lastId: ID, $expiresAt: String) {
      prices: nfts(
        first: ${MAX_RESULTS},
        orderBy: id,
        orderDirection: asc, 
        where: { 
          searchOrderPrice_gt:0,
          searchOrderStatus: open,
          searchOrderExpiresAt_gt: $expiresAt,
           category_in: ["${category}"], 
           id_gt: $lastId 
        }) {
        ...priceFragment
      }
    }
    ${getNFTPriceFragment()}`
}

export function collectionsItemsPricesQuery(filters: PriceFilters) {
  const { category } = filters
  const itemType =
    category === NFTCategory.WEARABLE
      ? '[wearable_v1, wearable_v2, smart_wearable_v1]'
      : '[emote_v1]'

  return `query ItemPrices {
      prices: items (
        first: ${MAX_RESULTS},
        orderBy: id,
        orderDirection: asc, 
        where: { 
          itemType_in: ${itemType}
          available_gt: 0
          price_gte: 0
          searchIsStoreMinter: true 
        }) {
        ...priceFragment
      }
    }
    ${getItemPriceFragment()}`
}

export function collectionsItemsPricesQueryById(filters: PriceFilters) {
  const { category } = filters
  const itemType =
    category === NFTCategory.WEARABLE
      ? '[wearable_v1, wearable_v2, smart_wearable_v1]'
      : '[emote_v1]'

  return `query ItemPrices($lastId: ID) {
      prices: items (
        first: ${MAX_RESULTS},
        orderBy: id,
        orderDirection: asc, 
        where: { 
          itemType_in: ${itemType}
          available_gt: 0
          price_gte: 0
          searchIsStoreMinter: true 
          id_gt: $lastId 
        }) {
        ...priceFragment
      }
    }
    ${getItemPriceFragment()}`
}
