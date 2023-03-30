import { IHttpServerComponent } from '@well-known-components/interfaces'
import { asJSON } from '../../logic/http/response'
import { AnalyticsTimeframe } from '../../ports/analyticsDayData/types'
import { AppComponents, Context } from '../../types'

export function createCatalogHandler(
  components: Pick<AppComponents, 'catalog'>
): IHttpServerComponent.IRequestHandler<Context<'/catalog'>> {
  const { catalog } = components

  return async (context) => {
    // const { timeframe } = context.params

    return asJSON(async () => ({
      data: await catalog.fetch({}),
    }))
  }
}
