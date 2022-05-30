import { IHttpServerComponent } from '@well-known-components/interfaces'
import { asJSON } from '../../logic/http/response'
import { AnalyticsTimeframe } from '../../ports/analyticsDayData/types'
import { AppComponents, Context } from '../../types'

export function createRankingsHandler(
  components: Pick<AppComponents, 'rankings'>
): IHttpServerComponent.IRequestHandler<Context<'/rankings/:timeframe'>> {
  const { rankings } = components

  return async (context) => {
    const { timeframe } = context.params

    return asJSON(async () => ({
      data: await rankings.fetch(timeframe as AnalyticsTimeframe),
    }))
  }
}
