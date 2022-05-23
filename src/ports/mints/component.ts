import { ChainId, MintFilters, Network } from '@dcl/schemas'
import { ISubgraphComponent } from '@well-known-components/thegraph-component'
import { MintFragment, IMintsComponent } from './types'
import { fromMintFragment, getMintsQuery } from './utils'

export function createMintsComponent(options: {
  subgraph: ISubgraphComponent
  network: Network
  chainId: ChainId
}): IMintsComponent {
  const { subgraph, network, chainId } = options

  async function fetch(filters: MintFilters) {
    if (filters.network && filters.network !== network) {
      return []
    }

    const query = getMintsQuery(filters)

    const { mints: fragments } = await subgraph.query<{
      mints: MintFragment[]
    }>(query)

    const mints = fragments.map((fragment) =>
      fromMintFragment(fragment, network, chainId)
    )

    return mints
  }

  async function count(filters: MintFilters) {
    if (filters.network && filters.network !== network) {
      return 0
    }

    const query = getMintsQuery(filters, true)
    const { mints: fragments } = await subgraph.query<{
      mints: MintFragment[]
    }>(query)

    return fragments.length
  }

  return {
    fetch,
    count,
  }
}
