import { ChainId, Network } from '@dcl/schemas'
import { Order } from '../orders/types'
import { ISubgraphComponent } from '../subgraph/types'

export enum SortBy {
  NAME = 'name',
  NEWEST = 'newest',
  RECENTLY_LISTED = 'recently_listed',
  CHEAPEST = 'cheapest',
}

export const DEFAULT_SORT_BY = SortBy.NEWEST

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
  estate: {
    tokenId: string,
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
  chainId: ChainId
  data: Data
}

export type Contract = {
  name: string
  address: string
  category: NFTCategory
  network: Network
  chainId: ChainId
}

export type Result = {
  nft: NFT
  order: Order | null
  sort: {
    [SortBy.NEWEST]: number | null
    [SortBy.NAME]: string
    [SortBy.CHEAPEST]: number | null
    [SortBy.RECENTLY_LISTED]: number | null
  }
}

export interface ISourceComponent {
  subgraph: ISubgraphComponent
  hasResults?(options: Options): boolean
  fetch(options: Options): Promise<Result[]>
  count(options: Options): Promise<number>
  getNFT(contractAddress: string, tokenId: string): Promise<Result | null>
  getContracts: () => Promise<Contract[]>
}

export type SourceOptions<T> = {
  subgraph: ISubgraphComponent
  fragmentName: string
  getFragment: () => string
  fromFragment(fragment: T): Result
  getSortByProp(sortBy?: SortBy): keyof T
  getContracts: (subgraph: ISubgraphComponent) => Promise<Contract[]>
  hasResults?(options: Options): boolean
  getExtraVariables?: (options: Options) => string[]
  getExtraWhere?: (options: Options) => string[]
}
