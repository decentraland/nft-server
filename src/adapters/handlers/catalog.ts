import { IHttpServerComponent } from '@well-known-components/interfaces'
import { asJSON } from '../../logic/http/response'
import { Params } from '../../logic/http/params'
import { CatalogSortBy, CatalogSortDirection } from '../../ports/catalog/types'
import { getPaginationParams } from '../../logic/http/pagination'
import { AppComponents, Context } from '../../types'
import { getItemsParams } from './utils'

export function createCatalogHandler(
  components: Pick<AppComponents, 'catalog'>
): IHttpServerComponent.IRequestHandler<Context<'/catalog'>> {
  const { catalog } = components

  return async (context) => {
    const params = new Params(context.url.searchParams)
    const onlyListing = params.getBoolean('onlyListing')
    const onlyMinting = params.getBoolean('onlyMinting')
    const sortBy =
      params.getValue<CatalogSortBy>('sortBy', CatalogSortBy) ||
      CatalogSortBy.CHEAPEST
    const sortDirection =
      params.getValue<CatalogSortDirection>(
        'sortDirection',
        CatalogSortDirection
      ) || CatalogSortDirection.ASC

    const { limit, offset } = getPaginationParams(context.url.searchParams)

    return asJSON(async () => ({
      data: await catalog.fetch({
        limit,
        offset,
        sortBy,
        sortDirection,
        onlyListing,
        onlyMinting,
        ...getItemsParams(params),
      }),
    }))
  }
}
