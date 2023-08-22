import SQL from 'sql-template-strings'
import {
  NFTCategory,
  Item,
  WearableCategory,
  BodyShape,
  Rarity,
  EmoteCategory,
  Network,
  CatalogFilters,
} from '@dcl/schemas'
import {
  getCollectionsChainId,
  getMarketplaceChainId,
} from '../../logic/chainIds'
import { getSubgraphNameForNetwork } from '../../subgraphUtils'
import { FragmentItemType } from '../items/types'
import {
  CatalogOptions,
  CatalogQueryFilters,
  CollectionsItemDBResult,
} from './types'
import { addQuerySort, getCollectionsItemsCatalogQuery } from './queries'

const getMultiNetworkQuery = (
  schemas: Record<string, string>,
  filters: CatalogQueryFilters
) => {
  const { sortBy, sortDirection, limit, offset, ...restOfFilters } = filters
  const queries = Object.entries(schemas).map(([network, schema]) =>
    getCollectionsItemsCatalogQuery(schema, {
      ...restOfFilters,
      network: network as Network,
    })
  )

  // The following code wraps the UNION query in a subquery so we can get the total count of items before applying the limit and offset
  const unionQuery = SQL`SELECT *, COUNT(*) OVER() as total FROM (\n`
  queries.forEach((query, index) => {
    unionQuery.append(query)
    if (queries[index + 1]) {
      unionQuery.append(SQL`\n UNION ALL \n`)
    }
  })
  unionQuery.append(SQL`\n) as temp \n`)
  addQuerySort(unionQuery, filters)
  if (limit !== undefined && offset !== undefined) {
    unionQuery.append(SQL`LIMIT ${limit} OFFSET ${offset}`)
  }
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
): Item {
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

  const itemNetwork = dbItem.network ?? network ?? Network.MATIC
  return {
    id: dbItem.id,
    beneficiary: dbItem.beneficiary,
    itemId: dbItem.blockchain_id,
    name,
    thumbnail: dbItem.image,
    url: `/contracts/${dbItem.collection}/items/${dbItem.blockchain_id}`,
    category,
    contractAddress: dbItem.collection,
    rarity: dbItem.rarity as Rarity,
    available: +dbItem.available,
    isOnSale: dbItem.search_is_store_minter && +dbItem.available > 0,
    creator: dbItem.creator,
    data,
    network: itemNetwork,
    chainId:
      itemNetwork === Network.ETHEREUM
        ? getMarketplaceChainId()
        : getCollectionsChainId(),
    price: dbItem.price,
    createdAt: Number(dbItem.created_at),
    updatedAt: Number(dbItem.updated_at),
    reviewedAt: Number(dbItem.reviewed_at),
    firstListedAt: Number(dbItem.first_listed_at),
    soldAt: Number(dbItem.sold_at),
    // Catalog fields
    minPrice: dbItem.min_price,
    maxListingPrice: dbItem.max_listing_price,
    minListingPrice: dbItem.min_listing_price,
    listings: Number(dbItem.listings_count),
    owners: Number(dbItem.owners_count),
    urn: dbItem.urn,
  }
}

export const getQuerySources = (filters: CatalogOptions) => {
  const { network, creator } = filters
  const sources = (
    network
      ? [network]
      : creator?.length
      ? [Network.MATIC]
      : [Network.ETHEREUM, Network.MATIC]
  ).reduce((acc, curr) => {
    acc[curr] = getSubgraphNameForNetwork(
      curr,
      curr === Network.ETHEREUM
        ? getMarketplaceChainId()
        : getCollectionsChainId()
    )
    return acc
  }, {} as Record<string, string>)

  return sources
}
