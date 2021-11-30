import { ChainId, CollectionFilters, Network } from '@dcl/schemas'
import { ISubgraphComponent } from '../subgraph/types'
import { CollectionFragment, ICollectionsComponent } from './types'
import { fromCollectionFragment, getCollectionsQuery } from './utils'

export function createCollectionsComponent(options: {
  subgraph: ISubgraphComponent
  network: Network
  chainId: ChainId
}): ICollectionsComponent {
  const { subgraph, network, chainId } = options

  async function fetch(filters: CollectionFilters) {
    if (filters.network && filters.network !== network) {
      return []
    }

    const query = getCollectionsQuery(filters)

    const { collections: fragments } = await subgraph.query<{
      collections: CollectionFragment[]
    }>(query)

    const collections = fragments.map((fragment) =>
      fromCollectionFragment(fragment, network, chainId)
    )

    return collections
  }

  async function count(filters: CollectionFilters) {
    if (filters.network && filters.network !== network) {
      return 0
    }

    const query = getCollectionsQuery(filters, true)
    const { collections: fragments } = await subgraph.query<{
      collections: CollectionFragment[]
    }>(query)

    return fragments.length
  }

  return {
    fetch,
    count,
  }
}
