import { ChainId, ItemFilters, Network } from '@dcl/schemas'
import { ISubgraphComponent } from '../subgraph/types'
import { IItemsComponent, ItemFragment } from './types'
import { fromItemFragment, getItemsQuery } from './utils'

export function createItemsComponent(options: {
  subgraph: ISubgraphComponent
  network: Network
  chainId: ChainId
}): IItemsComponent {
  const { subgraph, network, chainId } = options

  async function fetch(filters: ItemFilters) {
    if (filters.network && filters.network !== network) {
      return []
    }

    const query = getItemsQuery(filters)
    const { items: fragments } = await subgraph.query<{
      items: ItemFragment[]
    }>(query)
    const items = fragments.map((fragment) =>
      fromItemFragment(fragment, network, chainId)
    )
    return items
  }

  async function count(filters: ItemFilters) {
    if (filters.network && filters.network !== network) {
      return 0
    }

    const query = getItemsQuery(filters, true)
    const { items: fragments } = await subgraph.query<{
      items: ItemFragment[]
    }>(query)
    return fragments.length
  }

  return {
    fetch,
    count,
  }
}
