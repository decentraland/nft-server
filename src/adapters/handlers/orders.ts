import { ListingStatus, Network, OrderSortBy } from '@dcl/schemas'
import { IHttpServerComponent } from '@well-known-components/interfaces'
import { AppComponents, Context } from '../../types'
import { Params } from '../../logic/http/params'
import { asJSON, HttpError } from '../../logic/http/response'

export function createOrdersHandler(
  components: Pick<AppComponents, 'orders'>
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
    const itemId = params.getString('itemId')
    const nftName = params.getString('nftName')

    try {
      if (itemId) {
        // Try to parse the itemId as a bigint, if it fails, it means it's not a valid itemId
        BigInt(itemId)
      }
    } catch (error) {
      throw new HttpError('Invalid itemId', 400)
    }

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
        itemId,
        nftName,
      })
    )
  }
}
