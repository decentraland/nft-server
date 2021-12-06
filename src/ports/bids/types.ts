import { Bid, BidFilters, ListingStatus } from '@dcl/schemas'

export interface IBidsComponent {
  fetch(filters: BidFilters): Promise<Bid[]>
  count(filters: BidFilters): Promise<number>
}

export type BidFragment = {
  id: string
  bidAddress: string
  bidder: string
  seller: string
  price: string
  fingerprint?: string
  status: ListingStatus
  blockchainId: string
  blockNumber: string
  expiresAt: number
  createdAt: number
  updatedAt: number
  nft: { contractAddress: string; tokenId: string }
}
