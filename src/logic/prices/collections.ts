import { Network, NFTCategory, NFTFilters } from '@dcl/schemas'
import {
  addEmoteCategoryAndRaritiesFilters,
  addWearableCategoryAndRaritiesFilters,
} from '../../ports/nfts/utils'
import { AssetType, PriceFilters } from '../../ports/prices/types'

const MAX_RESULTS = 1000

const PRICES_ITEMS_FILTERS_DICT: Record<string, string> = {
  wearableCategory: '$wearableCategory: String',
  emoteCategory: '$emoteCategory: String',
  isWearableHead: '$isWearableHead: Boolean',
  isWearableAccessory: '$isWearableAccessory: Boolean',
}

const PRICES_FILTERS_DICT: Record<string, string> = {
  expiresAt: '$expiresAt: BigInt',
  ...PRICES_ITEMS_FILTERS_DICT,
}

export function collectionsShouldFetch(filters: PriceFilters) {
  const isCorrectNetworkFilter =
    !filters.network || !!(filters.network && filters.network === Network.MATIC)
  return (
    [NFTCategory.EMOTE, NFTCategory.WEARABLE].includes(
      filters.category as NFTCategory
    ) && isCorrectNetworkFilter
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

function getExtraWheres(filters: NFTFilters, assetType: AssetType) {
  const where: string[] = []
  if (filters.contractAddresses && filters.contractAddresses.length > 0) {
    const fieldKey =
      assetType === AssetType.ITEM ? 'collection' : 'contractAddress'

    where.push(
      `${fieldKey}_in: [${filters.contractAddresses
        .map((contract) => `"${contract}"`)
        .join(',')}]`
    )
  }
  if (filters.isWearableSmart) {
    where.push('itemType: smart_wearable_v1')
  } else if (filters.category === NFTCategory.EMOTE) {
    where.push('itemType: emote_v1')
  }

  addWearableCategoryAndRaritiesFilters(filters, where)
  addEmoteCategoryAndRaritiesFilters(filters, where)
  return where
}

export function collectionsNFTsPricesQuery(filters: PriceFilters) {
  const additionalWheres: string[] = getExtraWheres(
    {
      ...filters,
      category: filters.category as NFTCategory,
    },
    AssetType.NFT
  )

  const variablesBasedOnFilters = Object.entries(filters)
    .filter(([key, value]) => value !== undefined && key in PRICES_FILTERS_DICT)
    .map(([key]) => (PRICES_FILTERS_DICT[key] ? PRICES_FILTERS_DICT[key] : ''))

  const variablesDefinition = variablesBasedOnFilters.length
    ? `query NFTPrices(${variablesBasedOnFilters.join('\n')})`
    : `query NFTPrices`

  return `
    ${variablesDefinition} {
      prices: nfts (
        first: ${MAX_RESULTS},
        orderBy: id,
        orderDirection: asc, 
        where: { 
          searchOrderPrice_gt: 0, 
          searchOrderStatus: open,
          searchOrderExpiresAt_gt: $expiresAt,
          ${additionalWheres.join('\n')}
        }) {
        ...priceFragment
      }
    }
    ${getNFTPriceFragment()}`
}

export function collectionsNFTsPricesQueryById(filters: PriceFilters) {
  const additionalWheres: string[] = getExtraWheres(
    {
      ...filters,
      category: filters.category as NFTCategory,
    },
    AssetType.NFT
  )
  return `query NFTPrices(
      $lastId: String, 
      ${Object.entries(filters)
        .filter(
          ([key, value]) => value !== undefined && key in PRICES_FILTERS_DICT
        )
        .map(([key]) =>
          PRICES_FILTERS_DICT[key] ? PRICES_FILTERS_DICT[key] : ''
        )
        .join('\n')}
      ) {
      prices: nfts(
        first: ${MAX_RESULTS},
        orderBy: id,
        orderDirection: asc, 
        where: { 
          searchOrderPrice_gt:0,
          searchOrderStatus: open,
          searchOrderExpiresAt_gt: $expiresAt,
          id_gt: $lastId,
          ${additionalWheres.join('\n')}
        }) {
        ...priceFragment
      }
    }
    ${getNFTPriceFragment()}`
}

export function collectionsItemsPricesQuery(filters: PriceFilters) {
  const { category } = filters
  const additionalWheres: string[] = getExtraWheres(
    {
      ...filters,
      category: filters.category as NFTCategory,
    },
    AssetType.ITEM
  )
  const itemType =
    category === NFTCategory.WEARABLE
      ? '[wearable_v1, wearable_v2, smart_wearable_v1]'
      : '[emote_v1]'

  const variablesBasedOnFilters = Object.entries(filters)
    .filter(
      ([key, value]) => value !== undefined && key in PRICES_ITEMS_FILTERS_DICT
    )
    .map(([key]) => (PRICES_FILTERS_DICT[key] ? PRICES_FILTERS_DICT[key] : ''))

  const variablesDefinition = variablesBasedOnFilters.length
    ? `query ItemPrices(${variablesBasedOnFilters.join('\n')})`
    : `query ItemPrices`

  return `
    ${variablesDefinition} {
      prices: items (
        first: ${MAX_RESULTS},
        orderBy: id,
        orderDirection: asc, 
        where: { 
          itemType_in: ${itemType}
          available_gt: 0
          price_gte: 0
          searchIsStoreMinter: true,
          ${additionalWheres.join('\n')}
        }) {
        ...priceFragment
      }
    }
    ${getItemPriceFragment()}`
}

export function collectionsItemsPricesQueryById(filters: PriceFilters) {
  const { category } = filters
  const additionalWheres: string[] = getExtraWheres(
    {
      ...filters,
      category: filters.category as NFTCategory,
    },
    AssetType.ITEM
  )
  const itemType =
    category === NFTCategory.WEARABLE
      ? '[wearable_v1, wearable_v2, smart_wearable_v1]'
      : '[emote_v1]'

  return `query ItemPrices(
    $lastId: String, 
    ${Object.entries(filters)
      .filter(
        ([key, value]) => value !== undefined && key in PRICES_FILTERS_DICT
      )
      .map(([key]) =>
        PRICES_FILTERS_DICT[key] ? PRICES_FILTERS_DICT[key] : ''
      )
      .join('\n')}
    ) {
      prices: items (
        first: ${MAX_RESULTS},
        orderBy: id,
        orderDirection: asc, 
        where: { 
          itemType_in: ${itemType}
          available_gt: 0
          price_gte: 0
          searchIsStoreMinter: true 
          id_gt: $lastId,
          ${additionalWheres.join('\n')}
        }) {
        ...priceFragment
      }
    }
    ${getItemPriceFragment()}`
}
