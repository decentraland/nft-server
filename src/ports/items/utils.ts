import {
  ChainId,
  Item,
  ItemFilters,
  ItemSortBy,
  Network,
  NFTCategory,
  WearableGender,
} from '@dcl/schemas'
import { ItemFragment } from './types'

export const ITEM_DEFAULT_SORT_BY = ItemSortBy.NEWEST

export function fromItemFragment(
  fragment: ItemFragment,
  network: Network,
  chainId: ChainId
): Item {
  const item: Item = {
    id: fragment.id,
    name: fragment.metadata.wearable.name,
    thumbnail: fragment.image,
    url: `/contracts/${fragment.collection.id}/items/${fragment.blockchainId}`,
    category: NFTCategory.WEARABLE,
    contractAddress: fragment.collection.id,
    itemId: fragment.blockchainId,
    rarity: fragment.rarity,
    price: fragment.price,
    available: +fragment.available,
    isOnSale:
      fragment.searchIsStoreMinter &&
      +fragment.available > 0 &&
      +fragment.price > 0,
    creator: fragment.collection.creator,
    data: {
      wearable: {
        description: fragment.metadata.wearable.description,
        category: fragment.metadata.wearable.category,
        bodyShapes: fragment.searchWearableBodyShapes,
        rarity: fragment.rarity,
      },
    },
    network,
    chainId,
    createdAt: +fragment.createdAt * 1000,
    updatedAt: +fragment.updatedAt * 1000,
    reviewedAt: +fragment.reviewedAt * 1000,
    //@ts-ignore
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
    }
    searchWearableBodyShapes
    searchIsStoreMinter
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
    rarities,
    isSoldOut,
    isOnSale,
    search,
    isWearableHead,
    isWearableAccessory,
    wearableCategory,
    wearableGenders,
    contractAddress,
    itemId,
  } = filters

  const where: string[] = [`searchIsCollectionApproved: true`]

  if (creator) {
    where.push(`creator: "${creator}"`)
  }

  if (isOnSale && isSoldOut) {
    throw new Error(
      `You can't use "isOnSale" and "isSoldOut" at the same time.`
    )
  } else if (isOnSale) {
    where.push('available_gt: 0')
    where.push('price_gt: 0')
  } else if (isSoldOut) {
    where.push('available: 0')
  } else if (sortBy === ItemSortBy.CHEAPEST) {
    where.push('available_gt: 0')
    where.push('price_gt: 0')
  }

  if (search) {
    where.push(`searchText_contains: "${search.trim().toLowerCase()}"`)
  }

  if (wearableCategory) {
    where.push(`searchWearableCategory: ${wearableCategory}`)
  }

  if (isWearableHead) {
    where.push('searchIsWearableHead: true')
  }

  if (isWearableAccessory) {
    where.push('searchIsWearableAccessory: true')
  }

  if (rarities && rarities.length > 0) {
    where.push(
      `searchWearableRarity_in: [${rarities
        .map((rarity) => `"${rarity}"`)
        .join(',')}]`
    )
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
