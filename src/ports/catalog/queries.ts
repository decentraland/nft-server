import SQL, { SQLStatement } from 'sql-template-strings'
import {
  CatalogFilters,
  CatalogSortBy,
  CatalogSortDirection,
  EmoteCategory,
  EmotePlayMode,
  GenderFilterOption,
  NFTCategory,
  WearableCategory,
} from '@dcl/schemas'
import { FragmentItemType } from '../items/types'
import { CatalogQueryFilters } from './types'

const WEARABLE_ITEM_TYPES = [
  FragmentItemType.WEARABLE_V1,
  FragmentItemType.WEARABLE_V2,
  FragmentItemType.SMART_WEARABLE_V1,
]

const MAX_ORDER_TIMESTAMP = 253378408747000 // some orders have a timestmap that can't be cast by Postgres, this is the max possible value

export const getLatestSubgraphSchema = (subgraphName: string) =>
  SQL`
    SELECT 
        entity_schema 
    FROM 
        satsuma.subgraph_schema 
    WHERE 
        satsuma_subgraph_name = ${subgraphName}
    `

export function getOrderBy(filters: CatalogFilters) {
  const { sortBy, sortDirection, onlyListing, isOnSale } = filters
  const sortByParam = sortBy ?? CatalogSortBy.NEWEST
  const sortDirectionParam = sortDirection ?? CatalogSortDirection.DESC

  // // When seeing "Not for sale", the only sort available is the Newest one
  if (isOnSale === false && sortByParam !== CatalogSortBy.NEWEST) {
    return ''
  }

  let sortByQuery:
    | SQLStatement
    | string = `ORDER BY first_listed_at ${sortDirectionParam}\n`
  switch (sortByParam) {
    case CatalogSortBy.NEWEST:
      sortByQuery = `ORDER BY first_listed_at desc NULLS last \n`
      break
    case CatalogSortBy.MOST_EXPENSIVE:
      sortByQuery = `ORDER BY max_price desc \n`
      break
    case CatalogSortBy.RECENTLY_LISTED:
      sortByQuery = onlyListing ? `ORDER BY max_order_created_at desc \n` : ``
      break
    case CatalogSortBy.RECENTLY_SOLD:
      sortByQuery = `ORDER BY sold_at desc \n`
      break
    case CatalogSortBy.CHEAPEST:
      sortByQuery = `ORDER BY min_price asc \n`
      break
  }

  return sortByQuery
}

export const addQuerySortAndPagination = (
  query: SQLStatement,
  filters: CatalogQueryFilters
) => {
  const { sortBy, sortDirection, limit, offset } = filters
  if (sortBy && sortDirection) {
    query.append(getOrderBy(filters))
  }

  if (limit !== undefined && offset !== undefined) {
    query.append(SQL`LIMIT ${limit} OFFSET ${offset}`)
  }
}

export const getCategoryWhere = (filters: CatalogFilters) => {
  const { category, isWearableSmart } = filters
  return category === NFTCategory.WEARABLE
    ? isWearableSmart
      ? SQL`items.item_type = '`
          .append(FragmentItemType.SMART_WEARABLE_V1)
          .append(SQL`'`)
      : SQL`items.item_type IN `.append(
          SQL`
            (`
            .append(
              WEARABLE_ITEM_TYPES.map((itemType) => `'${itemType}'`).join(', ')
            )
            .append(SQL`)`)
        )
    : category === NFTCategory.EMOTE
    ? SQL`items.item_type = '`.append(FragmentItemType.EMOTE_V1).append(SQL`'`)
    : undefined
}

export const getWearableCategoryWhere = (filters: CatalogFilters) => {
  return WearableCategory.validate(filters.wearableCategory)
    ? SQL`metadata_wearable.category = '`
        .append(filters.wearableCategory)
        .append(SQL`'`)
    : undefined
}

export const getEmoteCategoryWhere = (filters: CatalogFilters) => {
  return EmoteCategory.validate(filters.emoteCategory)
    ? SQL`metadata_emote.category = '`
        .append(filters.emoteCategory)
        .append(SQL`'`)
    : undefined
}

