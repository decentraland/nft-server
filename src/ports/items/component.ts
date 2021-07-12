import { ISubgraphComponent } from '../subgraph/types'
import { INFTComponent, ItemFilters } from './types'
import { getFetchOneQuery, getFetchQuery, getQueryVariables } from './utils'

export function createItemsComponent(options: {
  subgraph: ISubgraphComponent
}): INFTComponent {
  const { subgraph } = options

  function getFragmentFetcher(filters: ItemFilters) {
    return async (isCount?: boolean) => {
      const query = getFetchQuery(filters, isCount)
      const variables = getQueryVariables(filters)
      const { items: fragments } = await subgraph.query<{
        items: ItemFragment[]
      }>(query, variables)
      return fragments
    }
  }

  async function fetch(options: ItemFilters) {
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

  async function count(options: ItemFilters) {
    const fetchFragments = getFragmentFetcher(options)
    const fragments = await fetchFragments(true)
    return fragments.length
  }

  async function fetchOne(contractAddress: string, tokenId: string) {
    const query = getFetchOneQuery()
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
