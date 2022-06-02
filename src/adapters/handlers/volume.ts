import { IHttpServerComponent } from '@well-known-components/interfaces'
import { asJSON } from '../../logic/http/response'
import { AnalyticsTimeframe } from '../../ports/analyticsDayData/types'
import { AppComponents, Context } from '../../types'

export function createVolumeHandler(
  components: Pick<AppComponents, 'volumes'>
): IHttpServerComponent.IRequestHandler<Context<'/volume/:timeframe'>> {
  const { volumes } = components

  return async (context) => {
    const { timeframe } = context.params

    return asJSON(async () => ({
      data: await volumes.fetch(timeframe as AnalyticsTimeframe),
    }))
  }
}
