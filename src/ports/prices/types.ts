import { NFTCategory, NFTFilters } from '@dcl/schemas'

export enum AssetType {
  NFT = 'nft',
  ITEM = 'item',
}

export enum PriceFilterExtraOption {
  LAND = 'land',
}

export type PriceFilterCategory = NFTCategory | PriceFilterExtraOption

export type PriceFilters = {
  category: PriceFilterCategory
  assetType?: AssetType
} & Pick<
  NFTFilters,
  | 'isWearableHead'
  | 'isWearableAccessory'
  | 'isWearableSmart'
  | 'wearableCategory'
  | 'wearableGenders'
  | 'emoteCategory'
  | 'emoteGenders'
  | 'emotePlayMode'
  | 'contractAddresses'
  | 'itemRarities'
  | 'network'
  | 'adjacentToRoad'
  | 'minDistanceToPlaza'
  | 'maxDistanceToPlaza'
  | 'minEstateSize'
  | 'maxEstateSize'
>

export type PriceFragment = {
  price: string
  id: string
}

export enum PriceSortBy {
  PRICE = 'price',
}

export type PricesResponse = Record<string, number>

export interface IPricesComponent {
  fetch(filters: PriceFilters): Promise<PriceFragment[]>
  // fetch(filters: PriceFilters): Promise<PricesResponse>
  count(filters: PriceFilters): Promise<number>
}
export interface IProcessedPricesComponent {
  fetch(filters: PriceFilters): Promise<PricesResponse>
}
