import { IHttpServerComponent } from '@well-known-components/interfaces'
import { CatalogSortBy, CatalogSortDirection } from '@dcl/schemas'
import { asJSON } from '../../logic/http/response'
import { Params } from '../../logic/http/params'
import { getPaginationParams } from '../../logic/http/pagination'
import { AppComponents, AuthenticatedContext } from '../../types'
import { getItemsParams } from './utils'

export function createCatalogHandler(
  components: Pick<AppComponents, 'catalog'>
): IHttpServerComponent.IRequestHandler<AuthenticatedContext<'/catalog'>> {
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
    const pickedBy: string | undefined =
      context.verification?.auth.toLowerCase()

    return asJSON(async () => ({
      data: await catalog.fetch({
        limit,
        offset,
        sortBy,
        sortDirection,
        onlyListing,
        onlyMinting,
        pickedBy,
        ...getItemsParams(params),
      }),
    }))
  }
}
