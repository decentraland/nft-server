import SQL, { SQLStatement } from 'sql-template-strings'
import {
  NFTCategory,
  Item,
  WearableCategory,
  BodyShape,
  Rarity,
  EmoteCategory,
  Network,
  ChainId,
} from '@dcl/schemas'
import { getCollectionsChainId } from '../../logic/chainIds'
import { FragmentItemType } from '../items/types'
import {
  CatalogFilters,
  CatalogItem,
  CatalogQueryFilters,
  CatalogSortBy,
  CatalogSortDirection,
  CollectionsItemDBResult,
} from './types'
import {
  addQuerySortAndPagination,
  getCollectionsItemsCatalogQuery,
} from './queries'

export const getSubgraphNameForNetwork = (
  network: Network,
  chainId: ChainId
) => {
  return network === Network.ETHEREUM
    ? `collections-ethereum-${
        chainId !== ChainId.ETHEREUM_MAINNET ? 'mainnet' : 'goerli'
      }`
    : `collections-matic-${
        chainId !== ChainId.MATIC_MAINNET ? 'mainnet' : 'mumbai'
      }`
}

export function getOrderBy(
  sortBy: CatalogSortBy | null,
  sortDirection: CatalogSortDirection | null
) {
  const sortByParam = sortBy ?? CatalogSortBy.NEWEST
  const sortDirectionParam = sortDirection ?? CatalogSortDirection.ASC

  let sortByQuery:
    | SQLStatement
    | string = `ORDER BY created_at ${sortDirectionParam}\n`
  switch (sortByParam) {
    case CatalogSortBy.NEWEST:
      sortByQuery = `ORDER BY created_at ${sortDirectionParam}\n`
      break
    case CatalogSortBy.MOST_EXPENSIVE:
      sortByQuery = `ORDER BY max_price ${sortDirectionParam}\n`
      break
    case CatalogSortBy.RECENTLY_LISTED:
      sortByQuery = `ORDER BY created_at ${sortDirectionParam}\n`
      break
    case CatalogSortBy.RECENTLY_SOLD:
      sortByQuery = `ORDER BY sold_at ${sortDirectionParam}\n`
      break
    case CatalogSortBy.CHEAPEST:
      sortByQuery = `ORDER BY min_price ${sortDirectionParam}\n`
      break
  }

  return sortByQuery
}

const getMultiNetworkQuery = (
  schemas: Record<string, string>,
  filters: CatalogQueryFilters
) => {
  const { sortBy, sortDirection, limit, offset, ...restOfFilters } = filters
  const queries = Object.entries(schemas).map(([network, schema]) =>
    getCollectionsItemsCatalogQuery(schema, {
      network: network as Network,
      ...restOfFilters,
    })
  )
  const unionQuery = SQL``
  queries.forEach((query, index) => {
    unionQuery.append(query)
    if (queries[index + 1]) {
      unionQuery.append(SQL`\n UNION ALL \n`)
    }
  })
  addQuerySortAndPagination(unionQuery, filters)
  return unionQuery
}

export const getCatalogQuery = (
  schemas: Record<string, string>,
  filters: CatalogFilters
) => {
  if (Object.values(schemas).length > 1) {
    return getMultiNetworkQuery(schemas, filters)
  }
  return getCollectionsItemsCatalogQuery(Object.values(schemas)[0], filters)
}

export function fromCollectionsItemDbResultToCatalogItem(
  dbItem: CollectionsItemDBResult,
  network?: Network
): CatalogItem {
  let name: string
  let category: NFTCategory
  let data: Item['data']

  switch (dbItem.item_type) {
    case FragmentItemType.WEARABLE_V1:
    case FragmentItemType.WEARABLE_V2:
    case FragmentItemType.SMART_WEARABLE_V1: {
      const {
        name: wearableName,
        body_shapes,
        description,
        rarity,
        category: wearableCategory,
      } = dbItem.metadata
      name = wearableName
      category = NFTCategory.WEARABLE
      data = {
        wearable: {
          description,
          category: wearableCategory as WearableCategory,
          bodyShapes: body_shapes as BodyShape[],
          rarity: rarity as Rarity,
          isSmart: dbItem.item_type === FragmentItemType.SMART_WEARABLE_V1,
        },
      }
      break
    }
    case FragmentItemType.EMOTE_V1: {
      const {
        name: emoteName,
        body_shapes,
        description,
        rarity,
        loop,
        category: emoteCategory,
      } = dbItem.metadata
      ;(name = emoteName), (category = NFTCategory.EMOTE)
      data = {
        emote: {
          description,
          category: emoteCategory as EmoteCategory,
          bodyShapes: body_shapes as BodyShape[],
          rarity: rarity as Rarity,
          loop: !!loop,
        },
      }
      break
    }
    default: {
      throw new Error(`Unknown itemType=${dbItem.item_type}`)
    }
  }

  return {
    id: dbItem.id,
    name,
    thumbnail: dbItem.thumbnail,
    url: `/contracts/${dbItem.collection}/items/${dbItem.blockchain_id}`,
    category,
    contractAddress: dbItem.collection,
    rarity: dbItem.rarity as Rarity,
    available: +dbItem.available,
    isOnSale: dbItem.search_is_store_minter && +dbItem.available > 0,
    creator: dbItem.creator,
    data,
    network: dbItem.network ?? network ?? Network.MATIC,
    chainId: getCollectionsChainId(),
    minPrice: dbItem.min_price,
    maxListingPrice: dbItem.max_listing_price,
    minListingPrice: dbItem.min_listing_price,
    listings: dbItem.listings_count,
  }
}
