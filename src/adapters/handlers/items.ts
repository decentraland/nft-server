import { ItemSortBy } from '@dcl/schemas'
import { IHttpServerComponent } from '@well-known-components/interfaces'
import { AppComponents, AuthenticatedContext } from '../../types'
import { Params } from '../../logic/http/params'
import { HttpError, asJSON } from '../../logic/http/response'
import { getItemsParams } from './utils'

export function createItemsHandler(
  components: Pick<AppComponents, 'items'>
): IHttpServerComponent.IRequestHandler<AuthenticatedContext<'/items'>> {
  const { items } = components
  return async (context) => {
    const params = new Params(context.url.searchParams)
    const first = params.getNumber('first')
    const skip = params.getNumber('skip')
    const sortBy = params.getValue<ItemSortBy>('sortBy', ItemSortBy)
    const { ids, contractAddresses, itemId, urns, ...restOfFilters } =
      getItemsParams(params)
    const pickedBy: string | undefined =
      context.verification?.auth.toLowerCase()

    return asJSON(() => {
      if (
        ids?.length > 0 &&
        (contractAddresses?.length > 0 || itemId || urns?.length > 0)
      ) {
        throw new HttpError(
          'Ids cannot be set with contractAddress, itemId, or urn.',
          400
        )
      }

      return items.fetchAndCount({
        first,
        skip,
        sortBy,
        ids,
        urns,
        contractAddresses,
        itemId,
        pickedBy,
        ...restOfFilters,
      })
    })
  }
}
