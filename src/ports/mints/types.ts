import { Mint, MintFilters } from '@dcl/schemas'

export interface IMintsComponent {
  fetch(filters: MintFilters): Promise<Mint[]>
  count(filters: MintFilters): Promise<number>
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
