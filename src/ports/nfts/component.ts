import { ISubgraphComponent } from '../subgraph/types'
import { INFTComponent, NFTFilters, NFTResult, NFTSortBy } from './types'
import { getFetchOneQuery, getFetchQuery, getQueryVariables } from './utils'

export function createNFTComponent<T extends { id: string }>(options: {
  subgraph: ISubgraphComponent
  shouldFetch?: (options: NFTFilters) => boolean
  fragmentName: string
  getFragment: () => string
  fromFragment(fragment: T): NFTResult
  getSortByProp(sortBy?: NFTSortBy): keyof T
  getExtraVariables?: (options: NFTFilters) => string[]
  getExtraWhere?: (options: NFTFilters) => string[]
}): INFTComponent {
  const {
    subgraph,
    shouldFetch,
    fragmentName,
    getFragment,
    getSortByProp,
    getExtraWhere,
    getExtraVariables,
    fromFragment,
  } = options

  function getFragmentFetcher(filters: NFTFilters) {
    return async (isCount?: boolean) => {
      const query = getFetchQuery(
        filters,
        fragmentName,
        getFragment,
        getExtraVariables,
        getExtraWhere,
        isCount
      )
      const variables = getQueryVariables(filters, getSortByProp)
      const { nfts: fragments } = await subgraph.query<{
        nfts: T[]
      }>(query, variables)
      return fragments
    }
  }

  async function fetch(options: NFTFilters) {
    if (shouldFetch && !shouldFetch(options)) {
      return []
    }

    if (options.tokenId && options.contractAddresses) {
      const nft = await fetchOne(options.contractAddresses[0], options.tokenId)
      return nft ? [nft] : []
    } else if (options.tokenId) {
      throw new Error(
        'You need to provide a "contractAddress" as well when filtering by "tokenId"'
      )
    }

    const fetchFragments = getFragmentFetcher(options)
    const fragments = await fetchFragments()
    const nfts = fragments.map(fromFragment)
    return nfts
  }

  async function count(options: NFTFilters) {
    const fetchFragments = getFragmentFetcher(options)
    const fragments = await fetchFragments(true)
    return fragments.length
  }

  async function fetchOne(contractAddress: string, tokenId: string) {
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
      return fromFragment(fragments[0])
    }
  }

  return {
    fetch,
    count,
  }
}
