import { AnalyticsDayData } from '@dcl/schemas'
import { AnalyticsTimeframe } from '../analyticsDayData/types'

export type RankingData = Pick<
  AnalyticsDayData,
  'sales' | 'volume' | 'creatorsEarnings' | 'daoEarnings'
>

export interface IRankingsComponent {
  fetch(timeframe: AnalyticsTimeframe): Promise<RankingData>
}
