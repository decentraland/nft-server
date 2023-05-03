import { ChainId, ItemFilters, Network } from '@dcl/schemas'
import { ISubgraphComponent } from '@well-known-components/thegraph-component'
import { IItemsComponent, ItemFragment } from './types'
import { fromItemFragment, getItemsQuery, getSubgraph } from './utils'

export function createItemsComponent(
  options: {
    subgraph: ISubgraphComponent
    network: Network
    chainId: ChainId
  }[]
): IItemsComponent {
  async function fetch(filters: ItemFilters) {
    const option = getSubgraph(filters, options)
    if (!option) return []

    const { subgraph, network, chainId } = option

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
    const option = getSubgraph(filters, options)

    if (!option) return 0

    const { subgraph, network } = option

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
