import { ChainId, Network } from '@dcl/schemas'
import { ISubgraphComponent } from '../subgraph/types'
import { BidFragment, BidFilters, IBidsComponent } from './types'
import { fromBidFragment, getBidsQuery } from './utils'

export function createBidsComponent(options: {
  subgraph: ISubgraphComponent
  network: Network
  chainId: ChainId
}): IBidsComponent {
  const { subgraph, network, chainId } = options

  async function fetch(filters: BidFilters) {
    if (options.network && options.network !== network) {
      return []
    }

    const query = getBidsQuery(filters)
    const { bids: fragments } = await subgraph.query<{
      bids: BidFragment[]
    }>(query)

    const bids = fragments.map((fragment) =>
      fromBidFragment(fragment, network, chainId)
    )

    return bids
  }

  async function count(filters: BidFilters) {
    if (options.network && options.network !== network) {
      return 0
    }

    const query = getBidsQuery(filters, true)
    const { bids: fragments } = await subgraph.query<{
      bids: BidFragment[]
    }>(query)

    return fragments.length
  }

  return {
    fetch,
    count,
  }
}
