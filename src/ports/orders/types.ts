import { ListingStatus, Network, Order } from '@dcl/schemas'
export { Order }

export interface IOrdersComponent {
  fetch(filters: OrderFilters): Promise<Order[]>
  count(filters: OrderFilters): Promise<number>
}

export type OrderFilters = {
  first?: number
  skip?: number
  sortBy?: OrderSortBy
  owner?: string
  buyer?: string
  contractAddress?: string
  tokenId?: string
  status?: ListingStatus
  network?: Network
}

export enum OrderSortBy {
  RECENTLY_LISTED = 'recently_listed',
  RECENTLY_UPDATED = 'recently_updated',
  CHEAPEST = 'cheapest',
}

export type OrderFragment = {
  id: string
  nftAddress: string
  owner: string
  buyer: string | null
  price: string
  status: ListingStatus
  expiresAt: string
  createdAt: string
  updatedAt: string
  nft: {
    tokenId: string
  }
}
