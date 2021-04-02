import { INFTSourceComponent, NFTOptions, NFTSourceOptions } from './types'
import { getQuery, getVariables } from './utils'

export function createNFTSourceComponent<T>(
  options: NFTSourceOptions<T>
): INFTSourceComponent {
  const {
    subgraph,
    fragmentName,
    getFragment,
    getExtraWhere,
    getExtraVariables,
    getOrderBy,
    fromFragment: fromFragment,
  } = options
  return {
    fetch: async (options: NFTOptions) => {
      const query = getQuery(
        options,
        fragmentName,
        getFragment,
        getExtraVariables,
        getExtraWhere
      )
      const variables = getVariables(options, getOrderBy)
      const { nfts: fragments } = await subgraph.query<{
        nfts: T[]
      }>(query, variables)
      const nfts = fragments.map(fromFragment)
      return nfts
    },
  }
}
