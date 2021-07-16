import {
  Network,
  NFT,
  NFTCategory,
  Order,
  Rarity,
  WearableCategory,
} from '@dcl/schemas'

export enum WearableGender {
  MALE = 'male',
  FEMALE = 'female',
}

export type NFTFilters = {
  first?: number
  skip?: number
  sortBy?: NFTSortBy
  category?: NFTCategory
  owner?: string
  isOnSale?: boolean
  search?: string
  isLand?: boolean
  isWearableHead?: boolean
  isWearableAccessory?: boolean
  wearableCategory?: WearableCategory
  wearableRarities?: Rarity[]
  wearableGenders?: WearableGender[]
  contractAddresses?: string[]
  tokenId?: string
  itemId?: string
  network?: Network
}

export enum NFTSortBy {
  NAME = 'name',
  NEWEST = 'newest',
  RECENTLY_LISTED = 'recently_listed',
  CHEAPEST = 'cheapest',
}

export type NFTResult = {
  nft: NFT
  order: Order | null
}

export type QueryVariables = Omit<NFTFilters, 'sortBy'> & {
  orderBy: string
  orderDirection: 'asc' | 'desc'
  expiresAt: string
}

export interface INFTsComponent {
  fetch(filters: NFTFilters): Promise<NFTResult[]>
  count(filters: NFTFilters): Promise<number>
}
