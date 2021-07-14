import { Network } from '@dcl/schemas'
import {
  NFT,
  NFTCategory,
  NFTFilters,
  NFTResult,
  NFTSortBy,
  WearableData,
} from '../../ports/nfts/types'
import { getId, NFT_DEFAULT_SORT_BY } from '../../ports/nfts/utils'
import { OrderFragment } from '../../ports/orders/types'
import { fromOrderFragment, getOrderFields } from '../../ports/orders/utils'
import { getCollectionsChainId } from '../chainIds'
import { isExpired } from '../expiration'

export const getCollectionsFields = () => `
  fragment collectionsFields on NFT {
    id
    image
    contractAddress
    tokenId
    owner {
      address
    }
    metadata {
      wearable {
        name
        description
        category
        rarity
        bodyShapes
      }
    }
    createdAt
    updatedAt
    searchOrderPrice
    searchOrderCreatedAt
    itemBlockchainId
    issuedId
  }
`

export const getCollectionsFragment = () => `
  fragment collectionsFragment on NFT {
    ...collectionsFields
    activeOrder {
      ...orderFields
    }
  }
  ${getCollectionsFields()}
  ${getOrderFields()}
`

export type CollectionsFields = Omit<
  NFT,
  | 'activeOrderId'
  | 'owner'
  | 'category'
  | 'data'
  | 'name'
  | 'createdAt'
  | 'updatedAt'
> & {
  owner: { address: string }
  metadata: {
    wearable: WearableData & {
      name: string
    }
  }
  createdAt: string
  updatedAt: string
  searchOrderPrice: string
  searchOrderCreatedAt: string
  searchText: string
}

export type CollectionsFragment = CollectionsFields & {
  activeOrder: OrderFragment | null
}

export function getCollectionsOrderBy(
  sortBy?: NFTSortBy
): keyof CollectionsFragment {
  switch (sortBy) {
    case NFTSortBy.NEWEST:
      return 'createdAt'
    case NFTSortBy.NAME:
      return 'searchText'
    case NFTSortBy.RECENTLY_LISTED:
      return 'searchOrderCreatedAt'
    case NFTSortBy.CHEAPEST:
      return 'searchOrderPrice'
    default:
      return getCollectionsOrderBy(NFT_DEFAULT_SORT_BY)
  }
}

export function fromCollectionsFragment(
  fragment: CollectionsFragment
): NFTResult {
  const result: NFTResult = {
    nft: {
      id: getId(fragment.contractAddress, fragment.tokenId),
      tokenId: fragment.tokenId,
      contractAddress: fragment.contractAddress,
      activeOrderId:
        fragment.activeOrder && !isExpired(fragment.activeOrder.expiresAt)
          ? fragment.activeOrder.id
          : null,
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
      issuedId: fragment.issuedId,
      itemId: fragment.itemId,
      category: NFTCategory.WEARABLE,
      network: Network.MATIC,
      chainId: getCollectionsChainId(),
      createdAt: +fragment.createdAt * 1000,
      updatedAt: +fragment.updatedAt * 1000,
    },
    order:
      fragment.activeOrder && !isExpired(fragment.activeOrder.expiresAt)
        ? fromCollectionsOrderFragment(fragment.activeOrder)
        : null,
  }

  return result
}

export function fromCollectionsOrderFragment(fragment: OrderFragment) {
  return fromOrderFragment(fragment, Network.MATIC, getCollectionsChainId())
}

export function getCollectionsExtraVariables(options: NFTFilters) {
  const extraVariables: string[] = []
  if (options.itemId) {
    extraVariables.push('$itemId: String')
  }
  return extraVariables
}

export function getCollectionsExtraWhere(options: NFTFilters) {
  const extraWhere = []
  if (options.itemId) {
    extraWhere.push('itemBlockchainId: $itemId')
  }
  return extraWhere
}

export function collectionsShouldFetch(filters: NFTFilters) {
  if (filters.isLand) {
    return false
  } else if (filters.category && filters.category !== NFTCategory.WEARABLE) {
    return false
  } else if (filters.network && filters.network !== Network.MATIC) {
    return false
  } else {
    return true
  }
}
