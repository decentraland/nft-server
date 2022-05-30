import { IHttpServerComponent } from '@well-known-components/interfaces'
import { asJSON } from '../../logic/http/response'
import { AnalyticsTimeframe } from '../../ports/analyticsDayData/types'
import { getTimestampFromTimeframe } from '../../ports/analyticsDayData/utils'
import { AppComponents, Context } from '../../types'

export function createAnalyticsDataHandler(
  components: Pick<AppComponents, 'analyticsData'>
): IHttpServerComponent.IRequestHandler<Context<'/analytics/:timeframe'>> {
  const { analyticsData } = components

  return async (context) => {
    const { timeframe } = context.params

    return asJSON(async () => ({
      data: await analyticsData.fetch({
        from: getTimestampFromTimeframe(timeframe as AnalyticsTimeframe),
      }),
    }))
  }
}
