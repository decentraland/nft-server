import { AnalyticsDayData, AnalyticsDayDataFilters } from '@dcl/schemas'

export interface IAnalyticsDayDataComponent {
  fetch(filters: AnalyticsDayDataFilters): Promise<AnalyticsDayData[]>
  count(filters: AnalyticsDayDataFilters): Promise<number>
}

export type AnalyticsDayDataFragment = Pick<
  AnalyticsDayData,
  'id' | 'date' | 'sales' | 'volume' | 'creatorsEarnings' | 'daoEarnings'
>
