import { Collection, CollectionFilters } from '@dcl/schemas'

export interface ICollectionsComponent {
  fetch(filters: CollectionFilters): Promise<Collection[]>
  count(filters: CollectionFilters): Promise<number>
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
  firstListedAt: string | null
}
