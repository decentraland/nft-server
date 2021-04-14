import {
  ISourceComponent,
  Options,
  OrderFragment,
  SourceOptions,
} from './types'
import {
  fromOrderFragment,
  getFetchOneQuery,
  getFetchQuery,
  getHistoryQuery,
  getVariables,
} from './utils'

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

  async function nft(contractAddress: string, tokenId: string) {
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

  async function history(contractAddress: string, tokenId: string) {
    const result = await nft(contractAddress, tokenId)
    if (result) {
      const query = getHistoryQuery()
      const variables = {
        nftId: result.nft.id,
      }
      const { orders: fragments } = await subgraph.query<{
        orders: OrderFragment[]
      }>(query, variables)

      return fragments.map(fromOrderFragment)
    } else {
      return []
    }
  }

  async function collections() {
    return getCollections(subgraph)
  }

  return {
    subgraph,
    check,
    fetch,
    count,
    nft,
    history,
    collections,
  }
}
