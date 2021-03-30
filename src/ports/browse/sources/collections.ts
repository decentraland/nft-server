import { gql } from 'apollo-boost'
import { Network } from '@dcl/schemas'
import {
  DEFAULT_SORT_BY,
  NFTCategory,
  SortableNFT,
  SortBy,
} from '../../nft-source/types'
import { fromNumber, fromWei } from '../../nft-source/utils'
import { NFT, Order, WearableData } from '../../nft-source/types'

export type CollectionsOrderFields = Omit<Order, 'nftId' | 'category'>
export const getCollectionsOrderFields = () => gql`
  fragment collectionsOrderFields on Order {
    id
    nftAddress
    owner
    buyer
    price
    status
    expiresAt
    createdAt
    updatedAt
  }
`

export type CollectionsOrderFragment = CollectionsOrderFields
export const getCollectionsOrderFragment = () => gql`
  fragment collectionsOrderFragment on Order {
    ...collectionsOrderFields
  }
  ${getCollectionsOrderFields()}
`

export const getCollectionsFields = () => gql`
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
    searchOrderPrice
    searchOrderCreatedAt
  }
`

export const getCollectionsFragment = () => gql`
  fragment collectionsFragment on NFT {
    ...collectionsFields
    activeOrder {
      ...collectionsOrderFields
    }
  }
  ${getCollectionsFields()}
  ${getCollectionsOrderFields()}
`

export type CollectionsFields = Omit<
  NFT,
  'activeOrderId' | 'owner' | 'category' | 'data' | 'name'
> & {
  owner: { address: string }
  metadata: {
    wearable: WearableData & {
      name: string
    }
  }
  createdAt: string
  searchOrderPrice: string
  searchOrderCreatedAt: string
  searchText: string
}

export type CollectionsFragment = CollectionsFields & {
  activeOrder: CollectionsOrderFields | null
}

export function getCollectionsOrderBy(
  orderBy?: SortBy
): keyof CollectionsFragment {
  switch (orderBy) {
    case SortBy.BIRTH:
      return 'createdAt'
    case SortBy.NAME:
      return 'searchText'
    case SortBy.RECENTLY_LISTED:
      return 'searchOrderCreatedAt'
    case SortBy.PRICE:
      return 'searchOrderPrice'
    default:
      return getCollectionsOrderBy(DEFAULT_SORT_BY)
  }
}

export function fromCollectionsFragment(
  fragment: CollectionsFragment
): SortableNFT {
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
