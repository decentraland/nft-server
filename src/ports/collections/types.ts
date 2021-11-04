import { ChainId, Network } from '@dcl/schemas'

export type Collection = {
  urn: string
  name: string
  creator: string
  contractAddress: string
  isOnSale: boolean
  size: number
  createdAt: number
  updatedAt: number
  reviewedAt: number
  network: Network
  chainId: ChainId
}

export interface ICollectionsComponent {
  fetch(filters: CollectionFilters): Promise<Collection[]>
  count(filters: CollectionFilters): Promise<number>
}

export enum CollectionSortBy {
  NEWEST = 'newest',
  NAME = 'name',
  RECENTLY_REVIEWED = 'recently_reviewed',
  SIZE = 'size',
}

export type CollectionFilters = {
  first?: number
  skip?: number
  sortBy?: CollectionSortBy
  creator?: string
  contractAddress?: string
  urn?: string
  isOnSale?: boolean
  network?: Network
}

export type CollectionFragment = {
  id: string
  urn: string
  name: string
  creator: string
  searchIsStoreMinter: boolean
  itemsCount: number
  createdAt: string
  updatedAt: string
  reviewedAt: string
}