export const getEmotePlayModeWhere = (filters: CatalogFilters) => {
  return Array.isArray(filters.emotePlayMode)
    ? filters.emotePlayMode.length === 1
      ? SQL`metadata_emote.loop = ${
          filters.emotePlayMode[0] === EmotePlayMode.LOOP
        }`
      : undefined
    : SQL`metadata_emote.loop = ${filters.emotePlayMode === EmotePlayMode.LOOP}`
}

export const getSearchWhere = (filters: CatalogFilters) => {
  return SQL`items.search_text ILIKE '%' || ${filters.search} || '%'`
}

export const getIsSoldOutWhere = () => {
  return SQL`items.available = 0`
}

export const getIsOnSale = () => {
  return SQL`((search_is_store_minter = true AND available > 0) OR listings_count > 0)`
}

export const getisWearableHeadAccessoryWhere = () => {
  return SQL`items.search_is_wearable_head = true`
}

export const getWearableAccessoryWhere = () => {
  return SQL`items.search_is_wearable_accessory = true`
}

export const getWearableGenderWhere = (filters: CatalogFilters) => {
  const { wearableGenders: genders } = filters
  const parsedGenders = []
  if (genders?.includes(GenderFilterOption.FEMALE)) {
    parsedGenders.push('BaseFemale')
  }
  if (genders?.includes(GenderFilterOption.MALE)) {
    parsedGenders.push('BaseMale')
  }
  return parsedGenders.length
    ? SQL`items.search_wearable_body_shapes @> (${parsedGenders})`
    : undefined
}

export const getCreatorWhere = (filters: CatalogFilters) => {
  return Array.isArray(filters.creator)
    ? SQL`items.creator = ANY(${filters.creator})`
    : SQL`items.creator = ${filters.creator}`
}

export const getRaritiesWhere = (filters: CatalogFilters) => {
  return SQL`items.rarity = ANY(${filters.rarities})`
}

export const getMinPriceWhere = (filters: CatalogFilters) => {
  return SQL`(min_price >= ${filters.minPrice} OR (price >= ${filters.minPrice} AND available > 0))`
}

export const getMaxPriceWhere = (filters: CatalogFilters) => {
  return SQL`(max_price <= ${filters.maxPrice} OR (price <= ${filters.maxPrice} AND available > 0))`
}

export const getContractAddressWhere = (filters: CatalogFilters) => {
  return SQL`items.collection = ANY(${filters.contractAddresses})`
}

export const getOnlyListingsWhere = () => {
  return SQL`(items.search_is_store_minter = false OR (items.search_is_store_minter = true AND available = 0)) AND listings_count > 1`
}

export const getOnlyMintingWhere = () => {
  return SQL`items.search_is_store_minter = true AND available > 0`
}

export const getCollectionsQueryWhere = (filters: CatalogFilters) => {
  const conditions = [
    filters.category ? getCategoryWhere(filters) : undefined,
    filters.rarities?.length ? getRaritiesWhere(filters) : undefined,
    filters.creator?.length ? getCreatorWhere(filters) : undefined,
    filters.isSoldOut ? getIsSoldOutWhere() : undefined,
    filters.isOnSale ? getIsOnSale() : undefined,
    filters.search ? getSearchWhere(filters) : undefined,
    filters.isWearableHead ? getisWearableHeadAccessoryWhere() : undefined,
    filters.isWearableAccessory ? getWearableAccessoryWhere() : undefined,
    filters.wearableCategory ? getWearableCategoryWhere(filters) : undefined,
    filters.wearableGenders?.length
      ? getWearableGenderWhere(filters)
      : undefined,
    filters.emoteCategory ? getEmoteCategoryWhere(filters) : undefined,
    filters.emotePlayMode?.length ? getEmotePlayModeWhere(filters) : undefined,
    filters.contractAddresses?.length
      ? getContractAddressWhere(filters)
      : undefined,
    filters.minPrice ? getMinPriceWhere(filters) : undefined,
    filters.maxPrice ? getMaxPriceWhere(filters) : undefined,
    filters.onlyListing ? getOnlyListingsWhere() : undefined,
    filters.onlyMinting ? getOnlyMintingWhere() : undefined,
  ].filter(Boolean)

  if (!conditions.length) {
    return SQL``
  }

  const result = SQL`WHERE `
  conditions.forEach((condition, index) => {
    if (condition) {
      result.append(condition)
      if (conditions[index + 1]) {
        result.append(SQL` AND `)
      }
    }
  })

  return result.append(` `)
}

