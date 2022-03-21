import {
  BodyShape,
  EmoteCategory,
  Network,
  NFT,
  NFTCategory,
  NFTFilters,
  NFTSortBy,
  Rarity,
  WearableCategory,
} from '@dcl/schemas'
import { FragmentItemType } from '../../ports/items/types'
import { NFTResult } from '../../ports/nfts/types'
import { getId, NFT_DEFAULT_SORT_BY } from '../../ports/nfts/utils'
import { OrderFragment } from '../../ports/orders/types'
import { fromOrderFragment, getOrderFields } from '../../ports/orders/utils'
import { getCollectionsChainId } from '../chainIds'
import { isExpired } from '../expiration'

export const getCollectionsFields = () => `
  fragment collectionsFields on NFT {
    id
    itemType
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
      emote {
        name
        description
        category
        rarity
        bodyShapes
      }
    }
    createdAt
    updatedAt
    soldAt
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
  | 'itemId'
> & {
  id: string
  itemType: FragmentItemType
  image: string
  contractAddress: string
  tokenId: string
  owner: { address: string }
  metadata: {
    wearable: {
      name: string
      description: string
      category: WearableCategory
      rarity: Rarity
      bodyShapes: BodyShape[]
    } | null
    emote: {
      name: string
      description: string
      category: EmoteCategory
      rarity: Rarity
      bodyShapes: BodyShape[]
    } | null
  }
  createdAt: string
  updatedAt: string
  soldAt: string
  searchOrderPrice: string
  searchOrderCreatedAt: string
  searchText: string
  itemBlockchainId: string
  issuedId: string | null
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
    case NFTSortBy.RECENTLY_SOLD:
      return 'soldAt'
    default:
      return getCollectionsOrderBy(NFT_DEFAULT_SORT_BY)
  }
}

export function fromCollectionsFragment(
  fragment: CollectionsFragment
): NFTResult {
  let name: string
  let category: NFTCategory
  let data: NFT['data']

  switch (fragment.itemType) {
    case FragmentItemType.WEARABLE_V1:
    case FragmentItemType.WEARABLE_V2:
    case FragmentItemType.SMART_WEARABLE_V1: {
      name = fragment.metadata.wearable!.name
      category = NFTCategory.WEARABLE
      data = {
        wearable: {
          bodyShapes: fragment.metadata.wearable!.bodyShapes,
          category: fragment.metadata.wearable!.category,
          description: fragment.metadata.wearable!.description,
          rarity: fragment.metadata.wearable!.rarity,
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
          bodyShapes: fragment.metadata.emote!.bodyShapes,
          category: fragment.metadata.emote!.category,
          description: fragment.metadata.emote!.description,
          rarity: fragment.metadata.emote!.rarity,
        },
      }
      break
    }
    default: {
      throw new Error(`Uknown itemType=${fragment.itemType}`)
    }
  }

  const result: NFTResult = {
    nft: {
      id: getId(fragment.contractAddress, fragment.tokenId),
      tokenId: fragment.tokenId,
      contractAddress: fragment.contractAddress,
      category,
      activeOrderId:
        fragment.activeOrder && !isExpired(fragment.activeOrder.expiresAt)
          ? fragment.activeOrder.id
          : null,
      owner: fragment.owner.address.toLowerCase(),
      name,
      image: fragment.image,
      url: `/contracts/${fragment.contractAddress}/tokens/${fragment.tokenId}`,
      data,
      issuedId: fragment.issuedId,
      itemId: fragment.itemBlockchainId,
      network: Network.MATIC,
      chainId: getCollectionsChainId(),
      createdAt: +fragment.createdAt * 1000,
      updatedAt: +fragment.updatedAt * 1000,
      //@ts-ignore
      soldAt: +fragment.soldAt * 1000,
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
  if (options.emoteCategory) {
    extraVariables.push('$emoteCategory: String')
  }
  return extraVariables
}

export function getCollectionsExtraWhere(options: NFTFilters) {
  const extraWhere = []
  if (options.itemId) {
    extraWhere.push('itemBlockchainId: $itemId')
  }
  if (options.isWearableSmart) {
    extraWhere.push('itemType: smart_wearable_v1')
  } else if (options.category) {
    if (options.category === NFTCategory.WEARABLE) {
      extraWhere.push(
        'itemType_in: [wearable_v1, wearable_v2, smart_wearable_v1]'
      )
    } else if (options.category === NFTCategory.EMOTE) {
      extraWhere.push('itemType: emote_v1')
    }
  }
  return extraWhere
}

export function collectionsShouldFetch(filters: NFTFilters) {
  if (
    filters.isLand ||
    (filters.network && filters.network !== Network.MATIC) ||
    (filters.category &&
      filters.category !== NFTCategory.WEARABLE &&
      filters.category !== NFTCategory.EMOTE)
  ) {
    return false
  }

  return true
}
