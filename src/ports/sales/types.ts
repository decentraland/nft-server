import { ChainId, Network, NFTCategory } from '@dcl/schemas'

export enum SaleType {
  ORDER = 'order',
  BID = 'bid',
  MINT = 'mint',
}

export type Sale = {
  id: string
  type: SaleType
  buyer: string
  seller: string
  itemId: string | null
  tokenId: string
  contractAddress: string
  price: string
  timestamp: number
  txHash: string
  network: Network
  chainId: ChainId
}

export interface ISalesComponent {
  fetch(filters: SaleFilters): Promise<Sale[]>
  count(filters: SaleFilters): Promise<number>
}

export enum SaleSortBy {
  RECENTLY_SOLD = 'recently_sold',
  MOST_EXPENSIVE = 'most_expensive',
}

export type SaleFilters = {
  first?: number
  skip?: number
  sortBy?: SaleSortBy
  type?: SaleType
  category?: NFTCategory
  buyer?: string
  seller?: string
  contractAddress?: string
  itemId?: string
  tokenId?: string
  from?: number
  to?: number
  minPrice?: string
  maxPrice?: string
  network?: Network
}

export type SaleFragment = {
  id: string
  type: SaleType
  buyer: string
  seller: string
  price: string
  timestamp: string
  txHash: string
  searchItemId: string
  searchTokenId: string
  searchContractAddress: string
}
