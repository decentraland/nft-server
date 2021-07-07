import { Network } from '@dcl/schemas'
import { IHttpServerComponent } from '@well-known-components/interfaces'
import { OrderSortBy, OrderStatus } from '../../ports/orders/types'
import { AppComponents, Context } from '../../types'
import { Params } from '../../logic/params'
import { json } from '../../logic/response'

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
    const contractAddress = params.getAddress('contractAddress')
    const tokenId = params.getString('tokenId')
    const status = params.getValue<OrderStatus>('status', OrderStatus)
    const network = params.getValue<Network>('network', Network)

    const options = {
      first,
      skip,
      sortBy,
      owner,
      buyer,
      contractAddress,
      tokenId,
      status,
      network,
    }

    return json(() => orders.fetch(options))
  }
}
