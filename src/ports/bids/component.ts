import { ChainId, Network } from '@dcl/schemas'
import { ISubgraphComponent } from '../subgraph/types'
import { BidFragment, BidFilters, IBidsComponent } from './types'
import { fromBidFragment, getBidsQuery, getIdQuery } from './utils'

export function createBidsComponent(options: {
  subgraph: ISubgraphComponent
  network: Network
  chainId: ChainId
}): IBidsComponent {
  const { subgraph, network, chainId } = options

  async function fetch(filters: BidFilters) {
    const { contractAddress, tokenId, bidder, seller, status } = filters
    const where: string[] = [`expiresAt_gt: "${Date.now()}"`]

    if (options.network && options.network !== network) {
      return []
    }

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
    if (bidder) {
      where.push(`bidder: "${bidder}"`)
    }
    if (seller) {
      where.push(`seller: "${seller}"`)
    }
    if (status) {
      where.push(`status: ${status}`)
    }

    const query = getBidsQuery(where)
    const { bids: fragments } = await subgraph.query<{
      bids: BidFragment[]
    }>(query)

    const bids = fragments.map((fragment) =>
      fromBidFragment(fragment, network, chainId)
    )

    return bids
  }

  return {
    fetch,
  }
}
