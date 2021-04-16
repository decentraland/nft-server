import { gql } from 'apollo-boost'
import { Network } from '@dcl/schemas'
import {
  DEFAULT_SORT_BY,
  NFTCategory,
  SourceResult,
  SortBy,
  NFT,
  WearableData,
  Collection,
  OrderFragment,
} from '../../source/types'
import {
  fromNumber,
  fromOrderFragment,
  fromWei,
  getOrderFields,
} from '../../source/utils'
import { isExpired } from '../utils'
import { ISubgraphComponent } from '../../subgraph/types'

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
      ...orderFields
    }
  }
  ${getCollectionsFields()}
  ${getOrderFields()}
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
  activeOrder: OrderFragment | null
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
      id: NFTCategory.WEARABLE + '-' + fragment.id,
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
        ? fromOrderFragment(fragment.activeOrder)
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
