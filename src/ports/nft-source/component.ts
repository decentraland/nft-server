import { ISourceComponent, Options, SourceOptions } from './types'
import { getQuery, getVariables } from './utils'

export function createNFTSourceComponent<T>(
  options: SourceOptions<T>
): ISourceComponent {
  const {
    check,
    subgraph,
    fragmentName,
    getFragment,
    getExtraWhere,
    getExtraVariables,
    getOrderBy,
    fromFragment,
  } = options

  function getFragmentFetcher(options: Options) {
    return async (isCount?: boolean) => {
      const query = getQuery(
        options,
        fragmentName,
        getFragment,
        getExtraVariables,
        getExtraWhere,
        isCount
      )
      const variables = getVariables(options, getOrderBy)
      const { nfts: fragments } = await subgraph.query<{
        nfts: T[]
      }>(query, variables)
      return fragments
    }
  }

  return {
    check,
    fetch: async (options: Options) => {
      const fetchFragments = getFragmentFetcher(options)
      const fragments = await fetchFragments()
      const nfts = fragments.map(fromFragment)
      return nfts
    },
    count: async (options: Options) => {
      const fetchFragments = getFragmentFetcher(options)
      const fragments = await fetchFragments()
      return fragments.length
    },
  }
}
