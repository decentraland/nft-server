import { IHttpServerComponent } from '@well-known-components/interfaces'
import { Params } from '../../logic/http/params'
import { asJSON } from '../../logic/http/response'
import { AssetType, PriceFilterCategory } from '../../ports/prices/types'
import { AppComponents, Context } from '../../types'

const MAX_AGE = 60000 * 60 * 24 // 1 DAY

export function createPricesHandler(
  components: Pick<AppComponents, 'prices'>
): IHttpServerComponent.IRequestHandler<Context<'/prices'>> {
  const { prices } = components

  return async (context) => {
    const params = new Params(context.url.searchParams)
    const responseHeaders = {
      'Cache-Control': `public,max-age=${MAX_AGE},s-maxage=${MAX_AGE}`,
    }
    const category = params.getString('category') as PriceFilterCategory
    const assetType = params.getString('assetType') as AssetType

    return asJSON(
      async () => ({
        data: await prices.fetch({ category, assetType }),
      }),
      responseHeaders
    )
  }
}
