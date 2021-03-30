import { INFTSourceComponent, NFTComponents, NFTOptions } from '../../types'
import { NFTFragmet } from './fragment'
import { fromFragment, getQuery, getVariables } from './utils'

export function createCollectionsComponent(
  components: Pick<NFTComponents, 'collectionsSubgraph'>
): INFTSourceComponent {
  const { collectionsSubgraph } = components
  return {
    fetch: async (options: NFTOptions) => {
      const query = getQuery(options)
      const variables = getVariables(options)
      const { nfts: fragments } = await collectionsSubgraph.query<{
        nfts: NFTFragmet[]
      }>(query, variables)
      const nfts = fragments.map(fromFragment)
      return nfts
    },
  }
}
