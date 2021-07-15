import { ListingStatus, Network } from '@dcl/schemas'
import { IHttpServerComponent } from '@well-known-components/interfaces'
import { Params } from '../../logic/http/params'
import { json } from '../../logic/http/response'
import { BidSortBy } from '../../ports/bids/types'
import { AppComponents, Context } from '../../types'

export function createBidsHandler(
  components: Pick<AppComponents, 'logs' | 'bids'>
): IHttpServerComponent.IRequestHandler<Context<'/bids'>> {
  const { bids } = components

  return async (context) => {
    const params = new Params(context.url.searchParams)

    const first = params.getNumber('first')
    const skip = params.getNumber('skip')
    const sortBy = params.getValue<BidSortBy>('sortBy', BidSortBy)
    const bidder = params.getAddress('bidder')
    const seller = params.getAddress('seller')
    const contractAddress = params.getAddress('contractAddress')
    const tokenId = params.getString('tokenId')
    const status = params.getValue<ListingStatus>('status', ListingStatus)
    const network = params.getValue<Network>('network', Network)

    return json(() =>
      bids.fetchAndCount({
        first,
        skip,
        sortBy,
        bidder,
        seller,
        contractAddress,
        tokenId,
        status,
        network,
      })
    )
  }
}
