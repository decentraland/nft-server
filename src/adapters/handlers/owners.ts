import { IHttpServerComponent } from '@well-known-components/interfaces'
import { AppComponents, Context } from '../../types'
import { Params } from '../../logic/http/params'
import { asJSON } from '../../logic/http/response'
import { OwnersSortBy } from '../../ports/owner/types'
import { Network } from '@dcl/schemas'

export function createOwnersHandler(
  components: Pick<AppComponents, 'logs' | 'owners'>
): IHttpServerComponent.IRequestHandler<Context<'/owners'>> {
  const { owners } = components
  return async (context) => {
    const params = new Params(context.url.searchParams)

    const contractAddress = params.getAddress('contractAddress')
    const itemId = params.getNumber('itemId')
    const network = params.getValue<Network>('network', Network)

    const sortBy = params.getValue<OwnersSortBy>('sortBy', OwnersSortBy)

    return asJSON(() =>
      owners.fetch({ contractAddress, itemId, network, sortBy })
    )
  }
}
