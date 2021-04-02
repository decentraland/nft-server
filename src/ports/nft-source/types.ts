import { Network } from '@dcl/schemas'
import { DocumentNode } from 'apollo-link'
import { ISubgraphComponent } from '../subgraph/types'

export enum SortBy {
  NAME = 'name',
  BIRTH = 'birth',
  RECENTLY_LISTED = 'recently_listed',
  PRICE = 'price',
}

export const DEFAULT_SORT_BY = SortBy.BIRTH

export enum OrderDirection {
  ASC = 'asc',
  DESC = 'desc',
}

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

export type Options = {
  first: number
  skip: number
  sortBy?: SortBy
  category?: NFTCategory
  address?: string
  isOnSale?: boolean
  search?: string
  isLand?: boolean
  isWearableHead?: boolean
  isWearableAccessory?: boolean
  wearableCategory?: WearableCategory
  wearableRarities?: WearableRarity[]
  wearableGenders?: WearableGender[]
  contracts?: string[]
  network?: Network
}

export type Variables = Omit<Options, 'sortBy'> & {
  orderBy: string
  orderDirection: OrderDirection
  expiresAt: string
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
  network: Network
  data: Data
}

export enum OrderStatus {
  OPEN = 'open',
  SOLD = 'sold',
  CANCELLED = 'cancelled',
}

export type Order = {
  id: string
  nftId: string
  category: NFTCategory
  nftAddress: string
  owner: string
  buyer: string | null
  price: string
  status: OrderStatus
  expiresAt: number
  createdAt: number
  updatedAt: number
}

export type SourceResult = {
  nft: NFT
  order: Order | null
  sort: {
    [SortBy.BIRTH]: number | null
    [SortBy.NAME]: string
    [SortBy.PRICE]: number | null
    [SortBy.RECENTLY_LISTED]: number | null
  }
}

export interface ISourceComponent {
  fetch(options: Options): Promise<SourceResult[]>
  count(options: Options): Promise<number>
}

export type SourceOptions<T> = {
  subgraph: ISubgraphComponent
  fragmentName: string
  getFragment: () => DocumentNode
  fromFragment(fragment: T): SourceResult
  getOrderBy(sortBy?: SortBy): keyof T
  getExtraVariables?: (options: Options) => string[]
  getExtraWhere?: (options: Options) => string[]
}
