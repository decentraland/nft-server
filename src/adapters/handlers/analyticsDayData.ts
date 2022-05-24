import { IHttpServerComponent } from '@well-known-components/interfaces'
import { Params } from '../../logic/http/params'
import { asJSON } from '../../logic/http/response'
import { AppComponents, Context } from '../../types'

export function createAnalyticsDayDataHandler(
  components: Pick<AppComponents, 'analyticsDayData'>
): IHttpServerComponent.IRequestHandler<Context<'/analytics/day'>> {
  const { analyticsDayData } = components

  return async (context) => {
    const params = new Params(context.url.searchParams)
    const from = params.getNumber('from')

    return asJSON(() => analyticsDayData.fetch({ from }))
  }
}
