import { gql } from 'apollo-boost'
import { EnsData, NFT, Order, WearableData } from '../../types'

export type OrderFields = Omit<Order, 'nftId'>
export const orderFields = () => gql`
  fragment orderFields on Order {
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

export type OrderFragment = OrderFields
export const orderFragment = () => gql`
  fragment orderFragment on Order {
    ...orderFields
  }
  ${orderFields()}
`

export const nftFields = () => gql`
  fragment nftFields on NFT {
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

export const nftFragment = () => gql`
  fragment nftFragment on NFT {
    ...nftFields
    activeOrder {
      ...orderFields
    }
  }
  ${nftFields()}
  ${orderFields()}
`

export type NFTFields = Omit<NFT, 'activeOrderId' | 'owner' | 'data'> & {
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

export type NFTFragmet = NFTFields & {
  activeOrder: OrderFields | null
}
