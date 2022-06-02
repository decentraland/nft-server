import { Network, Rarity, WearableCategory } from '@dcl/schemas'

export enum ItemsDayDataSortBy {
  MOST_VOLUME = 'most_volume',
  MOST_SALES = 'most_sales',
}

export type ItemsDayDataFilters = {
  from: number
  rarity?: Rarity
  category?: WearableCategory
  network?: Network
  sortBy?: ItemsDayDataSortBy
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
  fetch(filters: ItemsDayDataFilters): Promise<RankingItem[]>
  count(filters: ItemsDayDataFilters): Promise<number>
}

export type ItemsDayDataFragment = {
  id: string
  sales: number
  volume: string
}
