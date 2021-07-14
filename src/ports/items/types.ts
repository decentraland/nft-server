import { ChainId, Network } from '@dcl/schemas'
import {
  BodyShape,
  Data,
  NFTCategory,
  WearableCategory,
  WearableGender,
  WearableRarity,
} from '../nfts/types'

export type ItemFilters = {
  first?: number
  skip?: number
  sortBy?: ItemSortBy
  creator?: string
  isSoldOut?: boolean
  isOnSale?: boolean
  search?: string
  isWearableHead?: boolean
  isWearableAccessory?: boolean
  wearableCategory?: WearableCategory
  wearableRarities?: WearableRarity[]
  wearableGenders?: WearableGender[]
  contractAddresses?: string[]
  blockchainId?: string
  network?: Network
}

export enum ItemSortBy {
  NAME = 'name',
  NEWEST = 'newest',
  CHEAPEST = 'cheapest',
}

export type Item = {
  id: string
  name: string
  thumbnail: string
  url: string
  category: NFTCategory.WEARABLE
  contractAddress: string
  blockchainId: string
  rarity: WearableRarity
  price: string
  available: number
  creator: string
  createdAt: number
  updatedAt: number
  data: Data
  network: Network
  chainId: ChainId
}

export type ItemFragment = {
  id: string
  price: string
  blockchainId: string
  image: string
  rarity: WearableRarity
  available: string
  collection: {
    id: string
    creator: string
    createdAt: string
    updatedAt: string
  }
  metadata: {
    wearable: {
      name: string
      description: string
      category: WearableCategory
    }
  }
  searchWearableBodyShapes: BodyShape[]
}

export interface IItemsComponent {
  fetch(filters: ItemFilters): Promise<Item[]>
  count(filters: ItemFilters): Promise<number>
}
