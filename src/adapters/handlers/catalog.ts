import etag from 'etag'
import { IHttpServerComponent } from '@well-known-components/interfaces'
import { Params } from '../../logic/http/params'
import { asJSON } from '../../logic/http/response'
import { PriceFilterCategory } from '../../ports/prices/types'
import { AppComponents, Context } from '../../types'

const MAX_AGE = 86400 // 1 DAY

export function createCatalogHandler(
  components: Pick<AppComponents, 'catalog'>
): IHttpServerComponent.IRequestHandler<Context<'/catalog'>> {
  const { catalog } = components

  return async (context) => {
    const params = new Params(context.url.searchParams)
    const category = params.getString('category') as PriceFilterCategory

    return asJSON(
      async () => ({
        data: await catalog.fetch({}, {}),
      }),
      {
        'Cache-Control': `public,max-age=${MAX_AGE},s-maxage=${MAX_AGE}`,
        'Content-Type': 'application/json',
        'Last-Modified': new Date().toUTCString(),
      },
      (data: any) => {
        const dataString = JSON.stringify(data)
        return {
          ETag: etag(dataString),
          'content-length': dataString.length.toString(),
        }
      }
    )
  }
}
