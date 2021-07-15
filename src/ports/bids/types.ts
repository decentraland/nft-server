import { Bid, ListingStatus, Network } from '@dcl/schemas'

export interface IBidsComponent {
  fetch(filters: BidFilters): Promise<Bid[]>
  count(filters: BidFilters): Promise<number>
}

export enum BidSortBy {
  RECENTLY_OFFERED = 'recently_offered',
  RECENTLY_UPDATED = 'recently_updated',
  MOST_EXPENSIVE = 'most_expensive',
}

export type BidFilters = {
  first?: number
  skip?: number
  sortBy?: BidSortBy
  bidder?: string
  seller?: string
  contractAddress?: string
  tokenId?: string
  status?: ListingStatus
  network?: Network
}

export type BidFragment = {
  id: string
  bidder: string
  seller: string
  price: string
  fingerprint: string
  status: ListingStatus
  blockchainId: string
  blockNumber: string
  expiresAt: number
  createdAt: number
  updatedAt: number
  nft: { contractAddress: string; tokenId: string }
}
