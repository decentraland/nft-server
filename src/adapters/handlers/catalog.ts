import { IHttpServerComponent } from '@well-known-components/interfaces'
import { CatalogSortBy, CatalogSortDirection } from '@dcl/schemas'
import { asJSON } from '../../logic/http/response'
import { Params } from '../../logic/http/params'
import { AppComponents, AuthenticatedContext } from '../../types'
import { getItemsParams } from './utils'

const DEFAULT_PAGE_SIZE = 20

export function createCatalogHandler(
  components: Pick<AppComponents, 'catalog'>
): IHttpServerComponent.IRequestHandler<AuthenticatedContext<'/catalog'>> {
  const { catalog } = components

  return async (context) => {
    const params = new Params(context.url.searchParams)
    const onlyListing = params.getBoolean('onlyListing')
    const onlyMinting = params.getBoolean('onlyMinting')
    const sortBy = params.getValue<CatalogSortBy>('sortBy', CatalogSortBy)
    const sortDirection =
      params.getValue<CatalogSortDirection>(
        'sortDirection',
        CatalogSortDirection
      ) || CatalogSortDirection.ASC

    const limit = params.getNumber('first', DEFAULT_PAGE_SIZE)
    const offset = params.getNumber('skip', 0)
    const pickedBy: string | undefined =
      context.verification?.auth.toLowerCase()

    return asJSON(
      async () =>
        await catalog.fetch({
          limit,
          offset,
          sortBy,
          sortDirection,
          onlyListing,
          onlyMinting,
          pickedBy,
          ...getItemsParams(params),
        })
    )
  }
}
