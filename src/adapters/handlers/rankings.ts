import { IHttpServerComponent } from '@well-known-components/interfaces'
import { asJSON } from '../../logic/http/response'
import { getAccumulatedAnalyticsData } from '../../logic/rankings'
import { AnalyticsTimeframe } from '../../ports/analyticsDayData/types'
import { getTimestampFromTimeframe } from '../../ports/analyticsDayData/utils'
import { AppComponents, Context } from '../../types'

export function createRankingsHandler(
  components: Pick<AppComponents, 'analyticsData'>
): IHttpServerComponent.IRequestHandler<Context<'/rankings/:timeframe'>> {
  const { analyticsData } = components

  return async (context) => {
    const { timeframe } = context.params

    return asJSON(async () => ({
      data: getAccumulatedAnalyticsData(
        await analyticsData.fetch({
          from: getTimestampFromTimeframe(timeframe as AnalyticsTimeframe),
        })
      ),
    }))
  }
}
