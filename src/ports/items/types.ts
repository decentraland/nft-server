import {
  BodyShape,
  Item,
  ItemFilters,
  Rarity,
  WearableCategory,
} from '@dcl/schemas'

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
  reviewedAt: string
  soldAt: string
}

export interface IItemsComponent {
  fetch(filters: ItemFilters): Promise<Item[]>
  count(filters: ItemFilters): Promise<number>
}
