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
