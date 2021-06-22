export interface IBidsComponent {
  fetch(options: BidOptions): Promise<Bid[]>
}

export enum BidStatus {
  OPEN = 'open',
  SOLD = 'sold',
  CANCELLED = 'cancelled',
}

export type BidOptions = {
  bidder: string | null
  seller: string | null
  contractAddress: string | null
  tokenId: string | null
  status: BidStatus | null
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
}

export type BidFragment = Omit<Bid, 'contractAddress' | 'tokenId'> & {
  nft: { contractAddress: string; tokenId: string }
}
