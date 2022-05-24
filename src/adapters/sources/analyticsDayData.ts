import {
  AnalyticsDayData,
  AnalyticsDayDataFilters,
  AnalyticsDayDataSortBy,
} from '@dcl/schemas'
import { FetchOptions, IMergerComponent } from '../../ports/merger/types'
import { IAnalyticsDayDataComponent } from '../../ports/analyticsDayData/types'

export function createAnalyticsDayDataSource(
  analytics: IAnalyticsDayDataComponent
): IMergerComponent.Source<
  AnalyticsDayData,
  AnalyticsDayDataFilters,
  AnalyticsDayDataSortBy
> {
  async function fetch(
    filters: FetchOptions<AnalyticsDayDataFilters, AnalyticsDayDataSortBy>
  ) {
    const results = await analytics.fetch(filters)
    return results.map((result) => ({
      result,
      sort: {
        [AnalyticsDayDataSortBy.DATE]: result.date,
        [AnalyticsDayDataSortBy.MOST_SALES]: result.sales,
      },
    }))
  }

  async function count(
    filters: FetchOptions<AnalyticsDayDataFilters, AnalyticsDayDataSortBy>
  ) {
    const total = await analytics.count(filters)
    return total
  }

  return {
    fetch,
    count,
  }
}
