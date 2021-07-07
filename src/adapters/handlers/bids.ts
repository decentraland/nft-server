import { Network } from '@dcl/schemas'
import { IHttpServerComponent } from '@well-known-components/interfaces'
import { Params } from '../../logic/params'
import { BidOptions, BidStatus } from '../../ports/bids/types'
import { AppComponents, Context } from '../../types'

export function createBidsHandler(
  components: Pick<AppComponents, 'logs' | 'bids'>
): IHttpServerComponent.IRequestHandler<Context<'/bids'>> {
  const { bids } = components

  return async (context) => {
    const params = new Params(context.url.searchParams)

    const bidder = params.getAddress('bidder')
    const seller = params.getAddress('seller')
    const contractAddress = params.getAddress('contractAddress')
    const tokenId = params.getString('tokenId')
    const status = params.getValue<BidStatus>('status', BidStatus)
    const network = params.getValue<Network>('status', Network)

    const options: BidOptions = {
      bidder,
      seller,
      contractAddress,
      tokenId,
      status,
      network,
    }

    try {
      const result = await bids.fetch(options)
      return {
        status: 200,
        body: result,
      }
    } catch (error) {
      return {
        status: 500,
        body: error.message,
      }
    }
  }
}
