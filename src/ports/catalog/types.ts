import {
  CatalogFilters,
  CatalogSortBy,
  CatalogSortDirection,
  Item,
  Network,
} from '@dcl/schemas'

export type CollectionsItemDBResult = {
  total?: number // for UNION queries, this field will be defined
  total_rows: number
  id: string
  image: string
  collection: string
  blockchain_id: string
  rarity: string
  item_type: string
  price: string
  available: string
  search_is_store_minter: boolean
  creator: string
  beneficiary: string
  created_at: string
  updated_at: string
  reviewed_at: string
  sold_at: string
  first_listed_at: string
  min_listing_price: string | null
  max_listing_price: string | null
  listings_count: number | null
  owners_count: number | null
  min_price: string
  max_price: string
  network?: Network
  metadata: {
    id: string
    description: string
    category: string
    body_shapes: string[]
    rarity: string
    name: string
    loop?: boolean
  }
}

export type CatalogQueryFilters = Omit<
  CatalogFilters,
  'sortBy' | 'sortDirection' | 'limit' | 'offset'
> & {
  sortBy?: CatalogSortBy
  sortDirection?: CatalogSortDirection
  limit?: number
  offset?: number
}

export type CatalogOptions = CatalogFilters & { pickedBy?: string }

export interface ICatalogComponent {
  fetch(filters: CatalogOptions): Promise<{ data: Item[]; total: number }>
}
