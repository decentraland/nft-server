import { FetchOptions } from '../merger/types'

export declare type Owners = {
  issuedId: string
  ownerId: string
  orderStatus: string
  orderExpiresAt: string
}

export declare type OwnersFilters = {
  contractAddress?: string,
  first?: number, 
  itemId?: string,
  skip?: number,
  orderDirection?: string
}

export declare enum OwnersSortBy {
  ISSUED_ID = 'issued_id', 
}

export type OwnerFragment = {
  issuedId: string
  owner: {
    id: string
  }
  searchOrderStatus: string
  searchOrderExpiresAt: string
}

export interface IOwnerDataComponent {
  fetchAndCount(
    filters: FetchOptions<OwnersFilters, OwnersSortBy>
  ): Promise<{data: Owners[], total: number}>
}
