import { Network, Rarity, WearableCategory } from '@dcl/schemas'
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

export type RankingItem = {
  id: string
  sales: number
  volume: string
}

export interface IItemsDayDataComponent {
  fetch(
    filters: FetchOptions<RankingsFilters, RankingsSortBy>
  ): Promise<RankingItem[]>
  count(filters: RankingsFilters): Promise<number>
}

export type ItemsDayDataFragment = {
  id: string
  sales: number
  volume: string
}
