import { ISourceComponent, Options, SourceOptions } from './types'
import { getFetchOneQuery, getFetchQuery, getVariables } from './utils'

export function createSourceComponent<T>(
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
    getCollections,
  } = options

  function getFragmentFetcher(options: Options) {
    return async (isCount?: boolean) => {
      const query = getFetchQuery(
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
    subgraph,
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
    nft: async (contractAddress: string, tokenId: string) => {
      const query = getFetchOneQuery(fragmentName, getFragment)
      const variables = {
        contractAddress,
        tokenId,
      }
      const { nfts: fragments } = await subgraph.query<{
        nfts: T[]
      }>(query, variables)
      if (fragments.length === 0) {
        return null
      } else {
        const { nft } = fromFragment(fragments[0])
        return nft
      }
    },
    collections: () => getCollections(subgraph),
  }
}
