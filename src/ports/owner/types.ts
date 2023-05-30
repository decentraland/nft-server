import { FetchOptions } from '../merger/types'

export type Owners = {
  issuedId: string
  ownerId: string
  tokenId: string
}

export type OwnersFilters = {
  contractAddress?: string
  first?: number
  itemId?: string
  skip?: number
  orderDirection?: string
}

export enum OwnersSortBy {
  ISSUED_ID = 'issuedId',
}

export type OwnerDBRow = {
  issued_id: string
  owner: string
  token_id: string
}

export type OwnerCountDBRow = {
  count: string
}

export interface IOwnerDataComponent {
  fetchAndCount(
    filters: FetchOptions<OwnersFilters, OwnersSortBy>
  ): Promise<{ data: Owners[]; total: number }>
}
