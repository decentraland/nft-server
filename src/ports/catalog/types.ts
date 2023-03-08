import { Item, Network } from '@dcl/schemas'
import { Item_orderBy } from '../../../.graphclient'

export type CatalogItem = Pick<
  Item,
  'id' | 'available' | 'price' | 'network' | 'name' | 'data'
> & {
  listings: {
    amount: number
    max: number
    min: number
  }
  creator: string | null
}

export interface ICatalogComponent {
  fetch(params: CatalogParams, filter: CatalogFilters): Promise<CatalogItem[]>
}

export enum CatalogSortyBy {
  NEWEST = 'newest',
  RECENTLY_SOLD = 'recently_sold',
  CHEAPEST = 'cheapest',
  MOST_EXPENSIVE = 'most_expensive',
  // MOST_FAVORITED = 'most_favorited' // coming soon
}

export type CatalogParams = {
  first?: number
  skip?: number
  sortBy?: CatalogSortyBy
  // sortBy?: Item_orderBy
}

export type CatalogFilters = {
  network?: Network
  isOnSale?: boolean
  onlyForMint?: boolean
  onlyListings?: boolean
}
