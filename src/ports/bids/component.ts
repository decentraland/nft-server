import { BidFilters, ChainId } from '@dcl/schemas'
import { ISubgraphComponent } from '@well-known-components/thegraph-component'
import { AssetsNetworks } from '../../types'
import { BidFragment, IBidsComponent } from './types'
import { fromBidFragment, getBidsQuery } from './utils'

export function createBidsComponent(options: {
  subgraph: ISubgraphComponent
  network: AssetsNetworks
  chainId: ChainId
}): IBidsComponent {
  const { subgraph, network, chainId } = options

  async function fetch(filters: BidFilters) {
    if (filters.network && filters.network !== network) {
      return []
    }

    const query = getBidsQuery({ ...filters, network })
    const { bids: fragments } = await subgraph.query<{
      bids: BidFragment[]
    }>(query)

    const bids = fragments.map((fragment) =>
      fromBidFragment(fragment, network, chainId)
    )

    return bids
  }

  async function count(filters: BidFilters) {
    if (filters.network && filters.network !== network) {
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
