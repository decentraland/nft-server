import BN from 'bn.js'
import {
  ChainId,
  Item,
  ItemFilters,
  ItemSortBy,
  Network,
  NFTCategory,
  WearableGender,
} from '@dcl/schemas'
import { ItemFragment, FragmentItemType } from './types'
import { isAddressZero } from '../../logic/address'

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
    contractAddress,
    itemId,
  } = filters as ItemFilters

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
    where.push(`creator: "${creator}"`)
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

  if (rarities && rarities.length > 0) {
    where.push(
      `searchWearableRarity_in: [${rarities
        .map((rarity) => `"${rarity}"`)
        .join(',')}]`
    )
  }

  if (contractAddress) {
    where.push(`collection: "${contractAddress}"`)
  }

  if (itemId) {
    where.push(`blockchainId: "${itemId}"`)
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
      const hasMale = wearableGenders.includes(WearableGender.MALE)
      const hasFemale = wearableGenders.includes(WearableGender.FEMALE)

      if (hasMale && !hasFemale) {
        where.push(`searchWearableBodyShapes: [BaseMale]`)
      } else if (hasFemale && !hasMale) {
        where.push(`searchWearableBodyShapes: [BaseFemale]`)
      } else if (hasMale && hasFemale) {
        where.push(`searchWearableBodyShapes_contains: [BaseMale, BaseFemale]`)
      }
    }

    if (isWearableSmart) {
      where.push(`itemType: smart_wearable_v1`)
    }
  }

  if (!category || category === NFTCategory.EMOTE) {
    if (emoteCategory) {
      where.push(`searchEmoteCategory: ${emoteCategory}`)
    }

    if (emoteGenders && emoteGenders.length > 0) {
      const hasMale = emoteGenders.includes(WearableGender.MALE)
      const hasFemale = emoteGenders.includes(WearableGender.FEMALE)

      if (hasMale && !hasFemale) {
        where.push(`searchEmoteBodyShapes: [BaseMale]`)
      } else if (hasFemale && !hasMale) {
        where.push(`searchEmoteBodyShapes: [BaseFemale]`)
      } else if (hasMale && hasFemale) {
        where.push(`searchEmoteBodyShapes_contains: [BaseMale, BaseFemale]`)
      }
    }
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
      orderDirection = 'desc'
      break
    case ItemSortBy.RECENTLY_REVIEWED:
      orderBy = 'reviewedAt'
      orderDirection = 'desc'
      break
    case ItemSortBy.RECENTLY_SOLD:
      orderBy = 'soldAt'
      orderDirection = 'desc'
      break
    case ItemSortBy.NAME:
      orderBy = 'searchText'
      orderDirection = 'asc'
      break
    case ItemSortBy.CHEAPEST:
      orderBy = 'price'
      orderDirection = 'asc'
      break
    default:
      orderBy = 'createdAt'
      orderDirection = 'desc'
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
