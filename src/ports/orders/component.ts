import { ChainId, Network } from '@dcl/schemas'
import { ISubgraphComponent } from '../subgraph/types'
import { IOrdersComponent, OrderFragment, OrderFilters } from './types'
import { fromOrderFragment, getOrdersQuery } from './utils'

export function createOrdersComponent(options: {
  subgraph: ISubgraphComponent
  network: Network
  chainId: ChainId
}): IOrdersComponent {
  const { subgraph, network, chainId } = options

  async function fetch(filters: OrderFilters) {
    if (filters.network && filters.network !== network) {
      return []
    }

    const query = getOrdersQuery(filters)
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

    const query = getOrdersQuery(filters, true)
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
