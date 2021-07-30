import {
  BodyShape,
  Item,
  Network,
  Rarity,
  WearableCategory,
} from '@dcl/schemas'
import { WearableGender } from '../nfts/types'

export { Item }

export type ItemFilters = {
  first?: number
  skip?: number
  sortBy?: ItemSortBy
  creator?: string
  rarities?: Rarity[]
  isSoldOut?: boolean
  isOnSale?: boolean
  search?: string
  isWearableHead?: boolean
  isWearableAccessory?: boolean
  wearableCategory?: WearableCategory
  wearableGenders?: WearableGender[]
  contractAddress?: string
  itemId?: string
  network?: Network
}

export enum ItemSortBy {
  NAME = 'name',
  NEWEST = 'newest',
  CHEAPEST = 'cheapest',
}

export type ItemFragment = {
  id: string
  price: string
  blockchainId: string
  image: string
  rarity: Rarity
  available: string
  collection: {
    id: string
    creator: string
  }
  metadata: {
    wearable: {
      name: string
      description: string
      category: WearableCategory
    }
  }
  searchWearableBodyShapes: BodyShape[]
  searchIsStoreMinter: boolean
  createdAt: string
  updatedAt: string
}

export interface IItemsComponent {
  fetch(filters: ItemFilters): Promise<Item[]>
  count(filters: ItemFilters): Promise<number>
}
