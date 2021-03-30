import { INFTSourceComponent, NFTComponents, NFTOptions } from '../../types'
import { getVariables } from '../../utils'
import { NFTFragmet } from './fragment'
import { fromFragment, getOrderBy, getQuery } from './utils'

export function createCollectionsComponent(
  components: Pick<NFTComponents, 'collectionsSubgraph'>
): INFTSourceComponent {
  const { collectionsSubgraph } = components
  return {
    fetch: async (options: NFTOptions) => {
      const query = getQuery(options)
      const variables = getVariables(options, getOrderBy)
      const { nfts: fragments } = await collectionsSubgraph.query<{
        nfts: NFTFragmet[]
      }>(query, variables)
      const nfts = fragments.map(fromFragment)
      return nfts
    },
  }
}
