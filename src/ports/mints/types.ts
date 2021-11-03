import { ChainId, Network } from '@dcl/schemas'

export type Mint = {
  id: string
  creator: string
  beneficiary: string
  minter: string
  itemId: string
  tokenId: string
  issuedId: string
  contractAddress: string
  price: string | null
  timestamp: number
  network: Network
  chainId: ChainId
}

export interface IMintsComponent {
  fetch(filters: MintFilters): Promise<Mint[]>
  count(filters: MintFilters): Promise<number>
}

export enum MintSortBy {
  RECENTLY_MINTED = 'recently_minted',
  MOST_EXPENSIVE = 'most_expensive',
}

export type MintFilters = {
  first?: number
  skip?: number
  sortBy?: MintSortBy
  creator?: string
  beneficiary?: string
  minter?: string
  contractAddress?: string
  itemId?: string
  tokenId?: string
  issuedId?: string
  isSale?: boolean
  network?: Network
}

export type MintFragment = {
  id: string
  creator: string
  beneficiary: string
  minter: string
  searchItemId: string
  searchTokenId: string
  searchIssuedId: string
  searchContractAddress: string
  searchPrimarySalePrice: string | null
  timestamp: string
}
