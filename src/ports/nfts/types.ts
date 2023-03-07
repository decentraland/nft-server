import { NFT, NFTFilters, Order, RentalListing } from '@dcl/schemas'

export type NFTResult = {
  nft: NFT
  order: Order | null
  rental: RentalListing | null
}

export type QueryVariables = Omit<NFTFilters, 'sortBy' | 'rentalDays'> & {
  orderBy: string
  orderDirection: 'asc' | 'desc'
  expiresAt: string
}

export interface INFTsComponent {
  fetch(filters: NFTFilters): Promise<NFTResult[]>
  fetchOne(contractAddress: string, tokenId: string): Promise<NFTResult | null>
  fetchByTokenIds(tokenIds: string[]): Promise<NFTResult[]>
  count(filters: NFTFilters): Promise<number>
}
