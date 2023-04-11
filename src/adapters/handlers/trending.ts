import { IHttpServerComponent } from '@well-known-components/interfaces'
import { Params } from '../../logic/http/params'
import { asJSON } from '../../logic/http/response'
import { AppComponents, AuthenticatedContext } from '../../types'

export function createTrendingHandler(
  components: Pick<AppComponents, 'trendings'>
): IHttpServerComponent.IRequestHandler<AuthenticatedContext<'/trendings'>> {
  const { trendings } = components

  return async (context) => {
    const params = new Params(context.url.searchParams)

    const responseHeaders = {
      'Cache-Control': 'public,max-age=3600,s-maxage=3600',
    }

    const size = params.getNumber('size')

    const pickedBy: string | undefined =
      context.verification?.auth.toLowerCase()

    return asJSON(
      async () => ({
        data: await trendings.fetch({ size, pickedBy }),
      }),
      responseHeaders
    )
  }
}
