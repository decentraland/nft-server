import { FetchOptions } from '../merger/types'

export declare type Owners = {
  issuedId: string
  ownerId: string
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
}

export interface IOwnerDataComponent {
  fetch(
    filters: FetchOptions<OwnersFilters, OwnersSortBy>
  ): Promise<Owners[]>
  count( filters: OwnersFilters): Promise<number>
}
