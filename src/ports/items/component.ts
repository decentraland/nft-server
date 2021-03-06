import { ChainId, Network } from '@dcl/schemas'
import { ISubgraphComponent } from '../subgraph/types'
import { IItemsComponent, ItemFilters, ItemFragment } from './types'
import { fromItemFragment, getItemsQuery } from './utils'

export function createItemsComponent(options: {
  subgraph: ISubgraphComponent
  network: Network
  chainId: ChainId
}): IItemsComponent {
  const { subgraph, network, chainId } = options

  async function fetch(options: ItemFilters) {
    const query = getItemsQuery(options)
    const { items: fragments } = await subgraph.query<{
      items: ItemFragment[]
    }>(query)
    const items = fragments.map((fragment) =>
      fromItemFragment(fragment, network, chainId)
    )
    return items
  }

  async function count(options: ItemFilters) {
    const query = getItemsQuery(options, true)
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
