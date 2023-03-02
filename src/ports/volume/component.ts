import {
  AnalyticsDayDataFilters,
  AnalyticsDayData,
  AnalyticsDayDataSortBy,
} from '@dcl/schemas'
import { getAccumulatedAnalyticsData } from '../../logic/volume'
import { AnalyticsTimeframe } from '../analyticsDayData/types'
import { getTimestampFromTimeframe } from '../analyticsDayData/utils'
import { IMergerComponent } from '../merger/types'
import { IVolumeComponent } from './types'

export function createVolumeComponent(
  analyticsDataComponent: IMergerComponent<
    AnalyticsDayData,
    AnalyticsDayDataFilters,
    AnalyticsDayDataSortBy
  >
): IVolumeComponent {
  async function fetch(timeframe: AnalyticsTimeframe) {
    return getAccumulatedAnalyticsData(
      await analyticsDataComponent.fetch({
        from: getTimestampFromTimeframe(timeframe as AnalyticsTimeframe),
        first: 0,
      })
    )
  }

  return {
    fetch,
  }
}
