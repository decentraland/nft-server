import { IHttpServerComponent } from '@well-known-components/interfaces'
import { Params } from '../../logic/http/params'
import { asJSON } from '../../logic/http/response'
import { AppComponents, Context } from '../../types'

export function createTrendingHandler(
  components: Pick<AppComponents, 'trendings'>
): IHttpServerComponent.IRequestHandler<Context<'/trendings'>> {
  const { trendings } = components

  return async (context) => {
    const params = new Params(context.url.searchParams)

    const size = params.getNumber('size')

    return asJSON(async () => ({
      data: await trendings.fetch({ size }),
    }))
  }
}
