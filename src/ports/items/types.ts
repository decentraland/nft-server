import {
  BodyShape,
  Item,
  ItemFilters,
  Rarity,
  WearableCategory,
} from '@dcl/schemas'

export enum FragmentItemType {
  WEARABLE_V1 = 'wearable_v1',
  WEARABLE_V2 = 'wearable_v2',
  SMART_WEARABLE_V1 = 'smart_wearable_v1',
}

export type ItemFragment = {
  id: string
  price: string
  blockchainId: string
  image: string
  rarity: Rarity
  available: string
  itemType: FragmentItemType
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
  beneficiary: string
}

export interface IItemsComponent {
  fetch(filters: ItemFilters): Promise<Item[]>
  count(filters: ItemFilters): Promise<number>
}
