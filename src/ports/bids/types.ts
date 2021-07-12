import { ChainId, Network } from '@dcl/schemas'

export interface IBidsComponent {
  fetch(filters: BidFilters): Promise<Bid[]>
  count(filters: BidFilters): Promise<number>
}

export enum BidStatus {
  OPEN = 'open',
  SOLD = 'sold',
  CANCELLED = 'cancelled',
}

export enum BidSortBy {
  RECENTLY_LISTED = 'recently_listed',
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
  status?: BidStatus
  network?: Network
}

export type Bid = {
  id: string
  bidder: string
  seller: string
  price: string
  fingerprint: string
  status: BidStatus
  blockchainId: string
  blockNumber: string
  expiresAt: number
  createdAt: number
  updatedAt: number
  contractAddress: string
  tokenId: string
  network: Network
  chainId: ChainId
}

export type BidFragment = Omit<Bid, 'contractAddress' | 'tokenId' | 'price'> & {
  nft: { contractAddress: string; tokenId: string }
  price: string
}
