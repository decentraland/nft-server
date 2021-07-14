import { ChainId, Network } from '@dcl/schemas'
import { NFTCategory, WearableGender } from '../nfts/types'
import { ItemSortBy, ItemFilters, ItemFragment, Item } from './types'

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
    createdAt: +fragment.collection.createdAt * 1000,
    updatedAt: +fragment.collection.updatedAt * 1000,
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
      createdAt
      updatedAt
    }
    metadata {
      wearable {
        name
        description
        category
      }
    }
    searchWearableBodyShapes
  }
`

export function getItemsQuery(filters: ItemFilters, isCount = false) {
  const {
    first,
    skip,
    sortBy,
    creator,
    isSoldOut,
    isOnSale,
    search,
    isWearableHead,
    isWearableAccessory,
    wearableCategory,
    wearableRarities,
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
  } else if (isSoldOut) {
    where.push('available: 0')
  } else if (sortBy === ItemSortBy.CHEAPEST) {
    where.push('available_gt: 0')
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

  if (wearableRarities && wearableRarities.length > 0) {
    where.push(
      `searchWearableRarity_in: [${wearableRarities
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
      orderBy = ''
      orderDirection = ''
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
      orderBy = ''
      orderDirection = ''
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