export const getCollectionsItemsCatalogQuery = (
  schemaVersion: string,
  filters: CatalogQueryFilters
) => {
  const query = SQL`
            SELECT
              COUNT(*) OVER() as total_rows,
              items.id,
              items.blockchain_id,
              to_json(
                CASE WHEN (
                  items.item_type = 'wearable_v1' OR items.item_type = 'wearable_v2' OR items.item_type = 'smart_wearable_v1') THEN metadata_wearable 
                  ELSE metadata_emote 
                END
              ) as metadata,
              items.image, 
              items.blockchain_id,
              items.collection,
              items.rarity,
              items.item_type::text,
              items.price,
              items.available,
              items.search_is_store_minter,
              items.creator,
              items.beneficiary,
              items.created_at,
              items.updated_at,
              items.reviewed_at,
              items.sold_at,
              ${filters.network} as network,
              items.first_listed_at,
              nfts.min_price AS min_listing_price,
              nfts.max_price AS max_listing_price, 
              nfts.listings_count as listings_count,
              nfts.owners_count as owners_count,
              nfts.max_order_created_at as max_order_created_at,
              CASE
                WHEN items.available > 0 AND items.search_is_store_minter = true THEN LEAST(items.price, nfts.min_price) 
                ELSE nfts.min_price 
              END AS min_price,
              CASE 
                WHEN available > 0 AND items.search_is_store_minter = true THEN GREATEST(items.price, nfts.max_price) 
                ELSE nfts.max_price END
             AS max_price
            FROM `
    .append(schemaVersion)
    .append(
      `.item_active AS items 
            LEFT JOIN (
              SELECT 
                nft.item, 
                COUNT(orders.id) AS listings_count,
                MIN(orders.price) AS min_price,
                MAX(orders.price) AS max_price,
                COUNT(DISTINCT nft.owner) as owners_count,
                MAX(orders.created_at) AS max_order_created_at
              FROM `
    )
    .append(schemaVersion)
    .append(
      `.nft_active AS nft 
                JOIN 
              `
    )
    .append(schemaVersion)
    .append(
      `.order_active AS orders ON orders.nft = nft.id 
              WHERE 
                orders.status = 'open' 
                AND orders.expires_at < `
    )
    .append(MAX_ORDER_TIMESTAMP)
    .append(
      ` 
                AND to_timestamp(orders.expires_at / 100.0) > now() 
                GROUP BY nft.item
              ) AS nfts ON nfts.item = items.id 
              LEFT JOIN (
                SELECT 
                metadata.id, 
                wearable.description, 
                wearable.category, 
                wearable.body_shapes, 
                wearable.rarity, 
                wearable.name
              FROM `
    )
    .append(schemaVersion)
    .append(
      `.wearable_active AS wearable
            JOIN `
    )
    .append(schemaVersion)
    .append(
      `.metadata_active AS metadata ON metadata.wearable = wearable.id
      ) AS metadata_wearable ON metadata_wearable.id = items.metadata AND (items.item_type = 'wearable_v1' OR items.item_type = 'wearable_v2' OR items.item_type = 'smart_wearable_v1')
            LEFT JOIN (
              SELECT 
                metadata.id, 
                emote.description, 
                emote.category, 
                emote.body_shapes, 
                emote.rarity, 
                emote.name, 
                emote.loop
              FROM `
    )
    .append(schemaVersion)
    .append(
      `.emote_active AS emote
            JOIN `
    )
    .append(schemaVersion)
    .append(
      `.metadata_active AS metadata ON metadata.emote = emote.id
            ) AS metadata_emote ON metadata_emote.id = items.metadata AND items.item_type = 'emote_v1' `
    )
    .append(getCollectionsQueryWhere(filters))

  addQuerySortAndPagination(query, filters)
  return query
}
