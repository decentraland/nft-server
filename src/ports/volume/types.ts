import { Network } from '@dcl/schemas'

export type VolumeData = {
  id: string
  date: number
  dailySales: number
  dailyVolumeMANA: string
  dailyCreatorsEarnings: string
  dailyDAOEarnings: string
}

export type MarketplaceVolumeData = {
  id: string
  date: number
  dailySales: number
  dailyVolumeMANA: string
  dailyCreatorsEarnings: string
  dailyDAOEarnings: string
}

export type CollectionsVolumeData = {
  id: string
  date: number
  dailySales: number
  dailyVolumeMANA: string
  dailyCreatorsEarnings: string
  dailyDAOEarnings: string
}

export type VolumeFilters = {
  from?: number
  network?: Network
}

export enum VolumeSortBy {
  DATE = 'date',
  MOST_SALES = 'most_sales',
}

export interface IVolumeComponent {
  fetch(filters: VolumeFilters): Promise<VolumeData[]>
  count(filters: VolumeFilters): Promise<number>
}

export type VolumeFragment = {
  id: string
  date: number
  dailySales: number
  dailyVolumeMANA: string
  dailyCreatorsEarnings: string
  dailyDAOEarnings: string
}
