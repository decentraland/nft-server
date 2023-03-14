import { FetchOptions } from '../merger/types'

export type Owners = {
  issuedId: string
  ownerId: string
  orderStatus: string | null
  orderExpiresAt: string | null
  tokenId: string
}

export type OwnersFilters = {
  contractAddress?: string,
  first?: number, 
  itemId?: string,
  skip?: number,
  orderDirection?: string
}

export enum OwnersSortBy {
  ISSUED_ID = 'issuedId', 
}

export type OwnerFragment = {
  issuedId: string
  owner: {
    id: string
  }
  searchOrderStatus: string
  searchOrderExpiresAt: string
  tokenId: string
}

export interface IOwnerDataComponent {
  fetchAndCount(
    filters: FetchOptions<OwnersFilters, OwnersSortBy>
  ): Promise<{data: Owners[], total: number}>
}
