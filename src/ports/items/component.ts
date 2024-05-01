import { ChainId, ItemFilters, Network } from '@dcl/schemas'
import { ISubgraphComponent } from '@well-known-components/thegraph-component'
import { AppComponents, AssetsNetworks } from '../../types'
import { IItemsComponent, ItemFragment } from './types'
import { fromItemFragment, getItemsQuery, getSubgraph } from './utils'

export function createItemsComponent(
  components: Pick<AppComponents, 'builder'>,
  options: {
    subgraph: ISubgraphComponent
    network: AssetsNetworks
    chainId: ChainId
  }[]
): IItemsComponent {
  const { builder } = components

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

    const isFetchingASingleItem =
      filters.contractAddresses?.length === 1 && filters.itemId

    const items = fragments.map((fragment) =>
      fromItemFragment(
        fragment,
        network as Network.ETHEREUM | Network.MATIC,
        chainId
      )
    )

    if (items.length > 0 && isFetchingASingleItem) {
      items[0].utility = await builder.getItemUtility(
        items[0].contractAddress,
        items[0].itemId
      )
    }

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
