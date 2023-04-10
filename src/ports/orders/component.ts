import { ChainId, Network, OrderFilters } from '@dcl/schemas'
import { ISubgraphComponent } from '@well-known-components/thegraph-component'
import { IOrdersComponent, OrderFragment } from './types'
import { fromOrderFragment, getOrdersQuery } from './utils'

export function createOrdersComponent(options: {
  subgraph: ISubgraphComponent
  network: Network
  chainId: ChainId
  getItemIdFilter: (itemId: string) => string
  getNameFilter: (name: string) => string
  getOrderFields: () => string
}): IOrdersComponent {
  const {
    subgraph,
    network,
    chainId,
    getItemIdFilter,
    getNameFilter,
    getOrderFields,
  } = options

  async function fetch(filters: OrderFilters) {
    if (filters.network && filters.network !== network) {
      return []
    }

    const query = getOrdersQuery(
      filters,
      false,
      getItemIdFilter,
      getNameFilter,
      getOrderFields
    )
    const { orders: fragments } = await subgraph.query<{
      orders: OrderFragment[]
    }>(query)

    const orders = fragments.map((fragment) =>
      fromOrderFragment(fragment, network, chainId)
    )

    return orders
  }

  async function count(filters: OrderFilters) {
    if (options.network && options.network !== network) {
      return 0
    }

    const query = getOrdersQuery(
      filters,
      true,
      getItemIdFilter,
      getNameFilter,
      getOrderFields
    )
    const { orders: fragments } = await subgraph.query<{
      orders: OrderFragment[]
    }>(query)

    return fragments.length
  }

  return {
    fetch,
    count,
  }
}
