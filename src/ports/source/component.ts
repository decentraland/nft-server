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

  async function getNFTId(contractAddress: string, tokenId: string) {
    const fragment = await getNFTFragment(contractAddress, tokenId)
    return fragment ? fragment.id : null
  }

  async function getHistory(contractAddress: string, tokenId: string) {
    const nftId = await getNFTId(contractAddress, tokenId)
    if (nftId) {
      const query = getHistoryQuery()
      const variables = { nftId }
      const { orders: fragments } = await subgraph.query<{
        orders: OrderFragment[]
      }>(query, variables)

      return fragments.map(fromOrderFragment)
    } else {
      return []
    }
  }

  return {
    subgraph,
    hasResults,
    fetch,
    count,
    getNFT,
    getHistory,
    getContracts: () => getContracts(subgraph),
  }
}
