import BN from 'bn.js'
import {
  ChainId,
  EmotePlayMode,
  Item,
  ItemFilters,
  ItemSortBy,
  Network,
  NFTCategory,
} from '@dcl/schemas'
import { ItemFragment, FragmentItemType } from './types'
import { isAddressZero } from '../../logic/address'
import { getGenderFilterQuery } from '../utils'
import { SortDirection } from '../merger/types'

export const ITEM_DEFAULT_SORT_BY = ItemSortBy.NEWEST

// Comparing strings instead of huge numbers because JavaScript is not that accurate when operating them
const MAX_ITEM_PRICE =
  '115792089237316195423570985008687907853269984665640564039457584007913129639935'

export function fromItemFragment(
  fragment: ItemFragment,
  network: Network,
  chainId: ChainId
): Item {
  let name: string
  let category: NFTCategory
  let data: Item['data']

  switch (fragment.itemType) {
    case FragmentItemType.WEARABLE_V1:
    case FragmentItemType.WEARABLE_V2:
    case FragmentItemType.SMART_WEARABLE_V1: {
      name = fragment.metadata.wearable!.name
      category = NFTCategory.WEARABLE
      data = {
        wearable: {
          description: fragment.metadata.wearable!.description,
          category: fragment.metadata.wearable!.category,
          bodyShapes: fragment.searchWearableBodyShapes!,
          rarity: fragment.rarity,
          isSmart: fragment.itemType === FragmentItemType.SMART_WEARABLE_V1,
        },
      }
      break
    }
    case FragmentItemType.EMOTE_V1: {
      name = fragment.metadata.emote!.name
      category = NFTCategory.EMOTE
      data = {
        emote: {
          description: fragment.metadata.emote!.description,
          category: fragment.metadata.emote!.category,
          bodyShapes: fragment.searchEmoteBodyShapes!,
          rarity: fragment.rarity,
          loop: fragment.metadata.emote!.loop,
        },
      }
      break
    }
    default: {
      throw new Error(`Unknown itemType=${fragment.itemType}`)
    }
  }

  const item: Item = {
    id: fragment.id,
    name,
    thumbnail: fragment.image,
    url: `/contracts/${fragment.collection.id}/items/${fragment.blockchainId}`,
    category,
    contractAddress: fragment.collection.id,
    itemId: fragment.blockchainId,
    beneficiary: !isAddressZero(fragment.beneficiary)
      ? fragment.beneficiary
      : null,
    rarity: fragment.rarity,
    price: MAX_ITEM_PRICE === fragment.price ? '0' : fragment.price,
    available: +fragment.available,
    isOnSale: isFragmentOnSale(fragment),
    creator: fragment.collection.creator,
    data,
    network,
    chainId,
    createdAt: +fragment.createdAt * 1000,
    updatedAt: +fragment.updatedAt * 1000,
    reviewedAt: +fragment.reviewedAt * 1000,
    soldAt: +fragment.soldAt * 1000,
    firstListedAt: fragment.firstListedAt
      ? +fragment.firstListedAt * 1000
      : null,
  }

  return item
}

export const getItemFragment = () => `
  fragment itemFragment on Item {
    id
    price
    blockchainId
    image
    rarity
    available
    itemType
    collection {
      id
      creator
    }
    metadata {
      wearable {
        name
        description
        category
      }
      emote {
        name
        description
        category
        loop
      }
    }
    searchWearableBodyShapes
    searchEmoteBodyShapes
    searchIsStoreMinter
    beneficiary
    createdAt
    updatedAt
    reviewedAt
    soldAt
    firstListedAt
  }
`

