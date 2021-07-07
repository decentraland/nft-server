import { ChainId, Network } from '@dcl/schemas'
import { ISubgraphComponent } from '../subgraph/types'
import { IOrdersComponent, OrderFragment, OrderOptions } from './types'
import { fromOrderFragment, getIdQuery, getOrdersQuery } from './utils'

export function createOrdersComponent(options: {
  subgraph: ISubgraphComponent
  network: Network
  chainId: ChainId
}): IOrdersComponent {
  const { subgraph, network, chainId } = options

  async function fetch(options: OrderOptions) {
    const { contractAddress, tokenId, buyer, owner, status } = options

    if (options.network && options.network !== network) {
      return []
    }

    const where: string[] = [`expiresAt_gt: "${Date.now()}"`]

    if (contractAddress && tokenId) {
      const query = getIdQuery(contractAddress, tokenId)
      const { nfts: fragments } = await subgraph.query<{
        nfts: { id: string }[]
      }>(query)
      if (fragments.length > 0) {
        const { id } = fragments[0]
        where.push(`nft: "${id}"`)
      } else {
        return []
      }
    } else if (contractAddress) {
      where.push(`nftAddress: "${contractAddress}"`)
    } else if (tokenId) {
      throw new Error(
        'You need to provide a "contractAddress" as well when filtering by "tokenId"'
      )
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
