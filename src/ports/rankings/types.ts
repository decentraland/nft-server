import { Network, Rarity, WearableCategory } from '@dcl/schemas'

export enum ItemsDayDataSortBy {
  MOST_EXPENSIVE = 'most_expensive',
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
  itemId: string
  sales: number
  volume: string
}

export interface IItemsDayDataComponent {
  fetch(filters: ItemsDayDataFilters): Promise<RankingItem[]>
  count(filters: ItemsDayDataFilters): Promise<number>
}

export type ItemsDayDataFragment = {
  id: string
  date: number
  sales: number
  volume: string
  searchWearableCategory: string
  searchWearableRarity: string
}
