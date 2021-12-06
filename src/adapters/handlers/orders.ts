import { ListingStatus, Network, OrderSortBy } from '@dcl/schemas'
import { IHttpServerComponent } from '@well-known-components/interfaces'
import { AppComponents, Context } from '../../types'
import { Params } from '../../logic/http/params'
import { asJSON } from '../../logic/http/response'

export function createOrdersHandler(
  components: Pick<AppComponents, 'logs' | 'orders'>
): IHttpServerComponent.IRequestHandler<Context<'/orders'>> {
  const { orders } = components
  return async (context) => {
    const params = new Params(context.url.searchParams)

    const first = params.getNumber('first')
    const skip = params.getNumber('skip')
    const sortBy = params.getValue<OrderSortBy>('sortBy', OrderSortBy)
    const owner = params.getAddress('owner')
    const buyer = params.getAddress('buyer')
    const marketplaceAddress = params.getAddress('marketplaceAddress')
    const contractAddress = params.getAddress('contractAddress')
    const tokenId = params.getString('tokenId')
    const status = params.getValue<ListingStatus>('status', ListingStatus)
    const network = params.getValue<Network>('network', Network)

    return asJSON(() =>
      orders.fetchAndCount({
        first,
        skip,
        sortBy,
        owner,
        buyer,
        marketplaceAddress,
        contractAddress,
        tokenId,
        status,
        network,
      })
    )
  }
}
