import { ChainId, Network } from '@dcl/schemas'

export interface IOrdersComponent {
  fetch(options: OrderOptions): Promise<Order[]>
}

export type OrderOptions = {
  owner?: string
  buyer?: string
  contractAddress?: string
  tokenId?: string
  status?: OrderStatus
  network?: Network
}

export enum OrderSortBy {
  RECENTLY_LISTED = 'recently_listed',
  RECENTLY_UPDATED = 'recently_updated',
  CHEAPEST = 'cheapest',
}

export enum OrderStatus {
  OPEN = 'open',
  SOLD = 'sold',
  CANCELLED = 'cancelled',
}

export type OrderFragment = {
  id: string
  nftAddress: string
  owner: string
  buyer: string | null
  price: string
  status: OrderStatus
  expiresAt: string
  createdAt: string
  updatedAt: string
  nft: {
    tokenId: string
  }
}

export type Order = {
  id: string
  nftId: string
  nftAddress: string
  owner: string
  buyer: string | null
  price: string
  status: OrderStatus
  expiresAt: number
  createdAt: number
  updatedAt: number
  network: Network
  chainId: ChainId
}
