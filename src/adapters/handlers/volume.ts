import { IHttpServerComponent } from '@well-known-components/interfaces'
import { Params } from '../../logic/http/params'
import { asJSON } from '../../logic/http/response'
import { AppComponents, Context } from '../../types'

export function createCollectionsVolumeHandler(
  components: Pick<AppComponents, 'volume'>
): IHttpServerComponent.IRequestHandler<Context<'/volumes'>> {
  const { volume } = components

  return async (context) => {
    const params = new Params(context.url.searchParams)
    const from = params.getNumber('from')

    return asJSON(() => volume.fetch({ from }))
  }
}
