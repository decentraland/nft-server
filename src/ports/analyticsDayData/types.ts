import { AnalyticsDayData, AnalyticsDayDataFilters } from '@dcl/schemas'

export enum AnalyticsTimeframe {
  DAY = 'day',
  WEEK = 'week',
  MONTH = 'month',
  ALL = 'all',
}

export interface IAnalyticsDayDataComponent {
  fetch(filters: AnalyticsDayDataFilters): Promise<AnalyticsDataFragment[]>
  count(filters: AnalyticsDayDataFilters): Promise<number>
}

export type AnalyticsDataFragment = Pick<
  AnalyticsDayData,
  'id' | 'date' | 'sales' | 'volume' | 'creatorsEarnings' | 'daoEarnings'
>
