import { ISubgraphComponent } from '../subgraph/types'
import { BidFragment, BidOptions, IBidsComponent } from './types'
import { fromBidFragment, getBidsQuery } from './utils'

export function createBidsComponent(options: {
  subgraph: ISubgraphComponent
}): IBidsComponent {
  const { subgraph } = options

  async function fetch(options: BidOptions) {
    const { nftId, bidder, seller, status } = options
    const where: string[] = [`expiresAt_gt: "${Date.now()}"`]
    if (nftId) {
      where.push(`nft: "${nftId}"`)
    }
    if (bidder) {
      where.push(`bidder: "${bidder}"`)
    }
    if (seller) {
      where.push(`seller: "${seller}"`)
    }
    if (status) {
      where.push(`status: ${status}`)
    }

    const query = getBidsQuery(where)
    const { bids: fragments } = await subgraph.query<{
      bids: BidFragment[]
    }>(query)

    const bids = fragments.map(fromBidFragment)
    return bids
  }

  return {
    fetch,
  }
}
