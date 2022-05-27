import {
  AnalyticsDayDataFilters,
  AnalyticsDayData,
  AnalyticsDayDataSortBy,
} from '@dcl/schemas'
import { getAccumulatedAnalyticsData } from '../../logic/rankings'
import { AnalyticsTimeframe } from '../analyticsDayData/types'
import { getTimestampFromTimeframe } from '../analyticsDayData/utils'
import { IMergerComponent } from '../merger/types'
import { IRankingsComponent } from './types'

export function createRankingsComponent(
  analyticsDataComponent: IMergerComponent<
    AnalyticsDayData,
    AnalyticsDayDataFilters,
    AnalyticsDayDataSortBy
  >
): IRankingsComponent {
  async function fetch(timeframe: AnalyticsTimeframe) {
    return getAccumulatedAnalyticsData(
      await analyticsDataComponent.fetch({
        from: getTimestampFromTimeframe(timeframe as AnalyticsTimeframe),
      })
    )
  }

  return {
    fetch,
  }
}
