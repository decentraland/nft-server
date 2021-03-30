import { NFTFragmet } from './fragment'
import { INFTSourceComponent, NFTComponents, NFTOptions } from '../../types'
import { fromFragment, getQuery } from './utils'
import { getVariables } from '../collections/utils'

export function createMarketplaceComponent(
  components: Pick<NFTComponents, 'marketplaceSubgraph'>
): INFTSourceComponent {
  const { marketplaceSubgraph } = components

  return {
    fetch: async (options: NFTOptions) => {
      const query = getQuery(options)
      const variables = getVariables(options)
      const { nfts: fragments } = await marketplaceSubgraph.query<{
        nfts: NFTFragmet[]
      }>(query, variables)
      const nfts = fragments.map(fromFragment)
      return nfts
    },
  }
}
