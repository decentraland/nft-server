import { gql } from 'apollo-boost'
import { NFT, Order, WearableData } from '../../../types'

export type OrderFields = Omit<Order, 'nftId' | 'category'>
export const orderFields = () => gql`
  fragment orderFields on Order {
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

export type NFTFields = Omit<
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

export type NFTFragmet = NFTFields & {
  activeOrder: OrderFields | null
}
