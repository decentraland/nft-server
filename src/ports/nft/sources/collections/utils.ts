import { Network } from '@dcl/schemas'
import { gql } from 'apollo-boost'
import { NFTFragmet, nftFragment } from './fragment'
import {
  NFTCategory,
  NFTOptions,
  SortBy,
  OrderBy,
  SortableNFT,
  WearableGender,
} from '../../types'
import { fromNumber, fromWei } from '../../utils'

const NFTS_FILTERS = `
  $first: Int
  $skip: Int
  $orderBy: String
  $orderDirection: String
  $expiresAt: String
  $address: String
  $wearableCategory: String
  $isWearableHead: Boolean
  $isWearableAccessory: Boolean
`

const NFTS_ARGUMENTS = `
  first: 1000
  skip: 0
  orderBy: $orderBy
  orderDirection: $orderDirection
`

export function getQuery(options: NFTOptions, isCount = false) {
  const { orderBy } = getOrderBy(options.sortBy)
  let extraWhere: string[] = []

  if (options.address) {
    extraWhere.push('owner: $address')
  }

  if (
    options.isOnSale ||
    orderBy === SortBy.PRICE ||
    orderBy === SortBy.RECENTLY_LISTED
  ) {
    extraWhere.push('searchOrderStatus: open')
    extraWhere.push('searchOrderExpiresAt_gt: $expiresAt')
  }

  if (options.search) {
    extraWhere.push(
      `searchText_contains: "${options.search.trim().toLowerCase()}"`
    )
  }

  if (options.wearableCategory) {
    extraWhere.push('searchWearableCategory: $wearableCategory')
  }

  if (options.isWearableHead) {
    extraWhere.push('searchIsWearableHead: $isWearableHead')
  }

  if (options.isWearableAccessory) {
    extraWhere.push('searchIsWearableAccessory: $isWearableAccessory')
  }

  if (options.wearableRarities && options.wearableRarities.length > 0) {
    extraWhere.push(
      `searchWearableRarity_in: [${options.wearableRarities
        .map((rarity) => `"${rarity}"`)
        .join(',')}]`
    )
  }

  if (options.wearableGenders && options.wearableGenders.length > 0) {
    const hasMale = options.wearableGenders.includes(WearableGender.MALE)
    const hasFemale = options.wearableGenders.includes(WearableGender.FEMALE)

    if (hasMale && !hasFemale) {
      extraWhere.push(`searchWearableBodyShapes: [BaseMale]`)
    } else if (hasFemale && !hasMale) {
      extraWhere.push(`searchWearableBodyShapes: [BaseFemale]`)
    } else if (hasMale && hasFemale) {
      extraWhere.push(
        `searchWearableBodyShapes_contains: [BaseMale, BaseFemale]`
      )
    }
  }

  if (options.contracts && options.contracts.length > 0) {
    extraWhere.push(
      `contractAddress_in: [${options.contracts
        .map((contract) => `"${contract}"`)
        .join(', ')}]`
    )
  }

  return gql`
    query NFTs(${NFTS_FILTERS}) {
      nfts(
        where: {
          ${extraWhere.join('\n')}
        }${NFTS_ARGUMENTS}) 
      {
        ${isCount ? 'id' : '...nftFragment'}
      }
    }
    ${isCount ? '' : nftFragment()}
  `
}

// TODO: repeated code
export function getVariables(options: NFTOptions) {
  const { sortBy, ...variables } = options
  const { orderBy, orderDirection } = getOrderBy(sortBy)
  return {
    ...variables,
    orderBy,
    orderDirection,
    expiresAt: Date.now().toString(),
  }
}

export function getOrderBy(orderBy?: SortBy): OrderBy {
  switch (orderBy) {
    case SortBy.BIRTH:
      return { orderBy: 'createdAt', orderDirection: 'desc' }
    case SortBy.NAME:
      return { orderBy: 'searchText', orderDirection: 'asc' }
    case SortBy.RECENTLY_LISTED:
      return { orderBy: 'searchOrderCreatedAt', orderDirection: 'desc' }
    case SortBy.PRICE:
      return { orderBy: 'searchOrderPrice', orderDirection: 'asc' }
    default:
      return getOrderBy(SortBy.BIRTH)
  }
}

export function fromFragment(fragment: NFTFragmet): SortableNFT {
  const result: SortableNFT = {
    id: fragment.id,
    tokenId: fragment.tokenId,
    contractAddress: fragment.contractAddress,
    activeOrderId: fragment.activeOrder ? fragment.activeOrder.id : null,
    owner: fragment.owner.address.toLowerCase(),
    name: fragment.metadata.wearable.name,
    image: fragment.image,
    url: `/contracts/${fragment.contractAddress}/tokens/${fragment.tokenId}`,
    data: {
      wearable: {
        bodyShapes: fragment.metadata.wearable.bodyShapes,
        category: fragment.metadata.wearable.category,
        description: fragment.metadata.wearable.description,
        rarity: fragment.metadata.wearable.rarity,
      },
    },
    category: NFTCategory.WEARABLE,
    network: Network.MATIC,
    sort: {
      [SortBy.BIRTH]: fromNumber(fragment.createdAt),
      [SortBy.NAME]: fragment.metadata.wearable.name,
      [SortBy.RECENTLY_LISTED]: fromNumber(fragment.searchOrderCreatedAt),
      [SortBy.PRICE]: fromWei(fragment.searchOrderPrice),
    },
  }

  return result
}
