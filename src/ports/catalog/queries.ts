import SQL, { SQLStatement } from 'sql-template-strings'
import {
  CatalogFilters,
  CatalogQueryFilters,
  CatalogSortBy,
  CatalogSortDirection,
} from './types'
import {
  EmoteCategory,
  EmotePlayMode,
  GenderFilterOption,
  NFTCategory,
  WearableCategory,
  WearableGender,
} from '@dcl/schemas'
import { FragmentItemType } from '../items/types'

export const getLatestSubgraphSchema = (subgraphName: string) =>
  SQL`
    SELECT 
        entity_schema 
    FROM 
        satsuma.subgraph_schema 
    WHERE 
        satsuma_subgraph_name = ${subgraphName}
    `

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

export const addQuerySortAndPagination = (
  query: SQLStatement,
  filters: CatalogQueryFilters
) => {
  const { sortBy, sortDirection, limit, offset } = filters
  if (sortBy && sortDirection) {
    query.append(getOrderBy(sortBy, sortDirection)) // VER TODO
  }

  if (limit !== undefined && offset !== undefined) {
    query.append(SQL`LIMIT ${limit} OFFSET ${offset}`)
  }
}

export const getCategoryWhere = (
  category: NFTCategory,
  isWearableSmart?: boolean
) => {
  return category === NFTCategory.WEARABLE
    ? isWearableSmart
      ? SQL`items.item_type = '`
          .append(FragmentItemType.SMART_WEARABLE_V1)
          .append(SQL`'`)
      : SQL`(items.item_type = '`
          .append(FragmentItemType.WEARABLE_V1)
          .append(SQL`' OR items.item_type = '`)
          .append(FragmentItemType.WEARABLE_V2)
          .append(SQL`' OR items.item_type = '`)
          .append(FragmentItemType.SMART_WEARABLE_V1)
          .append(SQL`')`)
    : category === NFTCategory.EMOTE
    ? SQL`items.item_type = '`.append(FragmentItemType.EMOTE_V1).append(SQL`'`)
    : SQL``
}

export const getWearableCategoryWhere = (
  wearableCategory: WearableCategory
) => {
  return WearableCategory.validate(wearableCategory)
    ? SQL`metadata_wearable.category = '`
        .append(wearableCategory)
        .append(SQL`'`)
    : SQL``
}

export const getEmoteCategoryWhere = (emoteCategory: EmoteCategory) => {
  return EmoteCategory.validate(emoteCategory)
    ? SQL`metadata_emote.category = '`.append(emoteCategory).append(SQL`'`)
    : SQL``
}

export const getEmotePlayModeWhere = (
  emotePlayMode: EmotePlayMode | EmotePlayMode[]
) => {
  return Array.isArray(emotePlayMode)
    ? emotePlayMode.length === 1
      ? SQL`metadata_emote.loop = ${emotePlayMode[0] === EmotePlayMode.LOOP}`
      : SQL``
    : SQL`metadata_emote.loop = ${emotePlayMode === EmotePlayMode.LOOP}`
}

export const getisWearableHeadAccessoryWhere = () => {
  return SQL`items.search_is_wearable_head = true`
}

export const getWearableAccessoryWhere = () => {
  return SQL`items.search_is_wearable_accessory = true`
}

export const getWearableGenderWhere = (
  genders: (WearableGender | GenderFilterOption)[]
) => {
  const parsedGenders = []
  if (genders.includes(GenderFilterOption.FEMALE)) {
    parsedGenders.push('BaseFemale')
  }
  if (genders.includes(GenderFilterOption.MALE)) {
    parsedGenders.push('BaseMale')
  }
  return SQL`items.search_wearable_body_shapes @> (${parsedGenders})`
}

export const getCreatorWhere = (creator: string | string[]) => {
  return Array.isArray(creator)
    ? SQL`items.creator = ANY(${creator})`
    : SQL`items.creator = ${creator}`
}

