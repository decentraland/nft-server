import { gql } from 'apollo-boost'
import { Network } from '@dcl/schemas'
import {
  SourceResult,
  SortBy,
  EnsData,
  NFT,
  WearableData,
  NFTCategory,
  OrderStatus,
} from '../../nft-source/types'
import { fromNumber, fromWei } from '../../nft-source/utils'
import { isExpired } from '../utils'

export type MarketplaceOrderFields = {
  id: string
  category: NFTCategory
  nftAddress: string
  owner: string
  buyer: string | null
  price: string
  status: OrderStatus
  expiresAt: string
  createdAt: string
  updatedAt: string
}
export const getMarketplaceOrderFields = () => gql`
  fragment marketplaceOrderFields on Order {
    id
    category
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

export type MarketplaceOrderFragment = MarketplaceOrderFields
export const getMarketplaceOrderFragment = () => gql`
  fragment marketplaceOrderFragment on Order {
    ...marketplaceOrderFields
  }
  ${getMarketplaceOrderFields()}
`

export const getMarketplaceFields = () => gql`
  fragment marketplaceFields on NFT {
    id
    name
    image
    contractAddress
    tokenId
    category
    owner {
      address
    }
    parcel {
      x
      y
      data {
        description
      }
    }
    estate {
      size
      parcels {
        x
        y
      }
      data {
        description
      }
    }
    wearable {
      description
      category
      rarity
      bodyShapes
    }
    ens {
      subdomain
    }
    createdAt
    searchOrderPrice
    searchOrderCreatedAt
  }
`

export const getMarketplaceFragment = () => gql`
  fragment marketplaceFragment on NFT {
    ...marketplaceFields
    activeOrder {
      ...marketplaceOrderFields
    }
  }
  ${getMarketplaceFields()}
  ${getMarketplaceOrderFields()}
`

export type MarketplaceFields = Omit<
  NFT,
  'activeOrderId' | 'owner' | 'data'
> & {
  owner: { address: string }
  parcel?: {
    x: string
    y: string
    data: {
      description: string
    } | null
  }
  estate?: {
    size: number
    parcels: { x: number; y: number }[]
    data: {
      description: string
    } | null
  }
  wearable?: WearableData
  ens?: EnsData
  createdAt: string
  searchOrderPrice: string
  searchOrderCreatedAt: string
}

export type MarketplaceFragment = MarketplaceFields & {
  activeOrder: MarketplaceOrderFields | null
}

export function getMarketplaceOrderBy(
  sortBy?: SortBy
): keyof MarketplaceFragment {
  switch (sortBy) {
    case SortBy.NEWEST:
      return 'createdAt'
    case SortBy.NAME:
      return 'name'
    case SortBy.RECENTLY_LISTED:
      return 'searchOrderCreatedAt'
    case SortBy.CHEAPEST:
      return 'searchOrderPrice'
    default:
      return getMarketplaceOrderBy(SortBy.NEWEST)
  }
}

export function fromMarketplaceFragment(
  fragment: MarketplaceFragment
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
      name: fragment.name,
      image: fragment.image,
      url: `/contracts/${fragment.contractAddress}/tokens/${fragment.tokenId}`,
      data: {
        parcel: fragment.parcel
          ? {
              description:
                (fragment.parcel.data && fragment.parcel.data.description) ||
                null,
              x: fragment.parcel.x,
              y: fragment.parcel.y,
            }
          : undefined,
        estate: fragment.estate
          ? {
              description:
                (fragment.estate.data && fragment.estate.data.description) ||
                null,
              size: fragment.estate.size,
              parcels: fragment.estate.parcels.map(({ x, y }) => ({ x, y })),
            }
          : undefined,
        wearable: fragment.wearable
          ? {
              bodyShapes: fragment.wearable.bodyShapes,
              category: fragment.wearable.category,
              description: fragment.wearable.description,
              rarity: fragment.wearable.rarity,
            }
          : undefined,
        ens: fragment.ens ? { subdomain: fragment.ens.subdomain } : undefined,
      },
      category: fragment.category,
      network: Network.ETHEREUM,
    },
    order:
      fragment.activeOrder && !isExpired(fragment.activeOrder.expiresAt)
        ? {
            id: fragment.activeOrder.id,
            nftId: fragment.id,
            nftAddress: fragment.activeOrder.nftAddress,
            category: fragment.activeOrder.category,
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
      [SortBy.NAME]: fragment.name,
      [SortBy.RECENTLY_LISTED]: fromNumber(fragment.searchOrderCreatedAt),
      [SortBy.CHEAPEST]: fromWei(fragment.searchOrderPrice),
    },
  }

  // remove undefined data
  for (const property of Object.keys(result.nft.data)) {
    const key = property as keyof typeof result.nft.data
    if (!result.nft.data[key]) {
      delete result.nft.data[key]
    }
  }

  return result
}