export function getItemsQuery(filters: ItemFilters, isCount = false) {
  const {
    first,
    skip,
    sortBy,
    creator,
    category,
    rarities,
    isSoldOut,
    isOnSale,
    search,
    isWearableHead,
    isWearableAccessory,
    isWearableSmart,
    wearableCategory,
    wearableGenders,
    emoteCategory,
    emoteGenders,
    ids,
    contractAddresses,
    itemId,
    minPrice,
    maxPrice,
    emotePlayMode,
    urns,
  } = filters

  const where: string[] = [`searchIsCollectionApproved: true`]

  switch (category) {
    case NFTCategory.WEARABLE: {
      if (!isWearableSmart) {
        where.push(`itemType_in: [wearable_v1, wearable_v2, smart_wearable_v1]`)
      }
      break
    }
    case NFTCategory.EMOTE: {
      where.push(`itemType: emote_v1`)
    }
  }

  if (creator) {
    const creators = Array.isArray(creator) ? creator : [creator]
    if (creators.length > 0) {
      where.push(
        `creator_in: [${creators.map((address) => `"${address}"`).join(',')}]`
      )
    }
  }

  const minSaleValue = getMinSaleValueInWei()

  if (isOnSale && isSoldOut) {
    throw new Error(
      `You can't use "isOnSale" and "isSoldOut" at the same time.`
    )
  } else if (isOnSale) {
    where.push('available_gt: 0')
    if (minSaleValue) {
      where.push(`price_gte: ${minSaleValue}`)
    }
  } else if (isSoldOut) {
    where.push('available: 0')
  } else if (sortBy === ItemSortBy.CHEAPEST) {
    where.push('available_gt: 0')
    if (minSaleValue) {
      where.push(`price_gte: ${minSaleValue}`)
    }
  }

  if (search) {
    where.push(`searchText_contains: "${search.trim().toLowerCase()}"`)
  }

  if (maxPrice) {
    where.push(`price_lte: "${maxPrice}"`)
  }

  if (minPrice) {
    where.push(`price_gte: "${minPrice}"`)
  }

  if (ids && ids.length > 0) {
    where.push(
      `id_in: [${ids
        .map((id) => `"${id}"`)
        .join(',')}]`
    )
  }

  if (contractAddresses && contractAddresses.length > 0) {
    where.push(
      `collection_in: [${contractAddresses
        .map((contractAddress) => `"${contractAddress}"`)
        .join(',')}]`
    )
  }

  if (itemId) {
    where.push(`blockchainId: "${itemId}"`)
  }

  if (urns && urns.length > 0) {
    where.push(`urn_in: [${urns.map((urn) => `"${urn}"`).join(',')}]`)
  }

  if (isOnSale) {
    where.push(`searchIsStoreMinter: true`)
  }

  if (sortBy === ItemSortBy.RECENTLY_SOLD) {
    where.push('soldAt_not: null')
  }

  if (!category || category === NFTCategory.WEARABLE) {
    if (wearableCategory) {
      where.push(`searchWearableCategory: ${wearableCategory}`)
    }

    if (isWearableHead) {
      where.push('searchIsWearableHead: true')
    }

    if (isWearableAccessory) {
      where.push('searchIsWearableAccessory: true')
    }

    if (wearableGenders && wearableGenders.length > 0) {
      const genderQuery = getGenderFilterQuery(wearableGenders, false)
      if (genderQuery) {
        where.push(genderQuery)
      }
    }

    if (isWearableSmart) {
      where.push(`itemType: smart_wearable_v1`)
    }

    if (rarities && rarities.length > 0) {
      where.push(
        `searchWearableRarity_in: [${rarities
          .map((rarity) => `"${rarity}"`)
          .join(',')}]`
      )
    }
  }

  if (!category || category === NFTCategory.EMOTE) {
    if (emoteCategory) {
      where.push(`searchEmoteCategory: ${emoteCategory}`)
    }

    if (emoteGenders && emoteGenders.length > 0) {
      const genderQuery = getGenderFilterQuery(emoteGenders, true)
      if (genderQuery) {
        where.push(genderQuery)
      }
    }

    /**
     * If emotePlayMode length is more than 1 we are ignoring the filter. This is done like this because
     * we are now saving the playMode as a boolean in the graph (loop), so 2 properties means we want all items
     * This should change when we add more play mode types.
     */
    if (emotePlayMode && emotePlayMode.length === 1) {
      where.push(`searchEmoteLoop: ${emotePlayMode[0] === EmotePlayMode.LOOP}`)
    }

    if (rarities && rarities.length > 0) {
      where.push(
        `searchEmoteRarity_in: [${rarities
          .map((rarity) => `"${rarity}"`)
          .join(',')}]`
      )
    }
  }

  // Sorting by a nullable field will return null values first.
  // We do not want them so we filter them out.
  if (sortBy === ItemSortBy.RECENTLY_LISTED) {
    where.push('firstListedAt_not: null')
  }

  // Compute total nfts to query. If there's a "skip" we add it to the total, since we need all the prior results to later merge them in a single page. If nothing is provided we default to the max. When counting we also use the max.
  const max = 1000
  const total = isCount
    ? max
    : typeof first !== 'undefined'
    ? typeof skip !== 'undefined'
      ? skip + first
      : first
    : max

  let orderBy: string
  let orderDirection: string
  switch (sortBy || ITEM_DEFAULT_SORT_BY) {
    case ItemSortBy.NEWEST:
      orderBy = 'createdAt'
      orderDirection = SortDirection.DESC
      break
    case ItemSortBy.RECENTLY_REVIEWED:
      orderBy = 'reviewedAt'
      orderDirection = SortDirection.DESC
      break
    case ItemSortBy.RECENTLY_SOLD:
      orderBy = 'soldAt'
      orderDirection = SortDirection.DESC
      break
    case ItemSortBy.NAME:
      orderBy = 'searchText'
      orderDirection = SortDirection.ASC
      break
    case ItemSortBy.CHEAPEST:
      orderBy = 'price'
      orderDirection = SortDirection.ASC
      break
    case ItemSortBy.RECENTLY_LISTED:
      orderBy = 'firstListedAt'
      orderDirection = SortDirection.DESC
      break
    default:
      orderBy = 'createdAt'
      orderDirection = SortDirection.DESC
  }

  const query = `query Items {
    items(
      first: ${total},
      ${orderBy ? `orderBy: ${orderBy},` : ''}
      ${orderDirection ? `orderDirection: ${orderDirection},` : ''}
      where: {
        ${where.join('\n')}
      })
    { ${isCount ? 'id' : `...itemFragment`} }
  }`

  return `
    ${query}
    ${isCount ? '' : getItemFragment()}
  `
}

/**
 * It returns the minimum sale value allowed for item sales if any.
 * The price is not expected to be used as an inclusive cap, meaning that prices that equal the value SHOULD NOT be filtered
 */
function getMinSaleValueInWei(): string | undefined {
  return process.env.MIN_SALE_VALUE_IN_WEI
}

function isFragmentOnSale(fragment: ItemFragment) {
  const minSaleValue = getMinSaleValueInWei()

  const isOnSale = fragment.searchIsStoreMinter && +fragment.available > 0
  const isValidSalePrice =
    !minSaleValue || new BN(fragment.price).gte(new BN(minSaleValue))

  return isOnSale && isValidSalePrice
}
