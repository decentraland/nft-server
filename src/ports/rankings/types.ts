import { Account, Network, Rarity, WearableCategory } from '@dcl/schemas'
import { FetchOptions } from '../merger/types'

export enum RankingsSortBy {
  MOST_VOLUME = 'most_volume',
  MOST_SALES = 'most_sales',
}

export type RankingsFilters = {
  from: number
  first?: number
  rarity?: Rarity
  category?: WearableCategory
  network?: Network
  sortBy?: RankingsSortBy
}

export enum ItemsDayDataTimeframe {
  DAY = 'day',
  WEEK = 'week',
  MONTH = 'month',
  ALL = 'all',
}

export type ItemsDayDataFragment = {
  id: string
  sales: number
  volume: string
}

export type CreatorsDayDataFragment = {
  id: string
  sales: number
  earned: string
  collections: number
  uniqueCollectorsTotal: number
}

export type CollectorsDayDataFragment = {
  id: string
  purchases: number
  spent: string
  uniqueAndMythicItems: string[]
  creatorsSupportedTotal: number
}

export type RankingFragment =
  | ItemsDayDataFragment
  | CreatorsDayDataFragment
  | CollectorsDayDataFragment

export type ItemRank = ItemsDayDataFragment

export type CreatorRank = Pick<Account, 'id'> & {
  sales: number
  earned: string
  collections: number
  uniqueCollectors: number
}
export type CollectorRank = Pick<Account, 'id'> & {
  uniqueAndMythicItems: number
  purchases: number
  spent: string
  creatorsSupported: number
}

export type RankingEntityResponse = ItemRank | CreatorRank | CollectorRank

export enum RankingEntity {
  ITEMS = 'items',
  CREATORS = 'creators',
  COLLECTORS = 'collectors',
}

export interface IItemsDayDataComponent {
  fetch(
    entity: RankingEntity,
    filters: FetchOptions<RankingsFilters, RankingsSortBy>
  ): Promise<RankingEntityResponse[]>
  count(entity: RankingEntity, filters: RankingsFilters): Promise<number>
}
