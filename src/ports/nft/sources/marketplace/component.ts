import { INFTSourceComponent, NFTComponents, NFTOptions } from '../../types'
import { getVariables } from '../../utils'
import { NFTFragmet } from './fragment'
import { fromFragment, getOrderBy, getQuery } from './utils'

export function createMarketplaceComponent(
  components: Pick<NFTComponents, 'marketplaceSubgraph'>
): INFTSourceComponent {
  const { marketplaceSubgraph } = components

  return {
    fetch: async (options: NFTOptions) => {
      const query = getQuery(options)
      const variables = getVariables(options, getOrderBy)
      const { nfts: fragments } = await marketplaceSubgraph.query<{
        nfts: NFTFragmet[]
      }>(query, variables)
      const nfts = fragments.map(fromFragment)
      return nfts
    },
  }
}
