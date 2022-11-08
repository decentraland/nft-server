import { NFTFilters, NFTSortBy } from '@dcl/schemas'
import { ISubgraphComponent } from '@well-known-components/thegraph-component'
import { INFTsComponent, NFTResult } from './types'
import {
  getByTokenIdQuery,
  getFetchOneQuery,
  getFetchQuery,
  getQueryVariables,
} from './utils'

export function createNFTComponent<T extends { id: string }>(options: {
  subgraph: ISubgraphComponent
  fragmentName: string
  getFragment: () => string
  fromFragment(fragment: T): NFTResult
  getSortByProp(sortBy?: NFTSortBy): keyof T
  getExtraVariables?: (options: NFTFilters) => string[]
  getExtraWhere?: (options: NFTFilters) => string[]
}): INFTsComponent {
  const {
    subgraph,
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

  async function fetch(options: NFTFilters): Promise<NFTResult[]> {
    if (
      options.tokenIds?.length === 1 &&
      options.contractAddresses?.length === 1
    ) {
      const nft = await fetchOne(
        options.contractAddresses[0],
        options.tokenIds[0]
      )
      return nft ? [nft] : []
    } else if (options.tokenIds?.length === 1 && !options.contractAddresses) {
      throw new Error(
        'You need to provide a "contractAddress" as well when filtering by "tokenId"'
      )
    }

    const fetchFragments = getFragmentFetcher(options)
    const fragments = await fetchFragments()
    const nfts = fragments.map(fromFragment)
    return nfts
  }

  async function count(options: NFTFilters): Promise<number> {
    const fetchFragments = getFragmentFetcher(options)
    const fragments = await fetchFragments(true)
    return fragments.length
  }

  async function fetchOne(
    contractAddress: string,
    tokenId: string
  ): Promise<NFTResult | null> {
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

  /**
   * Fetches up to 1000 NFTs by their token IDs.
   */
  async function fetchByTokenIds(tokenIds: string[]): Promise<NFTResult[]> {
    const query = getByTokenIdQuery(fragmentName, getFragment)
    const variables = {
      tokenIds,
    }
    const { nfts } = await subgraph.query<{
      nfts: T[]
    }>(query, variables)

    return nfts.map(fromFragment)
  }

  return {
    fetch,
    fetchOne,
    fetchByTokenIds,
    count,
  }
}
