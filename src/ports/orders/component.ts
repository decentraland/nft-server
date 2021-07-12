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
    const { contractAddress, tokenId, buyer, owner, status } = filters

    if (filters.network && filters.network !== network) {
      return []
    }

    const where: string[] = [`expiresAt_gt: "${Date.now()}"`]

    if (contractAddress) {
      where.push(`nftAddress: "${contractAddress}"`)
    }

    if (tokenId) {
      where.push(`tokenId: "${tokenId}"`)
    }

    if (buyer) {
      where.push(`buyer: "${buyer}"`)
    }

    if (owner) {
      where.push(`owner: "${owner}"`)
    }

    if (status) {
      where.push(`status: ${status}`)
    }

    const query = getOrdersQuery(where)
    const { orders: fragments } = await subgraph.query<{
      orders: OrderFragment[]
    }>(query)

    const orders = fragments.map((fragment) =>
      fromOrderFragment(fragment, network, chainId)
    )

    return orders
  }

  return {
    fetch,
  }
}
