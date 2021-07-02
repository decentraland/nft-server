import { ISourceComponent, Options, SourceOptions } from './types'
import { getFetchOneQuery, getFetchQuery, getVariables } from './utils'

export function createSourceComponent<T extends { id: string }>(
  options: SourceOptions<T>
): ISourceComponent {
  const {
    hasResults,
    subgraph,
    fragmentName,
    getFragment,
    getExtraWhere,
    getExtraVariables,
    getSortByProp,
    fromFragment,
    getContracts,
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
      const variables = getVariables(options, getSortByProp)
      const { nfts: fragments } = await subgraph.query<{
        nfts: T[]
      }>(query, variables)
      return fragments
    }
  }

  async function fetch(options: Options) {
    const fetchFragments = getFragmentFetcher(options)
    const fragments = await fetchFragments()
    const nfts = fragments.map(fromFragment)
    return nfts
  }

  async function count(options: Options) {
    const fetchFragments = getFragmentFetcher(options)
    const fragments = await fetchFragments()
    return fragments.length
  }

  async function getNFTFragment(contractAddress: string, tokenId: string) {
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
      return fragments[0]
    }
  }

  async function getNFT(contractAddress: string, tokenId: string) {
    const fragment = await getNFTFragment(contractAddress, tokenId)
    return fragment ? fromFragment(fragment) : null
  }

  return {
    subgraph,
    hasResults,
    fetch,
    count,
    getNFT,
    getContracts: () => getContracts(subgraph),
  }
}
