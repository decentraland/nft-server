import { AnalyticsDayData, AnalyticsDayDataFilters } from '@dcl/schemas'

export enum AnalyticsTimeframe {
  DAY = 'day',
  WEEK = 'week',
  MONTH = 'month',
  ALL = 'all',
}

export interface IAnalyticsDayDataComponent {
  fetch(filters: AnalyticsDayDataFilters): Promise<AnalyticsDayData[]>
  count(filters: AnalyticsDayDataFilters): Promise<number>
}

export type AnalyticsDayDataFragment = {
  id: string
  date: number
  sales: number
  volume: string
  creatorsEarnings: string
  daoEarnings: string
}

export type RentalsAnalyticsDayDataFragment = {
  id: string
  date: number
  volume: string
  lessorEarnings: string
  feeCollectorEarnings: string
}
