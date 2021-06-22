import { ISubgraphComponent } from '../subgraph/types'
import { BidFragment, BidOptions, IBidsComponent } from './types'
import { fromBidFragment, getBidsQuery, getIdQuery } from './utils'

export function createBidsComponent(options: {
  subgraph: ISubgraphComponent
}): IBidsComponent {
  const { subgraph } = options

  async function fetch(options: BidOptions) {
    const { contractAddress, tokenId, bidder, seller, status } = options
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
        throw new Error(
          `Could not find NFT for contractAddress="${contractAddress}" and tokenId="${tokenId}"`
        )
      }
    } else if (contractAddress) {
      where.push(`nftAddress: "${contractAddress}"`)
    } else if (tokenId) {
      throw new Error(
        'You need to provide the "contractAddress" as well when filtering by "tokenId"'
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

    const bids = fragments.map(fromBidFragment)
    return bids
  }

  return {
    fetch,
  }
}
