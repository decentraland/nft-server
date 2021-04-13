import { gql } from 'apollo-boost'
import { Network } from '@dcl/schemas'
import {
  DEFAULT_SORT_BY,
  NFTCategory,
  SourceResult,
  SortBy,
  NFT,
  WearableData,
  OrderStatus,
  Collection,
} from '../../nft-source/types'
import { fromNumber, fromWei } from '../../nft-source/utils'
import { isExpired } from '../utils'
import { ISubgraphComponent } from '../../subgraph/types'

export type CollectionsOrderFields = {
  id: string
  nftAddress: string
  owner: string
  buyer: string | null
  price: string
  status: OrderStatus
  expiresAt: string
  createdAt: string
  updatedAt: string
}
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
    case SortBy.NEWEST:
      return 'createdAt'
    case SortBy.NAME:
      return 'searchText'
    case SortBy.RECENTLY_LISTED:
      return 'searchOrderCreatedAt'
    case SortBy.CHEAPEST:
      return 'searchOrderPrice'
    default:
      return getCollectionsOrderBy(DEFAULT_SORT_BY)
  }
}

export function fromCollectionsFragment(
  fragment: CollectionsFragment
): SourceResult {
  const result: SourceResult = {
    nft: {
      id: fragment.id,
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
      category: NFTCategory.WEARABLE,
      network: Network.MATIC,
    },
    order:
      fragment.activeOrder && !isExpired(fragment.activeOrder.expiresAt)
        ? {
            id: fragment.activeOrder.id,
            nftId: fragment.id,
            nftAddress: fragment.activeOrder.nftAddress,
            category: NFTCategory.WEARABLE,
            owner: fragment.activeOrder.owner,
            buyer: fragment.activeOrder.buyer,
            price: fragment.activeOrder.price,
            status: fragment.activeOrder.status,
            expiresAt: +fragment.activeOrder.expiresAt,
            createdAt: +fragment.activeOrder.createdAt * 1000,
            updatedAt: +fragment.activeOrder.updatedAt * 1000,
          }
        : null,
    sort: {
      [SortBy.NEWEST]: fromNumber(fragment.createdAt),
      [SortBy.NAME]: fragment.metadata.wearable.name,
      [SortBy.RECENTLY_LISTED]: fromNumber(fragment.searchOrderCreatedAt),
      [SortBy.CHEAPEST]: fromWei(fragment.searchOrderPrice),
    },
  }

  return result
}

const getCollectionsQuery = gql`
  query getCollections {
    collections(first: 1000) {
      name
      id
    }
  }
`

export async function getCollections(
  subgraph: ISubgraphComponent,
  network: Network
) {
  const { collections } = await subgraph.query<{
    collections: { id: string; name: string }[]
  }>(getCollectionsQuery)

  return collections.map(
    ({ id: address, name }) =>
      ({
        name,
        address,
        network,
      } as Collection)
  )
}
