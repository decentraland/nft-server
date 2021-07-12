import { ChainId, Network } from '@dcl/schemas'
import {
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
  category?: NFTCategory
  creator?: string
  isOnSale?: boolean
  search?: string
  isLand?: boolean
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
  category: NFTCategory.WEARABLE
  contractAddress: string
  collectionId: string
  blockchainId: string
  rarity: WearableRarity
  price: string
  available: number
  createdAt: number
  creator: string
  data: Data
  network: Network
  chainId: ChainId
}

export type QueryVariables = Omit<ItemFilters, 'sortBy'> & {
  orderBy: string
  orderDirection: 'asc' | 'desc'
  expiresAt: string
}

export interface INFTComponent {
  fetch(filters: ItemFilters): Promise<Item[]>
  count(filters: ItemFilters): Promise<number>
}
