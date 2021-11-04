import { Network } from '@dcl/schemas'
import { IHttpServerComponent } from '@well-known-components/interfaces'
import { Params } from '../../logic/http/params'
import { asJSON } from '../../logic/http/response'
import { CollectionSortBy } from '../../ports/collections/types'
import { AppComponents, Context } from '../../types'

export function createCollectionsHandler(
  components: Pick<AppComponents, 'logs' | 'collections'>
): IHttpServerComponent.IRequestHandler<Context<'/collections'>> {
  const { collections } = components

  return async (context) => {
    const params = new Params(context.url.searchParams)

    const first = params.getNumber('first')
    const skip = params.getNumber('skip')
    const sortBy = params.getValue<CollectionSortBy>('sortBy', CollectionSortBy)
    const creator = params.getAddress('creator')
    const urn = params.getString('urn')
    const contractAddress = params.getAddress('contractAddress')
    const isOnSale = params.getBoolean('isOnSale')
    const network = params.getValue<Network>('network', Network)

    return asJSON(() =>
      collections.fetchAndCount({
        first,
        skip,
        sortBy,
        creator,
        urn,
        contractAddress,
        isOnSale,
        network,
      })
    )
  }
}
