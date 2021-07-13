import { ChainId, Network } from '@dcl/schemas'
import { Order } from '../orders/types'

export enum NFTCategory {
  PARCEL = 'parcel',
  ESTATE = 'estate',
  WEARABLE = 'wearable',
  ENS = 'ens',
}

export enum WearableGender {
  MALE = 'male',
  FEMALE = 'female',
}

export enum WearableCategory {
  EYEBROWS = 'eyebrows',
  EYES = 'eyes',
  FACIAL_HAIR = 'facial_hair',
  HAIR = 'hair',
  MOUTH = 'mouth',
  UPPER_BODY = 'upper_body',
  LOWER_BODY = 'lower_body',
  FEET = 'feet',
  EARRING = 'earring',
  EYEWEAR = 'eyewear',
  HAT = 'hat',
  HELMET = 'helmet',
  MASK = 'mask',
  TIARA = 'tiara',
  TOP_HEAD = 'top_head',
}

export enum WearableRarity {
  UNIQUE = 'unique',
  MYTHIC = 'mythic',
  LEGENDARY = 'legendary',
  EPIC = 'epic',
  RARE = 'rare',
  UNCOMMON = 'uncommon',
  COMMON = 'common',
}

export type ParcelData = {
  x: string
  y: string
  description: string | null
  estate: {
    tokenId: string
    name: string
  } | null
}

export type EstateData = {
  size: number
  parcels: { x: number; y: number }[]
  description: string | null
}

export enum BodyShape {
  MALE = 'BaseMale',
  FEMALE = 'BaseFemale',
}

export type WearableData = {
  description: string
  category: WearableCategory
  rarity: WearableRarity
  bodyShapes: BodyShape[]
}

export type EnsData = {
  subdomain: string
}

export type Data = {
  parcel?: ParcelData
  estate?: EstateData
  wearable?: WearableData
  ens?: EnsData
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
  wearableRarities?: WearableRarity[]
  wearableGenders?: WearableGender[]
  contractAddresses?: string[]
  tokenId?: string
  network?: Network
}

export enum NFTSortBy {
  NAME = 'name',
  NEWEST = 'newest',
  RECENTLY_LISTED = 'recently_listed',
  CHEAPEST = 'cheapest',
}

export type NFT = {
  id: string
  contractAddress: string
  tokenId: string
  activeOrderId: string | null
  owner: string
  name: string
  category: NFTCategory
  image: string
  url: string
  issuedId: string | null
  itemBlockchainId: string | null
  network: Network
  chainId: ChainId
  data: Data
  createdAt: number
  updatedAt: number
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