export const getRaritiesWhere = (rarities: string[]) => {
  return SQL`items.rarity = ANY(${rarities})`
}

export const getMinPriceWhere = (minPrice: string) => {
  return SQL`(min_price >= ${minPrice} OR (price >= ${minPrice} AND available > 0))`
}

export const getMaxPriceWhere = (maxPrice: string) => {
  return SQL`(max_price <= ${maxPrice} OR (price <= ${maxPrice} AND available > 0))`
}

export const getCollectionsQueryWheres = (filters: CatalogFilters) => {
  const conditions = [
    filters.category
      ? getCategoryWhere(filters.category, filters.isWearableSmart)
      : undefined,
    filters.creator?.length ? getCreatorWhere(filters.creator) : undefined,
    filters.isSoldOut ? SQL`items.available = 0` : undefined,
    filters.isOnSale ? SQL`items.search_is_store_minter = true` : undefined,
    filters.search
      ? SQL`items.search_text ILIKE '%' || ${filters.search} || '%'`
      : undefined,
    filters.isWearableHead ? getisWearableHeadAccessoryWhere() : undefined,
    filters.isWearableAccessory ? getWearableAccessoryWhere() : undefined,
    filters.wearableCategory
      ? getWearableCategoryWhere(filters.wearableCategory)
      : undefined,
    filters.rarities?.length ? getRaritiesWhere(filters.rarities) : undefined,
    filters.wearableGenders?.length
      ? getWearableGenderWhere(filters.wearableGenders)
      : undefined,

    filters.emoteCategory
      ? getEmoteCategoryWhere(filters.emoteCategory)
      : undefined,

    filters.emotePlayMode?.length
      ? getEmotePlayModeWhere(filters.emotePlayMode)
      : undefined,
    filters.contractAddresses?.length
      ? SQL`items.collection = ANY(${filters.contractAddresses})`
      : undefined,

    filters.minPrice ? getMinPriceWhere(filters.minPrice) : undefined,
    filters.maxPrice ? getMaxPriceWhere(filters.maxPrice) : undefined,
    filters.onlyListing
      ? SQL`items.search_is_store_minter = false AND listings_count > 1`
      : undefined,
    filters.onlyMinting
      ? SQL`items.search_is_store_minter = true AND available > 0`
      : undefined,
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
              items.id, 
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
              CASE
                WHEN items.available > 0 THEN LEAST(items.price, nfts.min_price) 
                ELSE nfts.min_price 
              END AS min_price,
              CASE 
                WHEN available > 0 THEN GREATEST(items.price, nfts.max_price) 
                ELSE nfts.max_price END
             AS max_price
            FROM `
    .append(schemaVersion)
    .append(
      `.item AS items 
            LEFT JOIN (
              SELECT 
                nft.item, 
                COUNT(orders.id) AS listings_count,
                MIN(orders.price) AS min_price,
                MAX(orders.price) AS max_price
              FROM `
    )
    .append(schemaVersion)
    .append(
      `.nft AS nft 
                JOIN 
              `
    )
    .append(schemaVersion)
    .append(
      `.order AS orders ON orders.nft = nft.id 
              WHERE 
                orders.status = 'open' 
                AND orders.expires_at < 253378408747000 
                AND to_timestamp(orders.expires_at / 1000.0) > now() 
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
      `.wearable AS wearable
            JOIN `
    )
    .append(schemaVersion)
    .append(
      `.metadata AS metadata ON metadata.wearable = wearable.id
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
      `.emote AS emote
            JOIN `
    )
    .append(schemaVersion)
    .append(
      `.metadata AS metadata ON metadata.emote = emote.id
            ) AS metadata_emote ON metadata_emote.id = items.metadata AND items.item_type = 'emote_v1' `
    )
    .append(getCollectionsQueryWheres(filters))

  addQuerySortAndPagination(query, filters)
  return query
}
