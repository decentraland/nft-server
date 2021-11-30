import { NFT, NFTFilters, Order } from '@dcl/schemas'

export type NFTResult = {
  nft: NFT
  order: Order | null
}

export type QueryVariables = Omit<NFTFilters, 'sortBy'> & {
  orderBy: string
  orderDirection: 'asc' | 'desc'
  expiresAt: string
}

export interface INFTsComponent {
  fetch(filters: NFTFilters): Promise<NFTResult[]>
  count(filters: NFTFilters): Promise<number>
}
